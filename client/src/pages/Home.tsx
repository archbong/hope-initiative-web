import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Heart, Users, TrendingUp, Award, ArrowRight } from 'lucide-react'
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

  // Fetch featured programs
  const {
    programs: featuredPrograms,
    loading: programsLoading,
    fetchPrograms
  } = usePrograms()

  // Fetch featured stories
  const {
    stories: featuredStories,
    loading: storiesLoading,
    fetchStories
  } = useStories()

  // Fetch recent gallery images
  const {
    images: galleryImages,
    loading: galleryLoading,
    fetchImages
  } = useGallery()

  // Load data on mount
  useEffect(() => {
    fetchPrograms({ featured: true })
    fetchStories({ featured: true })
    fetchImages()
  }, []) // Empty dependency array - only run once

  // Animate stats counter
  useEffect(() => {
    const targetStats = {
      childrenSupported: 1250,
      mealsDistributed: 8750,
      youthReached: 3200,
      communitiesImpacted: 15
    }

    const duration = 2000
    const interval = 20
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

      if (currentStep >= steps) {
        clearInterval(timer)
      }
    }, interval)

    return () => clearInterval(timer)
  }, []) // Empty dependency array - only run once

  const statItems = [
    { icon: Users, label: 'Children Supported', value: stats.childrenSupported, suffix: '+' },
    { icon: Heart, label: 'Meals Distributed', value: stats.mealsDistributed, suffix: '+' },
    { icon: TrendingUp, label: 'Youth Reached', value: stats.youthReached, suffix: '+' },
    { icon: Award, label: 'Communities Impacted', value: stats.communitiesImpacted, suffix: '+' },
  ]

  // Get first 3 programs for featured section
  const displayPrograms = featuredPrograms.slice(0, 3)
  // Get first 3 stories for testimonials
  const displayStories = featuredStories.slice(0, 3)
  // Get first 4 images for gallery preview
  const displayGallery = galleryImages.slice(0, 4)

  return (
    <div>
      <SEOHead
        title={SEO_CONFIG.pages.home.title}
        description={SEO_CONFIG.pages.home.description}
        keywords={SEO_CONFIG.pages.home.keywords}
        image={SEO_CONFIG.pages.home.image}
        url={SEO_CONFIG.siteUrl}
        type="website"
      />
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-primary-blue to-primary-green text-white py-20 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-64 h-64 bg-white rounded-full filter blur-3xl"></div>
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-white rounded-full filter blur-3xl"></div>
        </div>
        <div className="container-custom relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl"
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 leading-tight">
              Restoring Hope, <br />Transforming Lives
            </h1>
            <p className="text-lg md:text-xl mb-8 opacity-90 leading-relaxed">
              Empowering vulnerable individuals and communities through humanitarian support,
              youth development, and sustainable partnerships across Nigeria.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/donate" className="bg-primary-orange text-white px-8 py-3 rounded-lg font-semibold hover:bg-opacity-90 transition-all duration-300 transform hover:scale-105 text-center shadow-lg">
                Donate Now
              </Link>
              <Link to="/volunteer" className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-primary-blue transition-all duration-300 transform hover:scale-105 text-center">
                Become a Volunteer
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gray-50">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {statItems.map((stat, index) => {
              const Icon = stat.icon
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="text-center"
                >
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-blue rounded-full mb-4 shadow-lg">
                    <Icon className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-3xl md:text-4xl font-bold text-secondary-dark mb-2">
                    {stat.value.toLocaleString()}{stat.suffix}
                  </h3>
                  <p className="text-secondary-gray font-medium">{stat.label}</p>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Featured Programs */}
      <section className="py-16 bg-gray-50">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-secondary-dark mb-4">
              Our Programs
            </h2>
            <p className="text-lg text-secondary-gray max-w-2xl mx-auto">
              Discover how we're making a difference in communities
            </p>
          </div>

          {programsLoading ? (
            <div className="flex justify-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-blue"></div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {displayPrograms.map((program, index) => (
                <motion.div
                  key={program.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="group bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
                >
                  <div className="h-48 overflow-hidden">
                    <img
                      src={program.image}
                      alt={program.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = 'https://placehold.co/600x400/e2e8f0/64748b?text=Image+Not+Found'
                      }}
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-semibold mb-3">{program.title}</h3>
                    <p className="text-secondary-gray mb-4 line-clamp-2">{program.description}</p>
                    <Link
                      to={`/programs/${program.slug}`}
                      className="text-primary-blue font-semibold hover:text-primary-green inline-flex items-center group"
                    >
                      Learn More
                      <ArrowRight className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </motion.div>
              ))}
            </div>
          )}

          <div className="text-center mt-12">
            <Link to="/programs" className="btn-outline inline-flex items-center">
              View All Programs
              <ArrowRight className="h-4 w-4 ml-2" />
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary-orange text-white">
        <div className="container-custom text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ready to Make a Difference?
            </h2>
            <p className="text-lg mb-8 opacity-90 max-w-2xl mx-auto">
              Join us in our mission to restore hope and transform lives. Your support can change lives today.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/volunteer" className="bg-white text-primary-orange px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition transform hover:scale-105 inline-block">
                Get Involved Today
              </Link>
              <Link to="/contact" className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-primary-orange transition transform hover:scale-105 inline-block">
                Contact Us
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

export default Home