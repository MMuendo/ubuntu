import { Course, Product, Question } from './types';
import React from 'react';
import { BarChart3, Brain, Bot, FileSpreadsheet, Database, Zap } from 'lucide-react';

export const COURSES: Course[] = [
  {
    id: 'excel-workshop',
    title: 'Excel Workshop',
    price: 5000,
    description: 'Master advanced Excel functions, pivot tables, and data visualization techniques.',
    level: 'Beginner',
    tags: ['Data Analysis', 'Productivity']
  },
  {
    id: 'powerbi-workshop',
    title: 'Excel & Power BI Hybrid',
    price: 8500,
    description: 'Bridge the gap between spreadsheets and modern business intelligence dashboards.',
    level: 'Intermediate',
    tags: ['BI', 'Visualization']
  },
  {
    id: 'ai-agents-masterclass',
    title: 'AI Agents Masterclass',
    price: 12000,
    description: 'Learn to design and deploy autonomous AI agents for business automation.',
    level: 'Advanced',
    tags: ['Agentic AI', 'Automation']
  },
  {
    id: 'ai-mastery',
    title: 'AI Mastery',
    price: 15000,
    description: 'Complete data science bootcamp covering Python, ML, and AI ethics.',
    level: 'Advanced',
    tags: ['Machine Learning', 'Python']
  }
];

