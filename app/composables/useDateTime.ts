export const useDateTime = () => {
  const now = ref(new Date())

  onMounted(() => {
  const timer = setInterval(() => {
    now.value = new Date()
  }, 1000)

  onUnmounted(() => clearInterval(timer))
})

// Format date and time
const date = computed(() =>
  now.value.toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  })
)

const showColon = ref(true)
onMounted(() => {
  const colonTimer = setInterval(() => {
    showColon.value = !showColon.value
  }, 1000)
  onUnmounted(() => clearInterval(colonTimer))
})

const time = computed(() => {
  const hours = String(now.value.getHours()).padStart(2, '0')
  const minutes = String(now.value.getMinutes()).padStart(2, '0')
  return `${hours}${showColon.value ? ':' : ' '}${minutes}`
})

return {
  date,
  time
}
}