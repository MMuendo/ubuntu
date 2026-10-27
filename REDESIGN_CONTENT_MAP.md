# Ubuntu Analytiq redesign content map

Original site: `C:\Users\Admin\Desktop\ubuntu` (`http://127.0.0.1:4173`). Redesign copy: this folder (`http://127.0.0.1:4174`). The original is untouched. This map tracks what happened to existing information; a changed layout is not permission to drop facts.

| Existing information | Redesign destination | Status / check |
|---|---|---|
| UA mark, Ubuntu Analytiq name, cyan/ink/paper/orange palette, light/dark sections, Africa/Kenya watermarks | Shared shell and redesigned public pages | Kept. Compare visually on desktop and phone. |
| Site-wide AI Agents MasterClass sale banner | Removed from the shell | Removed by owner direction. The course remains in Academy. |
| Homepage advisory / solutions / Academy introduction | `/for-organizations`, `/solutions`, `/advisory`, `/academy` | Reframed around two core offers; original details remain on the linked pages. |
| Homepage Mentorship copy, tool/topic choices, three tiers, mentor package, group option | Homepage and `/mentorships` | Kept. Illustrative learner briefs added; online application status stated honestly. |
| Homepage consultations: Build Systems, Train Teams, Improve Decisions, Automate Operations | `/for-organizations` supporting paths and original consultation form | Kept. Consultancy services now lead; these remain supporting entry points. |
| Data migration, data engineering, analytics engineering, AI engineering | Homepage and `/for-organizations#services` | Presented only as organization consultancy services. |
| Academy assessment, courses, programme details, modules, outcomes, instructors, events, AI prompt lab | `/academy`, `/assessment`, `/pathways/[slug]`, event pages; `/pathways` redirects to the Academy course list | Kept. Course dates display “To be confirmed”; past event dates are retained with status under review. |
| AI Agents / Agentic AI MasterClass course | `/academy` and `/pathways/ai-agents-masterclass` | Kept. Top banner removed. |
| Six mentor summaries on old homepage | `/mentorships` and source data; two featured on new homepage | No biographies deleted. Verify roster and portraits before public release. |
| Dataset scenarios and preview tool | `/datasets`, linked from new homepage “Keep exploring” | Example scenarios kept as a clearly labelled preview. Non-working generation, download, walkthrough, and free-credit promises are held until functional. |
| Irri-hub, Phoenix KE Analytics, Crafted, Men's Focus logos and work text | Homepage and `/for-organizations` | All four kept. Relationship, logo permission, results, and wording need owner verification. |
| Six testimonials: Eric Onchonga, Duncan Mutulu, Monicah Gitagia, Brian Wekesa, Sarah Njeri, Chris | New homepage, separated as organization/professional and learner voices | All six kept. Attribution and consent need owner verification. |
| Separate `/companies` ten-name activity wall | `/companies` now leads to `/for-organizations#work`; original list remains in the original site and content map for review | Do not present those ten names as Ubuntu clients without confirmed relationships. Restore approved entries with accurate context. |
| Contact phone, WhatsApp, email, location, social links | Homepage contact section and shared footer | Kept. |
| Organization consultation requests | `/for-organizations`, `/solutions`, `/advisory`, and shared request dialog | Database-backed form retained. Direct email fallback carries entered details when the local database is unavailable; the visitor must review and send the email. |
| Articles, blogs, resources, and event pages | Existing routes; linked from homepage | Kept. Review old dates/status and link relevance before release. |
| `/projects*` legacy URLs and briefs | Existing redirects and Mentorship data | Keep compatibility URLs, no standalone Projects product. Check each redirect. |
| Public demo operations, dashboard, proof, billing content | `/operations` and `/dashboard` lead to protected `/admin`; `/proof` leads to Mentorship; `/billing` explains current offers without a public ledger | Original demo content remains in the untouched original site. Never expose payment records or unverified demo proof publicly. |
| Auth, checkout, mentorship application, groups, workspace | Existing routes | Mentorship database/payment blockers remain deferred. Do not claim the online journey works until tested. |

Every item marked “verification” remains in the source and in this map. Before a public release, the owner and developer should record keep/move/rewrite/hold decisions for each name, quote, result, date, and client relationship. No approved information should disappear without a recorded destination or reason.

## October 15 landing-page refinement

- Centered the two audience cards; kept Mentorship first and added explicit service links.
- Removed only the redundant “Start with the work” navigation strip, as requested. Its destination sections remain.
- Renamed tier display names to Project Practice, Mentor Walkthrough, and Build & Present. Stable tier IDs and entitlements remain unchanged.
- Added African business scenarios, clearly distinguished from client case studies.
- Added four `/for-organizations/[service]` pages, each with a reference architecture, deliverables, controls, and a local interactive sample-data demo. The AI example is scripted and labelled as such.
- Featured one learner and one professional testimonial; retained all six original quotes and attributions.

## Organization hub

- For organizations now groups Advisory (plan it), Engineering services (build it), and Solution patterns (see it in practice).
- Advisory content moved intact to `/for-organizations/advisory`; `/advisory` permanently redirects there.
- Solutions content moved to `/for-organizations/solution-patterns`, with clearer context and its existing examples and workflow retained; `/solutions` permanently redirects there.
- Shared organization navigation and breadcrumbs connect the hub, Advisory, Solution patterns, and all four engineering pages.
- Homepage links, strategy content links, and sitemap use the new destinations. Existing collaborations, supporting paths, training, delivery process, and contact details remain.

## Decision Lab and consolidated Engineering — October 16

- Decision Lab now bridges the homepage, organization pilot, and mentorship project track. Its five steps are map, create safe brief, build, test, and deploy.
- The pilot asks for one difficult decision through the existing consultation form, with a required decision description and an email fallback. Database-backed storage remains dependent on the existing database setup.
- The mentorship track explains selected organization briefs, approved or synthetic data, mentor review, availability, and organization approval before deployment.
- The Organizations dropdown contains Advisory, Engineering, and Solutions, accessible through hover, click, touch, and keyboard.
- SEO refinement: all four Engineering sections now include research-informed skills and common technologies, with use explanations. These are scoping options, not newly claimed certifications or completed client projects. Research and launch checks are recorded in `SEO_REVIEW_AND_SKILLS.md`.
- `/for-organizations/engineering` contains all four engineering services, examples, architecture flows, deliverables, controls, and interactive demos. Previous individual service URLs redirect to the matching section. No service content was discarded.
