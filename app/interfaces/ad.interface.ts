import type { BaseItem } from "./api-response.interface";

export enum AdPlacement {
  BANNER = "banner",
  FEED = "feed",
  SIDEBAR = "sidebar",
}

export enum AdContentType {
  IMAGE = "image",
  VIDEO = "video",
  HTML = "html",
}

export interface Ad extends BaseItem {
  title: string;
  content: string;
  target?: string;
  placement: AdPlacement;
  contentType: AdContentType;
}

export type Ads = Ad[];
