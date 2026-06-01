import type { ApiResponse } from '../types'
import type { BankAccount, Donation, SponsorshipTier } from '../types/donation.types'
import { API_CONFIG, simulateDelay } from './api.config'

class DonationService {
  private bankAccounts: BankAccount[] = [
    {
      bank: 'First Bank of Nigeria',
      accountName: 'Hope for the Hopeless Initiative',
      accountNumber: '2034567890',
      sortCode: '011234567',
      currency: 'NGN'
    },
    {
      bank: 'GTBank',
      accountName: 'Hope for the Hopeless Initiative',
      accountNumber: '0589123456',
      sortCode: '058123456',
      currency: 'NGN'
    },
    {
      bank: 'Access Bank',
      accountName: 'Hope for the Hopeless Initiative',
      accountNumber: '0778945612',
      sortCode: '044123456',
      currency: 'NGN'
    }
  ]

  private sponsorshipTiers: SponsorshipTier[] = [
    {
      id: 'child-education',
      title: 'Sponsor a Child\'s Education',
      amount: '₦50,000/year',
      amountValue: 50000,
      description: 'Provide school fees, books, and supplies for one child',
      benefits: ['Regular progress updates', 'Photos from school', 'Certificate of sponsorship'],
      icon: 'GraduationCap'
    },
    {
      id: 'feed-family',
      title: 'Feed a Family for a Month',
      amount: '₦25,000/month',
      amountValue: 25000,
      description: 'Provide nutritious meals for a family of four',
      benefits: ['Monthly impact report', 'Family story update'],
      icon: 'Utensils'
    },
    {
      id: 'youth-program',
      title: 'Youth Program Support',
      amount: '₦100,000',
      amountValue: 100000,
      description: 'Fund a youth sensitization workshop',
      benefits: ['Workshop photos', 'Participant impact stories'],
      icon: 'Users'
    }
  ]

  // Get bank accounts for transfer
  async getBankAccounts(): Promise<ApiResponse<BankAccount[]>> {
    await simulateDelay(200)

    return {
      success: true,
      data: this.bankAccounts,
      message: 'Bank accounts retrieved successfully'
    }
  }

  // Get sponsorship tiers
  async getSponsorshipTiers(): Promise<ApiResponse<SponsorshipTier[]>> {
    await simulateDelay(200)

    return {
      success: true,
      data: this.sponsorshipTiers,
      message: 'Sponsorship tiers retrieved successfully'
    }
  }

  // Process donation (future: integrate with PayStack/Flutterwave)
  async processDonation(donation: Partial<Donation>): Promise<ApiResponse<Donation>> {
    if (API_CONFIG.USE_REAL_API) {
      // Future payment gateway integration
      // const response = await apiRequest<ApiResponse<Donation>>('/donations', {
      //   method: 'POST',
      //   body: JSON.stringify(donation)
      // })
      // return response
    }

    await simulateDelay(1500)

    const newDonation: Donation = {
      // id: Date.now().toString(),
      ...donation as Donation,
      status: 'completed',
      createdAt: new Date().toISOString(),
      transactionId: `TXN-${Date.now()}`
    }

    // Store in localStorage
    const donations = this.getLocalDonations()
    donations.push(newDonation)
    localStorage.setItem('donations', JSON.stringify(donations))

    console.log('Donation Processed:', newDonation)

    return {
      success: true,
      data: newDonation,
      message: 'Donation processed successfully! Thank you for your support.'
    }
  }

  // Get donation history (for donor portal - future)
  async getDonationHistory(email: string): Promise<ApiResponse<Donation[]>> {
    await simulateDelay(300)

    const donations = this.getLocalDonations()
    const userDonations = donations.filter(d => d.donorEmail === email)

    return {
      success: true,
      data: userDonations,
      total: userDonations.length,
      message: 'Donation history retrieved successfully'
    }
  }

  // Get donation statistics
  async getStats(): Promise<ApiResponse<any>> {
    await simulateDelay(200)

    const donations = this.getLocalDonations()
    const totalAmount = donations.reduce((sum, d) => sum + d.amount, 0)
    const totalDonations = donations.length

    return {
      success: true,
      data: {
        totalAmount,
        totalDonations,
        averageDonation: totalDonations > 0 ? totalAmount / totalDonations : 0
      },
      message: 'Statistics retrieved successfully'
    }
  }

  private getLocalDonations(): Donation[] {
    const stored = localStorage.getItem('donations')
    return stored ? JSON.parse(stored) : []
  }
}

export const donationService = new DonationService()