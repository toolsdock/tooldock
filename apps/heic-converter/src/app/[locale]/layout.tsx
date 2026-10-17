import type { ReactNode } from 'react';
import { notFound } from 'next/navigation';
import { ThemeProvider } from '@tools/theme/provider';
import { I18nProvider } from '@tools/i18n/provider';
import { isLocale } from '@tools/i18n/locale';
import { messages } from '@/shared/i18n/messages';
import { seoFor } from '@/shared/config/seo';
export function generateStaticParams() {
	return [{ locale: 'en' }, { locale: 'ru' }];
}
export async function generateMetadata({
	params,
}: {
	params: Promise<{ locale: string }>;
}) {
	const { locale } = await params;
	if (!isLocale(locale)) return {};
	return seoFor(locale);
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
		<ThemeProvider storageKey="skyconvert-theme">
			<I18nProvider locale={locale} messages={messages[locale]}>
				{children}
			</I18nProvider>
		</ThemeProvider>
	);
}
