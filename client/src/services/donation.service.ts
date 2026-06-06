import { emailService } from './email.service';
import type { ApiResponse } from '../types';
import type { BankAccount, Donation, SponsorshipTier } from '../types/donation.types';
import { simulateDelay } from './api.config';

class DonationService {
  private donationAccessKey = import.meta.env.VITE_DONATION_FORM_ID || '';
  private contactEmail = import.meta.env.VITE_CONTACT_EMAIL || '';

  private bankAccounts: BankAccount[] = [
    {
      bank: 'Zenith Bank',
      accountName: 'HOPE FOR THE HOPELESS AND ORPHANS AND ENTREPRENEURIAL INITIATIVES',
      accountNumber: '1222367483',
      sortCode: '057210050',
      currency: 'NGN'
    },
    {
      bank: 'Zenith Bank',
      accountName: 'HOPE FOR THE HOPELESS AND ORPHANS AND ENTREPRENEURIAL INITIATIVES',
      accountNumber: '5072440899',
      sortCode: '058123456',
      currency: 'USD'
    },
    {
      bank: 'CITIBANK NA CANADA SQUARE CANARY WHARF LONDON',
      accountName: 'ZENITH BANK PLC',
      accountNumber: '5527945',
      sortCode: '18-50-08',
      swiftAddress: 'CITIGB2L',
      zenithBankSwift: 'ZEIBNGLA',
      currency: 'GBP'
    },
    {
      bank: 'CITIBANK NA CANADA SQUARE CANARY WHARF LONDON',
      accountName: 'ZENITH BANK PLC',
      accountNumber: '8663076',
      sortCode: '18-50-08',
      swiftAddress: 'CITIGB2L',
      zenithBankSwift: 'ZEIBNGLA',
      currency: 'EUR'
    }
  ];

  private sponsorshipTiers: SponsorshipTier[] = [
    {
      id: 'child-education',
      title: "Sponsor a Child's Education",
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
  ];

  async getBankAccounts(): Promise<ApiResponse<BankAccount[]>> {
    await simulateDelay(200);
    return {
      success: true,
      data: this.bankAccounts,
      message: 'Bank accounts retrieved successfully'
    };
  }

  async getSponsorshipTiers(): Promise<ApiResponse<SponsorshipTier[]>> {
    await simulateDelay(200);
    return {
      success: true,
      data: this.sponsorshipTiers,
      message: 'Sponsorship tiers retrieved successfully'
    };
  }

  async processDonation(donationData: Partial<Donation>): Promise<ApiResponse<Donation>> {
    try {
      const timestamp = new Date().toISOString();

      // Mask the donor name for privacy
      let maskedName = donationData.donorName || ''
      if (donationData.donorName && !donationData.isAnonymous) {
        const nameParts = donationData.donorName.trim().split(' ')
        if (nameParts.length >= 2) {
          // Keep first name, mask last name
          maskedName = `${nameParts[0]} ******`
        } else if (nameParts.length === 1) {
          // Show first 3 letters, mask rest
          const visiblePart = nameParts[0].substring(0, 3)
          maskedName = `${visiblePart}***`
        }
      }

      // Combine incoming components seamlessly to build your strict Donation object
      const completeDonation: Donation = {
        ...donationData as Donation,
        donorName: donationData.isAnonymous ? 'Anonymous Donor' : maskedName,
        status: 'completed',
        createdAt: timestamp,
        transactionId: donationData.transactionId || `FLW-MOCK-${Date.now()}`,
        isAnonymous: donationData.isAnonymous || false
      };

      // 1. Persist directly to Local Storage Cache
      const history = this.getLocalDonations();
      history.push(completeDonation);
      localStorage.setItem('donations', JSON.stringify(history));

      // 2. Prepare Form Email payload safely without syntax breaks
      const formData = new FormData();
      formData.append('access_key', this.donationAccessKey);
      formData.append('subject', `Verified Donation: ₦${completeDonation.amount.toLocaleString()} from ${completeDonation.donorName}`);
      formData.append('from_name', completeDonation.donorName);
      formData.append('email', completeDonation.donorEmail);
      formData.append('to_email', this.contactEmail);

      const emailMessageBody = `
        System Notification: Verified Donation Logged
        ---------------------------------------------
        Donor Name: ${completeDonation.donorName}
        Donor Email: ${completeDonation.donorEmail}
        Donor Phone: ${completeDonation.donorPhone || 'N/A'}
        
        Financial Meta-parameters:
        Amount Authorized: ₦${completeDonation.amount.toLocaleString()}
        Payment Framework: ${completeDonation.paymentMethod.toUpperCase()} Channel
        Transaction Reference: ${completeDonation.transactionId}
        Timestamp Reference: ${new Date(timestamp).toLocaleString()}
      `;
      formData.append('message', emailMessageBody);

      // 3. Fire background email verification request
      await emailService.sendEmail(formData);

      return {
        success: true,
        data: completeDonation,
        message: 'Donation processed successfully! Thank you for your support.'
      };
    } catch (error) {
      console.error('Donation Service Error:', error);
      return {
        success: false,
        data: null as any,
        message: 'Internal processing failure while storing transaction details.'
      };
    }
  }

  async getDonationHistory(email: string): Promise<ApiResponse<Donation[]>> {
    await simulateDelay(300);
    const donations = this.getLocalDonations();
    const userDonations = donations.filter(d => d.donorEmail === email);
    return {
      success: true,
      data: userDonations,
      total: userDonations.length,
      message: 'Donation history retrieved successfully'
    };
  }

  async getStats(): Promise<ApiResponse<any>> {
    await simulateDelay(200);
    const donations = this.getLocalDonations();
    const totalAmount = donations.reduce((sum, d) => sum + d.amount, 0);
    const totalDonations = donations.length;
    return {
      success: true,
      data: {
        totalAmount,
        totalDonations,
        averageDonation: totalDonations > 0 ? totalAmount / totalDonations : 0
      },
      message: 'Statistics retrieved successfully'
    };
  }

  private getLocalDonations(): Donation[] {
    const stored = localStorage.getItem('donations');
    return stored ? JSON.parse(stored) : [];
  }
}

export const donationService = new DonationService();