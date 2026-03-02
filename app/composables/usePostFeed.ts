import type { Post, Posts } from "~/interfaces";

export function useFeedItems(posts: Posts, interval = 12) {
  const items: Array<{ type: "post"; post: Post } | { type: "ad" }> = [];
  posts.forEach((post, index) => {
    items.push({ type: "post", post });
    if ((index + 1) % interval === 0) items.push({ type: "ad" });
  });
  return items;
}
