import { Project } from '@/app/projects/models';

import { ProjectCard } from '../ProjectCard';

export function ProjectsList({ projects }: { projects: Project[] }) {
  return (
    <div className="p-2">
      {projects.map(({ id, title, applications }) => (
        <ProjectCard key={id} title={title} applications={applications} />
      ))}
    </div>
  );
}

ProjectsList.displayName = 'ProjectsList';
