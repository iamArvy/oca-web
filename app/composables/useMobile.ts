import { useMediaQuery } from "@vueuse/core";

export function useMobile(width: number = 768) {
  const isMobile = useMediaQuery(`(max-width: ${width}px)`);

  return { isMobile };
}
