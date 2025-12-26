import { GoogleGenAI, GenerateContentResponse } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const SYSTEM_INSTRUCTION = `You are the helpful AI assistant for Ubuntu AnalytIQ, a platform specializing in data science mentorship, training, and AI consultancy.
Your goal is to answer visitor questions about our courses (Excel, Power BI, AI Agents), our services (Business Analytics, AI Fluency, Agentic Workflows), and general AI concepts.
Be professional, concise, and encourage users to take the 'AI Fluency Assessment' or enroll in a course.
If a user asks about pricing, refer to the courses section (Excel: 5000 KES, Power BI: 8500 KES, Agents: 12000 KES, Mastery: 15000 KES).
Always maintain a helpful and tech-savvy tone.`;

export const streamChatResponse = async (
    userMessage: string, 
    history: { role: 'user' | 'model'; parts: { text: string }[] }[]
) => {
    try {
        const chat = ai.chats.create({
            model: 'gemini-2.5-flash',
            config: {
                systemInstruction: SYSTEM_INSTRUCTION,
            },
            history: history
        });

        const result = await chat.sendMessageStream({ message: userMessage });
        return result;

    } catch (error) {
        console.error("Gemini API Error:", error);
        throw error;
    }
};