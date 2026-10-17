'use client';
import { useI18n } from '@tools/i18n/provider';
export function HowItWorks() {
	const { t } = useI18n();
	return (
		<section className="steps-section" id="how-it-works">
			<div className="container">
				<div className="section-heading">
					<span className="section-kicker">{t('steps.kicker')}</span>
					<h2>{t('steps.title')}</h2>
				</div>
				<div className="steps-grid">
					{[1, 2, 3].map((i) => (
						<div className="step" key={i}>
							<span className="step-number">0{i}</span>
							<h3>{t(`steps.${i}.title`)}</h3>
							<p>{t(`steps.${i}.copy`)}</p>
						</div>
					))}
				</div>
			</div>
		</section>
	);
}
