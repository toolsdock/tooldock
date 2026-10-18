import type { MetadataRoute } from 'next';
import { absoluteUrl, site } from '@/shared/config/site';

// Nginx owns the public origin /robots.txt; this is for standalone dev and testing.
export default function robots(): MetadataRoute.Robots {
  return site.published
    ? { rules: { userAgent: '*', allow: '/' }, sitemap: absoluteUrl('/sitemap.xml') }
    : { rules: { userAgent: '*', disallow: '/' } };
}
