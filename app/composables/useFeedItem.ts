export interface FeedItem<I> {
  type: 'item' | 'ad',
  item?: I
}
export function useFeedItems<I>(items: I[], interval = 12): FeedItem<I>[] {
  const content: Array<FeedItem<I>> = [];
  items.forEach((item, index) => {
    content.push({ type: "item", item });
    if ((index + 1) % interval === 0) content.push({ type: "ad" });
  });
  return content;
}
