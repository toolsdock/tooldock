import type { ReactNode } from 'react';
import { headers } from 'next/headers';
import './styles.css';
import '@tools/network/styles.css';
import '@tools/ads/styles.css';
import { AdSenseScript } from '@tools/ads/script';

// Runs before hydration to restore the persisted theme without a light-mode flash.
const themeInit = `try { const saved = localStorage.getItem('leafsize-theme'); const theme = saved === 'light' ? 'light' : 'dark'; document.documentElement.dataset.theme = theme; document.documentElement.style.colorScheme = theme; } catch (_) { document.documentElement.dataset.theme = 'dark'; document.documentElement.style.colorScheme = 'dark'; }`;

export default async function RootLayout({
	children,
}: {
	children: ReactNode;
}) {
	const requestHeaders = await headers();
	const lang = requestHeaders.get('x-leafsize-locale') === 'ru' ? 'ru' : 'en';
	return (
		<html
			lang={lang}
			data-theme="dark"
			style={{ colorScheme: 'dark' }}
			suppressHydrationWarning
		>
			<head>
				<script dangerouslySetInnerHTML={{ __html: themeInit }} />
				<AdSenseScript />
			</head>
			<body>{children}</body>
		</html>
	);
}
