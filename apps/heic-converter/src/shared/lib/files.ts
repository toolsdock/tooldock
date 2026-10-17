const MAX_SIZE = 35 * 1024 * 1024;
export const MAX_FILES = 15;
export function isHeic(file: File): boolean {
	return (
		/\.(heic|heif)$/i.test(file.name) ||
		/^(image\/(heic|heif|heic-sequence|heif-sequence))$/i.test(file.type)
	);
}
export function validateFiles(files: File[]): string | null {
	if (!files.length) return 'Select at least one HEIC or HEIF photo.';
	if (files.length > MAX_FILES)
		return `Select up to ${MAX_FILES} photos at a time.`;
	if (files.some((file) => !isHeic(file)))
		return 'Only HEIC and HEIF photos are supported.';
	if (files.some((file) => file.size > MAX_SIZE))
		return 'Each photo must be 35 MB or smaller.';
	return null;
}
export function outputFilename(name: string, format: 'jpeg' | 'png'): string {
	return (
		name.replace(/\.(heic|heif)$/i, '') +
		(format === 'jpeg' ? '.jpg' : '.png')
	);
}
export function formatBytes(bytes: number): string {
	if (bytes < 1024) return `${bytes} B`;
	if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(0)} KB`;
	return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}
