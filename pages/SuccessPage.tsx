import React from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { CheckCircle, Download, Calendar, BookOpen } from 'lucide-react';

const SuccessPage: React.FC = () => {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();

    const reference = searchParams.get('reference');
    const courseName = searchParams.get('course') || 'your course';

    return (
        <div className="min-h-screen pt-20 pb-12 px-4 bg-brand-dark flex items-center justify-center">
            <div className="max-w-2xl w-full">
                {/* Success Icon */}
                <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center w-24 h-24 bg-green-500/10 rounded-full mb-6 relative">
                        <div className="absolute inset-0 bg-green-500/20 rounded-full animate-ping"></div>
                        <CheckCircle className="w-12 h-12 text-green-400 relative z-10" />
                    </div>
                    <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                        Payment Successful!
                    </h1>
                    <p className="text-xl text-gray-400">
                        Welcome to {courseName} 🎉
                    </p>
                </div>

                {/* Main Content */}
                <div className="bg-brand-surface border border-white/10 rounded-2xl p-8 mb-6">
                    {reference && (
                        <div className="mb-6 p-4 bg-brand-dark border border-brand-cyan/20 rounded-lg">
                            <p className="text-sm text-gray-400 mb-1">Payment Reference</p>
                            <p className="text-brand-cyan font-mono text-sm break-all">{reference}</p>
                        </div>
                    )}

                    <h2 className="text-2xl font-bold text-white mb-6">What's Next?</h2>

                    <div className="space-y-6">
                        <div className="flex gap-4">
                            <div className="flex-shrink-0 w-10 h-10 bg-brand-cyan/10 rounded-full flex items-center justify-center text-brand-cyan font-bold">
                                1
                            </div>
                            <div>
                                <h3 className="text-white font-semibold mb-1 flex items-center gap-2">
                                    <Download className="w-4 h-4" />
                                    Check Your Email
                                </h3>
                                <p className="text-gray-400 text-sm">
                                    We've sent your course access details and receipt to your email. Check your spam folder if you don't see it.
                                </p>
                            </div>
                        </div>

                        <div className="flex gap-4">
                            <div className="flex-shrink-0 w-10 h-10 bg-brand-cyan/10 rounded-full flex items-center justify-center text-brand-cyan font-bold">
                                2
                            </div>
                            <div>
                                <h3 className="text-white font-semibold mb-1 flex items-center gap-2">
                                    <BookOpen className="w-4 h-4" />
                                    Access Your Course
                                </h3>
                                <p className="text-gray-400 text-sm">
                                    Your course materials are now available. Start learning at your own pace!
                                </p>
                            </div>
                        </div>

                        <div className="flex gap-4">
                            <div className="flex-shrink-0 w-10 h-10 bg-brand-cyan/10 rounded-full flex items-center justify-center text-brand-cyan font-bold">
                                3
                            </div>
                            <div>
                                <h3 className="text-white font-semibold mb-1 flex items-center gap-2">
                                    <Calendar className="w-4 h-4" />
                                    Book Your First Session
                                </h3>
                                <p className="text-gray-400 text-sm">
                                    Schedule a 1-on-1 session with our expert instructors to kickstart your learning journey.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* CTA Button */}
                <div className="text-center">
                    <button
                        onClick={() => navigate('/')}
                        className="px-8 py-4 bg-brand-cyan text-brand-dark font-bold rounded-lg hover:bg-brand-cyan/90 transition-all"
                    >
                        Go to Homepage
                    </button>
                </div>
            </div>
        </div>
    );
};

export default SuccessPage;
