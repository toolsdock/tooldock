import { NextResponse, type NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  const explicitRu = pathname === '/ru' || pathname.startsWith('/ru/');
  const cookie = request.cookies.get('td_locale')?.value;
  const preferred = cookie === 'ru' || cookie === 'en'
    ? cookie
    : /^ru(?:-|,|;|$)/i.test(request.headers.get('accept-language')?.trim() || '')
      ? 'ru'
      : 'en';

  // English stays at the canonical root. Explicit /ru URLs are never redirected.
  // Only recognized English catalogue paths get automatic language selection.
  if (!explicitRu && preferred === 'ru' && ['/', '/image', '/audio'].includes(pathname)) {
    const redirect = request.nextUrl.clone();
    redirect.pathname = pathname === '/' ? '/ru' : `/ru${pathname}`;
    const response = NextResponse.redirect(redirect, 307);
    response.headers.set('Cache-Control', 'private, no-store');
    response.headers.set('Vary', 'Accept-Language, Cookie');
    return response;
  }

  const updated = new Headers(request.headers);
  updated.set('x-tooldock-locale', explicitRu ? 'ru' : 'en');
  return NextResponse.next({ request: { headers: updated } });
}

export const config = {
  matcher: ['/','/image','/audio','/ru','/ru/:path*'],
};
