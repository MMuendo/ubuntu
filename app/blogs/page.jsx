import Link from "next/link";
import { ArrowRight, Newspaper } from "lucide-react";

import { SiteShell } from "@/components/site-shell";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { blogPosts } from "@/lib/academy/site-content";

export default function BlogsPage() {
  return (
    <SiteShell>
      <section className="ubuntu-solid-bg africa-watermark watermark-dark border-b border-slate-200 text-white">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <Badge tone="teal" className="border-white/10 bg-white/10 text-[#00b4d8]">Blogs</Badge>
          <h1 className="mt-5 max-w-4xl text-5xl font-semibold leading-[1.02] tracking-tight md:text-6xl">
            Thinking aloud about data, AI, automation, and African work.
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-300">
            Practical essays on systems, Agentic AI, Power BI, mentorship, and why Excel still matters here.
          </p>
        </div>
      </section>

      <section className="african-weave py-16">
        <div className="mx-auto grid max-w-7xl gap-5 px-4 sm:px-6 md:grid-cols-2 lg:grid-cols-3 lg:px-8">
          {blogPosts.map((post) => (
            <Card key={post.id} className="group overflow-hidden bg-white/95 transition hover:-translate-y-0.5 hover:border-[#00b4d8] hover:shadow-sm">
              <div className="relative h-52 overflow-hidden">
                <img src={post.image} alt={post.title} className="h-full w-full object-cover transition duration-500 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1e1616]/75 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 flex flex-wrap gap-2">
                  {post.tags.slice(0, 3).map((tag) => (
                    <span key={tag} className="rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-[#1e1616]">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
              <CardContent className="flex min-h-[260px] flex-col gap-4 p-5">
                <div className="flex items-center justify-between gap-3 text-xs font-semibold uppercase tracking-[0.12em] text-slate-500">
                  <span>{post.date}</span>
                  <span>{post.readTime}</span>
                </div>
                <div>
                  <h2 className="text-xl font-semibold tracking-tight text-[#1e1616]">{post.title}</h2>
                  <p className="mt-3 text-sm leading-6 text-slate-600">{post.excerpt}</p>
                </div>
                <div className="mt-auto flex items-center justify-between gap-3 border-t border-slate-100 pt-4">
                  <span className="inline-flex items-center gap-2 text-sm font-semibold text-slate-600">
                    <Newspaper size={16} />
                    {post.author}
                  </span>
                  <Button asChild variant="outline" size="sm">
                    <Link href={`/blogs/${post.id}`}>
                      Read
                      <ArrowRight size={14} />
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </SiteShell>
  );
}
