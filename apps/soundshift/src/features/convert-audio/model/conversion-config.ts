import type {
	ConversionSettings,
	OutputFormat,
} from '@/entities/audio/model/types';

const formatInfo: Record<
	OutputFormat,
	{ extension: string; mimeType: string }
> = {
	mp3: { extension: 'mp3', mimeType: 'audio/mpeg' },
	wav: { extension: 'wav', mimeType: 'audio/wav' },
	flac: { extension: 'flac', mimeType: 'audio/flac' },
	ogg: { extension: 'ogg', mimeType: 'audio/ogg' },
};

export function getFormatInfo(format: OutputFormat) {
	return formatInfo[format];
}

export function buildConversionArgs(
	inputName: string,
	outputName: string,
	settings: ConversionSettings,
): string[] {
	const common = [
		'-hide_banner',
		'-i',
		inputName,
		'-vn',
		'-map_metadata',
		'-1',
	];

	switch (settings.format) {
		case 'mp3':
			return [
				...common,
				'-c:a',
				'libmp3lame',
				'-b:a',
				`${settings.mp3Bitrate}k`,
				outputName,
			];
		case 'wav':
			return [...common, '-c:a', 'pcm_s16le', outputName];
		case 'flac':
			return [
				...common,
				'-c:a',
				'flac',
				'-compression_level',
				String(settings.flacCompression),
				outputName,
			];
		case 'ogg':
			return [
				...common,
				'-c:a',
				'libvorbis',
				'-q:a',
				String(settings.oggQuality),
				outputName,
			];
	}
}
