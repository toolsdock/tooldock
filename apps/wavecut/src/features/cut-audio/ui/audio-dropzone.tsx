'use client';
import { useRef, useState } from 'react';
import { UploadCloud } from 'lucide-react';
import { useI18n } from '@tools/i18n/provider';
export function AudioDropzone({ onFile }: { onFile: (file: File) => void }) {
	const { t } = useI18n();
	const input = useRef<HTMLInputElement>(null);
	const [drag, setDrag] = useState(false);
	return (
		<div
			className={`drop-zone ${drag ? 'drag' : ''}`}
			onDragOver={(e) => {
				e.preventDefault();
				setDrag(true);
			}}
			onDragLeave={() => setDrag(false)}
			onDrop={(e) => {
				e.preventDefault();
				setDrag(false);
				const f = e.dataTransfer.files[0];
				if (f) onFile(f);
			}}
		>
			<div className="upload-icon">
				<UploadCloud size={30} />
			</div>
			<h2>{t('drop')}</h2>
			<p>{t('or')}</p>
			<button
				className="primary"
				onClick={() => input.current?.click()}
				type="button"
			>
				<UploadCloud size={17} />
				{t('choose')}
			</button>
			<small>{t('formats')}</small>
			<input
				ref={input}
				type="file"
				accept="audio/*,.mp3,.wav,.ogg,.m4a,.aac,.flac,.opus,.webm"
				hidden
				onChange={(e) => {
					const f = e.target.files?.[0];
					if (f) onFile(f);
					e.target.value = '';
				}}
			/>
		</div>
	);
}
