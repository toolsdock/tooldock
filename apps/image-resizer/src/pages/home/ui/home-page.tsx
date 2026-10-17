import { Header } from '@/widgets/header/ui/header';
import { Hero } from '@/widgets/hero/ui/hero';
import { Benefits } from '@/widgets/benefits/ui/benefits';
import { HowItWorks } from '@/widgets/how-it-works/ui/how-it-works';
import { Faq } from '@/widgets/faq/ui/faq';
import { Footer } from '@/widgets/footer/ui/footer';
export function HomePage() {
	return (
		<>
			<Header />
			<main>
				<Hero />
				<Benefits />
				<HowItWorks />
				<Faq />
			</main>
			<Footer />
		</>
	);
}
