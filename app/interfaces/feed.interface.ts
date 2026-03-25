import type { BaseItem } from "./api-response.interface";
import type { Topic } from "./topic.interface";

export interface Feed extends BaseItem {
  image?: string | null;
  name: string;
  slug: string;
  source: string;
  topic: Topic;
}

export type Feeds = Feed[];
