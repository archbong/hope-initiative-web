import { motion } from 'framer-motion'
import {
  Heart, Target, Eye, Users, Shield,
  TrendingUp, Globe, BookOpen, Milestone, HandHeart,
  ArrowRight
} from 'lucide-react'
import { Link } from 'react-router-dom'
import { SEO_CONFIG } from '../config/seo.config'
import SEOHead from '../components/SEO/SEOHead'
import AboutHero from '../components/pages/about/AboutHero'
import MissionCard from '../components/pages/about/MissionCard'
import AboutCTA from '../components/pages/about/AboutCTA'
import { useTranslation } from 'react-i18next'

const About = () => {
  const { t } = useTranslation('about');
  // values
  const compassion = `${t('compassion')}`
  const compassionDescription = `${t('compassionDescription')}`
  const integrity = `${t('integrity')}`
  const integrityDescription = `${t('integrityDescription')}`
  const empowerment = `${t('empowerment')}`
  const empowermentDescription = `${t('empowermentDescription')}`
  const service = `${t('service')}`
  const serviceDescription = `${t('serviceDescription')}`
  const collaboration = `${t('collaboration')}`
  const collaborationDescription = `${t('collaborationDescription')}`
  const sustainability = `${t('sustainability')}`
  const sustainabilityDescription = `${t('sustainabilityDescription')}`
  // sdgGoals
  const noPoverty = `${t('noPoverty')}`
  const zeroHunger = `${t('zeroHunger')}`
  const goodHealth = `${t('goodHealth')}`
  const qualityEducation = `${t('qualityEducation')}`
  const genderEquality = `${t('genderEquality')}`
  const partnerShip = `${t('partnership')}`
  // impact stats
  const childrenSupport = `${t('childrenSupported')}`
  const mealsDistributed = `${t('mealsDistributed')}`
  const communitiesImpacted = `${t('communitiesImpacted')}`

  const ourMission = `${t('ourMission')}`
  const toRestoreHope = `${t('toRestoreHope')}`
  const ourVission = `${t('ourVision')}`
  const becomingLeading = `${t('becomeLeading')}`
  const learnMore = `${t('learnMore')}`
  const leaderShip = `${t('leaderShip')}`
  const value = `${t('values')}`

  // CTA
  const title = `${t('institutionalImpact')}`
  const volunteerButtonText = `${t('join')}`
  const donateButtonText = `${t('partner')}`
  const values = [
    { icon: Heart, title: compassion, description: compassionDescription, color: 'text-rose-500' },
    { icon: Shield, title: integrity, description: integrityDescription, color: 'text-blue-600' },
    { icon: TrendingUp, title: empowerment, description: empowermentDescription, color: 'text-emerald-600' },
    { icon: Users, title: service, description: serviceDescription, color: 'text-orange-600' },
    { icon: Globe, title: collaboration, description: collaborationDescription, color: 'text-indigo-600' },
    { icon: BookOpen, title: sustainability, description: sustainabilityDescription, color: 'text-teal-600' }
  ]

  const sdgGoals = [
    { number: 1, name: noPoverty, color: 'bg-[#E5243B]' },
    { number: 2, name: zeroHunger, color: 'bg-[#DDA63A]' },
    { number: 3, name: goodHealth, color: 'bg-[#4C9F38]' },
    { number: 4, name: qualityEducation, color: 'bg-[#C5192D]' },
    { number: 5, name: genderEquality, color: 'bg-[#FF3A21]' },
    { number: 17, name: partnerShip, color: 'bg-[#19486A]' }
  ]

  const impactStats = [
    { label: childrenSupport, value: '1,250+', icon: HandHeart },
    { label: mealsDistributed, value: '8,750+', icon: Heart },
    { label: communitiesImpacted, value: '15+', icon: Globe },
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
      <AboutHero />

      {/* Mission & Vision Section */}
      <section className="py-24 -mt-12">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <MissionCard
              IconComponent={Target}
              title={ourMission}
              description={toRestoreHope}
            />

            <MissionCard
              IconComponent={Eye}
              title={ourVission}
              description={becomingLeading}
            />
          </div>
          <div className="flex justify-center gap-4 mt-8">
            <Link
              to="/about/mission-vision"
              className="inline-flex items-center space-x-2 text-sky-600 font-semibold hover:text-sky-700 transition"
            >
              <span>{learnMore}</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              to="/about/leadership"
              className="inline-flex items-center space-x-2 text-emerald-600 font-semibold hover:text-emerald-700 transition"
            >
              <span>{leaderShip}</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-20 bg-slate-950 text-white rounded-[3rem] mx-4 sm:mx-8">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-black mb-6">{value}</h2>
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
                <span>{t('ourHeritage')}</span>
              </div>
              <h2 className="text-4xl font-black text-slate-900 leading-tight">{t('milestone')}</h2>
              <div className="space-y-6 text-slate-600 leading-relaxed text-lg">
                <p>
                  {t('founder')}
                </p>
                <p>
                  {t('smallCommunity')}
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
            <h2 className="text-3xl font-black text-slate-900 mb-4">{t('allignedWith')}</h2>
            <p className="text-slate-500 text-lg font-medium italic">{t('contributing')}</p>
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
      <AboutCTA
        title={title}
        volunteerButtonText={volunteerButtonText}
        donateButtonText={donateButtonText}
      />
    </div>
  )
}

export default About