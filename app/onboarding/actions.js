"use server";

import { redirect } from "next/navigation";

import { requireUser } from "@/lib/auth/session";
import { transaction } from "@/lib/db/client";

function clean(value) {
  return String(value || "").trim();
}

function values(formData, name) {
  return formData.getAll(name).map(clean).filter(Boolean);
}

export async function saveLearnerOnboarding(_accessToken, formData) {
  const user = await requireUser({ role: "learner", redirectTo: "/onboarding/learner", requireMembership: false });
  const phone = clean(formData.get("phone"));
  const country = clean(formData.get("country"));
  const timeZone = clean(formData.get("time_zone"));
  const learningGoal = clean(formData.get("learning_goal"));

  if (!phone || !country || !timeZone || !learningGoal) {
    redirect("/onboarding/learner?message=required");
  }

  await transaction(async (client) => {
    await client.query(
      `insert into role_memberships (user_id, role, status)
       values ($1, 'learner', 'active')
       on conflict (user_id, role) where organization_id is null
       do update set status = 'active'`,
      [user.id]
    );

    await client.query(
      `insert into learner_profiles (
         id, phone, country, time_zone, institution, interests, learning_goal, availability,
         age_bracket, guardian_contact, onboarding_complete, updated_at
       )
       values ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, true, now())
       on conflict (id) do update set
         phone = excluded.phone,
         country = excluded.country,
         time_zone = excluded.time_zone,
         institution = excluded.institution,
         interests = excluded.interests,
         learning_goal = excluded.learning_goal,
         availability = excluded.availability,
         age_bracket = excluded.age_bracket,
         guardian_contact = excluded.guardian_contact,
         onboarding_complete = true,
         updated_at = now()`,
      [
        user.id,
        phone,
        country,
        timeZone,
        clean(formData.get("institution")),
        values(formData, "interests"),
        learningGoal,
        values(formData, "availability"),
        clean(formData.get("age_bracket")),
        clean(formData.get("guardian_contact"))
      ]
    );
  });

  redirect("/learners?message=learner-ready");
}

export async function saveMentorOnboarding(_accessToken, formData) {
  const user = await requireUser({
    role: "mentor",
    redirectTo: "/onboarding/mentor",
    statuses: ["active", "pending"],
    requireMembership: false
  });
  const title = clean(formData.get("title"));
  const bio = clean(formData.get("bio"));
  const location = clean(formData.get("location"));
  const yearsExperience = Number(clean(formData.get("years_experience")) || 0);
  const specialties = values(formData, "specialties");
  const acceptsCode = formData.get("code_of_conduct") === "yes";

  if (!title || !bio || !location || specialties.length === 0 || !acceptsCode) {
    redirect("/onboarding/mentor?message=required");
  }

  await transaction(async (client) => {
    await client.query(
      `insert into role_memberships (user_id, role, status)
       values ($1, 'mentor', 'pending')
       on conflict (user_id, role) where organization_id is null
       do update set status = case
         when role_memberships.status = 'active' then 'active'
         else 'pending'
       end`,
      [user.id]
    );

    await client.query(
      `insert into mentor_profiles (id, title, company, location, bio, specialties, verification_status)
       values ($1, $2, $3, $4, $5, $6, 'pending')
       on conflict (id) do update set
         title = excluded.title,
         company = excluded.company,
         location = excluded.location,
         bio = excluded.bio,
         specialties = excluded.specialties,
         verification_status = case when mentor_profiles.verification_status = 'verified' then 'verified' else 'pending' end`,
      [user.id, title, clean(formData.get("company")) || "Independent", location, bio, specialties]
    );

    await client.query(
      `insert into mentor_applications (
         mentor_id, professional_title, years_experience, links, motivation, availability, status, updated_at
       )
       values ($1, $2, $3, $4, $5, $6, 'pending', now())
       on conflict (mentor_id) do update set
         professional_title = excluded.professional_title,
         years_experience = excluded.years_experience,
         links = excluded.links,
         motivation = excluded.motivation,
         availability = excluded.availability,
         status = 'pending',
         updated_at = now()`,
      [
        user.id,
        title,
        yearsExperience,
        {
          linkedin: clean(formData.get("linkedin_url")),
          github: clean(formData.get("github_url")),
          portfolio: clean(formData.get("portfolio_url"))
        },
        clean(formData.get("motivation")),
        values(formData, "availability")
      ]
    );
  });

  redirect("/mentors?message=mentor-pending");
}
