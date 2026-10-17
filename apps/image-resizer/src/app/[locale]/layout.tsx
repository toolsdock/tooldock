import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { I18nProvider } from '@tools/i18n/provider';
import { ThemeProvider } from '@tools/theme/provider';
import { isLocale, locales } from '@tools/i18n/locale';
import { messages } from '@/shared/i18n/messages';
import { site } from '@/shared/config/site';

type Props = { children: React.ReactNode; params: Promise<{ locale: string }> };
export function generateStaticParams() {
	return locales.map((locale) => ({ locale }));
}
export async function generateMetadata({
	params,
}: {
	params: Promise<{ locale: string }>;
}): Promise<Metadata> {
	const { locale } = await params;
	if (!isLocale(locale)) return {};
	const title =
		locale === 'ru'
			? 'Изменить размер изображений онлайн — JPG, PNG, WebP | Leafsize'
			: site.title;
	const description =
		locale === 'ru'
			? 'Бесплатно изменяйте размеры JPG, PNG и WebP пакетно прямо в браузере. Без регистрации и отправки фотографий на сервер.'
			: site.description;
	const canonical = `${site.url}/${locale}`;
	return {
		metadataBase: new URL(site.url),
		title,
		description,
		alternates: {
			canonical,
			languages: {
				en: `${site.url}/en`,
				ru: `${site.url}/ru`,
				'x-default': `${site.url}/en`,
			},
		},
		openGraph: {
			title,
			description,
			url: canonical,
			siteName: site.name,
			type: 'website',
			locale: locale === 'ru' ? 'ru_RU' : 'en_US',
			alternateLocale: locale === 'ru' ? ['en_US'] : ['ru_RU'],
		},
		robots: { index: site.isConfigured, follow: true },
	};
}
export default async function LocaleLayout({ children, params }: Props) {
	const { locale } = await params;
	if (!isLocale(locale)) notFound();
	return (
		<ThemeProvider storageKey="leafsize-theme">
			<I18nProvider locale={locale} messages={messages[locale]}>
				{children}
			</I18nProvider>
		</ThemeProvider>
	);
}
