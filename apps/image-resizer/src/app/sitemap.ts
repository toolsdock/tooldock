import type { MetadataRoute } from 'next';
import { site } from '@/shared/config/site';
export default function sitemap(): MetadataRoute.Sitemap {
	return site.isConfigured
		? (['en', 'ru'] as const).map((locale) => ({
				url: `${site.url}/${locale}`,
				lastModified: new Date(),
				changeFrequency: 'monthly',
				priority: 1,
				alternates: {
					languages: { en: `${site.url}/en`, ru: `${site.url}/ru` },
				},
			}))
		: [];
}
