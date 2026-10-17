'use client';
import { Container } from '@tools/ui/container';
import { Sparkles, ShieldCheck } from 'lucide-react';
import { useI18n } from '@tools/i18n/provider';
import { ImageCleaner } from '@/features/clean-image/ui/image-cleaner';
export function Hero() {
	const { t } = useI18n();
	return (
		<section className="hero" id="tool">
			<span className="hero-glow hero-glow--left" />
			<span className="hero-glow hero-glow--right" />
			<Container className="hero-inner">
				<span className="eyebrow">
					<Sparkles size={15} />
					{t('hero.badge')}
				</span>
				<h1>
					{t('hero.title')}
					<br />
					<span>{t('hero.em')}</span>
				</h1>
				<p className="hero-copy">{t('hero.copy')}</p>
				<ImageCleaner />
				<div className="hero-trust">
					<span>
						<ShieldCheck size={16} />
						{t('trust.private')}
					</span>
					<i />
					<span>{t('trust.browser')}</span>
					<i />
					<span>{t('trust.free')}</span>
				</div>
			</Container>
		</section>
	);
}
