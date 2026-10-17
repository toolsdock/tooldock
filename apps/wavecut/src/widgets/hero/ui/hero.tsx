'use client';
import { Sparkles, ShieldCheck, BadgeCheck, AudioLines } from 'lucide-react';
import { useI18n } from '@tools/i18n/provider';
export function Hero() {
	const { t } = useI18n();
	return (
		<section className="hero wrap">
			<div className="eyebrow">
				<Sparkles size={14} />
				{t('badge')}
			</div>
			<h1>
				{t('headline')}
				<br />
				<span>{t('headlineAccent')}</span>
			</h1>
			<p className="hero-copy">{t('subtitle')}</p>
			<div className="hero-trust">
				<span>
					<ShieldCheck size={16} />
					{t('privacy')}
				</span>
				<i />
				<span>
					<BadgeCheck size={16} />
					{t('free')}
				</span>
				<i />
				<span>
					<AudioLines size={16} />
					{t('quality')}
				</span>
			</div>
		</section>
	);
}
