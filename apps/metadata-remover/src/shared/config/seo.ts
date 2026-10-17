import type { Metadata } from 'next';
import type { Locale } from '@tools/i18n/locale';
import { site } from './site';
const copy = {
	en: {
		title: 'Remove Image Metadata Online \u2014 Free & Private | Clearframe',
		description:
			'Remove EXIF, GPS, XMP and other supported embedded metadata from JPG, PNG and WebP images privately in your browser. Free, no upload required.',
	},
	ru: {
		title: '\u0423\u0434\u0430\u043b\u0438\u0442\u044c \u043c\u0435\u0442\u0430\u0434\u0430\u043d\u043d\u044b\u0435 \u0444\u043e\u0442\u043e \u043e\u043d\u043b\u0430\u0439\u043d \u2014 \u0431\u0435\u0441\u043f\u043b\u0430\u0442\u043d\u043e | Clearframe',
		description:
			'\u0423\u0434\u0430\u043b\u044f\u0439\u0442\u0435 EXIF, GPS, XMP \u0438 \u0434\u0440\u0443\u0433\u0438\u0435 \u043f\u043e\u0434\u0434\u0435\u0440\u0436\u0438\u0432\u0430\u0435\u043c\u044b\u0435 \u043c\u0435\u0442\u0430\u0434\u0430\u043d\u043d\u044b\u0435 JPG, PNG \u0438 WebP \u043f\u0440\u044f\u043c\u043e \u0432 \u0431\u0440\u0430\u0443\u0437\u0435\u0440\u0435. \u0411\u0435\u0441\u043f\u043b\u0430\u0442\u043d\u043e, \u0431\u0435\u0437 \u0437\u0430\u0433\u0440\u0443\u0437\u043a\u0438 \u043d\u0430 \u0441\u0435\u0440\u0432\u0435\u0440.',
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
