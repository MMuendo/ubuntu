import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import Header, { Footer } from "@/components/Header";
import { ArrowLeft, Clock, User } from "lucide-react";

// Blog posts data - in production, fetch from CMS/database
const blogPosts: Record<
    string,
    {
        title: string;
        excerpt: string;
        date: string;
        dateISO: string;
        author: string;
        image: string;
        tags: string[];
        content: string;
        readTime: string;
    }
> = {
    "phoenix-ai-summit-2025": {
        title: "Phoenix AI Agents Summit 2025: Building for Us",
        excerpt:
            "Reflections on the recent summit and why building indigenous AI solutions is critical for Africa's future.",
        date: "Feb 15, 2025",
        dateISO: "2025-02-15",
        author: "Ezra Muinde",
        image:
            "https://images.unsplash.com/photo-1591115765373-5207764f72e7?w=1200&auto=format&fit=crop",
        tags: ["AI Agents", "Community", "Innovation"],
        readTime: "5 min read",
        content: `
      <p class="mb-6 text-lg text-gray-300 leading-relaxed">The Phoenix AI Agents Summit 2025 was not just a conference; it was a declaration. As we gathered to discuss the future of autonomous systems, one theme rang louder than the rest: <strong class="text-white">We must build for us.</strong></p>
      
      <h2 class="text-2xl font-bold text-white mt-10 mb-4">The Agentic Shift</h2>
      <p class="mb-6 text-gray-300 leading-relaxed">We are witnessing a shift from passive tools to active agents. In the African context, this distinction is vital. Our markets are fragmented, our infrastructure is unique, and our problems are complex. Off-the-shelf AI models from the West often lack the nuance to navigate mobile money integrations, local languages, or informal sector dynamics.</p>
      
      <h2 class="text-2xl font-bold text-white mt-10 mb-4">Local Context is King</h2>
      <p class="mb-6 text-gray-300 leading-relaxed">During the summit, we explored how agents can bridge gaps in healthcare logistics and fintech. Imagine an agent that doesn't just chat but actively negotiates supply prices for a 'mama mboga' via WhatsApp, or an agent that triages patients in rural clinics based on local epidemiological data.</p>
      
      <p class="mb-6 text-gray-300 leading-relaxed">The energy in the room confirmed that the talent to build these solutions is here. It is time to stop consuming and start architecting.</p>
      
      <h2 class="text-2xl font-bold text-white mt-10 mb-4">What This Means for Kenya</h2>
      <p class="mb-6 text-gray-300 leading-relaxed">With the Data Protection Act (2019) and a growing tech ecosystem, Kenya is positioned to lead Africa's agentic AI revolution. We have M-Pesa, we have the developers, and now we need the strategic vision to deploy AI agents that understand our context.</p>
      
      <p class="mb-6 text-gray-300 leading-relaxed">At Ubuntu AnalytIQ, we're committed to training the next generation of AI builders who understand not just the technology, but the cultural and economic realities of Africa.</p>
    `,
    },
    "why-excel-matters": {
        title: "Why Excel Still Matters in the Age of AI",
        excerpt:
            "In a world of LLMs and Python, the spreadsheet remains the undefeated champion of business data.",
        date: "Jan 10, 2025",
        dateISO: "2025-01-10",
        author: "Ezra Muinde",
        image:
            "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&auto=format&fit=crop",
        tags: ["Data Science", "Excel", "Foundations"],
        readTime: "4 min read",
        content: `
      <p class="mb-6 text-lg text-gray-300 leading-relaxed">It is fashionable in tech circles to bash Excel. "It's not reproducible," they say. "It can't handle big data," they argue. And while true, they miss the point entirely.</p>
      
      <h2 class="text-2xl font-bold text-white mt-10 mb-4">The UI of Business</h2>
      <p class="mb-6 text-gray-300 leading-relaxed">Excel is the user interface of business. You can build the most sophisticated Python model in the world, but the output will almost certainly need to be delivered in a spreadsheet for the CEO to read it. It is the common language of commerce.</p>
      
      <h2 class="text-2xl font-bold text-white mt-10 mb-4">AI Needs Structure</h2>
      <p class="mb-6 text-gray-300 leading-relaxed">With the advent of Copilot and AI integrations, Excel is getting a second wind. But here is the catch: AI cannot fix messy data. To leverage AI effectively in Excel, you still need to understand data structure, normalization, and logic. You cannot prompt your way out of a bad pivot table.</p>
      
      <p class="mb-6 text-gray-300 leading-relaxed">So before you rush to learn the latest vector database, make sure you can still do a VLOOKUP. It matters more than you think.</p>
      
      <h2 class="text-2xl font-bold text-white mt-10 mb-4">The Power BI Bridge</h2>
      <p class="mb-6 text-gray-300 leading-relaxed">For those ready to level up, <a href="/courses/powerbi-workshop" class="text-[var(--brand-cyan)] hover:underline">Power BI offers the perfect bridge</a> between spreadsheet thinking and modern BI dashboards. It speaks Excel's language while unlocking the power of data modeling.</p>
    `,
    },
    "colleagues-friends": {
        title: "Your Colleagues Are Actually Your Friends (Shoot Me)",
        excerpt:
            '"But of course you are replaceable… but your impact isn\'t."',
        date: "Dec 25, 2024",
        dateISO: "2024-12-25",
        author: "Ezra Muinde",
        image:
            "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1200&auto=format&fit=crop",
        tags: ["Culture", "Workplace", "Mental Health"],
        readTime: "3 min read",
        content: `
      <p class="mb-6 text-lg text-gray-300 leading-relaxed">There is a popular LinkedIn sentiment that says, "Your colleagues are not your family; they are just people you work with." I want to push back on that.</p>
      
      <h2 class="text-2xl font-bold text-white mt-10 mb-4">The Cost of Armor</h2>
      <p class="mb-6 text-gray-300 leading-relaxed">We spend more waking hours with our colleagues than with anyone else. Maintaining a rigid "professional mask" is exhausting. It requires constant energy to filter your personality, hide your struggles, and present a polished facade. This armor doesn't protect us; it isolates us.</p>
      
      <h2 class="text-2xl font-bold text-white mt-10 mb-4">Vulnerability as a KPI</h2>
      <p class="mb-6 text-gray-300 leading-relaxed">In high-performing technical teams, trust is the currency. You cannot build complex systems if you are afraid to say, "I don't know," or "I made a mistake." Real friendship—the kind that allows for psychological safety—is actually a productivity hack. When we care about each other, we communicate better, we forgive faster, and we build better products.</p>
      
      <p class="mb-6 text-gray-300 leading-relaxed">So yes, maybe they are just colleagues. But making them friends might be the best career move you ever make.</p>
    `,
    },
};

