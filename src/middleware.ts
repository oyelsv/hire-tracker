import { NextRequest, NextResponse } from 'next/server';
import createMiddleware from 'next-intl/middleware';
import NextAuth, { Session } from 'next-auth';

import authConfig from '@/auth.config';

import { locales, routing } from './i18n/routing';
import { BASE_SEGMENT_REDIRECT, DEFAULT_LOGIN_REDIRECT, authRoutes, publicRoutes } from './routes';

const { auth } = NextAuth(authConfig);

const intlMiddleware = createMiddleware(routing);

const testPathnameRegex = (pages: string[], pathName: string): boolean => {
  const pathsWithParams = pages.map((p) => p.replace(/\[.*?]/g, '[^/]+'));

  return RegExp(
    `^(/(${locales.join('|')}))?(${pathsWithParams.flatMap((p) => (p === '/' ? ['', '/'] : p)).join('|')})/?$`,
    'i'
  ).test(pathName);
};

const authMiddleware = auth((req: NextRequest & { auth: Session | null }) => {
  const { nextUrl, url, auth: authSession } = req;
  const isLogged = !!authSession;
  const isAuthPage = testPathnameRegex(authRoutes, nextUrl.pathname);

  if (!isLogged && !isAuthPage) {
    return NextResponse.redirect(new URL('/auth/login', nextUrl));
  }

  if (isLogged && isAuthPage) {
    return NextResponse.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl));
  }

  if (nextUrl.pathname === '/') {
    return Response.redirect(new URL(BASE_SEGMENT_REDIRECT, url));
  }

  return intlMiddleware(req);
});

const middleware = (req: NextRequest) => {
  const isPublicPage = testPathnameRegex(publicRoutes, req.nextUrl.pathname);
  const isAuthPage = testPathnameRegex(authRoutes, req.nextUrl.pathname);

  if (isAuthPage) {
    return (authMiddleware as any)(req);
  }

  if (isPublicPage) {
    return intlMiddleware(req);
  }

  return (authMiddleware as any)(req);
};

export const config = {
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)'],
};

export default middleware;
