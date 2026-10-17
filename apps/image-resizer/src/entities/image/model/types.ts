export type OutputFormat = 'image/jpeg' | 'image/png' | 'image/webp';
export type ResizeMode = 'width' | 'height' | 'both' | 'percent';
export type ImageItem = {
	id: string;
	file: File;
	status: 'queued' | 'processing' | 'done' | 'error';
	result?: Blob;
	outputName?: string;
	error?: string;
	dimensions?: { width: number; height: number };
};
export type ResizeOptions = {
	mode: ResizeMode;
	width: number;
	height: number;
	percent: number;
	format: OutputFormat;
	quality: number;
	allowUpscale: boolean;
};
