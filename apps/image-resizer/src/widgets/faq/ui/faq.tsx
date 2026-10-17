'use client';
import { useI18n } from '@tools/i18n/provider';
export function Faq() {
	const { t } = useI18n();
	return (
		<section className="faq-section" id="faq">
			<div className="container faq-container">
				<div className="section-heading">
					<span className="section-kicker">{t('faq.kicker')}</span>
					<h2>{t('faq.title')}</h2>
				</div>
				<div className="faq-list">
					{[1, 2, 3, 4, 5].map((i) => (
						<details key={i}>
							<summary>
								{t(`faq.${i}.q`)}
								<span>+</span>
							</summary>
							<p>{t(`faq.${i}.a`)}</p>
						</details>
					))}
				</div>
			</div>
		</section>
	);
}
