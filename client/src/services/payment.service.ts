// import { FlutterWaveResponse, CloseModalResponse } from 'flutterwave-react-v3'
interface FlutterWaveResponse {
  status: string
  transaction_id?: string
  tx_ref?: string
}

interface CloseModalResponse {
  status: string
}

export interface PaymentData {
  amount: number
  email: string
  name: string
  phone?: string
  purpose?: string
  reference?: string
}

export interface PaymentResponse {
  status: 'success' | 'failed' | 'cancelled'
  transactionId?: string
  reference?: string
  message: string
}

class PaymentService {
  private publicKey: string
  encryptionKey: string // Check this line

  constructor() {
    this.publicKey = import.meta.env.VITE_FLUTTERWAVE_PUBLIC_KEY || ''
    this.encryptionKey = import.meta.env.VITE_FLUTTERWAVE_ENCRYPTION_KEY || ''
  }

  // Initialize Flutterwave payment
  initializePayment(data: PaymentData): Promise<PaymentResponse> {
    return new Promise((resolve) => {
      // Check if Flutterwave is loaded
      if (!window.FlutterwaveCheckout) {
        this.loadFlutterwaveScript().then(() => {
          this.openPaymentModal(data, resolve)
        })
      } else {
        this.openPaymentModal(data, resolve)
      }
    })
  }

  private loadFlutterwaveScript(): Promise<void> {
    return new Promise((resolve) => {
      const script = document.createElement('script')
      script.src = 'https://checkout.flutterwave.com/v3.js'
      script.onload = () => resolve()
      document.body.appendChild(script)
    })
  }

  private openPaymentModal(data: PaymentData, resolve: (value: PaymentResponse) => void) {
    const generateReference = () => {
      const date = new Date()
      const timestamp = date.getTime()
      const random = Math.floor(Math.random() * 1000000)
      return `HOPE-${timestamp}-${random}`
    }

    const paymentReference = data.reference || generateReference()

    const flutterwaveConfig = {
      public_key: this.publicKey,
      tx_ref: paymentReference,
      amount: data.amount,
      currency: 'NGN',
      payment_options: 'card, banktransfer, ussd',
      redirect_url: `${window.location.origin}/donate/success`,
      meta: {
        consumer_id: data.email,
        consumer_mac: 'payment',
        purpose: data.purpose || 'Donation to Hope for the Hopeless Initiative',
      },
      customer: {
        email: data.email,
        phone_number: data.phone || '08012345678',
        name: data.name,
      },
      customizations: {
        title: 'Hope for the Hopeless Initiative',
        description: data.purpose || 'Thank you for your donation!',
        logo: `${window.location.origin}/logo.png`,
      },
      callback: (response: FlutterWaveResponse) => {
        console.log('Payment callback:', response)
        if (response.status === 'successful') {
          resolve({
            status: 'success',
            transactionId: response.transaction_id,
            reference: response.tx_ref,
            message: 'Payment successful! Thank you for your donation.',
          })
        } else {
          resolve({
            status: 'failed',
            message: 'Payment failed. Please try again.',
          })
        }
      },
      onclose: (response: CloseModalResponse) => {
        console.log('Payment modal closed:', response)
        resolve({
          status: 'cancelled',
          message: 'Payment was cancelled.',
        })
      },
    }

    // @ts-ignore - FlutterwaveCheckout is loaded from script
    window.FlutterwaveCheckout(flutterwaveConfig)
  }

  // Verify payment (for backend verification)
  async verifyPayment(transactionId: string): Promise<boolean> {
    try {
      // This would typically be done on the backend
      // For now, we'll simulate verification
      console.log('Verifying payment:', transactionId)
      return true
    } catch (error) {
      console.error('Payment verification failed:', error)
      return false
    }
  }

  // Get donation tiers
  getDonationTiers() {
    return [
      { amount: 5000, label: '₦5,000', description: 'Provides meals for 10 families' },
      { amount: 10000, label: '₦10,000', description: 'Supports a child\'s education for a month' },
      { amount: 25000, label: '₦25,000', description: 'Feeds a family for a month' },
      { amount: 50000, label: '₦50,000', description: 'Sponsors a youth program' },
      { amount: 100000, label: '₦100,000', description: 'Funds a community outreach event' },
      { amount: 250000, label: '₦250,000', description: 'Supports orphan care for a year' },
    ]
  }

  // Process recurring donation
  async setupRecurringDonation(data: PaymentData, frequency: 'monthly' | 'quarterly' | 'yearly'): Promise<PaymentResponse> {
    // This would require a different Flutterwave endpoint for recurring payments
    console.log('Setting up recurring donation:', { ...data, frequency })

    // For now, process as one-time payment
    return this.initializePayment(data)
  }
}

export const paymentService = new PaymentService()

// Add TypeScript declaration for Flutterwave
declare global {
  interface Window {
    FlutterwaveCheckout: any
  }
}