export function extractYouTubeId(url: string): string | null {
  try {
    const parsed = new URL(url);

    // Handle embed URLs: /embed/{id}
    if (parsed.pathname.startsWith('/embed/')) {
      return parsed.pathname.split('/embed/')[1]?.split('?')[0] || null;
    }

    // Handle watch URLs: ?v={id}
    if (parsed.searchParams.get('v')) {
      return parsed.searchParams.get('v');
    }

    // Handle youtu.be/{id}
    if (parsed.hostname === 'youtu.be') {
      return parsed.pathname.slice(1);
    }

    return null;
  } catch {
    return null;
  }
}