import type { Metadata } from 'next';
export function createMetadata({
	title,
	description,
	baseUrl,
	path = '/',
}: {
	title: string;
	description: string;
	baseUrl: string;
	path?: string;
}): Metadata {
	return {
		title,
		description,
		metadataBase: new URL(baseUrl),
		alternates: { canonical: path },
		openGraph: {
			title,
			description,
			type: 'website',
			url: path,
			siteName: 'Clearframe',
		},
		robots: { index: true, follow: true },
	};
}
