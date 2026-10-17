'use client';

import {
	CheckCircle2,
	Download,
	FileAudio2,
	LoaderCircle,
	Trash2,
	TriangleAlert,
} from 'lucide-react';
import type { AudioQueueItem } from '@/entities/audio/model/types';
import { formatBytes } from '@/shared/lib/format-bytes';
import { useI18n } from '@tools/i18n/provider';

function statusIcon(item: AudioQueueItem) {
	if (item.status === 'processing')
		return <LoaderCircle className="spin" size={18} />;
	if (item.status === 'done') return <CheckCircle2 size={18} />;
	if (item.status === 'error') return <TriangleAlert size={18} />;
	return <FileAudio2 size={18} />;
}

export function FileQueue({
	items,
	disabled,
	onRemove,
}: {
	items: AudioQueueItem[];
	disabled: boolean;
	onRemove: (id: string) => void;
}) {
	const { t } = useI18n();
	if (items.length === 0) return null;

	return (
		<div className="file-list" aria-live="polite">
			{items.map((item) => (
				<article
					className={`file-row status-${item.status}`}
					key={item.id}
				>
					<div className="file-status-icon">{statusIcon(item)}</div>
					<div className="file-copy">
						<strong title={item.file.name}>{item.file.name}</strong>
						<span>
							{formatBytes(item.file.size)}
							{item.output
								? ` → ${formatBytes(item.output.size)}`
								: ''}
						</span>
						{item.error && <em>{item.error}</em>}
					</div>
					<div className="file-actions">
						{item.output && (
							<a
								className="download-button"
								href={item.output.url}
								download={item.output.name}
							>
								<Download size={16} /> {t('download')}
							</a>
						)}
						<button
							type="button"
							className="icon-button subtle"
							disabled={disabled}
							onClick={() => onRemove(item.id)}
							aria-label={t('remove')}
							title={t('remove')}
						>
							<Trash2 size={17} />
						</button>
					</div>
				</article>
			))}
		</div>
	);
}
