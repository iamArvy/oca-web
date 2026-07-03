const ALLOWED_CONTENT_HOSTS = [
  "oneclickafrica.com",
  "api.oneclickafrica.com",
  "www.theguardian.com",
  "theguardian.com",
  "www.channelstv.com",
  "channelstv.com",
  "www.vanguardngr.com",
  "vanguardngr.com",
  "punchng.com",
  "www.punchng.com",
  "www.thisdaylive.com",
  "thisdaylive.com",
  "www.mwananchi.co.tz",
  "mwananchi.co.tz",
  "www.standardmedia.co.ke",
  "standardmedia.co.ke",
  "www.premiumtimesng.com",
  "premiumtimesng.com",
  "businessday.ng",
  "www.businessday.ng",
  "dailypost.ng",
  "www.dailypost.ng",
];

const ALLOWED_IMAGE_HOSTS = [
  ...ALLOWED_CONTENT_HOSTS,
  "cdn.vanguardngr.com",
  "cdn.standardmedia.co.ke",
  "cdn.businessday.ng",
  "global.ariseplay.com",
  "i.guim.co.uk",
  "i0.wp.com",
  "i2.ytimg.com",
  "i3.ytimg.com",
  "i4.ytimg.com",
  "img.youtube.com",
];

const ALLOWED_AD_TARGET_HOSTS = [
  "oneclickafrica.com",
  "revysbeauty.com",
  "www.revysbeauty.com",
  "debyllimited.com",
  "www.debyllimited.com",
  "www.instagram.com",
  "instagram.com",
];

const ALLOWED_EMBED_HOSTS = [
  "www.youtube.com",
  "youtube.com",
  "www.youtube-nocookie.com",
  "youtube-nocookie.com",
];

const ALLOWED_MEDIA_HOSTS = [
  "oneclickafrica.com",
  "api.oneclickafrica.com",
];

const ALLOWED_TAGS = new Set([
  "a",
  "abbr",
  "b",
  "blockquote",
  "br",
  "caption",
  "code",
  "div",
  "em",
  "figcaption",
  "figure",
  "h2",
  "h3",
  "h4",
  "h5",
  "h6",
  "hr",
  "i",
  "img",
  "li",
  "ol",
  "p",
  "pre",
  "q",
  "s",
  "small",
  "span",
  "strong",
  "sub",
  "sup",
  "table",
  "tbody",
  "td",
  "tfoot",
  "th",
  "thead",
  "tr",
  "u",
  "ul",
]);

const SELF_CLOSING_TAGS = new Set(["br", "hr", "img"]);

function isAllowedHost(hostname: string, allowedHosts: string[]) {
  const normalized = hostname.toLowerCase();

  return allowedHosts.some((host) => {
    const allowed = host.toLowerCase();
    return normalized === allowed || normalized.endsWith(`.${allowed}`);
  });
}

function getSafeUrl(value: string, allowedHosts: string[], protocols = ["https:"]) {
  const trimmed = value.trim();

  if (!trimmed) {
    return null;
  }

  try {
    const parsed = new URL(trimmed);

    if (!protocols.includes(parsed.protocol)) {
      return null;
    }

    if (parsed.protocol === "https:" && !isAllowedHost(parsed.hostname, allowedHosts)) {
      return null;
    }

    return parsed.toString();
  } catch {
    if (trimmed.startsWith("/") && !trimmed.startsWith("//")) {
      return trimmed;
    }

    return null;
  }
}

function escapeAttribute(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function extractAttributes(rawAttributes: string) {
  const attrs: Record<string, string> = {};
  const attrPattern = /([a-zA-Z_:][-a-zA-Z0-9_:.]*)\s*=\s*("([^"]*)"|'([^']*)'|([^\s"'=<>`]+))/g;
  let match: RegExpExecArray | null;

  while ((match = attrPattern.exec(rawAttributes))) {
    attrs[match[1].toLowerCase()] = match[3] ?? match[4] ?? match[5] ?? "";
  }

  return attrs;
}

