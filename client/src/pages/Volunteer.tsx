import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { motion, AnimatePresence } from 'framer-motion'
import { Heart, Clock, Users, Award, Loader2, ShieldCheck, Mail, Phone, User, MessageSquare, Calendar } from 'lucide-react'
import { useVolunteer } from '../hooks/useVolunteer'
import SEOHead from '../components/SEO/SEOHead'
import { SEO_CONFIG } from '../config/seo.config'
import { useEmail } from '../hooks/useEmail'
import { useToast } from '../hooks/useToast'
import ToastContainer from '../components/ui/ToastContainer'

const volunteerSchema = z.object({
  fullName: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.email('Invalid email address'),
  phone: z.string().min(10, 'Valid phone number required'),
  interests: z.array(z.string()).min(1, 'Select at least one interest'),
  availability: z.string().min(1, 'Please select availability'),
  message: z.string().optional(),
})

type VolunteerForm = z.infer<typeof volunteerSchema>

const Volunteer = () => {
  const { success, error, toasts, removeToast } = useToast()
  const { sending: emailSending, sendVolunteerEmail } = useEmail()
  const { submitting, getOpportunities, resetStatus } = useVolunteer()
  const [opportunities, setOpportunities] = useState<any[]>([])
  const [oppsLoading, setOppsLoading] = useState(true)

  const { register, handleSubmit, formState: { errors }, reset } = useForm<VolunteerForm>({
    resolver: zodResolver(volunteerSchema),
    defaultValues: {
      interests: [],
      availability: ''
    }
  })

  useEffect(() => {
    const loadOpportunities = async () => {
      try {
        setOppsLoading(true)
        const opps = await getOpportunities()
        setOpportunities(opps || [])
      } catch (err) {
        console.error("Failed loading roles", err)
      } finally {
        setOppsLoading(false)
      }
    }
    loadOpportunities()
  }, [getOpportunities])

  const onSubmit = async (data: VolunteerForm) => {
    const result = await sendVolunteerEmail(data)
    if (result) {
      reset()
      success('Application submitted successfully! We will contact you soon.')
      setTimeout(() => {
        resetStatus()
      }, 5000)
    } else {
      error('Failed to submit application. Please try again.')
    }
  }

  const interestOptions = [
    'Youth Mentoring',
    'Food Distribution',
    'Counseling Support',
    'Event Organization',
    'Fundraising',
    'Administrative Support',
  ]

  return (
    <div className="bg-slate-50 min-h-screen">
      <SEOHead
        title={SEO_CONFIG.pages.volunteer.title}
        description={SEO_CONFIG.pages.volunteer.description}
        keywords={SEO_CONFIG.pages.volunteer.keywords}
        image={SEO_CONFIG.pages.volunteer.image}
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
            <div className="inline-flex items-center space-x-2 bg-white/10 text-orange-400 px-4 py-1.5 rounded-full text-xs font-bold tracking-wide uppercase mb-6 backdrop-blur-sm">
              <Heart className="h-3.5 w-3.5 fill-current" />
              <span>Humanitarian Deployment Network</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-black text-white mb-6 tracking-tight leading-none">
              Join the <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-amber-300">Changemakers</span>
            </h1>
            <p className="text-lg text-slate-400 max-w-2xl mx-auto leading-relaxed font-normal">
              Your domain expertise and structural support time can directly optimize high-impact programs for vulnerable cohorts.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Benefits Metrics Section */}
      <section className="py-20 container-custom">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { icon: Heart, title: 'Measurable Impact', desc: 'Directly accelerate program velocity and maximize localized field support actions.' },
            { icon: Users, title: 'Strategic Integration', desc: 'Work directly alongside verified specialized subject practitioners inside agile cohorts.' },
            { icon: Award, title: 'Verified Leadership', desc: 'Accumulate formal hours validation records and deep community management credentials.' },
          ].map((benefit, index) => {
            const Icon = benefit.icon
            return (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                key={index}
                className="bg-white border border-slate-100 rounded-3xl p-8 shadow-sm hover:shadow-xl hover:border-slate-200/60 transition-all group"
              >
                <div className="w-12 h-12 rounded-2xl bg-slate-50 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Icon className="h-6 w-6 text-slate-900" />
                </div>
                <h3 className="text-lg font-black text-slate-900 mb-2 tracking-tight">{benefit.title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed font-normal">{benefit.desc}</p>
              </motion.div>
            )
          })}
        </div>
      </section>

      {/* Dynamic Placement Channels / Opportunities System */}
      <AnimatePresence mode="popLayout">
        {(oppsLoading || opportunities.length > 0) && (
          <section className="pb-20 container-custom">
            <div className="bg-white border border-slate-100 rounded-3xl p-8 md:p-12 shadow-sm">
              <div className="max-w-xl mb-10">
                <h2 className="text-2xl font-black text-slate-900 tracking-tight mb-2">Active Field Openings</h2>
                <p className="text-slate-500 text-sm font-normal">Apply specifically to any of our globally audited strategic workflows below.</p>
              </div>

              {oppsLoading ? (
                <div className="flex flex-col items-center justify-center py-12">
                  <Loader2 className="h-8 w-8 text-slate-800 animate-spin mb-3" />
                  <p className="text-xs text-slate-400 font-bold tracking-wider uppercase">Polling Opportunity Registries...</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {opportunities.map((opp, idx) => (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.98 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: idx * 0.05 }}
                      key={opp.id || idx}
                      className="bg-slate-50 border border-slate-100 rounded-2xl p-6 relative overflow-hidden flex flex-col justify-between group hover:border-orange-200 hover:bg-white transition-all"
                    >
                      <div className="absolute top-0 left-0 w-1.5 h-full bg-slate-950 group-hover:bg-orange-500 transition-colors" />
                      <div>
                        <h3 className="font-black text-base text-slate-900 mb-2 tracking-tight leading-snug">{opp.title}</h3>
                        <p className="text-slate-500 text-xs leading-relaxed font-normal mb-6 line-clamp-3">{opp.description}</p>
                      </div>
                      <div className="space-y-2 pt-4 border-t border-slate-200/50">
                        <div className="flex items-center text-xs font-bold text-slate-600">
                          <Clock className="h-3.5 w-3.5 mr-2 text-slate-400" />
                          <span>{opp.commitment}</span>
                        </div>
                        <div className="flex items-center text-xs font-bold text-slate-600">
                          <Users className="h-3.5 w-3.5 mr-2 text-slate-400" />
                          <span className="text-orange-600">{opp.slots} slots unfilled</span>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>
          </section>
        )}
      </AnimatePresence>

      {/* Main Framework Processing Core Form Container */}
      <section className="pb-24 container-custom">
        <div className="max-w-3xl mx-auto bg-white border border-slate-100 rounded-3xl shadow-xl shadow-slate-100 overflow-hidden">
          <div className="bg-slate-950 px-8 py-10 text-white relative">
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5"></div>
            <h2 className="text-2xl font-black tracking-tight mb-2">Apply to Volunteer</h2>
            <p className="text-slate-400 text-xs font-normal">Join the fight of a greater future for the next generation, build and support the future.</p>
          </div>

          <div className="p-8 md:p-10">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              {/* Field Block - Full Name */}
              <div>
                <label className="block text-xs font-black uppercase tracking-wider text-slate-700 mb-2 flex items-center">
                  <User className="h-3.5 w-3.5 mr-1.5 text-slate-400" />
                  Full Name *
                </label>
                <input
                  {...register('fullName')}
                  type="text"
                  className={`w-full px-4 py-3 border rounded-xl text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-950/10 transition-all ${errors.fullName ? 'border-rose-400 bg-rose-50/10 focus:border-rose-500' : 'border-slate-200 bg-slate-50/50 focus:bg-white focus:border-slate-950'
                    }`}
                  placeholder="John Doe"
                  disabled={submitting}
                />
                {errors.fullName && <p className="text-rose-500 text-xs font-semibold mt-1.5">{errors.fullName.message}</p>}
              </div>

              {/* Grid System - Communications Data */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-black uppercase tracking-wider text-slate-700 mb-2 flex items-center">
                    <Mail className="h-3.5 w-3.5 mr-1.5 text-slate-400" />
                    Email Address *
                  </label>
                  <input
                    type="email"
                    {...register('email')}
                    className={`w-full px-4 py-3 border rounded-xl text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-950/10 transition-all ${errors.email ? 'border-rose-400 bg-rose-50/10 focus:border-rose-500' : 'border-slate-200 bg-slate-50/50 focus:bg-white focus:border-slate-950'
                      }`}
                    placeholder="john@example.com"
                    disabled={submitting}
                  />
                  {errors.email && <p className="text-rose-500 text-xs font-semibold mt-1.5">{errors.email.message}</p>}
                </div>

                <div>
                  <label className="block text-xs font-black uppercase tracking-wider text-slate-700 mb-2 flex items-center">
                    <Phone className="h-3.5 w-3.5 mr-1.5 text-slate-400" />
                    Secure Mobile Line *
                  </label>
                  <input
                    type="tel"
                    {...register('phone')}
                    className={`w-full px-4 py-3 border rounded-xl text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-950/10 transition-all ${errors.phone ? 'border-rose-400 bg-rose-50/10 focus:border-rose-500' : 'border-slate-200 bg-slate-50/50 focus:bg-white focus:border-slate-950'
                      }`}
                    placeholder="+234 123 456 7890"
                    disabled={submitting}
                  />
                  {errors.phone && <p className="text-rose-500 text-xs font-semibold mt-1.5">{errors.phone.message}</p>}
                </div>
              </div>

              {/* Areas of Interest Composite Panel Selector */}
              <div>
                <label className="block text-xs font-black uppercase tracking-wider text-slate-700 mb-3">
                  Target Domain Specializations *
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {interestOptions.map((interest) => (
                    <label
                      key={interest}
                      className="flex items-center space-x-3 p-3 rounded-xl border border-slate-100 bg-slate-50/50 hover:bg-slate-100/50 transition cursor-pointer select-none"
                    >
                      <input
                        type="checkbox"
                        value={interest}
                        {...register('interests')}
                        className="rounded border-slate-300 text-slate-950 focus:ring-slate-950/40 h-4 w-4"
                        disabled={submitting}
                      />
                      <span className="text-sm font-semibold text-slate-700">{interest}</span>
                    </label>
                  ))}
                </div>
                {errors.interests && <p className="text-rose-500 text-xs font-semibold mt-2">{errors.interests.message}</p>}
              </div>

              {/* Dropdown System - Availability Selector */}
              <div>
                <label className="block text-xs font-black uppercase tracking-wider text-slate-700 mb-2 flex items-center">
                  <Calendar className="h-3.5 w-3.5 mr-1.5 text-slate-400" />
                  Audited Operational Availability *
                </label>
                <div className="relative">
                  <select
                    {...register('availability')}
                    className={`w-full px-4 py-3 border rounded-xl text-sm text-slate-950 focus:outline-none focus:ring-2 focus:ring-slate-950/10 bg-slate-50/50 focus:bg-white transition-all appearance-none ${errors.availability ? 'border-rose-400 focus:border-rose-500' : 'border-slate-200 focus:border-slate-950'
                      }`}
                    disabled={submitting}
                  >
                    <option value="" className="text-slate-400">Select structured profile allocation...</option>
                    <option value="weekdays">Standard Core Working Shifts (Mon–Fri)</option>
                    <option value="weekends">Extended Operational Windows (Sat–Sun)</option>
                    <option value="evenings">Post-Meridian Deployments (After 5:00 PM)</option>
                    <option value="flexible">Ad-Hoc / Variable Execution Requirements</option>
                  </select>
                  <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none text-slate-400">
                    <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20"><path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" fillRule="evenodd" /></svg>
                  </div>
                </div>
                {errors.availability && <p className="text-rose-500 text-xs font-semibold mt-1.5">{errors.availability.message}</p>}
              </div>

              {/* Textarea - Cover Message Container */}
              <div>
                <label className="block text-xs font-black uppercase tracking-wider text-slate-700 mb-2 flex items-center">
                  <MessageSquare className="h-3.5 w-3.5 mr-1.5 text-slate-400" />
                  Additional Experience Overview
                </label>
                <textarea
                  {...register('message')}
                  rows={4}
                  className="w-full px-4 py-3 border border-slate-200 bg-slate-50/50 focus:bg-white rounded-xl text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-950/10 focus:border-slate-950 transition-all resize-none"
                  placeholder="Outline any prior specialized volunteer deployments, regional fieldwork or specific organizational expertise..."
                  disabled={submitting}
                />
              </div>

              {/* Submit Execution Key Switch */}
              <button
                type="submit"
                className="w-full bg-slate-950 text-white hover:bg-slate-900 py-3.5 rounded-xl font-black text-sm tracking-tight transition flex items-center justify-center space-x-2 shadow-lg disabled:opacity-60 disabled:pointer-events-none"
                disabled={submitting || emailSending}
              >
                {submitting ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin text-white" />
                    <span>Sending Message...</span>
                  </>
                ) : (
                  <>
                    <ShieldCheck className="h-4 w-4 text-orange-400" />
                    <span>Send Message</span>
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </section>
      <ToastContainer toasts={toasts} onRemove={removeToast} />
    </div>
  )
}

export default Volunteer