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
  TrendingUp,
  Loader2
} from 'lucide-react'
import { Link } from 'react-router-dom'
import { usePrograms } from '../hooks/usePrograms'
import SEOHead from '../components/SEO/SEOHead'
import { SEO_CONFIG } from '../config/seo.config'
import MediaHero from '../components/pages/media/MediaHero'
import { ProgramCard } from '../components/pages/home/ProgramCard'

const Programs = () => {
  const [activeTab, setActiveTab] = useState('youth')
  // const navigate = useNavigate()
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
      <MediaHero
        // iconText="Programs"
        header="Our Strategic"
        title="Frameworks"
        description="Targeted pipelines and structured solutions built to tackle social imbalances across core impact clusters in Nigeria."
      />
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

                      <ProgramCard
                        program={program}
                        index={index}
                        variant="program-page"
                        accentColor={currentTheme.accent}
                        IconComponent={SpecificIcon}
                      />)
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