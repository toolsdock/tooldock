'use client';
import { Container } from '@tools/ui/container';
import { useI18n } from '@tools/i18n/provider';
import { Logo } from '@tools/ui/logo';
export function Footer() {
	const { t } = useI18n();
	return (
		<footer className="site-footer">
			<Container className="footer-inner">
				<Logo />
				<p>{t('footer.copy')}</p>
				<span>© 2026 Clearframe</span>
			</Container>
		</footer>
	);
}
