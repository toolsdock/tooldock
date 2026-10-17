'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import type {
	AudioQueueItem,
	ConversionSettings,
	EngineStatus,
	OutputFormat,
} from '@/entities/audio/model/types';
import { MAX_FILE_SIZE, MAX_FILES } from '@/shared/config/site';
import { convertAudioFile, getFFmpeg } from './ffmpeg-client';

const acceptedExtensions = new Set([
	'mp3',
	'wav',
	'flac',
	'ogg',
	'oga',
	'm4a',
	'aac',
	'opus',
	'webm',
	'wma',
]);

function isAcceptedAudio(file: File): boolean {
	const extension = file.name.toLowerCase().split('.').pop() ?? '';
	return file.type.startsWith('audio/') || acceptedExtensions.has(extension);
}

function revokeOutput(item: AudioQueueItem) {
	if (item.output?.url) URL.revokeObjectURL(item.output.url);
}

export function useAudioConverter(errorMessages: {
	type: string;
	size: string;
	limit: string;
	convert: string;
	engine: string;
}) {
	const [items, setItems] = useState<AudioQueueItem[]>([]);
	const [settings, setSettings] = useState<ConversionSettings>({
		format: 'mp3',
		mp3Bitrate: 192,
		oggQuality: 6,
		flacCompression: 8,
	});
	const [engineStatus, setEngineStatus] = useState<EngineStatus>('idle');
	const [isConverting, setIsConverting] = useState(false);
	const [globalError, setGlobalError] = useState<string | null>(null);
	const mounted = useRef(true);
	const itemsRef = useRef<AudioQueueItem[]>([]);

	useEffect(() => {
		itemsRef.current = items;
	}, [items]);

	useEffect(() => {
		mounted.current = true;
		return () => {
			mounted.current = false;
			itemsRef.current.forEach(revokeOutput);
		};
	}, []);

	const invalidateResults = useCallback(() => {
		setItems((current) =>
			current.map((item) => {
				revokeOutput(item);
				return {
					...item,
					status: 'ready',
					output: undefined,
					error: undefined,
				};
			}),
		);
	}, []);

	const updateSettings = useCallback(
		(patch: Partial<ConversionSettings>) => {
			invalidateResults();
			setSettings((current) => ({ ...current, ...patch }));
		},
		[invalidateResults],
	);

	const setFormat = useCallback(
		(format: OutputFormat) => updateSettings({ format }),
		[updateSettings],
	);

	const addFiles = useCallback(
		(files: File[]) => {
			setGlobalError(null);
			setItems((current) => {
				const available = Math.max(0, MAX_FILES - current.length);
				if (available === 0) {
					setGlobalError(errorMessages.limit);
					return current;
				}

				const selected = files.slice(0, available);
				if (files.length > available)
					setGlobalError(errorMessages.limit);

				const additions = selected.map<AudioQueueItem>(
					(file, index) => {
						const base = {
							id: `${Date.now()}-${index}-${Math.random().toString(36).slice(2)}`,
							file,
						};
						if (!isAcceptedAudio(file))
							return {
								...base,
								status: 'error',
								error: errorMessages.type,
							};
						if (file.size > MAX_FILE_SIZE)
							return {
								...base,
								status: 'error',
								error: errorMessages.size,
							};
						return { ...base, status: 'ready' };
					},
				);

				return [...current, ...additions];
			});
		},
		[errorMessages.limit, errorMessages.size, errorMessages.type],
	);

	const removeItem = useCallback((id: string) => {
		setItems((current) => {
			const item = current.find((candidate) => candidate.id === id);
			if (item) revokeOutput(item);
			return current.filter((candidate) => candidate.id !== id);
		});
	}, []);

	const clearAll = useCallback(() => {
		setItems((current) => {
			current.forEach(revokeOutput);
			return [];
		});
		setGlobalError(null);
	}, []);

	const convertAll = useCallback(async () => {
		if (isConverting || items.length === 0) return;
		setIsConverting(true);
		setGlobalError(null);

		let ffmpeg;
		try {
			setEngineStatus('loading');
			ffmpeg = await getFFmpeg();
			if (!mounted.current) return;
			setEngineStatus('ready');
		} catch {
			if (mounted.current) {
				setEngineStatus('error');
				setGlobalError(errorMessages.engine);
				setIsConverting(false);
			}
			return;
		}

		const candidates = items.filter((item) => item.status !== 'error');

		for (let index = 0; index < candidates.length; index += 1) {
			const item = candidates[index];
			if (!mounted.current) break;

			setItems((current) =>
				current.map((entry) =>
					entry.id === item.id
						? { ...entry, status: 'processing', error: undefined }
						: entry,
				),
			);

			try {
				const result = await convertAudioFile(
					ffmpeg,
					item.file,
					settings,
					`${Date.now()}-${index}`,
				);
				if (!mounted.current) break;
				const url = URL.createObjectURL(result.blob);
				setItems((current) =>
					current.map((entry) => {
						if (entry.id !== item.id) return entry;
						revokeOutput(entry);
						return {
							...entry,
							status: 'done',
							output: {
								name: result.name,
								size: result.blob.size,
								mimeType: result.blob.type,
								url,
							},
						};
					}),
				);
			} catch {
				if (!mounted.current) break;
				setItems((current) =>
					current.map((entry) =>
						entry.id === item.id
							? {
									...entry,
									status: 'error',
									error: errorMessages.convert,
								}
							: entry,
					),
				);
			}
		}

		if (mounted.current) setIsConverting(false);
	}, [
		errorMessages.convert,
		errorMessages.engine,
		isConverting,
		items,
		settings,
	]);

	const completedCount = useMemo(
		() => items.filter((item) => item.status === 'done').length,
		[items],
	);

	return {
		items,
		settings,
		setFormat,
		updateSettings,
		engineStatus,
		isConverting,
		globalError,
		completedCount,
		addFiles,
		removeItem,
		clearAll,
		convertAll,
	};
}
