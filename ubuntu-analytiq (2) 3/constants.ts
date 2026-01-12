import { Course, CourseType, Question, Service, BlogPost } from './types';

export const COURSES: Course[] = [
  {
    id: 'excel-workshop',
    title: 'Excel Workshop',
    price: 5000,
    description: 'Master the basics of data organization and analysis with Excel.',
    image: 'https://picsum.photos/400/250?random=1',
    type: CourseType.WORKSHOP
  },
  {
    id: 'excel-powerbi',
    title: 'Excel & Power BI Hybrid',
    price: 12000,
    description: 'Bridge the gap between spreadsheets and advanced business intelligence dashboards.',
    image: 'https://picsum.photos/400/250?random=2',
    type: CourseType.WORKSHOP
  },
  {
    id: 'ai-agents',
    title: 'AI Agents Masterclass',
    price: 15000,
    description: 'Learn to build autonomous agents using n8n and LangChain.',
    image: 'https://picsum.photos/400/250?random=3',
    type: CourseType.MASTERCLASS
  },
  {
    id: 'ai-mastery',
    title: 'AI Mastery',
    price: 25000,
    description: 'Comprehensive curriculum covering data science, AI ethics, and implementation.',
    image: 'https://picsum.photos/400/250?random=4',
    type: CourseType.MASTERY
  }
];

export const SERVICES: Service[] = [
  {
    id: 'business-analytics',
    title: 'Business Analytics',
    description: 'Custom solutions and corporate training to visualize your KPIs.',
    icon: 'chart'
  },
  {
    id: 'ai-fluency',
    title: 'AI & Data Fluency',
    description: 'Training and ethical AI consultancy to upskill your workforce.',
    icon: 'brain'
  },
  {
    id: 'agentic-workflows',
    title: 'Agentic Workflows',
    description: 'Designing AI agents and automation systems for HR, Support, and Ops.',
    icon: 'bot'
  }
];

