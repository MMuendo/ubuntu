import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { SiteShell } from "@/components/site-shell";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { mentorshipTiers, mentorshipTools, mentorshipTopics } from "@/lib/mentorship/catalog";
import { getMentorProfiles } from "@/lib/db/loaders";
import { whatsappHref } from "@/lib/whatsapp";
import { pageMetadata, serviceSchema } from "@/lib/seo";
import { StructuredData } from "@/components/structured-data";
import { MentorshipTestimonialsMarquee } from "@/components/mentorship-testimonials-marquee";

const sampleBriefs = [
  { tool: "Excel", title: "Make sense of a small business sales file", outcome: "Clean the data, compare products and months, and explain one decision the owner could make." },
  { tool: "Power BI", title: "Build a reporting view people can use", outcome: "Define a few useful measures, build a readable dashboard, and explain what needs attention." },
  { tool: "SQL", title: "Answer a business question from raw tables", outcome: "Write and explain queries that turn orders, customers, or operations data into a clear finding." },
  { tool: "n8n", title: "Map and build a small AI workflow", outcome: "Connect a trigger, approved data, and a review step; explain where a person should stay in control." }
];

const mentorshipTestimonials = [
  {
    name: "Maria",
    quote: "Wholesome! I got the opportunity to learn more and gain practical insights to kick-start my data career."
  },
  {
    name: "Alois",
    quote: "Ezra makes learning fun and engaging. If he were a lecturer, no student would want to miss his classes. What I admire most is how he challenges us to solve African problems with African solutions, inspiring us to move from learners to builders and innovators."
  },
  {
    name: "Nimo",
    quote: "It is truly amazing how Ezra dedicates his time to mentoring newcomers in the industry. His training session on AI agents was a standout moment for me; it really put things into perspective and made me realize just how much work and learning I have ahead of me."
  },
  {
    name: "Ferroh",
    quote: "Ezra’s hands-on coaching strengthened my Python, Tableau, Power BI, Excel, data modeling, and n8n skills. I now deliver more accurate, executive-ready analytics and have made real progress toward becoming an industry-ready data analyst and data scientist."
  },
  {
    name: "Joel",
    quote: "Ezra helped me move beyond building dashboards to uncovering meaningful insights, understanding trends, and turning data into actionable business decisions. His practical coaching strengthened my analytical thinking and business intelligence skills."
  },
  {
    name: "Angie",
    quote: "The mentorship is mentee-led, with Ezra making sure everyone grasps each concept before moving to the next. The sessions are very interactive, and the projects are diverse and mimic real-world scenarios. Highly recommend."
  }
];

const menteeOrganizations = [
  { name: "DairyCore", logo: "/images/mentee-organizations/dairycore.png" },
  { name: "PwC", logo: "/images/mentee-organizations/pwc.png" },
  { name: "Watu Credit", logo: "/images/mentee-organizations/watu.svg", dark: true },
  { name: "Midea", logo: "/images/mentee-organizations/midea.webp" },
  { name: "Naivas Supermarket", logo: "/images/mentee-organizations/naivas.webp" },
  { name: "Standard Bank Eswatini", logo: "/images/mentee-organizations/standard-bank.svg" },
  { name: "TIFA Research", logo: "/images/mentee-organizations/tifa.png" },
  { name: "M-Pesa Africa", logo: "/images/mentee-organizations/mpesa-wordmark.svg" },
  { name: "Selecta One", logo: "/images/mentee-organizations/selecta.svg" },
  { name: "Wananchi Telecom", logo: "/images/mentee-organizations/wtl.png" }
];

export const metadata = pageMetadata("/mentorships", "Data & AI Mentorship in Kenya", "Build practical data and AI skills with mentor review. Explore Excel, Power BI, SQL, Databricks, Fabric and n8n projects grounded in African business problems.");
export const dynamic = "force-dynamic";

export default async function MentorshipsPage() {
  const mentorProfiles = await getMentorProfiles();
  const mentors = mentorProfiles.slice(0, 6);
  const applicationHref = whatsappHref("Hello Ubuntu Analytiq, I would like to ask about Data & AI mentorship. My tool or topic is: ");
  return (
    <SiteShell>
      <StructuredData data={serviceSchema({ name: "Data & AI project mentorship", description: "Tool and topic-based project mentorship with walkthroughs, mentor review, and African business examples. Scope, availability, and pricing confirmed after review.", path: "/mentorships" })} />
      <section className="ubuntu-solid-bg kenya-watermark watermark-dark border-b border-slate-200 text-white">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <Badge tone="teal" className="border-white/10 bg-white/10 text-[#72e6ff]">Mentorship</Badge>
          <h1 className="mt-5 max-w-3xl text-4xl font-semibold leading-tight tracking-tight sm:text-5xl">Data & AI mentorship. Build a project you can explain.</h1>
          <p className="mt-4 text-sm font-semibold text-[#72e6ff]">From Nairobi, Kenya, with projects grounded in African business contexts.</p>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-300">Pick a tool, a topic, or both. Tell us what you want to build. We review your goals before confirming your place, sessions, and price.</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button asChild variant="accent" size="lg"><a href={applicationHref} target="_blank" rel="noopener noreferrer">Ask about Mentorship on WhatsApp <ArrowRight size={17} /></a></Button>
            <Button asChild variant="outline" size="lg"><Link href="#choose-your-focus">Explore your options</Link></Button>
          </div>
          <p className="mt-5 max-w-xl text-sm leading-6 text-slate-300">Send your tool or topic on WhatsApp. We review your goal before confirming sessions and price.</p>
        </div>
      </section>

      <section aria-labelledby="mentorship-voices-title" className="mentorship-voices-section overflow-hidden border-b border-[#007c97]/15 py-14 text-white sm:py-20">
        <svg aria-hidden="true" className="pointer-events-none absolute inset-0 h-full w-full opacity-50" viewBox="0 0 1440 620" preserveAspectRatio="xMidYMid slice">
          <path d="M-40 110H235c74 0 74 112 148 112h404c90 0 90-125 180-125h510M-40 345h420c82 0 82-105 164-105h416c76 0 76 145 152 145h365M-40 538h286c86 0 86-88 172-88h431c93 0 93 88 186 88h442" fill="none" stroke="#72e6ff" strokeWidth="1.5" opacity="0.22" />
          <g fill="#72e6ff" opacity="0.55"><circle cx="235" cy="110" r="5" /><circle cx="787" cy="222" r="5" /><circle cx="967" cy="97" r="5" /><circle cx="380" cy="345" r="5" /><circle cx="960" cy="240" r="5" /><circle cx="418" cy="450" r="5" /><circle cx="849" cy="450" r="5" /></g>
        </svg>
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#72e6ff]">Mentorship voices</p>
          <h2 id="mentorship-voices-title" className="mt-3 text-3xl font-semibold leading-tight text-white sm:text-4xl">In their own words.</h2>
        </div>
        <MentorshipTestimonialsMarquee testimonials={mentorshipTestimonials} />
      </section>

      <section aria-labelledby="mentee-organizations-title" className="ubuntu-heritage-bg border-b border-[#00b4d8]/15 py-14 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#007c97]">Our mentee community</p>
          <h2 id="mentee-organizations-title" className="mt-2 max-w-3xl text-3xl font-semibold text-[#1e1616]">Organizations our mentees work in.</h2>
          <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-600">Our mentees bring experience from different teams and industries. These are their workplaces, not Ubuntu Analytiq clients or sponsors.</p>
          <ul className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6">
            {menteeOrganizations.map((organization) => (
              <li key={organization.name} className="flex min-h-36 flex-col items-center justify-center rounded-xl border border-slate-200 bg-white px-4 py-5 text-center shadow-sm">
                <span className={`flex h-16 w-full items-center justify-center rounded-md p-2 ${organization.dark ? "bg-[#063b74]" : ""}`}>
                  <img src={organization.logo} alt={`${organization.name} logo`} width="180" height="64" loading="lazy" className="max-h-14 max-w-full object-contain" />
                </span>
                <span className="mt-3 text-xs font-semibold leading-5 text-[#1e1616]">{organization.name}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section id="choose-your-focus" className="scroll-mt-24 py-14">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#007c97]">Choose your focus</p>
          <h2 className="mt-2 text-3xl font-semibold text-[#1e1616]">Start with the work you want to do.</h2>
          <p className="mt-3 max-w-2xl text-slate-600">Tool and topic choices help us match you with useful projects. You can choose both when you contact us.</p>
          <div className="mt-7 grid gap-5 md:grid-cols-2">
            <Card><CardContent className="p-6"><h3 className="text-xl font-semibold">Tools</h3><div className="mt-4 flex flex-wrap gap-2">{mentorshipTools.map((tool) => <span key={tool} className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1.5 text-sm">{tool}</span>)}</div></CardContent></Card>
            <Card><CardContent className="p-6"><h3 className="text-xl font-semibold">Topics</h3><div className="mt-4 flex flex-wrap gap-2">{mentorshipTopics.map((topic) => <span key={topic} className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1.5 text-sm">{topic}</span>)}</div></CardContent></Card>
          </div>
        </div>
      </section>

      <section id="decision-lab" className="ubuntu-dark-panel scroll-mt-24 py-16 text-white">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
          <div><p className="text-xs font-bold uppercase tracking-[0.18em] text-[#72e6ff]">Decision Lab project track</p><h2 className="mt-4 text-3xl font-semibold leading-tight sm:text-4xl">Build around a decision a real team needs to make.</h2><p className="mt-5 leading-8 text-slate-200">Selected projects come from organization problems. We turn them into focused learning briefs using approved or synthetic data, so you can build, test, and explain a useful solution with mentor review.</p><Button asChild variant="accent" className="mt-7"><a href={whatsappHref("Hello Ubuntu Analytiq, I would like to ask about the Decision Lab project track. My tool or topic is: ")} target="_blank" rel="noopener noreferrer">Ask about the project track <ArrowRight size={17} /></a></Button></div>
          <div className="rounded-xl border border-white/20 bg-white/5 p-6"><h3 className="text-xl font-semibold">From a safe brief to reviewed work</h3><ol className="mt-5 space-y-5 text-sm leading-7 text-slate-200">{["Match: we review your tools, experience, and learning goal against available briefs.", "Build: work within the approved scope using safe data; get mentor guidance and review.", "Test and explain: check the result, present your decisions, and improve the work from feedback."].map((step, index) => <li key={step} className="flex gap-3"><span className="font-bold text-[#72e6ff]">0{index + 1}</span>{step}</li>)}</ol><p className="mt-6 border-t border-white/15 pt-5 text-sm leading-7 text-slate-300">Project availability, sessions, and pricing are confirmed after review. Deployment is a separate organization approval step. Client data or work may only be shared in a portfolio with permission.</p><Link href="/for-organizations#decision-lab" className="mt-5 inline-block text-sm font-semibold text-[#72e6ff] underline">See how organizations bring a problem</Link></div>
        </div>
      </section>

      <section className="ubuntu-heritage-bg border-y border-[#00b4d8]/15 py-14">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#007c97]">Illustrative learner briefs</p>
          <h2 className="mt-2 text-3xl font-semibold text-[#1e1616]">The project is where the learning becomes visible.</h2>
          <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-600">These examples show the shape of a learner project. We agree your actual brief after reviewing your goal and level.</p>
          <div className="mt-7 grid gap-4 md:grid-cols-2">
            {sampleBriefs.map((brief) => <article key={brief.title} className="rounded-xl border border-[#00b4d8]/20 bg-white p-6"><span className="text-xs font-bold uppercase tracking-[0.14em] text-[#007c97]">{brief.tool}</span><h3 className="mt-3 text-xl font-semibold text-[#141014]">{brief.title}</h3><p className="mt-3 text-sm leading-7 text-slate-600">{brief.outcome}</p></article>)}
          </div>
        </div>
      </section>

      <section className="border-y border-slate-200 bg-[#f8fbfd] py-14">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#007c97]">Choose your support</p>
          <h2 className="mt-2 text-3xl font-semibold text-[#1e1616]">Three clear ways to grow.</h2>
          <div className="mt-7 grid gap-4 lg:grid-cols-3">
            {mentorshipTiers.map((tier) => (
              <Card key={tier.id} className={tier.id === "reviewed" ? "border-[#00b4d8]/50" : ""}>
                <CardContent className="flex h-full flex-col p-6">
                  <h3 className="text-2xl font-semibold">{tier.name}</h3>
                  <p className="mt-3 min-h-16 text-sm leading-6 text-slate-600">{tier.summary}</p>
                  <ul className="mt-5 space-y-2 text-sm text-slate-700">{tier.includes.map((item) => <li key={item} className="flex gap-2"><CheckCircle2 size={16} className="mt-0.5 shrink-0 text-[#007c97]" />{item}</li>)}</ul>
                  <p className="mt-6 text-sm font-medium text-slate-600">Price and session count confirmed after review.</p>
                  <Button asChild variant="accent" className="mt-4 w-full"><a href={whatsappHref(`Hello Ubuntu Analytiq, I would like to ask about ${tier.name} mentorship. My tool or topic is: `)} target="_blank" rel="noopener noreferrer">Ask about {tier.name}</a></Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="ubuntu-solid-bg border-y border-[#00b4d8]/20 py-14 text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#72e6ff]">People behind the guidance</p>
          <h2 className="mt-2 text-3xl font-semibold">Meet the mentors featured by Ubuntu.</h2>
          <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-300">The right reviewer depends on your chosen project and availability. Mentor participation is confirmed with your offer.</p>
          <div className="mt-7 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {mentors.map((mentor) => <article key={mentor.id} className="rounded-xl border border-white/15 bg-white/8 p-5"><div className="flex items-center gap-4"><img src={mentor.avatar} alt="" className="size-14 rounded-lg bg-white/10 object-cover" /><div><h3 className="font-semibold">{mentor.name}</h3><p className="text-xs text-slate-300">{mentor.currentRole || mentor.title}</p></div></div><p className="mt-4 text-sm leading-6 text-slate-300">{mentor.bio}</p></article>)}
          </div>
        </div>
      </section>

      <section id="how-it-works" className="py-14">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#007c97]">How it works</p>
            <h2 className="mt-2 text-3xl font-semibold text-[#1e1616]">We review your goal before agreeing the offer.</h2>
            <ol className="mt-6 space-y-4 text-slate-700">
              {["Tell us your tool or topic and the work you want to learn.", "Share your goal, experience, preferred project, and availability.", "We review the request and confirm the scope, sessions, and price.", "Once approved, we explain payment, project access, and how to submit your work."].map((step, index) => <li key={step} className="flex gap-3"><span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-[#1e1616] text-xs font-bold text-white">{index + 1}</span><span>{step}</span></li>)}
            </ol>
            <Button asChild variant="accent" className="mt-7"><a href={applicationHref} target="_blank" rel="noopener noreferrer">Ask about Mentorship on WhatsApp</a></Button>
          </div>
          <Card><CardContent className="p-6">
            <h3 className="text-xl font-semibold">More ways to work together</h3>
            <div className="mt-5 space-y-5 text-sm leading-6 text-slate-600">
              <div><h4 className="font-semibold text-[#1e1616]">Full mentor package</h4><p>Want ongoing sessions with one mentor? Mention this in your request. We will confirm the number of sessions and a separate price.</p></div>
              <div><h4 className="font-semibold text-[#1e1616]">Custom group mentorship</h4><p>For teams or communities with a shared goal. Tell us your group size and focus; we will shape a tailored programme.</p><a href={whatsappHref("Hello Ubuntu Analytiq, I would like to ask about group mentorship. Our group size and focus are: ")} target="_blank" rel="noopener noreferrer" className="mt-2 inline-block font-semibold text-[#007c97] underline">Ask about a group programme on WhatsApp</a></div>
            </div>
          </CardContent></Card>
        </div>
      </section>

    </SiteShell>
  );
}
