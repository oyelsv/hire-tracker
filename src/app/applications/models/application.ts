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
  url: string;
  workType: WorkTypeEnum;
  employmentType: EmploymentTypeEnum[];
  salary: Salary;
  description?: string;
}
