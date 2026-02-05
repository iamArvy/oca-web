export interface Category {
  id: string;
  name: string;
  slug: string;
  count?: number;
  subcategories?: Category[];
  parentId?: string;
}

export type Categories = Category[];