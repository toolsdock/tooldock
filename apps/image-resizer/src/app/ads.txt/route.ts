import { getAdsTxtEntry } from '@tools/ads/config';

export function GET() {
	const entry = getAdsTxtEntry();

	if (!entry) {
		return new Response('ads.txt is not configured\n', {
			status: 404,
			headers: { 'Content-Type': 'text/plain; charset=utf-8' },
		});
	}

	return new Response(`${entry}\n`, {
		headers: {
			'Content-Type': 'text/plain; charset=utf-8',
			'Cache-Control': 'public, max-age=3600, s-maxage=3600',
		},
	});
}
