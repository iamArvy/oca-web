import type { BaseItem } from "./api-response.interface";
import type { Topic } from "./topic.interface";

export enum FeedTransformer {
  VIDEO = "video",
  DEFAULT = "default",
}

export interface FeedAdminData extends BaseItem {
  image: string | null;
  name: string;
  slug: string;
  source: string;
  topic: Topic;
  transformer: FeedTransformer | null;
}

export interface FeedWebsiteData extends BaseItem {
  image: string | null;
  name: string;
  slug: string;
  source: string;
}