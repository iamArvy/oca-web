export interface ICategory {
  id: string;
  name: string;
  slug: string;
  count: number;
}

export type TCategories = ICategory[]