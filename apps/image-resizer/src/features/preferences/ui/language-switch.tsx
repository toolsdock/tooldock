'use client';
import { usePathname, useRouter } from 'next/navigation';
import { useI18n } from '@tools/i18n/provider';
import type { Locale } from '@tools/i18n/locale';
export function LanguageSwitch() {
	const { locale, t } = useI18n();
	const router = useRouter();
	const pathname = usePathname();
	function change(next: Locale) {
		if (next === locale) return;
		const path = pathname.replace(/^\/(en|ru)(?=\/|$)/, `/${next}`);
		router.push(path);
	}
	return (
		<label className="language-select">
			<span className="sr-only">{t('lang.label')}</span>
			<select
				aria-label={t('lang.label')}
				value={locale}
				onChange={(e) => change(e.target.value as Locale)}
			>
				<option value="en">EN</option>
				<option value="ru">RU</option>
			</select>
		</label>
	);
}
