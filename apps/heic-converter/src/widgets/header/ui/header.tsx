'use client';
import Link from 'next/link';
import { Container } from '@tools/ui/container';
import { ToolNetworkBar } from '@tools/network/bar';
import { ArrowUpRight } from 'lucide-react';
import { Brand } from '@/shared/ui/brand';
import { useI18n } from '@tools/i18n/provider';
import { ThemeToggle } from '@/features/preferences/ui/theme-toggle';
import { LanguageSwitch } from '@/features/preferences/ui/language-switch';
export function Header() {
	const { t, locale } = useI18n();
	return (
		<>
			<ToolNetworkBar current="skyconvert" locale={locale} />
			<header className="site-header">
				<Container className="header-inner">
					<Link
						className="brand-link"
						href={`/${locale}`}
						aria-label="Home"
					>
						<Brand />
					</Link>
					<nav aria-label="Main navigation">
						<a href="#how-it-works">{t('nav.how')}</a>
						<a href="#faq">{t('nav.faq')}</a>
					</nav>
					<div className="header-preferences">
						<LanguageSwitch />
						<ThemeToggle />
					</div>
					<a className="header-link" href="#tool">
						{t('nav.start')} <ArrowUpRight size={16} />
					</a>
				</Container>
			</header>
		</>
	);
}
