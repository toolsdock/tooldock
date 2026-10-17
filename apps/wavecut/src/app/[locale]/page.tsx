import { notFound } from 'next/navigation';
import { isLocale } from '@tools/i18n/locale';
import { SITE_URL } from '@/shared/config/site';
import { HomeView } from '@/views/home/ui/home-view';
import { messages } from '@/shared/i18n/messages';
export default async function Page({
	params,
}: {
	params: Promise<{ locale: string }>;
}) {
	const { locale } = await params;
	if (!isLocale(locale)) notFound();
	const t = messages[locale];
	const structured = {
		'@context': 'https://schema.org',
		'@type': 'WebApplication',
		name: 'Wavecut Audio Cutter',
		url: `${SITE_URL}/${locale}`,
		applicationCategory: 'MultimediaApplication',
		operatingSystem: 'Web',
		inLanguage: locale,
		description: t.subtitle,
		offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
	};
	return (
		<>
			<script
				type="application/ld+json"
				dangerouslySetInnerHTML={{
					__html: JSON.stringify(structured).replace(/</g, '\u003c'),
				}}
			/>
			<HomeView locale={locale} />
		</>
	);
}
