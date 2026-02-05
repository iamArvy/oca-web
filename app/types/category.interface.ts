export interface Category {
  id: string;
  name: string;
  slug: string;
  count: number;
  subcategories?: Subcategory[];
  parentId?: string;
}

export type Categories = Category[];