import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Users,
  Heart,
  Home,
  Globe,
  GraduationCap,
  AlertTriangle,
  Shield,
  Utensils,
  Shirt,
  Baby,
  MessageCircle,
  Calendar,
  Handshake,
  Target,
  ArrowUpRight,
  TrendingUp,
  Loader2
} from 'lucide-react'
import { useNavigate, Link } from 'react-router-dom'
import { usePrograms } from '../hooks/usePrograms'
import SEOHead from '../components/SEO/SEOHead'
import { SEO_CONFIG } from '../config/seo.config'

const Programs = () => {
  const [activeTab, setActiveTab] = useState('youth')
  const navigate = useNavigate()
  const { programs, loading, error } = usePrograms()

  const tabs = [
    { id: 'youth', label: 'Youth Development', icon: Users },
    { id: 'humanitarian', label: 'Humanitarian Services', icon: Heart },
    { id: 'family', label: 'Family Welfare', icon: Home },
    { id: 'sustainable', label: 'Sustainable Development', icon: Globe }
  ]

  const getIconComponent = (iconName: string) => {
    const icons: Record<string, any> = {
      GraduationCap, AlertTriangle, Shield, Utensils, Shirt, Baby, MessageCircle, Calendar, Handshake, Target, Users, Heart
    }
    return icons[iconName] || Users
  }

  const getCategoryTheme = (category: string) => {
    const themes: Record<string, { accent: string; bg: string; text: string }> = {
      youth: { accent: 'sky-500', bg: 'bg-sky-50', text: 'text-sky-600' },
      humanitarian: { accent: 'rose-500', bg: 'bg-rose-50', text: 'text-rose-600' },
      family: { accent: 'orange-500', bg: 'bg-orange-50', text: 'text-orange-600' },
      sustainable: { accent: 'emerald-500', bg: 'bg-emerald-50', text: 'text-emerald-600' }
    }
    return themes[category] || { accent: 'blue-500', bg: 'bg-blue-50', text: 'text-blue-600' }
  }

  const filteredPrograms = programs.filter(p => p.category === activeTab)
  const currentTheme = getCategoryTheme(activeTab)

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center">
        <Loader2 className="h-12 w-12 text-slate-800 animate-spin mb-4" />
        <p className="text-slate-500 font-medium tracking-wide">Assembling programmatic infrastructure...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
        <div className="bg-white border border-slate-200 rounded-3xl p-8 max-w-md w-full text-center shadow-xl shadow-slate-100">
          <AlertTriangle className="h-12 w-12 text-rose-500 mx-auto mb-4" />
          <h3 className="text-xl font-bold text-slate-900 mb-2">Failed to load content</h3>
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

  return (
    <div className="bg-slate-50 min-h-screen">
      <SEOHead
        title={SEO_CONFIG.pages.programs.title}
        description={SEO_CONFIG.pages.programs.description}
        keywords={SEO_CONFIG.pages.programs.keywords}
        image={SEO_CONFIG.pages.programs.image}
        type="website"
      />

      {/* Hero Section */}
      <section className="relative bg-slate-950 py-24 overflow-hidden rounded-b-[2.5rem] lg:rounded-b-[4rem]">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5"></div>
        <div className="container-custom relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl"
          >
            <h1 className="text-4xl md:text-6xl font-black text-white mb-6 leading-none tracking-tight">
              Our Strategic <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-amber-300">Frameworks</span>
            </h1>
            <p className="text-lg md:text-xl text-slate-400 max-w-2xl leading-relaxed">
              Targeted pipelines and structured solutions built to tackle social imbalances across core impact clusters in Nigeria.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Tab Navigation */}
      <section className="py-4 sticky top-16 z-40 bg-slate-50/80 backdrop-blur-md border-b border-slate-200/60">
        <div className="container-custom">
          <div className="flex items-center overflow-x-auto no-scrollbar justify-start lg:justify-center gap-2 py-2">
            {tabs.map((tab) => {
              const TabIcon = tab.icon
              const isActive = activeTab === tab.id
              const tabTheme = getCategoryTheme(tab.id)

              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`relative flex items-center space-x-2 shrink-0 px-5 py-3 rounded-2xl font-bold text-sm transition-all tracking-tight ${isActive ? tabTheme.text : 'text-slate-600 hover:text-slate-900'
                    }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeTabGlow"
                      className={`absolute inset-0 ${tabTheme.bg} rounded-2xl border border-${tabTheme.accent}/20`}
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10 flex items-center space-x-2">
                    <TabIcon className="h-4 w-4" />
                    <span>{tab.label}</span>
                  </span>
                </button>
              )
            })}
          </div>
        </div>
      </section>

      {/* Program Grid Content */}
      <section className="py-20">
        <div className="container-custom">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
            >
              {filteredPrograms.length === 0 ? (
                <div className="text-center py-20 bg-white border border-slate-100 rounded-3xl max-w-md mx-auto">
                  <TrendingUp className="h-10 w-10 text-slate-300 mx-auto mb-4" />
                  <h4 className="text-lg font-bold text-slate-800">No active frameworks found</h4>
                  <p className="text-slate-500 text-sm mt-1">Check back soon for updated deployment pipelines.</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {filteredPrograms.map((program, index) => {
                    const SpecificIcon = getIconComponent(program.icon || '')
                    return (
                      <motion.div
                        key={program.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.05 }}
                        whileHover={{ y: -6 }}
                        className="group bg-white rounded-3xl border border-slate-100 hover:border-slate-200 shadow-sm hover:shadow-xl shadow-slate-200/50 transition-all duration-300 flex flex-col overflow-hidden cursor-pointer"
                        onClick={() => navigate(`/programs/${program.slug}`)}
                      >
                        <div className="aspect-video w-full overflow-hidden relative bg-slate-100">
                          <img
                            src={program.image}
                            alt={program.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                            loading="lazy"
                          />
                          <div className="absolute top-4 left-4">
                            <div className={`w-10 h-10 rounded-xl bg-white/90 backdrop-blur-md flex items-center justify-center text-${currentTheme.accent} shadow-md`}>
                              <SpecificIcon className="h-5 w-5" />
                            </div>
                          </div>
                        </div>

                        <div className="p-6 flex flex-col flex-1 justify-between">
                          <div>
                            <h3 className="text-xl font-bold text-slate-900 mb-2 tracking-tight group-hover:text-slate-800 transition-colors">
                              {program.title}
                            </h3>
                            <p className="text-slate-600 text-sm leading-relaxed mb-6 line-clamp-2">
                              {program.description}
                            </p>
                          </div>

                          <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                            <div className="flex flex-col">
                              <span className="text-[11px] font-black uppercase text-slate-400 tracking-wider">Metrics Achieved</span>
                              <span className={`text-sm font-bold text-${currentTheme.accent} tracking-tight`}>
                                {program.impact.split(',')[0]}
                              </span>
                            </div>
                            <div className={`w-8 h-8 rounded-xl ${currentTheme.bg} flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 transform group-hover:translate-x-0 -translate-x-2`}>
                              <ArrowUpRight className={`h-4 w-4 ${currentTheme.text}`} />
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    )
                  })}
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* Premium Impact Panel */}
      <section className="py-24 bg-slate-950 text-white rounded-[2.5rem] lg:rounded-[4rem] mx-4 sm:mx-8 relative overflow-hidden">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl"></div>
        <div className="container-custom relative z-10">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-black mb-4 tracking-tight">Our Operational Performance</h2>
            <p className="text-slate-400 font-medium">Measurable empirical baselines audited across deployment pipelines.</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {[
              { number: '1,250+', label: 'Children Protected' },
              { number: '8,750+', label: 'Nutritional Kits' },
              { number: '3,200+', label: 'Youth Placements' },
              { number: '25+', label: 'Alliances Forged' }
            ].map((stat, index) => (
              <div
                key={index}
                className="bg-white/5 border border-white/10 rounded-3xl p-6 text-center backdrop-blur-sm"
              >
                <div className="text-3xl md:text-4xl font-black tracking-tight mb-1 text-transparent bg-clip-text bg-gradient-to-br from-white to-slate-400">
                  {stat.number}
                </div>
                <div className="text-[11px] uppercase tracking-widest text-slate-400 font-bold leading-tight">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Action / Outreach CTA Section */}
      <section className="py-24">
        <div className="container-custom">
          <div className="bg-white border border-slate-100 rounded-[2.5rem] p-8 md:p-16 text-center shadow-xl shadow-slate-200/40 relative overflow-hidden">
            <div className="relative z-10 max-w-2xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-4 tracking-tight">
                Support Our Field Infrastructure
              </h2>
              <p className="text-slate-500 text-base md:text-lg mb-10 leading-relaxed font-medium">
                Your logistical capital, advisory involvement, or structural grants assist us in scaling operations deep inside compromised locales.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link to="/donate" className="w-full sm:w-auto bg-slate-950 text-white px-8 py-4 rounded-2xl font-bold hover:bg-slate-900 transition text-sm tracking-tight shadow-lg shadow-slate-950/10">
                  Donate to Support
                </Link>
                <Link to="/volunteer" className="w-full sm:w-auto bg-slate-100 text-slate-800 px-8 py-4 rounded-2xl font-bold hover:bg-slate-200 transition text-sm tracking-tight">
                  Become a Volunteer
                </Link>
                <Link to="/partners" className="w-full sm:w-auto border border-slate-200 text-slate-700 px-8 py-4 rounded-2xl font-bold hover:bg-slate-50 transition text-sm tracking-tight">
                  Partner With Us
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Programs