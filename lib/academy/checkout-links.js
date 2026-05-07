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

export const mentorshipCheckoutProducts = {
  cohort2: {
    productType: "plan",
    productSlug: "data-ai-mentorship-cohort-2",
    productName: "Data & AI Mentorship Cohort 2",
    amountKes: 999,
    description: "12-week Data & AI mentorship cohort starting 3rd August 2026."
  },
  mentorBooking: {
    productType: "plan",
    productSlug: "mentor-booking",
    productName: "Mentor Booking",
    amountKes: 12500,
    description: "Standard mentor booking with project access and guided review."
  }
};
