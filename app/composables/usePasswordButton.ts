export function usePasswordButton() {
  
  const hidePassword = ref(true);
  const toggleHidePassword = () => hidePassword.value = !hidePassword.value
  const passwordButton = computed(() => {
    if (hidePassword.value) return {
      label: 'Show Password',
      icon: 'lucide:eye-closed',
      type: 'password'
    }
    return {
      label: 'Hide Password',
      icon: 'lucide:eye',
      type: 'text'
    }
  })

  return {
    toggleHidePassword,
    passwordButton
  }
}