import {
  academyPrograms,
  adminWorkspace,
  aiUsage,
  learnerWorkspace,
  mentorProfiles,
  mentorWorkspace,
  paystackEvents,
  projectBriefs,
  subscriptionPlans
} from "@/src/data";

import { ubuntuCourses, ubuntuProjects } from "@/lib/academy/catalog";
import { getCurrentUser } from "@/lib/auth/session";
import { hasDatabaseEnv } from "./config";
import { query } from "./client";
import { postgresTables } from "./tables";

const avatarColors = ["#1e1616", "#00b4d8", "#0e7490", "#334155"];
const courseMentors = {
  "working-with-data-for-professionals": mentorProfiles[1],
  "excel-workshop": mentorProfiles[1],
  "powerbi-workshop": mentorProfiles[0],
  "ai-mastery": mentorProfiles[1],
  "ai-agents-masterclass": mentorProfiles[1],
  "python-for-analytics": mentorProfiles[0],
  "sql-for-analysts": mentorProfiles[0],
  "ai-data-workflows": mentorProfiles[1],
  "power-bi-business-intelligence": mentorProfiles[0],
  "excel-for-decision-making": mentorProfiles[1],
  "product-analytics": mentorProfiles[1],
  "data-fluency-for-operators-and-managers": mentorProfiles[1]
};

const courseOverrides = {
  "python-for-analytics": {
    priceKes: 10000
  },
  "data-fluency-for-operators-and-managers": {
    title: "Working with Data for Professionals Who Are Not Technical Analysts",
    priceKes: 10000,
    startDate: "2026-07-06",
    schedule: "Classes start 6th July."
  },
  "ai-agents-masterclass": {
    startDate: "2026-07-07",
    schedule: "Every Tuesday and Thursday evening for 1 hour 30 minutes across 8 sessions."
  }
};

