import { NextResponse, type NextRequest } from 'next/server';
import { detectLocale } from '@tools/i18n/locale';
export function middleware(request: NextRequest) {
	const { pathname } = request.nextUrl;
	if (pathname === '/') {
		const url = request.nextUrl.clone();
		url.pathname = `/${detectLocale(request.headers.get('accept-language'))}`;
		return NextResponse.redirect(url, 307);
	}
	const locale = pathname.split('/')[1];
	const headers = new Headers(request.headers);
	headers.set('x-clearframe-locale', locale === 'ru' ? 'ru' : 'en');
	return NextResponse.next({ request: { headers } });
}
export const config = { matcher: ['/', '/en/:path*', '/ru/:path*'] };
