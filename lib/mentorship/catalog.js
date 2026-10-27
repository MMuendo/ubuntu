export const mentorshipTools = ["Excel", "Power BI", "SQL", "Databricks", "Fabric", "n8n"];
export const mentorshipTopics = ["Data Analysis", "Agentic AI", "Data Science", "Business Intelligence"];
export const mentorshipTiers = [
  { id: "practice", name: "Project Practice", summary: "Build independently with a project brief, dataset, and worked solution after your attempt.", includes: ["Project brief and dataset", "Submission space", "Worked solution after submission"] },
  { id: "guided", name: "Mentor Walkthrough", summary: "Build the project, then work through it in a scheduled group session with a mentor.", includes: ["Everything in Project Practice", "Group walkthrough", "Live questions"] },
  { id: "reviewed", name: "Build & Present", summary: "Present your solution and receive personal feedback on your work and explanation.", includes: ["Everything in Mentor Walkthrough", "Personal project review", "Solution presentation and feedback"] }
];
export const mentorshipFormats = [
  { id: "project", name: "Project track" },
  { id: "full_mentor", name: "Full mentor package" }
];
export function matchingProjects(projects, tool, topic) {
  const terms = [tool, topic].filter(Boolean).map((value) => value.toLowerCase());
  if (!terms.length) return projects;
  return projects.filter((project) => {
    const searchable = [project.title, project.track, project.summary, ...(project.skills || [])].join(" ").toLowerCase();
    return terms.some((term) => searchable.includes(term) ||
      (term === "business intelligence" && searchable.includes("power bi")) ||
      (term === "data analysis" && (searchable.includes("excel") || searchable.includes("power bi") || searchable.includes("sql"))) ||
      (term === "agentic ai" && searchable.includes("ai-agents")));
  });
}
