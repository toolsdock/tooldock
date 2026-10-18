import type { MetadataRoute } from 'next';
import { site, absoluteUrl, localizedPath } from '@/shared/config/site';

export default function sitemap(): MetadataRoute.Sitemap {
  if (!site.published) return [];
  return ['', 'image', 'audio'].flatMap((pathname) =>
    (['en', 'ru'] as const).map((locale) => ({
      url: absoluteUrl(localizedPath(locale, pathname)),
      changeFrequency: 'weekly' as const,
      priority: pathname ? 0.8 : 1,
      alternates: {
        languages: {
          en: absoluteUrl(localizedPath('en', pathname)),
          ru: absoluteUrl(localizedPath('ru', pathname)),
          'x-default': absoluteUrl(localizedPath('en', pathname)),
        },
      },
    })));
}
