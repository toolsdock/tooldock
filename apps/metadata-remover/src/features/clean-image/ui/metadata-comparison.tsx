'use client';
import { useI18n } from '@tools/i18n/provider';

import type { ProcessedImage } from '@/entities/image/model/types';
import { MetadataReportPanel } from './metadata-report';

export function MetadataComparison({ result }: { result: ProcessedImage }) {
	const { t } = useI18n();
	const verified =
		!result.before.warning &&
		!result.after.warning &&
		result.after.entries.length === 0;
	return (
		<div className="metadata-comparison">
			<div className="metadata-comparison-intro">
				<h3>{t('report.title')}</h3>
				<p>{t('report.copy')}</p>
			</div>
			<div className="metadata-comparison-grid">
				<MetadataReportPanel
					title={t('report.before')}
					report={result.before}
					variant="before"
				/>
				<MetadataReportPanel
					title={t('report.after')}
					report={result.after}
					variant="after"
				/>
			</div>
			<p
				className={`metadata-verdict ${verified ? 'metadata-verdict--success' : ''}`}
				role="status"
			>
				{verified
					? 'No supported embedded metadata detected in the output. Unknown or proprietary fields may not be recognized by the inspector.'
					: 'Inspection is incomplete or detected fields remain. Review the results before sharing.'}
			</p>
		</div>
	);
}