function sanitizeTag(tagName: string, rawAttributes: string, isClosing: boolean) {
  const tag = tagName.toLowerCase();

  if (!ALLOWED_TAGS.has(tag)) {
    return "";
  }

  if (isClosing) {
    return SELF_CLOSING_TAGS.has(tag) ? "" : `</${tag}>`;
  }

  const attrs = extractAttributes(rawAttributes);
  const safeAttrs: string[] = [];

  if (tag === "a") {
    const href = attrs.href
      ? getSafeUrl(attrs.href, ALLOWED_CONTENT_HOSTS, ["https:", "mailto:", "tel:"])
      : null;

    if (!href) {
      return "<span>";
    }

    safeAttrs.push(`href="${escapeAttribute(href)}"`);
    safeAttrs.push('target="_blank"');
    safeAttrs.push('rel="noopener noreferrer nofollow"');
  }

  if (tag === "img") {
    const src = attrs.src ? getSafeUrl(attrs.src, ALLOWED_IMAGE_HOSTS) : null;

    if (!src) {
      return "";
    }

    safeAttrs.push(`src="${escapeAttribute(src)}"`);
    safeAttrs.push(`alt="${escapeAttribute(attrs.alt ?? "")}"`);
    safeAttrs.push('loading="lazy"');
    safeAttrs.push('decoding="async"');

    for (const dimension of ["width", "height"]) {
      if (/^\d{1,5}$/.test(attrs[dimension] ?? "")) {
        safeAttrs.push(`${dimension}="${attrs[dimension]}"`);
      }
    }
  }

  return safeAttrs.length ? `<${tag} ${safeAttrs.join(" ")}>` : `<${tag}>`;
}

export function sanitizeContentHtml(html: string | null | undefined) {
  if (!html) {
    return "";
  }

   const decoded = html
    .replace(/&#x([0-9a-f]+);/gi, (_, hex) => String.fromCharCode(parseInt(hex, 16)))
    .replace(/&#(\d+);/gi, (_, dec) => String.fromCharCode(parseInt(dec, 10)))

  return String(decoded)
    .replace(/<!--[\s\S]*?-->/g, "")
    .replace(/<\s*(script|style|iframe|object|embed|form|input|button|textarea|select|option|meta|link|base|svg|math)[^>]*>[\s\S]*?<\s*\/\s*\1\s*>/gi, "")
    .replace(/<\s*(script|style|iframe|object|embed|form|input|button|textarea|select|option|meta|link|base|svg|math)[^>]*\/?\s*>/gi, "")
    .replace(/\s+on[a-z]+\s*=\s*(".*?"|'.*?'|[^\s>]+)/gi, "")
    .replace(/\s+(style|srcset|sizes)\s*=\s*(".*?"|'.*?'|[^\s>]+)/gi, "")
    .replace(/\s+(href|src)\s*=\s*(['"]?)\s*(javascript:|data:text\/html|vbscript:)[\s\S]*?\2/gi, "")
    .replace(/<\s*(\/?)\s*([a-zA-Z0-9:-]+)([^>]*)>/g, (_match, closing, tagName, attrs) =>
      sanitizeTag(tagName, attrs, Boolean(closing)),
    );
}

export function getSafeContentImageUrl(url: string | null | undefined) {
  return url ? getSafeUrl(url, ALLOWED_IMAGE_HOSTS) : null;
}

export function getSafeAdTargetUrl(url: string | null | undefined) {
  return url ? getSafeUrl(url, ALLOWED_AD_TARGET_HOSTS) : null;
}

export function getSafeMediaUrl(url: string | null | undefined) {
  return url ? getSafeUrl(url, ALLOWED_MEDIA_HOSTS) : null;
}

export function getSafeEmbedUrl(url: string | null | undefined) {
  const safeUrl = url ? getSafeUrl(url, ALLOWED_EMBED_HOSTS) : null;

  if (!safeUrl) {
    return null;
  }

  const videoId = extractYouTubeId(safeUrl);

  return videoId ? `https://www.youtube.com/embed/${videoId}` : null;
}
