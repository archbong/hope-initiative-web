import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Download, Shield, ArrowUpRight, ArrowDownRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import SEOHead from '../components/SEO/SEOHead'
import { useFinancials } from '../hooks/useFinancials'
import TransactionTable from '../components/financial/DonationTable'

const FinancialTransparency = () => {
  const [filterMode, setFilterMode] = useState<'all' | 'credit' | 'debit'>('all')
  const [currentPage, setCurrentPage] = useState(1)

  const {
    loading,
    stats,
    transactions,
    total,
    totalPages,
    fetchDashboard,
    setPage
  } = useFinancials()

  useEffect(() => {
    fetchDashboard(currentPage, filterMode)
  }, [currentPage, filterMode, fetchDashboard])

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
    setPage(page)
  }

  const handleFilterChange = (filter: 'all' | 'credit' | 'debit') => {
    setFilterMode(filter)
    setCurrentPage(1)
  }

  const handleExportCSV = () => {
    const headers = ['Date', 'Time', 'Action', 'Amount (₦\'000)', 'Description', 'Reference', 'Balance (₦\'000)']
    const rows = transactions.map(t => [
      t.date,
      t.time,
      t.action,
      t.amount.toFixed(2),
      t.description,
      t.reference || '',
      t.balance.toFixed(2)
    ])

    const csvContent = [headers, ...rows].map(row => row.join(',')).join('\n')
    const blob = new Blob([csvContent], { type: 'text/csv' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `financial-ledger-${new Date().toISOString().split('T')[0]}.csv`
    a.click()
    URL.revokeObjectURL(url)
  }

  if (!stats) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-sky-600 mx-auto mb-4"></div>
          <p className="text-slate-500">Loading financial data...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-slate-50 min-h-screen">
      <SEOHead
        title="Financial Transparency - Hope for the Hopeless Initiative"
        description="View our complete financial ledger including all donations and expenditures. Full transparency on how funds are utilized."
        keywords="financial transparency, donation tracking, NGO finances, accountability, transaction ledger"
        type="website"
      />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-slate-950 to-slate-900 text-white py-20 overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5"></div>
        <div className="container-custom relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl"
          >
            <div className="flex items-center space-x-3 mb-4">
              <Shield className="h-8 w-8 text-emerald-400" />
              <span className="text-emerald-400 font-semibold uppercase tracking-wider">Complete Transparency</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black mb-4 leading-tight">
              Financial Ledger
            </h1>
            <p className="text-lg text-slate-300 leading-relaxed">
              Every Naira is tracked. Every transaction is recorded. Full accountability from donation to impact.
            </p>
            {/* <div className="mt-4 inline-flex items-center px-3 py-1 bg-slate-800 rounded-lg text-xs text-slate-400">
              <span>All figures shown in '000s Naira (1.00 = ₦1,000)</span>
            </div> */}
          </motion.div>
        </div>
      </section>

      {/* Stats Cards */}
      <section className="py-16">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0 }}
              className="bg-white rounded-2xl p-6 shadow-lg border border-slate-100"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-slate-500 font-medium text-sm uppercase tracking-wider">Total Credit</h3>
                <ArrowUpRight className="h-5 w-5 text-emerald-600" />
              </div>
              <div className="text-3xl font-black text-slate-900">
                ₦{(stats.totalCredit * 1000).toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 })}
              </div>
              <p className="text-xs text-slate-400 mt-2">{stats.totalCredit.toLocaleString()} in '000s</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="bg-white rounded-2xl p-6 shadow-lg border border-slate-100"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-slate-500 font-medium text-sm uppercase tracking-wider">Total Debit</h3>
                <ArrowDownRight className="h-5 w-5 text-rose-600" />
              </div>
              <div className="text-3xl font-black text-slate-900">
                ₦{(stats.totalDebit * 1000).toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 })}
              </div>
              <p className="text-xs text-slate-400 mt-2">{stats.totalDebit.toLocaleString()} in '000s</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-gradient-to-br from-emerald-600 to-emerald-700 rounded-2xl p-6 shadow-lg text-white"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-white/80 font-medium text-sm uppercase tracking-wider">Current Balance</h3>
                <Shield className="h-5 w-5 text-white/80" />
              </div>
              <div className="text-3xl font-black">
                ₦{(stats.currentBalance * 1000).toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 })}
              </div>
              <p className="text-emerald-200 text-xs mt-2">{stats.currentBalance.toLocaleString()} in '000s</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Transaction Ledger */}
      <section className="py-16">
        <div className="container-custom">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
            <div>
              <h2 className="text-2xl font-black text-slate-900 mb-2">Transaction Ledger</h2>
              <p className="text-slate-500">
                Complete record of all financial activities • {total} transactions
              </p>
            </div>
            <div className="flex items-center space-x-3 mt-4 sm:mt-0">
              <button
                onClick={handleExportCSV}
                className="flex items-center space-x-2 px-4 py-2 bg-white border border-slate-200 rounded-lg text-sm font-medium text-slate-600 hover:bg-slate-50 transition"
              >
                <Download className="h-4 w-4" />
                <span>Export CSV</span>
              </button>
            </div>
          </div>

          {/* Filter Tabs */}
          <div className="flex space-x-2 mb-6">
            <button
              onClick={() => handleFilterChange('all')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${filterMode === 'all'
                ? 'bg-slate-900 text-white shadow-md'
                : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
                }`}
            >
              All Transactions
            </button>
            <button
              onClick={() => handleFilterChange('credit')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 flex items-center space-x-1 ${filterMode === 'credit'
                ? 'bg-emerald-600 text-white shadow-md'
                : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
                }`}
            >
              <ArrowUpRight className="h-3 w-3" />
              <span>Credits Only</span>
            </button>
            <button
              onClick={() => handleFilterChange('debit')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 flex items-center space-x-1 ${filterMode === 'debit'
                ? 'bg-rose-600 text-white shadow-md'
                : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
                }`}
            >
              <ArrowDownRight className="h-3 w-3" />
              <span>Debits Only</span>
            </button>
          </div>

          <TransactionTable
            transactions={transactions}
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
            loading={loading}
          />

          <div className="mt-6 text-center">
            <p className="text-xs text-slate-400">
              📊 All amounts are displayed in '000s Naira. To get actual Naira value, multiply by 1,000.
              Example: 100.00 = ₦100,000
            </p>
          </div>
        </div>
      </section>

      {/* Donor Privacy Note */}
      <section className="py-16 bg-slate-900 text-white">
        <div className="container-custom text-center">
          <Shield className="h-12 w-12 text-emerald-400 mx-auto mb-4" />
          <h2 className="text-2xl font-black mb-3">Your Privacy Matters</h2>
          <p className="text-slate-300 max-w-2xl mx-auto mb-6">
            Anonymous donors are marked accordingly. Some donors may have protected identities for their safety.
            We respect all privacy choices.
          </p>
          <div className="flex flex-wrap justify-center gap-4 text-sm">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-emerald-500 rounded-full"></div>
              <span>Public Donor</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
              <span>Protected Identity</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-slate-500 rounded-full"></div>
              <span>Anonymous Donor</span>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-sky-600 to-emerald-600">
        <div className="container-custom text-center">
          <h2 className="text-3xl font-black text-white mb-4">
            Support Our Mission Today
          </h2>
          <p className="text-white/90 text-lg mb-8 max-w-2xl mx-auto">
            Join our community of donors who are making a difference. Every contribution counts.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/donate" className="bg-white text-sky-600 px-8 py-3 rounded-xl font-bold hover:bg-slate-100 transition shadow-lg">
              Make a Donation
            </Link>
            <Link to="/contact" className="border-2 border-white text-white px-8 py-3 rounded-xl font-bold hover:bg-white hover:text-sky-600 transition">
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}

export default FinancialTransparency