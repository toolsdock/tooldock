import { NextResponse, type NextRequest } from 'next/server';
import { detectLocale } from '@tools/i18n/locale';

export function middleware(request: NextRequest) {
	const pathname = request.nextUrl.pathname;

	if (pathname === '/') {
		const locale = detectLocale(request.headers.get('accept-language'));
		const url = request.nextUrl.clone();
		url.pathname = `/${locale}`;
		return NextResponse.redirect(url, 307);
	}

	const locale = pathname.split('/')[1] === 'ru' ? 'ru' : 'en';
	const headers = new Headers(request.headers);
	headers.set('x-soundshift-locale', locale);

	return NextResponse.next({ request: { headers } });
}

export const config = { matcher: ['/', '/en', '/ru'] };
