import { format } from 'date-fns';
import { FolderClosed } from 'lucide-react';

import { Project } from '@/app/projects/models';
import { ProjectIndicator } from '@/app/projects/components/ProjectIndicator';

interface ProjectCardProps extends Omit<Project, 'updatedAt'> {}

export function ProjectCard({ title, description, createdAt, applications }: ProjectCardProps) {
  return (
    <div className="w-full bg-zinc-900/95 rounded-md mb-2 py-3 px-4">
      <div className="flex gap-x-3 mb-4">
        <div className="flex items-center justify-center shrink-0 w-10 h-10 rounded-full bg-blue-600/25">
          <FolderClosed className="w-6 h-6 text-blue-500" />
        </div>
        <div className="flex flex-col grow gap-y-2">
          <div>
            <h2 className="text-white text-xl font-semibold tracking-tight">{title}</h2>
            <p className="text-sm text-muted-foreground">{description ?? 'Description'}</p>
          </div>
          <div className="flex items-center">
            <span className="text-xs text-white">{`${(applications ?? []).length} Applications`}</span>
            <span className="text-xs text-white pl-2 ml-auto">{format(createdAt, 'd MMM yyyy')}</span>
          </div>
        </div>
      </div>
      {(applications ?? []) && (
        <div className="grid grid-cols-2 gap-x-5">
          {applications.map(({ status, count }) => (
            <ProjectIndicator key={status} className="mb-2" status={status} count={count} />
          ))}
        </div>
      )}
    </div>
  );
}

ProjectCard.displayName = 'ProjectCard';
