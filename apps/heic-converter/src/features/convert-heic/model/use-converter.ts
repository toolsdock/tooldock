'use client';
import { useCallback, useEffect, useRef, useState } from 'react';
import type {
	ConversionItem,
	OutputFormat,
} from '@/entities/conversion/model/types';
import { convertFile } from '../lib/convert-file';
import { outputFilename, validateFiles } from '@/shared/lib/files';
export function useConverter() {
	const [items, setItems] = useState<ConversionItem[]>([]);
	const [format, setFormat] = useState<OutputFormat>('jpeg');
	const [quality, setQuality] = useState(90);
	const [busy, setBusy] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const urls = useRef<string[]>([]);
	useEffect(
		() => () => {
			urls.current.forEach(URL.revokeObjectURL);
		},
		[],
	);
	const addFiles = useCallback((files: File[]) => {
		const message = validateFiles(files);
		if (message) {
			setError(message);
			return;
		}
		setError(null);
		setItems(
			files.map((file, index) => ({
				id: `${Date.now()}-${index}`,
				file,
				status: 'queued',
			})),
		);
	}, []);
	const convert = useCallback(async () => {
		if (busy || !items.length) return;
		setBusy(true);
		setError(null);
		const next: ConversionItem[] = items.map((item) => ({
			id: item.id,
			file: item.file,
			status: 'queued',
		}));
		setItems([...next]);
		for (let i = 0; i < next.length; i++) {
			next[i] = { ...next[i], status: 'converting' };
			setItems([...next]);
			try {
				const result = await convertFile(next[i].file, format, quality);
				next[i] = {
					...next[i],
					status: 'done',
					result,
					outputName: outputFilename(next[i].file.name, format),
				};
			} catch (cause) {
				next[i] = {
					...next[i],
					status: 'error',
					error:
						cause instanceof Error
							? cause.message
							: 'Could not convert this image.',
				};
			}
			setItems([...next]);
		}
		setBusy(false);
	}, [items, busy, format, quality]);
	const download = useCallback((item: ConversionItem) => {
		if (!item.result || !item.outputName) return;
		const url = URL.createObjectURL(item.result);
		urls.current.push(url);
		const anchor = document.createElement('a');
		anchor.href = url;
		anchor.download = item.outputName;
		document.body.appendChild(anchor);
		anchor.click();
		anchor.remove();
		// Keep the URL alive until unmount; avoids revocation races in Safari.
	}, []);
	const reset = useCallback(() => {
		if (!busy) {
			setItems([]);
			setError(null);
		}
	}, [busy]);
	return {
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
	};
}
