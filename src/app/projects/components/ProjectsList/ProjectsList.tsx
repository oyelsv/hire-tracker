import { BaseProject } from '@/app/projects/models';
import { ProjectCard } from '@/app/projects/components/ProjectCard';

export function ProjectsList({ projects }: { projects: BaseProject[] }) {
  return (
    <div className="grid gap-y-4 p-4">
      {projects.map(({ id, title, applications, createdAt, description }) => (
        <ProjectCard
          key={id}
          id={id}
          title={title}
          description={description}
          applications={applications}
          createdAt={createdAt}
        />
      ))}
    </div>
  );
}

ProjectsList.displayName = 'ProjectsList';
