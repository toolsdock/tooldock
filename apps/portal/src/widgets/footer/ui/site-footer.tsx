import Link from 'next/link';
import { ArrowUpRight, Layers3 } from 'lucide-react';
import type { Locale } from '@/shared/config/site';
import { localizedPath } from '@/shared/config/site';
import { getText } from '@/shared/i18n/dictionary';

export function SiteFooter({ locale }: { locale: Locale }) {
  const text = getText(locale);
  return (
    <footer className="site-footer">
      <div className="container footer-inner">
        <div className="footer-intro">
          <Link href={localizedPath(locale)} className="brand brand--footer"><span className="brand-mark"><Layers3 size={19}/></span><span className="brand-word">tool<span>dock</span><i>.</i></span></Link>
          <p>{text.footerDescription}</p>
        </div>
        <nav aria-label={text.categories} className="footer-links">
          <Link href={localizedPath(locale, 'image')}>{text.image} <ArrowUpRight size={15}/></Link>
          <Link href={localizedPath(locale, 'audio')}>{text.audio} <ArrowUpRight size={15}/></Link>
          <a href={`${localizedPath(locale)}#upcoming`}>{text.soon} <ArrowUpRight size={15}/></a>
        </nav>
        <div className="footer-bottom"><span>© {new Date().getUTCFullYear()} ToolDock</span><span>{text.built}</span></div>
      </div>
    </footer>
  );
}
