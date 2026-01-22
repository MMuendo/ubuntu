import { Course, Product, Question, BlogPost } from './types';
import React from 'react';
import { BarChart3, Brain, Bot, FileSpreadsheet, Database, Zap } from 'lucide-react';

export const COURSES: Course[] = [
  {
    id: 'excel-workshop',
    title: 'Data Thinking with Excel',
    price: 20000,
    description: 'Learn how to structure problems, model business logic, and communicate insights — not just use formulas. This program builds the analytical mindset every decision professional needs before scaling to BI or AI.',
    level: 'Excel Workshop',
    tags: ['Data Analysis', 'Productivity', '3 Months']
  },
  {
    id: 'powerbi-workshop',
    title: 'From Reporting to Decision Systems',
    price: 20000,
    description: 'This mentorship is for professionals who’ve outgrown spreadsheets and want to build decision-ready dashboards that executives actually use. You’ll learn how to translate business questions into automated, scalable decision systems using Power BI.',
    level: 'Power BI Hybrid',
    tags: ['Business Intelligence', 'Dashboards', '3 Months']
  },
  {
    id: 'ai-mastery',
    title: 'AI Fluency for Business Leaders & Analysts',
    price: 7500,
    description: 'This is not about prompts. It’s about understanding where AI fits — and where it doesn’t — in decision-making, analytics, and leadership. Ideal for professionals who want to lead AI conversations, not follow trends.',
    level: 'AI Mastery',
    tags: ['AI Fluency', 'Prompting', '1 Month']
  },
  {
    id: 'ai-agents-masterclass',
    title: 'Agentic Systems for Decision Automation',
    price: 12500,
    description: 'Design AI agents that don’t just automate tasks — but support analysis, monitoring, and decision execution in real business environments. This is where analysts transition into system thinkers.',
    level: 'AI Agents',
    tags: ['Agentic AI', 'Automation', '1 Month']
  }
];

export const PLANS: { [key: string]: Product } = {
  BASIC: {
    id: 'ai-mastery-plan',
    name: 'AI Mastery Plan',
    price: 7500,
    description: 'Master AI fundamentals, prompting techniques, and ethics. Includes weekly mentorship check-ins and WhatsApp community access.'
  },
  ADVANCED: {
    id: 'ai-agents-plan',
    name: 'AI Agents Mastery Plan',
    price: 12500,
    description: 'Design and deploy autonomous AI agents with n8n automation, APIs, and agentic workflows. Includes weekly mentorship and WhatsApp community.'
  }
};

export const SERVICES = [
  {
    title: 'Business Analytics',
    description: 'Custom solutions and corporate training to turn raw data into strategic assets.',
    icon: <BarChart3 className="w-8 h-8 text-cyan-400" />
  },
  {
    title: 'AI & Data Fluency',
    description: 'Comprehensive training and ethical AI consultancy for modern teams.',
    icon: <Brain className="w-8 h-8 text-purple-400" />
  },
  {
    title: 'Agentic Workflows',
    description: 'Designing proactive AI agents and automation systems that work for you.',
    icon: <Bot className="w-8 h-8 text-blue-400" />
  }
];

