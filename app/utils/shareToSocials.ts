export enum SocialPlatform {
  FACEBOOK = "facebook",
  X = "x",
  LINKEDIN = "linkedin",
  WHATSAPP = "whatsapp",
}

export async function shareTo(
  platform: SocialPlatform,
  slug: string,
  text?: string | null,
) {
  const url = await getPostUrl(slug);
  const encodedUrl = encodeURIComponent(url);
  const encodedText = text ? encodeURIComponent(text) : "";
  let shareUrl = "";

  switch (platform) {
    case SocialPlatform.FACEBOOK:
      shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`;
      break;
    case SocialPlatform.X:
      shareUrl = `https://x.com/intent/tweet?url=${encodedUrl}&text=${encodedText}`;
      break;
    case SocialPlatform.LINKEDIN:
      shareUrl = `https://www.linkedin.com/shareArticle?mini=true&url=${encodedUrl}&title=${encodedText}`;
      break;
    case SocialPlatform.WHATSAPP:
      shareUrl = `https://api.whatsapp.com/send?text=${encodedText}%20${encodedUrl}`;
      break;
  }

  if (import.meta.client) {
    openExternal(shareUrl);
  }
}
