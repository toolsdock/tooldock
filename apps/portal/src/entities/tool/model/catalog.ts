import { getToolHref, tools as networkTools, type ToolId } from '@tools/network/registry';
import type { CategoryId, Locale } from '@/shared/config/site';

export type ToolPresentation = {
  id: ToolId;
  category: CategoryId;
  name: string;
  href: string;
  eyebrow: string;
  title: string;
  description: string;
  accent: string;
  accentSecondary: string;
  detail: string;
  format: string;
};

type ToolContent = Record<Locale, {
  eyebrow: string;
  title: string;
  description: string;
  detail: string;
  format: string;
}>;

const content: Record<ToolId, { category: CategoryId; accent: string; accentSecondary: string; copy: ToolContent }> = {
  clearframe: {
    category: 'image', accent: '#a38cff', accentSecondary: '#f0a9d5',
    copy: {
      en: { eyebrow: 'PRIVACY TOOL', title: 'Make photos yours, and only yours.', description: 'Remove hidden EXIF and GPS information from your pictures before sharing.', detail: 'Private, in-browser cleanup', format: 'JPG · PNG · WebP' },
      ru: { eyebrow: 'КОНФИДЕНЦИАЛЬНОСТЬ', title: 'Фото без лишних следов.', description: 'Удаляйте скрытые данные EXIF и GPS из изображений перед публикацией.', detail: 'Очистка в вашем браузере', format: 'JPG · PNG · WebP' },
    },
  },
  skyconvert: {
    category: 'image', accent: '#62c8ff', accentSecondary: '#6ce3d5',
    copy: {
      en: { eyebrow: 'IMAGE CONVERTER', title: 'Your iPhone photos, everywhere.', description: 'Turn HEIC images into universally friendly JPG or PNG files in a few clicks.', detail: 'Fast photo conversion', format: 'HEIC → JPG / PNG' },
      ru: { eyebrow: 'КОНВЕРТЕР ФОТО', title: 'Фото с iPhone — для всех.', description: 'Превращайте HEIC-файлы в привычные JPG или PNG за несколько нажатий.', detail: 'Быстрая конвертация', format: 'HEIC → JPG / PNG' },
    },
  },
  leafsize: {
    category: 'image', accent: '#65daa5', accentSecondary: '#a7e7a0',
    copy: {
      en: { eyebrow: 'BATCH EDITOR', title: 'The right size, every time.', description: 'Resize multiple images while keeping their proportions and quality under control.', detail: 'Resize photos in batches', format: 'JPG · PNG · WebP' },
      ru: { eyebrow: 'ПАКЕТНАЯ ОБРАБОТКА', title: 'Идеальный размер без хлопот.', description: 'Меняйте размер нескольких изображений, сохраняя пропорции и контролируя качество.', detail: 'Пакетное изменение размера', format: 'JPG · PNG · WebP' },
    },
  },
  wavecut: {
    category: 'audio', accent: '#a58cff', accentSecondary: '#ec9ed3',
    copy: {
      en: { eyebrow: 'AUDIO EDITOR', title: 'Only the part that matters.', description: 'Find your moment on the waveform, trim it precisely and export the clip.', detail: 'Trim with a visual waveform', format: 'Audio → WAV' },
      ru: { eyebrow: 'АУДИОРЕДАКТОР', title: 'Только нужный момент.', description: 'Выберите фрагмент на звуковой волне, точно обрежьте и сохраните аудио.', detail: 'Точная обрезка по волне', format: 'Аудио → WAV' },
    },
  },
  soundshift: {
    category: 'audio', accent: '#ffc274', accentSecondary: '#ff9279',
    copy: {
      en: { eyebrow: 'AUDIO CONVERTER', title: 'Every sound, the right format.', description: 'Convert audio between MP3, WAV, FLAC and OGG without uploading your files.', detail: 'Batch audio conversion', format: 'MP3 · WAV · FLAC · OGG' },
      ru: { eyebrow: 'КОНВЕРТЕР АУДИО', title: 'Любой звук. Нужный формат.', description: 'Конвертируйте MP3, WAV, FLAC и OGG без отправки файлов на сервер.', detail: 'Пакетная конвертация аудио', format: 'MP3 · WAV · FLAC · OGG' },
    },
  },
};

export function getCatalog(locale: Locale): ToolPresentation[] {
  return networkTools.flatMap((tool) => {
    const href = getToolHref(tool, locale);
    if (!href) return [];
    const def = content[tool.id];
    return [{ id: tool.id, name: tool.name, category: def.category, href,
      accent: def.accent, accentSecondary: def.accentSecondary, ...def.copy[locale] }];
  });
}

export function getCategoryTools(category: CategoryId, locale: Locale): ToolPresentation[] {
  return getCatalog(locale).filter((tool) => tool.category === category);
}
