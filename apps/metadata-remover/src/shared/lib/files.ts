import type { OutputFormat } from '@/entities/image/model/types';
export const ACCEPTED_TYPES: OutputFormat[] = [
	'image/jpeg',
	'image/png',
	'image/webp',
];
export const MAX_FILE_SIZE = 20 * 1024 * 1024;
export function formatBytes(bytes: number): string {
	return bytes < 1024 * 1024
		? `${(bytes / 1024).toFixed(0)} KB`
		: `${(bytes / 1024 / 1024).toFixed(2)} MB`;
}
export function outputFilename(filename: string, mime: OutputFormat): string {
	return `${filename.replace(/\.[^.]+$/, '')}-clean.${mime === 'image/jpeg' ? 'jpg' : mime === 'image/png' ? 'png' : 'webp'}`;
}
