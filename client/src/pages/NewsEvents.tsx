import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Calendar, MapPin, User, ChevronRight, Search, Clock, Loader2, AlertCircle, Sparkles, X, Megaphone } from 'lucide-react'
import { useEvents } from '../hooks/useEvent'
import SEOHead from '../components/SEO/SEOHead'
import { SEO_CONFIG } from '../config/seo.config'
import MediaHero from '../components/pages/media/MediaHero'
import Newletter from '../components/pages/media/Newletter'
import OperationalMetrics from '../components/pages/media/OperationalMetrics'
import UpcomingEvent from '../components/pages/media/UpcomingEvent'

const NewsEvents = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')

  const {
    events,
    loading,
    error,
    categories,
    upcomingEvents
  } = useEvents()

  // Filter events based on search input and active categories
  const filteredEvents = events.filter(event => {
    const matchesSearch = searchTerm.trim() === '' ||
      event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.content.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesCategory = selectedCategory === 'all' || event.category === selectedCategory

    return matchesSearch && matchesCategory
  })

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center">
        <Loader2 className="h-12 w-12 text-slate-800 animate-spin mb-4" />
        <p className="text-slate-500 font-medium tracking-wide">Syncing information terminals...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
        <div className="bg-white border border-slate-200 rounded-3xl p-8 max-w-md w-full text-center shadow-xl shadow-slate-100">
          <AlertCircle className="h-12 w-12 text-rose-500 mx-auto mb-4" />
          <h3 className="text-xl font-bold text-slate-900 mb-2">Failed to retrieve feeds</h3>
          <p className="text-slate-600 mb-6">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="w-full bg-slate-950 text-white py-3 rounded-xl font-bold hover:bg-slate-900 transition"
          >
            Try Again
          </button>
        </div>
      </div>
    )
  }

  const getCategoryBadgeColor = (category: string) => {
    const tokens: Record<string, string> = {
      outreach: 'bg-emerald-50 text-emerald-700 border-emerald-100',
      announcement: 'bg-sky-50 text-sky-700 border-sky-100',
      youth: 'bg-purple-50 text-purple-700 border-purple-100',
      partnership: 'bg-amber-50 text-amber-700 border-amber-100',
      health: 'bg-rose-50 text-rose-700 border-rose-100',
      milestone: 'bg-indigo-50 text-indigo-700 border-indigo-100'
    }
    return tokens[category] || 'bg-slate-50 text-slate-700 border-slate-100'
  }

  const getCategoryLabel = (category: string) => {
    const labels: Record<string, string> = {
      outreach: 'Outreach Operations',
      announcement: 'Official Notice',
      youth: 'Youth Program',
      partnership: 'Strategic Alliance',
      health: 'Medical Initiative',
      milestone: 'Corporate Milestone'
    }
    return labels[category] || category
  }

  return (
    <div className="bg-slate-50 min-h-screen">
      <SEOHead
        title={SEO_CONFIG.pages.newsEvents.title}
        description={SEO_CONFIG.pages.newsEvents.description}
        keywords={SEO_CONFIG.pages.newsEvents.keywords}
        image={SEO_CONFIG.pages.newsEvents.image}
        type="website"
      />

      {/* Hero Section */}
      <MediaHero
        IconComponent={Megaphone}
        iconText='Live Action Log'
        header='News & Field'
        title='Briefings'
        description='Stay fully informed on live programmatic developments, tactical updates, structural announcements, and calendar listings.'
      />

      {/* Premium Upcoming Events Ticker Banner */}
      {upcomingEvents.length > 0 && (
        <section className="bg-gradient-to-r from-orange-500 to-amber-500 text-white relative z-20 py-4 shadow-md">
          <div className="container-custom flex flex-col lg:flex-row items-center justify-between gap-4">
            <div className="flex items-center space-x-2.5 shrink-0">
              <Sparkles className="h-5 w-5 text-amber-100 animate-pulse" />
              <span className="text-xs font-black uppercase tracking-wider text-amber-50">Operational Alert:</span>
            </div>
            <div className="flex flex-col sm:flex-row gap-x-8 gap-y-1 justify-center items-center overflow-hidden">
              {upcomingEvents.slice(0, 2).map(event => (
                <Link
                  key={event.id}
                  to={`/news-events/${event.slug}`}
                  className="group flex items-center space-x-2 text-sm font-semibold text-white hover:text-amber-100 transition whitespace-nowrap"
                >
                  <span className="w-1.5 h-1.5 bg-white rounded-full opacity-60 group-hover:scale-125 transition-transform" />
                  <span className="underline underline-offset-4 decoration-white/30">{event.title}</span>
                  <span className="text-xs text-amber-100/80 font-normal">
                    ({new Date(event.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })})
                  </span>
                </Link>
              ))}
            </div>
            <button
              onClick={() => setSelectedCategory('all')}
              className="bg-slate-950/20 text-white border border-white/20 hover:bg-white hover:text-slate-950 px-4 py-1.5 rounded-xl font-bold text-xs tracking-tight transition"
            >
              Monitor All
            </button>
          </div>
        </section>
      )}

      {/* Search Filter Controls Bar */}
      <section className="py-6 bg-white border-b border-slate-200/60 sticky top-16 z-30 shadow-sm shadow-slate-100/50">
        <div className="container-custom flex flex-col xl:flex-row gap-4 justify-between items-stretch xl:items-center">
          {/* Enhanced Search Input */}
          <div className="relative flex-1 max-w-xl">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <input
              type="text"
              placeholder="Filter archives by terms or entries..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-11 pr-10 py-3 border border-slate-200 bg-slate-50/50 focus:bg-white rounded-xl text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-950/10 focus:border-slate-950 transition-all"
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-slate-400 hover:text-slate-600 rounded-lg"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            )}
          </div>

          {/* Interactive Categories Tab Rail */}
          <div className="flex items-center overflow-x-auto no-scrollbar gap-1 pb-1 xl:pb-0">
            {categories.map((category) => {
              const isActive = selectedCategory === category.id
              return (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`relative px-4 py-2.5 rounded-xl font-bold text-xs tracking-tight transition-all shrink-0 ${isActive ? 'text-slate-950' : 'text-slate-500 hover:text-slate-900'
                    }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeNewsCategory"
                      className="absolute inset-0 bg-slate-100 rounded-xl"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10 flex items-center space-x-1.5">
                    <span>{category.label}</span>
                    <span className={`font-medium opacity-50 ${isActive ? 'text-slate-950' : 'text-slate-400'}`}>
                      ({category.count})
                    </span>
                  </span>
                </button>
              )
            })}
          </div>
        </div>
      </section>

      {/* Main Grid Workspace */}
      <section className="py-16">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">

            {/* Primary Feed Stream */}
            <div className="lg:col-span-2">
              <div className="space-y-6">
                <AnimatePresence mode="popLayout">
                  {filteredEvents.length === 0 ? (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="text-center py-20 bg-white border border-slate-100 rounded-3xl shadow-sm"
                    >
                      <Search className="h-8 w-8 text-slate-300 mx-auto mb-3" />
                      <h4 className="text-base font-bold text-slate-800">No matching listings</h4>
                      <p className="text-slate-500 text-sm max-w-xs mx-auto mt-1">We couldn't locate any records containing your active criteria query details.</p>
                    </motion.div>
                  ) : (
                    filteredEvents.map((item, index) => (
                      <motion.article
                        layout
                        key={item.id}
                        initial={{ opacity: 0, scale: 0.98 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.98 }}
                        transition={{ duration: 0.4, delay: index * 0.05 }}
                        className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden hover:shadow-xl hover:border-slate-200/80 transition-all duration-300 group flex flex-col md:flex-row"
                      >
                        {/* Article Thumb Frame */}
                        <div className="md:w-5/12 relative aspect-[16/10] md:aspect-auto overflow-hidden bg-slate-900 shrink-0 border-r border-slate-50">
                          <img
                            src={item.image}
                            alt={item.title}
                            className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out opacity-90"
                          />
                          <div className="absolute top-4 left-4">
                            <span className={`px-2.5 py-1 rounded-lg text-[10px] font-black uppercase tracking-wider border shadow-sm backdrop-blur-md ${getCategoryBadgeColor(item.category)}`}>
                              {getCategoryLabel(item.category)}
                            </span>
                          </div>
                        </div>

                        {/* Article Data Profile */}
                        <div className="p-6 md:p-8 flex-1 flex flex-col justify-between">
                          <div>
                            <div className="flex items-center space-x-3 mb-3">
                              <span className={`px-2 py-0.5 rounded text-[10px] font-black uppercase tracking-widest ${item.type === 'event' ? 'bg-orange-500 text-white' : 'bg-slate-950 text-white'
                                }`}>
                                {item.type}
                              </span>
                              <span className="flex items-center text-xs text-slate-400 font-bold">
                                <Calendar className="h-3.5 w-3.5 mr-1 text-slate-300" />
                                {new Date(item.date).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}
                              </span>
                            </div>

                            <Link to={`/news-events/${item.slug}`} className="block group-hover:text-slate-800">
                              <h3 className="text-xl font-black text-slate-900 tracking-tight leading-snug line-clamp-2 mb-2 group-hover:text-orange-500 transition-colors">
                                {item.title}
                              </h3>
                            </Link>

                            <p className="text-slate-500 text-sm leading-relaxed line-clamp-2 mb-6 font-normal">
                              {item.description}
                            </p>
                          </div>

                          <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-slate-100 text-xs font-bold text-slate-400">
                            <div className="flex items-center space-x-3 max-w-[70%]">
                              <span className="flex items-center truncate">
                                <User className="h-3.5 w-3.5 mr-1 text-slate-300" />
                                {item.author}
                              </span>
                              <span className="text-slate-200 font-normal">•</span>
                              <span className="flex items-center shrink-0">
                                <Clock className="h-3.5 w-3.5 mr-1 text-slate-300" />
                                {item.readTime}
                              </span>
                              {item.type === 'event' && item.location && (
                                <>
                                  <span className="text-slate-200 font-normal hidden sm:inline">•</span>
                                  <span className="items-center truncate hidden sm:flex">
                                    <MapPin className="h-3.5 w-3.5 mr-0.5 text-slate-300" />
                                    {item.location}
                                  </span>
                                </>
                              )}
                            </div>

                            <Link
                              to={`/news-events/${item.slug}`}
                              className="text-slate-950 font-black inline-flex items-center group/btn text-xs tracking-tight"
                            >
                              Open Briefing
                              <ChevronRight className="h-3.5 w-3.5 ml-0.5 group-hover/btn:translate-x-1 transition-transform text-orange-500" />
                            </Link>
                          </div>
                        </div>
                      </motion.article>
                    ))
                  )}
                </AnimatePresence>
              </div>
            </div>

            {/* Sticky Dashboard Sidebar Panel */}
            <div className="lg:col-span-1 space-y-8 sticky top-36">

              {/* Upcoming Context Widget */}
              <UpcomingEvent />

              {/* Newsletter Structural Capture Card */}
              <Newletter />
              {/* Historical Global Metrics */}
              <OperationalMetrics />
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default NewsEvents