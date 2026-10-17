import type { ReactNode } from 'react';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { I18nProvider } from '@tools/i18n/provider';
import { isLocale } from '@tools/i18n/locale';
import { ThemeProvider } from '@tools/theme/provider';
import { messages } from '@/shared/i18n/messages';
import { SITE_URL } from '@/shared/config/site';
const seo = {
	en: {
		title: 'Audio Cutter Online – Trim Audio Privately | Wavecut',
		description:
			'Trim audio online for free. Select, preview and export audio clips as WAV directly in your browser. No upload or account needed.',
	},
	ru: {
		title: 'Обрезать аудио онлайн бесплатно — Wavecut',
		description:
			'Бесплатная обрезка аудио онлайн: выдели фрагмент, прослушай и скачай WAV. Без загрузки файлов на сервер и регистрации.',
	},
};
export async function generateMetadata({
	params,
}: {
	params: Promise<{ locale: string }>;
}): Promise<Metadata> {
	const { locale } = await params;
	if (!isLocale(locale)) return {};
	const url = `${SITE_URL}/${locale}`;
	const s = seo[locale];
	return {
		metadataBase: new URL(SITE_URL),
		title: s.title,
		description: s.description,
		alternates: {
			canonical: url,
			languages: {
				en: `${SITE_URL}/en`,
				ru: `${SITE_URL}/ru`,
				'x-default': `${SITE_URL}/en`,
			},
		},
		openGraph: {
			title: s.title,
			description: s.description,
			url,
			siteName: 'Wavecut',
			type: 'website',
			locale: locale === 'ru' ? 'ru_RU' : 'en_US',
		},
		robots: SITE_URL.includes('.invalid')
			? { index: false, follow: false }
			: { index: true, follow: true },
	};
}
export default async function LocaleLayout({
	children,
	params,
}: {
	children: ReactNode;
	params: Promise<{ locale: string }>;
}) {
	const { locale } = await params;
	if (!isLocale(locale)) notFound();
	return (
		<ThemeProvider storageKey="wavecut-theme">
			<I18nProvider locale={locale} messages={messages[locale]}>
				{children}
			</I18nProvider>
		</ThemeProvider>
	);
}
