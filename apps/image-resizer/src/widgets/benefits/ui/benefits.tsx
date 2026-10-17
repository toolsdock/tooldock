'use client';
import { Images, ShieldCheck, SlidersHorizontal } from 'lucide-react';
import { useI18n } from '@tools/i18n/provider';
const icons = [Images, SlidersHorizontal, ShieldCheck];
export function Benefits() {
	const { t } = useI18n();
	return (
		<section className="benefits" id="features">
			<div className="container">
				<div className="section-heading">
					<span className="section-kicker">
						{t('benefits.kicker')}
					</span>
					<h2>
						{t('benefits.title')} <em>{t('benefits.em')}</em>
					</h2>
					<p>{t('benefits.copy')}</p>
				</div>
				<div className="benefits-grid">
					{icons.map((Icon, i) => (
						<article className="benefit-card" key={i}>
							<span
								className={`benefit-icon benefit-icon--${['blue', 'mint', 'peach'][i]}`}
							>
								<Icon size={26} />
							</span>
							<h3>{t(`benefits.${i + 1}.title`)}</h3>
							<p>{t(`benefits.${i + 1}.copy`)}</p>
						</article>
					))}
				</div>
			</div>
		</section>
	);
}
