import { Project } from '@/app/projects/models';
import { ProjectIndicator } from '@/app/projects/components/ProjectIndicator';

export function ProjectCard({ title, applications }: Pick<Project, 'title' | 'applications'>) {
  return (
    <div className="w-full bg-gray-800 rounded-md mb-2 p-2 px-3">
      <span className="flex mb-2 text-white">{title}</span>
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
