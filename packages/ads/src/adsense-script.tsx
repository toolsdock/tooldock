import {
	ADSENSE_CLIENT,
	ADSENSE_ENABLED,
	isValidAdsenseClient,
} from './config';

export function AdSenseScript() {
	if (!ADSENSE_ENABLED || !isValidAdsenseClient()) return null;

	return (
		<script
			async
			crossOrigin="anonymous"
			src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_CLIENT}`}
		/>
	);
}
