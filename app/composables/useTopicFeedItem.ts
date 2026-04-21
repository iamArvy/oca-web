import type { TopicPosts, TopicPostsArray } from "~/interfaces";

export interface TopicFeedItem {
  type: 'topic' | 'ad',
  topic?: TopicPosts
}
export function useTopicFeedItems(topics: TopicPostsArray, interval = 3) {
  const items: Array<TopicFeedItem> = [];
  topics.forEach((topic, index) => {
    items.push({ type: "topic", topic });
    if ((index + 1) % interval === 0) items.push({ type: "ad" });
  });
  return items;
}
