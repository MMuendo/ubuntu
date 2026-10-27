export const engineeringServices = [
  {
    slug: "data-migration", title: "Data migration",
    technologies: ["SQL", "PostgreSQL", "SQL Server", "Azure Data Factory", "AWS DMS", "Microsoft Fabric"],
    skills: [
      { name: "Schema mapping & conversion", use: "Match fields, types, and relationships between the old and new systems." },
      { name: "ETL & change data capture (CDC)", use: "Plan the initial transfer and capture changes while systems remain in use." },
      { name: "Data validation & reconciliation", use: "Check records, balances, duplicates, and exceptions before sign-off." },
      { name: "Cutover & rollback planning", use: "Rehearse the switch and agree how to recover if checks fail." }
    ],
    problem: "Changing systems should not mean losing your records.",
    detail: "Move from legacy databases and spreadsheets with a clear plan, checked records, and a controlled handover.",
    example: "A SACCO moving member records into a new platform needs to preserve member IDs, balances, and history. We agree mappings, resolve exceptions, and reconcile totals before a cutover.",
    stages: ["Source records", "Field mapping", "Validation & exceptions", "Reconciliation", "Controlled cutover"],
    deliverables: ["Source inventory and field mapping", "Migration runs with exception reports", "Record counts and balance reconciliation", "Cutover, rollback, and handover plan"],
    checks: "Agree who can access the source, protect transfers, and rehearse the move. Cutover follows agreed validation criteria, with a rollback plan.",
    demoTitle: "Map a sample member record",
    demoCopy: "Choose the source field for the member ID. Check which records can move and which need attention."
  },
  {
    slug: "data-engineering", title: "Data engineering",
    technologies: ["Databricks", "Apache Spark / PySpark", "Python", "SQL", "Microsoft Fabric", "Azure Data Factory", "Apache Airflow", "Delta Lake"],
    skills: [
      { name: "ETL / ELT pipeline development", use: "Load and transform data from operational systems into usable datasets." },
      { name: "Lakehouse & warehouse design", use: "Choose storage and processing patterns for the workload and budget." },
      { name: "Batch & streaming ingestion", use: "Match data refresh to the decision, from daily files to event streams." },
      { name: "Orchestration, testing & monitoring", use: "Schedule dependencies, track quality, and recover failed jobs." }
    ],
    problem: "Your team should not spend every morning copying data.",
    detail: "Connect files, APIs, and databases with repeatable pipelines, quality checks, and clear ownership.",
    example: "A retailer needs M-Pesa payments, bank exports, and shop sales in one place. A pipeline collects each source, checks for duplicate or incomplete records, and sends exceptions to the right person.",
    stages: ["Files, APIs & databases", "Scheduled ingestion", "Quality checks", "Trusted storage", "Monitoring & alerts"],
    deliverables: ["Source connections and refresh schedules", "Tested ingestion and transformation flows", "Quality rules and exception handling", "Monitoring, recovery instructions, and runbook"],
    checks: "Use scoped credentials and track data freshness. Plan retries around connectivity and source limits; failed records remain visible for review.",
    demoTitle: "Run a sample payment pipeline",
    demoCopy: "Add a duplicate or a missing reference, then run the checks. Watch how invalid records are separated from the reporting data."
  },
  {
    slug: "analytics-engineering", title: "Analytics engineering",
    technologies: ["SQL", "dbt", "Power BI", "Microsoft Fabric", "Snowflake", "BigQuery", "Git"],
    skills: [
      { name: "Dimensional data modeling", use: "Build reporting models that connect business events and their context." },
      { name: "Semantic models & metric definitions", use: "Define revenue, stock, and other measures once for consistent reports." },
      { name: "Data tests, lineage & documentation", use: "Make report inputs traceable and catch broken assumptions early." },
      { name: "Version control & CI/CD", use: "Review and test model changes before they affect business reporting." }
    ],
    problem: "Finance and sales should not report different versions of revenue.",
    detail: "Turn raw data into tested models and shared metric definitions your reports can use consistently.",
    example: "A distributor's sales dashboard includes unpaid orders while finance reports collected revenue. We agree what each metric means, model the rules, and document when to use each number.",
    stages: ["Operational data", "Clean data models", "Tested business rules", "Shared metrics", "Dashboards & decisions"],
    deliverables: ["Documented business definitions", "Reusable reporting models", "Tests for completeness and consistency", "Reporting layer and team handover"],
    checks: "Document calculation rules and access permissions. Trace each metric back to its inputs and agree owners for changes to the definition.",
    demoTitle: "Make the revenue definition visible",
    demoCopy: "Compare total order value with collected revenue, then apply one definition across both reports. All amounts below are sample KES."
  },
  {
    slug: "ai-engineering", title: "AI engineering",
    technologies: ["Python", "REST APIs", "n8n", "Microsoft Foundry", "Amazon Bedrock"],
    skills: [
      { name: "Retrieval-augmented generation (RAG)", use: "Ground answers in approved documents using retrieval and vector search." },
      { name: "Agent workflows & tool integration", use: "Connect models to useful tools with explicit permissions and limits." },
      { name: "Prompt design & evaluation", use: "Test answer quality, source grounding, latency, and cost against agreed cases." },
      { name: "Deployment & human oversight", use: "Monitor behaviour and route uncertain or consequential actions to a person." }
    ],
    problem: "Routine searches and repeated tasks are taking time from your team.",
    detail: "Build AI workflows around approved information, tested outputs, and human decisions where they matter.",
    example: "An agricultural supplier wants staff to find delivery and returns rules quickly. A document assistant retrieves approved policy passages, shows its sources, and sends uncertain cases to a person.",
    stages: ["Staff question", "Access & retrieval", "Source-grounded draft", "Evaluation & human review", "Approved response"],
    deliverables: ["Workflow scope and approved data sources", "Tool connections and access controls", "Evaluation cases and failure handling", "Human review steps and operating guide"],
    checks: "Define what the system may read and do. Test unsupported questions, require sources, log failures, and keep sensitive actions behind human approval.",
    demoTitle: "Try a source-backed answer",
    demoCopy: "Choose a question from this scripted example. See the source, the answer, and the review step. This demonstration does not call an AI model."
  }
];
