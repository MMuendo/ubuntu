import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { BLOG_POSTS } from '../constants';
import { summarizeBlog } from '../services/geminiService';

const BlogPost: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const post = BLOG_POSTS.find((p) => p.id === id);
  
  const [summary, setSummary] = useState<string | null>(null);
  const [isSummarizing, setIsSummarizing] = useState(false);

  if (!post) {
    return (
      <div className="min-h-screen bg-brand-darker flex flex-col items-center justify-center">
        <h1 className="text-3xl font-bold text-white mb-4">Post Not Found</h1>
        <button 
          onClick={() => navigate('/blog')}
          className="text-brand-primary hover:underline"
        >
          &larr; Back to Blog
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

  return (
    <div className="min-h-screen bg-brand-darker pt-24 pb-16">
      <div className="container mx-auto px-4 max-w-3xl">
        <Link to="/blog" className="inline-flex items-center text-gray-400 hover:text-brand-primary mb-8 transition-colors">
          <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back to Blog
        </Link>
        
        <article className="bg-gray-900 border border-gray-800 rounded-2xl overflow-hidden shadow-2xl">
          <div className="h-64 md:h-80 w-full overflow-hidden relative">
             <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent z-10"></div>
             <img src={post.image} alt={post.title} className="w-full h-full object-cover" />
             <div className="absolute bottom-6 left-6 md:bottom-8 md:left-8 z-20">
                <div className="flex gap-2 mb-3">
                    {post.tags.map(tag => (
                        <span key={tag} className="bg-brand-primary text-black text-xs font-bold px-2 py-1 rounded">
                        {tag}
                        </span>
                    ))}
                </div>
                <h1 className="text-3xl md:text-4xl font-bold text-white leading-tight">{post.title}</h1>
             </div>
          </div>
          
          <div className="p-8 md:p-12">
            <div className="flex items-center justify-between text-sm text-gray-500 mb-8 border-b border-gray-800 pb-8">
               <div className="flex items-center space-x-4">
                 <div className="flex items-center">
                   <div className="w-10 h-10 rounded-full bg-gray-700 flex items-center justify-center text-gray-300 mr-3">
                      <span className="font-bold">{post.author.charAt(0)}</span>
                   </div>
                   <span>By <span className="text-gray-300 font-medium">{post.author}</span></span>
                 </div>
                 <span>&bull;</span>
                 <span>{post.date}</span>
               </div>
               
               <button 
                  onClick={handleSummarize}
                  disabled={isSummarizing || summary !== null}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-full text-xs font-bold transition-all border ${
                    summary 
                    ? 'bg-brand-secondary/20 text-brand-secondary border-brand-secondary/30' 
                    : 'bg-gray-800 hover:bg-gray-700 text-brand-accent border-brand-accent/20 hover:border-brand-accent'
                  }`}
               >
                  {isSummarizing ? (
                      <span className="flex items-center">
                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-brand-accent" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Analyzing...
                      </span>
                  ) : (
                      <>
                          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                          <span>{summary ? 'Analysis Complete' : 'Summarize with AI'}</span>
                      </>
                  )}
               </button>
            </div>
            
            {summary && (
                <div className="bg-gradient-to-r from-gray-800 to-gray-900 border border-brand-accent/20 rounded-xl p-6 mb-8 animate-fade-in relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-2 opacity-10">
                        <svg className="w-24 h-24 text-brand-accent" fill="currentColor" viewBox="0 0 20 20"><path d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                    </div>
                    <h3 className="text-brand-accent font-bold mb-3 flex items-center relative z-10">
                        <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" /></svg>
                        Quick Takeaways
                    </h3>
                    <div className="text-gray-300 text-sm whitespace-pre-line relative z-10 leading-relaxed">
                        {summary}
                    </div>
                </div>
            )}

            <div 
              className="prose prose-invert prose-lg max-w-none text-gray-300"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />
            
            <div className="mt-12 pt-8 border-t border-gray-800 text-center">
                <p className="text-gray-400 mb-4">Enjoyed this article? Share it or start your journey today.</p>
                <div className="flex justify-center gap-4">
                     <button className="bg-gray-800 hover:bg-gray-700 text-white px-6 py-2 rounded-full text-sm transition-colors">
                        Share Article
                     </button>
                     <Link to="/assessment" className="bg-brand-primary hover:bg-brand-accent text-black px-6 py-2 rounded-full text-sm font-bold transition-colors">
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

export default BlogPost;
