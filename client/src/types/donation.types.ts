import type { BaseEntity } from './index'

export interface BankAccount {
  bank: string
  accountName: string
  accountNumber: string
  sortCode: string
  swiftAddress?: string
  zenithBankSwift?: string
  currency?: string
}

export interface Donation extends BaseEntity {
  amount: number
  donorName: string
  donorEmail: string
  donorPhone?: string
  paymentMethod: 'bank_transfer' | 'card' | 'cash'
  status: 'pending' | 'completed' | 'failed'
  transactionId?: string
  isAnonymous?: boolean
}

export interface SponsorshipTier {
  id: string
  title: string
  amount: string
  amountValue: number
  description: string
  benefits: string[]
  icon: string
}