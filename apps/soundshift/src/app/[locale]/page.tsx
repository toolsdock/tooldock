import { notFound } from 'next/navigation';
import { isLocale } from '@tools/i18n/locale';
import { HomeView } from '@/views/home/ui/home-view';
import { messages } from '@/shared/i18n/messages';
import { SITE_URL } from '@/shared/config/site';

export default async function Page({
	params,
}: {
	params: Promise<{ locale: string }>;
}) {
	const { locale } = await params;
	if (!isLocale(locale)) notFound();

	const t = messages[locale];
	const url = `${SITE_URL}/${locale}`;
	const graph = {
		'@context': 'https://schema.org',
		'@graph': [
			{
				'@type': 'WebApplication',
				'@id': `${url}#app`,
				name: 'Soundshift Audio Converter',
				url,
				applicationCategory: 'MultimediaApplication',
				operatingSystem: 'Web',
				inLanguage: locale,
				description: t.subtitle,
				browserRequirements:
					'Requires JavaScript and WebAssembly support',
				offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
			},
			{
				'@type': 'FAQPage',
				'@id': `${url}#faq`,
				mainEntity: [1, 2, 3, 4].map((index) => ({
					'@type': 'Question',
					name: t[`q${index}`],
					acceptedAnswer: { '@type': 'Answer', text: t[`a${index}`] },
				})),
			},
		],
	};

	return (
		<>
			<script
				type="application/ld+json"
				dangerouslySetInnerHTML={{
					__html: JSON.stringify(graph).replace(/</g, '\u003c'),
				}}
			/>
			<HomeView locale={locale} />
		</>
	);
}
