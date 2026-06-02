import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  ArrowLeft, Calendar, MapPin,
  Share2, ExternalLink, Info
} from 'lucide-react'
import { useEvents } from '../hooks/useEvent'
import type { Event } from '../types/event.types'
import { FacebookIcon, LinkedinIcon, TwitterIcon } from '../components/ui/SocialIcons'
import SEOHead from '../components/SEO/SEOHead'
import { SEO_CONFIG } from '../config/seo.config'

const EventDetail = () => {
  const { slug } = useParams<{ slug: string }>()
  const [event, setEvent] = useState<Event | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const { getEventBySlug } = useEvents()

  useEffect(() => {
    const loadEvent = async () => {
      if (!slug) return
      setLoading(true)
      try {
        const eventData = await getEventBySlug(slug)
        eventData ? setEvent(eventData) : setError('Event not found')
      } catch (err) {
        setError('Failed to load event')
      } finally {
        setLoading(false)
      }
    }
    loadEvent()
  }, [slug, getEventBySlug])

  const getCategoryStyles = (category: string) => {
    const styles: Record<string, string> = {
      outreach: 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20',
      announcement: 'bg-blue-500/10 text-blue-500 border-blue-500/20',
      youth: 'bg-purple-500/10 text-purple-500 border-purple-500/20',
      health: 'bg-rose-500/10 text-rose-500 border-rose-500/20',
    }
    return styles[category] || 'bg-slate-500/10 text-slate-500 border-slate-500/20'
  }

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50">
      <div className="flex flex-col items-center">
        <div className="w-12 h-12 border-4 border-slate-200 border-t-emerald-500 rounded-full animate-spin mb-4" />
        <p className="text-slate-500 font-bold tracking-widest text-xs uppercase">Initializing Brief...</p>
      </div>
    </div>
  )

  if (error || !event) return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50">
      <div className="text-center p-12 bg-white rounded-3xl shadow-sm border border-slate-200 max-w-md">
        <Info className="h-12 w-12 text-rose-500 mx-auto mb-4" />
        <h1 className="text-2xl font-black text-slate-900 mb-2">Record Not Found</h1>
        <p className="text-slate-500 mb-8">The event or article you are looking for has been archived or moved.</p>
        <Link to="/news-events" className="inline-flex items-center text-emerald-600 font-bold uppercase text-xs tracking-widest hover:text-emerald-700">
          <ArrowLeft className="h-4 w-4 mr-2" /> Return to Archive
        </Link>
      </div>
    </div>
  )

  const shareUrl = window.location.href

  return (
    <div className="bg-slate-50 min-h-screen antialiased">
      <SEOHead
        title={`${SEO_CONFIG.pages.eventDetail.title}${event?.title || 'Event'}`}
        description={event?.description || SEO_CONFIG.pages.eventDetail.description}
        keywords={`${SEO_CONFIG.pages.eventDetail.keywords}, ${event?.category}, ${event?.location}`}
        image={event?.image || SEO_CONFIG.pages.eventDetail.image}
        url={`${SEO_CONFIG.siteUrl}/news-events/${slug}`}
        type={event?.type === 'event' ? 'event' : 'article'}
        publishedTime={event?.date}
        author={event?.author}
        tags={[event?.category || '', event?.type || '', 'news', 'event']}
      />

      {/* Modern Hero Section */}
      <section className="relative h-[500px] w-full overflow-hidden">
        <motion.img
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.5 }}
          src={event.image}
          className="absolute inset-0 w-full h-full object-cover"
          alt={event.title}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/60 to-transparent" />

        <div className="absolute inset-0 flex items-end pb-16">
          <div className="container-custom">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              className="max-w-4xl"
            >
              <Link to="/news-events" className="inline-flex items-center text-emerald-400 text-xs font-black uppercase tracking-[0.2em] mb-8 group">
                <ArrowLeft className="h-4 w-4 mr-2 group-hover:-translate-x-1 transition-transform" />
                Back to Intelligence
              </Link>

              <div className="flex gap-3 mb-6">
                <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest border backdrop-blur-md ${getCategoryStyles(event.category)}`}>
                  {event.category}
                </span>
                <span className="px-4 py-1.5 bg-white/10 border border-white/20 backdrop-blur-md text-white text-[10px] font-black uppercase tracking-widest rounded-full">
                  {event.status}
                </span>
              </div>

              <h1 className="text-4xl md:text-6xl font-black text-white leading-tight mb-8 tracking-tight">
                {event.title}
              </h1>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 py-6 border-t border-white/10 text-white/80">
                <div className="space-y-1">
                  <p className="text-[10px] font-black uppercase tracking-tighter text-emerald-500">Date Posted</p>
                  <p className="text-sm font-bold">{new Date(event.date).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-[10px] font-black uppercase tracking-tighter text-emerald-500">Location</p>
                  <p className="text-sm font-bold truncate">{event.location}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-[10px] font-black uppercase tracking-tighter text-emerald-500">Correspondent</p>
                  <p className="text-sm font-bold">{event.author}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-[10px] font-black uppercase tracking-tighter text-emerald-500">Reading Time</p>
                  <p className="text-sm font-bold">{event.readTime || '5 min'}</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Main Content Architecture */}
      <section className="py-20 container-custom">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">

          {/* Narrative Body */}
          <div className="lg:col-span-8">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              className="bg-white rounded-[2rem] p-10 shadow-sm border border-slate-100"
            >
              <div className="prose prose-slate prose-lg max-w-none">
                <div className="text-slate-600 leading-[1.8] font-normal space-y-8">
                  {event.content.split('\n\n').map((paragraph, idx) => {
                    if (paragraph.startsWith('**')) {
                      return <h2 key={idx} className="text-2xl font-black text-slate-900 pt-4">{paragraph.replace(/\*\*/g, '')}</h2>
                    }
                    return <p key={idx}>{paragraph}</p>
                  })}
                </div>
              </div>
            </motion.div>
          </div>

          {/* Tactical Sidebar */}
          <div className="lg:col-span-4">
            <motion.aside
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="sticky top-28 space-y-8"
            >
              {/* Event Logistics Card */}
              <div className="bg-slate-900 rounded-[2rem] p-8 text-white shadow-2xl shadow-slate-900/20">
                <h3 className="text-lg font-black mb-8 flex items-center">
                  <span className="w-6 h-1 bg-emerald-500 mr-3 rounded-full" />
                  Logistics & RSVP
                </h3>

                <div className="space-y-6">
                  <div className="flex items-start group">
                    <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center mr-4 shrink-0 group-hover:bg-emerald-500 transition-colors">
                      <Calendar className="h-5 w-5 text-emerald-400 group-hover:text-white" />
                    </div>
                    <div>
                      <p className="text-[10px] font-black uppercase text-slate-500 mb-1">Timing</p>
                      <p className="text-sm font-semibold">{new Date(event.date).toLocaleDateString()}</p>
                    </div>
                  </div>

                  <div className="flex items-start group">
                    <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center mr-4 shrink-0 group-hover:bg-emerald-500 transition-colors">
                      <MapPin className="h-5 w-5 text-emerald-400 group-hover:text-white" />
                    </div>
                    <div>
                      <p className="text-[10px] font-black uppercase text-slate-500 mb-1">Venue</p>
                      <p className="text-sm font-semibold">{event.location}</p>
                    </div>
                  </div>
                </div>

                <div className="mt-10 space-y-3">
                  {event.registrationLink && (
                    <a href={event.registrationLink} className="flex items-center justify-center w-full py-4 bg-emerald-500 hover:bg-emerald-400 text-slate-950 rounded-xl font-black text-xs uppercase tracking-wider transition-all">
                      Secure Access
                      <ExternalLink className="ml-2 h-4 w-4" />
                    </a>
                  )}
                  <button className="flex items-center justify-center w-full py-4 bg-white/5 border border-white/10 hover:bg-white/10 rounded-xl font-black text-xs uppercase tracking-wider transition-all">
                    Add to Calendar
                  </button>
                </div>
              </div>

              {/* Share Briefing */}
              <div className="bg-white border border-slate-100 rounded-[2rem] p-8 shadow-sm">
                <h4 className="text-xs font-black uppercase tracking-widest text-slate-400 mb-6 flex items-center">
                  <Share2 className="h-4 w-4 mr-2" />
                  Distribute Brief
                </h4>
                <div className="flex gap-4">
                  {[
                    { icon: <FacebookIcon className="h-5 w-5" />, color: 'hover:bg-blue-600', link: `https://facebook.com/sharer/sharer.php?u=${shareUrl}` },
                    { icon: <TwitterIcon className="h-5 w-5" />, color: 'hover:bg-sky-500', link: `https://twitter.com/intent/tweet?url=${shareUrl}` },
                    { icon: <LinkedinIcon className="h-5 w-5" />, color: 'hover:bg-blue-800', link: `https://linkedin.com/shareArticle?url=${shareUrl}` }
                  ].map((social, i) => (
                    <a key={i} href={social.link} target="_blank" className={`w-12 h-12 flex items-center justify-center rounded-xl bg-slate-50 border border-slate-100 text-slate-400 ${social.color} hover:text-white transition-all duration-300`}>
                      {social.icon}
                    </a>
                  ))}
                </div>
              </div>
            </motion.aside>
          </div>

        </div>
      </section>
    </div>
  )
}

export default EventDetail