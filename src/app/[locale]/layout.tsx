import { ReactNode } from 'react';
import { SessionProvider } from 'next-auth/react';
import { notFound } from 'next/navigation';
import { getMessages } from 'next-intl/server';
import { NextIntlClientProvider } from 'next-intl';

import { inter } from '@/lib/fonts';

import { routing } from '@/i18n/routing';
import { auth } from '@/auth';

import { Header } from '@/app/components/Header';
import { AppSidebar } from '@/app/components/AppSidebar';
import { ThemeProvider } from '@/app/components/ThemeProvider';

import { SidebarProvider } from '@/components/ui/sidebar';

import '../globals.css';

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as any)) {
    notFound();
  }

  const messages = await getMessages();
  const session = await auth();

  return (
    <html lang={locale} suppressHydrationWarning>
      <body className={`${inter.className} antialiased`}>
        <SessionProvider session={session}>
          <NextIntlClientProvider messages={messages}>
            <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
              <SidebarProvider defaultOpen={false}>
                <AppSidebar />
                <div className="flex flex-col w-full">
                  <Header />
                  <main className="grow flex flex-col">{children}</main>
                </div>
              </SidebarProvider>
            </ThemeProvider>
          </NextIntlClientProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
