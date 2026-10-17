import type { ReactNode } from 'react';
import { headers } from 'next/headers';
import './styles.css';
import '@tools/network/styles.css';
import '@tools/ads/styles.css';
import { AdSenseScript } from '@tools/ads/script';

const themeScript = `try{const t=localStorage.getItem('soundshift-theme')==='light'?'light':'dark';document.documentElement.dataset.theme=t;document.documentElement.style.colorScheme=t}catch(e){}`;

export default async function RootLayout({
	children,
}: {
	children: ReactNode;
}) {
	const requestHeaders = await headers();
	const locale =
		requestHeaders.get('x-soundshift-locale') === 'ru' ? 'ru' : 'en';

	return (
		<html
			lang={locale}
			data-theme="dark"
			style={{ colorScheme: 'dark' }}
			suppressHydrationWarning
		>
			<head>
				<script dangerouslySetInnerHTML={{ __html: themeScript }} />
				<AdSenseScript />
			</head>
			<body>{children}</body>
		</html>
	);
}
