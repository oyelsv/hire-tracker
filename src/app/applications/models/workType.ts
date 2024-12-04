export enum WorkTypeEnum {
  Remote = 0,
  Onsite = 1,
  Hybrid = 2,
}

export type WorkType = {
  [key in WorkTypeEnum]: string;
};
