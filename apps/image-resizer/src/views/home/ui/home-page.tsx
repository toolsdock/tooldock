import { AdSlot } from '@tools/ads/slot';
import type { Locale } from '@tools/i18n/locale';
import { Header } from '@/widgets/header/ui/header';
import { Hero } from '@/widgets/hero/ui/hero';
import { Benefits } from '@/widgets/benefits/ui/benefits';
import { HowItWorks } from '@/widgets/how-it-works/ui/how-it-works';
import { Faq } from '@/widgets/faq/ui/faq';
import { Footer } from '@/widgets/footer/ui/footer';
export function HomePage({ locale }: { locale: Locale }) {
	return (
		<>
			<Header />
			<main>
				<Hero />
				<AdSlot placement="primary" locale={locale} />
				<Benefits />
				<HowItWorks />
				<AdSlot placement="secondary" locale={locale} />
				<Faq />
			</main>
			<Footer />
		</>
	);
}
