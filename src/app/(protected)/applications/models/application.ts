import { StatusEnum } from '@/app/(protected)/applications/models/status';

import { Salary } from './salary';
import { Company } from './company';
import { WorkTypeEnum } from './workType';
import { EmploymentTypeEnum } from './employmentType';

export interface Application {
  id: string;
  createdAt: string;
  updatedAt: string;
  company: Company;
  position: string;
  url?: string;
  countryISOCode?: string; // alpha-2 country code (ISO 3166-1)
  status: StatusEnum;
  workType?: WorkTypeEnum | null;
  employmentType?: EmploymentTypeEnum | null;
  salary?: Salary;
  description?: string;
}
