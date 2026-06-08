import { Link } from 'react-router-dom'
import { Heart, Mail, MapPin, ArrowRight, Send, Loader2 } from 'lucide-react'
import { FacebookIcon, LinkedinIcon, InstagramIcon, TwitterIcon } from '../ui/SocialIcons'
import { useState } from 'react'
import { useEmail } from '../../hooks/useEmail'
import ToastContainer from '../ui/ToastContainer'
import { useToast } from '../../hooks/useToast'
import { useTranslation } from 'react-i18next'

const Footer = () => {
  const { t } = useTranslation()
  const currentYear = new Date().getFullYear()
  const [newsletterEmail, setNewsletterEmail] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { sendNewsletterSignup } = useEmail()
  const { toasts, removeToast, success, error, warning } = useToast()

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

    if (!newsletterEmail || !emailRegex.test(newsletterEmail)) {
      warning('Please enter a valid email address')
      return
    }

    setIsSubmitting(true)

    try {
      const result = await sendNewsletterSignup(newsletterEmail)

      if (result) {
        success('🎉 Thank you for subscribing to our newsletter!')
        setNewsletterEmail('')
      } else {
        error('Failed to subscribe. Please try again.')
      }
    } catch (err) {
      error('Something went wrong. Please try again.')
    } finally {
      setIsSubmitting(false)
    }

  }

  const successStories = `${t('nav.successStories')}`
  const financialTransparency = `${t('nav.financialTransparency')}`
  const donate = `${t('nav.donate')}`
  const partners = `${t('nav.partners')}`
  const volunteer = `${t('nav.volunteer')}`

  const footerLinks = {
    organization: [
      { name: 'Our Story', path: '/about' },
      { name: 'Leadership', path: '/about/leadership' },
      { name: 'Impact Report', path: '/media' },
      { name: successStories, path: '/success-stories' },
      { name: financialTransparency, path: '/financial-transparency' }
    ],
    support: [
      { name: volunteer, path: '/volunteer' },
      { name: donate, path: '/donate' },
      { name: partners, path: '/partners' },
      { name: 'Contact Support', path: '/contact' },
    ]
  }

  return (
    <footer className="bg-slate-950 text-slate-200 border-t border-white/5">
      <ToastContainer toasts={toasts} onRemove={removeToast} />
      <div className="max-w-7xl mx-auto px-4 pt-16 pb-8 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-12">

          {/* Brand Column */}
          <div className="lg:col-span-4 space-y-6">
            <Link to="/" className="flex items-center space-x-2 group">
              <img
                src="/footer-logo.png"
                alt="Hope for the Hopeless Initiative"
                className="h-10 w-auto hidden sm:block"
                onError={(e) => {
                  (e.target as HTMLImageElement).style.display = 'none'
                }}
              />
              <span className="font-bold text-xl tracking-tight text-white">
                {t('about.hopeInitiative')}
              </span>
              {/* Fallback text logo */}
              <div className="sm:hidden flex items-center space-x-2">
                <div className="bg-orange-600 p-1.5 rounded-lg group-hover:rotate-12 transition-transform">
                  <Heart className="h-6 w-6 text-white fill-white" />
                </div>
                <span className="font-bold text-xl tracking-tight text-white">
                  {t('about.hopeInitiative')}
                </span>
              </div>
            </Link>
            <p className="text-slate-400 text-sm leading-relaxed max-w-sm">
              {t('about.dedicatedTo')}
            </p>
            <div className="flex items-center space-x-3">
              {[
                { Icon: FacebookIcon, label: 'Facebook' },
                { Icon: TwitterIcon, label: 'Twitter' },
                { Icon: InstagramIcon, label: 'Instagram' },
                { Icon: LinkedinIcon, label: 'LinkedIn' }
              ].map((social, i) => (
                <a
                  key={i}
                  href="#"
                  className="p-2.5 rounded-full bg-white/5 hover:bg-orange-600 hover:text-white transition-all duration-300"
                  aria-label={social.label}
                >
                  <social.Icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Navigation Links */}
          <div className="lg:col-span-4 grid grid-cols-2 gap-8">
            <div>
              <h4 className="text-white font-bold text-sm uppercase tracking-widest mb-6">Organization</h4>
              <ul className="space-y-4">
                {footerLinks.organization.map((link) => (
                  <li key={link.name}>
                    <Link to={link.path} className="text-slate-400 hover:text-orange-500 text-sm flex items-center group transition-colors">
                      <ArrowRight className="h-3 w-3 mr-2 opacity-0 -ml-5 group-hover:opacity-100 group-hover:ml-0 transition-all" />
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="text-white font-bold text-sm uppercase tracking-widest mb-6">Get Involved</h4>
              <ul className="space-y-4">
                {footerLinks.support.map((link) => (
                  <li key={link.name}>
                    <Link to={link.path} className="text-slate-400 hover:text-orange-500 text-sm flex items-center group transition-colors">
                      <ArrowRight className="h-3 w-3 mr-2 opacity-0 -ml-5 group-hover:opacity-100 group-hover:ml-0 transition-all" />
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Newsletter/Contact Column */}
          <div className="lg:col-span-4 space-y-8">
            <div>
              <h4 className="text-white font-bold text-sm uppercase tracking-widest mb-6">Stay Updated</h4>
              <form onSubmit={handleNewsletterSubmit} className="space-y-2">
                <div className="relative">
                  <input
                    type="email"
                    value={newsletterEmail}
                    onChange={(e) => setNewsletterEmail(e.target.value)}
                    placeholder="Enter your email"
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-orange-600 transition-colors"
                  />
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="absolute right-2 top-2 p-1.5 bg-orange-600 rounded-lg hover:bg-orange-700 transition-colors">
                    {isSubmitting ? (
                      <Loader2 className="h-4 w-4 text-white animate-spin" />
                    ) : (
                      <Send className="h-4 w-4 text-white" />
                    )}
                  </button>
                </div>
              </form>
            </div>
            <div className="space-y-3">
              <div className="flex items-start space-x-3 text-sm text-slate-400">
                <MapPin className="h-5 w-5 text-orange-600 shrink-0" />
                <span> No. 1 School Road Bue-Kpite Tai, Rivers State <br /> No.41 Okparanya Mini-Ewa Rumuobiokani, Port Harcourt, Rivers State</span>
              </div>
              <div className="flex items-center space-x-3 text-sm text-slate-400">
                <Mail className="h-5 w-5 text-orange-600 shrink-0" />
                <span>hello@hopeinitiative.org</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-medium text-slate-500 uppercase tracking-widest">
          <p>&copy; {currentYear} {t('about.hopeFor')}</p>
          <div className="flex space-x-6">
            <Link to="/privacy" className="hover:text-white transition-colors">{t('footer.privacyPolicy')}</Link>
            <Link to="/terms" className="hover:text-white transition-colors">{t('footer.termsOfService')}</Link>
            <Link to="/cookies" className="hover:text-white transition-colors">{t('footer.cookiePolicy')}</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer