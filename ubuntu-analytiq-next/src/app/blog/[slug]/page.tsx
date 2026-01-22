import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import Header, { Footer } from "@/components/Header";
import { ArrowLeft, Clock, User, Calendar, Share2, Bookmark, Tag } from "lucide-react";

// Blog posts data - in production, fetch from CMS/database
const blogPosts: Record<
    string,
    {
        title: string;
        excerpt: string;
        date: string;
        dateISO: string;
        author: string;
        image: string;
        tags: string[];
        content: string;
        readTime: string;
        status: string;
    }
> = {
    "phoenix-ai-summit-2025": {
        title: "Phoenix AI Agents Summit 2025: Building for Us",
        excerpt: "Eight teams, one mission, and solutions only Africans could build. Reflections on the Summit that proved Africa doesn't need permission — we need opportunity.",
        date: "Feb 15, 2025",
        dateISO: "2025-02-15",
        author: "Ezra Muinde",
        image: "https://images.unsplash.com/photo-1591115765373-5207764f72e7?w=1200&auto=format&fit=crop",
        tags: ["AI Agents", "Community", "Innovation", "Phoenix Summit"],
        readTime: "12 min read",
        status: "published",
        content: `
      <p class="mb-6 text-lg text-gray-300 leading-relaxed italic">"Eight teams, one mission, and solutions only Africans could build."</p>
      
      <p class="mb-6 text-gray-300 leading-relaxed">This is the article I've kept in draft the longest.</p>
      
      <p class="mb-6 text-gray-300 leading-relaxed">It always felt like there was more to add, but a motivational speaker would say "hit publish," so here we go.</p>
      
      <p class="mb-6 text-gray-300 leading-relaxed">I had dreamed about this since 2023, back when "agents" still meant secret spies or clumsy customer support bots pretending to be helpful.</p>
      
      <p class="mb-6 text-gray-300 leading-relaxed">I was transitioning out of agribusiness (not entirely though) into data, still figuring out what AI even meant.</p>
      
      <p class="mb-6 text-gray-300 leading-relaxed">What I did know was simple. <strong class="text-white">Africa needed tools built for us by us.</strong></p>
      
      <p class="mb-6 text-gray-300 leading-relaxed">Not retrofitted copies. Not globally trained models forced into local realities.</p>
      
      <p class="mb-6 text-gray-300 leading-relaxed">Systems shaped by our culture, our languages, our challenges, and our brilliance.</p>
      
      <!-- ADD IMAGE HERE -->
      <div class="my-8 rounded-xl overflow-hidden">
        <img 
          src="YOUR_IMAGE_URL_HERE" 
          alt="Phoenix AI Summit 2025 venue" 
          class="w-full h-auto"
        />
        <p class="text-gray-500 text-sm text-center mt-2 italic">Phoenix AI Agents Summit 2025</p>
      </div>
      
      <p class="mb-6 text-gray-300 leading-relaxed">That vision sat quietly for years until I started teaching AI Agent Masterclasses.</p>
      
      <p class="mb-6 text-gray-300 leading-relaxed">The spark began with a webinar I hosted in April, "Beyond GPTs: AI Agents Unboxed."</p>
      
      <p class="mb-6 text-gray-300 leading-relaxed">And this year — 2025, the world went fully into agentic exploration and experimentation.</p>
      
      <ul class="mb-6 space-y-2 text-gray-300 ml-6">
        <li class="flex items-start gap-2">
          <span class="text-[var(--brand-cyan)] mt-1">•</span>
          <span>OpenAI dropped Agentic Kit with native tools inside ChatGPT.</span>
        </li>
        <li class="flex items-start gap-2">
          <span class="text-[var(--brand-cyan)] mt-1">•</span>
          <span>Google released its "antigravity" model after our Summit.</span>
        </li>
        <li class="flex items-start gap-2">
          <span class="text-[var(--brand-cyan)] mt-1">•</span>
          <span>Veltex launched their agent development kit.</span>
        </li>
        <li class="flex items-start gap-2">
          <span class="text-[var(--brand-cyan)] mt-1">•</span>
          <span>Claude focused on safety and auditability.</span>
        </li>
      </ul>
      
      <h2 class="text-2xl md:text-3xl font-bold text-white mt-12 mb-4">Setting the Tone: The Opening Keynote</h2>
      
      <!-- ADD IMAGE HERE -->
      <div class="my-8 rounded-xl overflow-hidden">
        <img 
          src="YOUR_IMAGE_URL_HERE" 
          alt="Ezra Muinde delivering opening keynote" 
          class="w-full h-auto"
        />
        <p class="text-gray-500 text-sm text-center mt-2 italic">Yours truly delivering the opening keynote</p>
      </div>
      
      <p class="mb-6 text-gray-300 leading-relaxed">In the opening keynote of the Summit, I made one thing clear. <strong class="text-white">2025 is the year of agentic exploration.</strong></p>
      
      <p class="mb-6 text-gray-300 leading-relaxed">Not the 2023 era of "assistants" that only generated text, but a new paradigm where AI delivers actual outcomes; paying invoices, updating inventory, validating suppliers, reconciling finances. Real work.</p>
      
      <p class="mb-6 text-gray-300 leading-relaxed">I broke down the anatomy of agentic systems into four essential pillars:</p>
      
      <ul class="mb-6 space-y-2 text-gray-300 ml-6">
        <li class="flex items-start gap-2">
          <span class="text-[var(--brand-cyan)] mt-1">•</span>
          <span><strong class="text-white">Brain</strong> for reasoning</span>
        </li>
        <li class="flex items-start gap-2">
          <span class="text-[var(--brand-cyan)] mt-1">•</span>
          <span><strong class="text-white">Memory</strong> for context</span>
        </li>
        <li class="flex items-start gap-2">
          <span class="text-[var(--brand-cyan)] mt-1">•</span>
          <span><strong class="text-white">Senses</strong> for retrieval</span>
        </li>
        <li class="flex items-start gap-2">
          <span class="text-[var(--brand-cyan)] mt-1">•</span>
          <span><strong class="text-white">Hands</strong> for action</span>
        </li>
      </ul>
      
      <p class="mb-6 text-gray-300 leading-relaxed">Then I mapped out the three trends shaping this new landscape:</p>
      
      <ul class="mb-6 space-y-2 text-gray-300 ml-6">
        <li class="flex items-start gap-2">
          <span class="text-[var(--brand-cyan)] mt-1">•</span>
          <span><strong class="text-white">Digital Teams</strong>, multi-agent loops working together</span>
        </li>
        <li class="flex items-start gap-2">
          <span class="text-[var(--brand-cyan)] mt-1">•</span>
          <span><strong class="text-white">Digital Colleagues</strong>, specialized agents solving vertical tasks</span>
        </li>
        <li class="flex items-start gap-2">
          <span class="text-[var(--brand-cyan)] mt-1">•</span>
          <span><strong class="text-white">Agent-to-Agent economies</strong>, where systems negotiate and transact independently — my personal favorite.</span>
        </li>
      </ul>
      
      <p class="mb-6 text-gray-300 leading-relaxed">This framing mattered because it grounded everything the teams had built and aligned with what the attendees wanted to see.</p>
      
      <p class="mb-6 text-gray-300 leading-relaxed">It also set the tone for the kind of mentorship I knew they needed in next steps.</p>
      
      <h2 class="text-2xl md:text-3xl font-bold text-white mt-12 mb-4">The Pitch Behind the Movement</h2>
      
      <p class="mb-6 text-gray-300 leading-relaxed">I shared the idea with Susan. We were aligned immediately, or maybe great minds simply collide.</p>
      
      <p class="mb-6 text-gray-300 leading-relaxed">I had the entire blueprint ready: the theme ("Building for our SMEs"), the use cases, how the teams will be formed, and the judging process.</p>
      
      <p class="mb-6 text-gray-300 leading-relaxed">Her questions were fair. Who will attend? What exactly are we showcasing?</p>
      
      <p class="mb-6 text-gray-300 leading-relaxed">And mine: How do we fund this?</p>
      
      <p class="mb-6 text-gray-300 leading-relaxed">Three long weeks of debate followed.</p>
      
      <p class="mb-6 text-gray-300 leading-relaxed">Three weeks of "Why Phoenix?" and "Who will attend?"</p>
      
      <p class="mb-6 text-gray-300 leading-relaxed">After one particularly tough session, still unconvinced, she asked what was missing.</p>
      
      <p class="mb-6 text-gray-300 leading-relaxed">I turned the question around: "What do you want this event to look like that I haven't already outlined?" That flipped the switch — I believe.</p>
      
      <p class="mb-6 text-gray-300 leading-relaxed"><strong class="text-white">We weren't launching an event.<br/>We were launching a statement.</strong></p>
      
      <p class="mb-6 text-gray-300 leading-relaxed">And a technical challenge that I knew I would carry almost entirely on my own.</p>
      
      <h2 class="text-2xl md:text-3xl font-bold text-white mt-12 mb-4">The Part No One Saw: One Mentor, Twelve Teams, Zero In-Person Meetings</h2>
      
      <p class="mb-6 text-gray-300 leading-relaxed">People saw the magic on stage.<br/>They didn't see the work behind the curtain.</p>
      
      <p class="mb-6 text-gray-300 leading-relaxed">I was the sole technical mentor for 12 teams.<br/>
      Twelve fully remote teams.<br/>
      Twelve teams building production-grade agentic systems in four weeks.<br/>
      Twelve teams depending on one person for architecture, debugging, workflow design, prompting frameworks, integration logic, and every agentic edge case you can imagine.</p>
      
      <div class="my-8 p-6 bg-[var(--brand-cyan)]/10 border-l-4 border-[var(--brand-cyan)] rounded-lg">
        <p class="text-gray-300 leading-relaxed"><em>Next year, I can't do it alone. This is something we agreed with Phoenix team. This year proved that solo mentorship is powerful, but it is not sustainable and it is not diverse.</em></p>
      </div>
      
      <p class="mb-6 text-gray-300 leading-relaxed">Agentic systems demand multiple perspectives, and Phoenix has the capacity to bring that diversity.</p>
      
      <p class="mb-6 text-gray-300 leading-relaxed">Next year, we build a mentorship structure that is broader, sharper, and far more inclusive. We do it better.</p>
      
      <p class="mb-6 text-gray-300 leading-relaxed">Every week had a fixed target:</p>
      
      <ul class="mb-6 space-y-2 text-gray-300 ml-6">
        <li class="flex items-start gap-2">
          <span class="text-[var(--brand-cyan)] mt-1">•</span>
          <span>Week 1 for problem definition and agent workflow.</span>
        </li>
        <li class="flex items-start gap-2">
          <span class="text-[var(--brand-cyan)] mt-1">•</span>
          <span>Week 2 for the first prototype.</span>
        </li>
        <li class="flex items-start gap-2">
          <span class="text-[var(--brand-cyan)] mt-1">•</span>
          <span>Week 3 for a functional agent.</span>
        </li>
        <li class="flex items-start gap-2">
          <span class="text-[var(--brand-cyan)] mt-1">•</span>
          <span>Week 4 for final iteration and pitch.</span>
        </li>
      </ul>
      
      <p class="mb-6 text-gray-300 leading-relaxed">All of this happened virtually.<br/>
      No in-person reviews.<br/>
      Just trust, rigor, and a shared mission.</p>
      
      <h2 class="text-2xl md:text-3xl font-bold text-white mt-12 mb-4">Why Mentorship Matters: The Stahkit Decision</h2>
      
      <p class="mb-6 text-gray-300 leading-relaxed">Stahkit missed a critical Week 3 deadline. That week determined which teams could realistically deliver a functional agent by the end.</p>
      
      <p class="mb-6 text-gray-300 leading-relaxed">They also missed a weekly check-in. I knew they were working, but rules exist for a reason.</p>
      
      <p class="mb-6 text-gray-300 leading-relaxed">I had already dropped another team that same week for the exact issue.<br/>
      Hard decision, but necessary.</p>
      
      <p class="mb-6 text-gray-300 leading-relaxed">Stahkit was different.<br/>
      They were late, but they were not careless.<br/>
      They were behind, but not lost.<br/>
      They were missing deadlines, but they were fighting to build.</p>
      
      <p class="mb-6 text-gray-300 leading-relaxed">Their internal momentum was obvious. Their prototype foundation was already stronger than most teams.</p>
      
      <p class="mb-6 text-gray-300 leading-relaxed">They were not disorganized. They were simply buried in execution.</p>
      
      <p class="mb-6 text-gray-300 leading-relaxed">So I didn't drop them.</p>
      
      <p class="mb-6 text-gray-300 leading-relaxed"><strong class="text-white">Because mentorship is not about enforcing rules blindly.</strong></p>
      
      <p class="mb-6 text-gray-300 leading-relaxed">It is about recognizing the difference between a team that is failing and a team that is fighting.</p>
      
      <p class="mb-6 text-gray-300 leading-relaxed">And Stahkit was fighting.</p>
      
      <h2 class="text-2xl md:text-3xl font-bold text-white mt-12 mb-4">Belief Before Proof: The Leadership Behind Phoenix</h2>
      
      <p class="mb-6 text-gray-300 leading-relaxed">Credit to Susan and the Phoenix team for believing in this vision before it made sense on paper.</p>
      
      <p class="mb-6 text-gray-300 leading-relaxed">It takes a certain kind of courage and let's be honest, you only see this kind of bold trust in an organization led by a woman to give an experiment like this the space to grow.</p>
      
      <p class="mb-6 text-gray-300 leading-relaxed">Her leadership as SHEO let this idea breathe, stretch, and become something real.</p>
      
      <p class="mb-6 text-gray-300 leading-relaxed">Without that belief, none of what came next would have happened.</p>
      
      <h2 class="text-2xl md:text-3xl font-bold text-white mt-12 mb-4">Showcasing the Work: Eight Teams, Eight Real Problems, Eight African Solutions</h2>
      
      <p class="mb-6 text-gray-300 leading-relaxed">One of the most rewarding parts of this journey was seeing how each team solved a real SME problem with agents built from our context, not imported assumptions.</p>
      
      <div class="my-8 space-y-6">
        <div class="p-6 bg-[var(--brand-surface)] border border-white/10 rounded-xl">
          <h3 class="text-xl font-bold text-white mb-3">StahkIT - Smart Cash-Flow & Invoicing</h3>
          <p class="text-gray-300 leading-relaxed">Built a multi-agent finance co-pilot that unified M-Pesa, banks, and invoices to automate reminders, assess loan eligibility, and even support supplier negotiation and marketing planning.</p>
        </div>
        
        <div class="p-6 bg-[var(--brand-surface)] border border-white/10 rounded-xl">
          <h3 class="text-xl font-bold text-white mb-3">Nova-Z - Supplier Negotiation</h3>
          <p class="text-gray-300 leading-relaxed">Created a negotiation co-pilot that scraped real-time market data with n8n, analyzed trends, and narrated insights through ElevenLabs so SMEs could negotiate with actual leverage.</p>
        </div>
        
        <div class="p-6 bg-[var(--brand-surface)] border border-white/10 rounded-xl">
          <h3 class="text-xl font-bold text-white mb-3">Singularity Squad - SME Marketing</h3>
          <p class="text-gray-300 leading-relaxed">Built a virtual marketing assistant that generates complete, data-backed campaigns, schedules, budgets, and continuous optimization.</p>
        </div>
        
        <div class="p-6 bg-[var(--brand-surface)] border border-white/10 rounded-xl">
          <h3 class="text-xl font-bold text-white mb-3">Elevate AI - Business Intelligence</h3>
          <p class="text-gray-300 leading-relaxed">Delivered Inua360, an AI adviser that translates raw financial and market data into clear insights, forecasts, and growth decisions.</p>
        </div>
        
        <div class="p-6 bg-[var(--brand-surface)] border border-white/10 rounded-xl">
          <h3 class="text-xl font-bold text-white mb-3">FinSight KE - Cashflow & Credit</h3>
          <p class="text-gray-300 leading-relaxed">Built an AI assistant that digitizes invoices via OCR, forecasts liquidity gaps, and generates microloan eligibility scoring in English and Swahili.</p>
        </div>
        
        <div class="p-6 bg-[var(--brand-surface)] border border-white/10 rounded-xl">
          <h3 class="text-xl font-bold text-white mb-3">Infoundr - Workflow Automation</h3>
          <p class="text-gray-300 leading-relaxed">Integrated AI with business tools to automate communication, scheduling, and reporting through natural text or voice.</p>
        </div>
        
        <div class="p-6 bg-[var(--brand-surface)] border border-white/10 rounded-xl">
          <h3 class="text-xl font-bold text-white mb-3">Nairobits - Marketing Automation</h3>
          <p class="text-gray-300 leading-relaxed">Created PromoGPT, a marketing planner that crafts campaigns, calendars, and ad copy while integrating with Shopify, HubSpot, and QuickBooks for personalized insights.</p>
        </div>
        
        <div class="p-6 bg-[var(--brand-surface)] border border-white/10 rounded-xl">
          <h3 class="text-xl font-bold text-white mb-3">Netskyline - Construction Systems</h3>
          <p class="text-gray-300 leading-relaxed">Built SiteSupervisor, a context-aware agent that centralizes fleet data, predicts downtime, and optimizes project forecasting for construction SMEs.</p>
        </div>
      </div>
      
      <p class="mb-6 text-gray-300 leading-relaxed"><strong class="text-white">These weren't demos. They were real, working systems built by people solving problems they understand intimately.</strong> That is what building for us by us looks like.</p>
      
      <h2 class="text-2xl md:text-3xl font-bold text-white mt-12 mb-4">The Moment That Rewrote the Room</h2>
      
      <!-- ADD IMAGE HERE -->
      <div class="my-8 rounded-xl overflow-hidden">
        <img 
          src="YOUR_IMAGE_URL_HERE" 
          alt="Stahkit team presenting" 
          class="w-full h-auto"
        />
        <p class="text-gray-500 text-sm text-center mt-2 italic">The Stahkit team during their presentation</p>
      </div>
      
      <p class="mb-6 text-gray-300 leading-relaxed">If Phoenix 2025 had a plot twist, it was Stahkit.</p>
      
      <p class="mb-6 text-gray-300 leading-relaxed">They walked in with an AI voice agent and opened with, "Hope you're emotionally prepared."</p>
      
      <p class="mb-6 text-gray-300 leading-relaxed">Their presentation was completely authentic. At one point, one of them even said, <em>"Let me just show you the agent so you don't think hizi ni story za jaba"</em> 😅</p>
      
      <p class="mb-6 text-gray-300 leading-relaxed">The room went silent. Not because the agent was perfect. <strong class="text-white">Because it was possible.</strong></p>
      
      <p class="mb-6 text-gray-300 leading-relaxed">Bold.<br/>
      Ridiculous.<br/>
      Authentic.</p>
      
      <p class="mb-6 text-gray-300 leading-relaxed">The agent didn't just talk. It spoke SME slang, dropped lines in Kikuyu, and could switch to Luo, and navigated through the major local dialects with ease.</p>
      
      <p class="mb-6 text-gray-300 leading-relaxed">One attendee even tested it live, engaging the agent on the spot, and it held its ground like it had grown up in the same neighborhoods as the builders themselves.</p>
      
      <p class="mb-6 text-gray-300 leading-relaxed">And for me, a technical validation of the entire mentorship journey.</p>
      
      <p class="mb-6 text-gray-300 leading-relaxed"><strong class="text-white">African builders do not need permission.<br/>
      They need opportunity.</strong></p>
      
      <h2 class="text-2xl md:text-3xl font-bold text-white mt-12 mb-4">The Hard Question: Why Are We Still Judging Like It's 2015?</h2>
      
      <p class="mb-6 text-gray-300 leading-relaxed">Watching the teams made one thing obvious.</p>
      
      <p class="mb-6 text-gray-300 leading-relaxed">Our builders are evolving.<br/>
      Our judging frameworks are not.</p>
      
      <p class="mb-6 text-gray-300 leading-relaxed">We are still using startup-era metrics:</p>
      
      <ul class="mb-6 space-y-2 text-gray-300 ml-6">
        <li class="flex items-start gap-2">
          <span class="text-[var(--brand-cyan)] mt-1">•</span>
          <span>Pitch decks.</span>
        </li>
        <li class="flex items-start gap-2">
          <span class="text-[var(--brand-cyan)] mt-1">•</span>
          <span>Traction slides.</span>
        </li>
        <li class="flex items-start gap-2">
          <span class="text-[var(--brand-cyan)] mt-1">•</span>
          <span>Revenue talk.</span>
        </li>
        <li class="flex items-start gap-2">
          <span class="text-[var(--brand-cyan)] mt-1">•</span>
          <span>Three-minute demos.</span>
        </li>
      </ul>
      
      <p class="mb-6 text-gray-300 leading-relaxed">But agentic AI is not SaaS.<br/>
      You cannot measure workflow autonomy with a slide deck.<br/>
      You cannot evaluate multi-agent chains in three minutes.</p>
      
      <p class="mb-6 text-gray-300 leading-relaxed">If we keep using outdated frameworks, we will miss the breakthroughs happening right in front of us.</p>
      
      <p class="mb-6 text-gray-300 leading-relaxed">Stahkit did not win because they pitched well.<br/>
      They won because they built something unmistakably ahead of the curve.</p>
      
      <h2 class="text-2xl md:text-3xl font-bold text-white mt-12 mb-4">What Comes Next: 2026 Will Be Unhinged</h2>
      
      <p class="mb-6 text-gray-300 leading-relaxed">If 2025 was the prototype, 2026 will be the full release.</p>
      
      <p class="mb-6 text-gray-300 leading-relaxed">The builders now know what is possible.<br/>
      The mentors know how to guide serious agentic work.<br/>
      The community understands that Phoenix is not a meetup.<br/>
      <strong class="text-white">It is a movement.</strong></p>
      
      <p class="mb-6 text-gray-300 leading-relaxed">The next Summit will be bigger.<br/>
      Sharper.<br/>
      More agentic.<br/>
      And backed by a judging model worthy of Africa's innovation curve.</p>
      
      <p class="mb-6 text-gray-300 leading-relaxed"><strong class="text-white">Because building for us by us is not a slogan.<br/>
      It is the responsibility.<br/>
      It is the technical work.<br/>
      It is the future.</strong></p>
    `,
    },
    "why-excel-matters": {
        title: "Why Excel Still Matters in the Age of AI",
        excerpt:
            "In a world of LLMs and Python, the spreadsheet remains the undefeated champion of business data.",
        date: "Jan 10, 2025",
        dateISO: "2025-01-10",
        author: "Ezra Muinde",
        image:
            "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&auto=format&fit=crop",
        tags: ["Data Science", "Excel", "Foundations"],
        readTime: "4 min read",
        status: "published",
        content: `
      <p class="mb-6 text-lg text-gray-300 leading-relaxed">It is fashionable in tech circles to bash Excel. "It's not reproducible," they say. "It can't handle big data," they argue. And while true, they miss the point entirely.</p>
      
      <h2 class="text-2xl md:text-3xl font-bold text-white mt-10 mb-4">The UI of Business</h2>
      <p class="mb-6 text-gray-300 leading-relaxed">Excel is the user interface of business. You can build the most sophisticated Python model in the world, but the output will almost certainly need to be delivered in a spreadsheet for the CEO to read it. It is the common language of commerce.</p>
      
      <h2 class="text-2xl md:text-3xl font-bold text-white mt-10 mb-4">AI Needs Structure</h2>
      <p class="mb-6 text-gray-300 leading-relaxed">With the advent of Copilot and AI integrations, Excel is getting a second wind. But here is the catch: AI cannot fix messy data. To leverage AI effectively in Excel, you still need to understand data structure, normalization, and logic. You cannot prompt your way out of a bad pivot table.</p>
      
      <p class="mb-6 text-gray-300 leading-relaxed">So before you rush to learn the latest vector database, make sure you can still do a VLOOKUP. It matters more than you think.</p>
      
      <h2 class="text-2xl md:text-3xl font-bold text-white mt-10 mb-4">The Power BI Bridge</h2>
      <p class="mb-6 text-gray-300 leading-relaxed">For those ready to level up, <a href="/courses/powerbi-workshop" class="text-[var(--brand-cyan)] hover:underline font-semibold">Power BI offers the perfect bridge</a> between spreadsheet thinking and modern BI dashboards. It speaks Excel's language while unlocking the power of data modeling.</p>
    `,
    },
    "colleagues-friends": {
        title: "Your Colleagues Are Actually Your Friends (Shoot Me)",
        excerpt:
            '"But of course you are replaceable… but your impact isn\'t."',
        date: "Dec 25, 2024",
        dateISO: "2024-12-25",
        author: "Ezra Muinde",
        image:
            "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1200&auto=format&fit=crop",
        tags: ["Culture", "Workplace", "Mental Health"],
        readTime: "3 min read",
        status: "published",
        content: `
      <p class="mb-6 text-lg text-gray-300 leading-relaxed">There is a popular LinkedIn sentiment that says, "Your colleagues are not your family; they are just people you work with." I want to push back on that.</p>
      
      <h2 class="text-2xl md:text-3xl font-bold text-white mt-10 mb-4">The Cost of Armor</h2>
      <p class="mb-6 text-gray-300 leading-relaxed">We spend more waking hours with our colleagues than with anyone else. Maintaining a rigid "professional mask" is exhausting. It requires constant energy to filter your personality, hide your struggles, and present a polished facade. This armor doesn't protect us; it isolates us.</p>
      
      <h2 class="text-2xl md:text-3xl font-bold text-white mt-10 mb-4">Vulnerability as a KPI</h2>
      <p class="mb-6 text-gray-300 leading-relaxed">In high-performing technical teams, trust is the currency. You cannot build complex systems if you are afraid to say, "I don't know," or "I made a mistake." Real friendship—the kind that allows for psychological safety—is actually a productivity hack. When we care about each other, we communicate better, we forgive faster, and we build better products.</p>
      
      <p class="mb-6 text-gray-300 leading-relaxed">So yes, maybe they are just colleagues. But making them friends might be the best career move you ever make.</p>
    `,
    },
};

