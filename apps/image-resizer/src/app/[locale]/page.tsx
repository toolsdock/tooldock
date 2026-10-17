import { notFound } from 'next/navigation';
import { isLocale } from '@tools/i18n/locale';
import { site } from '@/shared/config/site';
import { HomePage } from '@/views/home/ui/home-page';
export default async function Page({
	params,
}: {
	params: Promise<{ locale: string }>;
}) {
	const { locale } = await params;
	if (!isLocale(locale)) notFound();
	const structuredData = {
		'@context': 'https://schema.org',
		'@type': 'WebApplication',
		name: 'Leafsize',
		url: `${site.url}/${locale}`,
		applicationCategory: 'MultimediaApplication',
		operatingSystem: 'Any',
		isAccessibleForFree: true,
		inLanguage: locale,
		description:
			locale === 'ru'
				? 'Бесплатное пакетное изменение размера изображений JPG, PNG и WebP прямо в браузере.'
				: site.description,
		offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
	};
	return (
		<>
			<script
				type="application/ld+json"
				dangerouslySetInnerHTML={{
					__html: JSON.stringify(structuredData).replace(
						/</g,
						'\\u003c',
					),
				}}
			/>
			<HomePage locale={locale} />
		</>
	);
}
