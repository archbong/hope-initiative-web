import { useParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  ArrowLeft,
  CheckCircle,
  Users,
  Calendar,
  Target,
  Trophy,
  ExternalLink
} from 'lucide-react'
import SEOHead from '../components/SEO/SEOHead'
import { SEO_CONFIG } from '../config/seo.config'

const ProgramDetail = () => {
  const { programId } = useParams()

  // Centralized Program Repository
  const programData: Record<string, any> = {
    'youth-development': {
      title: 'Youth Development Program',
      description: 'Empowering the next generation through education, awareness, and leadership development.',
      fullDescription: `Our Youth Development Program is designed to address the unique challenges facing young people in Nigeria today. Through comprehensive workshops, mentorship programs, and awareness campaigns, we equip youth with the skills, knowledge, and confidence they need to succeed.\n\nThe program focuses on building resilience, promoting positive values, and creating pathways to productive futures. We work directly with schools, community centers, and youth groups to reach young people where they are.`,
      impact: '2,500+ youth reached across 15 communities',
      duration: 'Year-round program',
      eligibility: 'Ages 12-25 years',
      category: 'Empowerment',
      initiatives: [
        {
          name: 'Youth Sensitization',
          description: 'Educational programs raising awareness about social issues and personal development',
          achievements: '45 schools visited'
        },
        {
          name: 'Drug Abuse Awareness',
          description: 'Campaigns and workshops educating about substance abuse dangers',
          achievements: '3,000+ students educated'
        },
        {
          name: 'Anti-Cultism Campaigns',
          description: 'Programs discouraging cult involvement and promoting positive peer pressure',
          achievements: '30+ communities engaged'
        },
        {
          name: 'Leadership Development',
          description: 'Training programs building leadership skills and civic responsibility',
          achievements: '500 young leaders trained'
        }
      ],
      image: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=1200'
    },
    'humanitarian-services': {
      title: 'Humanitarian Services',
      description: 'Providing essential support and care to vulnerable individuals and families.',
      fullDescription: `Our Humanitarian Services program addresses immediate needs while building pathways to long-term stability. We provide food, clothing, and essential supplies to those facing crisis situations.\n\nThrough regular distribution events and targeted support programs, we ensure that vulnerable individuals and families have access to basic necessities and compassionate care.`,
      impact: '8,750+ meals distributed, 1,200+ individuals served',
      duration: 'Ongoing',
      eligibility: 'Vulnerable individuals and families',
      category: 'Relief',
      initiatives: [
        {
          name: 'Food Distribution',
          description: 'Regular distribution of nutritious meals and food supplies',
          achievements: '8,750+ meals distributed'
        },
        {
          name: 'Clothing Support',
          description: 'Providing clean clothing to orphans and vulnerable children',
          achievements: '1,200+ individuals served'
        },
        {
          name: 'Orphan Support Programs',
          description: 'Comprehensive care for orphaned children',
          achievements: '250+ orphans supported'
        },
        {
          name: 'Motherless Baby Care',
          description: 'Specialized care for infants without maternal support',
          achievements: '50+ babies cared for'
        }
      ],
      image: 'https://images.unsplash.com/photo-1593113598332-cd288d649433?w=1200'
    }
    // ... Additional programs (Family Welfare, Sustainable Development) can follow the same schema
  }

  const program = programData[programId || '']

  if (!program) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="text-center p-8 bg-white rounded-2xl shadow-sm border border-slate-200">
          <div className="w-16 h-16 bg-rose-50 text-rose-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <Target className="h-8 w-8" />
          </div>
          <h1 className="text-xl font-bold text-slate-900 mb-2">Program Entry Not Found</h1>
          <p className="text-slate-500 text-sm mb-6">The requested humanitarian track does not exist in our current database.</p>
          <Link to="/programs" className="btn-primary inline-flex items-center">
            <ArrowLeft className="h-4 w-4 mr-2" />
            View Active Programs
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-slate-50 min-h-screen antialiased">
      <SEOHead
        title={`${program.title} | ${SEO_CONFIG.pages.programDetail.title}`}
        description={program.description}
        keywords={`${SEO_CONFIG.pages.programDetail.keywords}, ${program.category}, ${program.title}`}
        image={program.image}
        type="article"
      />

      {/* Hero Header */}
      <section className="relative h-[450px] overflow-hidden">
        <img
          src={program.image}
          alt={program.title}
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/80 to-transparent"></div>
        <div className="absolute inset-0 flex items-end pb-12">
          <div className="container-custom">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              className="max-w-3xl"
            >
              <Link to="/programs" className="inline-flex items-center text-emerald-400 text-sm font-bold uppercase tracking-wider mb-6 hover:text-emerald-300 transition-colors">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Return to Directory
              </Link>
              <h1 className="text-4xl md:text-6xl font-black text-white mb-4 leading-tight tracking-tight">
                {program.title}
              </h1>
              <div className="flex flex-wrap gap-4 items-center text-slate-300">
                <span className="px-3 py-1 bg-white/10 backdrop-blur-md rounded-full text-xs font-bold uppercase tracking-widest border border-white/20">
                  {program.category}
                </span>
                <span className="flex items-center text-sm">
                  <Calendar className="h-4 w-4 mr-1.5 text-emerald-500" />
                  {program.duration}
                </span>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Content Architecture */}
      <section className="py-16 container-custom">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">

          {/* Main Narrative Body */}
          <div className="lg:col-span-8">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="bg-white rounded-3xl p-8 md:p-10 shadow-sm border border-slate-100"
            >
              <h2 className="text-2xl font-black text-slate-900 mb-6 flex items-center">
                <span className="w-8 h-1 bg-emerald-500 rounded-full mr-3"></span>
                Executive Summary
              </h2>
              <div className="text-slate-600 space-y-6 text-lg leading-relaxed font-normal">
                {program.fullDescription.split('\n\n').map((paragraph: string, idx: number) => (
                  <p key={idx}>{paragraph}</p>
                ))}
              </div>

              <div className="my-12 h-px bg-slate-100"></div>

              <h2 className="text-2xl font-black text-slate-900 mb-8 flex items-center">
                <span className="w-8 h-1 bg-emerald-500 rounded-full mr-3"></span>
                Current Deployment Tracks
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {program.initiatives.map((initiative: any, idx: number) => (
                  <div key={idx} className="group p-6 rounded-2xl bg-slate-50 border border-slate-100 hover:bg-white hover:border-emerald-200 hover:shadow-xl hover:shadow-emerald-900/5 transition-all duration-300">
                    <div className="w-10 h-10 rounded-xl bg-white border border-slate-100 flex items-center justify-center mb-4 group-hover:bg-emerald-500 group-hover:text-white transition-colors">
                      <CheckCircle className="h-5 w-5" />
                    </div>
                    <h3 className="font-bold text-slate-900 text-lg mb-2">{initiative.name}</h3>
                    <p className="text-slate-500 text-sm leading-relaxed mb-4">{initiative.description}</p>
                    <div className="flex items-center text-[11px] font-black uppercase tracking-widest text-emerald-600 bg-emerald-50 px-3 py-1.5 rounded-lg w-fit">
                      <Trophy className="h-3 w-3 mr-2" />
                      {initiative.achievements}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Tactical Sidebar */}
          <div className="lg:col-span-4">
            <motion.aside
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="sticky top-24 space-y-6"
            >
              {/* Program Statistics Card */}
              <div className="bg-slate-900 text-white rounded-3xl p-8 shadow-2xl shadow-slate-900/20 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 rounded-full -mr-16 -mt-16 blur-3xl"></div>

                <h3 className="text-xl font-black mb-8 border-b border-white/10 pb-4">Program Metrics</h3>

                <div className="space-y-8">
                  <div className="flex items-start">
                    <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center shrink-0 mr-4">
                      <Target className="h-5 w-5 text-emerald-400" />
                    </div>
                    <div>
                      <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">Impact Radius</p>
                      <p className="text-sm font-semibold leading-snug">{program.impact}</p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center shrink-0 mr-4">
                      <Users className="h-5 w-5 text-emerald-400" />
                    </div>
                    <div>
                      <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">Eligibility Criteria</p>
                      <p className="text-sm font-semibold leading-snug">{program.eligibility}</p>
                    </div>
                  </div>
                </div>

                <div className="mt-10 grid grid-cols-1 gap-3">
                  <Link to="/donate" className="w-full bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs font-black uppercase tracking-wider py-4 rounded-xl text-center transition-all flex items-center justify-center">
                    Fuel This Mission
                    <ExternalLink className="h-3.5 w-3.5 ml-2" />
                  </Link>
                  <Link to="/volunteer" className="w-full bg-white/5 hover:bg-white/10 border border-white/10 text-white text-xs font-black uppercase tracking-wider py-4 rounded-xl text-center transition-all">
                    Enlist as Volunteer
                  </Link>
                </div>
              </div>

              {/* Coordinator Context */}
              <div className="bg-white border border-slate-100 rounded-3xl p-6 shadow-sm">
                <h4 className="text-sm font-black text-slate-900 uppercase tracking-tight mb-2">Technical Assistance</h4>
                <p className="text-xs text-slate-500 leading-relaxed mb-4">
                  Require granular data regarding deployment logistics or community partnership frameworks?
                </p>
                <Link to="/contact" className="text-emerald-600 text-xs font-bold flex items-center hover:text-emerald-700">
                  Query Program Coordinator
                  <ArrowLeft className="h-3 w-3 ml-1 rotate-180" />
                </Link>
              </div>
            </motion.aside>
          </div>

        </div>
      </section>
    </div>
  )
}

export default ProgramDetail