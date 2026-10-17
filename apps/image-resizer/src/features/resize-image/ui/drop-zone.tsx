'use client';
import { useRef, useState } from 'react';
import { Images, UploadCloud } from 'lucide-react';
import { Button } from '@tools/ui/button';
import { useI18n } from '@tools/i18n/provider';
export function DropZone({ onFiles }: { onFiles: (files: File[]) => void }) {
	const { t } = useI18n();
	const input = useRef<HTMLInputElement>(null);
	const [active, setActive] = useState(false);
	return (
		<div
			className={`drop-zone ${active ? 'drop-zone--active' : ''}`}
			onDragOver={(e) => {
				e.preventDefault();
				setActive(true);
			}}
			onDragLeave={() => setActive(false)}
			onDrop={(e) => {
				e.preventDefault();
				setActive(false);
				onFiles(Array.from(e.dataTransfer.files));
			}}
		>
			<div className="upload-illustration">
				<div className="upload-orbit upload-orbit--one" />
				<div className="upload-orbit upload-orbit--two" />
				<div className="upload-icon">
					<Images size={30} />
				</div>
				<span className="upload-mini">
					<UploadCloud size={18} />
				</span>
			</div>
			<h3>{t('upload.title')}</h3>
			<p>{t('upload.copy')}</p>
			<input
				ref={input}
				className="sr-only"
				type="file"
				multiple
				accept="image/jpeg,image/png,image/webp"
				onChange={(e) => {
					onFiles(Array.from(e.target.files || []));
					e.target.value = '';
				}}
				aria-label={t('upload.choose')}
			/>
			<Button type="button" onClick={() => input.current?.click()}>
				<UploadCloud size={17} />
				{t('upload.choose')}
			</Button>
			<span className="upload-hint">{t('upload.hint')}</span>
		</div>
	);
}
