import OpenAI from "openai";

const SYSTEM_INSTRUCTION = `You are the helpful AI assistant for Ubuntu AnalytIQ, a platform specializing in data science mentorship, training, and AI consultancy.
Your goal is to answer visitor questions about our courses (Excel, Power BI, AI Agents), our services (Business Analytics, AI Fluency, Agentic Workflows), and general AI concepts.
Be professional, concise, and encourage users to take the 'AI Fluency Assessment' or enroll in a course.

Key offerings:
1. Courses: Excel Workshop (5,000 KES), Power BI Hybrid (8,500 KES), AI Agents Masterclass (12,000 KES), AI Mastery (15,000 KES).
2. Services: Business Analytics, AI Fluency, Agentic Workflows.
3. Target Audience: African market (Kenya focus) and global learners.
4. Tone: Encouraging, professional, futuristic but grounded.

Guide them to the "Courses" page for enrollment or "AI Fluency" page to take the assessment.`;

let openai: OpenAI | null = null;

try {
    if (import.meta.env.OPENAI_API_KEY) {
        openai = new OpenAI({
            apiKey: import.meta.env.OPENAI_API_KEY,
            dangerouslyAllowBrowser: true // Enabling for frontend-only demo usage. In production, proxy via backend.
        });
    } else {
        console.warn("OpenAI API Key is missing. Chat will not function.");
    }
} catch (error) {
    console.error("Error initializing OpenAI client", error);
}

// Streaming chat response for real-time UI updates
export const streamChatResponse = async (
    userMessage: string,
    history: { role: 'user' | 'model'; parts: { text: string }[] }[]
) => {
    if (!openai) throw new Error("AI client not initialized");

    try {
        const messages: OpenAI.Chat.ChatCompletionMessageParam[] = [
            { role: "system", content: SYSTEM_INSTRUCTION }
        ];

        // Convert Gemini-style history to OpenAI format
        history.forEach(msg => {
            messages.push({
                role: msg.role === 'model' ? 'assistant' : 'user',
                content: msg.parts[0].text
            });
        });

        messages.push({ role: "user", content: userMessage });

        const stream = await openai.chat.completions.create({
            model: "gpt-4o",
            messages: messages,
            stream: true,
        });

        return stream;

    } catch (error) {
        console.error("OpenAI API Error:", error);
        throw error;
    }
};

// Non-streaming chat response for simpler use cases
export const sendMessageToAI = async (
    message: string,
    history: { role: string; parts: { text: string }[] }[] = []
): Promise<string> => {
    if (!openai) return "I'm currently offline (API Key missing). Please check back later.";

    try {
        const messages: OpenAI.Chat.ChatCompletionMessageParam[] = [
            { role: "system", content: SYSTEM_INSTRUCTION }
        ];

        history.forEach(msg => {
            messages.push({
                role: msg.role === 'model' ? 'assistant' : 'user',
                content: msg.parts[0].text
            });
        });

        messages.push({ role: "user", content: message });

        const completion = await openai.chat.completions.create({
            model: "gpt-4o",
            messages: messages,
        });

        return completion.choices[0].message.content || "I didn't catch that. Could you rephrase?";
    } catch (error) {
        console.error("OpenAI API Error:", error);
        return "I'm having trouble connecting to the neural network. Please try again.";
    }
};

// Analyze business use case for Agentic AI consultation
export const analyzeBusinessCase = async (
    company: string,
    useCase: string
): Promise<string> => {
    if (!openai) return "System Offline. Unable to process analysis.";

    try {
        const prompt = `
      Analyze the following business use case for a potential client named "${company}".
      Use Case: "${useCase}".
      
      Act as an advanced AI Solutions Architect. Provide a brief, technical terminal-style log output containing:
      1. Estimated Complexity (Low/Medium/High)
      2. Recommended Agentic Framework (e.g., ReAct, Hierarchical Swarm, LangGraph)
      3. Key Tools Required (e.g., n8n, OpenAI, Vector DB)
      4. Estimated Efficiency Gain (%)
      
      Format as a raw log without markdown code blocks. Keep it concise (4-6 lines).
    `;

        const completion = await openai.chat.completions.create({
            model: "gpt-4o",
            messages: [{ role: "user", content: prompt }],
        });

        return completion.choices[0].message.content || "Analysis complete. Awaiting human verification.";
    } catch (error) {
        console.error("OpenAI Analysis Error:", error);
        return "Error generating analysis. Proceeding to manual override.";
    }
};

// Summarize blog post content
export const summarizeBlog = async (content: string): Promise<string> => {
    if (!openai) return "AI services unavailable.";

    try {
        const prompt = `
      You are an expert tech editor. Summarize the following blog post into 3 short, punchy bullet points. 
      Focus on the business value and technical insights.
      Format each point on a new line with a bullet (•).
      
      Blog Content:
      "${content}"
    `;

        const completion = await openai.chat.completions.create({
            model: "gpt-4o",
            messages: [{ role: "user", content: prompt }],
        });

        return completion.choices[0].message.content || "Could not generate summary.";
    } catch (error) {
        console.error("OpenAI Summary Error:", error);
        return "Error generating summary.";
    }
};
