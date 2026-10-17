'use client';
import { useI18n } from '@tools/i18n/provider';

import { useRef, useState } from 'react';
import { ArrowUpFromLine, Image as ImageIcon } from 'lucide-react';
import { Button } from '@tools/ui/button';
export function DropZone({
	onFile,
	disabled,
}: {
	onFile: (file: File) => void;
	disabled?: boolean;
}) {
	const { t } = useI18n();
	const inputRef = useRef<HTMLInputElement>(null);
	const [dragging, setDragging] = useState(false);
	return (
		<div
			className={`drop-zone ${dragging ? 'drop-zone--active' : ''}`}
			onDragOver={(event) => {
				event.preventDefault();
				setDragging(true);
			}}
			onDragLeave={(event) => {
				event.preventDefault();
				setDragging(false);
			}}
			onDrop={(event) => {
				event.preventDefault();
				setDragging(false);
				if (!disabled && event.dataTransfer.files[0])
					onFile(event.dataTransfer.files[0]);
			}}
		>
			<input
				ref={inputRef}
				type="file"
				accept="image/jpeg,image/png,image/webp"
				className="sr-only"
				aria-label={t('upload.aria')}
				onChange={(event) => {
					const file = event.target.files?.[0];
					if (file) onFile(file);
					event.target.value = '';
				}}
			/>
			<div className="upload-illustration">
				<span className="upload-orbit upload-orbit--one" />
				<span className="upload-orbit upload-orbit--two" />
				<span className="upload-icon">
					<ImageIcon size={34} strokeWidth={1.8} />
				</span>
				<span className="upload-mini">
					<ArrowUpFromLine size={17} />
				</span>
			</div>
			<h3>{t('upload.title')}</h3>
			<p>{t('upload.copy')}</p>
			<Button
				disabled={disabled}
				onClick={() => inputRef.current?.click()}
			>
				<ArrowUpFromLine size={17} />
				{t('upload.choose')}
			</Button>
			<span className="upload-hint">JPG, PNG or WebP · Up to 20 MB</span>
		</div>
	);
}
