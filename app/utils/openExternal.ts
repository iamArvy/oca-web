export function openExternal(url: string, newTab: boolean = true) {
  const target = newTab ? '_blank' : '_self'
  const rel = 'noopener,noreferrer,nofollow'
  window.open(url, target, rel)
}
