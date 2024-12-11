import Link from 'next/link';
import { ChevronLeft } from 'lucide-react';

import { cn } from '@/lib/utils';

import { getProjectById } from '@/app/(protected)/projects/services';
import { PROJECTS_ROUTES } from '@/app/(protected)/projects/constants';
import { ApplicationPreviewCard } from '@/app/(protected)/projects/components/ApplicationPreviewCard';

import { buttonVariants } from '@/components/ui/button';

interface ProjectPageProps {
  params: Promise<{
    id?: string;
  }>;
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { id = '' } = await params;
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
            <ApplicationPreviewCard key={applicationId} id={applicationId} {...application} />
          ))}
        </div>
      )}
    </div>
  );
}

ProjectPage.displayName = 'ProjectPage';
