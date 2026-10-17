'use client';
import { Container } from '@tools/ui/container';
import { useI18n } from '@tools/i18n/provider';
export function FAQ() {
	const { t } = useI18n();
	return (
		<section className="faq-section" id="faq">
			<Container className="faq-container">
				<div className="section-heading">
					<span className="section-kicker">{t('faq.kicker')}</span>
					<h2>
						{t('faq.title')} <em>{t('faq.em')}</em>
					</h2>
				</div>
				<div className="faq-list">
					{Array.from({ length: 5 }, (_, i) => i + 1).map((id) => (
						<details key={id}>
							<summary>
								{t(`faq.${id}.q`)}
								<span aria-hidden="true">+</span>
							</summary>
							<p>{t(`faq.${id}.a`)}</p>
						</details>
					))}
				</div>
			</Container>
		</section>
	);
}
