import { auth } from '@/auth';

import { getProjects } from '@/app/(protected)/projects/services';

import { ProjectsList } from './components/ProjectsList';

export default async function ProjectsPage() {
  const projects = await getProjects();
  const session = await auth();

  console.log(session);

  return <ProjectsList projects={projects} />;
}

ProjectsPage.displayName = 'ProjectsPage';
