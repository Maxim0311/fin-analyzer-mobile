export interface ICategory {
  id: number;
  name: string;
  description: string | null;
  isExpenditure: boolean;
}

export interface ICategoryCreate {
  name: string;
  description?: string;
  isExpenditure: boolean;
}
