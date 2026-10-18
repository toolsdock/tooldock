import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { makeMetadata } from '@/shared/lib/seo';
import { categorySeo } from '@/shared/i18n/dictionary';
import { CategoryView } from '@/views/category/ui/category-view';
import type { CategoryId } from '@/shared/config/site';

const available = ['image', 'audio'] as const;
const validCategory = (value: string): value is CategoryId => available.some((category) => category === value);

export function generateStaticParams() { return available.map((category) => ({ category })); }

export async function generateMetadata({ params }: { params: Promise<{ category: string }> }): Promise<Metadata> {
  const { category } = await params;
  if (!validCategory(category)) notFound();
  return makeMetadata({ locale: 'en', pathname: category, ...categorySeo[category].en });
}

export default async function CategoryPage({ params }: { params: Promise<{ category: string }> }) {
  const { category } = await params;
  if (!validCategory(category)) notFound();
  return <CategoryView locale="en" category={category} />;
}
