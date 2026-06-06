import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Users, Award, Heart, ArrowRight } from 'lucide-react'
import SEOHead from '../components/SEO/SEOHead'
import MissionVisionHero from '../components/pages/about/MissionVisionHero'
import LeadershipCard from '../components/pages/about/LeadershipCard'
import BoardMemberCard from '../components/pages/about/BoardMemberCard'
import leadershipData from '../data/leadership.json'

const LeadershipTeam = () => {
  const { leadership, boardMembers, advisoryCouncil } = leadershipData
  const featuredLeaders = leadership.filter(l => l.featured)
  const otherLeaders = leadership.filter(l => !l.featured)

  return (
    <div className="bg-slate-50 min-h-screen text-slate-800 antialiased">
      <SEOHead
        title="Leadership Team - Hope for the Hopeless Initiative"
        description="Meet our dedicated leadership team committed to restoring hope and transforming lives across Nigeria."
        keywords="leadership team, board of directors, NGO leadership, humanitarian leaders"
        type="website"
      />

      <MissionVisionHero
        title="Our Leadership Team"
        subtitle="Meet the passionate individuals driving change and leading our mission"
      />

      {/* Executive Leadership (Featured) */}
      <section className="py-24 bg-white border-b border-slate-100">
        <div className="container-custom max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <span className="text-sky-600 font-semibold uppercase tracking-wider text-xs block mb-2">Governance & Strategy</span>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 tracking-tight mb-4">Executive Leadership</h2>
            <div className="h-1 w-12 bg-sky-600 mx-auto mb-4 rounded-full"></div>
            <p className="text-slate-500 max-w-2xl mx-auto text-base md:text-lg leading-relaxed">
              Our executive team brings decades of experience in humanitarian work,
              program management, and community development.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 max-w-5xl mx-auto">
            {featuredLeaders.map((leader, index) => (
              <LeadershipCard
                key={leader.id}
                name={leader.name}
                title={leader.title}
                bio={leader.bio}
                image={leader.image}
                social={leader.social}
                delay={index * 0.1}
                featured={true}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Leadership Team Grid */}
      {otherLeaders.length > 0 && (
        <section className="py-24 bg-slate-50">
          <div className="container-custom max-w-7xl mx-auto px-4">
            <div className="text-center mb-16">
              <span className="text-slate-500 font-semibold uppercase tracking-wider text-xs block mb-2">Management Team</span>
              <h2 className="text-3xl font-bold text-slate-900 tracking-tight mb-4">Leadership Team</h2>
              <p className="text-slate-500 max-w-2xl mx-auto text-base leading-relaxed">
                Dedicated professionals committed to excellence in service delivery and driving operational impact.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {otherLeaders.map((leader, index) => (
                <LeadershipCard
                  key={leader.id}
                  name={leader.name}
                  title={leader.title}
                  bio={leader.bio}
                  image={leader.image}
                  social={leader.social}
                  delay={index * 0.1}
                  featured={false}
                />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Board of Directors */}
      {boardMembers.length > 0 && (
        <section className="py-24 bg-white border-y border-slate-100">
          <div className="container-custom max-w-7xl mx-auto px-4">
            <div className="text-center mb-16">
              <div className="flex items-center justify-center space-x-2 mb-2">
                <Users className="h-5 w-5 text-sky-600" />
                <span className="text-sky-600 font-semibold uppercase tracking-wider text-xs">Oversight</span>
              </div>
              <h2 className="text-3xl font-bold text-slate-900 tracking-tight mb-4">Board of Directors</h2>
              <p className="text-slate-500 max-w-2xl mx-auto text-base leading-relaxed">
                Our board provides strategic guidance, fiduciary oversight, and essential governance.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {boardMembers.map((member, index) => (
                <BoardMemberCard
                  key={member.id}
                  name={member.name}
                  title={member.title}
                  bio={member.bio}
                  image={member.image}
                  delay={index * 0.1}
                />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Advisory Council */}
      {advisoryCouncil.length > 0 && (
        <section className="py-24 bg-slate-50">
          <div className="container-custom max-w-7xl mx-auto px-4">
            <div className="text-center mb-16">
              <div className="flex items-center justify-center space-x-2 mb-2">
                <Award className="h-5 w-5 text-indigo-600" />
                <span className="text-indigo-600 font-semibold uppercase tracking-wider text-xs">Advisory Panel</span>
              </div>
              <h2 className="text-3xl font-bold text-slate-900 tracking-tight mb-4">Advisory Council</h2>
              <p className="text-slate-500 max-w-2xl mx-auto text-base leading-relaxed">
                Expert advisors providing technical guidance, global expertise, and strategic insights.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
              {advisoryCouncil.map((advisor, index) => (
                <motion.div
                  key={advisor.id}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.05 }}
                  className="bg-white rounded-2xl p-8 border border-slate-200/60 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="font-bold text-slate-900 text-lg tracking-tight">{advisor.name}</h3>
                        <p className="text-sky-600 font-medium text-sm mt-0.5">{advisor.title}</p>
                      </div>
                    </div>
                    <span className="inline-block bg-slate-100 text-slate-700 text-xs font-semibold px-2.5 py-1 rounded-md mb-4">
                      {advisor.organization}
                    </span>
                    <p className="text-slate-600 text-sm leading-relaxed border-t border-slate-100 pt-4">
                      {advisor.bio}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Join the Team CTA */}
      <section className="py-24 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(14,165,233,0.1),transparent_45%)]" />
        <div className="container-custom max-w-4xl mx-auto px-4 text-center relative z-10">
          <div className="inline-flex items-center justify-center p-3 bg-white/5 backdrop-blur-sm rounded-full border border-white/10 mb-6">
            <Heart className="h-6 w-6 text-orange-400" />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
            Join Our Mission
          </h2>
          <p className="text-slate-300 text-base md:text-lg mb-10 max-w-xl mx-auto leading-relaxed">
            We are always seeking passionate individuals, experts, and partners to scale our operations and accelerate institutional impact.
          </p>
          <Link
            to="/volunteer"
            className="inline-flex items-center space-x-2.5 bg-orange-500 text-white px-8 py-3.5 rounded-xl font-semibold hover:bg-orange-600 active:scale-[0.98] transition-all shadow-lg shadow-orange-950/20"
          >
            <span>View Opportunities</span>
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </div>
  )
}

export default LeadershipTeam