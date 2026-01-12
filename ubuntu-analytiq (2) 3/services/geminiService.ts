import { GoogleGenAI } from "@google/genai";

const SYSTEM_INSTRUCTION = `
You are a helpful, professional, and tech-savvy assistant for Ubuntu AnalytIQ.
Ubuntu AnalytIQ specializes in Data Science Mentorship, AI Training, and Agentic AI Consultancy.
Key offerings:
1. Courses: Excel, Power BI, AI Agents Masterclass, AI Mastery.
2. Services: Business Analytics, AI Fluency, Agentic Workflows.
3. Target Audience: African market (Kenya focus) and global learners.
4. Tone: Encouraging, professional, futuristic but grounded.

If a user asks about prices:
- Excel Workshop: KES 5,000
- Excel & Power BI: KES 12,000
- AI Agents Masterclass: KES 15,000
- AI Mastery: KES 25,000

Guide them to the "Courses" page for enrollment or "AI Fluency" page to take the assessment.
`;

let ai: GoogleGenAI | null = null;

try {
  if (process.env.API_KEY) {
    ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  } else {
    console.warn("Gemini API Key is missing. Chat will not function.");
  }
} catch (error) {
  console.error("Error initializing Gemini client", error);
}

export const sendMessageToGemini = async (message: string, history: {role: string, parts: {text: string}[]}[] = []): Promise<string> => {
  if (!ai) return "I'm currently offline (API Key missing). Please check back later.";

  try {
    const model = 'gemini-2.5-flash';
    
    const chat = ai.chats.create({
      model: model,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
      },
      history: history // Pass previous context
    });

    const result = await chat.sendMessage({ message });
    return result.text || "I didn't catch that. Could you rephrase?";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "I'm having trouble connecting to the neural network. Please try again.";
  }
};

export const analyzeBusinessCase = async (company: string, useCase: string): Promise<string> => {
  if (!ai) return "System Offline. Unable to process analysis.";

  try {
    const prompt = `
      Analyze the following business use case for a potential client named "${company}".
      Use Case: "${useCase}".
      
      Act as an advanced AI Solutions Architect. Provide a brief, technical terminal-style log output containing:
      1. Estimated Complexity (Low/Medium/High)
      2. Recommended Agentic Framework (e.g., ReAct, Hierarchical Swarm, LangGraph)
      3. Key Tools Required (e.g., n8n, OpenAI, Vector DB)
      4. Estimated Efficiency Gain (%)
      
      Format as a raw log without markdown code blocks. Keep it concise.
    `;

    // Use Pro for complex reasoning tasks
    const response = await ai.models.generateContent({
      model: 'gemini-3-pro-preview',
      contents: prompt,
    });
    
    return response.text || "Analysis complete. Awaiting human verification.";
  } catch (error) {
    console.error("Gemini Analysis Error:", error);
    return "Error generating analysis. Proceeding to manual override.";
  }
};

export const summarizeBlog = async (content: string): Promise<string> => {
  if (!ai) return "AI services unavailable.";

  try {
    const prompt = `
      You are an expert tech editor. Summarize the following blog post into 3 short, punchy bullet points. 
      Focus on the business value and technical insights.
      
      Blog Content:
      "${content}"
    `;

    // Use Flash for fast text summarization
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });
    
    return response.text || "Could not generate summary.";
  } catch (error) {
    console.error("Gemini Summary Error:", error);
    return "Error generating summary.";
  }
};
