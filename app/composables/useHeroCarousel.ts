import { watchOnce } from "@vueuse/core"
// import Fade from "embla-carousel-fade"
import type { CarouselApi } from "~/components/ui/carousel"
import Autoplay from "embla-carousel-autoplay"

export const useHeroCarousel = () => {
  const settings = {
    plugins: [
      // Fade()
      Autoplay({ delay: 5000 })
    ],
    opts: {
      loop: true,
    }
  }
  const emblaMainApi = ref<CarouselApi>()
  const selectedIndex = ref(0)

  function onSelect() {
    if (!emblaMainApi.value)
      return
    selectedIndex.value = emblaMainApi.value.selectedScrollSnap()
  }

  watchOnce(emblaMainApi, (emblaMainApi) => {
    if (!emblaMainApi)
      return

    onSelect()
    emblaMainApi.on("select", onSelect)
    emblaMainApi.on("reInit", onSelect)
  })

  return {
    emblaMainApi,
    selectedIndex,
    settings
  }
}