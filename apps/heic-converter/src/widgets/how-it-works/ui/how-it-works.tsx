'use client';
import { Container } from '@tools/ui/container';
import { useI18n } from '@tools/i18n/provider';
export function HowItWorks() {
	const { t } = useI18n();
	return (
		<section className="steps-section" id="how-it-works">
			<Container>
				<div className="section-heading">
					<span className="section-kicker">{t('steps.kicker')}</span>
					<h2>
						{t('steps.title')} <em>{t('steps.em')}</em>
					</h2>
				</div>
				<div className="steps-grid">
					{[1, 2, 3].map((id) => (
						<article className="step" key={id}>
							<span className="step-number">0{id}</span>
							<h3>{t(`step.${id}.title`)}</h3>
							<p>{t(`step.${id}.copy`)}</p>
						</article>
					))}
				</div>
			</Container>
		</section>
	);
}
