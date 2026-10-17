// Exports selected frames as 16-bit PCM WAV, without lossy re-encoding.
export function encodeWav(
	buffer: AudioBuffer,
	startSeconds: number,
	endSeconds: number,
): Blob {
	const sampleRate = buffer.sampleRate;
	const start = Math.max(
		0,
		Math.min(buffer.length, Math.floor(startSeconds * sampleRate)),
	);
	const end = Math.max(
		start,
		Math.min(buffer.length, Math.ceil(endSeconds * sampleRate)),
	);
	const frames = end - start;
	if (frames < 1) throw new Error('Empty audio selection');
	const channels = Math.min(buffer.numberOfChannels, 2); // WAV stereo: downmix channels > 2
	const bytes = frames * channels * 2;
	if (bytes > 350_000_000)
		throw new Error('Selection too large for browser export');
	const output = new ArrayBuffer(44 + bytes);
	const view = new DataView(output);
	const str = (offset: number, value: string) => {
		for (let i = 0; i < value.length; i++)
			view.setUint8(offset + i, value.charCodeAt(i));
	};
	str(0, 'RIFF');
	view.setUint32(4, 36 + bytes, true);
	str(8, 'WAVE');
	str(12, 'fmt ');
	view.setUint32(16, 16, true);
	view.setUint16(20, 1, true);
	view.setUint16(22, channels, true);
	view.setUint32(24, sampleRate, true);
	view.setUint32(28, sampleRate * channels * 2, true);
	view.setUint16(32, channels * 2, true);
	view.setUint16(34, 16, true);
	str(36, 'data');
	view.setUint32(40, bytes, true);
	const sources = Array.from({ length: buffer.numberOfChannels }, (_, i) =>
		buffer.getChannelData(i),
	);
	const channelGroups =
		channels === 2 && sources.length > 2
			? [
					sources.filter((_, j) => j % 2 === 0),
					sources.filter((_, j) => j % 2 === 1),
				]
			: [];
	let p = 44;
	for (let i = start; i < end; i++) {
		for (let c = 0; c < channels; c++) {
			let sample: number;
			if (buffer.numberOfChannels <= 2) sample = sources[c][i];
			else {
				const group = channelGroups[c];
				sample = group.reduce((sum, a) => sum + a[i], 0) / group.length;
			}
			sample = Math.max(-1, Math.min(1, sample));
			view.setInt16(
				p,
				sample < 0
					? Math.round(sample * 32768)
					: Math.round(sample * 32767),
				true,
			);
			p += 2;
		}
	}
	return new Blob([output], { type: 'audio/wav' });
}
