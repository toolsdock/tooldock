'use client';
import { usePathname, useRouter } from 'next/navigation';
import { useI18n } from '@tools/i18n/provider';
export function LanguageSwitch() {
	const { locale, t } = useI18n();
	const pathname = usePathname();
	const router = useRouter();
	return (
		<label className="lang-switch">
			<span className="sr-only">{t('lang.label')}</span>
			<select
				aria-label={t('lang.label')}
				value={locale}
				onChange={(e) => {
					const next = e.target.value;
					const path = (pathname ?? `/${locale}`).replace(
						/^\/(en|ru)(?=\/|$)/,
						`/${next}`,
					);
					router.push(path || `/${next}`);
				}}
			>
				<option value="en">EN</option>
				<option value="ru">RU</option>
			</select>
		</label>
	);
}
