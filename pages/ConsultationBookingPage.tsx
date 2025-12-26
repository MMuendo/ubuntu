import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Calendar, Clock, User, Mail, Phone, MessageSquare, CheckCircle, ExternalLink, ArrowRight, Sparkles, Loader2 } from 'lucide-react';
import { createConsultation } from '../lib/supabase';

// Calendly URL
const CALENDLY_URL = 'https://calendly.com/muendo-muinde/consult';

const ConsultationBookingPage: React.FC = () => {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const calendlyRef = useRef<HTMLDivElement>(null);

    // Get course context from URL
    const courseId = searchParams.get('courseId');
    const courseName = searchParams.get('courseName') || '';

    // Form state
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        notes: '',
    });
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [bookingMode, setBookingMode] = useState<'form' | 'calendly'>('calendly');
    const [formSubmitted, setFormSubmitted] = useState(false);
    const [calendlyReady, setCalendlyReady] = useState(false);

    // Build Calendly embed URL
    const getCalendlyEmbedUrl = () => {
        const params = new URLSearchParams();
        if (formData.name) params.set('name', formData.name);
        if (formData.email) params.set('email', formData.email);
        params.set('hide_gdpr_banner', '1');
        params.set('background_color', '0a0a0f');
        params.set('text_color', 'ffffff');
        params.set('primary_color', '22d3ee');
        return `${CALENDLY_URL}?${params.toString()}`;
    };

    // Load Calendly widget script
    useEffect(() => {
        const script = document.createElement('script');
        script.src = 'https://assets.calendly.com/assets/external/widget.js';
        script.async = true;
        script.onload = () => {
            setCalendlyReady(true);
        };
        document.body.appendChild(script);

        // Add Calendly CSS
        const link = document.createElement('link');
        link.href = 'https://assets.calendly.com/assets/external/widget.css';
        link.rel = 'stylesheet';
        document.head.appendChild(link);

        return () => {
            const existingScript = document.querySelector('script[src="https://assets.calendly.com/assets/external/widget.js"]');
            if (existingScript) existingScript.remove();
            const existingLink = document.querySelector('link[href="https://assets.calendly.com/assets/external/widget.css"]');
            if (existingLink) existingLink.remove();
        };
    }, []);

    // Initialize Calendly inline widget
    useEffect(() => {
        if (calendlyReady && calendlyRef.current && (window as any).Calendly) {
            // Clear previous content
            calendlyRef.current.innerHTML = '';

            (window as any).Calendly.initInlineWidget({
                url: getCalendlyEmbedUrl(),
                parentElement: calendlyRef.current,
                prefill: {
                    name: formData.name || '',
                    email: formData.email || '',
                },
            });
        }
    }, [calendlyReady, formSubmitted]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);

        try {
            await createConsultation({
                name: formData.name,
                email: formData.email,
                phone: formData.phone,
                course_id: courseId || undefined,
                course_name: courseName || undefined,
                consultation_type: 'course_specific',
                notes: formData.notes,
                calendly_event_url: CALENDLY_URL,
            });

            console.log('Consultation saved to database');
            setFormSubmitted(true);

            // Re-initialize Calendly with prefilled data
            if (calendlyRef.current && (window as any).Calendly) {
                calendlyRef.current.innerHTML = '';
                (window as any).Calendly.initInlineWidget({
                    url: getCalendlyEmbedUrl(),
                    parentElement: calendlyRef.current,
                    prefill: {
                        name: formData.name,
                        email: formData.email,
                    },
                });
            }

            setBookingMode('calendly');
        } catch (err: any) {
            console.error('Error creating consultation:', err);
            setError(err.message || 'Failed to save. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }));
    };

    return (
        <div className="min-h-screen pt-16 pb-8 px-4 bg-brand-dark">
            <div className="max-w-7xl mx-auto">
                {/* Compact Header */}
                <div className="text-center mb-6">
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-brand-purple/10 rounded-full text-brand-purple text-sm font-medium mb-3">
                        <Sparkles className="w-4 h-4" />
                        Free 30-Minute Consultation
                    </div>
                    <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">
                        {courseName ? (
                            <>Book Your <span className="text-brand-cyan">{courseName}</span> Consultation</>
                        ) : (
                            <>Schedule Your <span className="text-brand-cyan">Free Consultation</span></>
                        )}
                    </h1>
                    {formSubmitted && (
                        <div className="inline-flex items-center gap-2 mt-2 px-4 py-2 bg-green-500/10 rounded-full text-green-400 text-sm">
                            <CheckCircle className="w-4 h-4" />
                            Details saved! Now pick a time below.
                        </div>
                    )}
                </div>

                {/* Mode Toggle */}
                <div className="flex justify-center mb-4">
                    <div className="inline-flex bg-brand-surface border border-white/10 rounded-lg p-1">
                        <button
                            onClick={() => setBookingMode('calendly')}
                            className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${bookingMode === 'calendly'
                                    ? 'bg-brand-cyan text-brand-dark'
                                    : 'text-gray-400 hover:text-white'
                                }`}
                        >
                            <span className="flex items-center gap-2">
                                <Calendar className="w-4 h-4" />
                                Quick Book
                            </span>
                        </button>
                        <button
                            onClick={() => setBookingMode('form')}
                            className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${bookingMode === 'form'
                                    ? 'bg-brand-cyan text-brand-dark'
                                    : 'text-gray-400 hover:text-white'
                                }`}
                        >
                            <span className="flex items-center gap-2">
                                <MessageSquare className="w-4 h-4" />
                                Add Details First
                            </span>
                        </button>
                    </div>
                </div>

                {/* Main Content - Side by Side */}
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
                    {/* Left Column - Form or Info (1/4 width) */}
                    <div className="lg:col-span-1">
                        {bookingMode === 'form' ? (
                            <div className="bg-brand-surface border border-white/10 rounded-xl p-4">
                                <h2 className="text-base font-bold text-white mb-3 flex items-center gap-2">
                                    <User className="w-4 h-4 text-brand-cyan" />
                                    Your Details
                                </h2>

                                {error && (
                                    <div className="mb-3 bg-red-500/10 border border-red-500/50 rounded-lg p-2 text-red-200 text-xs">
                                        {error}
                                    </div>
                                )}

                                <form onSubmit={handleSubmit} className="space-y-3">
                                    <div>
                                        <label className="block text-xs font-medium text-gray-400 mb-1">Name *</label>
                                        <input
                                            type="text"
                                            name="name"
                                            required
                                            value={formData.name}
                                            onChange={handleChange}
                                            className="w-full px-3 py-2 bg-brand-dark border border-white/20 rounded-lg text-white text-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-brand-purple"
                                            placeholder="Your name"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-xs font-medium text-gray-400 mb-1">Email *</label>
                                        <input
                                            type="email"
                                            name="email"
                                            required
                                            value={formData.email}
                                            onChange={handleChange}
                                            className="w-full px-3 py-2 bg-brand-dark border border-white/20 rounded-lg text-white text-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-brand-purple"
                                            placeholder="you@example.com"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-xs font-medium text-gray-400 mb-1">Phone</label>
                                        <input
                                            type="tel"
                                            name="phone"
                                            value={formData.phone}
                                            onChange={handleChange}
                                            className="w-full px-3 py-2 bg-brand-dark border border-white/20 rounded-lg text-white text-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-brand-purple"
                                            placeholder="+254 700 123 456"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-xs font-medium text-gray-400 mb-1">Questions</label>
                                        <textarea
                                            name="notes"
                                            rows={2}
                                            value={formData.notes}
                                            onChange={handleChange}
                                            className="w-full px-3 py-2 bg-brand-dark border border-white/20 rounded-lg text-white text-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-brand-purple resize-none"
                                            placeholder="Optional..."
                                        />
                                    </div>

                                    <button
                                        type="submit"
                                        disabled={isLoading}
                                        className="w-full py-2.5 bg-brand-purple text-white font-semibold rounded-lg hover:bg-brand-purple/90 transition-all disabled:opacity-50 flex items-center justify-center gap-2 text-sm"
                                    >
                                        {isLoading ? (
                                            <>
                                                <Loader2 className="w-4 h-4 animate-spin" />
                                                Saving...
                                            </>
                                        ) : (
                                            <>
                                                Save & Continue
                                                <ArrowRight className="w-4 h-4" />
                                            </>
                                        )}
                                    </button>
                                </form>
                            </div>
                        ) : (
                            /* Info Panel for Quick Book mode */
                            <div className="bg-brand-surface border border-white/10 rounded-xl p-4">
                                <h3 className="text-base font-bold text-white mb-3">What to Expect</h3>

                                <div className="space-y-3">
                                    <div className="flex items-start gap-2">
                                        <div className="w-6 h-6 bg-green-500/10 rounded-full flex items-center justify-center flex-shrink-0">
                                            <Clock className="w-3 h-3 text-green-400" />
                                        </div>
                                        <div>
                                            <h4 className="text-white font-medium text-xs">30 Minutes</h4>
                                            <p className="text-gray-400 text-xs">Focused discussion</p>
                                        </div>
                                    </div>

                                    <div className="flex items-start gap-2">
                                        <div className="w-6 h-6 bg-blue-500/10 rounded-full flex items-center justify-center flex-shrink-0">
                                            <User className="w-3 h-3 text-blue-400" />
                                        </div>
                                        <div>
                                            <h4 className="text-white font-medium text-xs">Expert Guidance</h4>
                                            <p className="text-gray-400 text-xs">Personalized advice</p>
                                        </div>
                                    </div>

                                    <div className="flex items-start gap-2">
                                        <div className="w-6 h-6 bg-purple-500/10 rounded-full flex items-center justify-center flex-shrink-0">
                                            <CheckCircle className="w-3 h-3 text-purple-400" />
                                        </div>
                                        <div>
                                            <h4 className="text-white font-medium text-xs">No Commitment</h4>
                                            <p className="text-gray-400 text-xs">Zero obligation</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="mt-4 pt-4 border-t border-white/10">
                                    <h4 className="text-white font-medium text-xs mb-2">We'll Discuss</h4>
                                    <ul className="space-y-1 text-xs text-gray-400">
                                        <li className="flex items-center gap-1">
                                            <span className="w-1 h-1 bg-brand-cyan rounded-full"></span>
                                            Course curriculum
                                        </li>
                                        <li className="flex items-center gap-1">
                                            <span className="w-1 h-1 bg-brand-cyan rounded-full"></span>
                                            Career opportunities
                                        </li>
                                        <li className="flex items-center gap-1">
                                            <span className="w-1 h-1 bg-brand-cyan rounded-full"></span>
                                            Your learning path
                                        </li>
                                        <li className="flex items-center gap-1">
                                            <span className="w-1 h-1 bg-brand-cyan rounded-full"></span>
                                            Pricing & enrollment
                                        </li>
                                    </ul>
                                </div>

                                <button
                                    onClick={() => setBookingMode('form')}
                                    className="mt-4 w-full py-2 text-xs text-gray-400 hover:text-white transition-colors flex items-center justify-center gap-1 border border-white/10 rounded-lg"
                                >
                                    <MessageSquare className="w-3 h-3" />
                                    Add your details first
                                </button>
                            </div>
                        )}
                    </div>

                    {/* Right Column - Calendly Embed (3/4 width) */}
                    <div className="lg:col-span-3">
                        <div className="bg-brand-surface border border-white/10 rounded-xl p-3 h-full min-h-[600px]">
                            <div className="flex items-center justify-between mb-2">
                                <h2 className="text-base font-bold text-white flex items-center gap-2">
                                    <Calendar className="w-4 h-4 text-brand-cyan" />
                                    Pick a Time
                                </h2>
                                <a
                                    href={getCalendlyEmbedUrl()}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-xs text-gray-400 hover:text-brand-cyan transition-colors flex items-center gap-1"
                                >
                                    Open in new tab
                                    <ExternalLink className="w-3 h-3" />
                                </a>
                            </div>

                            {/* Calendly Widget Container */}
                            {!calendlyReady ? (
                                <div className="flex items-center justify-center h-[550px]">
                                    <div className="text-center">
                                        <Loader2 className="w-8 h-8 text-brand-cyan animate-spin mx-auto mb-3" />
                                        <p className="text-gray-400 text-sm">Loading calendar...</p>
                                    </div>
                                </div>
                            ) : (
                                <div
                                    ref={calendlyRef}
                                    className="calendly-inline-widget rounded-lg overflow-hidden"
                                    style={{ minWidth: '100%', height: '550px' }}
                                />
                            )}
                        </div>
                    </div>
                </div>

                {/* Back Button */}
                <div className="text-center mt-4">
                    <button
                        onClick={() => navigate(-1)}
                        className="text-gray-400 hover:text-white transition-colors text-sm"
                    >
                        ← Back
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ConsultationBookingPage;
