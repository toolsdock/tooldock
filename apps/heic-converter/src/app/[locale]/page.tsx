import { HomePage } from '@/views/home/ui/home-page';
import { isLocale } from '@tools/i18n/locale';
import { notFound } from 'next/navigation';
import { site } from '@/shared/config/site';
import { seoCopy } from '@/shared/config/seo';
export default async function Page({
	params,
}: {
	params: Promise<{ locale: string }>;
}) {
	const { locale } = await params;
	if (!isLocale(locale)) notFound();
	const data = {
		'@context': 'https://schema.org',
		'@type': 'WebApplication',
		name: site.name,
		url: `${site.url}/${locale}`,
		description: seoCopy[locale].description,
		applicationCategory: 'MultimediaApplication',
		operatingSystem: 'Any',
		inLanguage: locale,
		offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
	};
	return (
		<>
			<script
				type="application/ld+json"
				dangerouslySetInnerHTML={{
					__html: JSON.stringify(data).replace(/</g, '\\u003c'),
				}}
			/>
			<HomePage locale={locale} />
		</>
	);
}
