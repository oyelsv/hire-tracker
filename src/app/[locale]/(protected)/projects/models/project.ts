import { StatusEnum, Application } from '@/app/[locale]/(protected)/applications/models';

export interface BaseProject {
  id: string;
  createdAt: string;
  updatedAt: string;
  title: string;
  description?: string;
  applications: {
    status: StatusEnum;
    count: number;
  }[];
}

export interface Project {
  id: string;
  createdAt: string;
  updatedAt: string;
  title: string;
  description?: string;
  applications: Application[];
}
