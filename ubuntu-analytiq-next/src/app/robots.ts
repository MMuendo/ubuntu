import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
    return {
        rules: [
            {
                userAgent: '*',
                allow: '/',
                disallow: [
                    '/admin/',
                    '/dashboard/',
                    '/checkout/',
                    '/login/',
                    '/signup/',
                    '/reset-password/',
                    '/api/',
                ],
            },
        ],
        sitemap: 'https://ubuntuanalytiq.com/sitemap.xml',
    };
}