export const ASSESSMENT_QUESTIONS: Question[] = [
  // Part 1: AI Mastery (Intermediate)
  {
    id: 1,
    text: "You are a Kenyan SME owner wanting to draft a localized marketing email. Which prompting technique yields the most culturally relevant result?",
    options: [
      "Act as a Kenyan digital marketer. Write an email using local slang (Sheng) and professional English, targeting youth in Kilimani.",
      "Write a marketing email for [Product].",
      "Summarize this product description into an email.",
      "Write a sales pitch in the style of Shakespeare."
    ],
    correctIndex: 0,
    category: 'Intermediate'
  },
  {
    id: 2,
    text: "Which AI tool is best suited for 'Real-Time' market research (e.g., finding current maize prices in Nakuru)?",
    options: [
      "Perplexity AI / Google Gemini",
      "ChatGPT (Free Version 3.5)",
      "Midjourney",
      "Jasper AI"
    ],
    correctIndex: 0,
    category: 'Intermediate'
  },
  {
    id: 3,
    text: "Under Kenya’s Data Protection Act (2019), what is a major risk when pasting customer phone numbers into a public LLM?",
    options: [
      "Data Leakage & Violation of Privacy",
      "The model will refuse to process numbers",
      "It costs too much money",
      "The internet connection will fail"
    ],
    correctIndex: 0,
    category: 'Intermediate'
  },
  {
    id: 4,
    text: "You want to automate customer support for your business on a platform most Africans use daily. Which tool integration is most valuable?",
    options: [
      "WhatsApp Business API + AI Chatbot",
      "Slack Bot",
      "Discord Server",
      "Email Autoresponder"
    ],
    correctIndex: 0,
    category: 'Intermediate'
  },
  {
    id: 5,
    text: "What is 'Chain of Thought' prompting?",
    options: [
      "Asking the AI to 'Think step-by-step' to improve reasoning.",
      "Asking the AI to link multiple websites together.",
      "Writing a very long prompt with no punctuation.",
      "Translating text from English to Swahili."
    ],
    correctIndex: 0,
    category: 'Intermediate'
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
    category: 'Intermediate'
  },
  {
    id: 7,
    text: "Which of these is a 'Generative AI' task?",
    options: [
      "Creating a new logo or writing a blog post from scratch.",
      "Sorting an Excel sheet alphabetically.",
      "Calculating the sum of a sales column.",
      "Storing files in the cloud."
    ],
    correctIndex: 0,
    category: 'Intermediate'
  },
  {
    id: 8,
    text: "Why is 'Context Window' important when analyzing a long PDF report?",
    options: [
      "It limits how much text the AI can 'read' and remember at one time.",
      "It determines the speed of the internet.",
      "It changes the color of the interface.",
      "It is the price per month of the tool."
    ],
    correctIndex: 0,
    category: 'Intermediate'
  },
  {
    id: 9,
    text: "For a graphic designer in Nairobi, which tool is specifically built for generating high-quality images from text?",
    options: [
      "Midjourney / DALL-E 3",
      "Claude 3.5 Sonnet",
      "GitHub Copilot",
      "Zapier"
    ],
    correctIndex: 0,
    category: 'Intermediate'
  },
  {
    id: 10,
    text: "What is the most effective way to protect your job as a content writer in the age of AI?",
    options: [
      "Becoming an 'AI Editor' who adds human insight and strategy.",
      "Refusing to use AI tools.",
      "Typing faster than the AI.",
      "Switching to manual typewriter."
    ],
    correctIndex: 0,
    category: 'Intermediate'
  },
  // Part 2: AI Agents Mastery (Advanced)
  {
    id: 11,
    text: "What is the primary difference between a 'Workflow Automation' (like Zapier) and a true 'AI Agent'?",
    options: [
      "Automation is rigid; Agents can 'Reason' and decide tools dynamically.",
      "Automation is cheaper.",
      "Agents only work on mobile phones.",
      "Automation requires code; Agents do not."
    ],
    correctIndex: 0,
    category: 'Advanced'
  },
  {
    id: 12,
    text: "You are building an agent to process payments. Which 'Tool' would you give the agent to trigger an M-Pesa transaction?",
    options: [
      "An API Function Call (POST request) to the Daraja API.",
      "A link to the Safaricom website.",
      "A text file with phone numbers.",
      "A screenshot of a QR code."
    ],
    correctIndex: 0,
    category: 'Advanced'
  },
  {
    id: 13,
    text: "In the context of n8n, what does a 'Webhook' allow you to do?",
    options: [
      "Receive real-time data from an external source to trigger a workflow.",
      "Catch fish in a digital pond.",
      "Design a website landing page.",
      "Encrypt your password."
    ],
    correctIndex: 0,
    category: 'Advanced'
  },
  {
    id: 14,
    text: "What does RAG (Retrieval-Augmented Generation) allow an AI agent to do for a Kenyan Law Firm?",
    options: [
      "Search a private database of precedents before answering.",
      "Generate random laws.",
      "Search Google for US laws only.",
      "Automatically sue people."
    ],
    correctIndex: 0,
    category: 'Advanced'
  },
  {
    id: 15,
    text: "You are designing a 'Customer Support Agent.' What is the risk of an 'Infinite Loop'?",
    options: [
      "The agent keeps trying to solve a problem without success, burning credits.",
      "The agent becomes sentient.",
      "The customer gets too many free products.",
      "The internet connection becomes too fast."
    ],
    correctIndex: 0,
    category: 'Advanced'
  },
  {
    id: 16,
    text: "What is the role of a 'Router' in a Multi-Agent System?",
    options: [
      "It acts as a traffic controller between specialized agents.",
      "It provides Wi-Fi to the office.",
      "It translates English to Swahili.",
      "It generates images for the chat."
    ],
    correctIndex: 0,
    category: 'Advanced'
  },
  {
    id: 17,
    text: "Which format is commonly used to structure data when passing it between an AI Agent and an API?",
    options: [
      "JSON (JavaScript Object Notation)",
      "PDF",
      "MS Word Doc",
      "JPEG Image"
    ],
    correctIndex: 0,
    category: 'Advanced'
  },
  {
    id: 18,
    text: "Why is 'Human-in-the-Loop' critical when using agents for high-stakes tasks?",
    options: [
      "To prevent biased or costly errors by requiring approval.",
      "Because AI cannot do math.",
      "To slow down the process intentionally.",
      "To ensure the AI doesn't get lonely."
    ],
    correctIndex: 0,
    category: 'Advanced'
  },
  {
    id: 19,
    text: "You are using LangChain to build an agent. What is 'Memory'?",
    options: [
      "The mechanism allowing the agent to remember previous context.",
      "The hard drive space on your laptop.",
      "The training data from 2021.",
      "The speed of the processor."
    ],
    correctIndex: 0,
    category: 'Advanced'
  },
  {
    id: 20,
    text: "A 'ReAct' Agent follows which cycle to solve problems?",
    options: [
      "Reason → Act → Observe",
      "Read → React → Repeat",
      "Random → Action → Output",
      "Request → API → JSON"
    ],
    correctIndex: 0,
    category: 'Advanced'
  }
];

export const BLOG_POSTS: BlogPost[] = [
  {
    id: 'phoenix-ai-summit-2025',
    title: 'Phoenix AI Agents Summit 2025: Building for Us',
    excerpt: 'Reflections on the recent summit and why building indigenous AI solutions is critical for Africa\'s future.',
    date: 'Feb 15, 2025',
    author: 'Ezra Muinde',
    image: 'https://picsum.photos/400/250?random=15',
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
    image: 'https://picsum.photos/400/250?random=16',
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
    excerpt: '“But of course you are replaceable… but your impact isn’t.”',
    date: 'May 25, 2025',
    author: 'Ezra Muinde',
    image: 'https://picsum.photos/400/250?random=17',
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
