const raw = process.env.NEXT_PUBLIC_PORTAL_SITE_URL?.trim();

export const site = {
  name: 'ToolDock',
  url: (raw || 'http://localhost:3005').replace(/\/+$/, ''),
  published: Boolean(raw?.startsWith('https://')),
} as const;

export type Locale = 'en' | 'ru';
export type CategoryId = 'image' | 'audio';

export function localizedPath(locale: Locale, pathname = ''): string {
  const suffix = pathname ? `/${pathname.replace(/^\/+|\/+$/g, '')}` : '';
  return `${locale === 'ru' ? '/ru' : ''}${suffix}` || '/';
}

export function absoluteUrl(pathname = ''): string {
  return `${site.url}${pathname.startsWith('/') ? pathname : `/${pathname}`}`;
}
