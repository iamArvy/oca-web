import { APP_ROUTES } from "~/constants"

export async function getPostUrl(slug: string) {
  const appUrl = process.env.NUXT_PUBLIC_APP_URL || 'https://oneclickafrica.com'
    const postUrl = APP_ROUTES.post.path(slug)
    const url = `${appUrl}${postUrl}`
    return url
}