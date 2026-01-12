import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { BLOG_POSTS } from '../constants';
import { summarizeBlog } from '../services/aiService';
import { ArrowLeft, Share2, Zap, Loader2, CheckCircle } from 'lucide-react';

const BlogPostPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const post = BLOG_POSTS.find((p) => p.id === id);

    const [summary, setSummary] = useState<string | null>(null);
    const [isSummarizing, setIsSummarizing] = useState(false);

    if (!post) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center">
                <h1 className="text-3xl font-bold text-white mb-4">Post Not Found</h1>
                <button
                    onClick={() => navigate('/blog')}
                    className="text-brand-cyan hover:underline flex items-center gap-2"
                >
                    <ArrowLeft className="w-4 h-4" /> Back to Blog
                </button>
            </div>
        );
    }

    const handleSummarize = async () => {
        setIsSummarizing(true);
        // Strip HTML tags for cleaner context
        const cleanText = post.content.replace(/<[^>]*>?/gm, '');
        const result = await summarizeBlog(cleanText);
        setSummary(result);
        setIsSummarizing(false);
    };

    const handleShare = () => {
        if (navigator.share) {
            navigator.share({
                title: post.title,
                text: post.excerpt,
                url: window.location.href,
            });
        } else {
            navigator.clipboard.writeText(window.location.href);
            alert('Link copied to clipboard!');
        }
    };

    return (
        <div className="min-h-screen pt-24 pb-16">
            <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Back Link */}
                <Link
                    to="/blog"
                    className="inline-flex items-center text-gray-400 hover:text-brand-cyan mb-8 transition-colors"
                >
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Back to Blog
                </Link>

                {/* Article */}
                <article className="bg-brand-surface border border-white/5 rounded-2xl overflow-hidden shadow-2xl">
                    {/* Hero Image */}
                    <div className="h-64 md:h-80 w-full overflow-hidden relative">
                        <div className="absolute inset-0 bg-gradient-to-t from-brand-surface to-transparent z-10"></div>
                        <img
                            src={post.image}
                            alt={post.title}
                            className="w-full h-full object-cover"
                        />
                        <div className="absolute bottom-6 left-6 md:bottom-8 md:left-8 z-20">
                            <div className="flex gap-2 mb-3">
                                {post.tags.map((tag) => (
                                    <span
                                        key={tag}
                                        className="bg-brand-cyan text-brand-dark text-xs font-bold px-2 py-1 rounded"
                                    >
                                        {tag}
                                    </span>
                                ))}
                            </div>
                            <h1 className="text-3xl md:text-4xl font-bold text-white leading-tight">
                                {post.title}
                            </h1>
                        </div>
                    </div>

                    {/* Content */}
                    <div className="p-8 md:p-12">
                        {/* Meta & Actions */}
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-sm text-gray-500 mb-8 border-b border-white/10 pb-8">
                            <div className="flex items-center space-x-4">
                                <div className="flex items-center">
                                    <div className="w-10 h-10 rounded-full bg-brand-cyan/20 flex items-center justify-center text-brand-cyan mr-3">
                                        <span className="font-bold">{post.author.charAt(0)}</span>
                                    </div>
                                    <span>
                                        By <span className="text-gray-300 font-medium">{post.author}</span>
                                    </span>
                                </div>
                                <span className="hidden sm:inline">•</span>
                                <span>{post.date}</span>
                            </div>

                            <div className="flex gap-2">
                                {/* AI Summarize Button */}
                                <button
                                    onClick={handleSummarize}
                                    disabled={isSummarizing || summary !== null}
                                    className={`flex items-center space-x-2 px-4 py-2 rounded-full text-xs font-bold transition-all border ${summary
                                        ? 'bg-green-500/20 text-green-400 border-green-500/30'
                                        : 'bg-brand-dark hover:bg-brand-surface text-brand-cyan border-brand-cyan/30 hover:border-brand-cyan'
                                        }`}
                                >
                                    {isSummarizing ? (
                                        <>
                                            <Loader2 className="w-4 h-4 animate-spin" />
                                            <span>Analyzing...</span>
                                        </>
                                    ) : summary ? (
                                        <>
                                            <CheckCircle className="w-4 h-4" />
                                            <span>Summarized</span>
                                        </>
                                    ) : (
                                        <>
                                            <Zap className="w-4 h-4" />
                                            <span>Summarize with AI</span>
                                        </>
                                    )}
                                </button>

                                {/* Share Button */}
                                <button
                                    onClick={handleShare}
                                    className="flex items-center space-x-2 px-4 py-2 rounded-full text-xs font-bold bg-brand-dark hover:bg-brand-surface text-gray-400 hover:text-white border border-white/10 hover:border-white/20 transition-all"
                                >
                                    <Share2 className="w-4 h-4" />
                                    <span>Share</span>
                                </button>
                            </div>
                        </div>

                        {/* AI Summary Card */}
                        {summary && (
                            <div className="bg-gradient-to-r from-brand-dark to-brand-surface border border-brand-cyan/20 rounded-xl p-6 mb-8 animate-fade-in relative overflow-hidden">
                                <div className="absolute top-2 right-2 opacity-10">
                                    <Zap className="w-16 h-16 text-brand-cyan" />
                                </div>
                                <h3 className="text-brand-cyan font-bold mb-3 flex items-center relative z-10">
                                    <Zap className="w-4 h-4 mr-2" />
                                    Quick Takeaways
                                </h3>
                                <div className="text-gray-300 text-sm whitespace-pre-line relative z-10 leading-relaxed">
                                    {summary}
                                </div>
                            </div>
                        )}

                        {/* Article Body */}
                        <div
                            className="prose prose-invert prose-lg max-w-none text-gray-300"
                            dangerouslySetInnerHTML={{ __html: post.content }}
                        />

                        {/* CTA Footer */}
                        <div className="mt-12 pt-8 border-t border-white/10 text-center">
                            <p className="text-gray-400 mb-4">
                                Enjoyed this article? Start your data journey today.
                            </p>
                            <div className="flex justify-center gap-4">
                                <button
                                    onClick={handleShare}
                                    className="bg-white/5 hover:bg-white/10 text-white px-6 py-2 rounded-full text-sm transition-colors border border-white/10"
                                >
                                    Share Article
                                </button>
                                <Link
                                    to="/assessment"
                                    className="bg-brand-cyan hover:bg-cyan-300 text-brand-dark px-6 py-2 rounded-full text-sm font-bold transition-colors"
                                >
                                    Take Assessment
                                </Link>
                            </div>
                        </div>
                    </div>
                </article>
            </div>
        </div>
    );
};

export default BlogPostPage;
