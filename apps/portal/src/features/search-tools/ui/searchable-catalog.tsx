'use client';
import { useDeferredValue, useEffect, useRef, useState } from 'react';
import { ArrowUpRight, AudioLines, Image as ImageIcon, Search } from 'lucide-react';
import Link from 'next/link';
import type { ToolPresentation } from '@/entities/tool/model/catalog';
import { ToolCard } from '@/widgets/tool-grid/ui/tool-card';
import { getText } from '@/shared/i18n/dictionary';
import { localizedPath, type CategoryId, type Locale } from '@/shared/config/site';

function CatalogSection({ category, tools, locale }: { category: CategoryId; tools: ToolPresentation[]; locale: Locale }) {
  const text = getText(locale);
  const isImage = category === 'image';
  const title = isImage ? text.imageHeading : text.audioHeading;
  const description = isImage ? text.imageDesc : text.audioDesc;
  return (
    <section className="catalog-section" aria-label={isImage ? text.image : text.audio}>
      <div className="catalog-section__heading"><div className="catalog-heading-group"><span className={`category-icon category-icon--${category}`}>{isImage ? <ImageIcon size={23}/> : <AudioLines size={23}/>}</span><div><h3>{title}</h3><p>{description}</p></div></div><Link href={localizedPath(locale, category)} className="category-link">{isImage ? text.allImage : text.allAudio}<ArrowUpRight size={17}/></Link></div>
      <div className={`tool-grid tool-grid--${category}`}>
        {tools.map((tool, index) => <ToolCard key={tool.id} tool={tool} featured={index === 0 && isImage} openLabel={text.open}/>)}
      </div>
    </section>
  );
}

export function SearchableCatalog({ locale, tools }: { locale: Locale; tools: ToolPresentation[] }) {
  const text = getText(locale);
  const [query, setQuery] = useState('');
  const searchRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && document.activeElement === searchRef.current) {
        searchRef.current?.blur();
        setQuery('');
      }
      if (event.key !== '/' || event.metaKey || event.ctrlKey || event.altKey) return;
      const el = document.activeElement;
      if (el instanceof HTMLInputElement || el instanceof HTMLTextAreaElement || (el instanceof HTMLElement && el.isContentEditable)) return;
      event.preventDefault();
      searchRef.current?.focus();
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, []);
  const deferred = useDeferredValue(query);
  const needle = deferred.toLocaleLowerCase(locale).trim();
  const filtered = !needle ? tools : tools.filter((tool) =>
    [tool.name, tool.title, tool.description, tool.eyebrow, tool.detail, tool.format].some((s) => s.toLocaleLowerCase(locale).includes(needle))
  );
  return (
    <section id="tools" className="catalog container" aria-labelledby="catalog-title">
      <div className="catalog-intro"><div><span className="eyebrow">{text.catalogEyebrow}</span><h2 id="catalog-title">{text.discover}<span className="title-spark">✳</span></h2></div><span className="catalog-count"><i/>{tools.length} {text.searchCount}</span></div>
      <div className="catalog-search"><Search size={21}/><input ref={searchRef} type="search" aria-label={text.searchLabel} placeholder={text.search} value={query} onChange={(event) => setQuery(event.target.value)} autoComplete="off"/><kbd>/</kbd></div>
      {filtered.length === 0 ? <div className="no-results" role="status">{text.noResults}</div> : <div className="catalog-groups">{(['image', 'audio'] as const).map((category) => { const group = filtered.filter((tool) => tool.category === category); return group.length ? <CatalogSection key={category} category={category} tools={group} locale={locale}/> : null; })}</div>}
    </section>
  );
}
