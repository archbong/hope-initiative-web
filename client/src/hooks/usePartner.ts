import { useState, useEffect, useCallback } from 'react'
import { partnerService } from '../services/partner.service'
import type { Partner } from '../services/partner.service'

interface UsePartnersReturn {
  corporatePartners: Partner[]
  internationalPartners: Partner[]
  localPartners: Partner[]
  allPartners: Partner[]
  featuredPartners: Partner[]
  loading: boolean
  error: string | null
  fetchAllPartners: () => Promise<void>
  fetchCorporate: () => Promise<void>
  fetchInternational: () => Promise<void>
  fetchLocal: () => Promise<void>
}

export const usePartners = (): UsePartnersReturn => {
  const [corporatePartners, setCorporatePartners] = useState<Partner[]>([])
  const [internationalPartners, setInternationalPartners] = useState<Partner[]>([])
  const [localPartners, setLocalPartners] = useState<Partner[]>([])
  const [allPartners, setAllPartners] = useState<Partner[]>([])
  const [featuredPartners, setFeaturedPartners] = useState<Partner[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)

  const fetchAllPartners = useCallback(async () => {
    setLoading(true)
    setError(null)

    try {
      const response = await partnerService.getAll()
      if (response.success) {
        setAllPartners(response.data)
      } else {
        setError(response.message || 'Failed to fetch partners')
      }
    } catch (err) {
      setError('An error occurred while fetching partners')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }, [])

  const fetchCorporate = useCallback(async () => {
    try {
      const response = await partnerService.getCorporate()
      if (response.success) {
        setCorporatePartners(response.data)
      }
    } catch (err) {
      console.error('Failed to fetch corporate partners:', err)
    }
  }, [])

  const fetchInternational = useCallback(async () => {
    try {
      const response = await partnerService.getInternational()
      if (response.success) {
        setInternationalPartners(response.data)
      }
    } catch (err) {
      console.error('Failed to fetch international partners:', err)
    }
  }, [])

  const fetchLocal = useCallback(async () => {
    try {
      const response = await partnerService.getLocal()
      if (response.success) {
        setLocalPartners(response.data)
      }
    } catch (err) {
      console.error('Failed to fetch local partners:', err)
    }
  }, [])

  const fetchFeatured = useCallback(async () => {
    try {
      const response = await partnerService.getFeatured()
      if (response.success) {
        setFeaturedPartners(response.data)
      }
    } catch (err) {
      console.error('Failed to fetch featured partners:', err)
    }
  }, [])

  useEffect(() => {
    const loadAll = async () => {
      await Promise.all([
        fetchAllPartners(),
        fetchCorporate(),
        fetchInternational(),
        fetchLocal(),
        fetchFeatured()
      ])
    }

    loadAll()
  }, [fetchAllPartners, fetchCorporate, fetchInternational, fetchLocal, fetchFeatured])

  return {
    corporatePartners,
    internationalPartners,
    localPartners,
    allPartners,
    featuredPartners,
    loading,
    error,
    fetchAllPartners,
    fetchCorporate,
    fetchInternational,
    fetchLocal
  }
}