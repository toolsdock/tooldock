const fallbackUrl = 'https://soundshift.invalid';

export const SITE_URL = (
	process.env.NEXT_PUBLIC_SOUNDSHIFT_SITE_URL ?? fallbackUrl
).replace(/\/$/, '');
export const IS_INDEXABLE = !SITE_URL.includes('.invalid');
export const FFMPEG_CORE_URL =
	'https://cdn.jsdelivr.net/npm/@ffmpeg/core@0.12.10/dist/umd';
export const MAX_FILE_SIZE = 80 * 1024 * 1024;
export const MAX_FILES = 8;
