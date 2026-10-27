export function checkoutParams({ productType = "course", productSlug, productName, amountKes, description = "" }) {
  const params = new URLSearchParams({
    productType,
    productName,
    amountKes: String(amountKes || 0)
  });

  if (productType === "plan") {
    params.set("planId", productSlug);
  } else {
    params.set("courseId", productSlug);
    params.set("courseName", productName);
    params.set("coursePrice", String(amountKes || 0));
  }

  if (description) {
    params.set("courseDescription", description);
  }

  return params;
}

export function checkoutHref(options) {
  return `/checkout?${checkoutParams(options).toString()}`;
}
