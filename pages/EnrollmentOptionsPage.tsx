import React from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Calendar, BookOpen, GraduationCap, ArrowRight, CheckCircle, Sparkles } from 'lucide-react';

const EnrollmentOptionsPage: React.FC = () => {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();

    // Get course data from URL params
    const courseId = searchParams.get('courseId');
    const courseName = searchParams.get('courseName') || 'Selected Course';
    const coursePrice = parseInt(searchParams.get('coursePrice') || '0');
    const courseDescription = searchParams.get('courseDescription') || '';

    const handleConsultation = () => {
        navigate(`/consultation?courseId=${courseId}&courseName=${courseName}`);
    };

    const handlePlaybook = () => {
        navigate(`/checkout?courseId=playbook&courseName=Playbook&coursePrice=2500`);
    };

    const handleStartClasses = () => {
        navigate(`/checkout?courseId=${courseId}&courseName=${courseName}&coursePrice=${coursePrice}`);
    };

    return (
        <div className="min-h-screen pt-20 pb-12 px-4 bg-brand-dark">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="text-center mb-16">
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-brand-cyan/10 border border-brand-cyan/30 rounded-full mb-6">
                        <Sparkles className="w-4 h-4 text-brand-cyan" />
                        <span className="text-brand-cyan text-sm font-medium">Three Ways to Begin</span>
                    </div>
                    <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
                        Choose Your Learning Journey
                    </h1>
                    <p className="text-xl text-gray-400 max-w-3xl mx-auto">
                        Ready to master <span className="text-brand-cyan font-semibold">{courseName}</span>? 
                        Start with guidance, learn at your pace, or dive straight into comprehensive training.
                    </p>
                </div>

                {/* Progress Indicator */}
                <div className="max-w-4xl mx-auto mb-12">
                    <div className="flex items-center justify-between relative">
                        <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-white/10 -translate-y-1/2 -z-10"></div>
                        
                        <div className="flex flex-col items-center">
                            <div className="w-12 h-12 rounded-full bg-brand-purple/20 border-2 border-brand-purple flex items-center justify-center mb-2">
                                <span className="text-brand-purple font-bold">1</span>
                            </div>
                            <span className="text-xs text-gray-400">Explore</span>
                        </div>
                        
                        <div className="flex flex-col items-center">
                            <div className="w-12 h-12 rounded-full bg-brand-cyan/20 border-2 border-brand-cyan flex items-center justify-center mb-2">
                                <span className="text-brand-cyan font-bold">2</span>
                            </div>
                            <span className="text-xs text-gray-400">Practice</span>
                        </div>
                        
                        <div className="flex flex-col items-center">
                            <div className="w-12 h-12 rounded-full bg-brand-cyan/20 border-2 border-brand-cyan flex items-center justify-center mb-2">
                                <span className="text-brand-cyan font-bold">3</span>
                            </div>
                            <span className="text-xs text-gray-400">Master</span>
                        </div>
                    </div>
                </div>

                {/* Options Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
                    {/* Option 1: Free Consultation - FIRST */}
                    <div className="bg-brand-surface border-2 border-brand-purple/40 rounded-2xl p-8 hover:border-brand-purple transition-all group relative overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-br from-brand-purple/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                        <div className="absolute top-0 right-0 w-64 h-64 bg-brand-purple/10 rounded-full blur-3xl -z-10 group-hover:bg-brand-purple/20 transition-all"></div>

                        {/* Badge */}
                        <div className="absolute -top-3 -right-3 bg-brand-purple text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg">
                            STEP 1
                        </div>

                        <div className="flex items-center justify-center w-16 h-16 bg-brand-purple/10 rounded-full mb-6 group-hover:bg-brand-purple/20 transition-colors relative z-10">
                            <Calendar className="w-8 h-8 text-brand-purple" />
                        </div>

                        <h2 className="text-3xl font-bold text-white mb-3 relative z-10">Free Consultation</h2>
                        <p className="text-brand-purple font-semibold mb-3 relative z-10">Perfect if you're just getting started</p>
                        <p className="text-gray-400 mb-6 text-base relative z-10">
                            Talk with an expert to understand the course, clarify your goals, and get personalized recommendations—no pressure, no commitment.
                        </p>

                        <div className="mb-8 relative z-10">
                            <div className="text-5xl font-bold text-brand-purple mb-2">
                                FREE
                            </div>
                            <p className="text-sm text-gray-500">30-minute expert session</p>
                        </div>

                        <div className="space-y-3 mb-8 relative z-10">
                            <div className="flex items-start gap-3">
                                <CheckCircle className="w-5 h-5 text-brand-purple flex-shrink-0 mt-0.5" />
                                <span className="text-gray-300">Personalized course guidance</span>
                            </div>
                            <div className="flex items-start gap-3">
                                <CheckCircle className="w-5 h-5 text-brand-purple flex-shrink-0 mt-0.5" />
                                <span className="text-gray-300">Career path recommendations</span>
                            </div>
                            <div className="flex items-start gap-3">
                                <CheckCircle className="w-5 h-5 text-brand-purple flex-shrink-0 mt-0.5" />
                                <span className="text-gray-300">Ask unlimited questions</span>
                            </div>
                            <div className="flex items-start gap-3">
                                <CheckCircle className="w-5 h-5 text-brand-purple flex-shrink-0 mt-0.5" />
                                <span className="text-gray-300">Zero obligation to enroll</span>
                            </div>
                        </div>

                        <button
                            onClick={handleConsultation}
                            className="w-full py-4 border-2 border-brand-purple text-brand-purple font-bold rounded-lg hover:bg-brand-purple hover:text-white transition-all flex items-center justify-center gap-2 relative z-10"
                        >
                            Schedule Free Call
                            <ArrowRight className="w-5 h-5" />
                        </button>

                        <p className="text-center text-xs text-gray-500 mt-4 relative z-10">
                            Available Mon-Fri, 9AM-5PM EAT
                        </p>
                    </div>

                    {/* Option 2: Playbook - SECOND */}
                    <div className="bg-brand-surface border-2 border-brand-cyan/40 rounded-2xl p-8 hover:border-brand-cyan transition-all group relative overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-br from-brand-cyan/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                        <div className="absolute top-0 right-0 w-64 h-64 bg-brand-cyan/10 rounded-full blur-3xl -z-10 group-hover:bg-brand-cyan/20 transition-all"></div>

                        {/* Badge */}
                        <div className="absolute -top-3 -right-3 bg-brand-cyan text-brand-dark text-xs font-bold px-3 py-1 rounded-full shadow-lg">
                            STEP 2
                        </div>

                        <div className="flex items-center justify-center w-16 h-16 bg-brand-cyan/10 rounded-full mb-6 group-hover:bg-brand-cyan/20 transition-colors relative z-10">
                            <BookOpen className="w-8 h-8 text-brand-cyan" />
                        </div>

                        <h2 className="text-3xl font-bold text-white mb-3 relative z-10">Get a Playbook</h2>
                        <p className="text-brand-cyan font-semibold mb-3 relative z-10">Ideal for self-starters who want guidance</p>
                        <p className="text-gray-400 mb-6 text-base relative z-10">
                            A detailed action plan with weekly mentorship and live Q&A sessions to keep you on track as you learn at your own pace.
                        </p>

                        <div className="mb-8 relative z-10">
                            <div className="text-5xl font-bold text-white mb-2">
                                KES 2,500
                            </div>
                            <p className="text-sm text-gray-500">One-time payment • 4-week program</p>
                        </div>

                        <div className="space-y-3 mb-8 relative z-10">
                            <div className="flex items-start gap-3">
                                <CheckCircle className="w-5 h-5 text-brand-cyan flex-shrink-0 mt-0.5" />
                                <span className="text-gray-300">Step-by-step action plan</span>
                            </div>
                            <div className="flex items-start gap-3">
                                <CheckCircle className="w-5 h-5 text-brand-cyan flex-shrink-0 mt-0.5" />
                                <span className="text-gray-300">Weekly 1-on-1 mentorship</span>
                            </div>
                            <div className="flex items-start gap-3">
                                <CheckCircle className="w-5 h-5 text-brand-cyan flex-shrink-0 mt-0.5" />
                                <span className="text-gray-300">Live Q&A sessions</span>
                            </div>
                            <div className="flex items-start gap-3">
                                <CheckCircle className="w-5 h-5 text-brand-cyan flex-shrink-0 mt-0.5" />
                                <span className="text-gray-300">Private community access</span>
                            </div>
                        </div>

                        <button
                            onClick={handlePlaybook}
                            className="w-full py-4 bg-brand-cyan/10 border-2 border-brand-cyan text-brand-cyan font-bold rounded-lg hover:bg-brand-cyan hover:text-brand-dark transition-all flex items-center justify-center gap-2 relative z-10 group-hover:shadow-[0_0_30px_rgba(0,180,216,0.3)]"
                        >
                            Get Your Playbook
                            <ArrowRight className="w-5 h-5" />
                        </button>

                        <p className="text-center text-xs text-gray-500 mt-4 relative z-10">
                            Limited spots • Starts Monday
                        </p>
                    </div>

                    {/* Option 3: Start Your Classes - THIRD (Most Comprehensive) */}
                    <div className="bg-gradient-to-br from-brand-surface to-brand-cyan/5 border-2 border-brand-cyan rounded-2xl p-8 hover:border-brand-cyan hover:shadow-[0_0_40px_rgba(0,180,216,0.3)] transition-all group relative overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-br from-brand-cyan/10 to-transparent opacity-50"></div>
                        <div className="absolute top-0 right-0 w-64 h-64 bg-brand-cyan/20 rounded-full blur-3xl -z-10"></div>

                        {/* Popular Badge */}
                        <div className="absolute -top-3 -right-3 bg-gradient-to-r from-brand-cyan to-blue-500 text-white text-xs font-bold px-4 py-1.5 rounded-full shadow-lg flex items-center gap-1">
                            <Sparkles className="w-3 h-3" />
                            MOST POPULAR
                        </div>

                        <div className="flex items-center justify-center w-16 h-16 bg-brand-cyan/20 rounded-full mb-6 group-hover:bg-brand-cyan/30 transition-colors relative z-10 shadow-lg shadow-brand-cyan/20">
                            <GraduationCap className="w-8 h-8 text-brand-cyan" />
                        </div>

                        <h2 className="text-3xl font-bold text-white mb-3 relative z-10">Start Your Classes</h2>
                        <p className="text-brand-cyan font-semibold mb-3 relative z-10">For serious learners ready to transform</p>
                        <p className="text-gray-400 mb-6 text-base relative z-10">
                            Get instant access to comprehensive course materials, interactive lessons, and lifetime learning resources. Everything you need to master the subject.
                        </p>

                        <div className="mb-8 relative z-10">
                            <div className="text-5xl font-bold text-white mb-2">
                                KES {coursePrice.toLocaleString()}
                            </div>
                            <p className="text-sm text-gray-500">One-time payment • Lifetime access</p>
                        </div>

                        <div className="space-y-3 mb-8 relative z-10">
                            <div className="flex items-start gap-3">
                                <CheckCircle className="w-5 h-5 text-brand-cyan flex-shrink-0 mt-0.5" />
                                <span className="text-gray-300 font-medium">Immediate full course access</span>
                            </div>
                            <div className="flex items-start gap-3">
                                <CheckCircle className="w-5 h-5 text-brand-cyan flex-shrink-0 mt-0.5" />
                                <span className="text-gray-300 font-medium">All modules & resources</span>
                            </div>
                            <div className="flex items-start gap-3">
                                <CheckCircle className="w-5 h-5 text-brand-cyan flex-shrink-0 mt-0.5" />
                                <span className="text-gray-300 font-medium">Interactive assignments</span>
                            </div>
                            <div className="flex items-start gap-3">
                                <CheckCircle className="w-5 h-5 text-brand-cyan flex-shrink-0 mt-0.5" />
                                <span className="text-gray-300 font-medium">Professional certificate</span>
                            </div>
                            <div className="flex items-start gap-3">
                                <CheckCircle className="w-5 h-5 text-brand-cyan flex-shrink-0 mt-0.5" />
                                <span className="text-gray-300 font-medium">Lifetime platform access</span>
                            </div>
                        </div>

                        <button
                            onClick={handleStartClasses}
                            className="w-full py-4 bg-brand-cyan text-brand-dark font-bold rounded-lg hover:bg-white transition-all flex items-center justify-center gap-2 relative z-10 shadow-lg shadow-brand-cyan/30 hover:shadow-brand-cyan/50"
                        >
                            Enroll Now
                            <ArrowRight className="w-5 h-5" />
                        </button>

                        <p className="text-center text-xs text-brand-cyan/80 mt-4 relative z-10 font-medium">
                            🔒 30-day money-back guarantee
                        </p>
                    </div>
                </div>

                {/* Comparison Note */}
                <div className="max-w-4xl mx-auto mb-12">
                    <div className="bg-brand-surface/50 border border-brand-cyan/20 rounded-xl p-6 text-center">
                        <p className="text-gray-400">
                            <span className="text-brand-cyan font-semibold">Not sure which option is right for you?</span> Start with a free consultation to explore your goals, 
                            then choose the path that fits your learning style and budget.
                        </p>
                    </div>
                </div>

                {/* FAQ Section */}
                <div className="max-w-3xl mx-auto">
                    <div className="bg-brand-surface border border-white/10 rounded-xl p-8">
                        <h3 className="text-2xl font-bold text-white mb-6">Frequently Asked Questions</h3>

                        <div className="space-y-4">
                            <details className="group">
                                <summary className="cursor-pointer text-gray-300 font-medium py-3 border-b border-white/10 flex justify-between items-center">
                                    Can I upgrade from Playbook to Full Course later?
                                    <span className="text-brand-cyan group-open:rotate-180 transition-transform">▼</span>
                                </summary>
                                <p className="text-gray-400 mt-3 pl-4">
                                    Yes! If you start with the Playbook and decide you want the full course experience, 
                                    the KES 2,500 you paid will be credited toward your course enrollment.
                                </p>
                            </details>

                            <details className="group">
                                <summary className="cursor-pointer text-gray-300 font-medium py-3 border-b border-white/10 flex justify-between items-center">
                                    What happens during the free consultation?
                                    <span className="text-brand-cyan group-open:rotate-180 transition-transform">▼</span>
                                </summary>
                                <p className="text-gray-400 mt-3 pl-4">
                                    In your 30-minute session, we'll discuss your learning goals, explain how the course works, 
                                    answer all your questions, and help you determine the best option. There's absolutely no 
                                    pressure to enroll.
                                </p>
                            </details>

                            <details className="group">
                                <summary className="cursor-pointer text-gray-300 font-medium py-3 border-b border-white/10 flex justify-between items-center">
                                    Is the Playbook enough to learn the skills?
                                    <span className="text-brand-cyan group-open:rotate-180 transition-transform">▼</span>
                                </summary>
                                <p className="text-gray-400 mt-3 pl-4">
                                    The Playbook provides a structured action plan and weekly mentorship to guide your self-study. 
                                    It's perfect for motivated learners who prefer flexibility. The full course includes video lessons, 
                                    interactive exercises, and more comprehensive materials.
                                </p>
                            </details>

                            <details className="group">
                                <summary className="cursor-pointer text-gray-300 font-medium py-3 border-b border-white/10 flex justify-between items-center">
                                    Do I get a certificate with all options?
                                    <span className="text-brand-cyan group-open:rotate-180 transition-transform">▼</span>
                                </summary>
                                <p className="text-gray-400 mt-3 pl-4">
                                    The professional certificate is only included with the full course enrollment. 
                                    The Playbook focuses on practical skills development without formal certification.
                                </p>
                            </details>
                        </div>
                    </div>
                </div>

                {/* Back Button */}
                <div className="text-center mt-12">
                    <button
                        onClick={() => navigate('/')}
                        className="text-gray-400 hover:text-white transition-colors inline-flex items-center gap-2"
                    >
                        <span>←</span> Back to Courses
                    </button>
                </div>
            </div>
        </div>
    );
};

export default EnrollmentOptionsPage;
