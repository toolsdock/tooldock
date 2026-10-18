'use client';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from '@tools/theme/provider';
import type { Locale } from '@/shared/config/site';
import { getText } from '@/shared/i18n/dictionary';

export function ThemeToggle({ locale }: { locale: Locale }) {
  const { theme, toggle } = useTheme();
  const text = getText(locale);
  return (
    <button type="button" className="utility-button" onClick={toggle} aria-label={theme === 'dark' ? text.themeLight : text.themeDark} title={theme === 'dark' ? text.themeLight : text.themeDark}>
      {theme === 'dark' ? <Sun size={19} strokeWidth={1.8} /> : <Moon size={19} strokeWidth={1.8} />}
    </button>
  );
}
