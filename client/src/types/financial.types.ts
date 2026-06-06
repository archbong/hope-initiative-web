export interface DonationRecord {
  id: string
  donorName: string
  donorInitials: string
  amount: number
  date: string
  transactionId: string
  isAnonymous: boolean
  isTarget: boolean
  message?: string
}

export interface ExpenseRecord {
  id: string
  description: string
  amount: number
  date: string
  category: string
}

export interface FinancialData {
  records: DonationRecord[]
  expenses: ExpenseRecord[]
}

export interface Transaction {
  id: string
  date: string
  time: string
  action: 'Credit' | 'Debit'
  amount: number
  description: string
  balance: number
  reference?: string
  category?: string
}

export interface FinancialStats {
  totalCredit: number
  totalDebit: number
  currentBalance: number
}

export interface PaginatedResponse<T> {
  data: T[]
  total: number
  page: number
  limit: number
  totalPages: number
}