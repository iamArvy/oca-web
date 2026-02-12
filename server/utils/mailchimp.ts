import mailchimp from '@mailchimp/mailchimp_marketing'

export function useMailchimp() {
  const config = useRuntimeConfig()
  const { apiKey, serverPrefix, listId } = config.mailchimp

  mailchimp.setConfig({
    apiKey,
    server: serverPrefix,
  })

  async function addSubscriber(email: string, firstName?: string, lastName?: string) {
    try {
      const response = await mailchimp.lists.addListMember(listId, {
        email_address: email,
        status: 'subscribed',
        merge_fields: { FNAME: firstName || '', LNAME: lastName || '' },
      })
      return { success: true, data: response }
    } catch (error: any) {
      if (error.response?.body?.title === 'Member Exists') {
        return { success: false, message: 'This email is already subscribed.' }
      }
      // console.error('Mailchimp error:', error)
      return { success: false, message: 'Internal error occurred while subscribing.' }
    }
  }

  return { addSubscriber }
}
