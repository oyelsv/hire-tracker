import NextAuth, { Session } from 'next-auth';
import { NextRequest } from 'next/server';

import authConfig from '@/auth.config';
import { apiAuthPrefix, authRoutes, BASE_SEGMENT_REDIRECT, DEFAULT_LOGIN_REDIRECT, publicRoutes } from '@/routes';

const { auth } = NextAuth(authConfig);

export default auth((req: NextRequest & { auth: Session | null }): Response | void => {
  const { nextUrl } = req;
  const isLoggedIn = !!req.auth;

  const isAuthRoute = authRoutes.includes(nextUrl.pathname);
  const isPublicRoute = publicRoutes.includes(nextUrl.pathname);
  const isApiRoute = nextUrl.pathname.startsWith(apiAuthPrefix);

  if (isApiRoute) {
    return;
  }

  if (isAuthRoute) {
    if (isLoggedIn) {
      // eslint-disable-next-line consistent-return
      return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl));
    }

    return;
  }

  if (!isLoggedIn && !isPublicRoute) {
    // eslint-disable-next-line consistent-return
    return Response.redirect(new URL('/auth/login', nextUrl));
  }

  if (nextUrl.pathname === '/') {
    // eslint-disable-next-line consistent-return
    return Response.redirect(new URL(BASE_SEGMENT_REDIRECT, req.url));
  }
});

export const config = {
  matcher: [
    // eslint-disable-next-line max-len
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    '/(api|trpc)(.*)',
  ],
};
