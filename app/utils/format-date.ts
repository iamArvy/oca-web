import { formatDistanceToNow, type FormatDistanceToNowOptions } from "date-fns";

export function formatDate(dateString: string, options?: FormatDistanceToNowOptions) {
  const date = new Date(dateString);
  return formatDistanceToNow(date, options);
}

export function formatDateCompact(dateString: string): string {
  const date = new Date(dateString);
  const now = new Date();

  const diff = Math.floor((now.getTime() - date.getTime()) / 1000); // seconds

  if (diff < 60) return `${diff}s`;

  const minutes = Math.floor(diff / 60);
  if (minutes < 60) return `${minutes}m`;

  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h`;

  const days = Math.floor(hours / 24);
  if (days < 30) return `${days}d`;

  const months = Math.floor(days / 30);
  if (months < 12) return `${months}mo`;

  const years = Math.floor(months / 12);
  return `${years}y`;
}