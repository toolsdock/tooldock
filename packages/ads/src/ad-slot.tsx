'use client';

import { useEffect, useRef } from 'react';
import {
	ADS_PREVIEW,
	ADSENSE_ENABLED,
	ADSENSE_CLIENT,
	ADSENSE_SLOTS,
	isValidAdsenseClient,
	isValidAdsenseSlot,
	type AdPlacement,
} from './config';

declare global {
	interface Window {
		adsbygoogle?: Record<string, unknown>[];
	}
}

export function AdSlot({
	placement,
	locale,
	className = '',
}: {
	placement: AdPlacement;
	locale: 'en' | 'ru';
	className?: string;
}) {
	const elementRef = useRef<HTMLModElement | null>(null);
	const slot = ADSENSE_SLOTS[placement];
	const enabled =
		ADSENSE_ENABLED &&
		isValidAdsenseClient(ADSENSE_CLIENT) &&
		isValidAdsenseSlot(slot);
	const label = locale === 'ru' ? 'Реклама' : 'Advertisement';

	useEffect(() => {
		const element = elementRef.current;
		if (!enabled || !element || element.dataset.adRequested === 'true')
			return;

		element.dataset.adRequested = 'true';
		try {
			(window.adsbygoogle = window.adsbygoogle || []).push({});
		} catch {
			delete element.dataset.adRequested;
		}
	}, [enabled]);

	if (!enabled && !ADS_PREVIEW) return null;

	return (
		<aside
			className={`ad-slot ad-slot--${placement} ${className}`.trim()}
			aria-label={label}
		>
			<span className="ad-slot__label">{label}</span>
			{enabled ? (
				<ins
					ref={elementRef}
					className="adsbygoogle ad-slot__unit"
					data-ad-client={ADSENSE_CLIENT}
					data-ad-slot={slot}
					data-ad-format="auto"
					data-full-width-responsive="true"
				/>
			) : (
				<div className="ad-slot__preview" aria-hidden="true">
					<span>AdSense · {placement}</span>
				</div>
			)}
		</aside>
	);
}
