import { useState, useCallback } from 'react'
import { financialService } from '../services/financial.service'
import type { Transaction, FinancialStats } from '../types/financial.types'

interface UseFinancialsReturn {
  loading: boolean
  stats: FinancialStats | null
  transactions: Transaction[]
  total: number
  currentPage: number
  totalPages: number
  fetchDashboard: (page?: number, filter?: 'all' | 'credit' | 'debit') => Promise<void>
  setPage: (page: number) => void
}

export const useFinancials = (): UseFinancialsReturn => {
  const [loading, setLoading] = useState(false)
  const [stats, setStats] = useState<FinancialStats | null>(null)
  const [transactions, setTransactions] = useState<Transaction[]>([])
  const [total, setTotal] = useState(0)
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [currentFilter, setCurrentFilter] = useState<'all' | 'credit' | 'debit'>('all')

  const fetchDashboard = useCallback(async (page = 1, filter: 'all' | 'credit' | 'debit' = 'all') => {
    setLoading(true)
    setCurrentFilter(filter)
    setCurrentPage(page)

    try {
      const [statsRes, historyRes] = await Promise.all([
        financialService.getStats(),
        financialService.getTransactionHistory(page, 20, filter)
      ])

      if (statsRes.success) {
        setStats(statsRes.data)
      }

      if (historyRes.success) {
        setTransactions(historyRes.data.data)
        setTotal(historyRes.data.total)
        setTotalPages(historyRes.data.totalPages)
      }
    } catch (error) {
      console.error('Failed to fetch financial data:', error)
    } finally {
      setLoading(false)
    }
  }, [])

  const setPage = useCallback((page: number) => {
    fetchDashboard(page, currentFilter)
  }, [fetchDashboard, currentFilter])

  return {
    loading,
    stats,
    transactions,
    total,
    currentPage,
    totalPages,
    fetchDashboard,
    setPage
  }
}

export default useFinancials