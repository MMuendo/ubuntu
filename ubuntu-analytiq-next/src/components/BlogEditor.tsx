import { useState, useEffect } from "react";
import { 
  X, 
  Save, 
  Eye, 
  Send, 
  Image as ImageIcon,
  Tag,
  Type,
  AlignLeft,
  Code,
  Bold,
  Italic,
  List,
  ListOrdered,
  Link as LinkIcon,
  Sparkles
} from "lucide-react";

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  status: "draft" | "published" | "archived";
  date: string;
  dateISO: string;
  author: string;
  image: string;
  tags: string[];
  readTime: string;
  lastModified: string;
}

interface BlogEditorProps {
  post: BlogPost;
  onSave: (post: BlogPost) => void;
  onClose: () => void;
  onPublish: (post: BlogPost) => void;
}

export default function BlogEditor({ post, onSave, onClose, onPublish }: BlogEditorProps) {
  const [editedPost, setEditedPost] = useState(post);
  const [previewMode, setPreviewMode] = useState(false);
  const [tagInput, setTagInput] = useState("");
  const [autoSaveStatus, setAutoSaveStatus] = useState<"saved" | "saving" | "unsaved">("saved");

  // Auto-save functionality
  useEffect(() => {
    const timer = setTimeout(() => {
      if (JSON.stringify(editedPost) !== JSON.stringify(post)) {
        setAutoSaveStatus("saving");
        setTimeout(() => {
          onSave(editedPost);
          setAutoSaveStatus("saved");
        }, 500);
      }
    }, 2000);

    return () => clearTimeout(timer);
  }, [editedPost]);

  const handleAddTag = () => {
    if (tagInput.trim() && !editedPost.tags.includes(tagInput.trim())) {
      setEditedPost({
        ...editedPost,
        tags: [...editedPost.tags, tagInput.trim()],
      });
      setTagInput("");
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setEditedPost({
      ...editedPost,
      tags: editedPost.tags.filter(tag => tag !== tagToRemove),
    });
  };

  const insertMarkdown = (before: string, after: string = "") => {
    const textarea = document.getElementById("content-editor") as HTMLTextAreaElement;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = editedPost.content.substring(start, end);
    const newContent = 
      editedPost.content.substring(0, start) +
      before + selectedText + after +
      editedPost.content.substring(end);

    setEditedPost({ ...editedPost, content: newContent });
    
    // Restore cursor position
    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(
        start + before.length,
        start + before.length + selectedText.length
      );
    }, 0);
  };

  const estimateReadTime = (text: string) => {
    const words = text.split(/\s+/).length;
    const minutes = Math.ceil(words / 200);
    return `${minutes} min read`;
  };

  useEffect(() => {
    setEditedPost({
      ...editedPost,
      readTime: estimateReadTime(editedPost.content),
    });
  }, [editedPost.content]);

  return (
    <div className="fixed inset-0 z-50 bg-[var(--brand-dark)]/95 backdrop-blur-sm overflow-y-auto">
      <div className="min-h-screen p-4 md:p-8">
        <div className="max-w-6xl mx-auto bg-[var(--brand-surface)] border border-white/10 rounded-2xl shadow-2xl">
          
          {/* Editor Header */}
          <div className="sticky top-0 z-10 bg-[var(--brand-surface)] border-b border-white/10 px-6 py-4 rounded-t-2xl">
            <div className="flex items-center justify-between gap-4 mb-4">
              <div className="flex items-center gap-3">
                <button
                  onClick={onClose}
                  className="p-2 hover:bg-white/5 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5 text-gray-400" />
                </button>
                <div>
                  <h2 className="text-xl font-bold text-white">
                    {editedPost.status === "draft" ? "Draft" : "Edit"} Article
                  </h2>
                  <p className="text-xs text-gray-500 mt-0.5">
                    {autoSaveStatus === "saved" && "All changes saved"}
                    {autoSaveStatus === "saving" && "Saving..."}
                    {autoSaveStatus === "unsaved" && "Unsaved changes"}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setPreviewMode(!previewMode)}
                  className={`
                    flex items-center gap-2 px-4 py-2 rounded-lg font-semibold text-sm transition-all
                    ${previewMode 
                      ? 'bg-[var(--brand-blue)] text-white' 
                      : 'bg-white/5 text-gray-300 hover:bg-white/10'
                    }
                  `}
                >
                  <Eye className="w-4 h-4" />
                  <span className="hidden sm:inline">Preview</span>
                </button>
                
                <button
                  onClick={() => {
                    onSave(editedPost);
                    setAutoSaveStatus("saved");
                  }}
                  className="flex items-center gap-2 px-4 py-2 bg-white/5 text-gray-300 rounded-lg font-semibold text-sm hover:bg-white/10 transition-all"
                >
                  <Save className="w-4 h-4" />
                  <span className="hidden sm:inline">Save</span>
                </button>
                
                {editedPost.status === "draft" && (
                  <button
                    onClick={() => onPublish(editedPost)}
                    className="flex items-center gap-2 px-4 py-2 bg-[var(--brand-cyan)] text-[var(--brand-dark)] rounded-lg font-bold text-sm hover:bg-cyan-300 transition-all shadow-lg shadow-cyan-500/20"
                  >
                    <Send className="w-4 h-4" />
                    <span className="hidden sm:inline">Publish</span>
                  </button>
                )}
              </div>
            </div>

            {/* Markdown Toolbar */}
            {!previewMode && (
              <div className="flex flex-wrap items-center gap-1 pb-2 border-b border-white/5">
                <button
                  onClick={() => insertMarkdown("## ", "")}
                  className="p-2 hover:bg-white/5 rounded text-gray-400 hover:text-white transition-colors"
                  title="Heading"
                >
                  <Type className="w-4 h-4" />
                </button>
                <button
                  onClick={() => insertMarkdown("**", "**")}
                  className="p-2 hover:bg-white/5 rounded text-gray-400 hover:text-white transition-colors"
                  title="Bold"
                >
                  <Bold className="w-4 h-4" />
                </button>
                <button
                  onClick={() => insertMarkdown("*", "*")}
                  className="p-2 hover:bg-white/5 rounded text-gray-400 hover:text-white transition-colors"
                  title="Italic"
                >
                  <Italic className="w-4 h-4" />
                </button>
                <div className="w-px h-6 bg-white/10 mx-1" />
                <button
                  onClick={() => insertMarkdown("- ", "")}
                  className="p-2 hover:bg-white/5 rounded text-gray-400 hover:text-white transition-colors"
                  title="Bullet List"
                >
                  <List className="w-4 h-4" />
                </button>
                <button
                  onClick={() => insertMarkdown("1. ", "")}
                  className="p-2 hover:bg-white/5 rounded text-gray-400 hover:text-white transition-colors"
                  title="Numbered List"
                >
                  <ListOrdered className="w-4 h-4" />
                </button>
                <div className="w-px h-6 bg-white/10 mx-1" />
                <button
                  onClick={() => insertMarkdown("[", "](url)")}
                  className="p-2 hover:bg-white/5 rounded text-gray-400 hover:text-white transition-colors"
                  title="Link"
                >
                  <LinkIcon className="w-4 h-4" />
                </button>
                <button
                  onClick={() => insertMarkdown("```\n", "\n```")}
                  className="p-2 hover:bg-white/5 rounded text-gray-400 hover:text-white transition-colors"
                  title="Code Block"
                >
                  <Code className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>

          {/* Editor Content */}
          <div className="grid md:grid-cols-[1fr_300px] gap-6 p-6">
            
            {/* Main Editor */}
            <div className="space-y-4">
              {!previewMode ? (
                <>
                  {/* Title */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-400 mb-2">
                      Title
                    </label>
                    <input
                      type="text"
                      value={editedPost.title}
                      onChange={(e) => setEditedPost({ ...editedPost, title: e.target.value })}
                      className="w-full bg-[var(--brand-dark)] border border-white/10 rounded-xl px-4 py-3 text-white text-2xl font-bold focus:outline-none focus:border-[var(--brand-cyan)]/50 transition-colors"
                      placeholder="Enter article title..."
                    />
                  </div>

                  {/* Excerpt */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-400 mb-2">
                      Excerpt
                    </label>
                    <textarea
                      value={editedPost.excerpt}
                      onChange={(e) => setEditedPost({ ...editedPost, excerpt: e.target.value })}
                      className="w-full bg-[var(--brand-dark)] border border-white/10 rounded-xl px-4 py-3 text-white resize-none focus:outline-none focus:border-[var(--brand-cyan)]/50 transition-colors"
                      rows={2}
                      placeholder="Brief description for social media and search engines..."
                    />
                  </div>

                  {/* Content */}
                  <div className="flex-1">
                    <label className="block text-sm font-semibold text-gray-400 mb-2 flex items-center justify-between">
                      <span>Content (Markdown supported)</span>
                      <span className="text-xs text-gray-500">{editedPost.readTime}</span>
                    </label>
                    <textarea
                      id="content-editor"
                      value={editedPost.content}
                      onChange={(e) => setEditedPost({ ...editedPost, content: e.target.value })}
                      className="w-full bg-[var(--brand-dark)] border border-white/10 rounded-xl px-4 py-3 text-white font-mono text-sm resize-none focus:outline-none focus:border-[var(--brand-cyan)]/50 transition-colors"
                      rows={20}
                      placeholder="Write your article content here using Markdown...

## Example Heading
This is a paragraph with **bold** and *italic* text.

- Bullet point 1
- Bullet point 2

[Link text](https://example.com)"
                    />
                  </div>
                </>
              ) : (
                /* Preview Mode */
                <div className="bg-[var(--brand-dark)] border border-white/10 rounded-xl p-8">
                  <h1 className="text-4xl font-bold text-white mb-4">
                    {editedPost.title || "Untitled"}
                  </h1>
                  {editedPost.excerpt && (
                    <p className="text-lg text-gray-400 mb-6 italic">
                      {editedPost.excerpt}
                    </p>
                  )}
                  <div className="prose prose-invert prose-lg max-w-none">
                    <div dangerouslySetInnerHTML={{ 
                      __html: editedPost.content
                        .replace(/\n## (.*)/g, '<h2 class="text-2xl font-bold text-white mt-8 mb-4">$1</h2>')
                        .replace(/\n### (.*)/g, '<h3 class="text-xl font-bold text-white mt-6 mb-3">$1</h3>')
                        .replace(/\*\*(.*?)\*\*/g, '<strong class="text-white">$1</strong>')
                        .replace(/\*(.*?)\*/g, '<em>$1</em>')
                        .replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2" class="text-[var(--brand-cyan)] hover:underline">$1</a>')
                        .replace(/\n- (.*)/g, '<li class="text-gray-300">$1</li>')
                        .replace(/\n\n/g, '<p class="mb-4 text-gray-300"></p>')
                    }} />
                  </div>
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              
              {/* Featured Image */}
              <div className="bg-[var(--brand-dark)] border border-white/10 rounded-xl p-4">
                <label className="block text-sm font-semibold text-white mb-3 flex items-center gap-2">
                  <ImageIcon className="w-4 h-4" />
                  Featured Image
                </label>
                <input
                  type="url"
                  value={editedPost.image}
                  onChange={(e) => setEditedPost({ ...editedPost, image: e.target.value })}
                  className="w-full bg-[var(--brand-surface)] border border-white/5 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-[var(--brand-cyan)]/50 transition-colors mb-3"
                  placeholder="Image URL..."
                />
                {editedPost.image && (
                  <div className="aspect-video rounded-lg overflow-hidden bg-white/5">
                    <img 
                      src={editedPost.image} 
                      alt="Preview"
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
              </div>

              {/* Tags */}
              <div className="bg-[var(--brand-dark)] border border-white/10 rounded-xl p-4">
                <label className="block text-sm font-semibold text-white mb-3 flex items-center gap-2">
                  <Tag className="w-4 h-4" />
                  Tags
                </label>
                <div className="flex gap-2 mb-3">
                  <input
                    type="text"
                    value={tagInput}
                    onChange={(e) => setTagInput(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && handleAddTag()}
                    className="flex-1 bg-[var(--brand-surface)] border border-white/5 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-[var(--brand-cyan)]/50 transition-colors"
                    placeholder="Add tag..."
                  />
                  <button
                    onClick={handleAddTag}
                    className="px-3 py-2 bg-[var(--brand-cyan)]/10 text-[var(--brand-cyan)] rounded-lg text-sm font-semibold hover:bg-[var(--brand-cyan)]/20 transition-colors"
                  >
                    Add
                  </button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {editedPost.tags.map((tag) => (
                    <span
                      key={tag}
                      className="flex items-center gap-1 px-3 py-1 bg-[var(--brand-cyan)]/10 text-[var(--brand-cyan)] rounded-full text-xs font-bold"
                    >
                      {tag}
                      <button
                        onClick={() => handleRemoveTag(tag)}
                        className="hover:text-white transition-colors"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  ))}
                </div>
              </div>

              {/* Meta Info */}
              <div className="bg-[var(--brand-dark)] border border-white/10 rounded-xl p-4">
                <h3 className="text-sm font-semibold text-white mb-3 flex items-center gap-2">
                  <Sparkles className="w-4 h-4" />
                  Article Info
                </h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between text-gray-400">
                    <span>Status:</span>
                    <span className={`font-semibold ${
                      editedPost.status === 'published' ? 'text-emerald-400' : 'text-amber-400'
                    }`}>
                      {editedPost.status}
                    </span>
                  </div>
                  <div className="flex justify-between text-gray-400">
                    <span>Read Time:</span>
                    <span className="text-white font-semibold">{editedPost.readTime}</span>
                  </div>
                  <div className="flex justify-between text-gray-400">
                    <span>Author:</span>
                    <span className="text-white font-semibold">{editedPost.author}</span>
                  </div>
                  <div className="flex justify-between text-gray-400">
                    <span>Last Modified:</span>
                    <span className="text-white font-semibold text-xs">
                      {new Date(editedPost.lastModified).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
