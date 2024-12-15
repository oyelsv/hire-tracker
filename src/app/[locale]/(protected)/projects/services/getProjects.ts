'use server';

import { BaseProject } from '@/app/[locale]/(protected)/projects/models';
import { StatusEnum } from '@/app/[locale]/(protected)/applications/models';

export async function getProjects(): Promise<BaseProject[]> {
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
        { status: StatusEnum.Applied, count: 4 },
        { status: StatusEnum.Accepted, count: 1 },
        { status: StatusEnum.Screening, count: 2 },
        { status: StatusEnum.Interview, count: 3 },
        { status: StatusEnum.Final, count: 0 },
        { status: StatusEnum.Rejected, count: 7 },
        { status: StatusEnum.Withdrawn, count: 8 },
        { status: StatusEnum.Offer, count: 3 },
      ],
    },
    {
      id: '453yu5gtegfsd',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      title: 'Job Search 2024',
      applications: [{ status: StatusEnum.Accepted, count: 1 }],
    },
  ];
}