export const ASSESSMENT_QUESTIONS: Question[] = [
  // PART 1: AI Fluency (Questions 1-10) - Intermediate Level
  {
    id: 1,
    text: "You are a Kenyan SME owner wanting to draft a localized marketing email for a Nairobi audience. Which prompting technique would yield the most culturally relevant result?",
    options: [
      "Act as a Kenyan digital marketer. Write an email for [Product] using local slang (Sheng) and professional English, targeting youth in Kilimani.",
      "Write a marketing email for [Product].",
      "Summarize this product description into an email.",
      "Write a sales pitch in the style of Shakespeare."
    ],
    correctIndex: 0,
    category: "Intermediate"
  },
  {
    id: 2,
    text: "Which AI tool is best suited for 'Real-Time' market research (e.g., finding current maize prices in Nakuru or competitor pricing)?",
    options: [
      "Midjourney",
      "ChatGPT (Free Version 3.5)",
      "Perplexity AI / Google Gemini (Tools with Web Search)",
      "Claude AI"
    ],
    correctIndex: 2,
    category: "Intermediate"
  },
  {
    id: 3,
    text: "Under Kenya's Data Protection Act (2019), what is a major risk when pasting customer phone numbers and credit limits into a public LLM like ChatGPT?",
    options: [
      "The model will refuse to process numbers.",
      "Data Leakage & Violation of Privacy (The model might train on this confidential data).",
      "It costs too much money.",
      "The internet connection will fail."
    ],
    correctIndex: 1,
    category: "Intermediate"
  },
  {
    id: 4,
    text: "You want to automate customer support for your business on a platform most Africans use daily. Which tool integration is most valuable?",
    options: [
      "Email Autoresponder",
      "Slack Bot",
      "Discord Server",
      "WhatsApp Business API + AI Chatbot"
    ],
    correctIndex: 3,
    category: "Intermediate"
  },
  {
    id: 5,
    text: "What is 'Chain of Thought' prompting?",
    options: [
      "Writing a very long prompt with no punctuation.",
      "Asking the AI to link multiple websites together.",
      "Asking the AI to 'Think step-by-step' to improve reasoning on complex math or logic problems.",
      "Translating text from English to Swahili."
    ],
    correctIndex: 2,
    category: "Intermediate"
  },
  {
    id: 6,
    text: "Your AI just invented a fact about a Kenyan historical figure that isn't true. What is this phenomenon called?",
    options: [
      "Hallucination",
      "Temperature Spiking",
      "Overfitting",
      "RAG"
    ],
    correctIndex: 0,
    category: "Intermediate"
  },
  {
    id: 7,
    text: "Which of these is a 'Generative AI' task?",
    options: [
      "Storing files in the cloud.",
      "Sorting an Excel sheet alphabetically.",
      "Calculating the sum of a sales column.",
      "Creating a new logo or writing a blog post from scratch."
    ],
    correctIndex: 3,
    category: "Intermediate"
  },
  {
    id: 8,
    text: "Why is 'Context Window' important when analyzing a long PDF report (e.g., a 50-page annual report)?",
    options: [
      "It determines the speed of the internet.",
      "It limits how much text the AI can 'read' and remember at one time.",
      "It changes the color of the interface.",
      "It is the price per month of the tool."
    ],
    correctIndex: 1,
    category: "Intermediate"
  },
  {
    id: 9,
    text: "For a graphic designer in Nairobi, which tool is specifically built for generating high-quality images from text?",
    options: [
      "Zapier",
      "Claude 3.5 Sonnet",
      "GitHub Copilot",
      "Midjourney / DALL-E 3"
    ],
    correctIndex: 3,
    category: "Intermediate"
  },
  {
    id: 10,
    text: "What is the most effective way to protect your job as a content writer in the age of AI?",
    options: [
      "Becoming an 'AI Editor' who adds human insight, local context, and strategy to AI drafts.",
      "Refusing to use AI tools.",
      "Typing faster than the AI.",
      "Switching to manual typewriter."
    ],
    correctIndex: 0,
    category: "Intermediate"
  },
  // PART 2: AI Agents (Questions 11-20) - Advanced Level
  {
    id: 11,
    text: "What is the primary difference between a 'Workflow Automation' (like Zapier) and a true 'AI Agent'?",
    options: [
      "Automation follows a rigid 'If This, Then That' path; an Agent can 'Reason' and decide which tools to use dynamically.",
      "Automation is cheaper.",
      "Agents only work on mobile phones.",
      "Automation requires code; Agents do not."
    ],
    correctIndex: 0,
    category: "Advanced"
  },
  {
    id: 12,
    text: "You are building an agent to process payments. Which 'Tool' would you give the agent to trigger an M-Pesa transaction?",
    options: [
      "A link to the Safaricom website.",
      "An API Function Call to the Daraja API.",
      "A text file with phone numbers.",
      "A screenshot of a QR code."
    ],
    correctIndex: 1,
    category: "Advanced"
  },
  {
    id: 13,
    text: "In the context of n8n (a low-code automation tool), what does a 'Webhook' allow you to do?",
    options: [
      "Encrypt your password.",
      "Catch fish in a digital pond.",
      "Design a website landing page.",
      "Receive real-time data from an external source to trigger a workflow."
    ],
    correctIndex: 3,
    category: "Advanced"
  },
  {
    id: 14,
    text: "What does RAG (Retrieval-Augmented Generation) allow an AI agent to do for a Kenyan Law Firm?",
    options: [
      "Search Google for US laws only.",
      "Generate random laws.",
      "Search a private database of Kenyan Legal Precedents before answering a client's question.",
      "Automatically sue people."
    ],
    correctIndex: 2,
    category: "Advanced"
  },
  {
    id: 15,
    text: "You are designing a 'Customer Support Agent.' What is the risk of an 'Infinite Loop'?",
    options: [
      "The agent keeps trying to solve a problem without success, burning through your API credits and money.",
      "The agent becomes sentient.",
      "The customer gets too many free products.",
      "The internet connection becomes too fast."
    ],
    correctIndex: 0,
    category: "Advanced"
  },
  {
    id: 16,
    text: "What is the role of a 'Router' in a Multi-Agent System?",
    options: [
      "It acts as a traffic controller.",
      "It provides Wi-Fi to the office.",
      "It translates English to Swahili.",
      "It generates images for the chat."
    ],
    correctIndex: 0,
    category: "Advanced"
  },
  {
    id: 17,
    text: "Which format is commonly used to structure data when passing it between an AI Agent and an API (like M-Pesa or Shopify)?",
    options: [
      "JPEG Image",
      "PDF",
      "MS Word Doc",
      "JSON"
    ],
    correctIndex: 3,
    category: "Advanced"
  },
  {
    id: 18,
    text: "Why is 'Human-in-the-Loop' critical when using agents for high-stakes tasks (like approving loans)?",
    options: [
      "To prevent the AI from making biased or costly errors.",
      "Because AI cannot do math.",
      "To slow down the process intentionally.",
      "To ensure the AI doesn't get lonely."
    ],
    correctIndex: 0,
    category: "Advanced"
  },
  {
    id: 19,
    text: "You are using LangChain to build an agent. What is 'Memory'?",
    options: [
      "The mechanism that allows the agent to remember previous messages.",
      "The hard drive space on your laptop.",
      "The training data from 2021.",
      "The speed of the processor."
    ],
    correctIndex: 0,
    category: "Advanced"
  },
  {
    id: 20,
    text: "A 'ReAct' Agent follows which cycle to solve problems?",
    options: [
      "Random -> Action -> Output.",
      "Read -> React -> Repeat.",
      "Reason -> Act -> Observe.",
      "Request -> API -> JSON."
    ],
    correctIndex: 2,
    category: "Advanced"
  }
];

