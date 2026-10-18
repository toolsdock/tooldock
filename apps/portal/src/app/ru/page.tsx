import type { Metadata } from 'next';
import { makeMetadata } from '@/shared/lib/seo';
import { HomeView } from '@/views/home/ui/home-view';

export const metadata: Metadata = makeMetadata({
  locale: 'ru',
  title: 'ToolDock — бесплатные онлайн-инструменты для фото и аудио',
  description: 'Бесплатные инструменты для изображений и аудио: удаление EXIF, конвертация HEIC, изменение размеров, обрезка и конвертация звука.',
});

export default function Page() { return <HomeView locale="ru" />; }
