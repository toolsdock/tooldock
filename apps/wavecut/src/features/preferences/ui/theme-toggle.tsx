'use client';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from '@tools/theme/provider';
import { useI18n } from '@tools/i18n/provider';
export function ThemeToggle() {
	const { theme, toggle } = useTheme();
	const { t } = useI18n();
	return (
		<button
			className="icon-button"
			type="button"
			onClick={toggle}
			aria-label={t('theme')}
			title={t('theme')}
		>
			{theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
		</button>
	);
}
