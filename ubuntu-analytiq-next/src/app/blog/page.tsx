import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import Header, { Footer } from "@/components/Header";
import { ArrowRight, Calendar, Clock, User, Tag as TagIcon } from "lucide-react";

export const metadata: Metadata = {
    title: "AI & Data Insights Blog",
    description:
        "Expert insights on AI, data analytics, and agentic workflows for African professionals. Stay updated with the latest trends in AI training and consulting.",
    alternates: {
        canonical: "https://ubuntuanalytiq.com/blog",
    },
    openGraph: {
        title: "AI & Data Insights Blog | Ubuntu AnalytIQ",
        description:
            "Expert insights on AI, data analytics, and agentic workflows for African professionals.",
        url: "https://ubuntuanalytiq.com/blog",
    },
};

// Blog posts data - in production, fetch from CMS/database
// Only published posts are shown
const blogPosts = [
    {
        id: "why-you-actually-need-to-learn-power-bi",
        title: "Why You Actually Need to Learn Power BI",
        excerpt: "A friendly defense of a tool that quietly runs the modern workplace — and the real answer to your boss’s question: itaongeza pesa kweli?",
        date: "Jan 25, 2026",
        author: "Ezra Muinde",
        image: "/power_bi.png",
        tags: ["Power BI", "Data Analytics", "Microsoft Fabric", "Business Intelligence"],
        readTime: "12 min read",
        status: "published",
    },
    {
        id: "phoenix-ai-summit-2025",
        title: "Phoenix AI Agents Summit 2025: Building for Us",
        excerpt:
            "Reflections on the recent summit and why building indigenous AI solutions is critical for Africa's future.",
        date: "Feb 15, 2025",
        author: "Ezra Muinde",
        image:
            "https://images.unsplash.com/photo-1591115765373-5207764f72e7?w=800&auto=format&fit=crop",
        tags: ["AI Agents", "Community", "Innovation"],
        readTime: "5 min read",
        status: "published",
    },
    {
        id: "why-excel-matters",
        title: "Why Excel Still Matters in the Age of AI",
        excerpt:
            "In a world of LLMs and Python, the spreadsheet remains the undefeated champion of business data.",
        date: "Jan 10, 2025",
        author: "Ezra Muinde",
        image:
            "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&auto=format&fit=crop",
        tags: ["Data Science", "Excel", "Foundations"],
        readTime: "4 min read",
        status: "published",
    },
    {
        id: "colleagues-friends",
        title: "Your Colleagues Are Actually Your Friends (Shoot Me)",
        excerpt:
            '"But of course you are replaceable… but your impact isn\'t."',
        date: "Dec 25, 2024",
        author: "Ezra Muinde",
        image:
            "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&auto=format&fit=crop",
        tags: ["Culture", "Workplace", "Mental Health"],
        readTime: "3 min read",
        status: "published",
    },
];

// Filter only published posts
const publishedPosts = blogPosts.filter(post => post.status === "published");

