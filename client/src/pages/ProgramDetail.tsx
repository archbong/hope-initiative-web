import { useParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  ArrowLeft,
  CheckCircle,
  Users,
  Calendar,
  Target
} from 'lucide-react'
import SEOHead from '../components/SEO/SEOHead'
import { SEO_CONFIG } from '../config/seo.config'

const ProgramDetail = () => {
  const { programId } = useParams()

  // This would normally come from an API/database
  const programData: Record<string, any> = {
    'youth-development': {
      title: 'Youth Development Program',
      description: 'Empowering the next generation through education, awareness, and leadership development.',
      fullDescription: `Our Youth Development Program is designed to address the unique challenges facing young people in Nigeria today. Through comprehensive workshops, mentorship programs, and awareness campaigns, we equip youth with the skills, knowledge, and confidence they need to succeed.

      The program focuses on building resilience, promoting positive values, and creating pathways to productive futures. We work directly with schools, community centers, and youth groups to reach young people where they are.`,
      impact: '2,500+ youth reached across 15 communities',
      duration: 'Year-round program',
      eligibility: 'Ages 12-25 years',
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
      fullDescription: `Our Humanitarian Services program addresses immediate needs while building pathways to long-term stability. We provide food, clothing, and essential supplies to those facing crisis situations.

      Through regular distribution events and targeted support programs, we ensure that vulnerable individuals and families have access to basic necessities and compassionate care.`,
      impact: '8,750+ meals distributed, 1,200+ individuals served',
      duration: 'Ongoing',
      eligibility: 'Vulnerable individuals and families',
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
    },
    'family-welfare': {
      title: 'Family Welfare Program',
      description: 'Strengthening families through counseling, education, and support services.',
      fullDescription: `The Family Welfare Program provides comprehensive support to families facing challenges. From professional counseling to health education, we help families build resilience and thrive together.

      Our approach recognizes that healthy families are the foundation of strong communities. We provide tools, resources, and emotional support to help families overcome obstacles and achieve stability.`,
      impact: '300+ families counseled, 1,000+ individuals educated',
      duration: 'Year-round',
      eligibility: 'Families and individuals in need',
      initiatives: [
        {
          name: 'Counseling Services',
          description: 'Professional counseling for families facing challenges',
          achievements: '300+ families counseled'
        },
        {
          name: 'Family Planning Education',
          description: 'Education and resources for informed family planning',
          achievements: '1,000+ individuals educated'
        },
        {
          name: 'Maternal Support',
          description: 'Support programs for expectant mothers',
          achievements: '150+ mothers supported'
        },
        {
          name: 'Community Health Awareness',
          description: 'Health education promoting wellness',
          achievements: '50+ health workshops'
        }
      ],
      image: 'https://images.unsplash.com/photo-1543269865-cbf427effbad?w=1200'
    },
    'sustainable-development': {
      title: 'Sustainable Development',
      description: 'Building long-term solutions through partnerships and empowerment programs.',
      fullDescription: `Our Sustainable Development program focuses on creating lasting change through strategic partnerships and community empowerment. We work with local and international partners to implement projects that build self-sufficiency.

      By addressing root causes and building local capacity, we create solutions that continue to benefit communities long after our direct involvement ends.`,
      impact: '25+ partners, 20+ projects completed',
      duration: 'Long-term projects',
      eligibility: 'Communities and partner organizations',
      initiatives: [
        {
          name: 'Local Partnerships',
          description: 'Collaborating with local organizations',
          achievements: '25+ local partners'
        },
        {
          name: 'International Partnerships',
          description: 'Global collaborations for local impact',
          achievements: '10+ international partners'
        },
        {
          name: 'SDG Initiatives',
          description: 'Programs aligned with UN SDGs',
          achievements: '6 SDGs addressed'
        },
        {
          name: 'Community Empowerment',
          description: 'Projects building self-sufficiency',
          achievements: '20+ projects completed'
        }
      ],
      image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=1200'
    }
  }

  const program = programData[programId || '']

  if (!program) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Program Not Found</h1>
          <Link to="/programs" className="text-primary-blue hover:underline">
            Back to Programs
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div>
      <SEOHead
        title={`${SEO_CONFIG.pages.programDetail.title}${program?.title || 'Program'}`}
        description={program?.description || SEO_CONFIG.pages.programDetail.description}
        keywords={`${SEO_CONFIG.pages.programDetail.keywords}, ${program?.category}, ${program?.title}`}
        image={program?.image || SEO_CONFIG.pages.programDetail.image}
        type="website"
      />
      {/* Hero Section */}
      <section className="relative h-96 bg-cover bg-center" style={{ backgroundImage: `url(${program.image})` }}>
        <div className="absolute inset-0 bg-gradient-to-r from-primary-blue to-primary-green opacity-85"></div>
        <div className="absolute inset-0 flex items-center">
          <div className="container-custom">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-white"
            >
              <Link to="/programs" className="inline-flex items-center text-white mb-4 hover:text-primary-orange transition">
                <ArrowLeft className="h-4 w-4 mr-1" />
                Back to Programs
              </Link>
              <h1 className="text-4xl md:text-5xl font-bold mb-4">{program.title}</h1>
              <p className="text-xl opacity-90 max-w-2xl">{program.description}</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-16">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Main Content */}
            <div className="lg:col-span-2">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <h2 className="text-2xl font-bold mb-4">About This Program</h2>
                <div className="prose prose-lg max-w-none text-secondary-gray mb-8">
                  {program.fullDescription.split('\n\n').map((paragraph: string, idx: number) => (
                    <p key={idx} className="mb-4 leading-relaxed">{paragraph}</p>
                  ))}
                </div>

                <h2 className="text-2xl font-bold mb-4">Key Initiatives</h2>
                <div className="space-y-4 mb-8">
                  {program.initiatives.map((initiative: any, idx: number) => (
                    <div key={idx} className="bg-gray-50 rounded-lg p-4">
                      <div className="flex items-start space-x-3">
                        <CheckCircle className="h-5 w-5 text-primary-green flex-shrink-0 mt-1" />
                        <div>
                          <h3 className="font-semibold text-lg">{initiative.name}</h3>
                          <p className="text-secondary-gray">{initiative.description}</p>
                          <p className="text-sm text-primary-blue mt-2">{initiative.achievements}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* Sidebar */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="bg-white rounded-xl shadow-lg p-6 sticky top-24">
                <h3 className="text-xl font-bold mb-4">Program Details</h3>

                <div className="space-y-4 mb-6">
                  <div className="flex items-start space-x-3">
                    <Target className="h-5 w-5 text-primary-blue flex-shrink-0 mt-1" />
                    <div>
                      <p className="font-semibold">Impact</p>
                      <p className="text-sm text-secondary-gray">{program.impact}</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <Calendar className="h-5 w-5 text-primary-blue flex-shrink-0 mt-1" />
                    <div>
                      <p className="font-semibold">Duration</p>
                      <p className="text-sm text-secondary-gray">{program.duration}</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <Users className="h-5 w-5 text-primary-blue flex-shrink-0 mt-1" />
                    <div>
                      <p className="font-semibold">Eligibility</p>
                      <p className="text-sm text-secondary-gray">{program.eligibility}</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <Link to="/donate" className="block btn-primary text-center">
                    Support This Program
                  </Link>
                  <Link to="/volunteer" className="block btn-outline text-center">
                    Become a Volunteer
                  </Link>
                </div>

                <div className="mt-6 pt-6 border-t">
                  <h4 className="font-semibold mb-2">Want to learn more?</h4>
                  <p className="text-sm text-secondary-gray mb-3">
                    Contact our program coordinator for more information.
                  </p>
                  <Link to="/contact" className="text-primary-blue text-sm font-semibold hover:underline">
                    Contact Us →
                  </Link>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default ProgramDetail