function makeAvatar(name = "UA", index = 0) {
  const initials = name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return `data:image/svg+xml;utf8,${encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" width="128" height="128" viewBox="0 0 128 128"><rect width="128" height="128" rx="24" fill="${avatarColors[index % avatarColors.length]}"/><text x="50%" y="54%" dominant-baseline="middle" text-anchor="middle" font-family="Arial, sans-serif" font-size="42" font-weight="700" fill="#ffffff">${initials}</text></svg>`
  )}`;
}

function safeArray(value, fallback = []) {
  return Array.isArray(value) ? value : fallback;
}

async function withDb(loader, fallback) {
  if (!hasDatabaseEnv()) return fallback;

  try {
    const value = await loader();
    if (Array.isArray(value) && value.length === 0 && Array.isArray(fallback) && fallback.length > 0) {
      return fallback;
    }
    return value ?? fallback;
  } catch {
    return fallback;
  }
}

function mapMentor(row, index = 0) {
  const name = row.full_name || mentorProfiles[index % mentorProfiles.length]?.name || "Ubuntu Mentor";

  return {
    id: row.id,
    name,
    avatar: row.avatar_url || makeAvatar(name, index),
    title: row.title,
    company: row.company || "Ubuntu Analytiq",
    location: row.location || "Remote",
    bio: row.bio || "Mentor profile is being completed.",
    specialties: safeArray(row.specialties),
    expertise: safeArray(row.specialties),
    experience: row.experience || "Verified",
    currentRole: row.current_role || row.title || "Ubuntu mentor",
    availability: row.availability || "Weekly cohort and project review slots",
    mentorshipDuration: row.mentorship_duration || "6 months",
    rating: Number(row.rating || 0),
    sessionsThisWeek: Number(row.sessions_this_week || 0),
    priceKes: Number(row.price_kes || 12500)
  };
}

function mapProgram(row, index = 0, mentors = mentorProfiles) {
  const metadata = row.metadata || {};
  const override = courseOverrides[row.slug] || {};
  const mentor = row.mentor_id
    ? mapMentor(
        {
          id: row.mentor_id,
          full_name: row.mentor_name,
          avatar_url: row.mentor_avatar_url,
          title: row.mentor_title,
          company: row.mentor_company,
          location: row.mentor_location,
          bio: row.mentor_bio,
          specialties: row.mentor_specialties,
          rating: row.mentor_rating
        },
        index
      )
    : courseMentors[row.slug] || mentors[index % mentors.length] || mentorProfiles[0];

  return {
    id: row.id,
    slug: row.slug,
    title: override.title || row.title,
    category: row.category,
    courseType: row.course_type || metadata.course_type || "course",
    level: row.level,
    summary: row.summary,
    priceKes: override.priceKes || Number(row.price_kes || 0),
    duration: row.duration,
    startDate: override.startDate || row.start_date || null,
    displayOrder: Number(row.display_order || index + 1),
    isActive: row.is_active !== false,
    mentor,
    instructor: metadata.instructor || mentor.name,
    instructorTitle: metadata.instructor_title || mentor.title,
    modules: safeArray(metadata.modules),
    outcomes: safeArray(metadata.outcomes),
    tools: safeArray(metadata.tools),
    projects: safeArray(metadata.projects),
    roles: safeArray(metadata.roles),
    demand: safeArray(metadata.demand),
    schedule: override.schedule || metadata.schedule || ""
  };
}

function mapCatalogProgram(course, index = 0) {
  const mentor = courseMentors[course.slug] || mentorProfiles[index % mentorProfiles.length] || mentorProfiles[0];
  const override = courseOverrides[course.slug] || {};
  return {
    id: course.slug,
    slug: course.slug,
    title: override.title || course.title,
    category: course.category,
    courseType: course.courseType,
    level: course.level,
    summary: course.summary,
    priceKes: override.priceKes || course.priceKes,
    duration: course.duration,
    startDate: override.startDate || course.startDate,
    displayOrder: course.displayOrder,
    isActive: true,
    mentor,
    instructor: course.instructor,
    instructorTitle: course.instructorTitle,
    modules: course.modules,
    outcomes: course.outcomes,
    tools: course.tools,
    projects: course.projects,
    roles: course.roles,
    demand: course.demand,
    schedule: override.schedule || course.schedule || ""
  };
}

function mergeLocalPrograms(remotePrograms) {
  const seen = new Set(remotePrograms.map((program) => program.slug));
  const fallbackPrograms = ubuntuCourses.map(mapCatalogProgram);
  const missing = fallbackPrograms.filter((program) => !seen.has(program.slug));
  return [...remotePrograms, ...missing];
}

function mergeLocalMentors(remoteMentors) {
  const seen = new Set(remoteMentors.map((mentor) => String(mentor.name || "").toLowerCase()));
  const missing = mentorProfiles.filter((mentor) => !seen.has(String(mentor.name || "").toLowerCase()));
  return [...remoteMentors, ...missing].slice(0, 20);
}

function mapProject(row) {
  return {
    slug: row.slug,
    title: row.title,
    track: row.track || row.metadata?.track || "practice-labs",
    sourceProjectId: row.source_project_id || row.metadata?.source_project_id || row.slug,
    company: row.company_context,
    companyTag: row.company_tag || row.metadata?.company_tag || "Project",
    level: row.level || row.metadata?.level || "Beginner",
    estimatedTime: row.estimated_time || row.metadata?.estimated_time || "",
    skills: safeArray(row.skills),
    learningOutcome: row.learning_outcome || row.metadata?.learning_outcome || "",
    dataSource: row.data_source || row.metadata?.data_source || "",
    summary: row.summary || row.metadata?.summary || "",
    datasetHref: row.dataset_path || "",
    walkthroughHref: row.walkthrough_path || "",
    taskHref: row.task_path || row.walkthrough_path || "",
    deliverables: safeArray(row.deliverables),
    rubric: safeArray(row.rubric),
    scoreBands: safeArray(row.score_bands),
    feedback: row.feedback || ""
  };
}

function mapCatalogProject(project) {
  return {
    slug: project.slug,
    title: project.title,
    track: project.track,
    sourceProjectId: project.sourceProjectId,
    company: project.company,
    companyTag: project.companyTag,
    level: project.level,
    estimatedTime: project.estimatedTime,
    skills: project.skills,
    learningOutcome: project.learningOutcome,
    dataSource: project.dataSource,
    summary: project.summary,
    datasetHref: project.datasetHref || "",
    walkthroughHref: project.walkthroughHref || "",
    taskHref: project.taskHref || project.walkthroughHref || "",
    deliverables: project.deliverables,
    rubric: project.rubric,
    scoreBands: project.scoreBands,
    feedback: project.feedback
  };
}

function mapPlan(row) {
  return {
    id: row.code || row.id,
    role: row.role,
    status: row.is_active ? "Live" : "Paused",
    name: row.name,
    priceKes: Number(row.price_kes || 0),
    interval: row.interval,
    paystackPlanCode: row.paystack_plan_code,
    features: safeArray(row.features)
  };
}

function mapPaystackEvent(row) {
  const payload = row.payload || {};

  return {
    id: row.id,
    customer: payload.customer_name || payload.customer?.email || row.customer_code || "Customer",
    plan: payload.plan_name || payload.plan?.name || row.subscription_code || row.event,
    reference: row.reference,
    amountKes: Number(row.amount_kes || 0),
    status: payload.status || payload.data?.status || "Received",
    role: payload.role || "learner"
  };
}

export async function getMentorProfiles() {
  return withDb(async () => {
    const { rows } = await query(
      `select mp.id, mp.title, mp.company, mp.location, mp.bio, mp.specialties, mp.verification_status, mp.rating,
              p.full_name, p.avatar_url
       from mentor_profiles mp
       join profiles p on p.id = mp.id
       where mp.verification_status in ('verified', 'approved')
       order by mp.rating desc`
    );

    return mergeLocalMentors(rows.map(mapMentor));
  }, mentorProfiles);
}

export async function getAcademyPrograms() {
  return withDb(async () => {
    const mentors = await getMentorProfiles();
    const { rows } = await query(
      `select c.id, c.slug, c.title, c.category, c.course_type, c.level, c.duration, c.price_kes, c.summary,
              c.start_date::text as start_date, c.display_order, c.is_active, c.metadata,
              mp.id as mentor_id, mp.title as mentor_title, mp.company as mentor_company, mp.location as mentor_location,
              mp.bio as mentor_bio, mp.specialties as mentor_specialties, mp.rating as mentor_rating,
              p.full_name as mentor_name, p.avatar_url as mentor_avatar_url
       from courses c
       left join mentor_profiles mp on mp.id = c.mentor_id
       left join profiles p on p.id = mp.id
       where c.is_active = true
       order by c.display_order asc, c.created_at asc`
    );

    return mergeLocalPrograms(rows.map((row, index) => mapProgram(row, index, mentors)));
  }, ubuntuCourses.map(mapCatalogProgram));
}

export async function getProjectBriefs() {
  return withDb(async () => {
    const { rows } = await query(
      `select slug, track, source_project_id, title, company_context, company_tag, level, estimated_time, skills,
              learning_outcome, data_source, summary, dataset_path, walkthrough_path, task_path,
              rubric, deliverables, score_bands, feedback, metadata
       from project_briefs
       where is_active = true
       order by track asc, display_order asc, created_at asc`
    );

    return rows.map(mapProject);
  }, ubuntuProjects.map(mapCatalogProject));
}

export async function getSubscriptionPlans() {
  return withDb(async () => {
    const { rows } = await query(
      `select id, code, role, name, price_kes, interval, paystack_plan_code, is_active, features
       from plans
       where is_active = true
       order by price_kes asc`
    );

    return rows.map(mapPlan);
  }, subscriptionPlans);
}

export async function getPaystackEvents() {
  return withDb(async () => {
    const { rows } = await query(
      `select id, reference, event, amount_kes, customer_code, subscription_code, payload, received_at
       from paystack_events
       order by received_at desc
       limit 20`
    );

    return rows.map(mapPaystackEvent);
  }, paystackEvents);
}

export async function getAiUsage() {
  return withDb(async () => {
    const user = await getCurrentUser();
    if (!user) return aiUsage;

    const { rows } = await query("select monthly_limit, used_this_period from ai_token_wallets where user_id = $1 limit 1", [user.id]);
    const data = rows[0];
    if (!data) return aiUsage;

    return {
      ...aiUsage,
      tokenLimit: data.monthly_limit,
      tokensUsed: data.used_this_period,
      recommendation: data.used_this_period > data.monthly_limit * 0.75 ? "Builder" : "Starter"
    };
  }, aiUsage);
}

export async function getLearnerWorkspace() {
  return withDb(async () => {
    const user = await getCurrentUser();
    if (!user) return learnerWorkspace;

    const { rows } = await query(
      `select e.progress, e.status, c.title, c.duration
       from enrollments e
       join courses c on c.id = e.course_id
       where e.learner_id = $1
       order by e.created_at desc
       limit 1`,
      [user.id]
    );
    const active = rows[0];

    return {
      ...learnerWorkspace,
      person: {
        ...learnerWorkspace.person,
        name: user.full_name || learnerWorkspace.person.name,
        role: user.default_role === "learner" ? "Student" : learnerWorkspace.person.role
      },
      activeCourse: active ? { title: active.title, duration: active.duration } : learnerWorkspace.activeCourse,
      progress: active?.progress ?? learnerWorkspace.progress
    };
  }, learnerWorkspace);
}

export async function getMentorWorkspace() {
  return withDb(async () => {
    const user = await getCurrentUser();
    if (!user) return mentorWorkspace;

    const { rows } = await query(
      `select mp.id, mp.title, mp.company, mp.location, mp.bio, mp.specialties, mp.verification_status, mp.rating,
              p.full_name, p.avatar_url
       from mentor_profiles mp
       join profiles p on p.id = mp.id
       where mp.id = $1
       limit 1`,
      [user.id]
    );

    if (!rows[0]) return mentorWorkspace;

    return {
      ...mentorWorkspace,
      mentor: mapMentor(rows[0])
    };
  }, mentorWorkspace);
}

export async function getConnectedTableStatus() {
  if (!hasDatabaseEnv()) {
    return postgresTables.map((table) => ({ ...table, status: "Env missing", count: null }));
  }

  const checks = await Promise.all(
    postgresTables.map(async ({ table, label, key }) => {
      try {
        const { rows } = await query(`select count(${key})::int as count from ${table}`);
        return {
          table,
          purpose: label,
          fields: [key],
          status: "Connected",
          count: rows[0]?.count ?? 0
        };
      } catch {
        return {
          table,
          purpose: label,
          fields: [key],
          status: "Unavailable",
          count: null
        };
      }
    })
  );

  return checks;
}

export async function getAdminWorkspaceData() {
  const tableStatus = await getConnectedTableStatus();
  const connected = tableStatus.filter((item) => item.status === "Connected").length;

  return {
    ...adminWorkspace,
    metrics: [
      ["Connected tables", connected],
      ["Total tables", tableStatus.length],
      ["Plans", subscriptionPlans.length],
      ["Queues", adminWorkspace.queues.length]
    ]
  };
}
