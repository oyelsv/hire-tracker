import { format } from 'date-fns';
import Link from 'next/link';
import { FolderClosed, ChevronRight } from 'lucide-react';

import { Project } from '@/app/projects/models';
import { ProjectIndicator } from '@/app/projects/components/ProjectIndicator';

interface ProjectCardProps extends Omit<Project, 'updatedAt'> {}

export function ProjectCard({ id, title, description, createdAt, applications }: ProjectCardProps) {
  return (
    <div className="w-full bg-zinc-900/95 rounded-md pt-3 pb-5 px-4">
      <div className="flex gap-x-3 mb-4">
        <div className="flex items-center justify-center shrink-0 w-10 h-10 rounded-full bg-blue-600/25">
          <FolderClosed className="w-6 h-6 text-blue-500" />
        </div>
        <div className="flex flex-col grow">
          <h2 className="flex items-center text-white text-xl font-semibold tracking-tight">
            <Link href={`/applications/${id}`}>{title}</Link>
            <ChevronRight className="w-4 h-4 ml-1 text-white" />
          </h2>

          <p className="text-sm text-muted-foreground line-clamp-3">{description ?? 'Description'}</p>
          <div className="flex items-center mt-1.5">
            <span className="text-xs text-white">{`${(applications ?? []).length} Applications`}</span>
            <span className="text-xs text-white pl-2 ml-auto">{format(createdAt, 'd MMM yyyy')}</span>
          </div>
        </div>
      </div>
      {(applications ?? []) && (
        <div className="grid grid-cols-2 gap-y-2.5 gap-x-5">
          {applications.map(({ status, count }) => (
            <ProjectIndicator key={status} status={status} count={count} />
          ))}
        </div>
      )}
    </div>
  );
}

ProjectCard.displayName = 'ProjectCard';
