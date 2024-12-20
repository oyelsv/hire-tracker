import NextAuth from 'next-auth';

import authConfig from '@/auth.config';

export const {
  handlers: { GET, POST },
  signIn,
  signOut,
  auth,
} = NextAuth({
  // @TODO: PrismaAdapter,
  // strategy: 'jwt',
  pages: {
    signIn: '/auth/login',
    error: '/auth/error',
  },
  ...authConfig,
});
