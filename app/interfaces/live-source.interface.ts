import type { BaseItem } from "./api-response.interface";

export interface LiveSource extends BaseItem {
  name: string;
  source: string;
}

export type LiveSources = LiveSource[];
