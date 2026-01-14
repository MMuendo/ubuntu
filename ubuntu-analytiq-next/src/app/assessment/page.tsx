import { Metadata } from "next";
import Link from "next/link";
import Header, { Footer } from "@/components/Header";
import AssessmentClient from "./AssessmentClient";

export const metadata: Metadata = {
    title: "AI Fluency Assessment Kenya | Free AI Skills Test",
    description:
        "Take our free 20-question AI Fluency Assessment. Discover your AI skill level and get a personalized learning path. Built for Kenyan professionals. 5 minutes.",
    alternates: {
        canonical: "https://ubuntuanalytiq.com/assessment",
    },
    openGraph: {
        title: "AI Fluency Assessment Kenya | Free AI Skills Test",
        description:
            "Discover your AI skill level with our free 20-question assessment.",
        url: "https://ubuntuanalytiq.com/assessment",
    },
};

// BreadcrumbList Schema
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
            name: "AI Fluency Assessment",
            item: "https://ubuntuanalytiq.com/assessment",
        },
    ],
};

// FAQPage Schema
const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
        {
            "@type": "Question",
            name: "What is the AI Fluency Assessment?",
            acceptedAnswer: {
                "@type": "Answer",
                text: "A free 20-question assessment that evaluates your AI knowledge across prompting, ethics, tool selection, and agentic workflows. Takes about 5 minutes to complete.",
            },
        },
        {
            "@type": "Question",
            name: "How much do Ubuntu AnalytIQ courses cost?",
            acceptedAnswer: {
                "@type": "Answer",
                text: "Courses range from KES 7,500 for AI Mastery to KES 25,000 for the Power BI Hybrid. All include weekly mentorship and WhatsApp community access.",
            },
        },
        {
            "@type": "Question",
            name: "Is the training suitable for beginners?",
            acceptedAnswer: {
                "@type": "Answer",
                text: "Yes. We offer courses at Beginner, Intermediate, and Advanced levels. The Excel Workshop is perfect for beginners, while AI Agents Masterclass suits experienced professionals.",
            },
        },
        {
            "@type": "Question",
            name: "Are the courses available online?",
            acceptedAnswer: {
                "@type": "Answer",
                text: "Yes, all courses are delivered online with live mentorship sessions, recorded content, and a private WhatsApp community for ongoing support.",
            },
        },
        {
            "@type": "Question",
            name: "Do you offer payment plans?",
            acceptedAnswer: {
                "@type": "Answer",
                text: "Yes, we offer flexible payment options including M-Pesa and installment plans. Contact us to discuss your preferred payment arrangement.",
            },
        },
    ],
};

export default function AssessmentPage() {
    return (
        <>
            <Header />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify(breadcrumbSchema),
                }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify(faqSchema),
                }}
            />

            <main className="min-h-screen">
                {/* Breadcrumb */}
                <nav
                    aria-label="Breadcrumb"
                    className="max-w-7xl mx-auto px-4 pt-4 text-sm text-gray-400"
                >
                    <ol className="flex items-center gap-2">
                        <li>
                            <Link href="/" className="hover:text-[var(--brand-cyan)]">
                                Home
                            </Link>
                        </li>
                        <li>/</li>
                        <li className="text-[var(--brand-cyan)]">AI Fluency Assessment</li>
                    </ol>
                </nav>

                <AssessmentClient />
            </main>

            <Footer />
        </>
    );
}
