import type { BaseItem } from "./api-response.interface";

export interface LiveSourceAdminData extends BaseItem {
  name: string;
  source: string;
}

export interface LiveSourceWebsiteData extends BaseItem {
  name: string;
  source: string;
  description: string | null;
  logo: string | null;
}