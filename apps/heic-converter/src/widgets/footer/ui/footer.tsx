'use client';
import { Container } from '@tools/ui/container';
import { useI18n } from '@tools/i18n/provider';
import { Brand } from '@/shared/ui/brand';
export function Footer() {
	const { t } = useI18n();
	return (
		<footer className="site-footer">
			<Container className="footer-inner">
				<Brand />
				<p>{t('footer.copy')}</p>
				<span>© 2026 Skyconvert</span>
			</Container>
		</footer>
	);
}
