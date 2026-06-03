import { redirect } from "next/navigation";

const legacyCourseMap = {
  "excel-workshop": "excel-workshop",
  "powerbi-workshop": "powerbi-workshop",
  "ai-mastery": "data-fluency-for-operators-and-managers",
  "ai-agents-masterclass": "ai-agents-masterclass",
  "python-for-analytics": "python-for-analytics",
  "sql-for-analysts": "sql-for-analysts",
  "data-fluency-for-operators-and-managers": "data-fluency-for-operators-and-managers"
};

export default async function LegacyCourseRedirectPage({ params }) {
  const { id } = await params;
  redirect(`/pathways/${legacyCourseMap[id] || id}`);
}
