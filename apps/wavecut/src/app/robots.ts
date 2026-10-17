import type { MetadataRoute } from 'next';
import { SITE_URL, IS_PRODUCTION_SITE } from '@/shared/config/site';
export default function robots(): MetadataRoute.Robots {
	return {
		rules: {
			userAgent: '*',
			allow: IS_PRODUCTION_SITE ? '/' : undefined,
			disallow: IS_PRODUCTION_SITE ? undefined : '/',
		},
		sitemap: IS_PRODUCTION_SITE ? `${SITE_URL}/sitemap.xml` : undefined,
	};
}
