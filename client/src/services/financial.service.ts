import type { ApiResponse } from '../types'
import financialData from '../data/financials.json'
import { API_CONFIG, simulateDelay } from './api.config'
import type { Donation } from '../types/donation.types'
import type {
  DonationRecord,
  ExpenseRecord,
  Transaction,
  FinancialStats,
  PaginatedResponse
} from '../types/financial.types'

class FinancialService {
  private staticRecords: DonationRecord[] = financialData.records
  private staticExpenses: ExpenseRecord[] = financialData.expenses

  /**
   * Converts actual Naira amount to '000s format (1 = ₦1,000)
   */
  private toThousands(amount: number): number {
    return amount / 1000
  }

  /**
   * Formats date to DD/MM/YYYY HH:MM:SS AM/PM
   */
  private formatDateTime(dateString: string): { date: string; time: string } {
    const date = new Date(dateString)
    return {
      date: date.toLocaleDateString('en-GB'),
      time: date.toLocaleTimeString('en-GB')
    }
  }

  /**
   * Merges static JSON data with real-time donations from localStorage
   */
  private getMergedDonations(): DonationRecord[] {
    const rawStored = localStorage.getItem('donations')
    const liveDonations: Donation[] = rawStored ? JSON.parse(rawStored) : []

    const mappedLive: DonationRecord[] = liveDonations.map((d, i) => {
      let displayName = 'Anonymous Donor'
      let displayInitials = '***'

      if (!d.isAnonymous && d.donorName) {
        const nameParts = d.donorName.trim().split(' ')

        if (nameParts.length >= 2) {
          // Show first name + asterisks for last name
          // Example: "John Doe" → "John ****"
          const firstName = nameParts[0]
          const maskedLastName = '******'
          displayName = `${firstName} ${maskedLastName}`
          displayInitials = `${firstName.charAt(0)}. ****`
        } else if (nameParts.length === 1) {
          // Single name - show first 3 letters + asterisks
          // Example: "Emmanuel" → "Emm***"
          const singleName = nameParts[0]
          const visiblePart = singleName.substring(0, 3)
          displayName = `${visiblePart}***`
          displayInitials = `${visiblePart}***`
        }
      }

      return {
        id: d.transactionId || `LIVE-${i}`,
        donorName: d.isAnonymous ? 'Anonymous Donor' : displayName,
        donorInitials: d.isAnonymous ? '***' : displayInitials,
        amount: d.amount,
        date: d.createdAt?.split('T')[0] || new Date().toISOString().split('T')[0],
        transactionId: d.transactionId || `TXN-${Date.now()}`,
        isAnonymous: d.isAnonymous || false,
        isTarget: false,
        message: ''
      }
    })

    // Process static records to mask last names
    const processedStaticRecords: DonationRecord[] = this.staticRecords.map(record => {
      if (record.isAnonymous) {
        return { ...record, donorName: 'Anonymous Donor', donorInitials: '***' }
      }

      let displayName = record.donorName
      const nameParts = record.donorName.trim().split(' ')

      if (nameParts.length >= 2) {
        // Show first name + asterisks for last name
        const firstName = nameParts[0]
        displayName = `${firstName} ******`
      } else if (nameParts.length === 1) {
        // Single name - show first 3 letters + asterisks
        const visiblePart = nameParts[0].substring(0, 3)
        displayName = `${visiblePart}***`
      }

      return {
        ...record,
        donorName: displayName,
        donorInitials: displayName
      }
    })

    return [...mappedLive, ...processedStaticRecords].sort((a, b) =>
      new Date(b.date).getTime() - new Date(a.date).getTime()
    )
  }

