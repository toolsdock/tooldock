'use client';
import { useEffect, useRef, useState, type PointerEvent } from 'react';
import { clamp } from '@/entities/audio/lib/time';
export function Waveform({
	buffer,
	start,
	end,
	onChange,
}: {
	buffer: AudioBuffer;
	start: number;
	end: number;
	onChange: (start: number, end: number) => void;
}) {
	const canvas = useRef<HTMLCanvasElement>(null);
	const drawing = useRef<number | null>(null);
	const [draft, setDraft] = useState<[number, number] | null>(null);
	useEffect(() => {
		const element = canvas.current;
		if (!element) return;
		const render = () => {
			const width = Math.max(1, Math.floor(element.clientWidth));
			const height = 144;
			const ratio = Math.min(window.devicePixelRatio || 1, 2);
			element.width = width * ratio;
			element.height = height * ratio;
			const ctx = element.getContext('2d');
			if (!ctx) return;
			ctx.scale(ratio, ratio);
			ctx.clearRect(0, 0, width, height);
			const data = buffer.getChannelData(0);
			const step = Math.max(1, Math.ceil(data.length / width));
			const a = ((draft?.[0] ?? start) / buffer.duration) * width;
			const b = ((draft?.[1] ?? end) / buffer.duration) * width;
			ctx.fillStyle = 'rgba(157, 133, 255, .12)';
			ctx.fillRect(Math.min(a, b), 0, Math.abs(b - a), height);
			for (let x = 0; x < width; x++) {
				const begin = x * step;
				const finish = Math.min(data.length, begin + step);
				let min = 0,
					max = 0;
				for (let i = begin; i < finish; i++) {
					const value = data[i];
					if (value < min) min = value;
					if (value > max) max = value;
				}
				ctx.strokeStyle =
					x >= Math.min(a, b) && x <= Math.max(a, b)
						? '#ad97ff'
						: '#52607b';
				ctx.lineWidth = 1.6;
				ctx.beginPath();
				ctx.moveTo(x, 72 + min * 63);
				ctx.lineTo(x, 72 + max * 63);
				ctx.stroke();
			}
			ctx.fillStyle = '#b7a5ff';
			ctx.fillRect(a - 1, 0, 2, height);
			ctx.fillRect(b - 1, 0, 2, height);
		};
		render();
		const observer = new ResizeObserver(render);
		observer.observe(element);
		return () => observer.disconnect();
	}, [buffer, start, end, draft]);
	const position = (e: PointerEvent<HTMLCanvasElement>) => {
		const rect = e.currentTarget.getBoundingClientRect();
		return clamp(
			((e.clientX - rect.left) / rect.width) * buffer.duration,
			0,
			buffer.duration,
		);
	};
	return (
		<canvas
			ref={canvas}
			className="waveform"
			role="img"
			aria-label="Audio waveform. Drag to select a region."
			onPointerDown={(e) => {
				drawing.current = position(e);
				setDraft([drawing.current, drawing.current]);
				e.currentTarget.setPointerCapture(e.pointerId);
			}}
			onPointerMove={(e) => {
				if (drawing.current !== null)
					setDraft([drawing.current, position(e)]);
			}}
			onPointerUp={(e) => {
				if (drawing.current === null) return;
				const a = drawing.current;
				const b = position(e);
				drawing.current = null;
				setDraft(null);
				onChange(Math.min(a, b), Math.max(a, b));
			}}
			onPointerCancel={() => {
				drawing.current = null;
				setDraft(null);
			}}
		/>
	);
}
