import { getTranslations } from 'next-intl/server';

import { routing } from '@/i18n/routing';

import { getProjects } from '@/app/[locale]/(protected)/projects/services';
import { ProjectCard } from '@/app/[locale]/(protected)/projects/components/ProjectCard';

import { Button } from '@/components/ui/button';

import type { Metadata } from 'next';

type PageParamsProps = Promise<{ locale: string }>;

export default async function ProjectsPage({ params }: { params: PageParamsProps }) {
  const { locale } = await params;
  const projects = await getProjects();
  const t = await getTranslations({ locale, namespace: 'projects' });

  return (
    <>
      <div className="grid gap-y-2 p-2 grow content-baseline">
        {projects.map(({ id, title, applications, createdAt, description }) => (
          <ProjectCard
            key={id}
            id={id}
            locale={locale}
            title={title}
            description={description}
            applications={applications}
            createdAt={createdAt}
          />
        ))}
      </div>
      <div className="p-2 py-4 sticky bottom-0 bg-background/85 shadow-[0_-2px_4px_0_rgba(0,0,0,0.08)]">
        <Button className="w-full" size="lg">
          {t('actions.add')}
        </Button>
      </div>
    </>
  );
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: { params: PageParamsProps }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'projects' });

  return {
    title: {
      default: t('tabName', { value: 'projects' }),
      template: `%s | ${t('tabName', { value: 'projects' })}`,
    },
    description: t('description', { value: 'projects' }),
    openGraph: {
      title: t('openGraph.title'),
      description: t('openGraph.description'),
    },
  };
}

ProjectsPage.displayName = 'ProjectsPage';