// Filter only published posts
const publishedPosts = Object.entries(blogPosts).reduce((acc, [key, post]) => {
    if (post.status === "published") {
        acc[key] = post;
    }
    return acc;
}, {} as typeof blogPosts);

// Generate static params for published posts only
export function generateStaticParams() {
    return Object.keys(publishedPosts).map((slug) => ({
        slug,
    }));
}

// Generate metadata for each post
export function generateMetadata({
    params,
}: {
    params: { slug: string };
}): Metadata {
    const post = publishedPosts[params.slug];
    if (!post) {
        return {
            title: "Post Not Found",
        };
    }

    return {
        title: post.title,
        description: post.excerpt,
        alternates: {
            canonical: `https://ubuntuanalytiq.com/blog/${params.slug}`,
        },
        openGraph: {
            title: `${post.title} | Ubuntu AnalytIQ`,
            description: post.excerpt,
            url: `https://ubuntuanalytiq.com/blog/${params.slug}`,
            type: "article",
            publishedTime: post.dateISO,
            authors: [post.author],
            images: [
                {
                    url: post.image,
                    width: 1200,
                    height: 630,
                    alt: post.title,
                },
            ],
        },
        twitter: {
            card: "summary_large_image",
            title: post.title,
            description: post.excerpt,
            images: [post.image],
        },
    };
}

export default function BlogPostPage({ params }: { params: { slug: string } }) {
    const post = publishedPosts[params.slug];

    if (!post) {
        notFound();
    }

    // Article Schema
    const articleSchema = {
        "@context": "https://schema.org",
        "@type": "Article",
        "@id": `https://ubuntuanalytiq.com/blog/${params.slug}#article`,
        headline: post.title,
        description: post.excerpt,
        image: post.image,
        datePublished: post.dateISO,
        dateModified: post.dateISO,
        author: {
            "@type": "Person",
            name: post.author,
            url: "https://ubuntuanalytiq.com/about#ezra",
        },
        publisher: {
            "@id": "https://ubuntuanalytiq.com/#organization",
        },
        mainEntityOfPage: {
            "@type": "WebPage",
            "@id": `https://ubuntuanalytiq.com/blog/${params.slug}`,
        },
    };

    // Breadcrumb Schema
    const breadcrumbSchema = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
            {
                "@type": "ListItem",
                position: 1,
                name: "Home",
                item: "https://ubuntuanalytiq.com",
            },
            {
                "@type": "ListItem",
                position: 2,
                name: "Blog",
                item: "https://ubuntuanalytiq.com/blog",
            },
            {
                "@type": "ListItem",
                position: 3,
                name: post.title,
                item: `https://ubuntuanalytiq.com/blog/${params.slug}`,
            },
        ],
    };

    return (
        <>
            <Header />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify(articleSchema),
                }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify(breadcrumbSchema),
                }}
            />

            <main className="min-h-screen pt-20 pb-16 bg-[var(--brand-dark)]">
                
                {/* Breadcrumb */}
                <nav
                    aria-label="Breadcrumb"
                    className="max-w-4xl mx-auto px-4 sm:px-6 pb-6 text-sm text-gray-400"
                >
                    <ol className="flex items-center gap-2 flex-wrap">
                        <li>
                            <Link href="/" className="hover:text-[var(--brand-cyan)] transition-colors">
                                Home
                            </Link>
                        </li>
                        <li>/</li>
                        <li>
                            <Link href="/blog" className="hover:text-[var(--brand-cyan)] transition-colors">
                                Blog
                            </Link>
                        </li>
                        <li>/</li>
                        <li className="text-[var(--brand-cyan)] truncate max-w-[150px] sm:max-w-[200px]">
                            {post.title}
                        </li>
                    </ol>
                </nav>

                <article className="max-w-4xl mx-auto px-4 sm:px-6">
                    
                    {/* Back link */}
                    <Link
                        href="/blog"
                        className="inline-flex items-center text-gray-400 hover:text-[var(--brand-cyan)] mb-8 transition-colors group"
                    >
                        <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
                        Back to Blog
                    </Link>

                    {/* Header */}
                    <header className="mb-8">
                        <div className="flex flex-wrap gap-2 mb-6">
                            {post.tags.map((tag) => (
                                <span
                                    key={tag}
                                    className="flex items-center gap-1 px-3 py-1 bg-[var(--brand-cyan)]/10 text-[var(--brand-cyan)] text-xs font-bold rounded-full"
                                >
                                    <Tag className="w-3 h-3" />
                                    {tag}
                                </span>
                            ))}
                        </div>

                        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
                            {post.title}
                        </h1>

                        <p className="text-lg md:text-xl text-gray-400 mb-6 leading-relaxed">
                            {post.excerpt}
                        </p>

                        <div className="flex flex-wrap items-center gap-4 md:gap-6 text-sm text-gray-400 pb-6 border-b border-white/10">
                            <div className="flex items-center gap-2">
                                <User className="w-4 h-4" />
                                <span className="font-semibold text-white">{post.author}</span>
                            </div>
                            <span className="hidden sm:inline">•</span>
                            <time dateTime={post.dateISO} className="flex items-center gap-2">
                                <Calendar className="w-4 h-4" />
                                {post.date}
                            </time>
                            <span className="hidden sm:inline">•</span>
                            <div className="flex items-center gap-2">
                                <Clock className="w-4 h-4" />
                                <span>{post.readTime}</span>
                            </div>
                        </div>

                        {/* Share actions */}
                        <div className="flex items-center gap-3 mt-6">
                            <button className="flex items-center gap-2 px-4 py-2 bg-[var(--brand-surface)] border border-white/10 rounded-full text-gray-400 hover:text-white hover:border-white/20 transition-all text-sm font-semibold">
                                <Share2 className="w-4 h-4" />
                                <span className="hidden sm:inline">Share</span>
                            </button>
                            <button className="flex items-center gap-2 px-4 py-2 bg-[var(--brand-surface)] border border-white/10 rounded-full text-gray-400 hover:text-white hover:border-white/20 transition-all text-sm font-semibold">
                                <Bookmark className="w-4 h-4" />
                                <span className="hidden sm:inline">Save</span>
                            </button>
                        </div>
                    </header>

                    {/* Featured Image */}
                    <div className="relative h-[300px] sm:h-[400px] md:h-[500px] rounded-2xl overflow-hidden mb-12 bg-[var(--brand-surface)]">
                        <Image
                            src={post.image}
                            alt={post.title}
                            fill
                            className="object-cover"
                            priority
                            sizes="(max-width: 896px) 100vw, 896px"
                        />
                    </div>

                    {/* Content */}
                    <div
                        className="prose prose-invert prose-lg max-w-none
                                   prose-headings:font-bold
                                   prose-h2:text-2xl prose-h2:md:text-3xl prose-h2:mt-10 prose-h2:mb-4
                                   prose-h3:text-xl prose-h3:md:text-2xl prose-h3:mt-8 prose-h3:mb-3
                                   prose-p:text-gray-300 prose-p:leading-relaxed prose-p:mb-6
                                   prose-a:text-[var(--brand-cyan)] prose-a:font-semibold prose-a:no-underline hover:prose-a:underline
                                   prose-strong:text-white prose-strong:font-bold
                                   prose-li:text-gray-300"
                        dangerouslySetInnerHTML={{ __html: post.content }}
                    />

                    {/* Author Bio */}
                    <div className="mt-16 p-6 md:p-8 bg-[var(--brand-surface)] border border-white/10 rounded-2xl">
                        <div className="flex items-start gap-4">
                            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[var(--brand-cyan)] to-[var(--brand-blue)] flex items-center justify-center text-white text-xl font-bold flex-shrink-0">
                                EM
                            </div>
                            <div className="flex-1">
                                <h3 className="text-xl font-bold text-white mb-2">
                                    About {post.author}
                                </h3>
                                <p className="text-gray-400 leading-relaxed mb-4">
                                    Founder of Ubuntu AnalytIQ, specializing in AI training and data strategy
                                    for African organizations. Passionate about building indigenous tech solutions
                                    that understand local context.
                                </p>
                                <Link
                                    href="/about"
                                    className="inline-flex items-center text-[var(--brand-cyan)] font-semibold hover:text-white transition-colors"
                                >
                                    Learn more
                                    <ArrowRight className="w-4 h-4 ml-1" />
                                </Link>
                            </div>
                        </div>
                    </div>

                    {/* CTA */}
                    <div className="mt-16 p-8 md:p-10 bg-gradient-to-br from-[var(--brand-cyan)]/10 via-[var(--brand-surface)] to-[var(--brand-blue)]/10 border border-[var(--brand-cyan)]/20 rounded-2xl text-center">
                        <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
                            Ready to Build Your AI Skills?
                        </h2>
                        <p className="text-gray-400 mb-6 max-w-xl mx-auto">
                            Take our free assessment to discover your personalized learning
                            path and start mastering AI tools today.
                        </p>
                        <Link
                            href="/assessment"
                            className="inline-block px-8 py-4 bg-[var(--brand-cyan)] text-[var(--brand-dark)] rounded-full font-bold hover:bg-cyan-300 transition-all shadow-lg shadow-cyan-500/20 hover:shadow-cyan-500/40"
                        >
                            Start AI Fluency Assessment
                        </Link>
                    </div>
                </article>
            </main>

            <Footer />
        </>
    );
}
