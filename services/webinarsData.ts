import { Sparkles, Target, Lightbulb, MessageCircle, Brain, Cpu, Globe, Zap } from 'lucide-react';

export interface Webinar {
  id: string;
  status: 'completed' | 'upcoming';
  title: string;
  shortDescription: string;
  longDescription: string;
  date: string;
  time: string;
  duration: string;
  spots: string;
  host: string;
  hostTitle: string;
  hostBio: string;
  hostInitials: string;
  guestSpeaker?: string;
  guestSpeakerTitle?: string;
  guestSpeakerBio?: string;
  guestSpeakerInitials?: string;
  registrationUrl: string;
  youtubeEmbedUrl?: string;
  topics: { iconName: string; title: string; description: string }[];
  agenda: { time: string; title: string; description: string }[];
  benefits: string[];
  coOrganizer?: string;
}

export const webinars: Webinar[] = [
  {
    id: 'agentic-ai-africa-2026',
    status: 'completed',
    title: 'Agentic AI in 2026: How to Scale It for Africa',
    shortDescription: `Join fellow humans to explore how Agentic AI will shape Africa's future - and maybe finally automate that task you've been secretly dreading.`,
    longDescription: `This isn't your typical webinar. We ditched the corporate jargon and dived into a playful, practical exploration of how Agentic AI is transforming work across Africa. Whether you're a business leader, developer, or just AI-curious, you'll leave with actionable insights and maybe a few laughs along the way.`,
    date: 'February 12, 2026',
    time: '7:00 PM EAT',
    duration: '90 minutes',
    spots: 'Limited to 50 participants',
    host: 'Ezra Muinde',
    hostTitle: 'Founder, Ubuntu Analytiq',
    hostInitials: 'EM',
    hostBio: `Ezra is passionate about making AI and data analytics accessible to African businesses. With experience in AI systems and business analytics, he brings a practical, results-focused approach to AI education.`,
    registrationUrl: 'https://docs.google.com/forms/d/e/1FAIpQLSer5DSzBxdi_kSF-WaVyEBtOPxMZN_3bXZS5TBK1Rv9NjWsxg/viewform',
    youtubeEmbedUrl: 'https://www.youtube.com/embed/PndHwr6x5Ng',
    topics: [
      { iconName: 'Sparkles', title: 'Agentic AI Fundamentals', description: 'What makes an AI "agentic" and why it matters for your business' },
      { iconName: 'Target', title: 'Real-World Use Cases', description: 'Customer service, data analysis, workflow automation, and more' },
      { iconName: 'Lightbulb', title: 'Building vs Buying', description: 'When to build custom agents vs using existing solutions' },
      { iconName: 'MessageCircle', title: 'Interactive Discussion', description: 'Bring your questions, challenges, and ideas to the conversation' },
    ],
    agenda: [
      { time: '7:00 PM', title: 'Opening: The State of Agentic AI', description: `Where we are, where we're going, and why Africa is uniquely positioned to lead` },
      { time: '7:15 PM', title: 'Live Demo: Real Agents in Action', description: 'Watch autonomous AI agents solve real business problems in real-time' },
      { time: '7:35 PM', title: 'Building Your First Agent', description: 'Step-by-step walkthrough of creating a simple but powerful AI agent' },
      { time: '8:00 PM', title: 'African Context: Opportunities & Challenges', description: `How to deploy AI agents given Africa's unique tech landscape` },
      { time: '8:20 PM', title: 'Live Q&A + Fun Reflection', description: `Your questions answered + share one task you'd love to automate` },
    ],
    benefits: [
      'Understand the Agentic AI landscape in 2026',
      'See live demos of working AI agents',
      `Learn what's possible with your current resources`,
      'Get your specific questions answered',
      'Receive exclusive 10% discount code for any course',
      'Access to webinar recording and resources',
    ],
  },
  {
    id: 'building-deploying-agentic-ai',
    status: 'upcoming',
    title: 'Building & Deploying Agentic AI Systems',
    shortDescription: `A deep dive into the practical side of Agentic AI — from architecture to deployment. Learn how to build AI agents that actually work in production.`,
    longDescription: `Organised in partnership with Zetech University AI/ML and Data Science Club, this session bridges theory and practice. Ezra Muinde joins as Guest Speaker alongside host Alois Gitau to walk you through the full lifecycle of building and deploying agentic AI systems.`,
    date: 'March 4, 2026',
    time: '7:00 PM – 8:00 PM EAT',
    duration: '60 minutes',
    spots: 'Virtual — open registration',
    host: 'Alois Gitau',
    hostTitle: 'AI/ML & Data Science Lead | AWS Cloud Technical Lead, Zetech University',
    hostInitials: 'AG',
    hostBio: `Alois is an AI/ML and Data Science Lead and AWS Cloud Technical Lead at Zetech University. He brings deep technical expertise in cloud-native AI deployments.`,
    guestSpeaker: 'Ezra Muinde',
    guestSpeakerTitle: 'Data Scientist at Naivas · Founder, Ubuntu Analytiq · Lead Tutor, Phoenix KE Analytics',
    guestSpeakerInitials: 'EM',
    guestSpeakerBio: `Ezra brings hands-on experience deploying AI in real African business contexts. From retail analytics at Naivas to training the next generation of data professionals, he makes complex AI concepts practical and actionable.`,
    registrationUrl: 'https://docs.google.com/forms/d/11wZd7qfrleglieYNy_1QKJkLzyil2O-HNxVNpmdyca0/edit?usp=sharing_eil_se_dm&ts=6998153f',
    coOrganizer: 'Zetech University & Tech — Code. Connect. Create.',
    topics: [
      { iconName: 'Brain', title: 'What is Agentic AI?', description: 'Demystifying agents — how they perceive, plan, act, and learn' },
      { iconName: 'Cpu', title: 'Platforms and Systems', description: 'Architectures, frameworks, and practical patterns for production agents' },
      { iconName: 'Globe', title: 'Deployment Strategies', description: 'Cloud-native deployment, containerisation, and scaling' },
      { iconName: 'Zap', title: 'Real-World Use Cases', description: 'Live walkthroughs of agents solving actual business problems' },
    ],
    agenda: [
      { time: '7:00 PM', title: 'Welcome & Introductions', description: 'Alois and Ezra set the scene for the session' },
      { time: '7:08 PM', title: 'What is Agentic AI?', description: 'A clear, jargon-free breakdown of how agents differ from traditional AI' },
      { time: '7:20 PM', title: 'Live Build: Your First AI Agent', description: 'Follow along as Ezra builds a working agent from scratch' },
      { time: '7:40 PM', title: 'Deployment on AWS', description: 'Alois walks through containerising and deploying agents to the cloud' },
      { time: '7:50 PM', title: 'Q&A + Next Steps', description: 'Open floor for questions and resources to continue your journey' },
    ],
    benefits: [
      'Understand how agentic systems are architected',
      'Watch a live agent demo end-to-end',
      'Learn about Agentic AI platforms and systems',
      'Get expert answers to your specific questions',
      'Connect with Ubuntu Agentit AI community',
      'Access recording and all code resources after the session',
    ],
  },
];

export const getWebinarById = (id: string): Webinar | undefined =>
  webinars.find((w) => w.id === id);
