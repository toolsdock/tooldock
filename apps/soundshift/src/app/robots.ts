import type { MetadataRoute } from 'next';
import { IS_INDEXABLE, SITE_URL } from '@/shared/config/site';

export default function robots(): MetadataRoute.Robots {
	if (!IS_INDEXABLE) {
		return { rules: [{ userAgent: '*', disallow: '/' }] };
	}

	return {
		rules: [{ userAgent: '*', allow: '/' }],
		sitemap: `${SITE_URL}/sitemap.xml`,
	};
}
