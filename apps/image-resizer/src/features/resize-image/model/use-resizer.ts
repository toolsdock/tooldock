'use client';
import { useCallback, useEffect, useRef, useState } from 'react';
import type { ImageItem, ResizeOptions } from '@/entities/image/model/types';
import { resizeFile } from '../lib/resize-file';
import { outputName, validateFiles } from '@/shared/lib/files';

const defaults: ResizeOptions = {
	mode: 'width',
	width: 1200,
	height: 800,
	percent: 50,
	format: 'image/jpeg',
	quality: 90,
	allowUpscale: false,
};

export function useResizer() {
	const [items, setItems] = useState<ImageItem[]>([]);
	const [options, setOptions] = useState<ResizeOptions>(defaults);
	const [busy, setBusy] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const running = useRef(false);
	const alive = useRef(true);
	const downloads = useRef<Set<string>>(new Set());
	useEffect(() => {
		alive.current = true;
		return () => {
			alive.current = false;
			for (const url of downloads.current) URL.revokeObjectURL(url);
			downloads.current.clear();
		};
	}, []);

	const addFiles = useCallback((files: File[]) => {
		if (running.current) return;
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
	const update = useCallback(
		(value: Partial<ResizeOptions>) =>
			setOptions((current) => ({ ...current, ...value })),
		[],
	);
	const run = useCallback(async () => {
		if (running.current || items.length === 0) return;
		running.current = true;
		setBusy(true);
		setError(null);
		const next: ImageItem[] = items.map(({ id, file }) => ({
			id,
			file,
			status: 'queued',
		}));
		setItems([...next]);
		try {
			for (let index = 0; index < next.length; index++) {
				if (!alive.current) break;
				next[index] = { ...next[index], status: 'processing' };
				setItems([...next]);
				try {
					const { blob, dimensions } = await resizeFile(
						next[index].file,
						options,
					);
					next[index] = {
						...next[index],
						status: 'done',
						result: blob,
						dimensions,
						outputName: outputName(
							next[index].file.name,
							options.format,
						),
					};
				} catch (cause) {
					next[index] = {
						...next[index],
						status: 'error',
						error:
							cause instanceof Error
								? cause.message
								: 'Could not resize image.',
					};
				}
				if (alive.current) setItems([...next]);
			}
		} finally {
			running.current = false;
			if (alive.current) setBusy(false);
		}
	}, [items, options]);
	const download = useCallback((item: ImageItem) => {
		if (!item.result || !item.outputName) return;
		const url = URL.createObjectURL(item.result);
		downloads.current.add(url);
		const anchor = document.createElement('a');
		anchor.href = url;
		anchor.download = item.outputName;
		document.body.appendChild(anchor);
		anchor.click();
		anchor.remove();
		// Allow the browser to start reading the download before revoking the URL.
		window.setTimeout(() => {
			URL.revokeObjectURL(url);
			downloads.current.delete(url);
		}, 60_000);
	}, []);
	const reset = useCallback(() => {
		if (!running.current) {
			setItems([]);
			setError(null);
		}
	}, []);
	return {
		items,
		options,
		update,
		busy,
		error,
		addFiles,
		run,
		download,
		reset,
	};
}
