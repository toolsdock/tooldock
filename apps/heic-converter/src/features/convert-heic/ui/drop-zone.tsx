'use client';
import { useI18n } from '@tools/i18n/provider';

import { useRef, useState } from 'react';
import { ArrowUpFromLine, ImagePlus, Sparkles } from 'lucide-react';
import { Button } from '@tools/ui/button';
type Props = { onFiles: (files: File[]) => void };
export function DropZone({ onFiles }: Props) {
	const { t } = useI18n();
	const input = useRef<HTMLInputElement>(null);
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
				onFiles(Array.from(event.dataTransfer.files));
			}}
		>
			<div className="upload-illustration">
				<span className="upload-orbit upload-orbit--one" />
				<span className="upload-orbit upload-orbit--two" />
				<span className="upload-icon">
					<ImagePlus size={29} />
				</span>
				<span className="upload-mini">
					<Sparkles size={16} />
				</span>
			</div>
			<h3>Drop your iPhone photos here</h3>
			<p>Or choose HEIC files from your device</p>
			<input
				ref={input}
				className="sr-only"
				type="file"
				accept=".heic,.heif,image/heic,image/heif"
				multiple
				onChange={(event) => {
					onFiles(Array.from(event.target.files ?? []));
					event.target.value = '';
				}}
				aria-label="Select HEIC photos"
			/>
			<Button type="button" onClick={() => input.current?.click()}>
				<ArrowUpFromLine size={17} /> Choose HEIC files
			</Button>
			<span className="upload-hint">
				HEIC / HEIF · Up to 15 photos · 35 MB each
			</span>
		</div>
	);
}
