import { Metadata } from "next";
import Link from "next/link";
import Header, { Footer } from "@/components/Header";
import { ArrowRight, BarChart3, Brain, Bot, MapPin, Phone, Mail } from "lucide-react";

export const metadata: Metadata = {
  title: "AI & Data Training in Kenya",
  description:
    "Master AI, Power BI & data analytics with Ubuntu AnalytIQ. Expert-led training for Kenyan professionals. Courses from KES 7,500. Start your AI fluency journey today.",
  alternates: {
    canonical: "https://ubuntuanalytiq.com/",
  },
  openGraph: {
    title: "AI & Data Training in Kenya | Ubuntu AnalytIQ",
    description:
      "Master AI, Power BI & data analytics with Ubuntu AnalytIQ. Expert-led training for Kenyan professionals.",
    url: "https://ubuntuanalytiq.com/",
  },
};

// LocalBusiness + EducationalOrganization Schema
const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "EducationalOrganization",
  "@id": "https://ubuntuanalytiq.com/#localbusiness",
  name: "Ubuntu AnalytIQ",
  image: "https://ubuntuanalytiq.com/favicon/favicon.svg",
  url: "https://ubuntuanalytiq.com",
  telephone: "+254706719457",
  email: "hello@ubuntuanalytiq.com",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Nairobi",
    addressLocality: "Nairobi",
    addressRegion: "Nairobi County",
    postalCode: "00100",
    addressCountry: "KE",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: -1.2921,
    longitude: 36.8219,
  },
  openingHoursSpecification: {
    "@type": "OpeningHoursSpecification",
    dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
    opens: "09:00",
    closes: "18:00",
  },
  priceRange: "KES 7,500 - KES 25,000",
  areaServed: ["Kenya", "East Africa"],
  knowsLanguage: ["English", "Swahili"],
};

const services = [
  {
    title: "Business Analytics",
    description:
      "Custom solutions and corporate training to turn raw data into strategic assets.",
    icon: <BarChart3 className="w-8 h-8 text-cyan-400" />,
  },
  {
    title: "AI & Data Fluency",
    description:
      "Comprehensive training and ethical AI consultancy for modern teams.",
    icon: <Brain className="w-8 h-8 text-purple-400" />,
  },
  {
    title: "Agentic Workflows",
    description:
      "Designing proactive AI agents and automation systems that work for you.",
    icon: <Bot className="w-8 h-8 text-blue-400" />,
  },
];

const courses = [
  {
    id: "excel-workshop",
    title: "Data Thinking with Excel",
    price: 20000,
    description:
      "Build analytical thinking skills to structure problems, model business logic, and turn data into actionable insights using Excel.\n\nIncludes:\n• Advanced Excel formulas & functions\n• Data modeling & pivot tables\n• Business case studies & exercises\n• Weekly mentorship sessions",
    level: "Foundation",
  },
  {
    id: "powerbi-workshop",
    title: "Excel & Power BI Hybrid",
    price: 25000,
    description:
      "Bridge the gap between spreadsheets and modern business intelligence dashboards.",
    level: "Intermediate",
  },
  {
    id: "ai-agents-masterclass",
    title: "AI Agents Masterclass",
    price: 12500,
    description:
      "Learn to design and deploy autonomous AI agents for business automation.",
    level: "Advanced",
  },
  {
    id: "ai-mastery",
    title: "AI Mastery",
    price: 7500,
    description:
      "Master AI fundamentals, prompting techniques, and ethics for modern business.",
    level: "Intermediate",
  },
];

