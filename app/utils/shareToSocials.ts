import type { PostAdminData } from "~/types";

export enum SocialPlatform {
  FACEBOOK = "facebook",
  X = "x",
  LINKEDIN = "linkedin",
  WHATSAPP = "whatsapp",
}

export async function shareTo(
  platform: SocialPlatform,
  post: PostAdminData,
) {
  const url = await getPostUrl(post.slug);
  const encodedUrl = encodeURIComponent(url);
  const encodedText = encodeURIComponent(`${post.topic.name}: ${post.title}`);
  let shareUrl = "";

  switch (platform) {
    case SocialPlatform.FACEBOOK:
      shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`;
      break;
    case SocialPlatform.X:
      shareUrl = `https://x.com/intent/tweet?url=${encodedUrl}&text=${encodedText}`;
      break;
    case SocialPlatform.LINKEDIN:
      shareUrl = shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}&quote=${encodedText}`;
      break;
    case SocialPlatform.WHATSAPP:
      shareUrl = `https://api.whatsapp.com/send?text=${encodedText}%20${encodedUrl}`;
      break;
  }

  if (import.meta.client) {
    openExternal(shareUrl);
  }
}
