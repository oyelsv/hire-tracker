interface ProjectPageProps {
  params: Promise<{
    id?: string;
  }>;
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { id = '' } = await params;
  console.log(id);

  return (
    <div>
      <span>{id}</span>
    </div>
  );
}

ProjectPage.displayName = 'ProjectPage';
