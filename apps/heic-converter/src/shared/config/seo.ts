import type { Metadata } from 'next';
import type { Locale } from '@tools/i18n/locale';
import { site } from './site';
const copy = {
	en: {
		title: 'HEIC to JPG & PNG Converter \u2014 Free Online | Skyconvert',
		description:
			'Convert HEIC and HEIF iPhone photos to JPG or PNG online. Batch conversion in your browser, with no upload and no signup.',
	},
	ru: {
		title: '\u041a\u043e\u043d\u0432\u0435\u0440\u0442\u0435\u0440 HEIC \u0432 JPG \u0438 PNG \u043e\u043d\u043b\u0430\u0439\u043d | Skyconvert',
		description:
			'\u041a\u043e\u043d\u0432\u0435\u0440\u0442\u0438\u0440\u0443\u0439\u0442\u0435 HEIC \u0438 HEIF \u0444\u043e\u0442\u043e\u0433\u0440\u0430\u0444\u0438\u0438 \u0441 iPhone \u0432 JPG \u0438\u043b\u0438 PNG \u043f\u0440\u044f\u043c\u043e \u0432 \u0431\u0440\u0430\u0443\u0437\u0435\u0440\u0435. \u041f\u0430\u043a\u0435\u0442\u043d\u0430\u044f \u043e\u0431\u0440\u0430\u0431\u043e\u0442\u043a\u0430 \u0431\u0435\u0437 \u0440\u0435\u0433\u0438\u0441\u0442\u0440\u0430\u0446\u0438\u0438 \u0438 \u043e\u0442\u043f\u0440\u0430\u0432\u043a\u0438 \u0444\u0430\u0439\u043b\u043e\u0432.',
	},
} as const;
export function seoFor(locale: Locale): Metadata {
	const url = `${site.url}/${locale}`;
	const alternates = { en: `${site.url}/en`, ru: `${site.url}/ru` };
	return {
		metadataBase: new URL(site.url),
		title: copy[locale].title,
		description: copy[locale].description,
		alternates: {
			canonical: url,
			languages: { ...alternates, 'x-default': `${site.url}/en` },
		},
		openGraph: {
			type: 'website',
			locale: locale === 'ru' ? 'ru_RU' : 'en_US',
			alternateLocale: [locale === 'ru' ? 'en_US' : 'ru_RU'],
			url,
			title: copy[locale].title,
			description: copy[locale].description,
			siteName: site.name,
		},
		robots: site.url.endsWith('.invalid')
			? { index: false, follow: false }
			: { index: true, follow: true },
	};
}
export { copy as seoCopy };
