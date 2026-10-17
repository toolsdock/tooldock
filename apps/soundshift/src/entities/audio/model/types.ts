export type OutputFormat = 'mp3' | 'wav' | 'flac' | 'ogg';
export type ConversionStatus = 'ready' | 'processing' | 'done' | 'error';
export type EngineStatus = 'idle' | 'loading' | 'ready' | 'error';

export type ConvertedAudio = {
	name: string;
	size: number;
	mimeType: string;
	url: string;
};

export type AudioQueueItem = {
	id: string;
	file: File;
	status: ConversionStatus;
	output?: ConvertedAudio;
	error?: string;
};

export type ConversionSettings = {
	format: OutputFormat;
	mp3Bitrate: 128 | 192 | 256 | 320;
	oggQuality: 4 | 6 | 8;
	flacCompression: 5 | 8 | 12;
};
