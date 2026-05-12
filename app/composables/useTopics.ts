import { API_ROUTES } from '~/constants';
import { computed } from 'vue'
import type { ApiListResponse, Topic } from '~/interfaces'

export async function useTopics() {
  const topics = useState<Topic[]>('topics', () => [])

  
  const { data: res } = await useAPI<ApiListResponse<Topic>>(API_ROUTES.topics.path)
  topics.value = res.value?.data ?? []
  // async function fetchTopics() {
  //   if(topics.value) return;
  //   const { data: res } = await useAPI<ApiListResponse<Topics>>('topics')
  //   topics.value = res.value?.data
  // }

  /**
   * Get all top-level topics except the one with the given id
   */
  function otherTopics(id?: string) {
    return computed(() =>
      topics.value?.filter(topic => topic.id !== id)
    )
  }

  /**
   * Get all subtopics within a category except the one with the given id
   */
  function otherSubTopics(parentId?: string, childId?: string) {
    return computed(() => {
      const parent = topics.value?.find(topic => topic.id === parentId)
      if (!parent?.children) return []
      return parent.children.filter(child => child.id !== childId)
    })
  }

  return {
    topics,
    // fetchTopics,
    otherTopics,
    otherSubTopics,
  }
}