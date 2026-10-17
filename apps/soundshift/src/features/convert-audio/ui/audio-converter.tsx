'use client';

import {
	ArrowRight,
	CheckCircle2,
	LoaderCircle,
	RefreshCw,
	ShieldCheck,
} from 'lucide-react';
import { useI18n } from '@tools/i18n/provider';
import { useAudioConverter } from '../model/use-audio-converter';
import { AudioDropzone } from './audio-dropzone';
import { ConversionSettingsPanel } from './conversion-settings';
import { FileQueue } from './file-queue';

export function AudioConverter() {
	const { t } = useI18n();
	const converter = useAudioConverter({
		type: t('errorType'),
		size: t('errorSize'),
		limit: t('errorLimit'),
		convert: t('errorConvert'),
		engine: t('errorEngine'),
	});

	const convertibleCount = converter.items.filter(
		(item) => item.status !== 'error',
	).length;

	return (
		<section className="tool-shell wrap" aria-label={t('toolAria')}>
			<AudioDropzone onFiles={converter.addFiles} />

			{converter.items.length > 0 && (
				<div className="workspace">
					<div className="workspace-topline">
						<div>
							<span>{t('queue')}</span>
							<strong>{converter.items.length}</strong>
						</div>
						<button
							type="button"
							className="text-button"
							disabled={converter.isConverting}
							onClick={converter.clearAll}
						>
							<RefreshCw size={15} /> {t('clear')}
						</button>
					</div>

					<ConversionSettingsPanel
						settings={converter.settings}
						disabled={converter.isConverting}
						setFormat={converter.setFormat}
						updateSettings={converter.updateSettings}
					/>

					<FileQueue
						items={converter.items}
						disabled={converter.isConverting}
						onRemove={converter.removeItem}
					/>

					{converter.globalError && (
						<p className="error-banner">{converter.globalError}</p>
					)}

					<div className="convert-bar">
						<div className="engine-status">
							{converter.engineStatus === 'loading' ? (
								<LoaderCircle className="spin" size={17} />
							) : (
								<ShieldCheck size={17} />
							)}
							<span>
								{converter.engineStatus === 'loading'
									? t('engineLoading')
									: converter.engineStatus === 'ready'
										? t('engineReady')
										: t('engineHint')}
							</span>
						</div>

						<button
							type="button"
							className="primary-button convert-button"
							disabled={
								converter.isConverting || convertibleCount === 0
							}
							onClick={converter.convertAll}
						>
							{converter.isConverting ? (
								<LoaderCircle className="spin" size={18} />
							) : (
								<ArrowRight size={18} />
							)}
							{converter.isConverting
								? t('converting')
								: t('convert')}
						</button>
					</div>

					{converter.completedCount > 0 && (
						<div className="completed-note">
							<CheckCircle2 size={16} />{' '}
							{t('completed').replace(
								'{count}',
								String(converter.completedCount),
							)}
						</div>
					)}
				</div>
			)}
		</section>
	);
}
