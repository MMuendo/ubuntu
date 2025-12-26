import React from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { CheckCircle, Calendar, ArrowRight } from 'lucide-react';

const ConsultationSuccessPage: React.FC = () => {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();

    const courseName = searchParams.get('courseName') || '';
    const name = searchParams.get('name') || 'there';

    return (
        <div className="min-h-screen flex items-center justify-center px-4 bg-brand-dark">
            <div className="max-w-2xl w-full">
                {/* Success Icon */}
                <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center w-24 h-24 bg-green-500/10 rounded-full mb-6 relative">
                        <div className="absolute inset-0 bg-green-500/20 rounded-full animate-ping"></div>
                        <CheckCircle className="w-12 h-12 text-green-400 relative z-10" />
                    </div>
                    <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                        Consultation Request Received!
                    </h1>
                    <p className="text-xl text-gray-400">
                        Thank you, {name}! We'll be in touch soon.
                    </p>
                </div>

                {/* Main Content */}
                <div className="bg-brand-surface border border-white/10 rounded-2xl p-8 mb-6">
                    <h2 className="text-2xl font-bold text-white mb-6">What Happens Next?</h2>

                    <div className="space-y-6">
                        <div className="flex gap-4">
                            <div className="flex-shrink-0 w-10 h-10 bg-brand-cyan/10 rounded-full flex items-center justify-center text-brand-cyan font-bold">
                                1
                            </div>
                            <div>
                                <h3 className="text-white font-semibold mb-1">Check Your Email</h3>
                                <p className="text-gray-400 text-sm">
                                    We've sent a confirmation email with all the details. Please check your spam folder if you don't see it.
                                </p>
                            </div>
                        </div>

                        <div className="flex gap-4">
                            <div className="flex-shrink-0 w-10 h-10 bg-brand-cyan/10 rounded-full flex items-center justify-center text-brand-cyan font-bold">
                                2
                            </div>
                            <div>
                                <h3 className="text-white font-semibold mb-1">We'll Contact You</h3>
                                <p className="text-gray-400 text-sm">
                                    Our team will reach out within 24 hours to schedule your consultation at a time that works for you.
                                </p>
                            </div>
                        </div>

                        <div className="flex gap-4">
                            <div className="flex-shrink-0 w-10 h-10 bg-brand-cyan/10 rounded-full flex items-center justify-center text-brand-cyan font-bold">
                                3
                            </div>
                            <div>
                                <h3 className="text-white font-semibold mb-1">Expert Consultation</h3>
                                <p className="text-gray-400 text-sm">
                                    Join your 30-minute session to discuss your goals, ask questions, and get personalized recommendations.
                                </p>
                            </div>
                        </div>
                    </div>

                    {courseName && (
                        <div className="mt-8 p-4 bg-brand-dark border border-brand-cyan/20 rounded-lg">
                            <p className="text-sm text-gray-400">
                                <strong className="text-brand-cyan">Interested in:</strong> {courseName}
                            </p>
                        </div>
                    )}
                </div>

                {/* CTA Section */}
                <div className="bg-gradient-to-br from-brand-surface to-brand-dark border border-white/10 rounded-2xl p-8 text-center mb-6">
                    <h3 className="text-2xl font-bold text-white mb-3">
                        Want to enroll now instead?
                    </h3>
                    <p className="text-gray-400 mb-6">
                        You can still proceed with instant enrollment if you're ready to start learning.
                    </p>
                    <button
                        onClick={() => navigate('/')}
                        className="inline-flex items-center gap-2 px-8 py-4 bg-brand-cyan text-brand-dark font-bold rounded-lg hover:bg-brand-cyan/90 transition-all"
                    >
                        Explore Courses
                        <ArrowRight className="w-5 h-5" />
                    </button>
                </div>

                {/* Footer Actions */}
                <div className="text-center space-y-4">
                    <button
                        onClick={() => navigate('/')}
                        className="text-gray-400 hover:text-white transition-colors"
                    >
                        ← Back to Home
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ConsultationSuccessPage;
