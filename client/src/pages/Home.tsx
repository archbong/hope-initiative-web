import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Heart, Users, TrendingUp, Award, ArrowRight, Sparkles, CheckCircle2, MessageSquare, Image as ImageIcon } from 'lucide-react'
import { usePrograms } from '../hooks/usePrograms'
import { useStories } from '../hooks/useStories'
import { useGallery } from '../hooks/useGallery'
import SEOHead from '../components/SEO/SEOHead'
import { SEO_CONFIG } from '../config/seo.config'

const Home = () => {
  const [stats, setStats] = useState({
    childrenSupported: 0,
    mealsDistributed: 0,
    youthReached: 0,
    communitiesImpacted: 0
  })

  const { programs: featuredPrograms, loading: programsLoading, fetchPrograms } = usePrograms()
  const { stories: featuredStories, loading: storiesLoading, fetchStories } = useStories()
  const { images: galleryImages, loading: galleryLoading, fetchImages } = useGallery()

  useEffect(() => {
    fetchPrograms({ featured: true })
    fetchStories({ featured: true })
    fetchImages()
  }, [fetchPrograms, fetchStories, fetchImages])

  useEffect(() => {
    const targetStats = {
      childrenSupported: 1250,
      mealsDistributed: 8750,
      youthReached: 3200,
      communitiesImpacted: 15
    }

    const duration = 2000
    const interval = 30
    const steps = duration / interval
    let currentStep = 0

    const timer = setInterval(() => {
      currentStep++
      const progress = currentStep / steps

      setStats({
        childrenSupported: Math.min(Math.floor(targetStats.childrenSupported * progress), targetStats.childrenSupported),
        mealsDistributed: Math.min(Math.floor(targetStats.mealsDistributed * progress), targetStats.mealsDistributed),
        youthReached: Math.min(Math.floor(targetStats.youthReached * progress), targetStats.youthReached),
        communitiesImpacted: Math.min(Math.floor(targetStats.communitiesImpacted * progress), targetStats.communitiesImpacted)
      })

      if (currentStep >= steps) clearInterval(timer)
    }, interval)

    return () => clearInterval(timer)
  }, [])

  const statItems = [
    { icon: Users, label: 'Children Supported', value: stats.childrenSupported, color: 'bg-blue-500/10 text-blue-600' },
    { icon: Heart, label: 'Meals Distributed', value: stats.mealsDistributed, color: 'bg-red-500/10 text-red-600' },
    { icon: TrendingUp, label: 'Youth Reached', value: stats.youthReached, color: 'bg-emerald-500/10 text-emerald-600' },
    { icon: Award, label: 'Communities Impacted', value: stats.communitiesImpacted, color: 'bg-amber-500/10 text-amber-600' },
  ]

  const displayPrograms = featuredPrograms?.slice(0, 3) || []
  const displayStories = featuredStories?.slice(0, 3) || []
  const displayGallery = galleryImages?.slice(0, 4) || []

  return (
    <div className="bg-slate-50 min-h-screen overflow-x-hidden">
      <SEOHead
        title={SEO_CONFIG.pages.home.title}
        description={SEO_CONFIG.pages.home.description}
        keywords={SEO_CONFIG.pages.home.keywords}
        image={SEO_CONFIG.pages.home.image}
        url={SEO_CONFIG.siteUrl}
        type="website"
      />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-slate-900 via-sky-950 to-slate-900 text-white py-24 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 opacity-40 mix-blend-overlay bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] [background-size:16px_16px]" />
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-sky-500/10 rounded-full blur-3xl -mr-40 -mt-40" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-emerald-500/10 rounded-full blur-3xl -ml-40 -mb-40" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4 }}
              className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-md px-3 py-1.5 rounded-full text-xs font-semibold tracking-wide text-sky-300 uppercase mb-6 border border-white/10"
            >
              <Sparkles className="h-3.5 w-3.5 text-amber-400 fill-amber-400" />
              <span>Making a visible difference in Nigeria</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-extrabold mb-6 tracking-tight leading-[1.1]"
            >
              Restoring <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-emerald-400">Hope</span>,<br />
              Transforming Lives.
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg sm:text-xl mb-10 text-slate-300 font-medium leading-relaxed max-w-2xl"
            >
              Empowering vulnerable individuals and communities through tactical humanitarian support, foundational youth development programs, and sustainable execution frameworks.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <Link to="/donate" className="bg-orange-600 text-white px-8 py-4 rounded-xl font-bold hover:bg-orange-700 transition-all shadow-lg shadow-orange-950/20 text-center active:scale-98">
                Donate Now
              </Link>
              <Link to="/volunteer" className="bg-white/5 backdrop-blur-sm border border-white/20 text-white px-8 py-4 rounded-xl font-bold hover:bg-white hover:text-slate-900 transition-all text-center active:scale-98">
                Become a Volunteer
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="relative -mt-10 z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl shadow-xl border border-slate-100 p-8 sm:p-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {statItems.map((stat, index) => {
            const Icon = stat.icon
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                className="flex items-center space-x-4 p-4 rounded-2xl hover:bg-slate-50 transition-colors"
              >
                <div className={`p-4 rounded-2xl ${stat.color} shrink-0`}>
                  <Icon className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
                    {stat.value.toLocaleString()}+
                  </h3>
                  <p className="text-slate-500 font-medium text-sm">{stat.label}</p>
                </div>
              </motion.div>
            )
          })}
        </div>
      </section>

      {/* Featured Programs Section */}
      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <h2 className="text-xs uppercase tracking-widest text-orange-600 font-bold mb-3 flex items-center">
              <span className="w-8 h-px bg-orange-600 mr-2" /> Strategic Interventions
            </h2>
            <p className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Our Core Programs
            </p>
          </div>
          <p className="text-slate-500 font-medium text-base max-w-md md:text-right">
            Providing structured resources and development strategies designed to spark sustainable community health.
          </p>
        </div>

        {programsLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[1, 2, 3].map((n) => (
              <div key={n} className="bg-white rounded-2xl h-[400px] animate-pulse border border-slate-100" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {displayPrograms.map((program, index) => (
              <motion.div
                key={program.id || index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden hover:shadow-xl transition-all duration-300 flex flex-col h-full"
              >
                <div className="h-52 overflow-hidden relative">
                  <img
                    src={program.image}
                    alt={program.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=600&auto=format&fit=crop&q=60'
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/20 to-transparent" />
                </div>
                <div className="p-6 sm:p-8 flex flex-col flex-grow">
                  <h3 className="text-xl font-bold text-slate-950 mb-3 tracking-tight group-hover:text-sky-600 transition-colors">
                    {program.title}
                  </h3>
                  <p className="text-slate-600 text-sm leading-relaxed mb-6 flex-grow line-clamp-3">
                    {program.description}
                  </p>
                  <Link
                    to={`/programs/${program.slug}`}
                    className="text-sm text-sky-600 font-bold inline-flex items-center group/btn mt-auto"
                  >
                    <span>Analyze Scope</span>
                    <ArrowRight className="h-4 w-4 ml-1.5 transform group-hover/btn:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        <div className="text-center mt-14">
          <Link to="/programs" className="inline-flex items-center space-x-2 bg-white border border-slate-200 px-6 py-3 rounded-xl text-sm font-bold text-slate-700 hover:bg-slate-50 transition-colors shadow-sm">
            <span>Explore All Initiatives</span>
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      {/* Impact Stories / Testimonials Section */}
      <section className="py-20 bg-slate-100 border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-xs uppercase tracking-widest text-emerald-600 font-bold mb-3 flex items-center justify-center">
              <MessageSquare className="h-4 w-4 mr-2" /> Voices of Change
            </h2>
            <p className="text-3xl font-extrabold text-slate-900 tracking-tight">Impact Stories</p>
          </div>

          {storiesLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 animate-pulse">
              {[1, 2, 3].map((n) => (
                <div key={n} className="bg-white rounded-2xl h-48" />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {displayStories.map((story, index) => (
                <motion.div
                  key={story.id || index}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                  className="bg-white p-6 sm:p-8 rounded-3xl shadow-sm border border-slate-200/60 relative flex flex-col justify-between"
                >
                  <p className="text-slate-600 italic text-sm leading-relaxed mb-6">
                    "{story.quote || story.excerpt || 'No excerpt available.'}"
                  </p>
                  <div className="flex items-center space-x-3 pt-4 border-t border-slate-100">
                    {story.authorImage && (
                      <img src={story.authorImage} alt={story.author} className="w-10 h-10 rounded-full object-cover" />
                    )}
                    <div>
                      <h4 className="font-bold text-slate-900 text-sm">{story.author || 'Anonymous'}</h4>
                      <p className="text-xs text-slate-400">{story.location || 'Beneficiary'}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Media Gallery Preview Section */}
      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-xs uppercase tracking-widest text-sky-600 font-bold mb-3 flex items-center justify-center">
            <ImageIcon className="h-4 w-4 mr-2" /> Transparency in Action
          </h2>
          <p className="text-3xl font-extrabold text-slate-900 tracking-tight">Recent Gallery</p>
        </div>

        {galleryLoading ? (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 animate-pulse">
            {[1, 2, 3, 4].map((n) => (
              <div key={n} className="bg-slate-200 rounded-2xl h-44" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {displayGallery.map((img, index) => (
              <motion.div
                key={img.id || index}
                whileHover={{ scale: 1.02 }}
                className="h-44 sm:h-56 rounded-2xl overflow-hidden shadow-sm border border-slate-200 relative group"
              >
                <img
                  src={img.url || img.image}
                  alt={img.title || "Gallery Item"}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-slate-950/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                  <p className="text-white text-xs font-semibold truncate w-full">{img.title || 'View Event'}</p>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </section>

      {/* Action-Driving Call to Action Section */}
      <section className="mx-4 sm:mx-6 lg:mx-8 mb-24">
        <div className="max-w-7xl mx-auto bg-gradient-to-br from-orange-600 to-amber-500 rounded-3xl shadow-xl shadow-orange-600/10 text-white overflow-hidden relative py-16 px-8 sm:px-12 lg:p-20">
          <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:24px_24px]" />
          <div className="relative z-10 max-w-3xl mx-auto text-center space-y-6">
            <h2 className="text-3xl sm:text-4xl font-black tracking-tight">
              Ready to Spark Real Institutional Reform?
            </h2>
            <p className="text-base sm:text-lg opacity-90 font-medium leading-relaxed max-w-xl mx-auto">
              Your continuous systemic involvement guarantees rapid outreach pipeline generation for hundreds of local communities.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <Link to="/volunteer" className="bg-slate-950 text-white px-8 py-4 rounded-xl font-bold hover:bg-slate-900 transition shadow-lg inline-flex items-center justify-center space-x-2">
                <CheckCircle2 className="h-4 w-4 text-emerald-400 fill-emerald-400" />
                <span>Onboard as Volunteer</span>
              </Link>
              <Link to="/contact" className="border-2 border-white/30 hover:border-white text-white px-8 py-4 rounded-xl font-bold hover:bg-white/10 transition inline-block">
                Corporate Inquiries
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Home