export const site = {
	name: 'Skyconvert',
	url: process.env.NEXT_PUBLIC_HEIC_SITE_URL || 'https://skyconvert.invalid',
	title: 'HEIC to JPG Converter — Free, Private & Online | Skyconvert',
	description:
		'Convert iPhone HEIC photos to JPG or PNG in your browser. No uploads, no signup. Free, fast and private HEIC converter.',
} as const;
