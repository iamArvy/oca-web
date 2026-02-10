import type { Category } from "~/types"

export const useCategory = () => {
  const currentCategory = useState<Category | undefined>('currentCategory', () => undefined)

  return {
    currentCategory,
    setCurrentCategory(category?: Category) {
      currentCategory.value = category
    }
  }
}