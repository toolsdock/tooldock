import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import { notFound } from 'next/navigation';
import { I18nProvider } from '@tools/i18n/provider';
import { isLocale } from '@tools/i18n/locale';
import { ThemeProvider } from '@tools/theme/provider';
import { IS_INDEXABLE, SITE_URL } from '@/shared/config/site';
import { messages } from '@/shared/i18n/messages';

const seo = {
	en: {
		title: 'Audio Converter Online – MP3, WAV, FLAC & OGG | Soundshift',
		description:
			'Convert audio online to MP3, WAV, FLAC or OGG in your browser. Batch conversion, quality controls, no account, and no audio uploads.',
	},
	ru: {
		title: 'Конвертер аудио онлайн — MP3, WAV, FLAC и OGG | Soundshift',
		description:
			'Конвертируй аудио онлайн в MP3, WAV, FLAC или OGG прямо в браузере. Пакетная обработка, настройка качества и без загрузки файлов на сервер.',
	},
} as const;

export async function generateMetadata({
	params,
}: {
	params: Promise<{ locale: string }>;
}): Promise<Metadata> {
	const { locale } = await params;
	if (!isLocale(locale)) return {};

	const url = `${SITE_URL}/${locale}`;
	const current = seo[locale];

	return {
		metadataBase: new URL(SITE_URL),
		title: current.title,
		description: current.description,
		applicationName: 'Soundshift',
		alternates: {
			canonical: url,
			languages: {
				en: `${SITE_URL}/en`,
				ru: `${SITE_URL}/ru`,
				'x-default': `${SITE_URL}/en`,
			},
		},
		openGraph: {
			title: current.title,
			description: current.description,
			url,
			siteName: 'Soundshift',
			type: 'website',
			locale: locale === 'ru' ? 'ru_RU' : 'en_US',
		},
		twitter: {
			card: 'summary',
			title: current.title,
			description: current.description,
		},
		robots: IS_INDEXABLE
			? {
					index: true,
					follow: true,
					googleBot: { index: true, follow: true },
				}
			: { index: false, follow: false, noarchive: true },
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
		<ThemeProvider storageKey="soundshift-theme">
			<I18nProvider locale={locale} messages={messages[locale]}>
				{children}
			</I18nProvider>
		</ThemeProvider>
	);
}
