export function openExternal(url: string, newTab: boolean = true) {
  const target = newTab ? '_blank' : '_self'
  const rel = 'noopener,noreferrer'
  window.open(url, target, rel)
}
