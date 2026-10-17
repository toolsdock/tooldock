'use client';

import { AdSlot } from '@tools/ads/slot';
import type { Locale } from '@tools/i18n/locale';
import { Download, FileAudio2, SlidersHorizontal } from 'lucide-react';
import { useI18n } from '@tools/i18n/provider';

const steps = [
	{ Icon: FileAudio2, title: 'how1', description: 'how1d' },
	{ Icon: SlidersHorizontal, title: 'how2', description: 'how2d' },
	{ Icon: Download, title: 'how3', description: 'how3d' },
] as const;

const formats = [
	['mp3Title', 'mp3Text'],
	['wavTitle', 'wavText'],
	['flacTitle', 'flacText'],
	['oggTitle', 'oggText'],
] as const;

export function Info({ locale }: { locale: Locale }) {
	const { t } = useI18n();
	return (
		<>
			<section className="info wrap">
				<div className="section-heading centered">
					<h2>{t('howTitle')}</h2>
					<p>{t('howSubtitle')}</p>
				</div>
				<div className="step-grid">
					{steps.map(({ Icon, title, description }, index) => (
						<article className="step" key={title}>
							<div className="step-icon">
								<Icon size={21} />
							</div>
							<span className="step-number">0{index + 1}</span>
							<h3>{t(title)}</h3>
							<p>{t(description)}</p>
						</article>
					))}
				</div>
			</section>

			<section className="formats-section wrap">
				<div className="section-heading centered">
					<h2>{t('formatTitle')}</h2>
				</div>
				<div className="format-grid">
					{formats.map(([title, copy]) => (
						<article className="format-card" key={title}>
							<span className="format-pill">{t(title)}</span>
							<p>{t(copy)}</p>
						</article>
					))}
				</div>
			</section>

			<AdSlot placement="secondary" locale={locale} />

			<section className="faq wrap">
				<div className="section-heading centered">
					<h2>{t('faqTitle')}</h2>
				</div>
				{[1, 2, 3, 4].map((index) => (
					<details key={index}>
						<summary>{t(`q${index}`)}</summary>
						<p>{t(`a${index}`)}</p>
					</details>
				))}
			</section>
		</>
	);
}
