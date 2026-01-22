import { Metadata } from "next";
import { useState } from "react";
import Link from "next/link";
import Header, { Footer } from "@/components/Header";
import { 
  Plus, 
  Save, 
  Eye, 
  Send, 
  Edit3, 
  Trash2, 
  Calendar,
  Tag,
  Image as ImageIcon,
  FileText,
  CheckCircle2,
  Clock,
  Archive
} from "lucide-react";

export const metadata: Metadata = {
  title: "Blog Admin | Ubuntu AnalytIQ",
  description: "Manage and publish blog content",
};

type BlogStatus = "draft" | "published" | "archived";

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  status: BlogStatus;
  date: string;
  dateISO: string;
  author: string;
  image: string;
  tags: string[];
  readTime: string;
  lastModified: string;
}

export default function BlogAdmin() {
  const [posts, setPosts] = useState<BlogPost[]>([
    {
      id: "phoenix-ai-summit-2025",
      title: "Phoenix AI Agents Summit 2025: Building for Us",
      excerpt: "Reflections on the recent summit and why building indigenous AI solutions is critical for Africa's future.",
      content: "",
      status: "published",
      date: "Feb 15, 2025",
      dateISO: "2025-02-15",
      author: "Ezra Muinde",
      image: "https://images.unsplash.com/photo-1591115765373-5207764f72e7?w=1200",
      tags: ["AI Agents", "Community", "Innovation"],
      readTime: "5 min read",
      lastModified: "2025-02-15T10:30:00Z",
    },
  ]);

  const [activeTab, setActiveTab] = useState<BlogStatus | "all">("all");
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [currentPost, setCurrentPost] = useState<BlogPost | null>(null);

  const filteredPosts = activeTab === "all" 
    ? posts 
    : posts.filter(p => p.status === activeTab);

  const statusCounts = {
    all: posts.length,
    draft: posts.filter(p => p.status === "draft").length,
    published: posts.filter(p => p.status === "published").length,
    archived: posts.filter(p => p.status === "archived").length,
  };

  const handleNewPost = () => {
    const newPost: BlogPost = {
      id: `draft-${Date.now()}`,
      title: "Untitled Draft",
      excerpt: "",
      content: "",
      status: "draft",
      date: new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
      dateISO: new Date().toISOString().split('T')[0],
      author: "Ezra Muinde",
      image: "",
      tags: [],
      readTime: "1 min read",
      lastModified: new Date().toISOString(),
    };
    setPosts([newPost, ...posts]);
    setCurrentPost(newPost);
    setIsEditorOpen(true);
  };

  const handleStatusChange = (postId: string, newStatus: BlogStatus) => {
    setPosts(posts.map(p => 
      p.id === postId 
        ? { ...p, status: newStatus, lastModified: new Date().toISOString() }
        : p
    ));
  };

  const handleDelete = (postId: string) => {
    if (confirm("Are you sure you want to delete this post?")) {
      setPosts(posts.filter(p => p.id !== postId));
    }
  };

  return (
    <>
      <Header />
      
      <main className="min-h-screen pt-24 pb-16 bg-[var(--brand-dark)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Header with Actions */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8 gap-4">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
                Content Studio
              </h1>
              <p className="text-gray-400">Draft, refine, and publish your insights</p>
            </div>
            <button
              onClick={handleNewPost}
              className="flex items-center gap-2 px-6 py-3 bg-[var(--brand-cyan)] text-[var(--brand-dark)] rounded-full font-bold hover:bg-cyan-300 transition-all shadow-lg shadow-cyan-500/20 hover:shadow-cyan-500/40"
            >
              <Plus className="w-5 h-5" />
              New Article
            </button>
          </div>

          {/* Status Tabs */}
          <div className="flex flex-wrap gap-2 mb-8 border-b border-white/10 pb-4 overflow-x-auto">
            {(['all', 'draft', 'published', 'archived'] as const).map((status) => (
              <button
                key={status}
                onClick={() => setActiveTab(status)}
                className={`
                  flex items-center gap-2 px-4 py-2 rounded-lg font-semibold text-sm transition-all whitespace-nowrap
                  ${activeTab === status 
                    ? 'bg-[var(--brand-cyan)] text-[var(--brand-dark)]' 
                    : 'bg-[var(--brand-surface)] text-gray-400 hover:text-white border border-white/5 hover:border-white/10'
                  }
                `}
              >
                {status === 'draft' && <FileText className="w-4 h-4" />}
                {status === 'published' && <CheckCircle2 className="w-4 h-4" />}
                {status === 'archived' && <Archive className="w-4 h-4" />}
                <span className="capitalize">{status}</span>
                <span className={`
                  px-2 py-0.5 rounded-full text-xs font-bold
                  ${activeTab === status ? 'bg-[var(--brand-dark)]/20' : 'bg-white/5'}
                `}>
                  {statusCounts[status]}
                </span>
              </button>
            ))}
          </div>

          {/* Posts Grid */}
          <div className="grid gap-4">
            {filteredPosts.length === 0 ? (
              <div className="text-center py-16 bg-[var(--brand-surface)] border border-white/5 rounded-2xl">
                <FileText className="w-12 h-12 text-gray-600 mx-auto mb-4" />
                <p className="text-gray-400 text-lg mb-2">No {activeTab !== 'all' ? activeTab : ''} posts yet</p>
                <p className="text-gray-500 text-sm">Start creating your first article</p>
              </div>
            ) : (
              filteredPosts.map((post) => (
                <article
                  key={post.id}
                  className="bg-[var(--brand-surface)] border border-white/5 rounded-xl p-6 hover:border-[var(--brand-cyan)]/30 transition-all group"
                >
                  <div className="flex flex-col md:flex-row gap-4">
                    {/* Image Preview */}
                    {post.image && (
                      <div className="w-full md:w-32 h-32 rounded-lg overflow-hidden bg-white/5 flex-shrink-0">
                        <img 
                          src={post.image} 
                          alt={post.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}
                    
                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-4 mb-3">
                        <div className="flex-1 min-w-0">
                          <h2 className="text-xl font-bold text-white mb-2 truncate group-hover:text-[var(--brand-cyan)] transition-colors">
                            {post.title}
                          </h2>
                          <p className="text-gray-400 text-sm line-clamp-2 mb-3">
                            {post.excerpt || "No excerpt yet..."}
                          </p>
                        </div>
                        
                        {/* Status Badge */}
                        <div className={`
                          flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold whitespace-nowrap flex-shrink-0
                          ${post.status === 'published' ? 'bg-emerald-500/10 text-emerald-400' : ''}
                          ${post.status === 'draft' ? 'bg-amber-500/10 text-amber-400' : ''}
                          ${post.status === 'archived' ? 'bg-gray-500/10 text-gray-400' : ''}
                        `}>
                          {post.status === 'published' && <CheckCircle2 className="w-3 h-3" />}
                          {post.status === 'draft' && <Clock className="w-3 h-3" />}
                          {post.status === 'archived' && <Archive className="w-3 h-3" />}
                          {post.status}
                        </div>
                      </div>

                      {/* Meta Info */}
                      <div className="flex flex-wrap items-center gap-4 text-xs text-gray-500 mb-4">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          {post.date}
                        </span>
                        <span>•</span>
                        <span>{post.readTime}</span>
                        {post.tags.length > 0 && (
                          <>
                            <span>•</span>
                            <div className="flex items-center gap-1 flex-wrap">
                              <Tag className="w-3 h-3" />
                              {post.tags.slice(0, 3).map(tag => (
                                <span key={tag} className="text-[var(--brand-cyan)]">
                                  {tag}
                                </span>
                              )).reduce((prev, curr) => [prev, ', ', curr] as any)}
                            </div>
                          </>
                        )}
                      </div>

                      {/* Actions */}
                      <div className="flex flex-wrap gap-2">
                        <button
                          onClick={() => {
                            setCurrentPost(post);
                            setIsEditorOpen(true);
                          }}
                          className="flex items-center gap-1 px-3 py-1.5 bg-white/5 text-gray-300 rounded-lg text-sm font-semibold hover:bg-white/10 hover:text-white transition-all"
                        >
                          <Edit3 className="w-3.5 h-3.5" />
                          Edit
                        </button>
                        
                        {post.status === 'draft' && (
                          <button
                            onClick={() => handleStatusChange(post.id, 'published')}
                            className="flex items-center gap-1 px-3 py-1.5 bg-emerald-500/10 text-emerald-400 rounded-lg text-sm font-semibold hover:bg-emerald-500/20 transition-all"
                          >
                            <Send className="w-3.5 h-3.5" />
                            Publish
                          </button>
                        )}
                        
                        {post.status === 'published' && (
                          <>
                            <button
                              onClick={() => handleStatusChange(post.id, 'draft')}
                              className="flex items-center gap-1 px-3 py-1.5 bg-amber-500/10 text-amber-400 rounded-lg text-sm font-semibold hover:bg-amber-500/20 transition-all"
                            >
                              <FileText className="w-3.5 h-3.5" />
                              Unpublish
                            </button>
                            <Link
                              href={`/blog/${post.id}`}
                              className="flex items-center gap-1 px-3 py-1.5 bg-[var(--brand-blue)]/10 text-[var(--brand-blue)] rounded-lg text-sm font-semibold hover:bg-[var(--brand-blue)]/20 transition-all"
                            >
                              <Eye className="w-3.5 h-3.5" />
                              View Live
                            </Link>
                          </>
                        )}
                        
                        <button
                          onClick={() => handleDelete(post.id)}
                          className="flex items-center gap-1 px-3 py-1.5 bg-red-500/10 text-red-400 rounded-lg text-sm font-semibold hover:bg-red-500/20 transition-all ml-auto"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                </article>
              ))
            )}
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
