export enum AdType {
  BANNER = 'banner',
  FEED = 'feed',
  SIDEBAR = 'sidebar',
}

export interface Ad {
  title: string;
  image: string;
  target?: string;
  type: AdType
}

export type Ads = Ad[]