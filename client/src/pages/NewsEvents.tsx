import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Calendar, MapPin, User, ChevronRight, Search, Tag, Heart, Clock } from 'lucide-react'
import { useEvents } from '../hooks/useEvent'
import SEOHead from '../components/SEO/SEOHead'
import { SEO_CONFIG } from '../config/seo.config'

const NewsEvents = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')

  const {
    events,
    loading,
    error,
    categories,
    upcomingEvents,
    fetchEvents
  } = useEvents()

  // Filter events based on search and category
  const filteredEvents = events.filter(event => {
    const matchesSearch = searchTerm === '' ||
      event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.content.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesCategory = selectedCategory === 'all' || event.category === selectedCategory

    return matchesSearch && matchesCategory
  })

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-blue mx-auto mb-4"></div>
          <p className="text-secondary-gray">Loading news and events...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-500 mb-4">{error}</p>
          <button onClick={() => window.location.reload()} className="btn-primary">
            Try Again
          </button>
        </div>
      </div>
    )
  }

  const getCategoryBadgeColor = (category: string) => {
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

  return (
    <div>
      <SEOHead
        title={SEO_CONFIG.pages.newsEvents.title}
        description={SEO_CONFIG.pages.newsEvents.description}
        keywords={SEO_CONFIG.pages.newsEvents.keywords}
        image={SEO_CONFIG.pages.newsEvents.image}
        type="website"
      />
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-primary-blue to-primary-green text-white py-20">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-4">News & Events</h1>
            <p className="text-lg md:text-xl opacity-90">
              Stay updated with our latest activities, announcements, and upcoming events
            </p>
          </motion.div>
        </div>
      </section>

      {/* Upcoming Events Banner */}
      {upcomingEvents.length > 0 && (
        <section className="py-8 bg-primary-orange text-white">
          <div className="container-custom">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="flex items-center space-x-3">
                <Calendar className="h-6 w-6" />
                <span className="font-semibold">Upcoming Events:</span>
              </div>
              <div className="flex flex-wrap gap-4 justify-center">
                {upcomingEvents.slice(0, 3).map(event => (
                  <Link
                    key={event.id}
                    to={`/news-events/${event.slug}`}
                    className="flex items-center space-x-2 text-sm hover:text-primary-orange transition"
                  >
                    <span>{event.title}</span>
                    <span>•</span>
                    <span>{new Date(event.date).toLocaleDateString()}</span>
                  </Link>
                ))}
              </div>
              <Link to="#events" className="bg-white text-primary-orange px-4 py-2 rounded-lg font-semibold text-sm hover:bg-gray-100 transition">
                View All
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* Search and Filter */}
      <section className="py-8 bg-gray-50">
        <div className="container-custom">
          <div className="flex flex-col md:flex-row gap-4 justify-between items-center">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-secondary-gray" />
              <input
                type="text"
                placeholder="Search news and events..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-primary-blue focus:border-primary-blue"
              />
            </div>
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`px-4 py-2 rounded-full text-sm font-semibold transition-all duration-300 ${selectedCategory === category.id
                    ? 'bg-primary-blue text-white shadow-lg'
                    : 'bg-white text-secondary-gray hover:bg-gray-200'
                    }`}
                >
                  {category.label}
                  <span className="ml-1 text-xs opacity-75">({category.count})</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* News & Events Grid */}
      <section className="py-16">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2">
              <div className="space-y-8">
                {filteredEvents.length === 0 ? (
                  <div className="text-center py-12 bg-white rounded-xl">
                    <p className="text-secondary-gray">No news or events found.</p>
                  </div>
                ) : (
                  filteredEvents.map((item, index) => (
                    <motion.article
                      key={item.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: index * 0.1 }}
                      className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 group"
                    >
                      <div className="md:flex">
                        <div className="md:w-1/3 relative overflow-hidden">
                          <img
                            src={item.image}
                            alt={item.title}
                            className="h-48 md:h-full w-full object-cover group-hover:scale-110 transition-transform duration-500"
                          />
                          <div className="absolute top-4 left-4">
                            <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getCategoryBadgeColor(item.category)}`}>
                              {getCategoryLabel(item.category)}
                            </span>
                          </div>
                        </div>
                        <div className="p-6 md:w-2/3">
                          <div className="flex items-center space-x-2 mb-3">
                            <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${item.type === 'event'
                              ? 'bg-primary-orange text-white'
                              : 'bg-primary-blue text-white'
                              }`}>
                              {item.type === 'event' ? 'Event' : 'News'}
                            </span>
                            <span className="flex items-center text-sm text-secondary-gray">
                              <Calendar className="h-4 w-4 mr-1" />
                              {new Date(item.date).toLocaleDateString()}
                            </span>
                          </div>
                          <Link to={`/news-events/${item.slug}`}>
                            <h3 className="text-xl font-bold mb-2 hover:text-primary-blue transition line-clamp-2">
                              {item.title}
                            </h3>
                          </Link>
                          <p className="text-secondary-gray mb-4 line-clamp-2">
                            {item.description}
                          </p>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center text-sm text-secondary-gray">
                              <User className="h-4 w-4 mr-1" />
                              {item.author}
                              <span className="mx-2">•</span>
                              <Clock className="h-4 w-4 mr-1" />
                              <span>{item.readTime}</span>
                              {item.type === 'event' && item.location && (
                                <>
                                  <span className="mx-2">•</span>
                                  <MapPin className="h-4 w-4 mr-1" />
                                  <span className="truncate max-w-[150px]">{item.location}</span>
                                </>
                              )}
                            </div>
                            <Link
                              to={`/news-events/${item.slug}`}
                              className="text-primary-blue font-semibold hover:text-primary-green inline-flex items-center group"
                            >
                              Read More
                              <ChevronRight className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform" />
                            </Link>
                          </div>
                        </div>
                      </div>
                    </motion.article>
                  ))
                )}
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1 space-y-8">
              {/* Upcoming Events Widget */}
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-xl font-bold mb-4 flex items-center">
                  <Calendar className="h-5 w-5 mr-2 text-primary-orange" />
                  Upcoming Events
                </h3>
                <div className="space-y-4">
                  {upcomingEvents.length === 0 ? (
                    <p className="text-secondary-gray text-sm">No upcoming events at this time.</p>
                  ) : (
                    upcomingEvents.map(event => (
                      <Link
                        key={event.id}
                        to={`/news-events/${event.slug}`}
                        className="block border-b last:border-0 pb-4 last:pb-0 hover:bg-gray-50 transition p-2 rounded-lg"
                      >
                        <h4 className="font-semibold mb-1 hover:text-primary-blue transition">
                          {event.title}
                        </h4>
                        <div className="flex items-center text-sm text-secondary-gray mb-1">
                          <Calendar className="h-3 w-3 mr-1" />
                          {new Date(event.date).toLocaleDateString()}
                        </div>
                        <div className="flex items-center text-sm text-secondary-gray">
                          <MapPin className="h-3 w-3 mr-1" />
                          {event.location}
                        </div>
                      </Link>
                    ))
                  )}
                </div>
              </div>

              {/* Categories Widget */}
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-xl font-bold mb-4 flex items-center">
                  <Tag className="h-5 w-5 mr-2 text-primary-orange" />
                  Categories
                </h3>
                <div className="flex flex-wrap gap-2">
                  {categories.filter(c => c.id !== 'all').map(category => (
                    <button
                      key={category.id}
                      onClick={() => setSelectedCategory(category.id)}
                      className={`px-3 py-1 rounded-full text-sm transition ${selectedCategory === category.id
                        ? 'bg-primary-blue text-white'
                        : 'bg-gray-100 text-secondary-gray hover:bg-gray-200'
                        }`}
                    >
                      {category.label}
                      <span className="ml-1 text-xs opacity-75">({category.count})</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Newsletter Signup */}
              <div className="bg-gradient-to-r from-primary-blue to-primary-green rounded-xl shadow-lg p-6 text-white">
                <Heart className="h-10 w-10 mb-3 opacity-80" />
                <h3 className="text-xl font-bold mb-2">Subscribe to Our Newsletter</h3>
                <p className="text-sm opacity-90 mb-4">
                  Get the latest updates on our programs and events delivered to your inbox.
                </p>
                <form className="space-y-3" onSubmit={(e) => e.preventDefault()}>
                  <input
                    type="email"
                    placeholder="Your email address"
                    className="w-full px-4 py-2 rounded-lg text-secondary-dark"
                    required
                  />
                  <button
                    type="submit"
                    className="w-full bg-white text-primary-blue px-4 py-2 rounded-lg font-semibold hover:bg-gray-100 transition"
                  >
                    Subscribe
                  </button>
                </form>
                <p className="text-xs opacity-75 mt-3">
                  No spam. Unsubscribe anytime.
                </p>
              </div>

              {/* Impact Stats Widget */}
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-xl font-bold mb-4 flex items-center">
                  <Heart className="h-5 w-5 mr-2 text-primary-orange" />
                  Our Impact
                </h3>
                <div className="space-y-3">
                  <div>
                    <div className="text-2xl font-bold text-primary-blue">1,250+</div>
                    <div className="text-sm text-secondary-gray">Children Supported</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-primary-blue">8,750+</div>
                    <div className="text-sm text-secondary-gray">Meals Distributed</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-primary-blue">15+</div>
                    <div className="text-sm text-secondary-gray">Communities Impacted</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default NewsEvents