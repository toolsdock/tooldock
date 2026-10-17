'use client';

import { usePathname, useRouter } from 'next/navigation';
import { useI18n } from '@tools/i18n/provider';

export function LanguageSwitch() {
	const { locale, t } = useI18n();
	const router = useRouter();
	const pathname = usePathname();

	return (
		<select
			aria-label={t('language')}
			className="lang-switch"
			value={locale}
			onChange={(event) => {
				const next = event.target.value;
				const path = (pathname ?? `/${locale}`).replace(
					/^\/(en|ru)(?=\/|$)/,
					`/${next}`,
				);
				router.push(path);
			}}
		>
			<option value="en">EN</option>
			<option value="ru">RU</option>
		</select>
	);
}
