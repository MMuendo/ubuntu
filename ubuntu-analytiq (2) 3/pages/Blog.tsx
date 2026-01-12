import React from 'react';
import { Link } from 'react-router-dom';
import { BLOG_POSTS } from '../constants';

const Blog: React.FC = () => {
  return (
    <div className="min-h-screen bg-brand-darker pt-24 pb-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Latest Insights</h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Thoughts on Artificial Intelligence, Data Strategy, and the future of work in Africa.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {BLOG_POSTS.map((post) => (
            <div key={post.id} className="bg-gray-900 border border-gray-800 rounded-xl overflow-hidden hover:border-brand-primary/50 transition-all group flex flex-col h-full">
              <div className="h-48 overflow-hidden relative">
                <img 
                  src={post.image} 
                  alt={post.title} 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute top-4 left-4 flex flex-wrap gap-2">
                    {post.tags.map(tag => (
                         <span key={tag} className="bg-brand-darker/80 backdrop-blur-sm text-brand-primary text-xs font-bold px-2 py-1 rounded">
                            {tag}
                         </span>
                    ))}
                </div>
              </div>
              <div className="p-6 flex-1 flex flex-col">
                <div className="flex justify-between items-center text-gray-500 text-xs mb-3">
                    <span>{post.date}</span>
                    <span>{post.author}</span>
                </div>
                <h2 className="text-xl font-bold text-white mb-3 group-hover:text-brand-primary transition-colors">
                  {post.title}
                </h2>
                <p className="text-gray-400 text-sm mb-6 flex-1">
                  {post.excerpt}
                </p>
                <Link 
                  to={`/blog/${post.id}`}
                  className="inline-flex items-center text-brand-secondary font-semibold hover:text-white transition-colors mt-auto"
                >
                  Read Article
                  <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Blog;
