enum SalaryType {
  GROSS = 0,
  NET = 1,
}

export interface Salary {
  amount: number;
  currency: string;
  taxRate?: number;
  type?: SalaryType;
}
