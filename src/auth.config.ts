import Google from 'next-auth/providers/google';
import GitHub from 'next-auth/providers/github';

import type { Provider } from 'next-auth/providers';
import type { NextAuthConfig } from 'next-auth';

const providers: Provider[] = [Google, GitHub];

export const providerMap = providers
  .map((provider) => {
    if (typeof provider === 'function') {
      const providerData = provider();
      return { id: providerData.id, name: providerData.name };
    }
    return { id: provider.id, name: provider.name };
  })
  .filter((provider) => provider.id !== 'credentials');

export default {
  providers,
} satisfies NextAuthConfig;
