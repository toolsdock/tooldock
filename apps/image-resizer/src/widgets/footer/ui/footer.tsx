'use client';
import { Brand } from '@/shared/ui/brand';
import { useI18n } from '@tools/i18n/provider';
export function Footer() {
	const { t } = useI18n();
	return (
		<footer className="site-footer">
			<div className="container footer-inner">
				<Brand />
				<p>{t('footer.copy')}</p>
				<span>© {new Date().getFullYear()} Leafsize</span>
			</div>
		</footer>
	);
}
