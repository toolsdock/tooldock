export const toolIds = [
	'clearframe',
	'skyconvert',
	'leafsize',
	'wavecut',
	'soundshift',
] as const;

export type ToolId = (typeof toolIds)[number];
export type ToolLocale = 'en' | 'ru';

type LocalizedText = Record<ToolLocale, string>;

export type ToolDefinition = {
	id: ToolId;
	name: string;
	description: LocalizedText;
	devUrl: string;
};

export const tools: readonly ToolDefinition[] = [
	{
		id: 'clearframe',
		name: 'Clearframe',
		description: {
			en: 'Remove EXIF, GPS and hidden metadata from images.',
			ru: 'Удаляет EXIF, GPS и скрытые метаданные изображений.',
		},
		devUrl: 'http://localhost:3000',
	},
	{
		id: 'skyconvert',
		name: 'Skyconvert',
		description: {
			en: 'Convert iPhone HEIC photos to JPG or PNG.',
			ru: 'Конвертирует HEIC-фото с iPhone в JPG или PNG.',
		},
		devUrl: 'http://localhost:3001',
	},
	{
		id: 'leafsize',
		name: 'Leafsize',
		description: {
			en: 'Resize JPG, PNG and WebP images in bulk.',
			ru: 'Пакетно изменяет размер JPG, PNG и WebP.',
		},
		devUrl: 'http://localhost:3002',
	},
	{
		id: 'wavecut',
		name: 'Wavecut',
		description: {
			en: 'Trim audio and export exactly the fragment you need.',
			ru: 'Обрезает аудио и экспортирует нужный фрагмент.',
		},
		devUrl: 'http://localhost:3003',
	},
	{
		id: 'soundshift',
		name: 'Soundshift',
		description: {
			en: 'Convert audio between MP3, WAV, FLAC and OGG.',
			ru: 'Конвертирует аудио между MP3, WAV, FLAC и OGG.',
		},
		devUrl: 'http://localhost:3004',
	},
] as const;

const configuredUrls: Partial<Record<ToolId, string | undefined>> = {
	clearframe: process.env.NEXT_PUBLIC_CLEARFRAME_URL,
	skyconvert: process.env.NEXT_PUBLIC_SKYCONVERT_URL,
	leafsize: process.env.NEXT_PUBLIC_LEAFSIZE_URL,
	wavecut: process.env.NEXT_PUBLIC_WAVECUT_URL,
	soundshift: process.env.NEXT_PUBLIC_SOUNDSHIFT_URL,
};

function trimTrailingSlash(value: string) {
	return value.replace(/\/+$/, '');
}

export function getToolHref(tool: ToolDefinition, locale: ToolLocale) {
	const configured = configuredUrls[tool.id]?.trim();
	const baseUrl = configured
		? trimTrailingSlash(configured)
		: process.env.NODE_ENV !== 'production'
			? tool.devUrl
			: '';

	return baseUrl ? `${baseUrl}/${locale}` : null;
}
