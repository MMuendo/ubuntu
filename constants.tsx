import { Course, Product, Question, BlogPost } from './types';
import React from 'react';
import { BarChart3, Brain, Bot, FileSpreadsheet, Database, Zap } from 'lucide-react';

export const COURSES: Course[] = [
  {
    id: 'excel-workshop',
    title: 'Data Thinking with Excel',
    price: 12500,
    description: 'Learn how to structure problems, model business logic, and communicate insights — not just use formulas. This program builds the analytical mindset every decision professional needs before scaling to BI or AI.',
    level: 'Excel Workshop',
    tags: ['Data Analysis', 'Productivity', '3 Months']
  },
  {
    id: 'powerbi-workshop',
    title: 'From Reporting to Decision Systems',
    price: 15000,
    description: 'This mentorship is for professionals who’ve outgrown spreadsheets and want to build decision-ready dashboards that executives actually use. You’ll learn how to translate business questions into automated, scalable decision systems using Power BI.',
    level: 'Power BI Hybrid',
    tags: ['Business Intelligence', 'Dashboards', '3 Months']
  },
  {
    id: 'ai-mastery',
    title: 'AI Fluency for Business Leaders & Analysts',
    price: 2500,
    description: 'This is not about prompts. It’s about understanding where AI fits — and where it doesn’t — in decision-making, analytics, and leadership. Ideal for professionals who want to lead AI conversations, not follow trends.',
    level: 'AI Mastery',
    tags: ['AI Fluency', 'Prompting', '1 Month']
  },
  {
    id: 'ai-agents-masterclass',
    title: 'Agentic Systems for Decision Automation',
    price: 5000,
    description: 'Design AI agents that don’t just automate tasks — but support analysis, monitoring, and decision execution in real business environments. This is where analysts transition into system thinkers.',
    level: 'AI Agents',
    tags: ['Agentic AI', 'Automation', '1 Month']
  }
];

