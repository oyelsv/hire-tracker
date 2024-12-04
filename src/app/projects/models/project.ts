import { StatusEnum } from '@/app/applications/models';

interface Application {
  status: StatusEnum;
  count: number;
}

export interface Project {
  id: string;
  createdAt: string;
  updatedAt: string;
  title: string;
  description?: string;
  applications: Application[];
}
