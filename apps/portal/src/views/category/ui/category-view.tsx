import Link from 'next/link';
import { ArrowLeft, ArrowUpRight, AudioLines, Image as ImageIcon } from 'lucide-react';
import { getCategoryTools } from '@/entities/tool/model/catalog';
import { localizedPath, absoluteUrl, type CategoryId, type Locale } from '@/shared/config/site';
import { getText } from '@/shared/i18n/dictionary';
import { serializeJsonLd } from '@/shared/lib/seo';
import { ToolCard } from '@/widgets/tool-grid/ui/tool-card';
import { SiteHeader } from '@/widgets/header/ui/site-header';
import { SiteFooter } from '@/widgets/footer/ui/site-footer';

export function CategoryView({ locale, category }: { locale: Locale; category: CategoryId }) {
  const text = getText(locale);
  const isImage = category === 'image';
  const title = isImage ? text.imageTitle : text.audioTitle;
  const subtitle = isImage ? text.imageSubtitle : text.audioSubtitle;
  const tools = getCategoryTools(category, locale);
  const categoryName = isImage ? text.image : text.audio;
  const pathname = localizedPath(locale, category);
  const schema = {
    '@context': 'https://schema.org',
    '@graph': [
      { '@type': 'CollectionPage', name: title, description: subtitle, url: absoluteUrl(pathname), inLanguage: locale,
        mainEntity: { '@type': 'ItemList', itemListElement: tools.map((tool, index) => ({ '@type': 'ListItem', position: index + 1, name: tool.name, url: tool.href })) } },
      { '@type': 'BreadcrumbList', itemListElement: [
        { '@type': 'ListItem', position: 1, name: text.breadcrumbHome, item: absoluteUrl(localizedPath(locale)) },
        { '@type': 'ListItem', position: 2, name: categoryName, item: absoluteUrl(pathname) },
      ] },
    ],
  };
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeJsonLd(schema) }}/>
      <SiteHeader locale={locale} pathname={category}/>
      <main className="category-main container">
        <nav className="breadcrumbs" aria-label="Breadcrumb"><Link href={localizedPath(locale)}>{text.breadcrumbHome}</Link><span>/</span><span aria-current="page">{categoryName}</span></nav>
        <div className={`category-hero category-hero--${category}`}><span className="category-hero__light"/><span className="eyebrow">{text.categoryEyebrow}</span><span className="category-hero__icon">{isImage ? <ImageIcon size={34}/> : <AudioLines size={34}/>}</span><h1>{title}</h1><p>{subtitle}</p><span className="category-hero__count">{tools.length} {text.searchCount}<ArrowUpRight size={16}/></span></div>
        <div className="category-list-heading"><h2>{categoryName}</h2><span>{String(tools.length).padStart(2, '0')}</span></div>
        <div className={`tool-grid tool-grid--${category}`}>
          {tools.map((tool, index) => <ToolCard key={tool.id} tool={tool} featured={index === 0 && isImage} openLabel={text.open}/>)}
        </div>
        <section className="category-editorial"><h2>{locale === 'ru' ? 'Что можно сделать?' : 'What can you do here?'}</h2><p>{isImage ? text.imageSeoText : text.audioSeoText}</p></section>
        <Link className="category-return" href={localizedPath(locale)}><ArrowLeft size={18}/>{text.categoryBack}</Link>
      </main>
      <SiteFooter locale={locale}/>
    </>
  );
}
