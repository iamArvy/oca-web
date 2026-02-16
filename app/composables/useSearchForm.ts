export const useSearchForm = () => {
  const router = useRouter()
  const q = ref<string>()

  const search =  () => {
    router.push({
      name: 'search',
      query:{
        q: q.value,
      }
    })
  }

  return {
    q,
    search,
  }
}