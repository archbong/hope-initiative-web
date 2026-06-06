import { motion } from 'framer-motion'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Mail, Phone, MapPin, Clock, Send, ShieldAlert, ArrowUpRight } from 'lucide-react'
import { FacebookIcon, InstagramIcon, LinkedinIcon, TwitterIcon } from '../components/ui/SocialIcons'
import { useEmail } from '../hooks/useEmail'
import SEOHead from '../components/SEO/SEOHead'
import { SEO_CONFIG } from '../config/seo.config'
import { useToast } from '../hooks/useToast'
import ToastContainer from '../components/ui/ToastContainer'

const contactSchema = z.object({
  name: z.string().min(2, 'Identification requires at least 2 characters.'),
  email: z.email('Provide a valid institutional or personal email address.'),
  phone: z.string().optional(),
  subject: z.string().min(5, 'Context summary must be at least 5 characters.'),
  message: z.string().min(10, 'Inquiry parameters must detail at least 10 characters.'),
})

type ContactForm = z.infer<typeof contactSchema>

const Contact = () => {
  const { success, error, toasts, removeToast } = useToast()
  const { sending, sendContactEmail, resetStatus } = useEmail()
  const { register, handleSubmit, formState: { errors }, reset } = useForm<ContactForm>({
    resolver: zodResolver(contactSchema),
  })

  const onSubmit = async (data: ContactForm) => {
    const result = await sendContactEmail(data)
    if (result) {
      reset()
      success('Message sent successfully! We\'ll get back to you soon.')
      setTimeout(() => resetStatus(), 3000)
    } else {
      error('Failed to send message. Please try again.')
    }
  }

  const contactInfo = [
    {
      icon: Mail,
      title: 'Digital Correspondence',
      details: ['info@hopeforthehopeless.org', 'support@hopeforthehopeless.org'],
      link: 'mailto:info@hopeforthehopeless.org'
    },
    {
      icon: Phone,
      title: 'Voice Telephony Channels',
      details: ['+234 802 905 5394', '+234 809 986 1182', '+234 807 721 8016'],
      link: 'tel:+2348037819432'
    },
    {
      icon: MapPin,
      title: 'Administrative HQ',
      details: ['No. 1 School Road Bue-Kpite Tai, Rivers State', 'No.41 Okparanya Mini-Ewa Rumuobiokani, Port Harcourt, Rivers State'],
      link: 'https://maps.google.com'
    },
    {
      icon: Clock,
      title: 'Operational Windows',
      details: ['Mon - Fri: 9:00 AM - 6:00 PM', 'Saturday: 10:00 AM - 2:00 PM'],
      link: null
    }
  ]

  return (
    <div className="bg-slate-50 min-h-screen font-sans antialiased">
      <SEOHead
        title={SEO_CONFIG.pages.contact.title}
        description={SEO_CONFIG.pages.contact.description}
        keywords={SEO_CONFIG.pages.contact.keywords}
        image={SEO_CONFIG.pages.contact.image}
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
            <span className="inline-flex items-center space-x-1 bg-white/10 text-emerald-400 px-4 py-1.5 rounded-full text-xs font-bold tracking-wide uppercase mb-6 backdrop-blur-sm">
              <Clock className="h-3.5 w-3.5 mr-1" />
              Central Ingestion Routing Active
            </span>
            <h1 className="text-4xl md:text-6xl font-black text-white mb-6 tracking-tight leading-none">
              Connect With Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-300">Operations</span>
            </h1>
            <p className="text-lg text-slate-400 max-w-xl mx-auto leading-relaxed font-normal">
              Establish communication with our regional deployment offices, media relations, or institutional partnership desk.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Vector Grid */}
      <section className="py-12 container-custom -mt-10 relative z-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {contactInfo.map((item, index) => {
            const Icon = item.icon
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                className="bg-white border border-slate-100 p-6 rounded-2xl shadow-md shadow-slate-100/40 flex flex-col justify-between items-start group"
              >
                <div className="w-10 h-10 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center mb-4 group-hover:bg-slate-900 group-hover:text-white transition-colors duration-300">
                  <Icon className="h-5 w-5 text-slate-900 group-hover:text-white transition-colors" />
                </div>
                <div className="w-full">
                  <h3 className="text-xs font-black text-slate-900 tracking-wider uppercase mb-2">{item.title}</h3>
                  {item.details.map((detail, i) => (
                    <p key={i} className="text-xs text-slate-500 font-mono break-all leading-normal">
                      {detail}
                    </p>
                  ))}
                </div>
                {item.link ? (
                  <a
                    href={item.link}
                    className="inline-flex items-center text-[11px] font-bold text-slate-900 hover:text-slate-600 tracking-tight mt-4 border-t border-slate-100 pt-2 w-full justify-between"
                  >
                    <span>Execute Routing</span>
                    <ArrowUpRight className="h-3 w-3" />
                  </a>
                ) : (
                  <div className="h-4 mt-3" />
                )}
              </motion.div>
            )
          })}
        </div>
      </section>

      {/* Primary Ingestion Form & Contextual Information Grid */}
      <section className="py-12 container-custom">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

          {/* Main Inquiry Processing Node */}
          <div className="lg:col-span-7 bg-white border border-slate-100 rounded-3xl shadow-sm overflow-hidden">
            <div className="bg-slate-950 p-6 md:p-8 text-white relative">
              <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5"></div>
              <h2 className="text-xl font-black tracking-tight mb-1">Secure Ingestion Terminal</h2>
              <p className="text-xs text-slate-400 font-normal">All submitted parameters undergo automated sanitization and are logged into internal support pipelines.</p>
            </div>

            <div className="p-6 md:p-8">
              {/* <AnimatePresence mode="popLayout">
                {sending && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="mb-6 p-4 bg-emerald-50 border border-emerald-200 rounded-xl text-emerald-900 flex items-start space-x-3 text-xs font-semibold"
                  >
                    <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
                    <div>
                      <p className="font-bold">Transmission Finalized</p>
                      <p className="text-emerald-700 font-normal mt-0.5">Payload integrated successfully. Relayed parameters are being processed by regional operations.</p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence> */}

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] font-black uppercase tracking-wider text-slate-700 mb-1.5">Your Name *</label>
                    <input
                      {...register('name')}
                      className={`w-full px-4 py-2.5 border ${errors.name ? 'border-rose-200 bg-rose-50/30' : 'border-slate-200 bg-slate-50/50'} focus:bg-white rounded-xl text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-950/10 focus:border-slate-950 transition-all`}
                      placeholder="e.g. Aliyu Bello"
                    />
                    {errors.name && <p className="text-rose-600 text-[10px] font-bold mt-1">{errors.name.message}</p>}
                  </div>

                  <div>
                    <label className="block text-[11px] font-black uppercase tracking-wider text-slate-700 mb-1.5">Email Address *</label>
                    <input
                      type="email"
                      {...register('email')}
                      className={`w-full px-4 py-2.5 border ${errors.email ? 'border-rose-200 bg-rose-50/30' : 'border-slate-200 bg-slate-50/50'} focus:bg-white rounded-xl text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-950/10 focus:border-slate-950 transition-all`}
                      placeholder="aliyu@organization.org"
                    />
                    {errors.email && <p className="text-rose-600 text-[10px] font-bold mt-1">{errors.email.message}</p>}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] font-black uppercase tracking-wider text-slate-700 mb-1.5">Phone Number</label>
                    <input
                      {...register('phone')}
                      className="w-full px-4 py-2.5 border border-slate-200 bg-slate-50/50 focus:bg-white rounded-xl text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-950/10 focus:border-slate-950 transition-all"
                      placeholder="+234 803 123 4567"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-black uppercase tracking-wider text-slate-700 mb-1.5">Subject Matrix *</label>
                    <input
                      {...register('subject')}
                      className={`w-full px-4 py-2.5 border ${errors.subject ? 'border-rose-200 bg-rose-50/30' : 'border-slate-200 bg-slate-50/50'} focus:bg-white rounded-xl text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-950/10 focus:border-slate-950 transition-all`}
                      placeholder="Scope of requested engagement"
                    />
                    {errors.subject && <p className="text-rose-600 text-[10px] font-bold mt-1">{errors.subject.message}</p>}
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-black uppercase tracking-wider text-slate-700 mb-1.5">Inquiry Specifications *</label>
                  <textarea
                    {...register('message')}
                    rows={5}
                    className={`w-full px-4 py-2.5 border ${errors.message ? 'border-rose-200 bg-rose-50/30' : 'border-slate-200 bg-slate-50/50'} focus:bg-white rounded-xl text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-950/10 focus:border-slate-950 transition-all`}
                    placeholder="Provide granular telemetry regarding your inquiry parameters..."
                  ></textarea>
                  {errors.message && <p className="text-rose-600 text-[10px] font-bold mt-1">{errors.message.message}</p>}
                </div>

                <button
                  type="submit"
                  disabled={sending}
                  className="w-full bg-slate-950 text-white hover:bg-slate-900 py-3 rounded-xl font-black text-xs tracking-wider uppercase transition shadow-lg shadow-slate-900/10 flex items-center justify-center space-x-2 disabled:opacity-50"
                >
                  <Send className="h-3.5 w-3.5" />
                  <span>{sending ? 'Sending Message...' : 'Send Message'}</span>
                </button>
              </form>
            </div>
          </div>

          {/* Map Node & Emergency Priority Intercepts */}
          <div className="lg:col-span-5 space-y-6">

            {/* Map Frame */}
            <div className="bg-white border border-slate-100 rounded-3xl overflow-hidden shadow-sm">
              <div className="h-64 bg-slate-100 relative">
                <iframe
                  title="Geographical Office Deployment Coordinates"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3939.98!2d7.3986!3d9.0722!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x104e0baf7dbe5b3d%3A0x3b8b1c8e5f5b5b5b!2sAbuja%2C%20Nigeria!5e0!3m2!1sen!2s!4v1234567890!5m2!1sen!2s"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  className="grayscale contrast-125"
                ></iframe>
              </div>
              <div className="p-4 bg-slate-50 border-t border-slate-100 text-center">
                <p className="text-[11px] font-mono text-slate-600">
                  No. 1 School Road Bue-Kpite Tai, Rivers State
                </p>
                <p className="text-[11px] font-mono text-slate-600">
                  No.41 Okparanya Mini-Ewa Rumuobiokani, Port Harcourt, Rivers State
                </p>
              </div>
            </div>

            {/* Critical Emergency Protocol Interface */}
            <div className="bg-gradient-to-br from-rose-950 to-slate-950 text-white rounded-3xl p-6 shadow-md relative overflow-hidden border border-rose-900/30">
              <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5"></div>
              <div className="relative z-10">
                <div className="inline-flex items-center space-x-1.5 bg-rose-500/10 border border-rose-500/20 text-rose-400 px-3 py-1 rounded-full text-[10px] font-bold tracking-wider uppercase mb-4">
                  <ShieldAlert className="h-3 w-3" />
                  <span>Immediate Response Protocol</span>
                </div>
                <h3 className="text-lg font-black tracking-tight mb-2">Priority Humanitarian Desk</h3>
                <p className="text-xs text-slate-400 font-normal leading-relaxed mb-6">
                  For active field events, disaster mitigation support, or immediate resource distribution intercept requests, bypass standard queues.
                </p>
                <a
                  href="tel:+2348037819432"
                  className="w-full inline-flex items-center justify-center bg-rose-600 hover:bg-rose-500 text-white text-xs font-black tracking-tight py-3 rounded-xl transition shadow-md shadow-rose-950/50"
                >
                  Hotline Intercept: +234 803 781 9432
                </a>
              </div>
            </div>

            {/* Social Matrix Sync */}
            <div className="bg-white border border-slate-100 rounded-3xl p-6 shadow-sm text-center">
              <h3 className="text-sm font-black text-slate-900 tracking-tight mb-1">Ecosystem Broadcast Channels</h3>
              <p className="text-xs text-slate-500 font-normal mb-6">Track verified field data releases and deployment metrics on public indices.</p>
              <div className="flex justify-center space-x-3">
                {[
                  { icon: FacebookIcon, href: 'https://facebook.com', label: 'Facebook Meta Link' },
                  { icon: TwitterIcon, href: 'https://twitter.com', label: 'X Infrastructure Link' },
                  { icon: InstagramIcon, href: 'https://instagram.com', label: 'Instagram Media Pipeline' },
                  { icon: LinkedinIcon, href: 'https://linkedin.com', label: 'LinkedIn Enterprise Hub' }
                ].map((social, idx) => {
                  const SocialIcon = social.icon
                  return (
                    <a
                      key={idx}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={social.label}
                      className="w-9 h-9 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-700 hover:bg-slate-950 hover:text-white hover:border-slate-950 transition-all duration-300"
                    >
                      <SocialIcon className="h-4 w-4" />
                    </a>
                  )
                })}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Structural Knowledge Matrix (FAQ) */}
      <section className="py-20 border-t border-slate-200/60 bg-white">
        <div className="container-custom">
          <div className="text-center max-w-xl mx-auto mb-16">
            <h2 className="text-2xl md:text-3xl font-black text-slate-900 tracking-tight mb-3">
              Knowledge Ingestion Repository
            </h2>
            <p className="text-xs md:text-sm text-slate-500 leading-relaxed font-normal">
              Review pre-classified answers regarding baseline operations prior to launching customized communication logs.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {[
              {
                q: 'What is the processing timeline for a volunteer application?',
                a: 'Applications undergo compliance indexing and identity verification. Expect automated tracking codes and contact parameters within 3 to 5 business intervals.'
              },
              {
                q: 'How are direct financial transfers audited?',
                a: 'All asset distributions generate formal transparent ledger lines. Over 85% of incoming liquid capital directly targets localized program execution models.'
              },
              {
                q: 'What structural entities can execute formal corporate partnerships?',
                a: 'We clear allocations for institutional foundations, CSR divisions, and global development entities looking to anchor local projects.'
              },
              {
                q: 'Are localized donations eligible for regional compliance tax benefits?',
                a: 'Yes, all matching validation certificates are routinely compiled and shared upon systematic clearance of localized bank assets.'
              }
            ].map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                className="bg-slate-50/50 border border-slate-100 rounded-2xl p-6 hover:bg-white hover:border-slate-200 transition-all"
              >
                <h3 className="text-sm font-black text-slate-900 tracking-tight mb-2 flex items-start">
                  <span className="text-emerald-600 mr-2 font-mono">Q.</span>
                  {faq.q}
                </h3>
                <p className="text-xs text-slate-500 leading-relaxed font-normal pl-5">{faq.a}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      <ToastContainer toasts={toasts} onRemove={removeToast} />
    </div>
  )
}

export default Contact