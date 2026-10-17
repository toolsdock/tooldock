'use client';
import { useI18n } from '@tools/i18n/provider';

import { CheckCircle2, Download, RotateCcw, ShieldCheck } from 'lucide-react';
import { Button } from '@tools/ui/button';
import type { ProcessedImage } from '@/entities/image/model/types';
import { MetadataComparison } from './metadata-comparison';
import { formatBytes } from '@/shared/lib/files';
export function ResultPanel({
	result,
	onReset,
}: {
	result: ProcessedImage;
	onReset: () => void;
}) {
	const { t } = useI18n();
	return (
		<div className="result-panel">
			<div className="result-check">
				<CheckCircle2 size={28} />
			</div>
			<h3>{t('result.title')}</h3>
			<p>{t('result.copy')}</p>
			<div className="result-file">
				<img src={result.url} alt="Processed preview" />
				<div className="result-file-info">
					<strong title={result.name}>{result.name}</strong>
					<span>
						{formatBytes(result.originalSize)} →{' '}
						{formatBytes(result.outputSize)}
					</span>
				</div>
				<ShieldCheck size={20} className="result-shield" />
			</div>
			<MetadataComparison result={result} />
			<a
				className="ui-button ui-button--primary download-button"
				href={result.url}
				download={result.name}
			>
				<Download size={18} />
				{t('result.download')}
			</a>
			<Button tone="subtle" onClick={onReset}>
				<RotateCcw size={16} />
				{t('result.reset')}
			</Button>
		</div>
	);
}
