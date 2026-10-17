import type { MetadataRoute } from 'next';
import { IS_INDEXABLE, SITE_URL } from '@/shared/config/site';

export default function sitemap(): MetadataRoute.Sitemap {
	if (!IS_INDEXABLE) return [];

	return ['en', 'ru'].map((locale) => ({
		url: `${SITE_URL}/${locale}`,
		changeFrequency: 'monthly' as const,
		priority: 1,
		alternates: {
			languages: {
				en: `${SITE_URL}/en`,
				ru: `${SITE_URL}/ru`,
			},
		},
	}));
}
