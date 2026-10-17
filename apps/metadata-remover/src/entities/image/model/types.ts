export type OutputFormat = 'image/jpeg' | 'image/png' | 'image/webp';
export type MetadataEntry = { key: string; value: string; group: string };
export type MetadataReport = {
	entries: MetadataEntry[];
	properties: MetadataEntry[];
	warning?: string;
};
export type ProcessedImage = {
	name: string;
	originalSize: number;
	outputSize: number;
	url: string;
	blob: Blob;
	before: MetadataReport;
	after: MetadataReport;
};
