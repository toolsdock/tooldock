'use client';
import { useCallback, useEffect, useRef, useState } from 'react';
import { clamp } from '@/entities/audio/lib/time';
import { encodeWav } from '@/entities/audio/lib/wav';
type Status = 'idle' | 'loading' | 'ready' | 'exporting';
export function useAudioEditor() {
	const [file, setFile] = useState<File | null>(null);
	const [buffer, setBuffer] = useState<AudioBuffer | null>(null);
	const [start, setStart] = useState(0);
	const [end, setEnd] = useState(0);
	const [status, setStatus] = useState<Status>('idle');
	const [error, setError] = useState<string | null>(null);
	const [playing, setPlaying] = useState(false);
	const [result, setResult] = useState<string | null>(null);
	const audioRef = useRef<AudioContext | null>(null);
	const sourceRef = useRef<AudioBufferSourceNode | null>(null);
	const generation = useRef(0);
	const resultRef = useRef<string | null>(null);
	const stop = useCallback(() => {
		const source = sourceRef.current;
		sourceRef.current = null;
		if (source) {
			source.onended = null;
			try {
				source.stop();
			} catch {}
			source.disconnect();
		}
		setPlaying(false);
	}, []);
	const clearResult = useCallback(() => {
		if (resultRef.current) {
			URL.revokeObjectURL(resultRef.current);
			resultRef.current = null;
		}
		setResult(null);
	}, []);
	const reset = useCallback(() => {
		generation.current++;
		stop();
		clearResult();
		setFile(null);
		setBuffer(null);
		setStart(0);
		setEnd(0);
		setError(null);
		setStatus('idle');
	}, [stop, clearResult]);
	useEffect(
		() => () => {
			generation.current++;
			const source = sourceRef.current;
			if (source) {
				source.onended = null;
				try {
					source.stop();
				} catch {}
			}
			if (resultRef.current) URL.revokeObjectURL(resultRef.current);
			void audioRef.current?.close();
		},
		[],
	);
	const load = useCallback(
		async (input: File) => {
			const token = ++generation.current;
			stop();
			clearResult();
			setError(null);
			setFile(null);
			setBuffer(null);
			if (input.size > 40 * 1024 * 1024) {
				setError('errorSize');
				setStatus('idle');
				return;
			}
			if (
				!input.type.startsWith('audio/') &&
				!/\.(mp3|wav|ogg|m4a|aac|flac|opus|webm)$/i.test(input.name)
			) {
				setError('errorType');
				setStatus('idle');
				return;
			}
			setStatus('loading');
			try {
				if (!audioRef.current) audioRef.current = new AudioContext();
				const bytes = await input.arrayBuffer();
				const decoded = await audioRef.current.decodeAudioData(bytes);
				if (token !== generation.current) return;
				if (decoded.duration <= 0 || !Number.isFinite(decoded.duration))
					throw Error('Invalid duration');
				setFile(input);
				setBuffer(decoded);
				setStart(0);
				setEnd(decoded.duration);
				setStatus('ready');
			} catch {
				if (token === generation.current) {
					setError('errorDecode');
					setStatus('idle');
				}
			}
		},
		[stop, clearResult],
	);
	const change = useCallback(
		(a: number, b: number) => {
			if (!buffer) return;
			stop();
			clearResult();
			setStart(clamp(a, 0, buffer.duration));
			setEnd(clamp(b, 0, buffer.duration));
		},
		[buffer, stop, clearResult],
	);
	const preview = useCallback(async () => {
		if (!buffer || end - start < 0.01) return;
		if (playing) {
			stop();
			return;
		}
		stop();
		try {
			const context = audioRef.current ?? new AudioContext();
			audioRef.current = context;
			await context.resume();
			const source = context.createBufferSource();
			source.buffer = buffer;
			source.connect(context.destination);
			source.onended = () => {
				if (sourceRef.current === source) {
					sourceRef.current = null;
					setPlaying(false);
				}
			};
			sourceRef.current = source;
			source.start(0, start, end - start);
			setPlaying(true);
		} catch {
			setError('errorDecode');
		}
	}, [buffer, start, end, playing, stop]);
	const exportAudio = useCallback(() => {
		if (!buffer) return;
		stop();
		clearResult();
		if (end - start < 0.01) {
			setError('errorShort');
			return;
		}
		setStatus('exporting');
		setError(null);
		try {
			const blob = encodeWav(buffer, start, end);
			const url = URL.createObjectURL(blob);
			resultRef.current = url;
			setResult(url);
		} catch {
			setError('errorExport');
		} finally {
			setStatus('ready');
		}
	}, [buffer, start, end, stop, clearResult]);
	return {
		file,
		buffer,
		start,
		end,
		status,
		error,
		playing,
		result,
		load,
		reset,
		change,
		preview,
		exportAudio,
	};
}
