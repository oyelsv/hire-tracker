'use server';

import { Project } from '@/app/projects/models';
import { EmploymentTypeEnum, WorkTypeEnum } from '@/app/applications/models';

// eslint-disable-next-line @typescript-eslint/no-unused-vars,unused-imports/no-unused-vars
export async function getProjectById(id: string): Promise<Project> {
  await new Promise((resolve) => {
    setTimeout(resolve, 1000);
  });

  return {
    id: 'fjoui34ntk3j0',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    title: 'Project #1',
    description: 'Project 1 description',
    applications: [
      {
        id: 'rj34u942',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        company: {
          id: 'fjoui34ntk3j0',
          name: 'Company #1',
          logo: 'https://via.placeholder.com/150',
        },
        position: 'Senior Frontend Developer',
        url: 'https://example.com',
        workType: WorkTypeEnum.Onsite,
        employmentType: [EmploymentTypeEnum.FullTime],
        salary: {
          currency: 'USD',
          amount: 100000,
        },
        description: 'Application 1 description',
      },
    ],
  };
}
