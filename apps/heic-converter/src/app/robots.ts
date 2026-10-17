import type { MetadataRoute } from 'next';
import { site } from '@/shared/config/site';
export default function robots(): MetadataRoute.Robots {
	const live = !site.url.endsWith('.invalid');
	return {
		rules: {
			userAgent: '*',
			...(live ? { allow: '/' } : { disallow: '/' }),
		},
		...(live ? { sitemap: `${site.url}/sitemap.xml` } : {}),
	};
}
