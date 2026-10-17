import type { MetadataRoute } from 'next';
import { site } from '@/shared/config/site';
export default function robots(): MetadataRoute.Robots {
	return {
		rules: site.isConfigured
			? { userAgent: '*', allow: '/' }
			: { userAgent: '*', disallow: '/' },
		...(site.isConfigured ? { sitemap: `${site.url}/sitemap.xml` } : {}),
	};
}
