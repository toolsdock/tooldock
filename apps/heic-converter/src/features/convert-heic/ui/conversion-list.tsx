'use client';
import { useI18n } from '@tools/i18n/provider';

import {
	CheckCircle2,
	AlertCircle,
	LoaderCircle,
	FileImage,
	Download,
} from 'lucide-react';
import type { ConversionItem } from '@/entities/conversion/model/types';
import { formatBytes } from '@/shared/lib/files';
import { Button } from '@tools/ui/button';
type Props = {
	items: ConversionItem[];
	onDownload: (item: ConversionItem) => void;
};
export function ConversionList({ items, onDownload }: Props) {
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
							aria-label={`Download ${item.outputName}`}
						>
							<Download size={16} />
							{t('file.download')}
						</Button>
					) : item.status === 'converting' ? (
						<LoaderCircle
							size={20}
							className="spin"
							aria-label="Converting"
						/>
					) : item.status === 'error' ? (
						<AlertCircle
							size={20}
							className="item-error"
							aria-label={t('file.failed')}
						/>
					) : (
						<span className="queued">{t('file.ready')}</span>
					)}
					{item.status === 'done' && (
						<CheckCircle2
							size={18}
							className="done-icon"
							aria-label="Converted"
						/>
					)}
				</div>
			))}
		</div>
	);
}
