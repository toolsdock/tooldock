import { ArrowDownRight, AudioLines, Image as ImageIcon, Sparkles } from 'lucide-react';
import type { Locale } from '@/shared/config/site';
import { getText } from '@/shared/i18n/dictionary';

export function Hero({ locale }: { locale: Locale }) {
  const text = getText(locale);
  return (
    <section className="hero container" aria-labelledby="hero-title">
      <div className="hero-decor" aria-hidden="true"><div className="orb orb--one"/><div className="orb orb--two"/><div className="orb orb--three"/><div className="hero-grid"/></div>
      <div className="hero-content">
        <span className="eyebrow hero-eyebrow"><span className="eyebrow-star"><Sparkles size={14}/></span>{text.heroKicker}</span>
        <h1 id="hero-title"><span>{text.heroA}</span><br/><span className="hero-gradient">{text.heroB}</span></h1>
        <p>{text.heroCopy}</p>
        <a className="hero-cta" href="#tools">{text.explore}<ArrowDownRight size={19}/></a>
      </div>
      <div className="hero-sculpture" aria-hidden="true">
        <div className="sculpture-track sculpture-track--one" />
        <div className="sculpture-track sculpture-track--two" />
        <div className="sculpture-center"><span className="sculpture-core"><Sparkles size={57} strokeWidth={1.3}/></span></div>
        <div className="sculpture-tile sculpture-tile--image"><ImageIcon size={23}/></div>
        <div className="sculpture-tile sculpture-tile--audio"><AudioLines size={23}/></div>
        <div className="sculpture-glint" />
      </div>
    </section>
  );
}
