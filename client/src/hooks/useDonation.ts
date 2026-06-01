import { useState, useCallback } from 'react'
import { donationService } from '../services/donation.service'
import type { BankAccount, Donation, SponsorshipTier } from '../types/donation.types'
// import { BankAccount, SponsorshipTier, Donation } from '../types'

interface UseDonationReturn {
  loading: boolean
  error: string | null
  bankAccounts: BankAccount[]
  sponsorshipTiers: SponsorshipTier[]
  fetchBankAccounts: () => Promise<void>
  fetchSponsorshipTiers: () => Promise<void>
  processDonation: (donation: Partial<Donation>) => Promise<boolean>
  getDonationHistory: (email: string) => Promise<Donation[]>
  getDonationStats: () => Promise<any>
}

export const useDonation = (): UseDonationReturn => {
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)
  const [bankAccounts, setBankAccounts] = useState<BankAccount[]>([])
  const [sponsorshipTiers, setSponsorshipTiers] = useState<SponsorshipTier[]>([])

  const fetchBankAccounts = useCallback(async () => {
    setLoading(true)
    try {
      const response = await donationService.getBankAccounts()
      if (response.success) {
        setBankAccounts(response.data)
      }
    } catch (err) {
      console.error('Failed to fetch bank accounts:', err)
      setError('Failed to load bank account information')
    } finally {
      setLoading(false)
    }
  }, [])

  const fetchSponsorshipTiers = useCallback(async () => {
    setLoading(true)
    try {
      const response = await donationService.getSponsorshipTiers()
      if (response.success) {
        setSponsorshipTiers(response.data)
      }
    } catch (err) {
      console.error('Failed to fetch sponsorship tiers:', err)
      setError('Failed to load sponsorship information')
    } finally {
      setLoading(false)
    }
  }, [])

  const processDonation = useCallback(async (donation: Partial<Donation>): Promise<boolean> => {
    setLoading(true)
    setError(null)

    try {
      const response = await donationService.processDonation(donation)
      if (response.success) {
        return true
      } else {
        setError(response.message || 'Failed to process donation')
        return false
      }
    } catch (err) {
      setError('An error occurred while processing your donation')
      console.error(err)
      return false
    } finally {
      setLoading(false)
    }
  }, [])

  const getDonationHistory = useCallback(async (email: string): Promise<Donation[]> => {
    try {
      const response = await donationService.getDonationHistory(email)
      return response.success ? response.data : []
    } catch (err) {
      console.error('Failed to fetch donation history:', err)
      return []
    }
  }, [])

  const getDonationStats = useCallback(async () => {
    try {
      const response = await donationService.getStats()
      return response.success ? response.data : null
    } catch (err) {
      console.error('Failed to fetch donation stats:', err)
      return null
    }
  }, [])

  return {
    loading,
    error,
    bankAccounts,
    sponsorshipTiers,
    fetchBankAccounts,
    fetchSponsorshipTiers,
    processDonation,
    getDonationHistory,
    getDonationStats
  }
}