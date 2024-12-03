'use server';

import { Project } from '@/app/projects/models';
import { StatusEnum } from '@/app/applications/models';

export async function getProjects(): Promise<Project[]> {
  await new Promise((resolve) => {
    setTimeout(resolve, 1000);
  });

  return [
    {
      id: 'fjoui34ntk3j0',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      title: 'Project #1',
      description: 'Project 1 description',
      applications: [
        { name: 'Accepted', status: StatusEnum.Accepted, count: 1 },
        { name: 'Final', status: StatusEnum.Final, count: 2 },
        { name: 'Offer', status: StatusEnum.Offer, count: 3 },
      ],
    },
    {
      id: '453yu5gtegfsd',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      title: 'Job Search 2024',
      applications: [{ name: 'Accepted', status: StatusEnum.Accepted, count: 1 }],
    },
  ];
}
