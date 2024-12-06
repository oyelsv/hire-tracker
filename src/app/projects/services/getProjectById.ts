'use server';

import { Project } from '@/app/projects/models';
import { EmploymentTypeEnum, StatusEnum, WorkTypeEnum } from '@/app/applications/models';

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
          name: 'Netflix',
          logo: 'https://via.placeholder.com/150',
        },
        position: 'Senior Frontend Developer',
        url: 'https://example.com',
        workType: WorkTypeEnum.Remote,
        status: StatusEnum.Accepted,
        countryISOCode: 'BE',
        employmentType: EmploymentTypeEnum.PartTime,
        salary: {
          currency: 'EUR',
          amount: 4500,
        },
        description: 'Application 1 description',
      },
      {
        id: 'fgtrwfg3re',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        company: {
          id: '23r4t3',
          name: 'Jooble',
          logo: 'https://via.placeholder.com/150',
        },
        position: 'Senior Backend Developer',
        url: 'https://example.com',
        workType: WorkTypeEnum.Onsite,
        status: StatusEnum.Interview,
        countryISOCode: 'UA',
        employmentType: EmploymentTypeEnum.FullTime,
        salary: {
          currency: 'USD',
          amount: 6500,
        },
        description: 'Application 1 description',
      },
      {
        id: 'ty54g',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        company: {
          id: '23r4tfrw',
          name: 'Amazon',
          logo: 'https://via.placeholder.com/150',
        },
        position: 'Senior Software Engineer',
        workType: WorkTypeEnum.Hybrid,
        status: StatusEnum.Offer,
        countryISOCode: 'US',
        description: 'Application 1 description',
      },
    ],
  };
}
