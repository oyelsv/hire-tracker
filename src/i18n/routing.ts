import { createNavigation } from 'next-intl/navigation';
import { defineRouting } from 'next-intl/routing';

export const routing = defineRouting({
  locales: ['en', 'ua'],
  defaultLocale: 'en',
  localePrefix: 'as-needed',
  pathnames: {
    '/auth/login': {
      en: '/auth/login',
      ua: '/auth/login',
    },
  },
});

export type Pathnames = keyof typeof routing.pathnames;
export type Locale = (typeof routing.locales)[number];

export const { locales, defaultLocale, pathnames } = routing;
export const { Link, getPathname, redirect, usePathname, useRouter } = createNavigation(routing);
