import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send, Bot, User, Phone, Mail, Settings2 } from 'lucide-react';
import { queryRAG } from '../services/ragService';
import { createLead } from '../lib/supabase';

interface ChatMessage {
  id: string | number;
  role: 'user' | 'model';
  text: string;
}

interface SessionState {
  questionCount: number;
  isLeadCapture: boolean;
}

const TURN_LIMIT = 10;

const ChatWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    { id: 'welcome', role: 'model', text: 'Hello! Welcome to Ubuntu AnalytIQ. How can I help you today?' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [session, setSession] = useState<SessionState>({
    questionCount: 0,
    isLeadCapture: false
  });
  const [isDevMode, setIsDevMode] = useState(false);
  const [leadForm, setLeadForm] = useState({ email: '', phone: '' });
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen, isLoading]);

  // Format content with bullets, headers, etc.
  const formatContent = (content: string) => {
    if (!content) return null;
    return content.split('\n').map((line, i) => {
      const trimmed = line.trim();
      if (!trimmed) return <div key={i} className="h-2" />;

      // Bullet points
      if (trimmed.startsWith('•') || trimmed.startsWith('-') || trimmed.startsWith('*')) {
        return (
          <div key={i} className="flex gap-2 mb-2 pl-1 items-start">
            <span className="text-brand-cyan font-bold">•</span>
            <span className="leading-tight">{trimmed.replace(/^[•\-*]\s*/, '')}</span>
          </div>
        );
      }

      // Headers (ALL CAPS lines)
      if (trimmed === trimmed.toUpperCase() && trimmed.length > 4 && !trimmed.includes(':')) {
        return (
          <div key={i} className="text-[10px] font-bold text-brand-cyan uppercase tracking-widest mt-4 mb-2 border-b border-brand-cyan/20 pb-1">
            {trimmed}
          </div>
        );
      }

      // Numbered lists
      if (/^\d+\./.test(trimmed)) {
        return (
          <div key={i} className="flex gap-2 mb-2 pl-1 items-start">
            <span className="text-brand-cyan font-bold min-w-[20px]">{trimmed.match(/^\d+\./)?.[0]}</span>
            <span className="leading-tight">{trimmed.replace(/^\d+\.\s*/, '')}</span>
          </div>
        );
      }

      return <div key={i} className="mb-2 leading-relaxed">{trimmed}</div>;
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading || session.isLeadCapture) return;

    const userMessage = input.trim();
    const userMsg: ChatMessage = { id: Date.now(), role: 'user', text: userMessage };

    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    // Increment question count
    const newCount = session.questionCount + 1;
    const hitLimit = newCount >= TURN_LIMIT;

    setSession(prev => ({
      ...prev,
      questionCount: newCount,
      isLeadCapture: hitLimit
    }));

    if (hitLimit) {
      setIsLoading(false);
      setMessages(prev => [...prev, {
        id: Date.now() + 1,
        role: 'model',
        text: "You've reached the question limit. To continue getting personalized assistance, please book a consultation with our team."
      }]);
      return;
    }

    try {
      // Convert messages to the format expected by RAG service
      const chatHistory = messages
        .filter(m => m.id !== 'welcome')
        .map(m => ({
          role: m.role === 'model' ? 'assistant' as const : 'user' as const,
          content: m.text
        }));

      // Query the RAG system
      const response = await queryRAG(userMessage, chatHistory);

      setMessages(prev => [...prev, { id: Date.now() + 1, role: 'model', text: response.answer }]);

    } catch (error) {
      console.error('RAG Query Error:', error);
      setMessages(prev => [...prev, {
        id: Date.now() + 1,
        role: 'model',
        text: "I'm having trouble connecting to the knowledge base right now. Please try again later."
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleBookConsultation = () => {
    setSession(prev => ({ ...prev, isLeadCapture: true }));
  };

  const handleLeadSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!leadForm.email || !leadForm.phone) return;

    try {
      await createLead({
        email: leadForm.email,
        source: 'chat',
        metadata: {
          phone: leadForm.phone,
          question_count: session.questionCount,
          chat_history: messages.map(m => ({ role: m.role, content: m.text }))
        }
      });

      setSession(prev => ({ ...prev, isLeadCapture: false, questionCount: 0 }));
      setLeadForm({ email: '', phone: '' });
      setMessages(prev => [...prev, {
        id: Date.now(),
        role: 'model',
        text: "Thank you! A senior consultant will contact you within 24 hours to discuss the next steps."
      }]);
    } catch (error) {
      console.error('Lead submission failed:', error);
      setMessages(prev => [...prev, {
        id: Date.now(),
        role: 'model',
        text: "There was an issue submitting your details. Please try again or contact us directly."
      }]);
    }
  };

  // Closed state - floating button
  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 w-16 h-16 bg-brand-cyan text-brand-dark rounded-2xl shadow-[0_0_30px_rgba(0,180,216,0.4)] flex items-center justify-center hover:bg-cyan-300 transition-all transform hover:scale-110 active:scale-95 z-50 border-2 border-white/20"
        aria-label="Open chat"
      >
        <MessageSquare className="w-7 h-7" />
      </button>
    );
  }

  return (
    <div className="fixed inset-0 w-full h-full sm:inset-auto sm:bottom-6 sm:right-6 sm:w-[400px] sm:h-[650px] sm:max-h-[90vh] sm:rounded-[2rem] bg-brand-surface border border-white/10 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.5)] flex flex-col z-50 overflow-hidden">
      {/* Header */}
      <div className="bg-brand-dark p-5 flex flex-col text-white shrink-0 border-b border-white/10">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsDevMode(!isDevMode)}
              className={`w-11 h-11 rounded-xl flex items-center justify-center font-bold text-lg shadow-lg transition-all ${isDevMode
                  ? 'bg-brand-cyan text-brand-dark'
                  : 'bg-brand-red/80 text-white'
                }`}
              title="Toggle Dev Mode"
            >
              {isDevMode ? <Settings2 className="w-5 h-5" /> : <Bot className="w-5 h-5" />}
            </button>
            <div>
              <h3 className="font-bold text-base leading-none">
                {isDevMode ? 'RAG System Debug' : 'Ubuntu Academy'}
              </h3>
              <span className="text-[10px] text-gray-400 uppercase tracking-widest font-medium">
                {isDevMode ? 'LangGraph State Viewer' : 'I am because we are'}
              </span>
            </div>
          </div>
          <button
            onClick={() => setIsOpen(false)}
            className="p-2 hover:bg-white/10 rounded-xl transition-colors text-gray-400 hover:text-white"
            aria-label="Close chat"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Book Consultation Button */}
        {!session.isLeadCapture && !isDevMode && (
          <button
            onClick={handleBookConsultation}
            className="w-full bg-transparent border border-brand-cyan/40 text-brand-cyan hover:bg-brand-cyan hover:text-brand-dark text-[11px] font-bold py-3 px-4 rounded-xl transition-all flex items-center justify-center gap-2 uppercase tracking-widest"
          >
            <User className="w-4 h-4" />
            Book Consultancy
          </button>
        )}
      </div>

      {/* Messages Area / Dev Panel */}
      <div className="flex-1 overflow-y-auto p-5 space-y-4 bg-brand-surface">
        {isDevMode ? (
          // Dev Mode Panel
          <div className="space-y-4">
            <div className="p-4 bg-brand-dark rounded-2xl border border-white/10">
              <h5 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-3">LangGraph State</h5>
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-brand-surface p-3 rounded-xl border border-white/10">
                  <div className="text-2xl font-bold text-brand-cyan">{session.questionCount}</div>
                  <div className="text-[9px] font-medium text-gray-500 uppercase">Question Counter</div>
                </div>
                <div className="bg-brand-surface p-3 rounded-xl border border-white/10">
                  <div className="text-2xl font-bold text-green-400">{Math.max(0, TURN_LIMIT - session.questionCount)}</div>
                  <div className="text-[9px] font-medium text-gray-500 uppercase">RAG Credits Left</div>
                </div>
              </div>
            </div>
            <div className="p-4 bg-gray-900 text-amber-400 rounded-2xl font-mono text-[10px] overflow-x-auto border border-amber-900/30">
              <h5 className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-2">Internal RAG Trace</h5>
              <pre className="whitespace-pre-wrap">{JSON.stringify({
                graph_node: session.questionCount >= TURN_LIMIT ? "lead_capture_node" : "assistant_node",
                vector_db: "ChromaDB (Persistent)",
                embedding_model: "models/embedding-001",
                api_endpoint: "ubuntu-rag-agent.onrender.com",
                session_messages: messages.length
              }, null, 2)}</pre>
            </div>
            <div className="p-4 bg-brand-cyan/10 text-brand-cyan rounded-2xl text-[11px] font-medium border border-brand-cyan/20">
              DEV NOTE: RAG system running on Render. Response time may vary during cold starts.
            </div>
          </div>
        ) : (
          // Chat Messages
          <>
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`max-w-[85%] p-4 rounded-2xl text-sm ${msg.role === 'user'
                    ? 'bg-brand-cyan text-brand-dark rounded-tr-none'
                    : 'bg-brand-dark text-gray-200 border border-white/10 rounded-tl-none'
                  }`}>
                  {msg.role === 'user' ? msg.text : formatContent(msg.text)}
                </div>
              </div>
            ))}

            {/* Loading indicator */}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-brand-dark p-4 rounded-2xl rounded-tl-none flex gap-1.5 border border-white/10">
                  <span className="w-2 h-2 bg-brand-cyan rounded-full animate-bounce" />
                  <span className="w-2 h-2 bg-brand-cyan rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                  <span className="w-2 h-2 bg-brand-cyan rounded-full animate-bounce" style={{ animationDelay: '0.4s' }} />
                </div>
              </div>
            )}

            {/* Lead Capture Form */}
            {session.isLeadCapture && (
              <div className="bg-brand-dark p-6 rounded-2xl border-2 border-brand-cyan/30 space-y-4 animate-in">
                <div className="text-center">
                  <h4 className="font-bold text-white text-sm uppercase tracking-wide">Book a 30-Minute Session</h4>
                  <p className="text-[11px] text-gray-400 mt-1">With our Senior Trainers</p>
                </div>
                <form onSubmit={handleLeadSubmit} className="space-y-3">
                  <div className="space-y-1">
                    <label className="text-[9px] font-bold text-gray-500 uppercase ml-2 tracking-widest flex items-center gap-1">
                      <Mail className="w-3 h-3" /> Business Email
                    </label>
                    <input
                      required
                      type="email"
                      placeholder="name@company.com"
                      className="w-full text-sm p-3 rounded-xl border border-white/10 bg-brand-surface text-white focus:outline-none focus:ring-2 focus:ring-brand-cyan/50 transition-all"
                      value={leadForm.email}
                      onChange={(e) => setLeadForm(prev => ({ ...prev, email: e.target.value }))}
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[9px] font-bold text-gray-500 uppercase ml-2 tracking-widest flex items-center gap-1">
                      <Phone className="w-3 h-3" /> Phone Number
                    </label>
                    <input
                      required
                      type="tel"
                      placeholder="+254 XXX XXX XXX"
                      className="w-full text-sm p-3 rounded-xl border border-white/10 bg-brand-surface text-white focus:outline-none focus:ring-2 focus:ring-brand-cyan/50 transition-all"
                      value={leadForm.phone}
                      onChange={(e) => setLeadForm(prev => ({ ...prev, phone: e.target.value }))}
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full bg-brand-cyan text-brand-dark text-xs font-bold py-4 rounded-xl hover:bg-cyan-300 transition-all shadow-lg active:scale-95 uppercase tracking-widest"
                  >
                    Request Call Back
                  </button>
                </form>
              </div>
            )}
          </>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="p-4 border-t border-white/10 bg-brand-dark">
        {!session.isLeadCapture ? (
          <form onSubmit={handleSubmit} className="flex items-center gap-3">
            <input
              type="text"
              placeholder={isDevMode ? "Debug probe..." : "Ask about our courses..."}
              className="flex-1 bg-brand-surface border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:ring-2 focus:ring-brand-cyan/30 focus:outline-none placeholder:text-gray-500"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              disabled={isLoading}
            />
            <button
              type="submit"
              disabled={!input.trim() || isLoading}
              className={`w-12 h-12 flex items-center justify-center rounded-xl transition-all ${input.trim() && !isLoading
                  ? 'bg-brand-cyan text-brand-dark shadow-lg shadow-brand-cyan/30 hover:scale-105 active:scale-95'
                  : 'bg-brand-surface text-gray-600'
                }`}
            >
              <Send className="w-5 h-5" />
            </button>
          </form>
        ) : (
          <div className="flex items-center justify-center gap-2 py-3 bg-brand-cyan/10 rounded-xl border border-brand-cyan/20">
            <span className="w-2 h-2 bg-brand-cyan rounded-full animate-pulse" />
            <p className="text-[11px] text-brand-cyan uppercase font-bold tracking-widest">
              Limit reached. Please fill the form above.
            </p>
          </div>
        )}

        {/* Footer status */}
        <div className="flex justify-between items-center mt-3 px-1">
          <span className="text-[9px] text-gray-500 font-medium uppercase tracking-widest">
            RAG Agent v3.0
          </span>
          <div className={`flex items-center gap-2 text-[10px] font-bold uppercase tracking-wide ${session.questionCount >= TURN_LIMIT - 1 ? 'text-red-400' : 'text-gray-500'
            }`}>
            {session.questionCount}/{TURN_LIMIT} TURNS
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatWidget;