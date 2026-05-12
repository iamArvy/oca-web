import { useMediaQuery } from '@vueuse/core'

type ScreenSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl'

const breakpoints: Record<ScreenSize, number> = {
  xs: 475,
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536,
}

export function useMobile(size: ScreenSize = 'md') {
  const width = breakpoints[size]

  const isMobile = useMediaQuery(`(max-width: ${width - 1}px)`)

  return {
    isMobile,
  }
}