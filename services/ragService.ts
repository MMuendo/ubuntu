/**
 * RAG Service - Connection to the Course Support RAG Backend
 * 
 * This service provides an interface to query the LangChain-based RAG system
 * for course support questions. Falls back to direct Gemini if RAG is unavailable.
 */

const RAG_API_URL = process.env.RAG_API_URL || 'http://localhost:8000';

export interface RAGResponse {
    query: string;
    answer: string;
    sources: Array<{ content: string; source: string }>;
    confidence?: number;
    rewritten_query?: string;
    response_time: number;
    timestamp: string;
}

export interface ChatHistoryMessage {
    role: 'user' | 'assistant';
    content: string;
}

/**
 * Query the RAG system for course-related questions
 */
export async function queryRAG(
    query: string,
    chatHistory: ChatHistoryMessage[] = [],
    useAdaptive: boolean = true
): Promise<RAGResponse> {
    try {
        const response = await fetch(`${RAG_API_URL}/query`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                query,
                use_adaptive: useAdaptive,
                chat_history: chatHistory.map(msg => ({
                    role: msg.role === 'assistant' ? 'ai' : 'human',
                    content: msg.content
                }))
            })
        });

        if (!response.ok) {
            throw new Error(`RAG query failed: ${response.statusText}`);
        }

        return await response.json();
    } catch (error) {
        console.error('RAG Service Error:', error);
        throw error;
    }
}

/**
 * Check if the RAG backend is available
 */
export async function checkRAGHealth(): Promise<boolean> {
    try {
        const response = await fetch(`${RAG_API_URL}/health`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
        });

        return response.ok;
    } catch (error) {
        console.error('RAG Health Check Failed:', error);
        return false;
    }
}

/**
 * Get vector store statistics
 */
export async function getVectorStoreStats(): Promise<Record<string, unknown> | null> {
    try {
        const response = await fetch(`${RAG_API_URL}/vector-store/stats`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
        });

        if (!response.ok) {
            return null;
        }

        return await response.json();
    } catch (error) {
        console.error('Failed to get vector store stats:', error);
        return null;
    }
}

/**
 * Evaluate a RAG response
 */
export async function evaluateResponse(
    query: string,
    answer: string,
    contexts: string[],
    groundTruth?: string
): Promise<{
    faithfulness_score: number | null;
    answer_relevancy_score: number | null;
    has_hallucination: boolean;
    policy_compliant: boolean;
    overall_score: number;
} | null> {
    try {
        const response = await fetch(`${RAG_API_URL}/evaluate`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                query,
                answer,
                contexts,
                ground_truth: groundTruth
            })
        });

        if (!response.ok) {
            return null;
        }

        return await response.json();
    } catch (error) {
        console.error('Evaluation failed:', error);
        return null;
    }
}
