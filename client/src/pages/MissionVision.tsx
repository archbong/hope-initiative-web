import { motion } from 'framer-motion'
import { Target, Eye, Heart, Users, Globe, Megaphone, Handshake, TrendingUp, Building2, Lightbulb } from 'lucide-react'
import SEOHead from '../components/SEO/SEOHead'
import MissionVisionHero from '../components/pages/about/MissionVisionHero'
import StrategicPillar from '../components/pages/about/StrategicPillar'
import missionVisionData from '../data/missionVision.json'
import MissionCard from '../components/pages/about/MissionCard'
import AboutCTA from '../components/pages/about/AboutCTA'

// Map string icon names to components
const iconMap: Record<string, any> = {
  Target, Eye, Heart, Users, Globe, Megaphone, Handshake, TrendingUp, Building2, Lightbulb
}

const MissionVision = () => {
  const { mission, vision, coreObjectives, strategicPillars } = missionVisionData

  return (
    <div className="bg-slate-50 min-h-screen">
      <SEOHead
        title="Mission & Vision - Hope for the Hopeless Initiative"
        description="Our mission is to restore hope, dignity, and opportunity to vulnerable individuals through humanitarian support, youth empowerment, and strategic partnerships."
        keywords="mission, vision, core values, strategic goals, NGO mission Nigeria"
        type="website"
      />

      <MissionVisionHero
        title="Our Mission & Vision"
        subtitle="Guided by purpose, driven by compassion, committed to transformation"
      />

      {/* Mission & Vision Cards */}
      <section className="py-20">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <MissionCard
              title={mission.title}
              description={mission.description}
              IconComponent={Target}
            />
            <MissionCard
              title={vision.title}
              description={vision.description}
              IconComponent={Eye}
            />
          </div>
        </div>
      </section>

      {/* Core Objectives */}
      <section className="py-20 bg-white">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-4">Our Core Objectives</h2>
            <div className="w-20 h-1 bg-sky-600 mx-auto rounded-full"></div>
            <p className="text-slate-500 mt-4 max-w-2xl mx-auto">
              We focus on four key areas to drive sustainable change in communities
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {coreObjectives.map((objective, index) => {
              const Icon = iconMap[objective.icon as keyof typeof iconMap]
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="bg-slate-50 rounded-xl p-6 text-center hover:shadow-lg transition-all duration-300 group"
                >
                  <div className="w-16 h-16 bg-white rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:bg-sky-600 transition-colors duration-300 shadow-sm">
                    <Icon className={`h-8 w-8 ${objective.color} group-hover:text-white transition-colors duration-300`} />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 mb-2">{objective.title}</h3>
                  <p className="text-slate-500 text-sm leading-relaxed">{objective.description}</p>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Strategic Pillars */}
      <section className="py-20 bg-slate-900 text-white">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-black mb-4">Our Strategic Pillars</h2>
            <div className="w-20 h-1 bg-sky-400 mx-auto rounded-full"></div>
            <p className="text-slate-300 mt-4 max-w-2xl mx-auto">
              Building sustainable impact through focused strategic initiatives
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {strategicPillars.map((pillar, index) => {
              const Icon = iconMap[pillar.icon as keyof typeof iconMap]
              return (
                <StrategicPillar
                  key={index}
                  icon={Icon}
                  title={pillar.title}
                  description={pillar.description}
                  stat={pillar.stat}
                  delay={index * 0.1}
                />
              )
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <AboutCTA
        title="Join Us in Our Mission"
        description="Together, we can restore hope and transform lives across Nigeria."
      />
    </div>
  )
}

export default MissionVision