// Generate static params for all blog posts
export function generateStaticParams() {
    return Object.keys(blogPosts).map((slug) => ({
        slug,
    }));
}

// Generate metadata for each post
export function generateMetadata({
    params,
}: {
    params: { slug: string };
}): Metadata {
    const post = blogPosts[params.slug];
    if (!post) {
        return {
            title: "Post Not Found",
        };
    }

    return {
        title: post.title,
        description: post.excerpt,
        alternates: {
            canonical: `https://ubuntuanalytiq.com/blog/${params.slug}`,
        },
        openGraph: {
            title: `${post.title} | Ubuntu AnalytIQ`,
            description: post.excerpt,
            url: `https://ubuntuanalytiq.com/blog/${params.slug}`,
            type: "article",
            publishedTime: post.dateISO,
            authors: [post.author],
            images: [
                {
                    url: post.image,
                    width: 1200,
                    height: 630,
                    alt: post.title,
                },
            ],
        },
        twitter: {
            card: "summary_large_image",
            title: post.title,
            description: post.excerpt,
            images: [post.image],
        },
    };
}

export default function BlogPostPage({ params }: { params: { slug: string } }) {
    const post = blogPosts[params.slug];

    if (!post) {
        notFound();
    }

    // Article Schema
    const articleSchema = {
        "@context": "https://schema.org",
        "@type": "Article",
        "@id": `https://ubuntuanalytiq.com/blog/${params.slug}#article`,
        headline: post.title,
        description: post.excerpt,
        image: post.image,
        datePublished: post.dateISO,
        dateModified: post.dateISO,
        author: {
            "@type": "Person",
            name: post.author,
            url: "https://ubuntuanalytiq.com/about#ezra",
        },
        publisher: {
            "@id": "https://ubuntuanalytiq.com/#organization",
        },
        mainEntityOfPage: {
            "@type": "WebPage",
            "@id": `https://ubuntuanalytiq.com/blog/${params.slug}`,
        },
    };

    // Breadcrumb Schema
    const breadcrumbSchema = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
            {
                "@type": "ListItem",
                position: 1,
                name: "Home",
                item: "https://ubuntuanalytiq.com",
            },
            {
                "@type": "ListItem",
                position: 2,
                name: "Blog",
                item: "https://ubuntuanalytiq.com/blog",
            },
            {
                "@type": "ListItem",
                position: 3,
                name: post.title,
                item: `https://ubuntuanalytiq.com/blog/${params.slug}`,
            },
        ],
    };

    return (
        <>
            <Header />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify(articleSchema),
                }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify(breadcrumbSchema),
                }}
            />

            <main className="min-h-screen pt-20 pb-16">
                {/* Breadcrumb */}
                <nav
                    aria-label="Breadcrumb"
                    className="max-w-4xl mx-auto px-4 pb-6 text-sm text-gray-400"
                >
                    <ol className="flex items-center gap-2">
                        <li>
                            <Link href="/" className="hover:text-[var(--brand-cyan)]">
                                Home
                            </Link>
                        </li>
                        <li>/</li>
                        <li>
                            <Link href="/blog" className="hover:text-[var(--brand-cyan)]">
                                Blog
                            </Link>
                        </li>
                        <li>/</li>
                        <li className="text-[var(--brand-cyan)] truncate max-w-[200px]">
                            {post.title}
                        </li>
                    </ol>
                </nav>

                <article className="max-w-4xl mx-auto px-4">
                    {/* Back link */}
                    <Link
                        href="/blog"
                        className="inline-flex items-center text-gray-400 hover:text-[var(--brand-cyan)] mb-8 transition-colors"
                    >
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        Back to Blog
                    </Link>

                    {/* Header */}
                    <header className="mb-8">
                        <div className="flex flex-wrap gap-2 mb-4">
                            {post.tags.map((tag) => (
                                <span
                                    key={tag}
                                    className="bg-[var(--brand-cyan)]/10 text-[var(--brand-cyan)] text-xs font-bold px-3 py-1 rounded-full"
                                >
                                    {tag}
                                </span>
                            ))}
                        </div>
                        <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
                            {post.title}
                        </h1>
                        <div className="flex items-center gap-6 text-gray-400 text-sm">
                            <div className="flex items-center gap-2">
                                <User className="w-4 h-4" />
                                <span>{post.author}</span>
                            </div>
                            <time dateTime={post.dateISO}>{post.date}</time>
                            <div className="flex items-center gap-2">
                                <Clock className="w-4 h-4" />
                                <span>{post.readTime}</span>
                            </div>
                        </div>
                    </header>

                    {/* Featured Image */}
                    <div className="relative h-[400px] md:h-[500px] rounded-2xl overflow-hidden mb-12">
                        <Image
                            src={post.image}
                            alt={post.title}
                            fill
                            className="object-cover"
                            priority
                            sizes="(max-width: 896px) 100vw, 896px"
                        />
                    </div>

                    {/* Content */}
                    <div
                        className="prose prose-invert prose-lg max-w-none"
                        dangerouslySetInnerHTML={{ __html: post.content }}
                    />

                    {/* CTA */}
                    <div className="mt-16 p-8 bg-[var(--brand-surface)] border border-white/10 rounded-2xl text-center">
                        <h2 className="text-2xl font-bold text-white mb-4">
                            Ready to Build Your AI Skills?
                        </h2>
                        <p className="text-gray-400 mb-6">
                            Take our free assessment to discover your personalized learning
                            path.
                        </p>
                        <Link
                            href="/assessment"
                            className="inline-block px-8 py-4 bg-[var(--brand-cyan)] text-[var(--brand-dark)] rounded-full font-bold hover:bg-cyan-300 transition-all"
                        >
                            Start AI Fluency Assessment
                        </Link>
                    </div>
                </article>
            </main>

            <Footer />
        </>
    );
}
