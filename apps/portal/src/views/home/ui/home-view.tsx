import { ArrowUpRight, AudioLines, Atom, Code2, GraduationCap, LockKeyhole, Sparkles, Zap } from 'lucide-react';
import { getCatalog } from '@/entities/tool/model/catalog';
import { site, type Locale } from '@/shared/config/site';
import { getText } from '@/shared/i18n/dictionary';
import { serializeJsonLd } from '@/shared/lib/seo';
import { SiteHeader } from '@/widgets/header/ui/site-header';
import { Hero } from '@/widgets/hero/ui/hero';
import { SearchableCatalog } from '@/features/search-tools/ui/searchable-catalog';
import { SiteFooter } from '@/widgets/footer/ui/site-footer';

export function HomeView({ locale }: { locale: Locale }) {
  const text = getText(locale);
  const tools = getCatalog(locale);
  const schema = {
    '@context': 'https://schema.org',
    '@graph': [
      { '@type': 'Organization', '@id': `${site.url}/#organization`, name: 'ToolDock', url: site.url },
      { '@type': 'WebSite', '@id': `${site.url}/#website`, name: 'ToolDock', url: site.url, publisher: { '@id': `${site.url}/#organization` }, inLanguage: ['en', 'ru'] },
      { '@type': 'CollectionPage', name: 'ToolDock Online Tools', url: `${site.url}${locale === 'ru' ? '/ru' : '/'}`, inLanguage: locale,
        mainEntity: { '@type': 'ItemList', itemListElement: tools.map((tool, index) => ({ '@type': 'ListItem', position: index + 1, name: tool.name, url: tool.href })) } },
    ],
  };
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeJsonLd(schema) }}/>
      <SiteHeader locale={locale}/>
      <main>
        <Hero locale={locale}/>
        <SearchableCatalog locale={locale} tools={tools}/>
        <section id="upcoming" className="upcoming-section container" aria-labelledby="upcoming-title">
          <div className="upcoming-copy"><span className="eyebrow"><Sparkles size={14}/>{text.soon.toUpperCase()}</span><h2 id="upcoming-title">{text.moreHeading}</h2><p>{text.moreCopy}</p></div>
          <div className="upcoming-list"><div><GraduationCap size={21}/>{text.math}<ArrowUpRight size={16}/></div><div><Atom size={21}/>{text.physics}<ArrowUpRight size={16}/></div><div><Code2 size={21}/>{text.developer}<ArrowUpRight size={16}/></div></div>
        </section>
        <section className="benefits container" aria-label={text.built}>
          <div><span className="benefit-icon"><LockKeyhole size={21}/></span><h3>{text.privacy}</h3><p>{text.privacyCopy}</p></div>
          <div><span className="benefit-icon"><Zap size={21}/></span><h3>{text.simplicity}</h3><p>{text.simplicityCopy}</p></div>
          <div><span className="benefit-icon"><AudioLines size={21}/></span><h3>{text.free}</h3><p>{text.freeCopy}</p></div>
        </section>
      </main>
      <SiteFooter locale={locale}/>
    </>
  );
}
