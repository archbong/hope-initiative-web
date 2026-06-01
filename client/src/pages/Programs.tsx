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
  ChevronRight
} from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { usePrograms } from '../hooks/usePrograms'
import SEOHead from '../components/SEO/SEOHead'
import { SEO_CONFIG } from '../config/seo.config'

const Programs = () => {
  const [activeTab, setActiveTab] = useState('youth')
  const navigate = useNavigate();
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

  // const currentProgram = programs[activeTab as keyof typeof programs]

  const filteredPrograms = programs.filter(p => p.category === activeTab)

  const handleProgramClick = (programId: string) => {
    navigate(`/programs/${programId}`)
  }

  // const getColorClasses = (color: string) => {
  //   const colors = {
  //     blue: 'bg-primary-blue',
  //     green: 'bg-primary-green',
  //     orange: 'bg-primary-orange',
  //     red: 'bg-red-500',
  //     pink: 'bg-pink-500',
  //     purple: 'bg-purple-500'
  //   }
  //   return colors[color as keyof typeof colors] || 'bg-primary-blue'
  // }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-blue mx-auto mb-4"></div>
          <p className="text-secondary-gray">Loading programs...</p>
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

  return (
    <div>
      <SEOHead
        title={SEO_CONFIG.pages.programs.title}
        description={SEO_CONFIG.pages.programs.description}
        keywords={SEO_CONFIG.pages.programs.keywords}
        image={SEO_CONFIG.pages.programs.image}
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
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Our Programs & Initiatives</h1>
            <p className="text-lg md:text-xl opacity-90">
              Discover how we're making a difference across four key focus areas
            </p>
          </motion.div>
        </div>
      </section>

      {/* Tab Navigation */}
      <section className="py-8 bg-gray-50 border-b">
        <div className="container-custom">
          <div className="flex flex-wrap justify-center gap-4">
            {tabs.map((tab) => {
              const Icon = tab.icon
              const isActive = activeTab === tab.id
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 px-6 py-3 rounded-lg font-semibold transition-all duration-300 ${isActive
                    ? 'bg-primary-blue text-white shadow-lg transform scale-105'
                    : 'bg-white text-secondary-gray hover:bg-gray-100'
                    }`}
                >
                  <Icon className="h-5 w-5" />
                  <span>{tab.label}</span>
                </button>
              )
            })}
          </div>
        </div>
      </section>

      {/* Program Content */}
      <section className="py-16">
        <div className="container-custom">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
            >
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredPrograms.map((program, index) => (
                  <motion.div
                    key={program.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className="group bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 cursor-pointer"
                    onClick={() => handleProgramClick(program.slug)}
                  >
                    <div className="h-48 overflow-hidden">
                      <img
                        src={program.image}
                        alt={program.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                    </div>
                    <div className="p-6">
                      <h3 className="text-xl font-semibold mb-3">{program.title}</h3>
                      <p className="text-secondary-gray mb-4 line-clamp-2">{program.description}</p>
                      <div className="flex items-center justify-between pt-4 border-t">
                        <span className="text-sm font-semibold text-primary-blue">
                          {program.impact.split(',')[0]}
                        </span>
                        <ChevronRight className="h-5 w-5 text-primary-blue opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </section>
      {/* Impact Numbers Section */}
      <section className="py-16 bg-primary-blue text-white">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Impact</h2>
            <p className="text-lg opacity-90">
              Measurable results from our programs and initiatives
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { number: '1,250+', label: 'Children Supported' },
              { number: '8,750+', label: 'Meals Distributed' },
              { number: '3,200+', label: 'Youth Reached' },
              { number: '25+', label: 'Active Partnerships' }
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="text-4xl md:text-5xl font-bold mb-2">{stat.number}</div>
                <div className="text-sm uppercase tracking-wide opacity-90">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gray-50">
        <div className="container-custom text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-secondary-dark mb-4">
            Want to Support Our Programs?
          </h2>
          <p className="text-lg text-secondary-gray mb-8 max-w-2xl mx-auto">
            Your contribution, whether time, resources, or partnership, helps us reach more people in need.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="/donate" className="btn-primary inline-block">
              Donate to Support
            </a>
            <a href="/volunteer" className="btn-outline inline-block">
              Become a Volunteer
            </a>
            <a href="/partners" className="btn-secondary inline-block">
              Partner With Us
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Programs