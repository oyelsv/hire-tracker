import { getProjects } from '@/app/(protected)/projects/services';
import { ProjectCard } from '@/app/(protected)/projects/components/ProjectCard';

import { Button } from '@/components/ui/button';

export default async function ProjectsPage() {
  const projects = await getProjects();

  return (
    <>
      <div className="grid gap-y-2 p-2 grow content-baseline">
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
      <div className="p-2 py-4 sticky bottom-0 bg-background/85 shadow-[0_-2px_4px_0_rgba(0,0,0,0.08)]">
        <Button className="w-full" size="lg">
          Add new project
        </Button>
      </div>
    </>
  );
}

ProjectsPage.displayName = 'ProjectsPage';
