'use client';

import { useRef, useState, type DragEvent } from 'react';
import { FileAudio2, Upload } from 'lucide-react';
import { useI18n } from '@tools/i18n/provider';

export function AudioDropzone({
	onFiles,
}: {
	onFiles: (files: File[]) => void;
}) {
	const { t } = useI18n();
	const inputRef = useRef<HTMLInputElement>(null);
	const [dragging, setDragging] = useState(false);

	const handleDrop = (event: DragEvent<HTMLDivElement>) => {
		event.preventDefault();
		setDragging(false);
		onFiles(Array.from(event.dataTransfer.files));
	};

	return (
		<div
			className={`dropzone ${dragging ? 'is-dragging' : ''}`}
			onDragEnter={(event) => {
				event.preventDefault();
				setDragging(true);
			}}
			onDragOver={(event) => event.preventDefault()}
			onDragLeave={() => setDragging(false)}
			onDrop={handleDrop}
		>
			<input
				ref={inputRef}
				className="sr-only"
				type="file"
				accept="audio/*,.flac,.m4a,.aac,.opus,.wma"
				multiple
				onChange={(event) => {
					onFiles(Array.from(event.target.files ?? []));
					event.currentTarget.value = '';
				}}
			/>
			<div className="dropzone-icon">
				<FileAudio2 size={30} />
			</div>
			<h3>{t('drop')}</h3>
			<p>{t('or')}</p>
			<button
				type="button"
				className="primary-button"
				onClick={() => inputRef.current?.click()}
			>
				<Upload size={17} /> {t('choose')}
			</button>
			<small>{t('formats')}</small>
		</div>
	);
}
