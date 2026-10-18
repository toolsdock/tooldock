import type { Metadata } from 'next';
import { absoluteUrl, localizedPath, type Locale } from '@/shared/config/site';

export function makeMetadata({ locale, pathname = '', title, description }: {
  locale: Locale;
  pathname?: string;
  title: string;
  description: string;
}): Metadata {
  const current = localizedPath(locale, pathname);
  const english = localizedPath('en', pathname);
  const russian = localizedPath('ru', pathname);
  return {
    title,
    description,
    applicationName: 'ToolDock',
    metadataBase: new URL(absoluteUrl('/')),
    alternates: {
      canonical: current,
      languages: { en: english, ru: russian, 'x-default': english },
    },
    openGraph: {
      title,
      description,
      type: 'website',
      siteName: 'ToolDock',
      locale: locale === 'ru' ? 'ru_RU' : 'en_US',
      alternateLocale: locale === 'ru' ? ['en_US'] : ['ru_RU'],
      url: current,
      images: [{ url: '/opengraph-image', width: 1200, height: 630, alt: 'ToolDock — tools for everyday tasks' }],
    },
    twitter: { card: 'summary_large_image', title, description, images: ['/opengraph-image'] },
    robots: { index: true, follow: true },
  };
}

export function serializeJsonLd(value: unknown): string {
  return JSON.stringify(value).replace(/</g, '\\u003c');
}
