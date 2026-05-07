import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Share2 } from "lucide-react";

import { SiteShell } from "@/components/site-shell";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { blogPosts, getBlogPost } from "@/lib/academy/site-content";

export function generateStaticParams() {
  return blogPosts.map((post) => ({ id: post.id }));
}

export default async function BlogPostPage({ params }) {
  const { id } = await params;
  const post = getBlogPost(id);
  if (!post) notFound();

  return (
    <SiteShell>
      <article className="ubuntu-solid-bg text-white">
        <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6 lg:px-8">
          <Button asChild variant="outline" className="border-white/15 bg-white/5 text-white hover:bg-white/10">
            <Link href="/blogs">
              <ArrowLeft size={16} />
              Back to blogs
            </Link>
          </Button>
          {post.sourceUrl ? (
            <Button asChild variant="outline" className="ml-3 border-white/15 bg-white/5 text-white hover:bg-white/10">
              <a href={post.sourceUrl} target="_blank" rel="noreferrer">
                Original post
              </a>
            </Button>
          ) : null}
          <div className="mt-8 overflow-hidden rounded-lg border border-white/10 bg-white/5">
            <div className="relative h-[360px] overflow-hidden">
              <img src={post.image} alt={post.title} className="h-full w-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1e1616] via-[#1e1616]/35 to-transparent" />
              <div className="absolute bottom-6 left-6 right-6">
                <div className="flex flex-wrap gap-2">
                  {post.tags.map((tag) => (
                    <Badge key={tag} tone="teal" className="border-white/10 bg-white/10 text-[#00b4d8]">{tag}</Badge>
                  ))}
                </div>
                <h1 className="mt-4 text-4xl font-semibold leading-tight tracking-tight md:text-5xl">{post.title}</h1>
              </div>
            </div>

            <div className="border-b border-white/10 p-6 text-sm text-slate-300 sm:flex sm:items-center sm:justify-between">
              <p>By <span className="font-semibold text-white">{post.author}</span> on {post.date} - {post.readTime}</p>
              <span className="mt-3 inline-flex items-center gap-2 text-[#00b4d8] sm:mt-0">
                <Share2 size={15} />
                Ubuntu Analytiq insight
              </span>
            </div>

            <div className="space-y-9 p-6 md:p-10">
              <p className="text-lg leading-8 text-slate-300">{post.excerpt}</p>
              {post.sections.map((section, index) => (
                <section key={section.heading || index}>
                  {section.heading ? <h2 className="text-2xl font-semibold tracking-tight text-white">{section.heading}</h2> : null}
                  <div className={section.heading ? "mt-3 space-y-5" : "space-y-5"}>
                    {(Array.isArray(section.body) ? section.body : [section.body]).map((paragraph, paragraphIndex) => (
                      <p key={paragraphIndex} className="text-base leading-8 text-slate-300">{paragraph}</p>
                    ))}
                  </div>
                </section>
              ))}
              <div className="rounded-lg border border-[#00b4d8]/30 bg-[#00b4d8]/10 p-5">
                <p className="text-sm font-semibold uppercase tracking-[0.14em] text-[#00b4d8]">Next step</p>
                <p className="mt-2 text-sm leading-6 text-slate-200">
                  Turn the idea into practice through the Academy, Mentorship, Projects, or Datasets workflow.
                </p>
              </div>
            </div>
          </div>
        </div>
      </article>
    </SiteShell>
  );
}
