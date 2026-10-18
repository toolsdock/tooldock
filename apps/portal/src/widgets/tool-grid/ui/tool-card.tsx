'use client';
import type { CSSProperties, PointerEvent } from 'react';
import { ArrowUpRight } from 'lucide-react';
import type { ToolPresentation } from '@/entities/tool/model/catalog';
import { ToolPreview } from './tool-preview';

// CSS perspective + a moving specular highlight stay GPU-friendly without
// allocating a WebGL context for each card. Works on touch without hover.
function move(event: PointerEvent<HTMLAnchorElement>) {
  if (event.pointerType !== 'mouse' && event.pointerType !== 'pen') return;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  const el = event.currentTarget;
  const rect = el.getBoundingClientRect();
  const x = (event.clientX - rect.left) / rect.width;
  const y = (event.clientY - rect.top) / rect.height;
  el.style.setProperty('--pointer-x', `${(x * 100).toFixed(2)}%`);
  el.style.setProperty('--pointer-y', `${(y * 100).toFixed(2)}%`);
  el.style.setProperty('--rotate-x', `${((0.5 - y) * 7).toFixed(2)}deg`);
  el.style.setProperty('--rotate-y', `${((x - 0.5) * 9).toFixed(2)}deg`);
}
function leave(event: PointerEvent<HTMLAnchorElement>) {
  const el = event.currentTarget;
  el.style.removeProperty('--rotate-x');
  el.style.removeProperty('--rotate-y');
  el.style.removeProperty('--pointer-x');
  el.style.removeProperty('--pointer-y');
}

export function ToolCard({ tool, featured = false, openLabel }: { tool: ToolPresentation; featured?: boolean; openLabel: string }) {
  const variables = { '--card-accent': tool.accent, '--card-secondary': tool.accentSecondary } as CSSProperties;
  return (
    <a href={tool.href} className={`tool-card tool-card--${tool.id}${featured ? ' tool-card--featured' : ''}`} style={variables} onPointerMove={move} onPointerLeave={leave}>
      <span className="tool-card__glare" aria-hidden="true"/>
      <span className="tool-card__grain" aria-hidden="true"/>
      <span className="tool-card__content">
        <span className="tool-card__top"><span className="tool-card__eyebrow"><i/> {tool.eyebrow}</span><span className="tool-card__arrow" aria-hidden="true"><ArrowUpRight size={19}/></span></span>
        <span className="tool-card__preview"><ToolPreview id={tool.id}/></span>
        <span className="tool-card__bottom"><span className="tool-card__name">{tool.name}</span><strong className="tool-card__title">{tool.title}</strong><span className="tool-card__description">{tool.description}</span><span className="tool-card__meta"><span>{tool.format}</span><span>{openLabel} <ArrowUpRight size={14}/></span></span></span>
      </span>
    </a>
  );
}
