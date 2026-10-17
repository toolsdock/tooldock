'use client';
import { AdSlot } from '@tools/ads/slot';
import type { Locale } from '@tools/i18n/locale';
import { useI18n } from '@tools/i18n/provider';
import { Upload, SlidersHorizontal, Download } from 'lucide-react';
const steps = [
	{ Icon: Upload, title: 'how1', description: 'how1d' },
	{ Icon: SlidersHorizontal, title: 'how2', description: 'how2d' },
	{ Icon: Download, title: 'how3', description: 'how3d' },
] as const;
export function Info({ locale }: { locale: Locale }) {
	const { t } = useI18n();
	return (
		<>
			<section className="info wrap">
				<h2>{t('howTitle')}</h2>
				<div className="step-grid">
					{steps.map(({ Icon, title, description }, i) => (
						<article className="step" key={title}>
							<div className="step-icon">
								<Icon size={21} />
							</div>
							<span className="step-number">0{i + 1}</span>
							<h3>{t(title)}</h3>
							<p>{t(description)}</p>
						</article>
					))}
				</div>
			</section>
			<AdSlot placement="secondary" locale={locale} />
			<section className="faq wrap">
				<h2>{t('faqTitle')}</h2>
				{[1, 2, 3].map((i) => (
					<details key={i}>
						<summary>{t(`q${i}`)}</summary>
						<p>{t(`a${i}`)}</p>
					</details>
				))}
			</section>
		</>
	);
}
