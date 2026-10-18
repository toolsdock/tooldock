import { getAdsTxtEntry } from '@tools/ads/config';

export const dynamic = 'force-dynamic';

export function GET() {
	const client = process.env.ADSENSE_CLIENT?.trim() ?? '';
	const entry = getAdsTxtEntry(client);

	if (!entry) {
		return new Response('ads.txt is not configured\n', {
			status: 404,
			headers: {
				'Content-Type': 'text/plain; charset=utf-8',
			},
		});
	}

	return new Response(`${entry}\n`, {
		status: 200,
		headers: {
			'Content-Type': 'text/plain; charset=utf-8',
			'Cache-Control': 'public, max-age=3600, s-maxage=3600',
		},
	});
}
