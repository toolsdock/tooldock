'use client';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from '@tools/theme/provider';
import { useI18n } from '@tools/i18n/provider';
export function ThemeToggle() {
	const { theme, toggle } = useTheme();
	const { t } = useI18n();
	const label = t(theme === 'dark' ? 'theme.light' : 'theme.dark');
	return (
		<button
			type="button"
			className="pref-button"
			onClick={toggle}
			aria-label={label}
			title={label}
		>
			{theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
		</button>
	);
}
