import { AdSlot } from '@tools/ads/slot';
import type { Locale } from '@tools/i18n/locale';
import { Header } from '@/widgets/header/ui/header';
import { Hero } from '@/widgets/hero/ui/hero';
import { AudioCutter } from '@/features/cut-audio/ui/audio-cutter';
import { Info } from '@/widgets/info/ui/info';
export function HomeView({ locale }: { locale: Locale }) {
	return (
		<>
			<div className="top-glow">
				<Header />
				<main>
					<Hero />
					<AudioCutter />
					<AdSlot placement="primary" locale={locale} />
					<Info locale={locale} />
				</main>
			</div>
			<footer className="footer">
				© {new Date().getFullYear()} Wavecut
			</footer>
		</>
	);
}
