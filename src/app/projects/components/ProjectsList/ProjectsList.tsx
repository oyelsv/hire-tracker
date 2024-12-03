import { Project } from '@/app/projects/models';

import { ProjectCard } from '../ProjectCard';

export function ProjectsList({ projects }: { projects: Project[] }) {
  return (
    <>
      {projects.map(({ id, title }) => (
        <ProjectCard key={id} title={title} />
      ))}
    </>
  );
}

ProjectsList.displayName = 'ProjectsList';
