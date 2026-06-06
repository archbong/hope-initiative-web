import { motion } from 'framer-motion'
import { ChevronLeft, ChevronRight, ArrowUpRight, ArrowDownRight } from 'lucide-react'
import type { Transaction } from '../../types/financial.types'

interface TransactionTableProps {
  transactions: Transaction[]
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
  loading?: boolean
}

const TransactionTable: React.FC<TransactionTableProps> = ({
  transactions,
  currentPage,
  totalPages,
  onPageChange,
  loading = false
}) => {
  if (loading) {
    return (
      <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
        <div className="p-8 text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-sky-600 mx-auto"></div>
          <p className="text-slate-500 mt-4">Loading transactions...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
      {/* Scrollable table container */}
      <div className="overflow-x-auto overflow-y-auto max-h-[600px]">
        <table className="w-full min-w-[800px]">
          <thead className="bg-slate-50 border-b border-slate-100 sticky top-0 z-10">
            <tr>
              <th className="text-left px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider whitespace-nowrap">
                Date
              </th>
              <th className="text-left px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider whitespace-nowrap">
                Action
              </th>
              <th className="text-right px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider whitespace-nowrap">
                Amount (₦'000)
              </th>
              <th className="text-left px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider whitespace-nowrap">
                Description
              </th>
              <th className="text-right px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider whitespace-nowrap">
                Balance (₦'000)
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {transactions.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-6 py-12 text-center text-slate-500">
                  No transactions found
                </td>
              </tr>
            ) : (
              transactions.map((transaction, index) => (
                <motion.tr
                  key={transaction.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: index * 0.02 }}
                  className="hover:bg-slate-50 transition-colors"
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-slate-900">{transaction.date}</div>
                    <div className="text-xs text-slate-400">{transaction.time}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center space-x-2">
                      {transaction.action === 'Credit' ? (
                        <>
                          <ArrowUpRight className="h-4 w-4 text-emerald-600" />
                          <span className="text-sm font-semibold text-emerald-600">Credit</span>
                        </>
                      ) : (
                        <>
                          <ArrowDownRight className="h-4 w-4 text-rose-600" />
                          <span className="text-sm font-semibold text-rose-600">Debit</span>
                        </>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right whitespace-nowrap">
                    <span className={`text-sm font-bold ${transaction.action === 'Credit' ? 'text-emerald-600' : 'text-rose-600'}`}>
                      {transaction.action === 'Credit' ? '+' : '-'}{transaction.amount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-slate-700 break-words max-w-[300px]">
                      {transaction.description}
                    </div>
                    {transaction.reference && (
                      <div className="text-xs text-slate-400 font-mono mt-1">
                        Ref: {transaction.reference.slice(-12)}
                      </div>
                    )}
                  </td>
                  <td className="px-6 py-4 text-right whitespace-nowrap">
                    <span className="text-sm font-mono font-semibold text-slate-900">
                      {transaction.balance.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </span>
                  </td>
                </motion.tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination - Sticky at bottom */}
      {totalPages > 1 && (
        <div className="px-6 py-4 border-t border-slate-100 flex items-center justify-between bg-white sticky bottom-0">
          <div className="text-sm text-slate-500">
            Page {currentPage} of {totalPages}
          </div>
          <div className="flex space-x-2">
            <button
              onClick={() => onPageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="p-2 rounded-lg bg-white border border-slate-200 text-slate-600 hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed transition"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button
              onClick={() => onPageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="p-2 rounded-lg bg-white border border-slate-200 text-slate-600 hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed transition"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default TransactionTable