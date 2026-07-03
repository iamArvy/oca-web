import type { BaseItem } from "./api-response.interface";


export interface SocialPlatform extends BaseItem {
  platform: string;
  isExpired: boolean;
}