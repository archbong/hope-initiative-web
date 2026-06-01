import { Link } from 'react-router-dom'
import { Heart, Users, TrendingUp, Award, ArrowRight } from 'lucide-react'
import { motion } from 'framer-motion'
import SEOHead from '../components/SEO/SEOHead'

const Home = () => {
  const stats = [
    { icon: Users, label: 'Children Supported', value: '1,250+' },
    { icon: Heart, label: 'Meals Distributed', value: '8,750+' },
    { icon: TrendingUp, label: 'Youth Reached', value: '3,200+' },
    { icon: Award, label: 'Communities Impacted', value: '15+' },
  ]

  const featuredPrograms = [
    {
      title: 'Youth Development',
      description: 'Empowering young minds through leadership, drug abuse awareness, and anti-cultism campaigns.',
      icon: Users,
    },
    {
      title: 'Food Distribution',
      description: 'Providing nutritious meals and essential supplies to vulnerable families and orphans.',
      icon: Heart,
    },
    {
      title: 'Counseling Services',
      description: 'Professional counseling for families, youth, and individuals facing challenges.',
      icon: Award,
    },
  ]

  return (
    <div>
      <SEOHead
        title="Home"
        description="Hope for the Hopeless Initiative provides humanitarian support, youth empowerment, and community development programs across Nigeria. Join us in restoring hope and transforming lives."
        url="https://hopeforthehopeless.org"
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
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
              Restoring Hope, Transforming Lives
            </h1>
            <p className="text-lg md:text-xl mb-8 opacity-90">
              Empowering vulnerable individuals and communities through humanitarian support,
              youth development, and sustainable partnerships.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/donate" className="btn-secondary inline-block text-center">
                Donate Now
              </Link>
              <Link to="/volunteer" className="btn-outline border-white text-white hover:bg-white hover:text-primary-blue inline-block text-center">
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
            {stats.map((stat, index) => {
              const Icon = stat.icon
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="text-center"
                >
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-blue rounded-full mb-4">
                    <Icon className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-3xl font-bold text-secondary-dark mb-2">{stat.value}</h3>
                  <p className="text-secondary-gray">{stat.label}</p>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="section-title">Our Mission</h2>
            <p className="section-subtitle">
              To restore hope, dignity, and opportunity to vulnerable individuals and communities
              through humanitarian support, youth empowerment, and strategic partnerships.
            </p>
          </div>
        </div>
      </section>

      {/* Featured Programs */}
      <section className="py-16 bg-gray-50">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="section-title">Our Programs</h2>
            <p className="section-subtitle">
              Discover how we're making a difference in communities
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredPrograms.map((program, index) => {
              const Icon = program.icon
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="card p-6"
                >
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-primary-blue rounded-lg mb-4">
                    <Icon className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3">{program.title}</h3>
                  <p className="text-secondary-gray mb-4">{program.description}</p>
                  <Link to="/programs" className="text-primary-blue font-semibold hover:text-primary-green inline-flex items-center">
                    Learn More <ArrowRight className="h-4 w-4 ml-1" />
                  </Link>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary-orange text-white">
        <div className="container-custom text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Make a Difference?
          </h2>
          <p className="text-lg mb-8 opacity-90">
            Join us in our mission to restore hope and transform lives.
          </p>
          <Link to="/volunteer" className="btn-primary bg-white text-primary-orange hover:bg-gray-100">
            Get Involved Today
          </Link>
        </div>
      </section>
    </div>
  )
}

export default Home