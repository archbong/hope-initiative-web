import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  ArrowLeft, Calendar, MapPin, User, Clock,
  Share2, Mail, ExternalLink, Phone
} from 'lucide-react'
import { useEvents } from '../hooks/useEvent'
import type { Event } from '../types/event.types'
import { FacebookIcon, LinkedinIcon, TwitterIcon } from '../components/ui/SocialIcons'
import SEOHead from '../components/SEO/SEOHead'
import { SEO_CONFIG } from '../config/seo.config'
// import { useEvents } from '../hooks/useEvents'
// import { Event } from '../types'

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
      setError(null)

      try {
        const eventData = await getEventBySlug(slug)
        if (eventData) {
          setEvent(eventData)
        } else {
          setError('Event not found')
        }
      } catch (err) {
        setError('Failed to load event')
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    loadEvent()
  }, [slug, getEventBySlug])

  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      outreach: 'bg-green-100 text-green-800',
      announcement: 'bg-blue-100 text-blue-800',
      youth: 'bg-purple-100 text-purple-800',
      partnership: 'bg-yellow-100 text-yellow-800',
      health: 'bg-red-100 text-red-800',
      milestone: 'bg-orange-100 text-orange-800'
    }
    return colors[category] || 'bg-gray-100 text-gray-800'
  }

  const getCategoryLabel = (category: string) => {
    const labels: Record<string, string> = {
      outreach: 'Outreach',
      announcement: 'Announcement',
      youth: 'Youth Program',
      partnership: 'Partnership',
      health: 'Health',
      milestone: 'Milestone'
    }
    return labels[category] || category
  }

  const getStatusBadge = (status: string, date: string) => {
    const eventDate = new Date(date)
    const today = new Date()

    if (status === 'upcoming' && eventDate > today) {
      return { text: 'Upcoming', color: 'bg-green-100 text-green-800' }
    } else if (status === 'ongoing') {
      return { text: 'Ongoing', color: 'bg-blue-100 text-blue-800' }
    } else if (status === 'completed' || eventDate < today) {
      return { text: 'Past Event', color: 'bg-gray-100 text-gray-800' }
    }
    return { text: status, color: 'bg-gray-100 text-gray-800' }
  }

  const shareUrl = window.location.href
  const shareTitle = event?.title || 'Hope for the Hopeless Initiative'

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-blue mx-auto mb-4"></div>
          <p className="text-secondary-gray">Loading...</p>
        </div>
      </div>
    )
  }

  if (error || !event) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">{error || 'Event Not Found'}</h1>
          <Link to="/news-events" className="text-primary-blue hover:underline">
            Back to News & Events
          </Link>
        </div>
      </div>
    )
  }

  const statusBadge = getStatusBadge(event.status as string, event.date)

  return (
    <div>
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
      {/* Hero Section */}
      <section className="relative h-96 bg-cover bg-center" style={{ backgroundImage: `url(${event.image})` }}>
        <div className="absolute inset-0 bg-gradient-to-r from-primary-blue to-primary-green opacity-85"></div>
        <div className="absolute inset-0 flex items-center">
          <div className="container-custom">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-white max-w-3xl"
            >
              <Link to="/news-events" className="inline-flex items-center text-white mb-4 hover:text-primary-orange transition">
                <ArrowLeft className="h-4 w-4 mr-1" />
                Back to News & Events
              </Link>
              <div className="flex items-center space-x-3 mb-4">
                <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getCategoryColor(event.category)}`}>
                  {getCategoryLabel(event.category)}
                </span>
                <span className={`px-3 py-1 rounded-full text-xs font-semibold ${statusBadge.color}`}>
                  {statusBadge.text}
                </span>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold mb-4">{event.title}</h1>
              <div className="flex flex-wrap gap-4 text-sm opacity-90">
                <span className="flex items-center">
                  <Calendar className="h-4 w-4 mr-1" />
                  {new Date(event.date).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                  {event.endDate && ` - ${new Date(event.endDate).toLocaleDateString('en-US', {
                    month: 'long',
                    day: 'numeric'
                  })}`}
                </span>
                <span className="flex items-center">
                  <MapPin className="h-4 w-4 mr-1" />
                  {event.location}
                </span>
                <span className="flex items-center">
                  <User className="h-4 w-4 mr-1" />
                  {event.author}
                </span>
                <span className="flex items-center">
                  <Clock className="h-4 w-4 mr-1" />
                  {event.readTime}
                </span>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-16">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Main Content */}
            <div className="lg:col-span-2">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="prose prose-lg max-w-none"
              >
                <div className="text-secondary-gray leading-relaxed whitespace-pre-line">
                  {event.content.split('\n\n').map((paragraph, idx) => {
                    if (paragraph.startsWith('**') && paragraph.endsWith('**')) {
                      return (
                        <h3 key={idx} className="text-xl font-bold mt-6 mb-3 text-secondary-dark">
                          {paragraph.replace(/\*\*/g, '')}
                        </h3>
                      )
                    }
                    if (paragraph.startsWith('- ')) {
                      return (
                        <ul key={idx} className="list-disc list-inside my-3 space-y-1">
                          {paragraph.split('\n').map((item, itemIdx) => (
                            <li key={itemIdx} className="text-secondary-gray">
                              {item.replace('- ', '')}
                            </li>
                          ))}
                        </ul>
                      )
                    }
                    return (
                      <p key={idx} className="mb-4 leading-relaxed">
                        {paragraph}
                      </p>
                    )
                  })}
                </div>
              </motion.div>
            </div>

            {/* Sidebar */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="bg-white rounded-xl shadow-lg p-6 sticky top-24">
                <h3 className="text-xl font-bold mb-4">Event Information</h3>

                <div className="space-y-4 mb-6">
                  <div className="flex items-start space-x-3">
                    <Calendar className="h-5 w-5 text-primary-blue flex-shrink-0 mt-1" />
                    <div>
                      <p className="font-semibold">Date & Time</p>
                      <p className="text-sm text-secondary-gray">
                        {new Date(event.date).toLocaleDateString('en-US', {
                          weekday: 'long',
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}
                        {event.endDate && (
                          <>
                            <br />to {new Date(event.endDate).toLocaleDateString('en-US', {
                              month: 'long',
                              day: 'numeric'
                            })}
                          </>
                        )}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <MapPin className="h-5 w-5 text-primary-blue flex-shrink-0 mt-1" />
                    <div>
                      <p className="font-semibold">Location</p>
                      <p className="text-sm text-secondary-gray">{event.location}</p>
                    </div>
                  </div>

                  {event.contactEmail && (
                    <div className="flex items-start space-x-3">
                      <Mail className="h-5 w-5 text-primary-blue flex-shrink-0 mt-1" />
                      <div>
                        <p className="font-semibold">Contact</p>
                        <a href={`mailto:${event.contactEmail}`} className="text-sm text-primary-blue hover:underline">
                          {event.contactEmail}
                        </a>
                        {event.contactPhone && (
                          <a href={`tel:${event.contactPhone}`} className="text-sm text-primary-blue hover:underline block mt-1">
                            <Phone className="h-3 w-3 inline mr-1" />
                            {event.contactPhone}
                          </a>
                        )}
                      </div>
                    </div>
                  )}
                </div>

                {event.registrationLink && event.type === 'event' && (
                  <a
                    href={event.registrationLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block btn-primary text-center mb-4"
                  >
                    Register Now
                    <ExternalLink className="h-4 w-4 inline ml-2" />
                  </a>
                )}

                {/* Share Section */}
                <div className="border-t pt-4 mt-4">
                  <h4 className="font-semibold mb-3 flex items-center">
                    <Share2 className="h-4 w-4 mr-2" />
                    Share This {event.type === 'event' ? 'Event' : 'Article'}
                  </h4>
                  <div className="flex space-x-3">
                    <a
                      href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700 transition"
                    >
                      <FacebookIcon className="h-5 w-5" />
                    </a>
                    <a
                      href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(shareTitle)}&url=${encodeURIComponent(shareUrl)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-blue-400 text-white p-2 rounded-lg hover:bg-blue-500 transition"
                    >
                      <TwitterIcon className="h-5 w-5" />
                    </a>
                    <a
                      href={`https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(shareUrl)}&title=${encodeURIComponent(shareTitle)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-blue-700 text-white p-2 rounded-lg hover:bg-blue-800 transition"
                    >
                      <LinkedinIcon className="h-5 w-5" />
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default EventDetail