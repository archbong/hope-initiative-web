import { useState, useCallback } from 'react';
import { donationService } from '../services/donation.service';
import type { ApiResponse } from '../types';
import type { BankAccount, Donation, SponsorshipTier } from '../types/donation.types';

interface UseDonationReturn {
  loading: boolean;
  error: string | null;
  bankAccounts: BankAccount[];
  sponsorshipTiers: SponsorshipTier[];
  fetchBankAccounts: () => Promise<void>;
  fetchSponsorshipTiers: () => Promise<void>;
  processDonation: (donation: Partial<Donation>) => Promise<ApiResponse<Donation>>;
  getDonationHistory: (email: string) => Promise<Donation[]>;
  getDonationStats: () => Promise<any>;
}

export const useDonation = (): UseDonationReturn => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [bankAccounts, setBankAccounts] = useState<BankAccount[]>([]);
  const [sponsorshipTiers, setSponsorshipTiers] = useState<SponsorshipTier[]>([]);

  const fetchBankAccounts = useCallback(async () => {
    setLoading(true);
    try {
      const response = await donationService.getBankAccounts();
      if (response.success) {
        setBankAccounts(response.data);
      }
    } catch (err) {
      setError('Failed to load bank account information');
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchSponsorshipTiers = useCallback(async () => {
    setLoading(true);
    try {
      const response = await donationService.getSponsorshipTiers();
      if (response.success) {
        setSponsorshipTiers(response.data);
      }
    } catch (err) {
      setError('Failed to load sponsorship information');
    } finally {
      setLoading(false);
    }
  }, []);

  const processDonation = useCallback(async (donation: Partial<Donation>): Promise<ApiResponse<Donation>> => {
    setLoading(true);
    setError(null);
    try {
      const response = await donationService.processDonation(donation);
      if (!response.success) {
        setError(response.message || 'Failed to process donation');
      }
      return response;
    } catch (err) {
      setError('An error occurred while processing your donation');
      return {
        success: false,
        data: null as any,
        message: 'An error occurred while processing your donation'
      };
    } finally {
      setLoading(false);
    }
  }, []);

  const getDonationHistory = useCallback(async (email: string): Promise<Donation[]> => {
    try {
      const response = await donationService.getDonationHistory(email);
      return response.success ? response.data : [];
    } catch (err) {
      console.error(err);
      return [];
    }
  }, []);

  const getDonationStats = useCallback(async () => {
    try {
      const response = await donationService.getStats();
      return response.success ? response.data : null;
    } catch (err) {
      console.error(err);
      return null;
    }
  }, []);

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
  };
};