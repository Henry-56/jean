
import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://jeansnekears.com';

    return {
        rules: {
            userAgent: '*',
            allow: '/',
            disallow: '/admin/', // Proteger panel de admin de indexación
        },
        sitemap: `${baseUrl}/sitemap.xml`,
    };
}
