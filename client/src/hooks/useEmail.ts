import { useState, useCallback } from 'react'
import { emailService } from '../services/email.service'
import type { ContactFormData, VolunteerFormData } from '../services/email.service'

interface UseEmailReturn {
  sending: boolean
  success: boolean
  error: string | null
  sendContactEmail: (data: ContactFormData) => Promise<boolean>
  sendVolunteerEmail: (data: VolunteerFormData) => Promise<boolean>
  sendNewsletterSignup: (email: string, name?: string) => Promise<boolean>
  testEmailConfig: () => Promise<boolean>
  resetStatus: () => void
}

export const useEmail = (): UseEmailReturn => {
  const [sending, setSending] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const sendContactEmail = useCallback(async (data: ContactFormData): Promise<boolean> => {
    setSending(true)
    setError(null)
    setSuccess(false)

    try {
      const response = await emailService.sendContactForm(data)
      if (response.success) {
        setSuccess(true)
        return true
      } else {
        setError(response.message)
        return false
      }
    } catch (err) {
      setError('An error occurred while sending your message')
      console.error(err)
      return false
    } finally {
      setSending(false)
    }
  }, [])

  const sendVolunteerEmail = useCallback(async (data: VolunteerFormData): Promise<boolean> => {
    setSending(true)
    setError(null)
    setSuccess(false)

    try {
      const response = await emailService.sendVolunteerApplication(data)
      if (response.success) {
        setSuccess(true)
        return true
      } else {
        setError(response.message)
        return false
      }
    } catch (err) {
      setError('An error occurred while submitting your application')
      console.error(err)
      return false
    } finally {
      setSending(false)
    }
  }, [])

  const sendNewsletterSignup = useCallback(async (email: string, name?: string): Promise<boolean> => {
    setSending(true)
    setError(null)
    setSuccess(false)

    try {
      const response = await emailService.sendNewsletterConfirmation(email, name)
      if (response.success) {
        setSuccess(true)
        return true
      } else {
        setError(response.message)
        return false
      }
    } catch (err) {
      setError('An error occurred while subscribing')
      console.error(err)
      return false
    } finally {
      setSending(false)
    }
  }, [])

  const testEmailConfig = useCallback(async (): Promise<boolean> => {
    setSending(true)
    setError(null)

    try {
      const response = await emailService.testConfig()
      if (response.success) {
        setSuccess(true)
        return true
      } else {
        setError(response.message)
        return false
      }
    } catch (err) {
      setError('Test failed')
      console.error(err)
      return false
    } finally {
      setSending(false)
    }
  }, [])

  const resetStatus = useCallback(() => {
    setSuccess(false)
    setError(null)
  }, [])

  return {
    sending,
    success,
    error,
    sendContactEmail,
    sendVolunteerEmail,
    sendNewsletterSignup,
    testEmailConfig,
    resetStatus,
  }
}