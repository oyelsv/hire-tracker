import { getProjectById } from '@/app/projects/services';

interface ProjectPageProps {
  params: Promise<{
    id?: string;
  }>;
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { id = '' } = await params;
  const project = await getProjectById(id);

  console.log(project);

  return (
    <div>
      <span>{id}</span>
    </div>
  );
}

ProjectPage.displayName = 'ProjectPage';
