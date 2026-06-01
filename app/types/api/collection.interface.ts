import type { BaseItem } from "./api-response.interface";

export interface Collection extends BaseItem {
  name: string;
  slug: string;
  description: string | null;
}
