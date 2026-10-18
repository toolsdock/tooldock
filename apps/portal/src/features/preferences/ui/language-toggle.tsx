'use client';
import Link from 'next/link';
import { Globe2 } from 'lucide-react';
import { localizedPath, type Locale } from '@/shared/config/site';
import { getText } from '@/shared/i18n/dictionary';

export function LanguageToggle({ locale, pathname }: { locale: Locale; pathname?: string }) {
  const nextLocale: Locale = locale === 'en' ? 'ru' : 'en';
  const target = localizedPath(nextLocale, pathname);
  const save = () => {
    document.cookie = `td_locale=${nextLocale}; Max-Age=31536000; Path=/; SameSite=Lax${location.protocol === 'https:' ? '; Secure' : ''}`;
  };
  return (
    <Link href={target} className="language-toggle" hrefLang={nextLocale} onClick={save} aria-label={getText(locale).language + ': ' + nextLocale.toUpperCase()}>
      <Globe2 size={17} strokeWidth={1.8} />
      <span>{locale.toUpperCase()}</span>
    </Link>
  );
}
