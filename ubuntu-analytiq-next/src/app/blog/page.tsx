import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import Header, { Footer } from "@/components/Header";
import { ArrowRight } from "lucide-react";

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
const blogPosts = [
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
    },
];

export default function BlogPage() {
    return (
        <>
            <Header />

            <main className="min-h-screen pt-24 pb-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Header */}
                    <div className="text-center mb-16">
                        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                            Latest Insights
                        </h1>
                        <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                            Thoughts on Artificial Intelligence, Data Strategy, and the
                            future of work in Africa.
                        </p>
                    </div>

                    {/* Blog Grid */}
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {blogPosts.map((post) => (
                            <article
                                key={post.id}
                                className="bg-[var(--brand-surface)] border border-white/5 rounded-2xl overflow-hidden hover:border-[var(--brand-cyan)]/30 transition-all group flex flex-col h-full"
                            >
                                {/* Image */}
                                <div className="h-48 overflow-hidden relative">
                                    <Image
                                        src={post.image}
                                        alt={post.title}
                                        fill
                                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                    />
                                    {/* Tags overlay */}
                                    <div className="absolute top-4 left-4 flex flex-wrap gap-2">
                                        {post.tags.map((tag) => (
                                            <span
                                                key={tag}
                                                className="bg-[var(--brand-dark)]/80 backdrop-blur-sm text-[var(--brand-cyan)] text-xs font-bold px-2 py-1 rounded"
                                            >
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                {/* Content */}
                                <div className="p-6 flex-1 flex flex-col">
                                    <div className="flex justify-between items-center text-gray-500 text-xs mb-3">
                                        <span>{post.date}</span>
                                        <span>{post.author}</span>
                                    </div>
                                    <h2 className="text-xl font-bold text-white mb-3 group-hover:text-[var(--brand-cyan)] transition-colors">
                                        {post.title}
                                    </h2>
                                    <p className="text-gray-400 text-sm mb-6 flex-1">
                                        {post.excerpt}
                                    </p>
                                    <Link
                                        href={`/blog/${post.id}`}
                                        className="inline-flex items-center text-[var(--brand-blue)] font-semibold hover:text-white transition-colors mt-auto group/link"
                                    >
                                        Read Article
                                        <ArrowRight className="w-4 h-4 ml-2 group-hover/link:translate-x-1 transition-transform" />
                                    </Link>
                                </div>
                            </article>
                        ))}
                    </div>

                    {/* Newsletter CTA */}
                    <div className="mt-20 bg-gradient-to-br from-[var(--brand-surface)] to-[var(--brand-dark)] border border-white/10 rounded-3xl p-8 md:p-12 text-center">
                        <h2 className="text-2xl font-bold text-white mb-4">Stay Updated</h2>
                        <p className="text-gray-400 mb-6 max-w-xl mx-auto">
                            Get the latest insights on AI, data analytics, and technology
                            trends delivered to your inbox.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                            <input
                                type="email"
                                placeholder="Enter your email"
                                className="flex-1 bg-[var(--brand-dark)] border border-white/10 rounded-full px-6 py-3 text-white focus:outline-none focus:border-[var(--brand-cyan)]/50"
                            />
                            <button className="px-6 py-3 bg-[var(--brand-cyan)] text-[var(--brand-dark)] rounded-full font-bold hover:bg-cyan-300 transition-colors">
                                Subscribe
                            </button>
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </>
    );
}
