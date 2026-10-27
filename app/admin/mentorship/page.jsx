import Link from "next/link";
import { SiteShell } from "@/components/site-shell";
import { requireUser } from "@/lib/auth/session";
import { query } from "@/lib/db/client";
import { getProjectBriefs } from "@/lib/db/loaders";
import { MentorshipReview } from "./review";

export const dynamic = "force-dynamic";

export default async function AdminMentorshipPage() {
  await requireUser({ role: "admin", redirectTo: "/admin/mentorship" });
  const [applications, groups, projects] = await Promise.all([
    query(`select a.id, a.tool, a.topic, a.tier, a.format, a.project_slug, a.skill_level,
                  a.goal, a.availability, a.status, a.review_notes, a.approved_price_kes,
                  a.approved_session_count, a.created_at, p.full_name, p.email
           from mentorship_applications a join profiles p on p.id = a.user_id
           order by case a.status when 'pending' then 0 else 1 end, a.created_at desc limit 100`),
    query("select * from mentorship_group_requests order by case status when 'new' then 0 else 1 end, created_at desc limit 100"),
    getProjectBriefs()
  ]);
  return <SiteShell><section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
    <Link href="/admin" className="text-sm font-semibold text-[#007c97]">← Admin</Link>
    <h1 className="mt-5 text-4xl font-semibold text-[#1e1616]">Mentorship review</h1>
    <p className="mt-3 text-slate-600">Review applicants before any payment. Add a price and session count when the offer is ready.</p>
    <MentorshipReview applications={applications.rows} groups={groups.rows} projects={projects.map(({ slug, title }) => ({ slug, title }))} />
  </section></SiteShell>;
}
