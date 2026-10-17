import type { MetadataRoute } from 'next';
import { SITE_URL, IS_PRODUCTION_SITE } from '@/shared/config/site';
export default function sitemap(): MetadataRoute.Sitemap {
	if (!IS_PRODUCTION_SITE) return [];
	return (['en', 'ru'] as const).map((locale) => ({
		url: `${SITE_URL}/${locale}`,
		alternates: {
			languages: { en: `${SITE_URL}/en`, ru: `${SITE_URL}/ru` },
		},
	}));
}