export const PLANS: { [key: string]: Product } = {
  BASIC: {
    id: 'ai-mastery-plan',
    name: 'AI Mastery Plan',
    price: 2500,
    description: 'Master AI fundamentals, prompting techniques, and ethics. Includes weekly mentorship check-ins and WhatsApp community access.'
  },
  ADVANCED: {
    id: 'ai-agents-plan',
    name: 'AI Agents Mastery Plan',
    price: 5000,
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
    id: "how-agentic-ai-actually-works-using-n8n",
    title: "How Agentic AI Actually Works: Using n8n",
    excerpt: "When AI observes, reasons, and acts, you focus on what truly matters — a straight-to-the-point breakdown of automation, Agentic AI, and why n8n is the tool keeping us busy before we 'weka mawe'.",
    date: "Feb 19, 2026",
    author: "Ezra Muinde",
    image: "/n8n.jpeg",
    tags: ["Agentic AI", "n8n", "Automation", "Artificial Intelligence"],
    readTime: "10 min read",
    status: "published",
    content: `

      <p class="mb-6 text-gray-300 leading-relaxed">Let's be honest, sorry guys.</p>

      <p class="mb-6 text-gray-300 leading-relaxed">I want to start this straight up because there's something important, I need you to understand before you start skipping my introduction.</p>

      <p class="mb-6 text-gray-300 leading-relaxed">I know I'm not boring, but I also know you don't care 😂. So let me get straight to the point: <strong class="text-white">think it, build it, extend it.</strong></p>

      <p class="mb-6 text-gray-300 leading-relaxed">That mindset is the foundation of everything I'm about to share.</p>

      <p class="mb-6 text-gray-300 leading-relaxed">For the last two weeks, I've been deep inside the n8n ecosystem, going through almost the entire website.</p>

      <p class="mb-6 text-gray-300 leading-relaxed">I haven't finished, and that's intentional. Not everything there is important to me, and not everything should be important to you.</p>

      <p class="mb-6 text-gray-300 leading-relaxed">I focused on what actually helps people understand automation without drowning in theory.</p>

      <p class="mb-6 text-gray-300 leading-relaxed">I did all this so that you can understand automation in the simplest way possible. And since I teach using n8n, you'll have to stay with n8n.</p>

      <h2 class="text-2xl md:text-3xl font-bold text-white mt-12 mb-4">Automation Explained Simply</h2>

      <p class="mb-6 text-gray-300 leading-relaxed">At its core, automation is not complicated. It's simply the act of removing humans from repetitive, predictable tasks.</p>

      <p class="mb-6 text-gray-300 leading-relaxed">If something happens the same way every day, copying data, sending reports, updating sheets, responding to the same questions, then that task does not need your intelligence.</p>

      <p class="mb-6 text-gray-300 leading-relaxed">It needs consistency. Automation is saying: <strong class="text-white">when X happens, do Y automatically.</strong> That's it.</p>

      <p class="mb-6 text-gray-300 leading-relaxed">Now imagine scaling that idea. Messages come in, data is captured, calculations happen, reports are sent, and notifications go out, without you touching anything.</p>

      <p class="mb-6 text-gray-300 leading-relaxed">That's what tools like n8n enable. You visually connect triggers, logic, and actions so systems work for you in the background while you focus on thinking, deciding, and building.</p>

      <h2 class="text-2xl md:text-3xl font-bold text-white mt-12 mb-4">So What Is Agentic AI, Really?</h2>

      <p class="mb-6 text-gray-300 leading-relaxed">Agentic AI is not a chatbot. It's not a prompt. And it's definitely not magic.</p>

      <p class="mb-6 text-gray-300 leading-relaxed">Agentic AI is <strong class="text-white">automation with decision making ability.</strong> Instead of you telling AI what to do every single time, you give it a goal, rules, and access to tools, then it acts on your behalf.</p>

      <p class="mb-6 text-gray-300 leading-relaxed">An AI agent follows a simple loop. It observes what is happening, reasons about what to do next, takes action using tools or systems, and then checks the outcome.</p>

      <p class="mb-6 text-gray-300 leading-relaxed">That loop repeats until the task is done or a condition is met. This is why Agentic AI feels powerful. It does not wait for you to type again.</p>

      <p class="mb-6 text-gray-300 leading-relaxed">This is also where n8n fits perfectly.</p>

      <p class="mb-6 text-gray-300 leading-relaxed">n8n provides the structure for Agentic AI by connecting triggers, what the agent sees, logic and guardrails, how it decides, and actions, what it does in the real world.</p>

      <p class="mb-6 text-gray-300 leading-relaxed">The AI is the brain, but the workflow is the body.</p>

      <h2 class="text-2xl md:text-3xl font-bold text-white mt-12 mb-4">Automation and Agentic AI Explained Using Kenyan Politics</h2>

      <p class="mb-6 text-gray-300 leading-relaxed">Think about Kenyan politics.</p>

      <p class="mb-6 text-gray-300 leading-relaxed">A politician who does everything themselves, answering every call, planning every rally, approving every poster, negotiating every deal, does not scale.</p>

      <p class="mb-6 text-gray-300 leading-relaxed">They burn out, make mistakes, and eventually lose control of the message. So what do they do instead? They delegate, do you think he ever delegates?</p>

      <p class="mb-6 text-gray-300 leading-relaxed">They have advisors who analyze situations, aides who execute instructions, spokespeople who respond on their behalf, and security teams that enforce boundaries.</p>

      <p class="mb-6 text-gray-300 leading-relaxed">The politician does not disappear. They set direction while others act.</p>

      <p class="mb-6 text-gray-300 leading-relaxed">That is exactly how automation works in a business. And Agentic AI takes it one step further.</p>

      <p class="mb-6 text-gray-300 leading-relaxed">Instead of hiring more people, you build agents that can observe situations, make decisions based on rules, and act without waiting for permission every time.</p>

      <p class="mb-6 text-gray-300 leading-relaxed">In this analogy, n8n is the campaign office. The workflows are the staff. The AI is the advisor. Guardrails are the party constitution. And you remain the principal, setting vision, not running errands.</p>

      <h2 class="text-2xl md:text-3xl font-bold text-white mt-12 mb-4">My Top n8n Nodes You Should Know</h2>

      <p class="mb-6 text-gray-300 leading-relaxed">Before anything else, it's important to understand this: n8n has over 400 integrations, and it can connect to almost anything that exposes an API.</p>

      <p class="mb-6 text-gray-300 leading-relaxed">That means you're rarely limited by tools. What matters is what you choose to automate and why.</p>

      <ul class="mb-6 space-y-6 text-gray-300 ml-6">
        <li class="flex items-start gap-2">
          <span class="text-[var(--brand-cyan)] mt-1">1.</span>
          <span>
            <strong class="text-white">Guardrails node</strong>
            <p class="mt-2">I'm starting with the Guardrails node because guardrails are not optional in Agentic AI.</p>
            <p class="mt-2">The moment you allow AI to act on your behalf, you must define boundaries.</p>
            <p class="mt-2">This node lets you validate user input before it reaches an AI model and check AI output before it is used anywhere else in your workflow.</p>
            <p class="mt-2">In simple terms, it keeps your agents from saying or doing things they shouldn't. No serious Agentic AI system runs without guardrails.</p>
          </span>
        </li>
        <li class="flex items-start gap-2">
          <span class="text-[var(--brand-cyan)] mt-1">2.</span>
          <span>
            <strong class="text-white">Google Analytics node</strong>
            <p class="mt-2">I'm choosing the Google Analytics node because, realistically, your entire analytics department can be automated with nodes.</p>
            <p class="mt-2">Instead of people logging in, pulling reports, and forwarding numbers, this node allows performance data to flow automatically into spreadsheets, dashboards, or notifications.</p>
            <p class="mt-2">Insights move on a schedule, not on someone's memory. This is how reporting becomes a system, not a task.</p>
          </span>
        </li>
        <li class="flex items-start gap-2">
          <span class="text-[var(--brand-cyan)] mt-1">3.</span>
          <span>
            <strong class="text-white">Microsoft</strong>
            <p class="mt-2">Next is Microsoft, because whether you like it or not, most of you are already living inside Microsoft tools.</p>
            <p class="mt-2">You're probably using Excel right now. n8n integrates directly with Microsoft services like Teams, Entra ID, and Excel, allowing data, reports, and alerts to move without manual effort.</p>
            <p class="mt-2">At some point, Excel will also force you to think about databases and SQL, and automation is the bridge between those worlds.</p>
          </span>
        </li>
        <li class="flex items-start gap-2">
          <span class="text-[var(--brand-cyan)] mt-1">4.</span>
          <span>
            <strong class="text-white">Execute Command node</strong>
            <p class="mt-2">I'm including the Execute Command node purely out of respect for my technical audience. If I don't mention it, they'll cancel their subscriptions to my articles.</p>
            <p class="mt-2">This node allows you to run system-level commands and scripts, making it possible to automate technical workflows directly on servers or local machines.</p>
            <p class="mt-2">It's powerful, dangerous if misused, and extremely useful when you know what you're doing.</p>
          </span>
        </li>
        <li class="flex items-start gap-2">
          <span class="text-[var(--brand-cyan)] mt-1">5.</span>
          <span>
            <strong class="text-white">Spotify node</strong>
            <p class="mt-2">Finally, I'm choosing Spotify because you love music, and because it proves a deeper point.</p>
            <p class="mt-2">Spotify lives inside your VS Code and now inside GPT, and with n8n, you can automate how you interact with it.</p>
            <p class="mt-2">From creating playlists to syncing music across platforms, it shows that automation is not just for business processes.</p>
            <p class="mt-2">If we can automate how we listen to music, imagine what we can do with work.</p>
          </span>
        </li>
      </ul>

      <h2 class="text-2xl md:text-3xl font-bold text-white mt-12 mb-4">What Makes n8n Special</h2>

      <p class="mb-6 text-gray-300 leading-relaxed">What makes n8n special is the fact that you can run it locally.</p>

      <p class="mb-6 text-gray-300 leading-relaxed">You are not forced into the cloud, and you maintain full control over your workflows.</p>

      <p class="mb-6 text-gray-300 leading-relaxed">I know the code vibers using Claude want to debate, but for now, I am choosing n8n.</p>

      <p class="mb-6 text-gray-300 leading-relaxed">It is perfect for experimentation, learning, and deployment without friction.</p>

      <h2 class="text-2xl md:text-3xl font-bold text-white mt-12 mb-4">Finally - "Wacha niongee"</h2>

      <p class="mb-6 text-gray-300 leading-relaxed">I still believe in building for us, by us. I am tired of endless customization for tools that were never designed with our realities in mind.</p>

      <p class="mb-6 text-gray-300 leading-relaxed">But before I get tired, n8n is here to keep me busy, to experiment, deploy, and teach.</p>

      <p class="mb-6 text-gray-300 leading-relaxed">This is our tool to do the push ups before we "weka mawe".</p>

      <p class="mb-6 text-gray-300 leading-relaxed">My people, it's happening. What used to take four weeks can now be built in ten minutes.</p>

      <p class="mb-6 text-gray-300 leading-relaxed">AI is not replacing us. It is freeing our mental space so we can focus on better work.</p>

      <p class="mb-6 text-gray-300 leading-relaxed">Humans were never created to spend intelligence on repetitive tasks, so automate them.</p>

      <p class="mb-6 text-gray-300 leading-relaxed">Instead of paying subscriptions to use ChatGPT or Claude like Google, get an API and start delegating. That shift, from chatting to delegating, is the heart of Agentic AI.</p>

      <p class="mb-6 text-gray-300 leading-relaxed">Once you see Agentic AI as delegation, not intelligence, everything else becomes obvious.</p>
    `,
  },
  {
    id: "why-you-actually-need-to-learn-power-bi",
    title: "Why You Actually Need to Learn Power BI",
    excerpt: "A friendly defense of a tool that quietly runs the modern workplace — and the real answer to your boss’s question: itaongeza pesa kweli?",
    date: "Jan 25, 2026",
    author: "Ezra Muinde",
    image: "/power_bi.jpg",
    tags: ["Power BI", "Data Analytics", "Microsoft Fabric", "Business Intelligence"],
    readTime: "12 min read",
    status: "published",
    content: `
      
      <p class="mb-6 text-gray-300 leading-relaxed">Let me defend Power BI. Or rather, let me explain why learning Power BI is no longer optional if you work with data, manage people, or sit in meetings where decisions are made “based on numbers.”</p>
      
      <p class="mb-6 text-gray-300 leading-relaxed">Microsoft didn’t randomly name the platform Power BI. The name is intentional. It is <strong class="text-white">Power</strong> (serious analytical muscle) plus <strong class="text-white">Business Intelligence</strong> (turning data into decisions, not stress).</p>
      
      <p class="mb-6 text-gray-300 leading-relaxed">And to understand Power BI properly, we need to go back a bit. Don’t worry, I’ll keep it friendly. No unnecessary jargon. I write the same way I teach.</p>
      
      <h2 class="text-2xl md:text-3xl font-bold text-white mt-12 mb-4">From Computer Packages to Corporate Backbones</h2>
      
      <p class="mb-6 text-gray-300 leading-relaxed">There was a time we used to enroll for computer packages. Millennials, you already know this life. I’m trying to make us sound interesting because Gen Z thinks we’re boring.</p>
      
      <p class="mb-6 text-gray-300 leading-relaxed">But honestly, I still don’t know how to defend why we had to learn computer packages — imagine someone teaching you how to use Word. Microsoft Office was a qualification. You had to know: Microsoft Word, Excel, PowerPoint, Access and Publisher.</p>
      
      <p class="mb-6 text-gray-300 leading-relaxed">Microsoft Publisher. And yes, I personally used Publisher to beautify love letters. I was young. I’m still young. I still write them, just that I use a different beautifier.</p>
      
      <p class="mb-6 text-gray-300 leading-relaxed">Microsoft Office for Windows version 1.0 was released in 1990. That was 35 years ago — millennials at their core. It bundled: Word 1.1, Excel 2.1 and PowerPoint 2.0. In 2020, Microsoft rebranded Office to Microsoft 365, not because Word got prettier, but because the ecosystem had grown into cloud, AI, collaboration, and analytics. Same company. Same philosophy. Bigger ambition.</p>

      <h2 class="text-2xl md:text-3xl font-bold text-white mt-12 mb-4">Excel Was Never the End Game</h2>
      
      <p class="mb-6 text-gray-300 leading-relaxed">Between 2009 and 2010, Microsoft introduced:</p>
      <ul class="mb-6 space-y-2 text-gray-300 ml-6">
        <li class="flex items-start gap-2"><span class="text-[var(--brand-cyan)] mt-1">•</span><span>Power Query</span></li>
        <li class="flex items-start gap-2"><span class="text-[var(--brand-cyan)] mt-1">•</span><span>Power Pivot</span></li>
        <li class="flex items-start gap-2"><span class="text-[var(--brand-cyan)] mt-1">•</span><span>Power View</span></li>
      </ul>
      
      <p class="mb-6 text-gray-300 leading-relaxed">All as Excel add-ins. I still teach these modules in Microsoft Excel Course. And this is where I’ll repeat something I always say: <strong class="text-white">Excel is the foundation of analytics.</strong></p>
      
      <p class="mb-6 text-gray-300 leading-relaxed">Some of you will argue it’s SQL. That’s fine. Whichever one you start with, learn the other immediately. Thank me later. But this article is not about Excel. So let’s move on.</p>

      <h2 class="text-2xl md:text-3xl font-bold text-white mt-12 mb-4">The Birth of Power BI</h2>
      
      <p class="mb-6 text-gray-300 leading-relaxed">In 2013, Microsoft did something smart. They took those Excel add-ins and said, “Why are we pretending this is just Excel?”</p>
      
      <p class="mb-6 text-gray-300 leading-relaxed">They consolidated them into a standalone reporting and analytics tool: <strong class="text-white">Power BI.</strong> From that moment, Power BI stopped being a “nice-to-have” and quietly became the backbone of corporate decision-making. Stay with me.</p>

      <h2 class="text-2xl md:text-3xl font-bold text-white mt-12 mb-4">The Numbers (But Explained Like a Human)</h2>
      
      <p class="mb-6 text-gray-300 leading-relaxed">As of 2025/2026, Power BI holds about 30% of the global BI market share, making it the clear leader ahead of Tableau and Qlik. If you’re a Tableau expert and feel like debating, relax. I respect you. Here’s the data source anyway: Acuity Training, 2025 Power BI Statistics.</p>
      
      <p class="mb-6 text-gray-300 leading-relaxed">And no, I don’t doubt my research skills. I started my data science career in a research firm. Plus, I’m writing this an hour after church, after Revelation Chapter 1. So what I’m writing here is basically Scripture — <strong class="text-white">“This is the Bible” — The gospel truth.</strong></p>
      
      <p class="mb-6 text-gray-300 leading-relaxed">Now impact. Research shows Power BI saves users 2+ hours every week by automating spreadsheet refreshes. Excel becomes the collection layer. Power BI becomes the distribution and decision layer. That’s how it should have always been.</p>

      <h2 class="text-2xl md:text-3xl font-bold text-white mt-12 mb-4">Certification, Careers, and the Market Reality</h2>
      
      <p class="mb-6 text-gray-300 leading-relaxed">Microsoft Certified: Power BI Data Analyst Associate (PL-300) is now the industry-standard credential. Microsoft doesn’t publish exact certification numbers, but industry estimates and LinkedIn data show:</p>
      
      <ul class="mb-6 space-y-2 text-gray-300 ml-6">
        <li class="flex items-start gap-2"><span class="text-[var(--brand-cyan)] mt-1">•</span><span>Hundreds of thousands certified globally</span></li>
        <li class="flex items-start gap-2"><span class="text-[var(--brand-cyan)] mt-1">•</span><span>40% year-over-year growth in PL-300 candidates</span></li>
      </ul>
      
      <p class="mb-6 text-gray-300 leading-relaxed">Which leads me to a very honest question: Why don’t you want to learn Power BI? Especially when:</p>
      <ul class="mb-6 space-y-2 text-gray-300 ml-6">
        <li class="flex items-start gap-2"><span class="text-[var(--brand-cyan)] mt-1">•</span><span>58% of organizations are actively investing in internal Power BI literacy</span></li>
        <li class="flex items-start gap-2"><span class="text-[var(--brand-cyan)] mt-1">•</span><span>97% of Fortune 500 companies use Power BI</span></li>
        <li class="flex items-start gap-2"><span class="text-[var(--brand-cyan)] mt-1">•</span><span>Over 50% of organizations recover their Power BI investment in under 12 months</span></li>
        <li class="flex items-start gap-2"><span class="text-[var(--brand-cyan)] mt-1">•</span><span>Reports are built 2.5x faster than with traditional BI tools</span></li>
      </ul>

      <h2 class="text-2xl md:text-3xl font-bold text-white mt-12 mb-4">Why IT Departments Love Power BI (Even If You Don’t)</h2>
      
      <p class="mb-6 text-gray-300 leading-relaxed">Power BI integrates seamlessly with Microsoft Teams, SharePoint, and Azure. For IT, it’s the path of least resistance: Security, Governance, and Cost control. No new ecosystem. No unnecessary risk. No drama.</p>

      <h2 class="text-2xl md:text-3xl font-bold text-white mt-12 mb-4">The Future: AI, Fabric, and Agentic Analytics</h2>
      
      <p class="mb-6 text-gray-300 leading-relaxed">We are entering what I call the Agentic Analytics era. Power BI is no longer just a reporting tool.</p>
      
      <p class="mb-6 text-gray-300 leading-relaxed"><strong class="text-white">Microsoft Fabric:</strong> Power BI is now the visualization arm of Microsoft Fabric, a unified data platform that brings together data engineering, data science, analytics, and AI.</p>
      
      <p class="mb-6 text-gray-300 leading-relaxed"><strong class="text-white">Copilot Integration:</strong> You can ask: “Why did sales drop in the Northeast?” And Copilot won’t just draw a chart. It will explain the why using anomaly detection and context.</p>
      
      <p class="mb-6 text-gray-300 leading-relaxed"><strong class="text-white">Automated Insights:</strong> By 2027, drag-and-drop dashboards will feel old-school. The future is: Autonomous monitoring, AI-driven alerts, and Leadership only being notified when something actually matters. No more staring at dashboards that say “nothing new.”</p>

      <h2 class="text-2xl md:text-3xl font-bold text-white mt-12 mb-4">The Real Problem Nobody Talks About</h2>
      
      <p class="mb-6 text-gray-300 leading-relaxed">Almost everyone teaches how to build dashboards. Very few people teach: Executives how to read dashboards, Teams how to extract insight, Organizations how to measure usage, and Leaders how to convert dashboards into ROI.</p>
      
      <p class="mb-6 text-gray-300 leading-relaxed">Some companies don’t even know who logs in, which reports are used, or which visuals are ignored. That’s where I come in. And this is where we need to separate two things.</p>

      <h2 class="text-2xl md:text-3xl font-bold text-white mt-12 mb-4">Why Power BI Is a Critical Individual Skill</h2>
      
      <ul class="mb-6 space-y-4 text-gray-300 ml-6">
        <li class="flex items-start gap-2">
          <span class="text-[var(--brand-cyan)] mt-1">1.</span>
          <span><strong class="text-white">The V-Shaped Advantage:</strong> Modern professionals need depth in their domain (finance, marketing, ops) plus the ability to visualize insight. Power BI turns specialists into insight architects.</span>
        </li>
        <li class="flex items-start gap-2">
          <span class="text-[var(--brand-cyan)] mt-1">2.</span>
          <span><strong class="text-white">Less Cleaning, More Thinking:</strong> Traditional tools waste 80% of time on data prep. Power Query automates this, freeing you to focus on patterns, trends, and anomalies.</span>
        </li>
        <li class="flex items-start gap-2">
          <span class="text-[var(--brand-cyan)] mt-1">3.</span>
          <span><strong class="text-white">DAX Is a Superpower:</strong> DAX enables time intelligence like YoY growth, Moving averages, and Rolling totals. These calculations are painful to maintain in spreadsheets.</span>
        </li>
        <li class="flex items-start gap-2">
          <span class="text-[var(--brand-cyan)] mt-1">4.</span>
          <span><strong class="text-white">One Version of the Truth:</strong> Publishing to Power BI Service means live data and shared definitions. No more emailing files named final_v7_revised_REAL.xlsx.</span>
        </li>
      </ul>

      <h2 class="text-2xl md:text-3xl font-bold text-white mt-12 mb-4">Why Formal Training Is Non-Negotiable for Organizations</h2>
      
      <ul class="mb-6 space-y-4 text-gray-300 ml-6">
        <li class="flex items-start gap-2">
          <span class="text-[var(--brand-cyan)] mt-1">•</span>
          <span><strong class="text-white">Garbage In, Garbage Out:</strong> Untrained users build flat models. This leads to slow dashboards and, worse, wrong decisions.</span>
        </li>
        <li class="flex items-start gap-2">
          <span class="text-[var(--brand-cyan)] mt-1">•</span>
          <span><strong class="text-white">Security and Governance:</strong> Training ensures people understand Row-Level Security. A sales manager in Europe should not see U.S. salary data. Period.</span>
        </li>
        <li class="flex items-start gap-2">
          <span class="text-[var(--brand-cyan)] mt-1">•</span>
          <span><strong class="text-white">The Star Schema Standard:</strong> Over 90% of performance issues come from poor data modeling. Formal training teaches proper fact and dimension design.</span>
        </li>
        <li class="flex items-start gap-2">
          <span class="text-[var(--brand-cyan)] mt-1">•</span>
          <span><strong class="text-white">Maximizing Microsoft Fabric ROI:</strong> Without training, organizations use less than 10% of Fabric’s capability. Training unlocks AI insights, narratives, and AutoML.</span>
        </li>
        <li class="flex items-start gap-2">
          <span class="text-[var(--brand-cyan)] mt-1">•</span>
          <span><strong class="text-white">Change Management:</strong> Tools don’t create data culture. People do. Trained users become internal champions who move teams away from legacy reporting.</span>
        </li>
      </ul>

      <div class="my-8 p-6 bg-[var(--brand-cyan)]/10 border-l-4 border-[var(--brand-cyan)] rounded-lg">
        <p class="text-gray-300 leading-relaxed">Organizations with structured Power BI training programs see a <strong class="text-white">33% higher adoption rate</strong> of data-driven decision-making compared to those relying on self-teaching. That gap is expensive.</p>
      </div>

      <h2 class="text-2xl md:text-3xl font-bold text-white mt-12 mb-4">Final Word</h2>
      
      <p class="mb-6 text-gray-300 leading-relaxed">Power BI is not just a software skill. It is the language of modern business intelligence. You can be self-taught. You can be formally trained. Either way, this is not a skill for “data people only.” It’s a skill your entire organization needs.</p>
      
      <p class="mb-6 text-gray-300 leading-relaxed">We recently built a Power BI dashboard for a client, fully automated from Zoho Books. And like most projects, the dashboard itself was the easy part. The real work started after deployment: Teaching teams how to interpret what they were seeing, helping leaders turn insight into decisions, and making sure ROI didn’t remain a PowerPoint promise. Because dashboards don’t create value. Decisions do. And that’s the whole point.</p>
      
      <p class="mb-6 text-gray-300 leading-relaxed">So here’s the question. Do you want Power BI to be just another tool your organization owns, or do you want it to be a capability your people actually use?</p>
      
      <p class="mb-6 text-gray-300 leading-relaxed">If you’re an individual, this is the skill that moves you from preparing data to leading conversations. If you’re an organization, this is how you turn licenses, dashboards, and data into real business outcomes. This is where I come in — <strong class="text-white">I am your Raymond in Blacklist.</strong></p>
      
      <p class="mb-6 text-gray-300 leading-relaxed">Whether it’s training technical teams, empowering business users and executives, or helping organizations move from reporting to decision-making, the goal is simple: make your data work for you. If you’re ready to stop collecting reports and start using them, let’s talk. Power BI is already in your organization. The only question is whether it’s working for you yet.</p>
    `,
  },
  {
    id: "phoenix-ai-summit-2025", // Added ID property
    title: "Phoenix AI Agents Summit 2025: Building for Us",
    excerpt: "Eight teams, one mission, and solutions only Africans could build. Reflections on the Summit that proved Africa doesn't need permission — we need opportunity.",
    date: "Feb 15, 2025",
    // dateISO: "2025-02-15", // Ensure your Type definition includes this if you use it
    author: "Ezra Muinde",
    image: "/phoenix_AI_Agent_367.jpg",
    tags: ["AI Agents", "Community", "Innovation", "Phoenix Summit"],
    readTime: "12 min read",
    status: "published", // Ensure your Type definition includes this if you use it
    content: `
      <p class="mb-6 text-lg text-gray-300 leading-relaxed italic">"Eight teams, one mission, and solutions only Africans could build."</p>
      
      <p class="mb-6 text-gray-300 leading-relaxed">This is the article I've kept in draft the longest.</p>
      
      <p class="mb-6 text-gray-300 leading-relaxed">It always felt like there was more to add, but a motivational speaker would say "hit publish," so here we go.</p>
      
      <p class="mb-6 text-gray-300 leading-relaxed">I had dreamed about this since 2023, back when "agents" still meant secret spies or clumsy customer support bots pretending to be helpful.</p>
      
      <p class="mb-6 text-gray-300 leading-relaxed">I was transitioning out of agribusiness (not entirely though) into data, still figuring out what AI even meant.</p>
      
      <p class="mb-6 text-gray-300 leading-relaxed">What I did know was simple. <strong class="text-white">Africa needed tools built for us by us.</strong></p>
      
      <p class="mb-6 text-gray-300 leading-relaxed">Not retrofitted copies. Not globally trained models forced into local realities.</p>
      
      <p class="mb-6 text-gray-300 leading-relaxed">Systems shaped by our culture, our languages, our challenges, and our brilliance.</p>
      
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
      
      <div class="my-8 rounded-xl overflow-hidden">
        <img 
          image="/phoenix_AI_Agent_100.jpg" 
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
      
      <div class="my-8 rounded-xl overflow-hidden">
        <img 
          image="phoenix_AI_Agent_338.jpg"  
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
  {
    id: "why-excel-still-matters-in-the-age-of-ai",
    title: "Why Excel Still Matters in the Age of AI",
    excerpt: "I know you can ask GPT nearly everything but just stay with me on this piece. Because sometimes, the best lessons don’t come from asking a machine, they come from reflection, experience, and stories we share.",
    date: "Jan 25, 2026",
    author: "Ezra Muinde",
    image: "/excel_dashboard_image.jpg",
    tags: ["Excel", "Data Analytics", "AI", "Teaching", "Reflections"],
    readTime: "10 min read",
    status: "published",
    content: `
 
      <p class="mb-6 text-gray-300 leading-relaxed">My first analytics tool was Microsoft Excel.</p>
      
      <p class="mb-6 text-gray-300 leading-relaxed">Back in 2019, when I started my data journey in a research agency, I was fascinated by the “magic” that lookups, VBA, and PivotTables could produce.</p>
      
      <p class="mb-6 text-gray-300 leading-relaxed">What seemed like just a spreadsheet quickly became a universe of possibilities.</p>
      
      <p class="mb-6 text-gray-300 leading-relaxed">Excel was my first taste of analytics, and honestly, it has never stopped amazing me.</p>
      
      <p class="mb-6 text-gray-300 leading-relaxed">People often say Excel is just basic. But I’ve come to believe Excel is not just a platform; it’s a powerhouse.</p>
      
      <p class="mb-6 text-gray-300 leading-relaxed">And when you look closely, even Power BI is just Excel with makeup, a refined extension of the same foundation.</p>
      
      <p class="mb-6 text-gray-300 leading-relaxed">The truth is, even with LLMs, AI agents, and countless analytics tools in the market today, Excel still stands tall as a master tool.</p>
      
      <h2 class="text-2xl md:text-3xl font-bold text-white mt-12 mb-4">Why Excel Still Rules the Game</h2>
      
      <p class="mb-6 text-gray-300 leading-relaxed">Let’s step back for a moment.</p>
      
      <p class="mb-6 text-gray-300 leading-relaxed">In 2025, the hype is all about AI, automation, and machine learning and yes, I’m right in the middle of it, guiding AI Agents Masterclasses.</p>
      
      <p class="mb-6 text-gray-300 leading-relaxed">Every week there’s a new tool promising to replace your analytics stack, automate your workflow, or think on your behalf.</p>
      
      <p class="mb-6 text-gray-300 leading-relaxed">Yet, behind the scenes, when decisions are being made, when budgets are being planned, when sales are being tracked, Excel is quietly there, holding everything together.</p>
      
      <p class="mb-6 text-gray-300 leading-relaxed">Consider this:</p>
      
      <ul class="mb-6 space-y-2 text-gray-300 ml-6">
        <li class="flex items-start gap-2">
          <span class="text-[var(--brand-cyan)] mt-1">•</span>
          <span>Over 750 million people use Excel worldwide (that’s nearly 1 in 10 people on the planet).</span>
        </li>
        <li class="flex items-start gap-2">
          <span class="text-[var(--brand-cyan)] mt-1">•</span>
          <span>According to Deloitte, 82% of businesses still rely on Excel for financial modeling, forecasting, and reporting.</span>
        </li>
        <li class="flex items-start gap-2">
          <span class="text-[var(--brand-cyan)] mt-1">•</span>
          <span>A Forrester study found that 60% of business decisions are supported by Excel-based analysis, despite the rise of advanced BI platforms.</span>
        </li>
      </ul>
      
      <p class="mb-6 text-gray-300 leading-relaxed">That tells you something powerful: Excel isn’t just surviving, it’s thriving. Why?</p>
      
      <p class="mb-6 text-gray-300 leading-relaxed">Because it’s accessible, flexible, and trusted.</p>
      
      <p class="mb-6 text-gray-300 leading-relaxed">It doesn’t matter if you’re a small startup managing cashflows or a Fortune 500 consolidating multi-billion-dollar budgets, Excel has a seat at the table.</p>
      
      <h2 class="text-2xl md:text-3xl font-bold text-white mt-12 mb-4">Lessons From Teaching Excel</h2>
      
      <p class="mb-6 text-gray-300 leading-relaxed">After teaching my first Excel cohort over the last 3 months, a mix of beginners and advanced learners, I had a powerful realization:</p>
      
      <p class="mb-6 text-gray-300 leading-relaxed">Excel is not just about functions, it’s about confidence.</p>
      
      <p class="mb-6 text-gray-300 leading-relaxed">I saw beginners, who at first were intimidated by formulas, gradually light up when they got their first VLOOKUP to work or when they built their first PivotTable.</p>
      
      <p class="mb-6 text-gray-300 leading-relaxed">To them, it wasn’t just “a formula working”, it was proof they could actually master something that once felt impossible.</p>
      
      <p class="mb-6 text-gray-300 leading-relaxed">I also saw advanced learners, some with years of experience, suddenly discover tricks they had never used before.</p>
      
      <p class="mb-6 text-gray-300 leading-relaxed">A better way to clean data. A shortcut to automate reporting. A smarter way to structure models.</p>
      
      <p class="mb-6 text-gray-300 leading-relaxed">By the end, every participant showcased a project that reflected their unique journey, dashboards, pivot charts, even small-scale data models.</p>
      
      <p class="mb-6 text-gray-300 leading-relaxed">That was the shocker for me.</p>
      
      <p class="mb-6 text-gray-300 leading-relaxed">I had expected knowledge transfer. What I witnessed instead was transformation.</p>
      
      <div class="my-8 p-6 bg-[var(--brand-cyan)]/10 border-l-4 border-[var(--brand-cyan)] rounded-lg">
        <p class="text-gray-300 leading-relaxed"><em>One learner told me something that stuck: “I thought Excel was just for recording data. Now I realize it can actually tell a story. And those VLOOKUPs I once feared? They’re actually simple once you understand them.”</em></p>
      </div>
      
      <p class="mb-6 text-gray-300 leading-relaxed">And isn’t that the essence of analytics? Not the tool itself, but the ability to turn numbers into meaning.</p>
      
      <h2 class="text-2xl md:text-3xl font-bold text-white mt-12 mb-4">Analytics Beyond Tools</h2>
      
      <p class="mb-6 text-gray-300 leading-relaxed">There’s a misconception that analytics is about mastering the latest, shiniest tool.</p>
      
      <p class="mb-6 text-gray-300 leading-relaxed">But tools come and go.</p>
      
      <p class="mb-6 text-gray-300 leading-relaxed">Real analytics is about solving problems, asking the right questions, and communicating insights clearly.</p>
      
      <p class="mb-6 text-gray-300 leading-relaxed">Excel forces you to think that way.</p>
      
      <p class="mb-6 text-gray-300 leading-relaxed">Every time you design a model or structure a dataset, you’re practicing logic.</p>
      
      <p class="mb-6 text-gray-300 leading-relaxed">Every time you build a chart, you’re asking: How can this information be understood at a glance?</p>
      
      <p class="mb-6 text-gray-300 leading-relaxed">That’s why I call Excel the gym for analytical thinking.</p>
      
      <p class="mb-6 text-gray-300 leading-relaxed">If you can think in Excel, you can think in SQL, Python, R, Power BI, or even with AI tools. The tool changes, but the muscle you’ve built stays with you.</p>
      
      <p class="mb-6 text-gray-300 leading-relaxed">And here’s the irony: even the most advanced AI systems often present their results in a table or a spreadsheet.</p>
      
      <p class="mb-6 text-gray-300 leading-relaxed">Which means, to make sense of what AI gives you, you still need the mindset Excel teaches.</p>
      
      <h2 class="text-2xl md:text-3xl font-bold text-white mt-12 mb-4">A Personal Reflection</h2>
      
      <p class="mb-6 text-gray-300 leading-relaxed">When I look back at my own journey, Excel didn’t just teach me how to calculate, it taught me how to think.</p>
      
      <p class="mb-6 text-gray-300 leading-relaxed">Those hours of debugging formulas, cleaning messy data, and creating dashboards shaped my approach to problem-solving.</p>
      
      <p class="mb-6 text-gray-300 leading-relaxed">Excel became my first mentor in analytics.</p>
      
      <p class="mb-6 text-gray-300 leading-relaxed">Now, watching learners go through that same transformation in my class reminded me why this tool will always matter.</p>
      
      <p class="mb-6 text-gray-300 leading-relaxed">Excel is not just about cells and functions, it’s about unlocking possibility.</p>
      
      <p class="mb-6 text-gray-300 leading-relaxed">I’ll never forget the final presentations from the cohort.</p>
      
      <p class="mb-6 text-gray-300 leading-relaxed">What began as nervous introductions turned into confident storytelling.</p>
      
      <p class="mb-6 text-gray-300 leading-relaxed">Learners who once doubted themselves now stood tall, explaining their projects with clarity and pride.</p>
      
      <p class="mb-6 text-gray-300 leading-relaxed">For me, that was the most rewarding part: seeing how Excel could empower people not just technically, but personally.</p>
      
      <h2 class="text-2xl md:text-3xl font-bold text-white mt-12 mb-4">Why Excel Isn’t Going Anywhere</h2>
      
      <p class="mb-6 text-gray-300 leading-relaxed">The tech landscape will keep evolving. LLMs will get smarter. Automation will get faster.</p>
      
      <p class="mb-6 text-gray-300 leading-relaxed">But here’s what won’t change: the need for humans who can think critically, structure data, and make decisions.</p>
      
      <p class="mb-6 text-gray-300 leading-relaxed">That’s why Excel will always have a place.</p>
      
      <p class="mb-6 text-gray-300 leading-relaxed">It’s not because it’s perfect, it’s because it teaches you to engage with problems directly.</p>
      
      <p class="mb-6 text-gray-300 leading-relaxed">It keeps you close to the numbers, and that proximity builds intuition.</p>
      
      <p class="mb-6 text-gray-300 leading-relaxed">So yes, I know you can ask GPT almost anything.</p>
      
      <p class="mb-6 text-gray-300 leading-relaxed">But what Excel gives you isn’t just answers, it gives you the ability to understand the answers. And in a world drowning in information, that’s priceless.</p>
      
      <h2 class="text-2xl md:text-3xl font-bold text-white mt-12 mb-4">Closing Thought</h2>
      
      <p class="mb-6 text-gray-300 leading-relaxed">After 3 months of teaching Excel, here’s my biggest takeaway: Excel is not just software, it’s a teacher.</p>
      
      <p class="mb-6 text-gray-300 leading-relaxed">It humbles you, it challenges you, and if you stick with it, it empowers you.</p>
      
      <p class="mb-6 text-gray-300 leading-relaxed">And maybe that’s why, even after all the new tools I’ve learned, I still find myself going back to Excel.</p>
      
      <p class="mb-6 text-gray-300 leading-relaxed">Not because it’s the only tool, but because it’s the one that taught me how to think like an analyst.</p>
    `,
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
