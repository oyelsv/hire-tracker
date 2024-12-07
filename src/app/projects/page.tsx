import { getProjects } from '@/app/projects/services';

import { ProjectsList } from './components/ProjectsList';

export default async function ProjectsPage() {
  const projects = await getProjects();

  return <ProjectsList projects={projects} />;
}

ProjectsPage.displayName = 'ProjectsPage';