export default function BlogPage() {
    return (
        <>
            <Header />

            <main className="min-h-screen pt-24 pb-16 bg-[var(--brand-dark)]">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    
                    {/* Hero Header */}
                    <div className="text-center mb-16 max-w-4xl mx-auto">
                        <div className="inline-block px-4 py-2 bg-[var(--brand-cyan)]/10 border border-[var(--brand-cyan)]/20 rounded-full mb-6">
                            <span className="text-[var(--brand-cyan)] text-sm font-bold flex items-center gap-2">
                                <span className="w-2 h-2 bg-[var(--brand-cyan)] rounded-full animate-pulse"></span>
                                Latest Insights
                            </span>
                        </div>
                        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
                            Ideas Worth
                            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-[var(--brand-cyan)] to-[var(--brand-blue)]">
                                Building With
                            </span>
                        </h1>
                        <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
                            Thoughts on Artificial Intelligence, Data Strategy, and the
                            future of work in Africa.
                        </p>
                    </div>

                    {/* Featured Post (First Post) */}
                    {publishedPosts.length > 0 && (
                        <article className="mb-12 bg-[var(--brand-surface)] border border-white/5 rounded-3xl overflow-hidden hover:border-[var(--brand-cyan)]/30 transition-all group">
                            <div className="grid md:grid-cols-2 gap-0">
                                {/* Image */}
                                <div className="relative h-64 md:h-full min-h-[400px]">
                                    <Image
                                        src={publishedPosts[0].image}
                                        alt={publishedPosts[0].title}
                                        fill
                                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                                        sizes="(max-width: 768px) 100vw, 50vw"
                                        priority
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-[var(--brand-surface)] via-transparent to-transparent"></div>
                                </div>

                                {/* Content */}
                                <div className="p-8 md:p-12 flex flex-col justify-center">
                                    <div className="flex items-center gap-2 mb-4">
                                        <span className="px-3 py-1 bg-[var(--brand-cyan)]/10 text-[var(--brand-cyan)] text-xs font-bold rounded-full">
                                            Featured
                                        </span>
                                        {publishedPosts[0].tags.slice(0, 2).map((tag) => (
                                            <span
                                                key={tag}
                                                className="px-3 py-1 bg-white/5 text-gray-400 text-xs font-semibold rounded-full"
                                            >
                                                {tag}
                                            </span>
                                        ))}
                                    </div>

                                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 group-hover:text-[var(--brand-cyan)] transition-colors">
                                        {publishedPosts[0].title}
                                    </h2>

                                    <p className="text-gray-400 text-lg mb-6 leading-relaxed">
                                        {publishedPosts[0].excerpt}
                                    </p>

                                    <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 mb-6">
                                        <span className="flex items-center gap-1">
                                            <User className="w-4 h-4" />
                                            {publishedPosts[0].author}
                                        </span>
                                        <span>•</span>
                                        <span className="flex items-center gap-1">
                                            <Calendar className="w-4 h-4" />
                                            {publishedPosts[0].date}
                                        </span>
                                        <span>•</span>
                                        <span className="flex items-center gap-1">
                                            <Clock className="w-4 h-4" />
                                            {publishedPosts[0].readTime}
                                        </span>
                                    </div>

                                    <Link
                                        href={`/blog/${publishedPosts[0].id}`}
                                        className="inline-flex items-center text-[var(--brand-cyan)] font-bold text-lg hover:text-white transition-colors group/link"
                                    >
                                        Read Full Article
                                        <ArrowRight className="w-5 h-5 ml-2 group-hover/link:translate-x-2 transition-transform" />
                                    </Link>
                                </div>
                            </div>
                        </article>
                    )}

                    {/* More Articles Header */}
                    {publishedPosts.length > 1 && (
                        <div className="mb-8">
                            <h2 className="text-2xl md:text-3xl font-bold text-white">
                                More Articles
                            </h2>
                            <div className="h-1 w-20 bg-gradient-to-r from-[var(--brand-cyan)] to-[var(--brand-blue)] rounded-full mt-3"></div>
                        </div>
                    )}

                    {/* Blog Grid */}
                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                        {publishedPosts.slice(1).map((post) => (
                            <article
                                key={post.id}
                                className="bg-[var(--brand-surface)] border border-white/5 rounded-2xl overflow-hidden hover:border-[var(--brand-cyan)]/30 transition-all group flex flex-col h-full hover:transform hover:scale-[1.02] transition-transform duration-300"
                            >
                                {/* Image */}
                                <div className="relative h-48 md:h-56 overflow-hidden">
                                    <Image
                                        src={post.image}
                                        alt={post.title}
                                        fill
                                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                                    />
                                    {/* Tags overlay */}
                                    <div className="absolute top-4 left-4 flex flex-wrap gap-2">
                                        {post.tags.slice(0, 2).map((tag) => (
                                            <span
                                                key={tag}
                                                className="bg-[var(--brand-dark)]/90 backdrop-blur-sm text-[var(--brand-cyan)] text-xs font-bold px-3 py-1 rounded-full"
                                            >
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                {/* Content */}
                                <div className="p-6 flex-1 flex flex-col">
                                    <div className="flex items-center gap-3 text-gray-500 text-xs mb-3">
                                        <span className="flex items-center gap-1">
                                            <Calendar className="w-3 h-3" />
                                            {post.date}
                                        </span>
                                        <span>•</span>
                                        <span className="flex items-center gap-1">
                                            <Clock className="w-3 h-3" />
                                            {post.readTime}
                                        </span>
                                    </div>
                                    
                                    <h2 className="text-xl font-bold text-white mb-3 group-hover:text-[var(--brand-cyan)] transition-colors line-clamp-2">
                                        {post.title}
                                    </h2>
                                    
                                    <p className="text-gray-400 text-sm mb-6 flex-1 line-clamp-3 leading-relaxed">
                                        {post.excerpt}
                                    </p>
                                    
                                    <Link
                                        href={`/blog/${post.id}`}
                                        className="inline-flex items-center text-[var(--brand-cyan)] font-semibold hover:text-white transition-colors mt-auto group/link"
                                    >
                                        Read Article
                                        <ArrowRight className="w-4 h-4 ml-2 group-hover/link:translate-x-1 transition-transform" />
                                    </Link>
                                </div>
                            </article>
                        ))}
                    </div>

                    {/* Newsletter CTA */}
                    <div className="mt-20 bg-gradient-to-br from-[var(--brand-surface)] via-[var(--brand-dark)] to-[var(--brand-surface)] border border-white/10 rounded-3xl p-8 md:p-12 text-center relative overflow-hidden">
                        {/* Decorative elements */}
                        <div className="absolute top-0 right-0 w-64 h-64 bg-[var(--brand-cyan)]/5 rounded-full blur-3xl"></div>
                        <div className="absolute bottom-0 left-0 w-64 h-64 bg-[var(--brand-blue)]/5 rounded-full blur-3xl"></div>
                        
                        <div className="relative z-10">
                            <div className="inline-block p-3 bg-[var(--brand-cyan)]/10 rounded-2xl mb-6">
                                <TagIcon className="w-8 h-8 text-[var(--brand-cyan)]" />
                            </div>
                            <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
                                Stay in the Loop
                            </h2>
                            <p className="text-gray-400 mb-8 max-w-xl mx-auto text-lg">
                                Get the latest insights on AI, data analytics, and technology
                                trends delivered straight to your inbox every week.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                                <input
                                    type="email"
                                    placeholder="Enter your email"
                                    className="flex-1 bg-[var(--brand-dark)] border border-white/10 rounded-full px-6 py-4 text-white placeholder:text-gray-500 focus:outline-none focus:border-[var(--brand-cyan)]/50 transition-colors"
                                />
                                <button className="px-8 py-4 bg-[var(--brand-cyan)] text-[var(--brand-dark)] rounded-full font-bold hover:bg-cyan-300 transition-all shadow-lg shadow-cyan-500/20 hover:shadow-cyan-500/40 whitespace-nowrap">
                                    Subscribe
                                </button>
                            </div>
                            <p className="text-gray-500 text-xs mt-4">
                                No spam. Unsubscribe anytime.
                            </p>
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </>
    );
}