export const BLOG_POSTS: BlogPost[] = [
  {
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
    `
  },
  {
    id: 'why-excel-matters',
    title: 'Why Excel Still Matters in the Age of AI',
    excerpt: 'In a world of LLMs and Python, the spreadsheet remains the undefeated champion of business data.',
    date: 'Jan 10, 2025',
    author: 'Ezra Muinde',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&auto=format&fit=crop',
    tags: ['Data Science', 'Excel', 'Foundations'],
    content: `
      <p class="mb-4">It is fashionable in tech circles to bash Excel. "It's not reproducible," they say. "It can't handle big data," they argue. And while true, they miss the point entirely.</p>
      
      <h3 class="text-xl font-bold text-white mt-6 mb-3">The UI of Business</h3>
      <p class="mb-4">Excel is the user interface of business. You can build the most sophisticated Python model in the world, but the output will almost certainly need to be delivered in a spreadsheet for the CEO to read it. It is the common language of commerce.</p>
      
      <h3 class="text-xl font-bold text-white mt-6 mb-3">AI Needs Structure</h3>
      <p class="mb-4">With the advent of Copilot and AI integrations, Excel is getting a second wind. But here is the catch: AI cannot fix messy data. To leverage AI effectively in Excel, you still need to understand data structure, normalization, and logic. You cannot prompt your way out of a bad pivot table.</p>
      
      <p>So before you rush to learn the latest vector database, make sure you can still do a VLOOKUP. It matters more than you think.</p>
    `
  },
  {
    id: 'colleagues-friends',
    title: 'Your Colleagues Are Actually Your Friends (Shoot Me)',
    excerpt: '"But of course you are replaceable… but your impact isn\'t."',
    date: 'Dec 25, 2024',
    author: 'Ezra Muinde',
    image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&auto=format&fit=crop',
    tags: ['Culture', 'Workplace', 'Mental Health'],
    content: `
      <p class="mb-4">There is a popular LinkedIn sentiment that says, "Your colleagues are not your family; they are just people you work with." I want to push back on that.</p>
      
      <h3 class="text-xl font-bold text-white mt-6 mb-3">The Cost of Armor</h3>
      <p class="mb-4">We spend more waking hours with our colleagues than with anyone else. Maintaining a rigid "professional mask" is exhausting. It requires constant energy to filter your personality, hide your struggles, and present a polished facade. This armor doesn't protect us; it isolates us.</p>
      
      <h3 class="text-xl font-bold text-white mt-6 mb-3">Vulnerability as a KPI</h3>
      <p class="mb-4">In high-performing technical teams, trust is the currency. You cannot build complex systems if you are afraid to say, "I don't know," or "I made a mistake." Real friendship—the kind that allows for psychological safety—is actually a productivity hack. When we care about each other, we communicate better, we forgive faster, and we build better products.</p>
      
      <p>So yes, maybe they are just colleagues. But making them friends might be the best career move you ever make.</p>
    `
  }
];
