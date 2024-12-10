import { ReactElement } from 'react';
import { AuthError } from 'next-auth';
import { redirect } from 'next/navigation';

import { signIn } from '@/auth';
import { providerMap } from '@/auth.config';

import GitHub from '@/static/svg/github.svg';
import Google from '@/static/svg/google.svg';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

/* @TODO: add auth/error page */
const SIGNIN_ERROR_URL = '/auth/signin/error';

interface LoginPageProps {
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

export default async function LoginPage({ searchParams }: LoginPageProps): Promise<ReactElement> {
  const { callbackUrl } = await searchParams;

  return (
    <div className="h-screen flex p-4">
      <Card className="w-[380px] self-baseline my-8 mx-auto">
        <CardHeader className="text-center">
          <CardTitle>
            <h1 className="scroll-m-20 text-3xl font-semibold tracking-tight first:mt-0">Sign in</h1>
          </CardTitle>
          <CardDescription>Please select sign in method</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-y-3">
          {Object.values(providerMap).map((provider) => (
            <form
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
                Sign in with {provider.name}
              </Button>
            </form>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}

LoginPage.displayName = 'LoginPage';
