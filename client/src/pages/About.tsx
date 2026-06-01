import { motion } from 'framer-motion'
import { Heart, Target, Eye, Users, Shield, TrendingUp, Globe, BookOpen } from 'lucide-react'
import { SEO_CONFIG } from '../config/seo.config'
import SEOHead from '../components/SEO/SEOHead'

const About = () => {
  const values = [
    {
      icon: Heart,
      title: 'Compassion',
      description: 'We serve with empathy and care for every individual we encounter.'
    },
    {
      icon: Shield,
      title: 'Integrity',
      description: 'We uphold transparency and accountability in all our actions.'
    },
    {
      icon: TrendingUp,
      title: 'Empowerment',
      description: 'We equip people with opportunities and knowledge for self-sufficiency.'
    },
    {
      icon: Users,
      title: 'Service',
      description: 'We place community impact first in everything we do.'
    },
    {
      icon: Globe,
      title: 'Collaboration',
      description: 'We believe in the power of partnerships for greater impact.'
    },
    {
      icon: BookOpen,
      title: 'Sustainability',
      description: 'We focus on long-term impact and lasting solutions.'
    }
  ]

  const sdgGoals = [
    { number: 1, name: 'No Poverty', color: 'bg-red-600' },
    { number: 2, name: 'Zero Hunger', color: 'bg-yellow-600' },
    { number: 3, name: 'Good Health', color: 'bg-green-600' },
    { number: 4, name: 'Quality Education', color: 'bg-red-500' },
    { number: 5, name: 'Gender Equality', color: 'bg-orange-600' },
    { number: 17, name: 'Partnerships', color: 'bg-blue-800' }
  ]

  return (
    <div>
      <SEOHead
        title={SEO_CONFIG.pages.about.title}
        description={SEO_CONFIG.pages.about.description}
        keywords={SEO_CONFIG.pages.about.keywords}
        image={SEO_CONFIG.pages.about.image}
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
            <h1 className="text-4xl md:text-5xl font-bold mb-4">About Us</h1>
            <p className="text-lg md:text-xl opacity-90">
              Learn about our mission, vision, and the values that drive us to restore hope and transform lives across Nigeria.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Mission & Vision Section */}
      <section className="py-16">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="bg-white rounded-xl shadow-lg p-8 border-t-4 border-primary-blue"
            >
              <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-blue bg-opacity-10 rounded-full mb-4">
                <Target className="h-8 w-8 text-primary-blue" />
              </div>
              <h2 className="text-2xl font-bold mb-4">Our Mission</h2>
              <p className="text-secondary-gray leading-relaxed">
                To restore hope, dignity, and opportunity to vulnerable individuals and communities
                through humanitarian support, youth empowerment, counseling services, entrepreneurial
                development, and strategic partnerships that advance sustainable social impact.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-white rounded-xl shadow-lg p-8 border-t-4 border-primary-green"
            >
              <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-green bg-opacity-10 rounded-full mb-4">
                <Eye className="h-8 w-8 text-primary-green" />
              </div>
              <h2 className="text-2xl font-bold mb-4">Our Vision</h2>
              <p className="text-secondary-gray leading-relaxed">
                To become a leading humanitarian organization that transforms lives, empowers communities,
                supports vulnerable children and families, and contributes meaningfully to sustainable
                development across Nigeria and beyond.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Core Values Section */}
      <section className="py-16 bg-gray-50">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-secondary-dark mb-4">
              Our Core Values
            </h2>
            <p className="text-lg text-secondary-gray max-w-2xl mx-auto">
              These values guide everything we do, from daily operations to long-term strategic planning.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {values.map((value, index) => {
              const Icon = value.icon
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow"
                >
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-primary-orange bg-opacity-10 rounded-lg mb-4">
                    <Icon className="h-6 w-6 text-primary-orange" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{value.title}</h3>
                  <p className="text-secondary-gray">{value.description}</p>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* History Section */}
      <section className="py-16">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl font-bold mb-4">Our Journey</h2>
              <div className="w-20 h-1 bg-primary-orange mb-6"></div>
              <p className="text-secondary-gray mb-4 leading-relaxed">
                Hope for the Hopeless and Orphans Entrepreneurial Initiative was founded with a
                simple but powerful belief: that every person, regardless of their circumstances,
                deserves hope, dignity, and the opportunity to build a better future.
              </p>
              <p className="text-secondary-gray mb-4 leading-relaxed">
                What began as a small community outreach has grown into a comprehensive humanitarian
                organization serving thousands of vulnerable individuals across Nigeria. Our programs
                address critical needs while building sustainable solutions for long-term impact.
              </p>
              <p className="text-secondary-gray leading-relaxed">
                Today, we continue to expand our reach, forge strategic partnerships, and develop
                innovative approaches to serve the most vulnerable members of our society.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative"
            >
              <div className="bg-gradient-to-br from-primary-blue to-primary-green rounded-xl p-8 text-white">
                <h3 className="text-2xl font-bold mb-4">Our Impact So Far</h3>
                <div className="space-y-4">
                  <div>
                    <div className="text-3xl font-bold">1,250+</div>
                    <div className="opacity-90">Children Supported</div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold">8,750+</div>
                    <div className="opacity-90">Meals Distributed</div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold">15+</div>
                    <div className="opacity-90">Communities Impacted</div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* SDG Alignment Section */}
      <section className="py-16 bg-gray-50">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-secondary-dark mb-4">
              Aligned with UN SDGs
            </h2>
            <p className="text-lg text-secondary-gray max-w-2xl mx-auto">
              Our work contributes to the United Nations Sustainable Development Goals
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {sdgGoals.map((goal, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                className="bg-white rounded-lg p-4 text-center shadow-md hover:shadow-lg transition-shadow"
              >
                <div className={`w-16 h-16 ${goal.color} rounded-full flex items-center justify-center mx-auto mb-2 text-white font-bold text-2xl`}>
                  {goal.number}
                </div>
                <p className="text-sm font-semibold text-secondary-dark">{goal.name}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary-orange text-white">
        <div className="container-custom text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Join Us in Making a Difference
          </h2>
          <p className="text-lg mb-8 opacity-90">
            Together, we can restore hope and transform more lives.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="/volunteer" className="bg-white text-primary-orange px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition">
              Become a Volunteer
            </a>
            <a href="/donate" className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-primary-orange transition">
              Support Our Work
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}

export default About