import { Formats } from 'next-intl';
import { getRequestConfig } from 'next-intl/server';

import { routing } from './routing';

export const formats = {
  dateTime: {
    short: {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    },
  },
  number: {
    precise: {
      maximumFractionDigits: 0,
    },
  },
} satisfies Formats;

export default getRequestConfig(async ({ requestLocale }) => {
  let locale = await requestLocale;

  if (!locale || !routing.locales.includes(locale as any)) {
    locale = routing.defaultLocale;
  }

  return {
    formats,
    locale,
    messages: (await import(`../../messages/${locale}.json`)).default,
  };
});
