'use client';
import Link from 'next/link';
import { ScanLine } from 'lucide-react';
import { useI18n } from '@tools/i18n/provider';
export function Brand() {
	const { locale } = useI18n();
	return (
		<Link className="brand" href={`/${locale}`} aria-label="Leafsize home">
			<span className="brand-mark">
				<ScanLine size={19} />
			</span>
			leafsize<span className="brand-dot">.</span>
		</Link>
	);
}