export default function HomePage() {
  return (
    <>
      <Header />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(localBusinessSchema),
        }}
      />

      <main>
        {/* Hero Section */}
        <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
          {/* Background overlays */}
          <div className="absolute inset-0 z-0">
            <div className="absolute inset-0 bg-gradient-to-b from-[var(--brand-dark)]/80 via-[var(--brand-dark)]/70 to-[var(--brand-dark)]"></div>
            <div className="absolute inset-0 bg-gradient-to-br from-[var(--brand-blue)]/20 via-transparent to-[var(--brand-cyan)]/10"></div>
          </div>

          {/* Floating metric cards */}
          <div className="absolute top-20 left-4 md:left-20 bg-[var(--brand-dark)]/80 backdrop-blur-md rounded-lg p-3 md:p-4 border border-white/10 animate-float z-10 hidden sm:block">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span className="text-xs text-gray-400">Revenue Growth</span>
            </div>
            <div className="text-xl md:text-2xl font-bold text-white mt-1">
              +47.5%
            </div>
          </div>

          <div
            className="absolute bottom-32 right-4 md:right-20 bg-[var(--brand-dark)]/80 backdrop-blur-md rounded-lg p-3 md:p-4 border border-white/10 animate-float z-10 hidden sm:block"
            style={{ animationDelay: "0.5s" }}
          >
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-[var(--brand-cyan)] rounded-full animate-pulse"></div>
              <span className="text-xs text-gray-400">Data Accuracy</span>
            </div>
            <div className="text-xl md:text-2xl font-bold text-white mt-1">
              99.2%
            </div>
          </div>

          {/* Hero content */}
          <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-5xl md:text-7xl font-bold text-white tracking-tight mb-6 drop-shadow-lg">
              Unlock Your Potential With <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--brand-cyan)] to-[var(--brand-blue)]">
                AI & Data Fluency
              </span>
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-10 leading-relaxed drop-shadow-md">
              We provide mentorship, training, and consultancy designed to turn
              raw data into actionable insights. Our approach ensures
              organizations not only understand their data but can apply it to
              drive informed decisions, optimize operations, and unlock tangible
              business value.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/assessment"
                className="px-8 py-4 bg-[var(--brand-cyan)] text-[var(--brand-dark)] rounded-full font-bold text-lg hover:bg-cyan-300 transition-all shadow-[0_0_20px_rgba(34,211,238,0.3)] hover:shadow-[0_0_30px_rgba(34,211,238,0.5)]"
              >
                Start Your Journey
              </Link>
              <a
                href="https://www.linkedin.com/company/106319269"
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-4 bg-white/10 backdrop-blur-sm border border-white/20 text-white rounded-full font-bold text-lg hover:bg-white/20 transition-all"
              >
                Learn More
              </a>
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section className="py-20 bg-[var(--brand-surface)]/50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {services.map((service, idx) => (
                <div
                  key={idx}
                  className="bg-[var(--brand-dark)] p-8 rounded-2xl border border-white/5 hover:border-[var(--brand-cyan)]/20 transition-all group"
                >
                  <div className="mb-6 p-4 bg-white/5 rounded-xl inline-block group-hover:bg-[var(--brand-cyan)]/10 transition-colors">
                    {service.icon}
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-3">
                    {service.title}
                  </h3>
                  <p className="text-gray-400">{service.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Courses Section */}
        <section id="courses" className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Master the Future
              </h2>
              <p className="text-gray-400">
                Industry-leading courses designed for real-world application.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {courses.map((course) => (
                <div
                  key={course.id}
                  className="bg-[var(--brand-surface)] border border-white/5 rounded-xl p-6 flex flex-col hover:border-[var(--brand-cyan)]/30 transition-all"
                >
                  <div className="mb-4">
                    <span className="text-xs font-semibold text-[var(--brand-cyan)] uppercase tracking-wider bg-[var(--brand-cyan)]/10 px-2 py-1 rounded">
                      {course.level}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">
                    {course.title}
                  </h3>
                  <p className="text-sm text-gray-400 mb-6 flex-grow">
                    {course.description}
                  </p>
                  <div className="flex items-center justify-between mt-4 pt-4 border-t border-white/5">
                    <span className="text-white font-mono font-bold">
                      KES {course.price.toLocaleString()}
                    </span>
                    <Link
                      href={`/courses/${course.id}`}
                      className="text-[var(--brand-cyan)] hover:text-white text-sm font-semibold flex items-center gap-1"
                    >
                      Enroll <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section className="py-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-gradient-to-br from-[var(--brand-surface)] to-[var(--brand-dark)] border border-white/10 rounded-3xl p-8 md:p-12 text-center">
              <h2 className="text-3xl font-bold text-white mb-8">
                Get in Touch
              </h2>
              <div className="flex flex-col md:flex-row justify-center gap-8 md:gap-16">
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 bg-[var(--brand-cyan)]/10 rounded-full flex items-center justify-center mb-4 text-[var(--brand-cyan)]">
                    <Phone className="w-6 h-6" />
                  </div>
                  <a
                    href="tel:+254706719457"
                    className="text-white font-medium hover:text-[var(--brand-cyan)] transition-colors"
                  >
                    +254 706 719 457
                  </a>
                </div>
                <div className="flex flex-col items-center">
                  <a
                    href="https://wa.me/254706719457"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 bg-green-500/10 rounded-full flex items-center justify-center mb-4 text-green-400 hover:bg-green-500/20 transition-colors"
                  >
                    <svg
                      className="w-6 h-6"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                    </svg>
                  </a>
                  <a
                    href="https://wa.me/254706719457"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white font-medium hover:text-green-400 transition-colors"
                  >
                    WhatsApp
                  </a>
                </div>
                <div className="flex flex-col items-center">
                  <a
                    href="mailto:hello@ubuntuanalytiq.com"
                    className="w-12 h-12 bg-[var(--brand-red)]/10 rounded-full flex items-center justify-center mb-4 text-[var(--brand-red)] hover:bg-[var(--brand-red)]/20 transition-colors"
                  >
                    <Mail className="w-6 h-6" />
                  </a>
                  <a
                    href="mailto:hello@ubuntuanalytiq.com"
                    className="text-white font-medium hover:text-[var(--brand-red)] transition-colors"
                  >
                    hello@ubuntuanalytiq.com
                  </a>
                </div>
                <div className="flex flex-col items-center">
                  <a
                    href="https://maps.google.com/?q=Nairobi,Kenya"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 bg-[var(--brand-blue)]/10 rounded-full flex items-center justify-center mb-4 text-[var(--brand-blue)] hover:bg-[var(--brand-blue)]/20 transition-colors"
                  >
                    <MapPin className="w-6 h-6" />
                  </a>
                  <a
                    href="https://maps.google.com/?q=Nairobi,Kenya"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white font-medium hover:text-[var(--brand-blue)] transition-colors"
                  >
                    Nairobi, Kenya
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
