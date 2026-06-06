import { useEffect, useState } from 'react'
import { useLocation, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { CheckCircle, Heart, ArrowRight, Download, Home, Receipt, Share2 } from 'lucide-react'
import toast, { Toaster } from 'react-hot-toast'
import SEOHead from '../components/SEO/SEOHead'

const PaymentSuccess = () => {
  const location = useLocation()
  const [paymentDetails, setPaymentDetails] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Parse URL parameters
    const params = new URLSearchParams(location.search)
    const status = params.get('status')
    const txRef = params.get('tx_ref')
    const transactionId = params.get('transaction_id')

    // Try to get stored data from localStorage
    let storedAmount = localStorage.getItem('lastDonationAmount')
    let storedEmail = localStorage.getItem('lastDonorEmail')
    let storedName = localStorage.getItem('lastDonorName')
    let storedDate = localStorage.getItem('lastDonationDate')

    // If no stored data, try to extract from URL or use defaults
    if (!storedAmount) {
      // Try to extract amount from tx_ref if possible
      const amountMatch = txRef?.match(/HOPE-(\d+)-(\d+)/)
      storedAmount = amountMatch ? amountMatch[2] : 'Unknown'
    }

    if (!storedName) {
      storedName = 'Valued Donor'
    }

    if (!storedEmail) {
      storedEmail = 'Not provided'
    }

    if (status === 'successful' && transactionId) {
      setPaymentDetails({
        status,
        txRef,
        transactionId,
        amount: storedAmount,
        email: storedEmail,
        name: storedName,
        date: storedDate ? new Date(storedDate).toLocaleString() : new Date().toLocaleString()
      })

      toast.success('Payment successful! Thank you for your donation.')

      // Clear stored data after retrieving
      localStorage.removeItem('lastDonationAmount')
      localStorage.removeItem('lastDonorEmail')
      localStorage.removeItem('lastDonorName')
      localStorage.removeItem('lastDonationDate')
    } else {
      // If no transaction ID, redirect to home after a few seconds
      setTimeout(() => {
        window.location.href = '/'
      }, 5000)
    }

    setLoading(false)
  }, [location])

  const handleDownloadReceipt = () => {
    if (!paymentDetails) return

    const receiptHtml = `
      <!DOCTYPE html>
      <html>
      <head>
        <title>Donation Receipt - Hope for the Hopeless Initiative</title>
        <style>
          body { font-family: Arial, sans-serif; padding: 40px; max-width: 800px; margin: 0 auto; }
          .header { text-align: center; border-bottom: 2px solid #0B5ED7; padding-bottom: 20px; margin-bottom: 30px; }
          .logo { font-size: 24px; font-weight: bold; color: #0B5ED7; }
          .title { font-size: 28px; margin: 20px 0; }
          .details { background: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0; }
          .detail-row { display: flex; justify-content: space-between; margin-bottom: 10px; }
          .footer { text-align: center; margin-top: 40px; padding-top: 20px; border-top: 1px solid #ddd; font-size: 12px; color: #666; }
          .thank-you { text-align: center; margin: 30px 0; }
        </style>
      </head>
      <body>
        <div class="header">
          <div class="logo">❤️ Hope for the Hopeless Initiative</div>
          <div class="title">Official Donation Receipt</div>
        </div>
        
        <div class="thank-you">
          <p>Thank you for your generous donation!</p>
          <p>Your support helps us restore hope and transform lives.</p>
        </div>
        
        <div class="details">
          <div class="detail-row">
            <strong>Transaction ID:</strong>
            <span>${paymentDetails.transactionId}</span>
          </div>
          <div class="detail-row">
            <strong>Reference:</strong>
            <span>${paymentDetails.txRef}</span>
          </div>
          <div class="detail-row">
            <strong>Date:</strong>
            <span>${paymentDetails.date}</span>
          </div>
          <div class="detail-row">
            <strong>Donor Name:</strong>
            <span>${paymentDetails.name}</span>
          </div>
          <div class="detail-row">
            <strong>Donor Email:</strong>
            <span>${paymentDetails.email}</span>
          </div>
          <div class="detail-row">
            <strong>Amount:</strong>
            <span><strong>₦${paymentDetails.amount}</strong></span>
          </div>
          <div class="detail-row">
            <strong>Payment Method:</strong>
            <span>Flutterwave (Card/Bank Transfer)</span>
          </div>
          <div class="detail-row">
            <strong>Status:</strong>
            <span style="color: green;">✅ Successful</span>
          </div>
        </div>
        
        <div class="footer">
          <p>Hope for the Hopeless and Orphans Entrepreneurial Initiative</p>
          <p>CAC Registration: [Registration Number]</p>
          <p>This receipt is automatically generated. For tax purposes, please retain this copy.</p>
          <p>Email: donations@hopeforthehopeless.org | Phone: +234 123 456 7890</p>
        </div>
      </body>
      </html>
    `

    const blob = new Blob([receiptHtml], { type: 'text/html' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `donation-receipt-${paymentDetails.transactionId}.html`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)

    toast.success('Receipt downloaded!')
  }

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: 'I just supported Hope for the Hopeless Initiative',
        text: 'Join me in restoring hope and transforming lives!',
        url: window.location.origin
      }).catch(() => {
        toast('Thank you for spreading the word!', { icon: '📢' })
      })
    } else {
      navigator.clipboard.writeText(window.location.origin)
      toast.success('Link copied to clipboard!')
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-blue mx-auto mb-4"></div>
          <p className="text-secondary-gray">Verifying your donation...</p>
        </div>
      </div>
    )
  }

  if (!paymentDetails) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">No Payment Information Found</h1>
          <p className="text-secondary-gray mb-6">We couldn't verify your donation status.</p>
          <Link to="/" className="btn-primary inline-block">
            Return Home
          </Link>
        </div>
      </div>
    )
  }

  return (
    <>
      <SEOHead
        title="Donation Successful - Thank You!"
        description="Your donation to Hope for the Hopeless Initiative was successful. Thank you for your generosity and support."
        keywords="donation success, thank you, charity donation"
        type="website"
        noIndex={true}
      />

      <Toaster position="top-center" />

      <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-blue-50 py-16">
        <div className="container-custom max-w-4xl">
          {/* Success Animation */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 200, damping: 20 }}
            className="text-center mb-8"
          >
            <div className="inline-flex items-center justify-center w-24 h-24 bg-emerald-100 rounded-full mb-4">
              <CheckCircle className="h-12 w-12 text-emerald-600" />
            </div>
          </motion.div>

          {/* Thank You Message */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-center mb-8"
          >
            <h1 className="text-3xl md:text-4xl font-bold text-secondary-dark mb-3">
              Thank You, {paymentDetails.name}!
            </h1>
            <p className="text-lg text-secondary-gray">
              Your generosity helps us restore hope and transform lives.
            </p>
          </motion.div>

          {/* Payment Details Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white rounded-2xl shadow-xl overflow-hidden mb-8"
          >
            <div className="bg-gradient-to-r from-primary-blue to-primary-green px-6 py-4">
              <h2 className="text-white font-semibold flex items-center">
                <Receipt className="h-5 w-5 mr-2" />
                Donation Receipt
              </h2>
            </div>

            <div className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-xs text-secondary-gray uppercase tracking-wide">Transaction ID</p>
                  <p className="text-sm font-mono font-semibold break-all">{paymentDetails.transactionId}</p>
                </div>
                <div>
                  <p className="text-xs text-secondary-gray uppercase tracking-wide">Reference</p>
                  <p className="text-sm font-mono">{paymentDetails.txRef?.slice(-12)}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-xs text-secondary-gray uppercase tracking-wide">Date</p>
                  <p className="text-sm">{paymentDetails.date}</p>
                </div>
                <div>
                  <p className="text-xs text-secondary-gray uppercase tracking-wide">Amount</p>
                  <p className="text-2xl font-bold text-primary-blue">₦{parseInt(paymentDetails.amount).toLocaleString()}</p>
                </div>
              </div>

              <div className="border-t pt-4">
                <p className="text-xs text-secondary-gray uppercase tracking-wide">Donor Information</p>
                <p className="text-sm font-medium">{paymentDetails.name}</p>
                <p className="text-sm text-secondary-gray break-all">{paymentDetails.email}</p>
              </div>
            </div>
          </motion.div>

          {/* Impact Message */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-emerald-50 border border-emerald-200 rounded-xl p-6 mb-8 text-center"
          >
            <Heart className="h-8 w-8 text-emerald-600 mx-auto mb-3" />
            <h3 className="text-lg font-semibold text-emerald-800 mb-2">Your Impact in Action</h3>
            <p className="text-emerald-700">
              Your donation of ₦{parseInt(paymentDetails.amount).toLocaleString()} will directly support vulnerable individuals and families,
              providing food, education, healthcare, and hope to those who need it most.
            </p>
          </motion.div>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <button
              onClick={handleDownloadReceipt}
              className="flex items-center justify-center space-x-2 px-6 py-3 bg-secondary-dark text-white rounded-xl font-semibold hover:bg-opacity-90 transition transform hover:scale-105"
            >
              <Download className="h-5 w-5" />
              <span>Download Receipt</span>
            </button>

            <button
              onClick={handleShare}
              className="flex items-center justify-center space-x-2 px-6 py-3 border-2 border-primary-blue text-primary-blue rounded-xl font-semibold hover:bg-primary-blue hover:text-white transition transform hover:scale-105"
            >
              <Share2 className="h-5 w-5" />
              <span>Share Your Support</span>
            </button>

            <Link
              to="/"
              className="flex items-center justify-center space-x-2 px-6 py-3 bg-primary-orange text-white rounded-xl font-semibold hover:bg-opacity-90 transition transform hover:scale-105"
            >
              <Home className="h-5 w-5" />
              <span>Return Home</span>
            </Link>
          </motion.div>

          {/* Newsletter Signup */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="mt-12 text-center"
          >
            <p className="text-secondary-gray text-sm">
              Want to stay updated on the impact of your donation?
            </p>
            <Link
              to="/news-events"
              className="inline-flex items-center text-primary-blue font-semibold hover:text-primary-green transition mt-2"
            >
              Subscribe to our newsletter
              <ArrowRight className="h-4 w-4 ml-1" />
            </Link>
          </motion.div>
        </div>
      </div>
    </>
  )
}

export default PaymentSuccess