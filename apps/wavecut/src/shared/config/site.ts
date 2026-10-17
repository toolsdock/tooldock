export const SITE_URL = (
	process.env.NEXT_PUBLIC_WAVECUT_SITE_URL ||
	'https://wavecut.example.invalid'
).replace(/\/$/, '');
export const IS_PRODUCTION_SITE =
	!SITE_URL.includes('.invalid') && SITE_URL.startsWith('https://');
export const SITE_NAME = 'Wavecut';
