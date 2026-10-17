'use client';
import Link from 'next/link';
import { ToolNetworkBar } from '@tools/network/bar';
import { AudioLines } from 'lucide-react';
import { useI18n } from '@tools/i18n/provider';
import { ThemeToggle } from '@/features/preferences/ui/theme-toggle';
import { LanguageSwitch } from '@/features/preferences/ui/language-switch';
export function Header() {
	const { locale } = useI18n();
	return (
		<>
			<ToolNetworkBar current="wavecut" locale={locale} />
			<header className="header wrap">
				<Link className="brand" href={`/${locale}`}>
					<span className="brand-icon">
						<AudioLines size={20} />
					</span>{' '}
					wavecut<span className="brand-dot">.</span>
				</Link>
				<nav className="header-controls" aria-label="Preferences">
					<LanguageSwitch />
					<ThemeToggle />
				</nav>
			</header>
		</>
	);
}
