import { Course, Product, Question, BlogPost } from './types';
import React from 'react';
import { BarChart3, Brain, Bot, FileSpreadsheet, Database, Zap } from 'lucide-react';

export const COURSES: Course[] = [
  {
    id: 'excel-workshop',
    title: 'Excel Workshop',
    price: 20000,
    description: `
    • Excel for data decisions.
    • 12-week expert walkthrough.
    • Personalized Excel playbook.
    • Weekly practical assignments.
    • Mentorship + community access.
    `,
    level: 'Beginner',
    tags: ['Data Analysis', 'Productivity', '3 Months']
  },
  {
    id: 'powerbi-workshop',
    title: 'Power BI Workshop',
    price: 20000,
    description: `
    • Bridge spreadsheets to BI.
    • 12-week expert-led journey.
    • Personalized Power BI playbook.
    • Weekly real-world dashboards.
    • Mentorship + community access.
    `,
    level: 'Beginner',
    tags: ['Business Intelligence', 'Dashboards', '3 Months']
  },
  {
    id: 'ai-mastery',
    title: 'AI Mastery',
    price: 7500,
    description: `
    • AI for business advantage.
    • 4-week expert-led journey.
    • Personalized AI playbook.
    • Weekly practical AI tasks.
    • Mentorship + community access.
    `,
    level: 'Intermediate',
    tags: ['AI Fluency', 'Prompting', '1 Month']
  },
  {
    id: 'ai-agents-masterclass',
    title: 'AI Agents Masterclass',
    price: 12500,
    description: `
    • Build autonomous AI agents.
    • 12-week expert-led journey.
    • Personalized agent playbook.
    • Weekly automation mastery tasks.
    • Mentorship + community access.
    `,
    level: 'Advanced',
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
      "The mechanism that allows the agent to remember previous messages.,
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
    id: 'phoenix-ai-summit-2025',
    title: 'Phoenix AI Agents Summit 2025: Building for Us',
    excerpt: 'Reflections on the recent summit and why building indigenous AI solutions is critical for Africa\'s future.',
    date: 'Feb 15, 2025',
    author: 'Ezra Muinde',
    image: 'https://images.unsplash.com/photo-1591115765373-5207764f72e7?w=800&auto=format&fit=crop',
    tags: ['AI Agents', 'Community', 'Innovation'],
    content: `
      <p class="mb-4">The Phoenix AI Agents Summit 2025 was not just a conference; it was a declaration. As we gathered to discuss the future of autonomous systems, one theme rang louder than the rest: <strong>We must build for us.</strong></p>
      
      <h3 class="text-xl font-bold text-white mt-6 mb-3">The Agentic Shift</h3>
      <p class="mb-4">We are witnessing a shift from passive tools to active agents. In the African context, this distinction is vital. Our markets are fragmented, our infrastructure is unique, and our problems are complex. Off-the-shelf AI models from the West often lack the nuance to navigate mobile money integrations, local languages, or informal sector dynamics.</p>
      
      <h3 class="text-xl font-bold text-white mt-6 mb-3">Local Context is King</h3>
      <p class="mb-4">During the summit, we explored how agents can bridge gaps in healthcare logistics and fintech. Imagine an agent that doesn't just chat but actively negotiates supply prices for a 'mama mboga' via WhatsApp, or an agent that triages patients in rural clinics based on local epidemiological data.</p>
      
      <p class="mb-4">The energy in the room confirmed that the talent to build these solutions is here. It is time to stop consuming and start architecting.</p>
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
