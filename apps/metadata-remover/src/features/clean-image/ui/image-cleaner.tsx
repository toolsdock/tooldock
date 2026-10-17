'use client';

import { useI18n } from '@tools/i18n/provider';
import { LoaderCircle } from 'lucide-react';
import { DropZone } from './drop-zone';
import { ResultPanel } from './result-panel';
import { useImageCleaner } from '../model/use-image-cleaner';
export function ImageCleaner() {
	const { t } = useI18n();
	const { status, result, error, process, reset } = useImageCleaner();
	return (
		<section className="tool-panel" aria-label={t('upload.aria')}>
			{status === 'done' && result ? (
				<ResultPanel result={result} onReset={reset} />
			) : (
				<>
					<DropZone
						onFile={process}
						disabled={status === 'processing'}
					/>
					{status === 'processing' && (
						<p className="tool-feedback" role="status">
							<LoaderCircle size={17} className="spin" />
							{t('processing')}
						</p>
					)}
					{status === 'error' && (
						<p className="tool-error" role="alert">
							{error}
						</p>
					)}
				</>
			)}
		</section>
	);
}
