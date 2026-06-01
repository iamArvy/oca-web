import type { BaseItem } from "./api-response.interface";

export enum AdPlacement {
  BANNER = "banner",
  FEED = "feed",
  SIDEBAR = "sidebar",
}

export enum AdStatus {
  ACTIVE = "active",
  INACTIVE = "inactive",
  EXPIRED = "expired",
}

export enum AdDurationUnit {
  DAY = "day",
  WEEK = "week",
  MONTH = "month",
}

export enum AdContentType {
  IMAGE = "image",
  VIDEO = "video",
  HTML = "html",
}

export const AdContentTypeExtensions: Record<AdContentType, string> = {
  [AdContentType.IMAGE]: "jpg|jpeg|png|gif",
  [AdContentType.VIDEO]: "mp4|avi|mov",
  [AdContentType.HTML]: "html|htm",
};

export const AdContentTypeOptions = Object.entries(AdContentType).map(
  ([key, value]) => ({
    label: key.charAt(0) + key.slice(1).toLowerCase(),
    value,
  }),
);

export interface AdAdminData extends BaseItem {
  title: string;
  content: string;
  target: string | null;

  placement: AdPlacement;
  status: AdStatus;
  contentType: AdContentType;

  startDate: string;
  endDate: string | null;

  duration: number;
  durationUnit: AdDurationUnit;

  clicks: number;
}

export interface AdWebsiteData extends BaseItem {
  title: string;
  content: string;
  target?: string;
  placement: AdPlacement;
  contentType: AdContentType;
}