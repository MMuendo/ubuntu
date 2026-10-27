# Ubuntu Analytiq — SEO and engineering skills

Reviewed: 16 October 2026. Changes apply to the local redesign only.

## Can the three audiences find us?

| Search intent | Page prepared for it | Status |
|---|---|---|
| A company for data and AI engineering in Kenya | `/for-organizations` and `/for-organizations/engineering` | Explicit titles, descriptions, headings, service names, skills, architectures, demos, and service structured data. |
| Data and AI mentorship in Kenya | `/mentorships` | Explicit title and heading, tools, project track, mentor information, service structured data; crawler-blocking prefix fixed. |
| A partner grounded in African business contexts | Homepage, organization pages, Mentorship | Nairobi location, M-Pesa, SACCO, retail, agricultural examples, existing collaborations and human profiles. Examples remain labelled illustrative. |

The public domain appeared in search results for a site-restricted query, with older homepage and `/solutions` content. This is evidence of some search visibility, not proof of Google rankings or index coverage for the redesign. A direct public-homepage fetch timed out. No Search Console, keyword-volume, conversion, backlink, or real-user performance data was available. The redesign is on localhost and cannot be discovered publicly until deployed.

## Fixed locally

- `Disallow: /mentors` matched `/mentorships` as well. Replaced it with `/mentors$` and `/mentors/`; kept workspace/application restrictions separate.
- Added unique canonical URLs and page-specific Open Graph/Twitter metadata to the six main acquisition pages. These use `NEXT_PUBLIC_SITE_URL`, with the existing public domain as the fallback.
- Standardized core page titles so the brand appears exactly once, including the homepage where the parent title template does not apply.
- Clarified engineering and mentorship headings and Kenya/Nairobi context. Each engineering section now has its service name as its heading.
- Added Organization contact/location/social references and Service JSON-LD for four engineering services and mentorship, without fabricated ratings, certificates, prices, or results.
- Added visible technology and skills sections inside the existing Engineering page. No extra service landing pages were created.

Google ignores meta-keywords; the work prioritizes useful visible content, correct crawling, metadata, and links. Structured data is descriptive and does not promise enhanced results or ranking. Four anchors on one Engineering page are sections of a single indexable page, not four independent landing pages.

## Skills shortlist and method

This is an editorial shortlist based on employer-posting evidence plus current primary vendor role guides and documentation. It is not a numeric ranking of Kenyan demand or search volume. O*NET data covers US postings; vendor guides establish technical relevance, not frequency of hiring. Vendor sources have ecosystem bias. Ubuntu's proficiency, certifications, and completed projects for every listed tool have not been independently established. The site therefore describes common technologies to scope, not a certified or proven portfolio for each tool.

| Service | Technology shortlist | Core work |
|---|---|---|
| Data migration | SQL, PostgreSQL, SQL Server, Azure Data Factory, AWS DMS, Microsoft Fabric | Schema conversion, ETL, CDC, validation, reconciliation, cutover and rollback. |
| Data engineering | Databricks, Spark/PySpark, Python, SQL, Microsoft Fabric, Azure Data Factory, Airflow, Delta Lake | Pipelines, lakehouse/warehouse design, batch/streaming, orchestration, monitoring and tests. |
| Analytics engineering | SQL, dbt, Power BI, Fabric, Snowflake, BigQuery, Git | Models, metrics, semantic layers, data quality, lineage, documentation and CI/CD. |
| AI engineering | Python, REST APIs, n8n, Microsoft Foundry, Amazon Bedrock | RAG, vector search, agent tools, evaluation, deployment and human review. |

## Research sources

- [O*NET employer-based skills: Data Warehousing Specialists](https://www.onetonline.org/link/demand/15-1243.01): US 2025 postings include SQL, Power BI and Python. This is supporting demand evidence, not an African market ranking.
- [Databricks Data Engineer Associate guide, May 2026](https://www.databricks.com/sites/default/files/2026-03/databricks-certified-data-engineer-associate-exam-guide-may-4-2026.pdf): data transformation, pipelines, jobs and operational practices.
- [Microsoft Fabric engineering study guide](https://learn.microsoft.com/en-us/credentials/certifications/resources/study-guides/dp-700): SQL, PySpark, ingestion, orchestration and monitoring. The page previews an October 19 update; the shortlist uses the core skills, not its upcoming changed objectives.
- [Microsoft Fabric migration overview](https://learn.microsoft.com/en-us/fabric/fundamentals/migration): migration paths from existing Microsoft data platforms.
- [AWS Database Migration Service](https://docs.aws.amazon.com/dms/latest/userguide/Welcome.html): schema conversion, source/target migration and ongoing replication.
- [dbt: understanding analytics engineering](https://www.getdbt.com/discover/understanding-analytics-engineering): SQL, warehouse platforms, tests, models, documentation and version control.
- [dbt: the analytics engineer in 2026](https://www.getdbt.com/blog/the-analytics-engineer-in-2026-system-designer-governance-owner-ai-context-provider): semantic definitions, governance and context for AI.
- [Microsoft AI apps and agents study guide](https://learn.microsoft.com/en-us/credentials/certifications/resources/study-guides/AI-103): Python, agents, RAG, integration, security and evaluation.
- [Amazon Bedrock RAG evaluation](https://docs.aws.amazon.com/bedrock/latest/userguide/knowledge-base-evaluation-create-randg.html): retrieval-and-generation testing. n8n also remains part of Ubuntu's existing workflow offering.
- [Google robots path matching](https://developers.google.com/crawling/docs/robots-txt/robots-txt-spec): prefix matching and the `$` end-of-URL marker.
- [Google supported meta tags](https://developers.google.com/search/docs/crawling-indexing/special-tags): meta-keywords have no indexing or ranking effect.
- [Google Search developer guidance](https://developers.google.com/search/docs/fundamentals/get-started-developers): discoverable links, useful metadata and indexable content.

## Before and after deployment

1. Confirm the production domain and set `NEXT_PUBLIC_SITE_URL` consistently. Deploy the approved redesign; localhost edits do not change public search results.
2. Verify ownership in Google Search Console, submit `/sitemap.xml`, and inspect the homepage, Mentorship and Engineering URLs. Check chosen canonical and crawl permissions.
3. Confirm the real experience behind listed tools. Add approved case studies with the problem, actual stack, what was built, measured result and attribution; keep illustrative demos distinct.
4. Establish baseline impressions, clicks, queries, enquiries and mentorship applications for Kenya and other relevant countries. Compare after recrawling; do not promise a fixed ranking or timeline.
5. Review mobile Core Web Vitals after deployment and improve any measured bottlenecks. No Lighthouse or real-user speed score was produced in this review.
6. Review secondary course/article metadata separately. This pass covers the six core acquisition pages, not a full technical audit of every authenticated and historical route.
