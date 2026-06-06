import { useState, useCallback } from 'react'
import { paymentService, type PaymentData, type PaymentResponse } from '../services/payment.service'
import { emailService } from '../services/email.service'

interface UsePaymentReturn {
  processing: boolean
  paymentStatus: 'idle' | 'processing' | 'success' | 'failed' | 'cancelled'
  transactionId: string | null
  initiatePayment: (data: PaymentData) => Promise<PaymentResponse>
  verifyPayment: (transactionId: string) => Promise<boolean>
  getDonationTiers: () => { amount: number; label: string; description: string }[]
}

export const usePayment = (): UsePaymentReturn => {
  const [processing, setProcessing] = useState(false)
  const [paymentStatus, setPaymentStatus] = useState<'idle' | 'processing' | 'success' | 'failed' | 'cancelled'>('idle')
  const [transactionId, setTransactionId] = useState<string | null>(null)

  const initiatePayment = useCallback(async (data: PaymentData): Promise<PaymentResponse> => {
    setProcessing(true)
    setPaymentStatus('processing')

    try {
      const response = await paymentService.initializePayment(data)

      if (response.status === 'success') {
        setTransactionId(response.transactionId || null)
        setPaymentStatus('success')

        // Send email receipt
        await emailService.sendDonationReceipt({
          donorName: data.name,
          donorEmail: data.email,
          amount: data.amount,
          transactionId: response.transactionId || '',
          date: new Date().toISOString(),
          paymentMethod: 'Flutterwave',
        })

        return response
      } else if (response.status === 'failed') {
        setPaymentStatus('failed')
        return response
      } else {
        setPaymentStatus('cancelled')
        return response
      }
    } catch (error) {
      setPaymentStatus('failed')
      console.error('Payment initiation failed:', error)
      return {
        status: 'failed',
        message: 'Payment processing failed. Please try again.',
      }
    } finally {
      setProcessing(false)
    }
  }, [])

  const verifyPayment = useCallback(async (id: string): Promise<boolean> => {
    try {
      return await paymentService.verifyPayment(id)
    } catch (error) {
      console.error('Payment verification failed:', error)
      return false
    }
  }, [])

  const getDonationTiers = useCallback(() => {
    return paymentService.getDonationTiers()
  }, [])

  return {
    processing,
    paymentStatus,
    transactionId,
    initiatePayment,
    verifyPayment,
    getDonationTiers,
  }
}