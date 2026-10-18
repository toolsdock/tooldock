import type { ReactNode } from 'react';
import type { Metadata } from 'next';
import { site } from '@/shared/config/site';
import { headers } from 'next/headers';
import { ThemeProvider } from '@tools/theme/provider';
import './globals.css';

export const metadata: Metadata = { metadataBase: new URL(site.url) };

const initialThemeScript = `try{const t=localStorage.getItem('tools-theme')==='light'?'light':'dark';document.documentElement.dataset.theme=t;document.documentElement.style.colorScheme=t}catch(e){}`;

export default async function RootLayout({ children }: { children: ReactNode }) {
  const headersList = await headers();
  const locale = headersList.get('x-tooldock-locale') === 'ru' ? 'ru' : 'en';
  return (
    <html lang={locale} data-theme="dark" style={{ colorScheme: 'dark' }} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: initialThemeScript }} />
      </head>
      <body>
        <ThemeProvider storageKey="tools-theme">{children}</ThemeProvider>
      </body>
    </html>
  );
}
