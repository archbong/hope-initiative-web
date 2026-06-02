import { motion } from 'framer-motion'
import { Handshake, Globe, Building, Award, ExternalLink, Heart, AlertCircle, RefreshCw } from 'lucide-react'
import { usePartners } from '../hooks/usePartner'
import SEOHead from '../components/SEO/SEOHead'
import { SEO_CONFIG } from '../config/seo.config'

const Partners = () => {
  const {
    corporatePartners,
    internationalPartners,
    localPartners,
    loading,
    error
  } = usePartners()

  const partnershipBenefits = [
    {
      icon: Award,
      title: 'CSR Impact Strategy',
      description: 'Demonstrate concrete corporate commitment to verified social impact pipelines.'
    },
    {
      icon: Globe,
      title: 'Community Integration',
      description: 'Deploy programs directly into key regional networks across Nigeria.'
    },
    {
      icon: Handshake,
      title: 'Collaborative Synergy',
      description: 'Access an active infrastructure of mission-aligned enterprise operations.'
    },
    {
      icon: Heart,
      title: 'Fiscal Optimization',
      description: 'Secure formal compliance reporting for audited corporate tax deductions.'
    }
  ]

  // Full-page structural Error boundary state
  if (error) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center bg-slate-50 font-sans antialiased px-4">
        <div className="text-center max-w-sm bg-white p-8 border border-slate-200/80 rounded-3xl shadow-sm">
          <div className="w-12 h-12 rounded-full bg-rose-50 flex items-center justify-center mx-auto mb-4">
            <AlertCircle className="h-6 w-6 text-rose-600" />
          </div>
          <h2 className="text-base font-black text-slate-900 tracking-tight mb-1">Data Pipeline Interruption</h2>
          <p className="text-xs text-slate-500 font-normal leading-relaxed mb-6">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="inline-flex items-center justify-center space-x-2 w-full bg-slate-950 hover:bg-slate-900 text-white py-2.5 rounded-xl font-black text-xs tracking-tight transition shadow-sm"
          >
            <RefreshCw className="h-3.5 w-3.5" />
            <span>Re-initialize Sync</span>
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-slate-50 min-h-screen font-sans antialiased">
      <SEOHead
        title={SEO_CONFIG.pages.partners.title}
        description={SEO_CONFIG.pages.partners.description}
        keywords={SEO_CONFIG.pages.partners.keywords}
        image={SEO_CONFIG.pages.partners.image}
        type="website"
      />

      {/* Hero Header Frame */}
      <section className="relative bg-slate-950 py-24 overflow-hidden rounded-b-[2.5rem] lg:rounded-b-[4rem]">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5"></div>
        <div className="container-custom relative z-10 text-center max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-flex items-center space-x-1 bg-white/10 text-emerald-400 px-4 py-1.5 rounded-full text-xs font-bold tracking-wide uppercase mb-6 backdrop-blur-sm">
              <Handshake className="h-3.5 w-3.5 mr-1" />
              Strategic Ecosystem
            </span>
            <h1 className="text-4xl md:text-6xl font-black text-white mb-6 tracking-tight leading-none">
              Coordinated Global <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-300">Alliances</span>
            </h1>
            <p className="text-lg text-slate-400 max-w-xl mx-auto leading-relaxed font-normal">
              Unifying regional operational capacity with international enterprise capital to establish sustainable community frameworks.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Partnership Benefits Grid */}
      <section className="py-20 container-custom">
        <div className="text-center max-w-xl mx-auto mb-16">
          <h2 className="text-2xl md:text-3xl font-black text-slate-900 tracking-tight mb-3">
            Institutional Values Delivered
          </h2>
          <p className="text-xs md:text-sm text-slate-500 leading-relaxed font-normal">
            Strategic alignments amplify resource execution velocity while generating trackable social accountability vectors.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {partnershipBenefits.map((benefit, index) => {
            const Icon = benefit.icon
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                className="bg-white border border-slate-100 p-6 rounded-2xl shadow-sm shadow-slate-100/50 hover:border-slate-200 transition-all group"
              >
                <div className="inline-flex items-center justify-center w-10 h-10 bg-slate-50 border border-slate-100 rounded-xl mb-4 group-hover:scale-105 transition-transform">
                  <Icon className="h-5 w-5 text-slate-950" />
                </div>
                <h3 className="text-sm font-black text-slate-900 tracking-tight mb-1.5">{benefit.title}</h3>
                <p className="text-xs text-slate-500 leading-relaxed font-normal">{benefit.description}</p>
              </motion.div>
            )
          })}
        </div>
      </section>

      {/* Corporate Portfolio Section */}
      <section className="py-16 bg-white border-y border-slate-200/50">
        <div className="container-custom">
          <div className="mb-12">
            <div className="text-xs font-bold text-emerald-600 uppercase tracking-widest mb-1">Enterprise Sector</div>
            <h2 className="text-2xl font-black text-slate-900 tracking-tight">Corporate Architecture</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {loading ? (
              Array.from({ length: 3 }).map((_, idx) => (
                <div key={idx} className="border border-slate-100 rounded-2xl p-6 space-y-4 bg-slate-50/50 animate-pulse">
                  <div className="h-24 bg-slate-200 rounded-xl w-full" />
                  <div className="h-4 bg-slate-200 rounded w-1/2" />
                  <div className="h-3 bg-slate-200 rounded w-5/6" />
                </div>
              ))
            ) : (
              corporatePartners.map((partner, index) => (
                <motion.div
                  key={partner.id}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.05 }}
                  className="bg-slate-50/50 border border-slate-100 rounded-2xl overflow-hidden hover:bg-white hover:border-slate-200 transition-all flex flex-col justify-between"
                >
                  <div className="h-28 bg-white border-b border-slate-100 flex items-center justify-center p-6 relative">
                    <img
                      src={partner.logo}
                      alt={`${partner.name} alignment identifier`}
                      className="max-h-full max-w-[160px] object-contain grayscale opacity-70 hover:grayscale-0 hover:opacity-100 transition-all duration-300"
                    />
                  </div>
                  <div className="p-6 flex-grow flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="text-sm font-black text-slate-900 tracking-tight">{partner.name}</h3>
                        <Building className="h-4 w-4 text-slate-400" />
                      </div>
                      <p className="text-xs text-slate-500 leading-relaxed font-normal mb-6">{partner.description}</p>
                    </div>
                    <a
                      href={partner.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center text-xs font-bold text-slate-950 hover:text-slate-700 transition space-x-1.5 border-t border-slate-100/80 pt-3"
                    >
                      <span>Analyze Corporate Interface</span>
                      <ExternalLink className="h-3 w-3" />
                    </a>
                  </div>
                </motion.div>
              ))
            )}
          </div>
        </div>
      </section>

      {/* Global & NGO Portfolio Sections */}
      {[
        { data: internationalPartners, label: 'Global Development Agencies', typeIcon: Globe, subtitle: 'International Infrastructure' },
        { data: localPartners, label: 'Community Executions', typeIcon: Handshake, subtitle: 'Regional Implementation' }
      ].map((sectionGroup, sectionIdx) => {
        if (!loading && sectionGroup.data.length === 0) return null
        const TypeIcon = sectionGroup.typeIcon

        return (
          <section key={sectionIdx} className={`py-16 ${sectionIdx % 2 === 1 ? 'bg-white border-b border-slate-200/50' : ''}`}>
            <div className="container-custom">
              <div className="mb-12">
                <div className="text-xs font-bold text-emerald-600 uppercase tracking-widest mb-1">{sectionGroup.subtitle}</div>
                <h2 className="text-2xl font-black text-slate-900 tracking-tight">{sectionGroup.label}</h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {loading ? (
                  Array.from({ length: 3 }).map((_, idx) => (
                    <div key={idx} className="border border-slate-100 rounded-2xl p-6 space-y-4 bg-slate-50/50 animate-pulse">
                      <div className="h-24 bg-slate-200 rounded-xl w-full" />
                      <div className="h-4 bg-slate-200 rounded w-1/3" />
                    </div>
                  ))
                ) : (
                  sectionGroup.data.map((partner, index) => (
                    <motion.div
                      key={partner.id}
                      initial={{ opacity: 0, y: 15 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: index * 0.05 }}
                      className="bg-slate-50/50 border border-slate-100 rounded-2xl overflow-hidden hover:bg-white hover:border-slate-200 transition-all flex flex-col justify-between"
                    >
                      <div className="h-28 bg-white border-b border-slate-100 flex items-center justify-center p-6">
                        <img
                          src={partner.logo}
                          alt={`${partner.name} alignment identifier`}
                          className="max-h-full max-w-[160px] object-contain grayscale opacity-70 hover:grayscale-0 hover:opacity-100 transition-all duration-300"
                        />
                      </div>
                      <div className="p-6 flex-grow flex flex-col justify-between">
                        <div>
                          <div className="flex items-center justify-between mb-2">
                            <h3 className="text-sm font-black text-slate-900 tracking-tight">{partner.name}</h3>
                            <TypeIcon className="h-4 w-4 text-slate-400" />
                          </div>
                          <p className="text-xs text-slate-500 leading-relaxed font-normal mb-6">{partner.description}</p>
                        </div>
                        <a
                          href={partner.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center text-xs font-bold text-slate-950 hover:text-slate-700 transition space-x-1.5 border-t border-slate-100/80 pt-3"
                        >
                          <span>Review Network Profile</span>
                          <ExternalLink className="h-3 w-3" />
                        </a>
                      </div>
                    </motion.div>
                  ))
                )}
              </div>
            </div>
          </section>
        )
      })}

      {/* Engagement Invitation CTA */}
      <section className="bg-slate-950 text-white rounded-t-[2.5rem] lg:rounded-t-[4rem] relative overflow-hidden py-20">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5"></div>
        <div className="container-custom relative z-10 text-center max-w-2xl">
          <h2 className="text-3xl md:text-4xl font-black tracking-tight mb-4">
            Initialize Joint Enterprise Frameworks
          </h2>
          <p className="text-xs md:text-sm text-slate-400 font-normal leading-relaxed mb-8 max-w-md mx-auto">
            Integrate your systemic capabilities into our regional network infrastructure to deploy verified community resources.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a
              href="/contact"
              className="bg-white text-slate-950 hover:bg-slate-100 px-6 py-3 rounded-xl font-black text-xs tracking-tight shadow-lg transition"
            >
              Establish Intent Protocol
            </a>
            <a
              href="/donate"
              className="border border-white/20 text-white hover:bg-white/5 px-6 py-3 rounded-xl font-black text-xs tracking-tight transition"
            >
              Direct Capital Deployments
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Partners