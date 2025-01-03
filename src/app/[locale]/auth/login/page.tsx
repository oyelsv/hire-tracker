import { ReactElement } from 'react';
import { AuthError } from 'next-auth';
import { redirect } from 'next/navigation';
import { getTranslations } from 'next-intl/server';

import { signIn } from '@/auth';
import { providerMap } from '@/auth.config';
import { routing } from '@/i18n/routing';

import GitHub from '@/static/svg/github.svg';
import Google from '@/static/svg/google.svg';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

import type { Metadata } from 'next';

/* @TODO: add auth/error page */
const SIGNIN_ERROR_URL = '/auth/signin/error';

interface LoginPageProps {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{
    callbackUrl?: string;
  }>;
}

function SocialIcon({ providerId }: { providerId: string }) {
  switch (providerId) {
    case 'github':
      return <GitHub />;
    case 'google':
      return <Google />;
    default:
      return null;
  }
}

export default async function LoginPage({ params, searchParams }: LoginPageProps): Promise<ReactElement> {
  const { locale } = await params;
  const { callbackUrl } = await searchParams;
  const t = await getTranslations({ locale, namespace: 'auth' });

  return (
    <div className="h-screen flex p-4">
      <Card className="w-[380px] self-baseline my-8 mx-auto">
        <CardHeader className="text-center">
          <CardTitle>
            <h1 className="scroll-m-20 text-3xl font-semibold tracking-tight first:mt-0">{t('card.title')}</h1>
          </CardTitle>
          <CardDescription>{t('card.description')}</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-y-3">
          {Object.values(providerMap).map((provider) => (
            <form
              key={provider.id}
              /* eslint-disable-next-line consistent-return */
              action={async () => {
                'use server';

                try {
                  await signIn(provider.id, { redirectTo: callbackUrl ?? '' });
                } catch (error) {
                  if (error instanceof AuthError) {
                    return redirect(`${SIGNIN_ERROR_URL}?error=${error.type}`);
                  }
                  throw error;
                }
              }}
            >
              <Button variant="outline" className="w-full" type="submit">
                <SocialIcon providerId={provider.id} />
                {t('signInWith', { provider: provider.name })}
              </Button>
            </form>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: LoginPageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'auth' });

  return {
    title: {
      default: t('tabName'),
      template: `%s | ${t('tabName')}`,
    },
    description: t('description'),
    openGraph: {
      title: t('openGraph.title'),
      description: t('openGraph.description'),
    },
  };
}

LoginPage.displayName = 'LoginPage';
