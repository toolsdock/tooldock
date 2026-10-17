'use client';
import { ArrowRight, LockKeyhole, RotateCcw } from 'lucide-react';
import { Button } from '@tools/ui/button';
import { useResizer } from '../model/use-resizer';
import { DropZone } from './drop-zone';
import { ResizeSettings } from './resize-settings';
import { ImageList } from './image-list';
import { useI18n } from '@tools/i18n/provider';
export function Resizer() {
	const { t } = useI18n();
	const {
		items,
		options,
		update,
		busy,
		error,
		addFiles,
		run,
		download,
		reset,
	} = useResizer();
	const complete =
		items.length > 0 &&
		items.every((i) => i.status === 'done' || i.status === 'error');
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
					<ImageList items={items} onDownload={download} />
					{!complete && (
						<>
							<ResizeSettings
								options={options}
								update={update}
								disabled={busy}
							/>
							<Button
								className="convert-button"
								type="button"
								disabled={busy}
								onClick={run}
							>
								{busy
									? t('workspace.running')
									: `${t('workspace.action')} (${items.length})`}
								<ArrowRight size={17} />
							</Button>
						</>
					)}
					{complete && (
						<p className="completion-note">{t('workspace.done')}</p>
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
