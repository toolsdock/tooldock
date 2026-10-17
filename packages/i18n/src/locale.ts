export const locales = ['en', 'ru'] as const;
export type Locale = (typeof locales)[number];
export function isLocale(value: string): value is Locale {
	return locales.includes(value as Locale);
}
export function detectLocale(acceptLanguage: string | null): Locale {
	const languages = (acceptLanguage || '')
		.split(',')
		.map((part) => {
			const [tag, ...params] = part.trim().split(';');
			const q = params.find((p) => p.trim().startsWith('q='));
			return {
				tag: tag.toLowerCase(),
				q: q ? Number(q.trim().slice(2)) : 1,
			};
		})
		.filter((x) => Number.isFinite(x.q) && x.q > 0)
		.sort((a, b) => b.q - a.q);
	for (const { tag } of languages) {
		if (tag === 'ru' || tag.startsWith('ru-')) return 'ru';
		if (tag === 'en' || tag.startsWith('en-')) return 'en';
	}
	return 'en';
}
