import type { BaseItem } from "./api-response.interface";

export interface Feed extends BaseItem {
  image?: string | null;
  name: string;
  slug: string;
  source: string;
}

export type Feeds = Feed[];
