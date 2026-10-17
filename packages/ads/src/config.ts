export type AdPlacement = 'primary' | 'secondary';

export const ADSENSE_CLIENT =
	process.env.NEXT_PUBLIC_ADSENSE_CLIENT?.trim() ?? '';

export const ADSENSE_SLOTS: Record<AdPlacement, string> = {
	primary: process.env.NEXT_PUBLIC_ADSENSE_SLOT_PRIMARY?.trim() ?? '',
	secondary: process.env.NEXT_PUBLIC_ADSENSE_SLOT_SECONDARY?.trim() ?? '',
};

// Live requests are opt-in. This prevents accidental ad impressions while
// developing locally even if a developer already has publisher IDs in .env.
export const ADSENSE_ENABLED =
	process.env.NODE_ENV === 'production' &&
	process.env.NEXT_PUBLIC_ADSENSE_ENABLED === 'true';

export const ADS_PREVIEW =
	!ADSENSE_ENABLED &&
	(process.env.NEXT_PUBLIC_ADS_PREVIEW === 'true' ||
		process.env.NODE_ENV !== 'production');

export function isValidAdsenseClient(value = ADSENSE_CLIENT) {
	return /^ca-pub-\d{16}$/.test(value);
}

export function isValidAdsenseSlot(value: string) {
	return /^\d+$/.test(value);
}

export function getAdsTxtEntry(value = ADSENSE_CLIENT) {
	if (!isValidAdsenseClient(value)) return null;
	const publisherId = value.replace(/^ca-/, '');
	return `google.com, ${publisherId}, DIRECT, f08c47fec0942fa0`;
}
