import type { MetadataRoute } from 'next';
import { site } from '@/shared/config/site';
export default function sitemap(): MetadataRoute.Sitemap {
	if (site.url.endsWith('.invalid')) return [];
	const languages = { en: `${site.url}/en`, ru: `${site.url}/ru` };
	return (['en', 'ru'] as const).map((locale) => ({
		url: languages[locale],
		changeFrequency: 'monthly',
		priority: 1,
		alternates: { languages: { ...languages, 'x-default': languages.en } },
	}));
}
