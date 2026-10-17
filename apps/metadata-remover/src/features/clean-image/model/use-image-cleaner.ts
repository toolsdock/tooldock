'use client';
import { useCallback, useEffect, useRef, useState } from 'react';
import type { ProcessedImage } from '@/entities/image/model/types';
import { cleanImage } from '../lib/clean-image';
type Status = 'idle' | 'processing' | 'done' | 'error';
export function useImageCleaner() {
	const [status, setStatus] = useState<Status>('idle');
	const [result, setResult] = useState<ProcessedImage | null>(null);
	const [error, setError] = useState('');
	const resultRef = useRef<ProcessedImage | null>(null);
	const activeRef = useRef(true);
	useEffect(() => {
		activeRef.current = true;
		return () => {
			activeRef.current = false;
			if (resultRef.current) URL.revokeObjectURL(resultRef.current.url);
		};
	}, []);
	const reset = useCallback(() => {
		if (resultRef.current) URL.revokeObjectURL(resultRef.current.url);
		resultRef.current = null;
		setResult(null);
		setError('');
		setStatus('idle');
	}, []);
	const process = useCallback(
		async (file: File) => {
			reset();
			setStatus('processing');
			try {
				const next = await cleanImage(file);
				if (!activeRef.current) {
					URL.revokeObjectURL(next.url);
					return;
				}
				resultRef.current = next;
				setResult(next);
				setStatus('done');
			} catch (reason) {
				if (!activeRef.current) return;
				setError(
					reason instanceof Error
						? reason.message
						: 'Something went wrong.',
				);
				setStatus('error');
			}
		},
		[reset],
	);
	return { status, result, error, process, reset };
}
