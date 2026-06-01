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

const Programs = () => {
  const [activeTab, setActiveTab] = useState('youth')

  const tabs = [
    { id: 'youth', label: 'Youth Development', icon: Users },
    { id: 'humanitarian', label: 'Humanitarian Services', icon: Heart },
    { id: 'family', label: 'Family Welfare', icon: Home },
    { id: 'sustainable', label: 'Sustainable Development', icon: Globe }
  ]

  const programs = {
    youth: {
      title: 'Youth Development Programs',
      description: 'Empowering the next generation through education, awareness, and leadership development.',
      initiatives: [
        {
          icon: GraduationCap,
          title: 'Youth Sensitization',
          description: 'Educational programs that raise awareness about important social issues and personal development.',
          impact: '2,500+ youth reached',
          color: 'blue'
        },
        {
          icon: AlertTriangle,
          title: 'Drug Abuse Awareness',
          description: 'Campaigns and workshops educating youth about the dangers of substance abuse and addiction.',
          impact: '45 schools visited',
          color: 'orange'
        },
        {
          icon: Shield,
          title: 'Anti-Cultism Campaigns',
          description: 'Programs that discourage cult involvement and promote positive peer pressure.',
          impact: '30+ communities engaged',
          color: 'green'
        },
        {
          icon: Target,
          title: 'Violence Prevention',
          description: 'Initiatives addressing restiveness and promoting peaceful conflict resolution.',
          impact: '15 workshops held',
          color: 'red'
        },
        {
          icon: Users,
          title: 'Leadership Development',
          description: 'Training programs that build leadership skills and civic responsibility.',
          impact: '500 young leaders trained',
          color: 'purple'
        }
      ]
    },
    humanitarian: {
      title: 'Humanitarian Services',
      description: 'Providing essential support and care to vulnerable individuals and families.',
      initiatives: [
        {
          icon: Utensils,
          title: 'Food Distribution',
          description: 'Regular distribution of nutritious meals and food supplies to families in need.',
          impact: '8,750+ meals distributed',
          color: 'orange'
        },
        {
          icon: Shirt,
          title: 'Clothing Support',
          description: 'Providing clean clothing and essential wear to orphans and vulnerable children.',
          impact: '1,200+ individuals served',
          color: 'blue'
        },
        {
          icon: Baby,
          title: 'Orphan Support Programs',
          description: 'Comprehensive care and support for orphaned and abandoned children.',
          impact: '250+ orphans supported',
          color: 'pink'
        },
        {
          icon: Heart,
          title: 'Motherless Baby Care',
          description: 'Specialized care for infants without maternal support.',
          impact: '50+ babies cared for',
          color: 'purple'
        },
        {
          icon: Users,
          title: 'Community Outreach',
          description: 'Mobile services reaching underserved communities with essential support.',
          impact: '15 communities served',
          color: 'green'
        }
      ]
    },
    family: {
      title: 'Family Welfare Programs',
      description: 'Strengthening families through counseling, education, and support services.',
      initiatives: [
        {
          icon: MessageCircle,
          title: 'Counseling Services',
          description: 'Professional counseling for families facing challenges and crises.',
          impact: '300+ families counseled',
          color: 'blue'
        },
        {
          icon: Calendar,
          title: 'Family Planning Education',
          description: 'Education and resources for informed family planning decisions.',
          impact: '1,000+ individuals educated',
          color: 'green'
        },
        {
          icon: Heart,
          title: 'Maternal Support',
          description: 'Support programs for expectant mothers and new parents.',
          impact: '150+ mothers supported',
          color: 'pink'
        },
        {
          icon: MessageCircle,
          title: 'Pregnancy Counseling',
          description: 'Compassionate guidance and support for pregnancy-related concerns.',
          impact: '200+ counseling sessions',
          color: 'orange'
        },
        {
          icon: Shield,
          title: 'Community Health Awareness',
          description: 'Health education programs promoting wellness and disease prevention.',
          impact: '50+ health workshops',
          color: 'purple'
        }
      ]
    },
    sustainable: {
      title: 'Sustainable Development',
      description: 'Building long-term solutions through partnerships and empowerment programs.',
      initiatives: [
        {
          icon: Handshake,
          title: 'Local Partnerships',
          description: 'Collaborating with local organizations to maximize community impact.',
          impact: '25+ local partners',
          color: 'blue'
        },
        {
          icon: Globe,
          title: 'International Partnerships',
          description: 'Global collaborations bringing resources and expertise to local communities.',
          impact: '10+ international partners',
          color: 'green'
        },
        {
          icon: Target,
          title: 'SDG Initiatives',
          description: 'Programs aligned with UN Sustainable Development Goals.',
          impact: '6 SDGs addressed',
          color: 'orange'
        },
        {
          icon: Users,
          title: 'Community Empowerment',
          description: 'Projects that build self-sufficiency and economic independence.',
          impact: '20+ projects completed',
          color: 'purple'
        }
      ]
    }
  }

  const currentProgram = programs[activeTab as keyof typeof programs]

  const getColorClasses = (color: string) => {
    const colors = {
      blue: 'bg-primary-blue',
      green: 'bg-primary-green',
      orange: 'bg-primary-orange',
      red: 'bg-red-500',
      pink: 'bg-pink-500',
      purple: 'bg-purple-500'
    }
    return colors[color as keyof typeof colors] || 'bg-primary-blue'
  }

  return (
    <div>
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
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold text-secondary-dark mb-4">
                  {currentProgram.title}
                </h2>
                <p className="text-lg text-secondary-gray max-w-2xl mx-auto">
                  {currentProgram.description}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {currentProgram.initiatives.map((initiative, index) => {
                  const Icon = initiative.icon
                  return (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: index * 0.1 }}
                      className="group bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
                    >
                      <div className={`h-2 ${getColorClasses(initiative.color)}`}></div>
                      <div className="p-6">
                        <div className={`inline-flex items-center justify-center w-14 h-14 ${getColorClasses(initiative.color)} bg-opacity-10 rounded-lg mb-4 group-hover:scale-110 transition-transform duration-300`}>
                          <Icon className={`h-7 w-7 ${getColorClasses(initiative.color)} text-white`} />
                        </div>
                        <h3 className="text-xl font-semibold mb-3">{initiative.title}</h3>
                        <p className="text-secondary-gray mb-4 leading-relaxed">
                          {initiative.description}
                        </p>
                        <div className="flex items-center justify-between pt-4 border-t">
                          <span className="text-sm font-semibold text-primary-blue">
                            {initiative.impact}
                          </span>
                          <ChevronRight className="h-5 w-5 text-primary-blue opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        </div>
                      </div>
                    </motion.div>
                  )
                })}
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