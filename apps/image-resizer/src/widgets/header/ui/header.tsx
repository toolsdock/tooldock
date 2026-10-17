'use client';
import { ToolNetworkBar } from '@tools/network/bar';
import { Brand } from '@/shared/ui/brand';
import { useI18n } from '@tools/i18n/provider';
import { ThemeToggle } from '@/features/preferences/ui/theme-toggle';
import { LanguageSwitch } from '@/features/preferences/ui/language-switch';
export function Header() {
	const { t, locale } = useI18n();
	return (
		<>
			<ToolNetworkBar current="leafsize" locale={locale} />
			<header className="site-header">
				<div className="container header-inner">
					<Brand />
					<nav aria-label="Main navigation">
						<a href="#features">{t('nav.features')}</a>
						<a href="#how-it-works">{t('nav.how')}</a>
						<a href="#faq">{t('nav.faq')}</a>
					</nav>
					<div className="header-controls">
						<LanguageSwitch />
						<ThemeToggle />
						<a className="header-link" href="#tool">
							{t('nav.start')}
						</a>
					</div>
				</div>
			</header>
		</>
	);
}
