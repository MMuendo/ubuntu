export async function resolveCheckoutProduct(client, { productType = "course", productSlug }) {
  const type = productType === "plan" ? "plan" : "course";
  const slug = String(productSlug || "").trim();

  if (!slug) {
    const error = new Error("Choose a course or plan before checkout.");
    error.status = 400;
    throw error;
  }

  if (type === "plan") {
    const { rows } = await client.query(
      `select id, code, name, price_kes, interval
       from plans
       where code = $1 and is_active = true
       limit 1`,
      [slug]
    );
    const plan = rows[0];
    if (!plan) {
      const error = new Error("Plan was not found. Choose another plan or contact support.");
      error.status = 404;
      throw error;
    }

    return {
      productType: "plan",
      productSlug: plan.code,
      productName: plan.name,
      amountKes: Number(plan.price_kes || 0),
      planId: plan.id,
      courseId: null,
      description: `${plan.name} - ${plan.interval}`
    };
  }

  const { rows } = await client.query(
    `select id, slug, title, price_kes, summary
     from courses
     where slug = $1 and is_active = true
     limit 1`,
    [slug]
  );
  const course = rows[0];
  if (!course) {
    const error = new Error("Course was not found. Choose another course or contact support.");
    error.status = 404;
    throw error;
  }

  return {
    productType: "course",
    productSlug: course.slug,
    productName: course.title,
    amountKes: Number(course.price_kes || 0),
    courseId: course.id,
    planId: null,
    description: course.summary
  };
}

export async function upsertLead(client, { email, fullName = "", source = "checkout", selectedProduct = "", metadata = {} }) {
  const { rows } = await client.query(
    `insert into leads (email, full_name, source, selected_product, metadata)
     values ($1, $2, $3, $4, $5::jsonb)
     on conflict (email) do update set
       full_name = coalesce(nullif(excluded.full_name, ''), leads.full_name),
       source = excluded.source,
       selected_product = coalesce(nullif(excluded.selected_product, ''), leads.selected_product),
       metadata = leads.metadata || excluded.metadata,
       updated_at = now()
     returning id, email`,
    [email, fullName, source, selectedProduct, JSON.stringify(metadata)]
  );

  return rows[0];
}

export async function recordPaystackEvent(client, { reference, event, amountKes = null, customerCode = null, subscriptionCode = null, payload = {} }) {
  await client.query(
    `insert into paystack_events (reference, event, amount_kes, customer_code, subscription_code, payload)
     values ($1, $2, $3, $4, $5, $6::jsonb)`,
    [reference, event, amountKes, customerCode, subscriptionCode, JSON.stringify(payload)]
  );
}

async function grantCourseAccess(client, purchase) {
  if (!purchase.user_id || !purchase.course_id) return;

  await client.query(
    `insert into enrollments (learner_id, course_id, progress, status)
     values ($1, $2, 0, 'active')
     on conflict (learner_id, course_id) do update set status = 'active'`,
    [purchase.user_id, purchase.course_id]
  );
}

async function grantPlanAccess(client, purchase, paystackData) {
  if (!purchase.user_id || !purchase.plan_id) return;

  await client.query(
    `insert into subscriptions (
       owner_type,
       owner_user_id,
       plan_id,
       status,
       paystack_customer_code,
       paystack_subscription_code,
       current_period_end
     )
     select 'user', $1, $2, 'active', $3, $4, now() + interval '30 days'
     where not exists (
       select 1 from subscriptions
       where owner_type = 'user'
       and owner_user_id = $1
       and plan_id = $2
       and status in ('trialing', 'active')
     )`,
    [purchase.user_id, purchase.plan_id, paystackData.customer?.customer_code || null, paystackData.subscription?.subscription_code || null]
  );
}

export async function reconcileVerifiedPayment(client, { reference, paystackData, eventName = "charge.verify" }) {
  const { rows } = await client.query("select * from purchases where reference = $1 limit 1", [reference]);
  const purchase = rows[0];
  if (!purchase) {
    const error = new Error("Purchase reference was not found.");
    error.status = 404;
    throw error;
  }

  const amountMatches = Number(paystackData.amount || 0) === Number(purchase.amount_kes || 0) * 100;
  const currencyMatches = String(paystackData.currency || "").toUpperCase() === String(purchase.currency || "KES").toUpperCase();
  const successful = String(paystackData.status || "").toLowerCase() === "success";
  const nextStatus = successful && amountMatches && currencyMatches ? "completed" : "failed";

  await recordPaystackEvent(client, {
    reference,
    event: eventName,
    amountKes: Math.round(Number(paystackData.amount || 0) / 100),
    customerCode: paystackData.customer?.customer_code || null,
    subscriptionCode: paystackData.subscription?.subscription_code || null,
    payload: paystackData
  });

  const { rows: updatedRows } = await client.query(
    `update purchases set
       payment_status = $2,
       payment_method = coalesce($3, payment_method),
       transaction_id = coalesce($4, transaction_id),
       verified_at = case when $2 = 'completed' then now() else verified_at end,
       metadata = metadata || $5::jsonb,
       updated_at = now()
     where reference = $1
     returning *`,
    [
      reference,
      nextStatus,
      paystackData.channel || null,
      paystackData.id ? String(paystackData.id) : paystackData.reference || null,
      JSON.stringify({
        amount_matches: amountMatches,
        currency_matches: currencyMatches,
        paystack_status: paystackData.status || null
      })
    ]
  );

  const updatedPurchase = updatedRows[0];

  if (nextStatus === "completed") {
    await client.query("update leads set status = 'converted', updated_at = now() where id = $1", [updatedPurchase.lead_id]);
    if (updatedPurchase.product_type === "plan") {
      await grantPlanAccess(client, updatedPurchase, paystackData);
    } else {
      await grantCourseAccess(client, updatedPurchase);
    }
  }

  return {
    purchase: updatedPurchase,
    amountMatches,
    currencyMatches,
    successful,
    completed: nextStatus === "completed"
  };
}
