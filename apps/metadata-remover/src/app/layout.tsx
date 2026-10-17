import type { ReactNode } from 'react';
import { headers } from 'next/headers';
import './styles.css';
import '@tools/network/styles.css';
import '@tools/ads/styles.css';
import { AdSenseScript } from '@tools/ads/script';
const init = `try { const saved = localStorage.getItem('clearframe-theme'); const theme = saved === 'light' ? 'light' : 'dark'; document.documentElement.dataset.theme = theme; document.documentElement.style.colorScheme = theme; } catch (_) {}`;
export default async function RootLayout({
	children,
}: {
	children: ReactNode;
}) {
	const h = await headers();
	const lang = h.get('x-clearframe-locale') === 'ru' ? 'ru' : 'en';
	return (
		<html
			lang={lang}
			data-theme="dark"
			style={{ colorScheme: 'dark' }}
			suppressHydrationWarning
		>
			<head>
				<script dangerouslySetInnerHTML={{ __html: init }} />
				<AdSenseScript />
			</head>
			<body>{children}</body>
		</html>
	);
}
