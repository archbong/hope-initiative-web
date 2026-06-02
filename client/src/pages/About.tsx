import { motion } from 'framer-motion'
import { Heart, Target, Eye, Users, Shield, TrendingUp, Globe, BookOpen, Sparkles, Milestone, HandHeart } from 'lucide-react'
import { Link } from 'react-router-dom'
import { SEO_CONFIG } from '../config/seo.config'
import SEOHead from '../components/SEO/SEOHead'

const About = () => {
  const values = [
    { icon: Heart, title: 'Compassion', description: 'We serve with empathy and care for every individual we encounter.', color: 'text-rose-500' },
    { icon: Shield, title: 'Integrity', description: 'We uphold transparency and accountability in all our actions.', color: 'text-blue-600' },
    { icon: TrendingUp, title: 'Empowerment', description: 'We equip people with opportunities and knowledge for self-sufficiency.', color: 'text-emerald-600' },
    { icon: Users, title: 'Service', description: 'We place community impact first in everything we do.', color: 'text-orange-600' },
    { icon: Globe, title: 'Collaboration', description: 'We believe in the power of partnerships for greater impact.', color: 'text-indigo-600' },
    { icon: BookOpen, title: 'Sustainability', description: 'We focus on long-term impact and lasting solutions.', color: 'text-teal-600' }
  ]

  const sdgGoals = [
    { number: 1, name: 'No Poverty', color: 'bg-[#E5243B]' },
    { number: 2, name: 'Zero Hunger', color: 'bg-[#DDA63A]' },
    { number: 3, name: 'Good Health', color: 'bg-[#4C9F38]' },
    { number: 4, name: 'Quality Education', color: 'bg-[#C5192D]' },
    { number: 5, name: 'Gender Equality', color: 'bg-[#FF3A21]' },
    { number: 17, name: 'Partnerships', color: 'bg-[#19486A]' }
  ]

  const impactStats = [
    { label: 'Children Supported', value: '1,250+', icon: HandHeart },
    { label: 'Meals Distributed', value: '8,750+', icon: Heart },
    { label: 'Communities Impacted', value: '15+', icon: Globe },
  ]

  return (
    <div className="bg-slate-50 min-h-screen">
      <SEOHead
        title={SEO_CONFIG.pages.about.title}
        description={SEO_CONFIG.pages.about.description}
        keywords={SEO_CONFIG.pages.about.keywords}
        image={SEO_CONFIG.pages.about.image}
        type="website"
      />

      {/* Hero Section */}
      <section className="relative bg-slate-900 py-24 overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-sky-500/10 rounded-full blur-3xl -mr-20 -mt-20"></div>

        <div className="container-custom relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl"
          >
            <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-md px-4 py-2 rounded-full text-sky-400 text-sm font-bold uppercase tracking-wider mb-6 border border-white/10">
              <Sparkles className="h-4 w-4" />
              <span>Restoring Dignity Since Inception</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-black text-white mb-6 leading-tight">
              Driven by <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-emerald-400">Hope</span>, Guided by Service.
            </h1>
            <p className="text-lg md:text-xl text-slate-300 leading-relaxed max-w-2xl">
              We are a dedicated humanitarian initiative focused on breaking cycles of poverty and providing a safety net for the most vulnerable in our society.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Mission & Vision Section */}
      <section className="py-24 -mt-12">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <motion.div
              whileHover={{ y: -5 }}
              className="bg-white rounded-3xl shadow-xl shadow-slate-200/50 p-10 border border-slate-100 relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 p-8 opacity-5">
                <Target className="h-24 w-24" />
              </div>
              <div className="w-14 h-14 bg-sky-100 rounded-2xl flex items-center justify-center mb-6">
                <Target className="h-7 w-7 text-sky-600" />
              </div>
              <h2 className="text-2xl font-bold text-slate-900 mb-4">Our Mission</h2>
              <p className="text-slate-600 leading-relaxed text-lg">
                To restore hope, dignity, and opportunity through humanitarian support, youth empowerment, and strategic partnerships that advance sustainable social impact.
              </p>
            </motion.div>

            <motion.div
              whileHover={{ y: -5 }}
              className="bg-white rounded-3xl shadow-xl shadow-slate-200/50 p-10 border border-slate-100 relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 p-8 opacity-5">
                <Eye className="h-24 w-24" />
              </div>
              <div className="w-14 h-14 bg-emerald-100 rounded-2xl flex items-center justify-center mb-6">
                <Eye className="h-7 w-7 text-emerald-600" />
              </div>
              <h2 className="text-2xl font-bold text-slate-900 mb-4">Our Vision</h2>
              <p className="text-slate-600 leading-relaxed text-lg">
                To become a leading humanitarian organization that transforms lives and contributes meaningfully to sustainable development across Nigeria and beyond.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-20 bg-slate-950 text-white rounded-[3rem] mx-4 sm:mx-8">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-black mb-6">The Values We Live By</h2>
            <div className="w-24 h-1.5 bg-sky-500 mx-auto rounded-full"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {values.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group"
              >
                <div className="flex items-start space-x-5">
                  <div className={`shrink-0 w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-white transition-colors duration-300`}>
                    <value.icon className={`h-6 w-6 transition-colors duration-300 ${value.color}`} />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2 group-hover:text-sky-400 transition-colors">{value.title}</h3>
                    <p className="text-slate-400 leading-relaxed text-sm">{value.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* History & Impact */}
      <section className="py-24">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <div className="inline-flex items-center space-x-2 text-sky-600 font-bold uppercase tracking-widest text-xs">
                <Milestone className="h-4 w-4" />
                <span>Our Heritage</span>
              </div>
              <h2 className="text-4xl font-black text-slate-900 leading-tight">Every Milestone Has a Face and a Story.</h2>
              <div className="space-y-6 text-slate-600 leading-relaxed text-lg">
                <p>
                  Founded with a simple but powerful belief: that every person, regardless of their circumstances, deserves hope, dignity, and the opportunity to build a better future.
                </p>
                <p>
                  What began as small community outreach has grown into a comprehensive organization serving thousands. We don't just provide aid; we build sustainable ecosystems for growth.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-6">
              {impactStats.map((stat, idx) => (
                <motion.div
                  key={idx}
                  whileHover={{ x: 10 }}
                  className="bg-white border border-slate-100 p-8 rounded-3xl shadow-sm flex items-center justify-between group"
                >
                  <div className="flex items-center space-x-6">
                    <div className="w-14 h-14 bg-slate-50 rounded-2xl flex items-center justify-center group-hover:bg-sky-600 transition-colors">
                      <stat.icon className="h-6 w-6 text-sky-600 group-hover:text-white" />
                    </div>
                    <div>
                      <div className="text-3xl font-black text-slate-900">{stat.value}</div>
                      <div className="text-slate-500 font-medium">{stat.label}</div>
                    </div>
                  </div>
                  <TrendingUp className="h-6 w-6 text-slate-200" />
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* SDG Alignment */}
      <section className="py-24 bg-white">
        <div className="container-custom">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl font-black text-slate-900 mb-4">Aligned with Global Standards</h2>
            <p className="text-slate-500 text-lg font-medium italic">Contributing to the United Nations Sustainable Development Goals</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {sdgGoals.map((goal, index) => (
              <motion.div
                key={index}
                whileHover={{ y: -5 }}
                className="bg-slate-50 rounded-2xl p-6 text-center border border-slate-100 hover:border-slate-200 transition-all shadow-sm"
              >
                <div className={`w-14 h-14 ${goal.color} rounded-lg flex items-center justify-center mx-auto mb-4 text-white font-black text-xl shadow-lg`}>
                  {goal.number}
                </div>
                <p className="text-xs font-black text-slate-700 uppercase tracking-tight leading-tight">{goal.name}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-orange-600 relative overflow-hidden">
        <div className="container-custom relative z-10 text-center">
          <h2 className="text-3xl md:text-5xl font-black text-white mb-8">
            Make an Institutional Impact.
          </h2>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link to="/volunteer" className="bg-slate-950 text-white px-10 py-4 rounded-2xl font-bold hover:bg-slate-900 transition shadow-xl shadow-slate-900/20">
              Join the Movement
            </Link>
            <Link to="/donate" className="bg-white text-orange-600 px-10 py-4 rounded-2xl font-bold hover:bg-slate-50 transition shadow-xl">
              Partner via Donation
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}

export default About