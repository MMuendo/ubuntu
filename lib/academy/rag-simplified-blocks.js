export const ragSimplifiedBlocks = [
  {
    "text": "The models were trained on the world. We are here to teach them Africa.",
    "type": "quote"
  },
  {
    "text": "This topic reminds me of my entry into Agentic AI. It reminds me of the 80 students I have been able to train.",
    "type": "paragraph"
  },
  {
    "text": "It reminds me of the Hackathon we did last year. It reminds me of why I started the Agentic AI Masterclass.",
    "type": "paragraph"
  },
  {
    "text": "And it takes me back to my first article on Agentic AI; because this topic right here builds directly to the reason I started Ubuntu Analytiq ; for our context, our markets, and our opportunities.",
    "type": "paragraph"
  },
  {
    "text": "Okay. Allow me to cook.",
    "type": "paragraph"
  },
  {
    "text": "First, what is an LLM?",
    "type": "heading"
  },
  {
    "text": "You have used an LLM. In fact, you are probably using one right now. Claude, ChatGPT, Gemini; that thing you chat with.",
    "type": "paragraph"
  },
  {
    "text": "Not Claude Code, not Codex, not the design tools. That which you chat with. We call them LLMs; Large Language Models.",
    "type": "paragraph"
  },
  {
    "text": "They are called Large Language Models because, well, they are large; and they deal in language💀.",
    "type": "paragraph"
  },
  {
    "text": "You see those Sama jobs where Kenyans have been proudly saying they trained AI? Basically, they were labelling data.",
    "type": "paragraph"
  },
  {
    "text": "Telling the model: every time a Kenyan says onetum, they mean Ruto Must Go. Every time they say tutam, they mean Ruto goes for another term.",
    "type": "paragraph"
  },
  {
    "text": "Everything AI knows has been trained; trained from data. But because it has access to so much of that data, it reaches a point where it can do something remarkable: it can generate.",
    "type": "paragraph"
  },
  {
    "text": "That is the G in ChatGPT.",
    "type": "paragraph"
  },
  {
    "text": "Here is how to think about it.",
    "type": "paragraph"
  },
  {
    "text": "Imagine your teacher explained why the Agrarian Revolution thrived; good roads, fertile land, new tools. Then in your exam, you write: “It is because of better transportation infrastructure and improved farming methods.”",
    "type": "paragraph"
  },
  {
    "text": "You did not memorise the exact words. You understood the concept and expressed it in your own way.",
    "type": "paragraph"
  },
  {
    "text": "And you got full marks. That is exactly what Claude, ChatGPT, and Gemini are doing; every single time you send a message; they Generate!",
    "type": "paragraph"
  },
  {
    "text": "The Science Behind It (Simplified, I Promise)",
    "type": "heading"
  },
  {
    "text": "Under the hood, these models run on something called a Transformer; a neural network architecture that changed everything when it was introduced in 2017 in a paper titled, rather brilliantly, “Attention Is All You Need.”",
    "type": "paragraph"
  },
  {
    "text": "The Transformer works by paying attention; and not the polite kind. When you type a sentence, the model does not read it word by word like a human.",
    "type": "paragraph"
  },
  {
    "text": "It looks at the entire sentence at once, weighing every word against every other word to understand relationships and meaning.",
    "type": "paragraph"
  },
  {
    "text": "The word bank means something very different in “I went to the river bank” versus “I went to the bank to withdraw money.” The Transformer figures that out from context — automatically, at scale, across billions of words.",
    "type": "paragraph"
  },
  {
    "text": "This attention mechanism is why these models feel almost human. They are not just matching keywords. They are understanding meaning, tone, and relationship; and then generating a response that fits.",
    "type": "paragraph"
  },
  {
    "text": "Billions of parameters, trained on more text than any human being could read in a thousand lifetimes.",
    "type": "paragraph"
  },
  {
    "text": "That is your LLM. Brilliant. But limited.",
    "type": "paragraph"
  },
  {
    "text": "What the LLM Does Not Know",
    "type": "heading"
  },
  {
    "text": "Here is the problem. ChatGPT does not know your company’s refund policy.",
    "type": "paragraph"
  },
  {
    "text": "It does not know your product catalogue as of last Monday.",
    "type": "paragraph"
  },
  {
    "text": "It does not know why you broke up with your girlfriend; and frankly, it should not. It does not know:",
    "type": "paragraph"
  },
  {
    "items": [
      "What was said in your last board meeting",
      "Your organisation’s internal HR procedures",
      "The specific terms of your client contracts",
      "Your customer FAQs or product specs",
      "Anything that happened after its training cutoff date"
    ],
    "type": "list",
    "ordered": false
  },
  {
    "text": "The model was trained on the internet; and the internet does not know your business. It does not know your community. It does not know us.",
    "type": "paragraph"
  },
  {
    "text": "So when you ask it something too specific, it does one of two things: it says “I don’t know” — which is the honest answer — or it confidently makes something up.",
    "type": "paragraph"
  },
  {
    "text": "That second thing has a name. We call it hallucination. And it is a real problem.",
    "type": "paragraph"
  },
  {
    "text": "The solution? Context. And that is exactly what RAG is about.",
    "type": "paragraph"
  },
  {
    "text": "Context — The Thing That Changes Everything",
    "type": "heading"
  },
  {
    "text": "When you walk into a therapist’s office for the first time, they do not already know your story. You have to tell them.",
    "type": "paragraph"
  },
  {
    "text": "Your childhood, your relationships, your triggers, your patterns. Without that background, any advice they give will be generic at best, harmful at worst. The context is what makes their guidance specific to you.",
    "type": "paragraph"
  },
  {
    "text": "Remember when Njugush and Wakavinye had that public relationship drama? Everyone had an opinion.",
    "type": "paragraph"
  },
  {
    "text": "But the only side of the story making the rounds was Wakavinye’s. And all the men kept saying, “we want to hear both sides.” My guy; that is context.",
    "type": "paragraph"
  },
  {
    "text": "Without full context, even a reasonable person becomes biased.",
    "type": "paragraph"
  },
  {
    "text": "With full context, you get a much more balanced, truthful picture. Same situation. Different outcome depending on what you know.",
    "type": "paragraph"
  },
  {
    "text": "That is exactly how AI works. Feed it your context, and it answers from your world. Without it, it answers from Sama’s labelling sessions and Reddit threads. With it, it becomes your expert.",
    "type": "paragraph"
  },
  {
    "text": "And that context — that is RAG.",
    "type": "paragraph"
  },
  {
    "text": "So What Exactly is a RAG?",
    "type": "heading"
  },
  {
    "text": "RAG stands for Retrieval Augmented Generation. Let us break that down; but first, let me give you the plain version.",
    "type": "paragraph"
  },
  {
    "text": "When you upload a PDF to ChatGPT and ask it questions based on that document; that is a RAG.",
    "type": "paragraph"
  },
  {
    "text": "Instead of answering from what it was trained on, the AI refers to the new knowledge you gave it.",
    "type": "paragraph"
  },
  {
    "text": "You gave it context. It retrieved from that context. It generated an answer. Retrieval. Augmented. Generation. Done.",
    "type": "paragraph"
  },
  {
    "text": "Simple example: You upload a 50-page company policy document and ask, “What is the leave policy for new employees?”",
    "type": "paragraph"
  },
  {
    "text": "ChatGPT has never seen your policy. But you just gave it that PDF. It goes into the document, finds the section about leave, pulls it out, and generates a clear, accurate answer.",
    "type": "paragraph"
  },
  {
    "text": "That is RAG in its most basic form.",
    "type": "paragraph"
  },
  {
    "text": "R — Retrieval",
    "type": "heading"
  },
  {
    "text": "This is the magic step. When you ask a question, the system does not read the entire document word by word.",
    "type": "paragraph"
  },
  {
    "text": "Write on Medium",
    "type": "paragraph"
  },
  {
    "text": "That would be slow and inefficient. Instead, it has already broken your document into small chunks and indexed them; think of it like building a very smart table of contents, except instead of page numbers, it maps meaning.",
    "type": "paragraph"
  },
  {
    "text": "When you ask about Ezra Muinde, the system searches through all those chunks for anything related to Ezra Muinde;and retrieves only the relevant sections. Fast. Targeted. Efficient.",
    "type": "paragraph"
  },
  {
    "text": "But here is where it gets interesting.",
    "type": "paragraph"
  },
  {
    "text": "Suppose your document has this information about Ezra: he is a Data Scientist, an AI Engineer, he loves reading, his favourite series is Prison Break, he does not enjoy music, and — very importantly — he is a middle child. (All the middle children in the room know exactly why that matters.)",
    "type": "paragraph"
  },
  {
    "text": "Now you ask: “Based on what you know about Ezra, what kind of music does he enjoy?”",
    "type": "paragraph"
  },
  {
    "text": "The document says he does not enjoy music. But your question assumes he does. The retrieval pulls the right chunk; the one about Ezra’s personality — but then the generation step has to work with a question that is pointing in the wrong direction.",
    "type": "paragraph"
  },
  {
    "text": "This is where hallucination can creep in. The model might try to answer the question anyway, inventing preferences for Ezra rather than simply saying the premise is wrong.",
    "type": "paragraph"
  },
  {
    "text": "This is why how you ask matters enormously. Which brings us to the second piece.",
    "type": "paragraph"
  },
  {
    "text": "A — Augmented",
    "type": "heading"
  },
  {
    "text": "Augmented means enhanced. The model’s base knowledge; everything it learned during training; is being augmented with your specific, private, real-world information.",
    "type": "paragraph"
  },
  {
    "text": "Think of it like giving a brilliant doctor your medical history before the consultation. They are already knowledgeable.",
    "type": "paragraph"
  },
  {
    "text": "Now they are knowledgeable about you. That combination; general intelligence plus specific context; is what makes the output genuinely useful.",
    "type": "paragraph"
  },
  {
    "text": "Without augmentation, the LLM is a brilliant stranger. With augmentation, it becomes something much closer to a specialist who knows your situation.",
    "type": "paragraph"
  },
  {
    "text": "G — Generation",
    "type": "heading"
  },
  {
    "text": "This is where the LLM does what it does best.",
    "type": "paragraph"
  },
  {
    "text": "Having retrieved the right context and combined it with its training, it now generates a response; not just a copy-paste from your document, but a synthesised, natural, readable answer.",
    "type": "paragraph"
  },
  {
    "text": "It connects the dots. It explains. It elaborates. It speaks in full sentences that make sense to the person asking.",
    "type": "paragraph"
  },
  {
    "text": "And this is directly connected to prompting; the way you frame your question shapes the quality of what gets generated.",
    "type": "paragraph"
  },
  {
    "text": "A vague question gives you a vague answer. A precise question gives you a precise answer. A question built on a wrong assumption can give you a wrong answer delivered with full confidence.",
    "type": "paragraph"
  },
  {
    "text": "The prompt is the steering wheel. The RAG is the engine. Together, they take you where you want to go; but only if you know how to drive.",
    "type": "paragraph"
  },
  {
    "text": "RAG Pipelines in Agentic AI",
    "type": "heading"
  },
  {
    "text": "Now, this is where it gets exciting. Basic RAG; upload a PDF, ask a question; is just the beginning. In Agentic AI, RAG is not a one-time lookup.",
    "type": "paragraph"
  },
  {
    "text": "It is a living pipeline. And when it is wired into a database, it becomes something entirely different.",
    "type": "paragraph"
  },
  {
    "text": "Here is how a RAG pipeline works at the agentic level:",
    "type": "paragraph"
  },
  {
    "items": [
      "Ingestion: Your documents, databases, websites, chat logs; all your knowledge sources; are broken into chunks and converted into numerical representations called embeddings. These embeddings capture meaning, not just words.",
      "Storage: Those embeddings are stored in a special kind of database called a vector store; think Pinecone, Weaviate, or pgvector. This is not your regular SQL database. It stores meaning.",
      "Retrieval: When a question comes in, the system converts that question into an embedding too, then searches the vector store for the chunks whose meaning is closest to the question. It is similarity search; finding the most relevant knowledge, not just keyword matches.",
      "Augmented Prompt: The retrieved chunks are injected into the prompt alongside the user’s question. The LLM sees both: “Here is the relevant context from your knowledge base, and here is what the user is asking.”",
      "Generation: The LLM generates a grounded, accurate, contextual response; sourced from your real data, not from its general training."
    ],
    "type": "list",
    "ordered": false
  },
  {
    "text": "In agentic systems, this pipeline does not just answer questions; it acts. An AI agent can retrieve context, make a decision, call a tool, update a database, and report back; all in one flow.",
    "type": "paragraph"
  },
  {
    "text": "Imagine a customer support agent that retrieves your company policies, checks the customer’s order history, generates a resolution, and logs the interaction; automatically.",
    "type": "paragraph"
  },
  {
    "text": "That is RAG in an agentic pipeline.",
    "type": "paragraph"
  },
  {
    "text": "We are talking about AI that does not just know things. AI that knows the right things, at the right moment, in the right context; and then acts on them.",
    "type": "paragraph"
  },
  {
    "text": "Why RAGs Are the Context We Need in Africa",
    "type": "heading"
  },
  {
    "text": "Here is the honest truth.",
    "type": "paragraph"
  },
  {
    "text": "The LLMs that power ChatGPT, Claude, and Gemini were trained predominantly on Western data; Western news, Western literature, Western business practices, Western languages.",
    "type": "paragraph"
  },
  {
    "text": "They know Nairobi as a concept, but they do not know our Nairobi. They know Africa as a geography, but they do not know our markets, our languages, our informality, our ingenuity.",
    "type": "paragraph"
  },
  {
    "text": "RAG changes that equation. It means we do not have to wait for a foundation model to be retrained on African data; which could take years and billions of dollars we do not have.",
    "type": "paragraph"
  },
  {
    "text": "Instead, we can inject our context right now. Our case law, in Kenyan courts. Our agricultural data, from our soils.",
    "type": "paragraph"
  },
  {
    "text": "Our health records, from our clinics. Our financial behaviour, from our SACCOs and mobile money systems. Our local languages and dialects.",
    "type": "paragraph"
  },
  {
    "text": "A lawyer in Kisumu can build an AI assistant that knows Kenyan land law.",
    "type": "paragraph"
  },
  {
    "text": "A clinic in Eldoret can deploy an AI that understands local disease patterns and patient histories.",
    "type": "paragraph"
  },
  {
    "text": "A SACCO in Mombasa can use an AI agent that understands member behaviour and lending risk in the Kenyan context.",
    "type": "paragraph"
  },
  {
    "text": "None of this requires retraining a billion-parameter model. It requires a good RAG pipeline.",
    "type": "paragraph"
  },
  {
    "text": "This is why I started Ubuntu Analytiq. Not to import AI solutions designed for different markets and different problems.",
    "type": "paragraph"
  },
  {
    "text": "But to build AI that knows us; that is grounded in our context, trained on our data, answering our questions.",
    "type": "paragraph"
  },
  {
    "text": "RAG is not just a technical pattern. In Africa, RAG is a strategy. It is how we make AI relevant before the world gets around to doing it for us.",
    "type": "paragraph"
  },
  {
    "text": "And given how this continent moves when it decides to move — we are more than capable of doing it ourselves.",
    "type": "paragraph"
  },
  {
    "text": "Want to Go Deeper?",
    "type": "heading"
  },
  {
    "text": "We are just getting started. If this piece made you curious; if you found yourself nodding, or wanting to ask questions, or thinking about how RAG could apply to your organisation, your startup, or your industry; then the next step is clear.",
    "type": "paragraph"
  },
  {
    "text": "Join the upcoming Agentic AI Masterclass by Ubuntu Analytiq. We go from concepts like this all the way to building real RAG pipelines; from ingestion, to vector stores, to deployment.",
    "type": "paragraph"
  },
  {
    "text": "Hands-on. Practical. Built for the African context.",
    "type": "paragraph"
  },
  {
    "text": "Tools to start exploring right now:",
    "type": "paragraph"
  },
  {
    "items": [
      "LangChain / LlamaIndex — The most popular frameworks for building RAG pipelines in Python",
      "Pinecone / Weaviate / pgvector — Vector databases for storing your embeddings",
      "Anthropic Claude API / OpenAI API — The generation layer for your RAG pipeline",
      "Notion AI / ChatGPT with files — The easiest starting point if you just want to see RAG in action before building anything"
    ],
    "type": "list",
    "ordered": false
  },
  {
    "text": "Start with the concept. Then build the thing. Then scale it for your context.",
    "type": "paragraph"
  },
  {
    "text": "AI for our context. Our markets. Our opportunities.",
    "type": "paragraph"
  }
];
