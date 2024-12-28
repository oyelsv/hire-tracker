'use client';

import { useLocale } from 'next-intl';
import { useTransition } from 'react';
import { useParams } from 'next/navigation';

import { getFlagEmoji } from '@/lib/utils';

import { Locale, routing, useRouter, usePathname } from '@/i18n/routing';

import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

export function LocaleSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const params = useParams();
  const [isPending, startTransition] = useTransition();

  const onSelectChange = (value: string) => {
    const nextLocale = value as Locale;

    startTransition(() => {
      router.replace(
        // @ts-expect-error - TypeScript will validate that only known `params`
        // are used in combination with a given `pathname`. Since the two will
        // always match for the current route, we can skip runtime checks.
        { pathname, params },
        { locale: nextLocale }
      );
    });
  };

  return (
    <Select defaultValue={locale} disabled={isPending} onValueChange={onSelectChange}>
      <SelectTrigger className="w-[90px]">
        <SelectValue placeholder="Select a fruit" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {routing.locales.map((cur) => (
            <SelectItem value={cur} key={cur}>
              {getFlagEmoji(cur)}
              <span className="before:content-['\a0\a0']">{cur.toUpperCase()}</span>
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}

LocaleSwitcher.displayName = 'LocaleSwitcher';
