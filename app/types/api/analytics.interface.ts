export interface AnalyticsOverview {
  totalVisits: number;
  totalVisitors: number;
  totalPosts: number;
  totalActiveUsers: number;
  totalActiveAds: number;
  totalCollections: number;
  totalFeeds: number;
  totalTopics: number;
  totalSubscribers?: number;
}

export interface VisitorsChartData {
  date: string;
  visits: number;
  visitors: number;
}

export interface AdsChartData {
  date: string;
  clicks: number;
  reach: number;
}
