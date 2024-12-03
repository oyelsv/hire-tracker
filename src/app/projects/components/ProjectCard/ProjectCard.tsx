import { Project } from '@/app/projects/models';

export function ProjectCard({ title }: Pick<Project, 'title'>) {
  return (
    <div>
      <span>{title}</span>
    </div>
  );
}

ProjectCard.displayName = 'ProjectCard';
