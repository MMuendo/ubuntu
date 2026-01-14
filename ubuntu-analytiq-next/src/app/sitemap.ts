import { MetadataRoute } from 'next';

// Blog post slugs - in production, fetch from CMS/database
const blogPosts = [
    { slug: 'phoenix-ai-summit-2025', lastModified: '2025-02-15' },
    { slug: 'why-excel-matters', lastModified: '2025-01-10' },
    { slug: 'colleagues-friends', lastModified: '2024-12-25' },
];

// Course slugs
const courses = [
    { slug: 'excel-workshop', lastModified: '2024-12-01' },
    { slug: 'powerbi-workshop', lastModified: '2024-12-01' },
    { slug: 'ai-agents-masterclass', lastModified: '2024-12-01' },
    { slug: 'ai-mastery', lastModified: '2024-12-01' },
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const baseUrl = 'https://ubuntuanalytiq.com';

    // Static pages with SEO priority
    const staticPages: MetadataRoute.Sitemap = [
        {
            url: baseUrl,
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 1,
        },
        {
            url: `${baseUrl}/assessment`,
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.9,
        },
        {
            url: `${baseUrl}/agentic-ai`,
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.8,
        },
        {
            url: `${baseUrl}/blog`,
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 0.8,
        },
        {
            url: `${baseUrl}/enroll`,
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.7,
        },
        {
            url: `${baseUrl}/consultation`,
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.7,
        },
    ];

    // Dynamic blog posts
    const blogPages: MetadataRoute.Sitemap = blogPosts.map((post) => ({
        url: `${baseUrl}/blog/${post.slug}`,
        lastModified: new Date(post.lastModified),
        changeFrequency: 'monthly' as const,
        priority: 0.6,
    }));

    // Dynamic course pages
    const coursePages: MetadataRoute.Sitemap = courses.map((course) => ({
        url: `${baseUrl}/courses/${course.slug}`,
        lastModified: new Date(course.lastModified),
        changeFrequency: 'monthly' as const,
        priority: 0.8,
    }));

    return [...staticPages, ...blogPages, ...coursePages];
}
