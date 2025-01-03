import Link from 'next/link';
import { FolderClosed, ChevronRight } from 'lucide-react';
import { getTranslations, getFormatter } from 'next-intl/server';

import { BaseProject } from '@/app/[locale]/(protected)/projects/models';
import { PROJECTS_ROUTES } from '@/app/[locale]/(protected)/projects/constants';
import { ProjectIndicator } from '@/app/[locale]/(protected)/projects/components/ProjectIndicator';

interface ProjectCardProps extends Omit<BaseProject, 'updatedAt'> {
  locale: string;
}

export async function ProjectCard({ id, title, description, createdAt, applications, locale }: ProjectCardProps) {
  const format = await getFormatter();
  const t = await getTranslations({ locale, namespace: 'projects.card' });

  return (
    <div className="w-full bg-card rounded-md border pt-3 pb-5 px-4 drop-shadow self-baseline">
      <div className="flex gap-x-3 mb-4">
        <div className="flex items-center justify-center shrink-0 w-10 h-10 rounded-full bg-blue-600/25">
          <FolderClosed className="w-6 h-6 text-blue-500" />
        </div>
        <div className="flex flex-col grow">
          <h2 className="flex items-center text-foreground text-xl font-semibold tracking-tight">
            <Link href={PROJECTS_ROUTES.DETAILS(id)}>{title}</Link>
            <ChevronRight className="w-4 h-4 ml-1 text-foreground" />
          </h2>
          <p className="text-sm text-muted-foreground line-clamp-3">{description ?? t('description')}</p>
          <div className="flex items-center mt-1 text-foreground">
            <span className="text-xs">{`${applications?.length ?? 0} ${t('applications', {
              count: applications?.length ?? 0,
            })}`}</span>
            <span className="text-xs pl-2 ml-auto">
              {/* @TODO: lang formatter doesn't work */}
              {format.dateTime(new Date(createdAt), { year: 'numeric', month: 'short', day: 'numeric' })}
            </span>
          </div>
        </div>
      </div>
      {(applications ?? []) && (
        <div className="grid grid-cols-2 gap-y-2.5 gap-x-5">
          {applications.map(({ status, count }) => (
            <ProjectIndicator key={status} locale={locale} status={status} count={count} />
          ))}
        </div>
      )}
    </div>
  );
}

ProjectCard.displayName = 'ProjectCard';
