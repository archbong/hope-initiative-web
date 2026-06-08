import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Heart, Building, Copy, Check, Shield, Target, Users, GraduationCap, CheckCircle, Wallet, Mail, AlertCircle, ArrowUpRight } from 'lucide-react'
import { useDonation } from '../hooks/useDonation'
import { usePayment } from '../hooks/usePayment'
import toast, { Toaster } from 'react-hot-toast'
import SEOHead from '../components/SEO/SEOHead'
import { SEO_CONFIG } from '../config/seo.config'
import { useTranslation } from 'react-i18next'

const Donate = () => {
  const { t } = useTranslation()
  const [copiedAccount, setCopiedAccount] = useState<string | null>(null)
  const [selectedAmount, setSelectedAmount] = useState<number | null>(5000)
  const [customAmount, setCustomAmount] = useState('')
  const [donorName, setDonorName] = useState('')
  const [donorEmail, setDonorEmail] = useState('')
  const [donorPhone, setDonorPhone] = useState('')
  const [paymentStatus, setPaymentStatus] = useState<'idle' | 'processing' | 'success' | 'failed' | 'cancelled'>('idle')
  const [isAnonymous] = useState(false)

  const {
    bankAccounts,
    sponsorshipTiers,
    loading,
    error,
    fetchBankAccounts,
    fetchSponsorshipTiers,
    processDonation,
  } = useDonation()

  const { processing, initiatePayment } = usePayment()
  useEffect(() => {
    fetchBankAccounts()
    fetchSponsorshipTiers()
  }, [fetchBankAccounts, fetchSponsorshipTiers])

  const donationAmounts = [5000, 10000, 25000, 50000, 100000]

  const handleCopyAccount = (accountNumber: string) => {
    navigator.clipboard.writeText(accountNumber)
    setCopiedAccount(accountNumber)
    setTimeout(() => setCopiedAccount(null), 2000)
  }

  const handleCardPayment = async (e: React.FormEvent) => {
    e.preventDefault()

    let amount = selectedAmount
    if (customAmount && parseFloat(customAmount) > 0) {
      amount = parseFloat(customAmount)
    }

    if (!amount || amount <= 0 || !donorName || !donorEmail) {
      toast.error('Please configure all explicit parameters before authorizing submission.');
      return;
    }

    // Store donation data for the success page
    localStorage.setItem('lastDonationAmount', amount.toString())
    localStorage.setItem('lastDonorEmail', donorEmail)
    localStorage.setItem('lastDonorName', donorName)

    setPaymentStatus('processing')

    const response = await initiatePayment({
      amount: amount,
      email: donorEmail,
      name: donorName,
      phone: donorPhone,
      purpose: `Donation of ₦${amount.toLocaleString()} to Hope for the Hopeless Initiative`,
    });

    if (response.status === 'success') {
      setPaymentStatus('success')
      toast.success(response.message)

      await processDonation({
        amount: amount,
        donorName: donorName,
        donorEmail: donorEmail,
        donorPhone: donorPhone,
        paymentMethod: 'card', // Match strict type framework literal assignment
        transactionId: response.transactionId || `FLW-${Date.now()}`,
        isAnonymous: isAnonymous
      });

    } else if (response.status === 'failed') {
      setPaymentStatus('failed')
      toast.error(response.message)
      localStorage.removeItem('lastDonationAmount')
      localStorage.removeItem('lastDonorEmail')
      localStorage.removeItem('lastDonorName')
      localStorage.removeItem('lastDonationDate')
      setTimeout(() => setPaymentStatus('idle'), 3000)
    } else if (response.status === 'cancelled') {
      setPaymentStatus('idle')
      toast('Payment was cancelled', { icon: '⚠️' })
      localStorage.removeItem('lastDonationAmount')
      localStorage.removeItem('lastDonorEmail')
      localStorage.removeItem('lastDonorName')
    }
  }

  if (loading && bankAccounts.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-blue mx-auto mb-4"></div>
          <p className="text-secondary-gray">{t('common.loading')} donation information...</p>
        </div>
      </div>
    )
  };

  return (
    <div className="bg-slate-50 min-h-screen font-sans antialiased">
      <Toaster position="top-center" />
      <SEOHead
        title={SEO_CONFIG.pages.donate.title}
        description={SEO_CONFIG.pages.donate.description}
        keywords={SEO_CONFIG.pages.donate.keywords}
        image={SEO_CONFIG.pages.donate.image}
        type="website"
      />

      {/* Hero Header Frame */}
      <section className="relative bg-slate-950 py-24 overflow-hidden rounded-b-[2.5rem] lg:rounded-b-[4rem]">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5"></div>
        <div className="container-custom relative z-10 text-center max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center space-x-2 bg-white/10 text-emerald-400 px-4 py-1.5 rounded-full text-xs font-bold tracking-wide uppercase mb-6 backdrop-blur-sm">
              <Shield className="h-3.5 w-3.5" />
              <span>Verified Direct-to-Impact Channel</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-black text-white mb-6 tracking-tight leading-none">
              Empower Real <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-300">Transformation</span>
            </h1>
            <p className="text-lg text-slate-400 max-w-xl mx-auto leading-relaxed font-normal">
              Your financial deployment funds sustainable regional programs, immediate relief initiatives, and structural healthcare allocations.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Core Integrity Vectors */}
      <section className="py-12 container-custom -mt-8 relative z-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { icon: Shield, title: '100% Transparency', desc: 'Fully audited programmatic reporting patterns ensure complete visibility over all financial pipelines.' },
            { icon: Heart, title: 'Direct Execution', desc: 'Capital distributions skip bureaucratic overhead, landing exactly where vital project workflows occur.' },
            { icon: CheckCircle, title: 'Tax Deductible', desc: 'All incoming institutional contributions are accompanied by verifiable compliance documentation.' }
          ].map((item, idx) => {
            const Icon = item.icon
            return (
              <div key={idx} className="bg-white border border-slate-100 rounded-2xl p-6 shadow-md shadow-slate-100/50 flex items-start space-x-4">
                <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center shrink-0">
                  <Icon className="h-5 w-5 text-slate-900" />
                </div>
                <div>
                  <h3 className="text-sm font-black text-slate-900 tracking-tight mb-1">{item.title}</h3>
                  <p className="text-xs text-slate-500 leading-relaxed font-normal">{item.desc}</p>
                </div>
              </div>
            )
          })}
        </div>
      </section>

      {/* Contribution Gateways */}
      <section className="py-12 container-custom">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

          {/* Online Pipeline Interface */}
          <div className="lg:col-span-7 bg-white border border-slate-100 rounded-3xl shadow-sm overflow-hidden">
            <div className="bg-slate-950 p-6 md:p-8 text-white relative">
              <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5"></div>
              <h2 className="text-xl font-black tracking-tight mb-1 flex items-center">
                <Wallet className="h-5 w-5 mr-2 text-emerald-400" />
                Every Gift Brings Hope
              </h2>
              <p className="text-xs text-slate-400 font-normal">Your generosity puts food on tables, children in school, and hope in hearts.</p>
            </div>

            <form onSubmit={handleCardPayment} className="p-6 md:p-8 space-y-6">
              <div>
                <label className="block text-xs font-black uppercase tracking-wider text-slate-700 mb-3">
                  Select Contribution Matrix (₦)
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 mb-3">
                  {donationAmounts.map((amount) => (
                    <button
                      type="button"
                      key={amount}
                      onClick={() => {
                        setSelectedAmount(amount)
                        setCustomAmount('')
                      }}
                      className={`py-2.5 rounded-xl text-xs font-black tracking-tight transition-all ${selectedAmount === amount
                        ? 'bg-slate-950 text-white shadow-md shadow-slate-900/10 scale-[1.02]'
                        : 'bg-slate-50 text-slate-600 border border-slate-100 hover:bg-slate-100'
                        }`}
                    >
                      ₦{amount.toLocaleString()}
                    </button>
                  ))}
                </div>

                <div className="relative mt-2">
                  <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
                    <span className="text-sm font-bold text-slate-400">₦</span>
                  </div>
                  <input
                    type="number"
                    placeholder="Enter explicit custom value..."
                    value={customAmount}
                    onChange={(e) => {
                      setCustomAmount(e.target.value)
                      setSelectedAmount(null)
                    }}
                    className="w-full pl-8 pr-4 py-3 border border-slate-200 bg-slate-50/50 focus:bg-white rounded-xl text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-950/10 focus:border-slate-950 transition-all"
                  />
                </div>
              </div>

              <div className="space-y-4 pt-2 border-t border-slate-100">
                <label className="block text-xs font-black uppercase tracking-wider text-slate-700">
                  Donor Profiling Parameters
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <input
                    type="text"
                    required
                    placeholder="Legal Full Name"
                    value={donorName}
                    onChange={(e) => setDonorName(e.target.value)}
                    className="w-full px-4 py-3 border border-slate-200 bg-slate-50/50 focus:bg-white rounded-xl text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-950/10 focus:border-slate-950 transition-all"
                  />
                  <input
                    type="email"
                    required
                    placeholder="Secure Email Address"
                    value={donorEmail}
                    onChange={(e) => setDonorEmail(e.target.value)}
                    className="w-full px-4 py-3 border border-slate-200 bg-slate-50/50 focus:bg-white rounded-xl text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-950/10 focus:border-slate-950 transition-all"
                  />
                </div>
                <input
                  type="tel"
                  placeholder="Mobile Link Line (Optional)"
                  value={donorPhone}
                  onChange={(e) => setDonorPhone(e.target.value)}
                  className="w-full px-4 py-3 border border-slate-200 bg-slate-50/50 focus:bg-white rounded-xl text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-950/10 focus:border-slate-950 transition-all"
                />
              </div>

              <button
                type="submit"
                disabled={processing || paymentStatus === 'processing'}
                className={`w-full py-3.5 rounded-xl font-black text-sm tracking-tight transition shadow-lg flex items-center justify-center space-x-2 ${processing || paymentStatus === 'processing'
                  ? 'bg-slate-600 cursor-not-allowed'
                  : 'bg-slate-950 hover:bg-slate-900 text-white shadow-slate-900/10'
                  }`}
              >
                {processing || paymentStatus === 'processing' ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                    <span>Processing donation...</span>
                  </>
                ) : (
                  <>
                    <span>Impact a Life</span>
                    <ArrowUpRight className="h-4 w-4" />
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Payment Status Banner */}
          {paymentStatus === 'success' && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-4 p-3 bg-emerald-50 border border-emerald-200 rounded-xl flex items-center space-x-2"
            >
              <CheckCircle className="h-4 w-4 text-emerald-600" />
              <p className="text-xs text-emerald-800 font-medium">
                Transaction completed successfully! A receipt has been sent to your email.
              </p>
            </motion.div>
          )}

          {paymentStatus === 'failed' && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-4 p-3 bg-rose-50 border border-rose-200 rounded-xl flex items-center space-x-2"
            >
              <AlertCircle className="h-4 w-4 text-rose-600" />
              <p className="text-xs text-rose-800 font-medium">
                Transaction failed. Please try again or use bank transfer.
              </p>
            </motion.div>
          )}

          {/* Secure Wire Transfer System */}
          <div className="lg:col-span-5 bg-white border border-slate-100 rounded-3xl p-6 md:p-8 shadow-sm">
            <h2 className="text-xl font-black tracking-tight text-slate-900 mb-2">Direct Settlement Routing</h2>
            <p className="text-xs text-slate-500 font-normal mb-6">
              Deploy capital directly via your preferred institutional banking infrastructure.
            </p>

            <AnimatePresence mode="popLayout">
              {error && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="mb-4 p-4 bg-rose-50 border border-rose-200 rounded-xl text-rose-800 flex items-start space-x-2 text-xs font-semibold"
                >
                  <AlertCircle className="h-4 w-4 text-rose-600 shrink-0 mt-0.5" />
                  <span>{error}</span>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="space-y-4">
              {loading && bankAccounts.length === 0 ? (
                Array.from({ length: 2 }).map((_, i) => (
                  <div key={i} className="border border-slate-100 rounded-2xl p-4 space-y-2 animate-pulse bg-slate-50/50">
                    <div className="h-4 bg-slate-200 rounded w-1/3"></div>
                    <div className="h-3 bg-slate-200 rounded w-1/2"></div>
                    <div className="h-3 bg-slate-200 rounded w-2/3"></div>
                  </div>
                ))
              ) : (
                bankAccounts.map((account, index) => (
                  <div key={index} className="border border-slate-100 bg-slate-50/50 rounded-2xl p-4 relative group hover:bg-white hover:border-slate-200 transition-all">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center space-x-2">
                        <Building className="h-4 w-4 text-slate-400" />
                        <h3 className="font-black text-sm text-slate-900 tracking-tight">{account.bank}</h3>
                      </div>
                      <button
                        type="button"
                        onClick={() => handleCopyAccount(account.accountNumber)}
                        className="p-1.5 rounded-lg bg-white border border-slate-100 text-slate-600 hover:text-slate-900 shadow-sm transition"
                        title="Copy Account Number"
                      >
                        {copiedAccount === account.accountNumber ? (
                          <Check className="h-3.5 w-3.5 text-emerald-600" />
                        ) : (
                          <Copy className="h-3.5 w-3.5" />
                        )}
                      </button>
                    </div>
                    <div className="space-y-0.5 text-xs text-slate-500 font-medium">
                      <p><span className="text-slate-400">Account Name:</span> {account.accountName}</p>
                      <p className="font-mono text-slate-900 font-bold py-0.5">Account No: {account.accountNumber}</p>
                      <p className="font-mono text-slate-900 font-bold py-0.5">Currency: {account.currency}</p>
                      <p><span className="text-slate-400">Sort Code:</span> {account.sortCode}</p>
                      {/* <p><span className="text-slate-400">SWIFT Address:</span> {account.swiftAddress}</p>
                      <p><span className="text-slate-400">Zenith Bank SWIFT:</span> {account.zenithBankSwift}</p> */}
                    </div>
                  </div>
                ))
              )}
            </div>

            <div className="mt-6 bg-slate-950 rounded-2xl p-4 text-white relative overflow-hidden">
              <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5"></div>
              <div className="relative z-10 flex items-start space-x-3">
                <Mail className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" />
                <p className="text-xs leading-relaxed text-slate-300 font-normal">
                  Following wire completion, transmit verification details to{' '}
                  <a href="mailto:donations@hopeforthehopeless.org" className="font-bold text-white underline hover:text-emerald-300 transition">
                    donations@hopeforthehopeless.org
                  </a>{' '}
                  for systematic tax logging.
                </p>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Structured Sponsorship Portfolios */}
      {sponsorshipTiers.length > 0 && (
        <section className="py-16 bg-slate-900 text-white rounded-t-[2.5rem] lg:rounded-t-[4rem]">
          <div className="container-custom">
            <div className="max-w-xl mb-12">
              <div className="text-xs font-bold text-emerald-400 uppercase tracking-widest mb-2">Sustained Commitments</div>
              <h2 className="text-3xl font-black tracking-tight mb-2">Sponsorship Portfolios</h2>
              <p className="text-sm text-slate-400">Drive localized macro-level outcomes through structural institutional architecture sponsorship.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {sponsorshipTiers.map((tier, index) => {
                let Icon = Heart
                if (tier.icon === 'GraduationCap') Icon = GraduationCap
                if (tier.icon === 'Users') Icon = Users
                if (tier.icon === 'Target') Icon = Target

                return (
                  <motion.div
                    key={tier.id}
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.05 }}
                    className="bg-white/5 border border-white/10 rounded-3xl p-6 flex flex-col justify-between hover:bg-white/10 hover:border-white/20 transition-all group"
                  >
                    <div>
                      <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center mb-4 text-emerald-400 group-hover:scale-105 transition-transform">
                        <Icon className="h-5 w-5" />
                      </div>
                      <h3 className="text-base font-black tracking-tight mb-1">{tier.title}</h3>
                      <div className="text-xl font-bold text-emerald-400 mb-3">{tier.amount}</div>
                      <p className="text-xs text-slate-400 leading-relaxed font-normal mb-6">{tier.description}</p>
                    </div>
                    <button className="w-full py-2.5 rounded-xl border border-white/20 hover:border-white text-xs font-black tracking-tight bg-transparent hover:bg-white hover:text-slate-950 transition-all">
                      Initiate Portfolio
                    </button>
                  </motion.div>
                )
              })}
            </div>
          </div>
        </section>
      )}

      {/* Alternative Contribution Channels */}
      <section className="py-20 bg-slate-50 border-t border-slate-200/60">
        <div className="container-custom">
          <div className="max-w-xl mb-12">
            <h2 className="text-2xl font-black text-slate-900 tracking-tight mb-2">Alternative Support Vectors</h2>
            <p className="text-xs text-slate-500 font-normal">Our developmental initiatives accept non-liquid physical supplies and legacy arrangements.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { title: 'Material Supply Logistics', desc: 'Consolidated physical assets including medical instrumentation, raw nutritional aggregates, and scholastic items.', contact: 'items@hopeforthehopeless.org' },
              { title: 'Corporate Alignment Programs', desc: 'Integrate corporate social responsibility operations, joint matching strategies, or foundation grants.', contact: 'partnerships@hopeforthehopeless.org' },
              { title: 'Legacy Estate Planning', desc: 'Secure long-horizon systemic durability by designating programmatic capital distributions within formal wills.', contact: 'legacy@hopeforthehopeless.org' }
            ].map((item, index) => (
              <div key={index} className="bg-white border border-slate-100 rounded-2xl p-6 shadow-sm flex flex-col justify-between">
                <div>
                  <h3 className="font-black text-sm text-slate-900 tracking-tight mb-2">{item.title}</h3>
                  <p className="text-xs text-slate-500 leading-relaxed font-normal mb-4">{item.desc}</p>
                </div>
                <a
                  href={`mailto:${item.contact}`}
                  className="inline-flex items-center text-xs font-bold text-slate-950 hover:text-slate-700 transition space-x-1 border-t border-slate-100 pt-3"
                >
                  <span>{item.contact}</span>
                  <ArrowUpRight className="h-3 w-3" />
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* High-Impact Acknowledgement CTA */}
      <section className="bg-slate-950 py-16 text-center text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5"></div>
        <div className="container-custom relative z-10 max-w-xl">
          <div className="w-12 h-12 rounded-full bg-emerald-500/10 text-emerald-400 flex items-center justify-center mx-auto mb-4">
            <Heart className="h-6 w-6 fill-current" />
          </div>
          <h2 className="text-2xl md:text-3xl font-black tracking-tight mb-3">Every Action Reshapes a Future</h2>
          <p className="text-xs md:text-sm text-slate-400 max-w-md mx-auto leading-relaxed font-normal mb-0">
            We hold deep institutional appreciation for your ongoing programmatic alignment and collaborative generosity.
          </p>
        </div>
      </section>
    </div>
  )
}

export default Donate