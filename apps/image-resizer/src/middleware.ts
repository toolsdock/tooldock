import { NextResponse, type NextRequest } from 'next/server';
import { detectLocale, isLocale } from '@tools/i18n/locale';

export function middleware(request: NextRequest) {
	const { pathname } = request.nextUrl;
	if (pathname === '/') {
		const url = request.nextUrl.clone();
		url.pathname = `/${detectLocale(request.headers.get('accept-language'))}`;
		return NextResponse.redirect(url, 307);
	}
	const segment = pathname.split('/')[1];
	const requestHeaders = new Headers(request.headers);
	requestHeaders.set('x-leafsize-locale', isLocale(segment) ? segment : 'en');
	return NextResponse.next({ request: { headers: requestHeaders } });
}

export const config = {
	matcher: [
		'/((?!api|_next/static|_next/image|favicon.ico|favicon.svg|icon.svg|robots.txt|sitemap.xml).*)',
	],
};