  /**
   * Generates complete transaction ledger (Credits from donations + Debits from expenses)
   */
  private generateTransactionLedger(): Transaction[] {
    const transactions: Transaction[] = []
    const donations = this.getMergedDonations()
    const expenses = this.staticExpenses

    // Add credit transactions from donations
    for (const donation of donations) {
      const { date, time } = this.formatDateTime(donation.date)
      transactions.push({
        id: donation.id,
        date,
        time,
        action: 'Credit',
        amount: this.toThousands(donation.amount),
        description: donation.isAnonymous
          ? `Anonymous Donation`
          : `Donation from ${donation.donorName}`,
        balance: 0,
        reference: donation.transactionId
      })
    }

    // Add debit transactions from expenses
    for (const expense of expenses) {
      const { date, time } = this.formatDateTime(expense.date)
      transactions.push({
        id: expense.id,
        date,
        time,
        action: 'Debit',
        amount: this.toThousands(expense.amount),
        description: expense.description,
        balance: 0,
        reference: expense.id,
        category: expense.category
      })
    }

    // Sort by date (newest first)
    transactions.sort((a, b) => {
      const dateA = new Date(`${a.date} ${a.time}`)
      const dateB = new Date(`${b.date} ${b.time}`)
      return dateB.getTime() - dateA.getTime()
    })

    // Calculate running balance (from oldest to newest, then reverse)
    const reversed = [...transactions].reverse()
    let runningBalance = 0
    for (const tx of reversed) {
      if (tx.action === 'Credit') {
        runningBalance += tx.amount
      } else {
        runningBalance -= tx.amount
      }
      tx.balance = runningBalance
    }

    return transactions.reverse()
  }

  async getStats(): Promise<ApiResponse<FinancialStats>> {
    if (API_CONFIG.USE_REAL_API) {
      // Future backend integration
    }
    await simulateDelay(300)

    const transactions = this.generateTransactionLedger()

    let totalCredit = 0
    let totalDebit = 0

    for (const tx of transactions) {
      if (tx.action === 'Credit') {
        totalCredit += tx.amount
      } else {
        totalDebit += tx.amount
      }
    }

    const stats: FinancialStats = {
      totalCredit,
      totalDebit,
      currentBalance: totalCredit - totalDebit
    }

    return { success: true, data: stats, message: 'Financial stats retrieved successfully' }
  }

  async getTransactionHistory(
    page: number = 1,
    limit: number = 20,
    filter: 'all' | 'credit' | 'debit' = 'all'
  ): Promise<ApiResponse<PaginatedResponse<Transaction>>> {
    await simulateDelay(400)

    let transactions = this.generateTransactionLedger()

    if (filter === 'credit') {
      transactions = transactions.filter(tx => tx.action === 'Credit')
    } else if (filter === 'debit') {
      transactions = transactions.filter(tx => tx.action === 'Debit')
    }

    const start = (page - 1) * limit
    const paginated = transactions.slice(start, start + limit)
    const totalPages = Math.ceil(transactions.length / limit)

    return {
      success: true,
      data: {
        data: paginated,
        total: transactions.length,
        page,
        limit,
        totalPages
      },
      message: 'Transaction history retrieved successfully'
    }
  }

  async getDonationHistory(
    page: number = 1,
    limit: number = 20,
    filter: 'all' | 'anonymous' | 'public' = 'all'
  ): Promise<ApiResponse<PaginatedResponse<DonationRecord>>> {
    await simulateDelay(400)

    let donations = this.getMergedDonations()

    if (filter === 'anonymous') {
      donations = donations.filter(d => d.isAnonymous === true)
    } else if (filter === 'public') {
      donations = donations.filter(d => d.isAnonymous === false)
    }

    const start = (page - 1) * limit
    const paginated = donations.slice(start, start + limit)
    const totalPages = Math.ceil(donations.length / limit)

    return {
      success: true,
      data: {
        data: paginated,
        total: donations.length,
        page,
        limit,
        totalPages
      },
      message: 'Donation history retrieved successfully'
    }
  }

  async getExpenseHistory(
    page: number = 1,
    limit: number = 20,
    category?: string
  ): Promise<ApiResponse<PaginatedResponse<ExpenseRecord>>> {
    await simulateDelay(400)

    let expenses = [...this.staticExpenses]

    if (category && category !== 'all') {
      expenses = expenses.filter(e => e.category === category)
    }

    // Sort by date (newest first)
    expenses.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

    const start = (page - 1) * limit
    const paginated = expenses.slice(start, start + limit)
    const totalPages = Math.ceil(expenses.length / limit)

    return {
      success: true,
      data: {
        data: paginated,
        total: expenses.length,
        page,
        limit,
        totalPages
      },
      message: 'Expense history retrieved successfully'
    }
  }

  async getExpenseCategories(): Promise<ApiResponse<string[]>> {
    await simulateDelay(100)

    const categories = [...new Set(this.staticExpenses.map(e => e.category))]
    return {
      success: true,
      data: categories,
      message: 'Categories retrieved successfully'
    }
  }
}

export const financialService = new FinancialService()