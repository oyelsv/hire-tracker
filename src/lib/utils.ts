import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getFlagEmoji(countryCode: string) {
  if (countryCode.toLowerCase() === 'en') {
    return '🇺🇸';
  }

  const codePoints = countryCode
    .toUpperCase()
    .split('')
    .map((char) => 127397 + char.charCodeAt(0));

  return String.fromCodePoint(...codePoints);
}

export function getIntlDateFormat(date: Date, lang?: string, options?: Intl.DateTimeFormatOptions): string {
  return new Intl.DateTimeFormat(lang || 'en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    ...options,
  }).format(date);
}
