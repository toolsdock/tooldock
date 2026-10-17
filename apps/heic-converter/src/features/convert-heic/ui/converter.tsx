'use client';
import { useI18n } from '@tools/i18n/provider';

import { ArrowRight, LockKeyhole, RotateCcw } from 'lucide-react';
import { Button } from '@tools/ui/button';
import { useConverter } from '../model/use-converter';
import { DropZone } from './drop-zone';
import { ConversionSettings } from './conversion-settings';
import { ConversionList } from './conversion-list';
export function Converter() {
	const { t } = useI18n();
	const {
		items,
		format,
		setFormat,
		quality,
		setQuality,
		busy,
		error,
		addFiles,
		convert,
		download,
		reset,
	} = useConverter();
	const complete =
		items.length > 0 &&
		items.every(
			(item) => item.status === 'done' || item.status === 'error',
		);
	return (
		<div className="tool-panel" id="tool">
			{!items.length ? (
				<DropZone onFiles={addFiles} />
			) : (
				<div className="converter-workspace">
					<div className="workspace-heading">
						<div>
							<h3>
								{t('workspace.title')}{' '}
								<span>({items.length})</span>
							</h3>
							<p>{t('workspace.copy')}</p>
						</div>
						<button
							className="text-action"
							type="button"
							onClick={reset}
							disabled={busy}
						>
							<RotateCcw size={15} />
							{t('workspace.reset')}
						</button>
					</div>
					<ConversionList items={items} onDownload={download} />
					{!complete && (
						<>
							<ConversionSettings
								format={format}
								onFormat={setFormat}
								quality={quality}
								onQuality={setQuality}
								disabled={busy}
							/>
							<Button
								type="button"
								className="convert-button"
								disabled={busy}
								onClick={convert}
							>
								{busy
									? t('workspace.running')
									: `${t('workspace.action')} ${items.length} ${t(items.length === 1 ? 'workspace.one' : 'workspace.many')}`}
								<ArrowRight size={17} />
							</Button>
						</>
					)}
					{complete && (
						<div className="completion-note">
							{t('workspace.done')}
						</div>
					)}
				</div>
			)}
			{error && (
				<p className="tool-error" role="alert">
					{error}
				</p>
			)}
			<div className="privacy-note">
				<LockKeyhole size={14} />
				{t('workspace.private')}
			</div>
		</div>
	);
}