export const PLANS: { [key: string]: Product } = {
  BASIC: {
    id: 'mastery-plan',
    name: '1-Month AI Mastery Plan',
    price: 2500,
    description: 'Master the fundamentals with structured weekly modules and expert check-ins.'
  },
  ADVANCED: {
    id: 'agent-plan',
    name: '1-Month AI Agents Mastery Plan',
    price: 7500,
    description: 'Design and deploy autonomous AI agents with direct mentor guidance.'
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
  // PART 1: Foundations (Questions 1-10)
  {
    id: 1,
    text: "What does 'EDA' stand for in Data Science?",
    options: [
      "Exploratory Data Analysis",
      "External Database Access",
      "Ethical Data Assessment",
      "Essential Digital Assets"
    ],
    correctIndex: 0,
    category: "Technical"
  },
  {
    id: 2,
    text: "Which Python library is most commonly used for data manipulation and analysis?",
    options: [
      "Flask",
      "Pandas",
      "PyGame",
      "Requests"
    ],
    correctIndex: 1,
    category: "Technical"
  },
  {
    id: 3,
    text: "What is the primary role of a 'Primary Key' in a database?",
    options: [
      "To encrypt the data",
      "To uniquely identify each record",
      "To store the password",
      "To sort data alphabetically only"
    ],
    correctIndex: 1,
    category: "Technical"
  },
  {
    id: 4,
    text: "In Machine Learning, what is 'Overfitting'?",
    options: [
      "When the model performs well on training data but poorly on new data",
      "When the model is too slow",
      "When the dataset is too small",
      "When the computer overheats"
    ],
    correctIndex: 0,
    category: "Technical"
  },
  {
    id: 5,
    text: "Which of the following is an example of Supervised Learning?",
    options: [
      "Clustering customers based on behavior",
      "Predicting house prices based on historical data",
      "Dimensionality reduction",
      "Anomaly detection"
    ],
    correctIndex: 1,
    category: "Technical"
  },
  {
    id: 6,
    text: "What is the main advantage of Power BI over standard Excel for large datasets?",
    options: [
      "It is free",
      "It can handle millions of rows and create interactive relationships efficiently",
      "It has a calculator",
      "It creates PDFs"
    ],
    correctIndex: 1,
    category: "Strategy"
  },
  {
    id: 7,
    text: "What constitutes 'Dirty Data'?",
    options: [
      "Data containing private info",
      "Data with errors, duplicates, or missing values",
      "Data that is encrypted",
      "Data stored on old hard drives"
    ],
    correctIndex: 1,
    category: "Technical"
  },
  {
    id: 8,
    text: "Why is 'Data Ethics' crucial in AI development?",
    options: [
      "It makes the code run faster",
      "It saves storage space",
      "To ensure fairness, privacy, and accountability",
      "It is not important"
    ],
    correctIndex: 2,
    category: "Ethics"
  },
  {
    id: 9,
    text: "Which chart type is best for showing a trend over time?",
    options: [
      "Pie Chart",
      "Line Chart",
      "Scatter Plot",
      "TreeMap"
    ],
    correctIndex: 1,
    category: "Technical"
  },
  {
    id: 10,
    text: "What is a 'Dashboard' in Business Intelligence?",
    options: [
      "A type of database",
      "A visual display of key metrics and KPIs",
      "A programming language",
      "A hardware component"
    ],
    correctIndex: 1,
    category: "Strategy"
  },
  // PART 2: Agentic AI & Automation (Questions 11-20)
  {
    id: 11,
    text: "What distinguishes an 'AI Agent' from a standard 'Chatbot'?",
    options: [
      "Agents can use tools and execute autonomous actions; Chatbots primarily converse.",
      "Agents are faster than Chatbots.",
      "Chatbots use LLMs; Agents do not.",
      "There is no difference; they are synonyms."
    ],
    correctIndex: 0,
    category: "Strategy"
  },
  {
    id: 12,
    text: "In the ReAct prompting framework (Reasoning + Acting), what is the first step the agent takes?",
    options: [
      "Think / Reason about the task.",
      "Immediately execute the first tool available.",
      "Ask the user for more data.",
      "Output the final answer."
    ],
    correctIndex: 0,
    category: "Technical"
  },
  {
    id: 13,
    text: "Which tool is commonly used to visually build low-code AI automation workflows?",
    options: [
      "n8n",
      "Jupyter Notebook",
      "Tableau",
      "Figma"
    ],
    correctIndex: 0,
    category: "Technical"
  },
  {
    id: 14,
    text: "What is 'RAG' (Retrieval-Augmented Generation)?",
    options: [
      "Fetching external data to ground the LLM's response before generating an answer.",
      "Generating random answers to test the model.",
      "A method for compressing large language models.",
      "Retraining the model on new data every day."
    ],
    correctIndex: 0,
    category: "Technical"
  },
  {
    id: 15,
    text: "When building an agent, what is the purpose of 'Memory'?",
    options: [
      "To retain context from previous turns in the conversation/workflow.",
      "To store the API keys securely.",
      "To increase the speed of the GPU.",
      "To lower the cost of the API calls."
    ],
    correctIndex: 0,
    category: "Technical"
  },
  {
    id: 16,
    text: "What is 'Function Calling' in the context of OpenAI/Anthropic models?",
    options: [
      "The ability of the model to output a structured JSON object to trigger external code.",
      "Calling a Python function inside a loop.",
      "The model speaking out loud using text-to-speech.",
      "Importing a library in Python."
    ],
    correctIndex: 0,
    category: "Technical"
  },
  {
    id: 17,
    text: "In a Multi-Agent system, what does a 'Router' agent do?",
    options: [
      "It directs the user's query to the most specific sub-agent (e.g., Coding vs. Writing).",
      "It connects the server to the internet.",
      "It summarizes the final conversation.",
      "It generates the bill for the user."
    ],
    correctIndex: 0,
    category: "Strategy"
  },
  {
    id: 18,
    text: "Which of these is a major risk when deploying autonomous agents?",
    options: [
      "Infinite loops (agents calling tools repeatedly without stopping).",
      "Slow internet connection.",
      "The agent forgetting its name.",
      "The user typing too fast."
    ],
    correctIndex: 0,
    category: "Ethics"
  },
  {
    id: 19,
    text: "What role does LangChain play in AI development?",
    options: [
      "It is an orchestration framework for chaining LLMs, tools, and memory.",
      "It is a database for storing images.",
      "It is a programming language specifically for AI.",
      "It is a hosting provider."
    ],
    correctIndex: 0,
    category: "Technical"
  },
  {
    id: 20,
    text: "What is the 'Human-in-the-loop' design pattern?",
    options: [
      "Pausing the agent's execution to require human approval before a critical action.",
      "Replacing the AI entirely with a human.",
      "Training the AI on human biology.",
      "Having a human write the code for the agent."
    ],
    correctIndex: 0,
    category: "Strategy"
  }
];