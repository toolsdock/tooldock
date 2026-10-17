'use client';
import { Container } from '@tools/ui/container';
import { LockKeyhole, Layers3, HeartHandshake } from 'lucide-react';
import { useI18n } from '@tools/i18n/provider';
const items = [
	{ Icon: LockKeyhole, tone: 'blue', id: 1 },
	{ Icon: Layers3, tone: 'mint', id: 2 },
	{ Icon: HeartHandshake, tone: 'peach', id: 3 },
];
export function Benefits() {
	const { t } = useI18n();
	return (
		<section className="benefits">
			<Container>
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
					{items.map(({ Icon, tone, id }) => (
						<article className="benefit-card" key={id}>
							<div
								className={`benefit-icon benefit-icon--${tone}`}
							>
								<Icon size={26} />
							</div>
							<h3>{t(`benefit.${id}.title`)}</h3>
							<p>{t(`benefit.${id}.copy`)}</p>
						</article>
					))}
				</div>
			</Container>
		</section>
	);
}
