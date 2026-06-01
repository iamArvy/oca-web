import type { BaseItem } from "./api-response.interface";

export interface Seo extends BaseItem {
  title: string;
  slug: string;
  description: string;
  keywords: string[];
  author: string;
  ogTitle: string;
  ogDescription: string;
};

