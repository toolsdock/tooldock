'use client';
import { ShieldCheck, Zap } from 'lucide-react';
import { Resizer } from '@/features/resize-image/ui/resizer';
import { useI18n } from '@tools/i18n/provider';
export function Hero() {
	const { t } = useI18n();
	return (
		<section className="hero" id="tool">
			<div className="hero-glow hero-glow--left" />
			<div className="hero-glow hero-glow--right" />
			<div className="container hero-inner">
				<span className="eyebrow">{t('hero.badge')}</span>
				<h1>
					{t('hero.title')} <span>{t('hero.em')}</span>
				</h1>
				<p className="hero-copy">{t('hero.copy')}</p>
				<Resizer />
				<div className="hero-trust">
					<span>
						<ShieldCheck size={16} />
						{t('hero.trust1')}
					</span>
					<i />
					<span>
						<Zap size={16} />
						{t('hero.trust2')}
					</span>
					<i />
					<span>{t('hero.trust3')}</span>
				</div>
			</div>
		</section>
	);
}
