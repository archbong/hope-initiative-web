// useVolunteer.ts
import { useState, useCallback } from 'react';
import { volunteerService } from '../services/volunteer.service';
import type { VolunteerApplication, VolunteerFormData } from '../types/volunteer.types';

export const useVolunteer = () => {
  const [submitting, setSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const submitApplication = useCallback(async (data: VolunteerFormData) => {
    setSubmitting(true);
    setError(null);

    const result = await volunteerService.submitApplication(data);

    if (result.success) {
      setSubmitSuccess(true);
    } else {
      setError(result.message);
    }
    setSubmitting(false);
    return result.success;
  }, []);

  const getApplications = useCallback(async (): Promise<VolunteerApplication[]> => {
    try {
      const response = await volunteerService.getAllApplications()
      return response.success ? response.data : []
    } catch (err) {
      console.error('Failed to fetch applications:', err)
      return []
    }
  }, []);

  const getOpportunities = useCallback(async (): Promise<any[]> => {
    try {
      const response = await volunteerService.getOpportunities()
      return response.success ? response.data : []
    } catch (err) {
      console.error('Failed to fetch opportunities:', err)
      return []
    }
  }, []);

  const resetStatus = useCallback(() => {
    setSubmitSuccess(false)
    setError(null)
  }, [])

  return { submitting, submitSuccess, error, submitApplication, getApplications, getOpportunities, resetStatus };
};