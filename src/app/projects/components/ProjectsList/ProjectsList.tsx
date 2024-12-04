import { Project } from '@/app/projects/models';

import { ProjectCard } from '../ProjectCard';

export function ProjectsList({ projects }: { projects: Project[] }) {
  return (
    <div className="p-2">
      {projects.map(({ id, title, applications, createdAt, updatedAt, description }) => (
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
