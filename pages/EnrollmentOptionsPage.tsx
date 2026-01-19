import React from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Product, Course } from '../types';
import { CreditCard, Calendar, ArrowRight, CheckCircle } from 'lucide-react';

const EnrollmentOptionsPage: React.FC = () => {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();

    // Get course data from URL params
    const courseId = searchParams.get('courseId');
    const courseName = searchParams.get('courseName') || 'Selected Course';
    const coursePrice = parseInt(searchParams.get('coursePrice') || '0');
    const courseDescription = searchParams.get('courseDescription') || '';

    const handlePayNow = () => {
        // Redirect to checkout with course data
        navigate(`/checkout?courseId=${courseId}&courseName=${courseName}&coursePrice=${coursePrice}`);
    };

    const handleBookConsultation = () => {
        // Redirect to consultation booking with course context
        navigate(`/consultation?courseId=${courseId}&courseName=${courseName}`);
    };

    return (
        <div className="min-h-screen pt-20 pb-12 px-4 bg-brand-dark">
            <div className="max-w-6xl mx-auto">
                {/* Header */}
                <div className="text-center mb-12">
                    <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                        Choose Your Path
                    </h1>
                    <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                        Ready to enroll in <span className="text-brand-cyan font-semibold">{courseName}</span>?
                        Choose how you'd like to proceed.
                    </p>
                </div>

                {/* Options Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
                    {/* Option 1: Pay Now */}
                    <div className="bg-brand-surface border-2 border-brand-cyan/30 rounded-2xl p-8 hover:border-brand-cyan transition-all group relative overflow-hidden">
                        {/* Glow effect */}
                        <div className="absolute top-0 right-0 w-64 h-64 bg-brand-cyan/10 rounded-full blur-3xl -z-10 group-hover:bg-brand-cyan/20 transition-all"></div>

                        <div className="flex items-center justify-center w-16 h-16 bg-brand-cyan/10 rounded-full mb-6 group-hover:bg-brand-cyan/20 transition-colors">
                            <CreditCard className="w-8 h-8 text-brand-cyan" />
                        </div>

                        <h2 className="text-3xl font-bold text-white mb-4">Pay Now</h2>
                        <p className="text-gray-400 mb-6 text-lg">
                            Get instant access to course materials and start learning immediately.
                        </p>

                        <div className="mb-8">
                            <div className="text-4xl font-bold text-white mb-2">
                                KES {coursePrice.toLocaleString()}
                            </div>
                            <p className="text-sm text-gray-500">One-time payment</p>
                        </div>

                        <div className="space-y-3 mb-8">
                            <div className="flex items-start gap-3">
                                <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                                <span className="text-gray-300">Immediate course access</span>
                            </div>
                            <div className="flex items-start gap-3">
                                <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                                <span className="text-gray-300">All course materials included</span>
                            </div>
                            <div className="flex items-start gap-3">
                                <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                                <span className="text-gray-300">Lifetime access</span>
                            </div>
                            <div className="flex items-start gap-3">
                                <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                                <span className="text-gray-300">Certificate upon completion</span>
                            </div>
                        </div>

                        <button
                            onClick={handlePayNow}
                            className="w-full py-4 bg-brand-cyan text-brand-dark font-bold rounded-lg hover:bg-brand-cyan/90 transition-all flex items-center justify-center gap-2 group-hover:shadow-[0_0_30px_rgba(0,180,216,0.4)]"
                        >
                            Proceed to Payment
                            <ArrowRight className="w-5 h-5" />
                        </button>
                    </div>

                    {/* Option 2: Book Consultation */}
                    <div className="bg-brand-surface border-2 border-white/10 rounded-2xl p-8 hover:border-brand-purple/50 transition-all group relative overflow-hidden">
                        {/* Glow effect */}
                        <div className="absolute top-0 right-0 w-64 h-64 bg-brand-purple/10 rounded-full blur-3xl -z-10 group-hover:bg-brand-purple/20 transition-all"></div>

                        <div className="flex items-center justify-center w-16 h-16 bg-brand-purple/10 rounded-full mb-6 group-hover:bg-brand-purple/20 transition-colors">
                            <Calendar className="w-8 h-8 text-brand-purple" />
                        </div>

                        <h2 className="text-3xl font-bold text-white mb-4">Book Consultation</h2>
                        <p className="text-gray-400 mb-6 text-lg">
                            Schedule a free consultation to discuss the course and get personalized guidance.
                        </p>

                        <div className="mb-8">
                            <div className="text-4xl font-bold text-brand-purple mb-2">
                                FREE
                            </div>
                            <p className="text-sm text-gray-500">30-minute session</p>
                        </div>

                        <div className="space-y-3 mb-8">
                            <div className="flex items-start gap-3">
                                <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                                <span className="text-gray-300">Expert course guidance</span>
                            </div>
                            <div className="flex items-start gap-3">
                                <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                                <span className="text-gray-300">Personalized recommendations</span>
                            </div>
                            <div className="flex items-start gap-3">
                                <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                                <span className="text-gray-300">Answer all your questions</span>
                            </div>
                            <div className="flex items-start gap-3">
                                <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                                <span className="text-gray-300">No commitment required</span>
                            </div>
                        </div>

                        <button
                            onClick={handleBookConsultation}
                            className="w-full py-4 border-2 border-brand-purple text-brand-purple font-bold rounded-lg hover:bg-brand-purple/10 transition-all flex items-center justify-center gap-2"
                        >
                            Schedule Consultation
                            <ArrowRight className="w-5 h-5" />
                        </button>
                    </div>

                    {/* Option 3: Get a Playbook */}
                    <div className="bg-brand-surface border-2 border-brand-cyan/30 rounded-2xl p-8 hover:border-brand-cyan transition-all group relative overflow-hidden">
                        {/* Glow effect */}
                        <div className="absolute top-0 right-0 w-64 h-64 bg-brand-cyan/10 rounded-full blur-3xl -z-10 group-hover:bg-brand-cyan/20 transition-all"></div>

                        <div className="flex items-center justify-center w-16 h-16 bg-brand-cyan/10 rounded-full mb-6 group-hover:bg-brand-cyan/20 transition-colors">
                            <div className="w-8 h-8 text-brand-cyan">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" /><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" /></svg>
                            </div>
                        </div>

                        <h2 className="text-3xl font-bold text-white mb-4">Get a Playbook</h2>
                        <p className="text-gray-400 mb-6 text-lg">
                            Comes with weekly mentorship and Q&A.
                        </p>

                        <div className="mb-8">
                            <div className="text-4xl font-bold text-white mb-2">
                                KES 2,500
                            </div>
                            <p className="text-sm text-gray-500">One-time payment</p>
                        </div>

                        <div className="space-y-3 mb-8">
                            <div className="flex items-start gap-3">
                                <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                                <span className="text-gray-300">Detailed Action Plan</span>
                            </div>
                            <div className="flex items-start gap-3">
                                <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                                <span className="text-gray-300">Weekly Mentorship</span>
                            </div>
                            <div className="flex items-start gap-3">
                                <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                                <span className="text-gray-300">Live Q&A Sessions</span>
                            </div>
                            <div className="flex items-start gap-3">
                                <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                                <span className="text-gray-300">Community Access</span>
                            </div>
                        </div>

                        <button
                            onClick={() => navigate(`/checkout?courseId=playbook&courseName=Playbook&coursePrice=2500`)}
                            className="w-full py-4 bg-brand-cyan/10 border-2 border-brand-cyan text-brand-cyan font-bold rounded-lg hover:bg-brand-cyan hover:text-brand-dark transition-all flex items-center justify-center gap-2"
                        >
                            Pay Now
                            <ArrowRight className="w-5 h-5" />
                        </button>
                    </div>
                </div>

                {/* FAQ Section */}
                <div className="max-w-3xl mx-auto">
                    <div className="bg-brand-surface border border-white/10 rounded-xl p-8">
                        <h3 className="text-2xl font-bold text-white mb-6">Frequently Asked Questions</h3>

                        <div className="space-y-4">
                            <details className="group">
                                <summary className="cursor-pointer text-gray-300 font-medium py-3 border-b border-white/10 flex justify-between items-center">
                                    Can I enroll after the consultation?
                                    <span className="text-brand-cyan group-open:rotate-180 transition-transform">▼</span>
                                </summary>
                                <p className="text-gray-400 mt-3 pl-4">
                                    Absolutely! The consultation is completely free with no obligation. You can decide
                                    to enroll anytime during or after the consultation.
                                </p>
                            </details>

                            <details className="group">
                                <summary className="cursor-pointer text-gray-300 font-medium py-3 border-b border-white/10 flex justify-between items-center">
                                    How long does a consultation take?
                                    <span className="text-brand-cyan group-open:rotate-180 transition-transform">▼</span>
                                </summary>
                                <p className="text-gray-400 mt-3 pl-4">
                                    Consultations typically last 30 minutes, giving you enough time to discuss your
                                    goals, ask questions, and get personalized recommendations.
                                </p>
                            </details>

                            <details className="group">
                                <summary className="cursor-pointer text-gray-300 font-medium py-3 border-b border-white/10 flex justify-between items-center">
                                    Is the course price the same after consultation?
                                    <span className="text-brand-cyan group-open:rotate-180 transition-transform">▼</span>
                                </summary>
                                <p className="text-gray-400 mt-3 pl-4">
                                    Yes! The price remains the same whether you enroll now or after a consultation.
                                    The consultation is simply an opportunity to make an informed decision.
                                </p>
                            </details>
                        </div>
                    </div>
                </div>

                {/* Back Button */}
                <div className="text-center mt-8">
                    <button
                        onClick={() => navigate('/')}
                        className="text-gray-400 hover:text-white transition-colors"
                    >
                        ← Back to Courses
                    </button>
                </div>
            </div>
        </div>
    );
};

export default EnrollmentOptionsPage;
