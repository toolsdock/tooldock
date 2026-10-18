import type { Metadata } from 'next';
import { makeMetadata } from '@/shared/lib/seo';
import { HomeView } from '@/views/home/ui/home-view';

export const metadata: Metadata = makeMetadata({
  locale: 'en',
  title: 'ToolDock — Free Online Image & Audio Tools',
  description: 'Discover free, easy-to-use online tools to remove photo metadata, convert HEIC images, resize pictures, trim audio and convert audio formats.',
});

export default function Page() { return <HomeView locale="en" />; }
