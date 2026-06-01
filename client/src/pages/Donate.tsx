import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  Heart,
  Banknote,
  Building,
  CreditCard,
  Shield,
  CheckCircle,
  Copy,
  Check
} from 'lucide-react'

const Donate = () => {
  const [copiedAccount, setCopiedAccount] = useState<string | null>(null)
  const [selectedAmount, setSelectedAmount] = useState<number | null>(null)
  const [customAmount, setCustomAmount] = useState('')

  const bankAccounts = [
    {
      bank: 'First Bank of Nigeria',
      accountName: 'Hope for the Hopeless Initiative',
      accountNumber: '2034567890',
      sortCode: '011234567'
    },
    {
      bank: 'GTBank',
      accountName: 'Hope for the Hopeless Initiative',
      accountNumber: '0589123456',
      sortCode: '058123456'
    },
    {
      bank: 'Access Bank',
      accountName: 'Hope for the Hopeless Initiative',
      accountNumber: '0778945612',
      sortCode: '044123456'
    }
  ]

  const donationAmounts = [5000, 10000, 25000, 50000, 100000]

  const handleCopyAccount = (accountNumber: string) => {
    navigator.clipboard.writeText(accountNumber)
    setCopiedAccount(accountNumber)
    setTimeout(() => setCopiedAccount(null), 2000)
  }

  const handleDonateOnline = () => {
    const amount = selectedAmount || parseInt(customAmount)
    if (amount && amount > 0) {
      // This will redirect to payment gateway in future phases
      alert(`Thank you for your ₦${amount.toLocaleString()} donation! Online payment integration coming soon. Please use bank transfer for now.`)
    } else {
      alert('Please select or enter a donation amount')
    }
  }

  const sponsorshipOptions = [
    {
      title: 'Sponsor a Child\'s Education',
      amount: '₦50,000/year',
      description: 'Provide school fees, books, and supplies for one child',
      icon: Heart
    },
    {
      title: 'Feed a Family for a Month',
      amount: '₦25,000/month',
      description: 'Provide nutritious meals for a family of four',
      icon: Heart
    },
    {
      title: 'Youth Program Support',
      amount: '₦100,000',
      description: 'Fund a youth sensitization workshop',
      icon: Heart
    },
    {
      title: 'Medical Assistance',
      amount: 'Any Amount',
      description: 'Help provide healthcare for vulnerable individuals',
      icon: Heart
    }
  ]

  return (
    <div>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-primary-blue to-primary-green text-white py-20">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Support Our Mission</h1>
            <p className="text-lg md:text-xl opacity-90">
              Your generous donation helps us restore hope and transform lives
            </p>
          </motion.div>
        </div>
      </section>

      {/* Why Donate Section */}
      <section className="py-16">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {[
              {
                icon: Shield,
                title: '100% Transparency',
                description: 'We provide detailed reports on how every donation is used'
              },
              {
                icon: Heart,
                title: 'Direct Impact',
                description: 'Your donations go directly to those who need them most'
              },
              {
                icon: CheckCircle,
                title: 'Tax Deductible',
                description: 'All donations are eligible for tax deductions'
              }
            ].map((item, index) => {
              const Icon = item.icon
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="text-center p-6"
                >
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-blue bg-opacity-10 rounded-full mb-4">
                    <Icon className="h-8 w-8 text-primary-blue" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                  <p className="text-secondary-gray">{item.description}</p>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Donation Options */}
      <section className="py-16 bg-gray-50">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Online Donation Form */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="bg-white rounded-xl shadow-lg p-8"
            >
              <h2 className="text-2xl font-bold mb-6">Make a Donation</h2>

              {/* Donation Amounts */}
              <div className="mb-6">
                <label className="block text-sm font-medium mb-3">Select Amount (₦)</label>
                <div className="grid grid-cols-3 gap-3 mb-3">
                  {donationAmounts.map((amount) => (
                    <button
                      key={amount}
                      onClick={() => {
                        setSelectedAmount(amount)
                        setCustomAmount('')
                      }}
                      className={`px-4 py-2 rounded-lg font-semibold transition-all duration-300 ${selectedAmount === amount
                          ? 'bg-primary-blue text-white shadow-lg transform scale-105'
                          : 'bg-gray-100 text-secondary-gray hover:bg-gray-200'
                        }`}
                    >
                      ₦{amount.toLocaleString()}
                    </button>
                  ))}
                </div>
                <input
                  type="number"
                  placeholder="Custom amount (₦)"
                  value={customAmount}
                  onChange={(e) => {
                    setCustomAmount(e.target.value)
                    setSelectedAmount(null)
                  }}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-primary-blue focus:border-primary-blue"
                />
              </div>

              {/* Donor Info (Simplified for MVP) */}
              <div className="space-y-4 mb-6">
                <input
                  type="text"
                  placeholder="Full Name"
                  className="w-full px-4 py-2 border rounded-lg focus:ring-primary-blue focus:border-primary-blue"
                />
                <input
                  type="email"
                  placeholder="Email Address"
                  className="w-full px-4 py-2 border rounded-lg focus:ring-primary-blue focus:border-primary-blue"
                />
                <input
                  type="tel"
                  placeholder="Phone Number"
                  className="w-full px-4 py-2 border rounded-lg focus:ring-primary-blue focus:border-primary-blue"
                />
              </div>

              <button
                onClick={handleDonateOnline}
                className="w-full bg-primary-blue text-white py-3 rounded-lg font-semibold hover:bg-opacity-90 transition-all duration-300 transform hover:scale-105"
              >
                Donate Now
              </button>

              <p className="text-xs text-secondary-gray text-center mt-4">
                Secure donation processing coming soon. For now, please use bank transfer below.
              </p>
            </motion.div>

            {/* Bank Transfer Details */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="bg-white rounded-xl shadow-lg p-8"
            >
              <h2 className="text-2xl font-bold mb-6">Bank Transfer</h2>
              <p className="text-secondary-gray mb-6">
                You can also make a direct transfer to any of our bank accounts:
              </p>

              <div className="space-y-4">
                {bankAccounts.map((account, index) => (
                  <div key={index} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center space-x-2">
                        <Building className="h-5 w-5 text-primary-blue" />
                        <h3 className="font-semibold">{account.bank}</h3>
                      </div>
                      <button
                        onClick={() => handleCopyAccount(account.accountNumber)}
                        className="text-primary-blue hover:text-primary-green transition"
                      >
                        {copiedAccount === account.accountNumber ? (
                          <Check className="h-5 w-5" />
                        ) : (
                          <Copy className="h-5 w-5" />
                        )}
                      </button>
                    </div>
                    <p className="text-sm text-secondary-gray">Account Name: {account.accountName}</p>
                    <p className="text-sm font-mono font-semibold">Account Number: {account.accountNumber}</p>
                    <p className="text-sm text-secondary-gray">Sort Code: {account.sortCode}</p>
                  </div>
                ))}
              </div>

              <div className="mt-6 bg-blue-50 rounded-lg p-4">
                <p className="text-sm text-primary-blue">
                  After making a transfer, please email us at{' '}
                  <a href="mailto:donations@hopeforthehopeless.org" className="font-semibold underline">
                    donations@hopeforthehopeless.org
                  </a>
                  {' '}with your name and payment details so we can acknowledge your donation.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Sponsorship Opportunities */}
      <section className="py-16">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-secondary-dark mb-4">
              Sponsorship Opportunities
            </h2>
            <p className="text-lg text-secondary-gray max-w-2xl mx-auto">
              Make a sustained impact through our sponsorship programs
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {sponsorshipOptions.map((option, index) => {
              const Icon = option.icon
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="bg-white rounded-xl shadow-lg p-6 text-center hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
                >
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-orange bg-opacity-10 rounded-full mb-4">
                    <Icon className="h-8 w-8 text-primary-orange" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">{option.title}</h3>
                  <div className="text-2xl font-bold text-primary-blue mb-2">{option.amount}</div>
                  <p className="text-secondary-gray text-sm mb-4">{option.description}</p>
                  <button className="btn-outline text-sm w-full">
                    Sponsor Now
                  </button>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Other Ways to Give */}
      <section className="py-16 bg-gray-50">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-secondary-dark mb-4">
              Other Ways to Give
            </h2>
            <p className="text-lg text-secondary-gray">
              Your support can take many forms
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: 'Donate Goods',
                description: 'Food items, clothing, educational materials, and medical supplies',
                contact: 'items@hopeforthehopeless.org'
              },
              {
                title: 'Corporate Partnership',
                description: 'Partner with us for employee giving programs and CSR initiatives',
                contact: 'partnerships@hopeforthehopeless.org'
              },
              {
                title: 'Legacy Giving',
                description: 'Include us in your will or estate planning',
                contact: 'legacy@hopeforthehopeless.org'
              }
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white rounded-xl shadow-lg p-6"
              >
                <h3 className="text-xl font-semibold mb-3">{item.title}</h3>
                <p className="text-secondary-gray mb-4">{item.description}</p>
                <a href={`mailto:${item.contact}`} className="text-primary-blue font-semibold hover:underline">
                  {item.contact}
                </a>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Impact CTA */}
      <section className="py-16 bg-primary-green text-white">
        <div className="container-custom text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Every Gift Makes a Difference
          </h2>
          <p className="text-lg mb-8 opacity-90 max-w-2xl mx-auto">
            Your donation, no matter the size, helps us reach more people in need.
          </p>
          <div className="inline-flex items-center space-x-2 bg-white bg-opacity-20 rounded-lg px-6 py-3">
            <Heart className="h-5 w-5" />
            <span className="font-semibold">Thank you for your generosity</span>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Donate