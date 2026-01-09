import React from 'react';
import { Link } from 'react-router-dom';
import { BLOG_POSTS } from '../constants';
import { ArrowRight } from 'lucide-react';

const BlogPage: React.FC = () => {
    return (
        <div className="min-h-screen pt-24 pb-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="text-center mb-16">
                    <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                        Latest Insights
                    </h1>
                    <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                        Thoughts on Artificial Intelligence, Data Strategy, and the future of work in Africa.
                    </p>
                </div>

                {/* Blog Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {BLOG_POSTS.map((post) => (
                        <article
                            key={post.id}
                            className="bg-brand-surface border border-white/5 rounded-2xl overflow-hidden hover:border-brand-cyan/30 transition-all group flex flex-col h-full"
                        >
                            {/* Image */}
                            <div className="h-48 overflow-hidden relative">
                                <img
                                    src={post.image}
                                    alt={post.title}
                                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                />
                                {/* Tags overlay */}
                                <div className="absolute top-4 left-4 flex flex-wrap gap-2">
                                    {post.tags.map((tag) => (
                                        <span
                                            key={tag}
                                            className="bg-brand-dark/80 backdrop-blur-sm text-brand-cyan text-xs font-bold px-2 py-1 rounded"
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
                                <h2 className="text-xl font-bold text-white mb-3 group-hover:text-brand-cyan transition-colors">
                                    {post.title}
                                </h2>
                                <p className="text-gray-400 text-sm mb-6 flex-1">{post.excerpt}</p>
                                <Link
                                    to={`/blog/${post.id}`}
                                    className="inline-flex items-center text-brand-blue font-semibold hover:text-white transition-colors mt-auto group/link"
                                >
                                    Read Article
                                    <ArrowRight className="w-4 h-4 ml-2 group-hover/link:translate-x-1 transition-transform" />
                                </Link>
                            </div>
                        </article>
                    ))}
                </div>

                {/* Newsletter CTA */}
                <div className="mt-20 bg-gradient-to-br from-brand-surface to-brand-dark border border-white/10 rounded-3xl p-8 md:p-12 text-center">
                    <h2 className="text-2xl font-bold text-white mb-4">Stay Updated</h2>
                    <p className="text-gray-400 mb-6 max-w-xl mx-auto">
                        Get the latest insights on AI, data analytics, and technology trends delivered to your inbox.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                        <input
                            type="email"
                            placeholder="Enter your email"
                            className="flex-1 bg-brand-dark border border-white/10 rounded-full px-6 py-3 text-white focus:outline-none focus:border-brand-cyan/50"
                        />
                        <button className="px-6 py-3 bg-brand-cyan text-brand-dark rounded-full font-bold hover:bg-cyan-300 transition-colors">
                            Subscribe
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BlogPage;
