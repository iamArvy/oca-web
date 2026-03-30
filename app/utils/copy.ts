export async function copyToClipboard(text: string) {
  const { success, error } = useToast()
  try {
    await navigator.clipboard.writeText(text)
    success('Copied to clipboard')
    return true
  } catch (err) {
    error('Failed to copy')
    return false
  }
}

export async function copyPostLink(slug: string) {
  const url = await getPostUrl(slug)
  return await copyToClipboard(url)
}