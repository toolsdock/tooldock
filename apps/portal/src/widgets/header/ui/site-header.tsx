import Link from 'next/link';
import { ArrowUpRight, Layers3 } from 'lucide-react';
import type { Locale } from '@/shared/config/site';
import { localizedPath } from '@/shared/config/site';
import { getText } from '@/shared/i18n/dictionary';
import { ThemeToggle } from '@/features/preferences/ui/theme-toggle';
import { LanguageToggle } from '@/features/preferences/ui/language-toggle';

export function SiteHeader({ locale, pathname = '' }: { locale: Locale; pathname?: string }) {
  const text = getText(locale);
  return (
    <header className="site-header">
      <div className="container header-inner">
        <Link href={localizedPath(locale)} className="brand" aria-label="ToolDock home">
          <span className="brand-mark"><Layers3 size={21} strokeWidth={2.25} /></span>
          <span className="brand-word">tool<span>dock</span><i>.</i></span>
        </Link>
        <nav className="main-navigation" aria-label={text.categories}>
          <Link href={localizedPath(locale, 'image')} aria-current={pathname === 'image' ? 'page' : undefined}>{text.image}</Link>
          <Link href={localizedPath(locale, 'audio')} aria-current={pathname === 'audio' ? 'page' : undefined}>{text.audio}</Link>
          <a href={`${localizedPath(locale)}#upcoming`}>{text.soon}<ArrowUpRight size={13} /></a>
        </nav>
        <div className="header-actions">
          <LanguageToggle locale={locale} pathname={pathname} />
          <ThemeToggle locale={locale} />
          <a className="header-all" href={`${localizedPath(locale)}#tools`}>{text.tools}<ArrowUpRight size={16}/></a>
        </div>
      </div>
    </header>
  );
}
