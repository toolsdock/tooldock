export type OutputFormat = 'jpeg' | 'png';
export type ConversionStatus = 'queued' | 'converting' | 'done' | 'error';
export type ConversionItem = {
	id: string;
	file: File;
	status: ConversionStatus;
	result?: Blob;
	outputName?: string;
	error?: string;
};
