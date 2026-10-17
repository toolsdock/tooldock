'use client';
import {
	AlertCircle,
	CheckCircle2,
	Download,
	FileImage,
	LoaderCircle,
} from 'lucide-react';
import { Button } from '@tools/ui/button';
import type { ImageItem } from '@/entities/image/model/types';
import { formatBytes } from '@/shared/lib/files';
import { useI18n } from '@tools/i18n/provider';
export function ImageList({
	items,
	onDownload,
}: {
	items: ImageItem[];
	onDownload: (item: ImageItem) => void;
}) {
	const { t } = useI18n();
	return (
		<div className="conversion-list" aria-live="polite">
			{items.map((item) => (
				<div className="conversion-item" key={item.id}>
					<span className="file-icon">
						<FileImage size={20} />
					</span>
					<div className="file-detail">
						<strong title={item.file.name}>{item.file.name}</strong>
						<span>
							{formatBytes(item.file.size)}
							{item.result
								? ` → ${formatBytes(item.result.size)}`
								: ''}
							{item.dimensions
								? ` · ${item.dimensions.width} × ${item.dimensions.height}px`
								: ''}
						</span>
						{item.error && (
							<small className="item-error">{item.error}</small>
						)}
					</div>
					{item.status === 'done' ? (
						<Button
							type="button"
							tone="subtle"
							onClick={() => onDownload(item)}
						>
							<Download size={16} />
							{t('file.download')}
						</Button>
					) : item.status === 'processing' ? (
						<LoaderCircle size={20} className="spin" />
					) : item.status === 'error' ? (
						<AlertCircle size={20} className="item-error" />
					) : (
						<span className="queued">{t('file.ready')}</span>
					)}
					{item.status === 'done' && (
						<CheckCircle2 size={18} className="done-icon" />
					)}
				</div>
			))}
		</div>
	);
}
