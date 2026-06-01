import { useState, useCallback } from 'react'
import { volunteerService } from '../services/volunteer.service'
// import type { ApiResponse } from '../types'
import type { VolunteerApplication, VolunteerFormData } from '../types/volunteer.types'

interface UseVolunteerReturn {
  submitting: boolean
  submitSuccess: boolean
  error: string | null
  submitApplication: (data: VolunteerFormData) => Promise<boolean>
  getApplications: () => Promise<VolunteerApplication[]>
  getOpportunities: () => Promise<any[]>
  resetStatus: () => void
}

export const useVolunteer = (): UseVolunteerReturn => {
  const [submitting, setSubmitting] = useState<boolean>(false)
  const [submitSuccess, setSubmitSuccess] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)

  const submitApplication = useCallback(async (data: VolunteerFormData): Promise<boolean> => {
    setSubmitting(true)
    setError(null)
    setSubmitSuccess(false)

    try {
      const response = await volunteerService.submitApplication(data)
      if (response.success) {
        setSubmitSuccess(true)
        return true
      } else {
        setError(response.message || 'Failed to submit application')
        return false
      }
    } catch (err) {
      setError('An error occurred while submitting your application')
      console.error(err)
      return false
    } finally {
      setSubmitting(false)
    }
  }, [])

  const getApplications = useCallback(async (): Promise<VolunteerApplication[]> => {
    try {
      const response = await volunteerService.getAllApplications()
      return response.success ? response.data : []
    } catch (err) {
      console.error('Failed to fetch applications:', err)
      return []
    }
  }, [])

  const getOpportunities = useCallback(async (): Promise<any[]> => {
    try {
      const response = await volunteerService.getOpportunities()
      return response.success ? response.data : []
    } catch (err) {
      console.error('Failed to fetch opportunities:', err)
      return []
    }
  }, [])

  const resetStatus = useCallback(() => {
    setSubmitSuccess(false)
    setError(null)
  }, [])

  return {
    submitting,
    submitSuccess,
    error,
    submitApplication,
    getApplications,
    getOpportunities,
    resetStatus
  }
}