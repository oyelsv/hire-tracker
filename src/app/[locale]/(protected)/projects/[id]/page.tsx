import Link from 'next/link';
import { ChevronLeft } from 'lucide-react';
import { getTranslations } from 'next-intl/server';

import { cn } from '@/lib/utils';

import { routing } from '@/i18n/routing';

import { getProjectById } from '@/app/[locale]/(protected)/projects/services';
import { PROJECTS_ROUTES } from '@/app/[locale]/(protected)/projects/constants';
import { ApplicationPreviewCard } from '@/app/[locale]/(protected)/projects/components/ApplicationPreviewCard';

import { buttonVariants } from '@/components/ui/button';

import type { Metadata } from 'next';

type ProjectPageProps = Promise<{ locale: string; id?: string }>;

export default async function ProjectPage({ params }: { params: ProjectPageProps }) {
  const { id = '', locale } = await params;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars,unused-imports/no-unused-vars
  const { title, applications, ...project } = await getProjectById(id);

  return (
    <div className="h-screen">
      <div className="flex items-center min-h-14 p-2 relative border-b">
        <Link
          href={PROJECTS_ROUTES.ROOT}
          className={cn(
            'absolute top-[50%] left-2 -translate-y-2/4',
            buttonVariants({ variant: 'ghost', size: 'icon' })
          )}
        >
          <ChevronLeft className="w-6 h-6 text-foreground" />
        </Link>
        <h1 className="text-lg text-foreground font-semibold tracking-tight px-12 grow text-center">{title}</h1>
      </div>
      {(applications ?? []) && (
        <div className="grid gap-y-2 p-2">
          {applications.map(({ id: applicationId, ...application }) => (
            <ApplicationPreviewCard key={applicationId} id={applicationId} locale={locale} {...application} />
          ))}
        </div>
      )}
    </div>
  );
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: { params: ProjectPageProps }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'projects' });

  return {
    title: {
      default: t('tabName', { value: 'project' }),
      template: `%s | ${t('tabName', { value: 'project' })}`,
    },
    description: t('description', { value: 'project' }),
    openGraph: {
      title: t('openGraph.title'),
      description: t('openGraph.description'),
    },
  };
}

ProjectPage.displayName = 'ProjectPage';
