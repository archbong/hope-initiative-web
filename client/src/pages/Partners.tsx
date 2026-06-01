import { motion } from 'framer-motion'
import { Handshake, Globe, Building, Award, ExternalLink, Heart } from 'lucide-react'

const Partners = () => {
  const partners = {
    corporate: [
      {
        name: 'First Bank PLC',
        logo: 'https://via.placeholder.com/200x100?text=First+Bank',
        description: 'Supporting our food distribution programs',
        website: 'https://www.firstbanknigeria.com',
        type: 'Corporate Partner'
      },
      {
        name: 'MTN Foundation',
        logo: 'https://via.placeholder.com/200x100?text=MTN',
        description: 'Funding youth empowerment initiatives',
        website: 'https://www.mtn.ng',
        type: 'Corporate Partner'
      },
      {
        name: 'Dangote Foundation',
        logo: 'https://via.placeholder.com/200x100?text=Dangote',
        description: 'Supporting community development projects',
        website: 'https://www.dangote.com',
        type: 'Corporate Partner'
      }
    ],
    international: [
      {
        name: 'UNICEF Nigeria',
        logo: 'https://via.placeholder.com/200x100?text=UNICEF',
        description: 'Collaborating on child welfare programs',
        website: 'https://www.unicef.org/nigeria',
        type: 'International Partner'
      },
      {
        name: 'World Food Programme',
        logo: 'https://via.placeholder.com/200x100?text=WFP',
        description: 'Supporting our food security initiatives',
        website: 'https://www.wfp.org',
        type: 'International Partner'
      },
      {
        name: 'Save the Children',
        logo: 'https://via.placeholder.com/200x100?text=Save+Children',
        description: 'Partnering on orphan support programs',
        website: 'https://www.savethechildren.org',
        type: 'International Partner'
      }
    ],
    local: [
      {
        name: 'Lagos Food Bank',
        logo: 'https://via.placeholder.com/200x100?text=Lagos+Food+Bank',
        description: 'Collaborating on food distribution',
        website: '#',
        type: 'Local Partner'
      },
      {
        name: 'Youth Alive Nigeria',
        logo: 'https://via.placeholder.com/200x100?text=Youth+Alive',
        description: 'Youth development programs',
        website: '#',
        type: 'Local Partner'
      },
      {
        name: 'Red Cross Nigeria',
        logo: 'https://via.placeholder.com/200x100?text=Red+Cross',
        description: 'Emergency response collaboration',
        website: '#',
        type: 'Local Partner'
      }
    ]
  }

  const partnershipBenefits = [
    {
      icon: Award,
      title: 'CSR Impact',
      description: 'Demonstrate your commitment to social responsibility'
    },
    {
      icon: Globe,
      title: 'Community Reach',
      description: 'Connect with communities across Nigeria'
    },
    {
      icon: Handshake,
      title: 'Network Expansion',
      description: 'Join a network of impact-driven organizations'
    },
    {
      icon: Heart,
      title: 'Tax Benefits',
      description: 'Enjoy tax deductions on your contributions'
    }
  ]

  return (
    <div>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-primary-blue to-primary-green text-white py-20">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Our Partners</h1>
            <p className="text-lg md:text-xl opacity-90">
              Collaborating for greater impact and sustainable change
            </p>
          </motion.div>
        </div>
      </section>

      {/* Partnership Benefits */}
      <section className="py-16">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-secondary-dark mb-4">
              Why Partner With Us?
            </h2>
            <p className="text-lg text-secondary-gray max-w-2xl mx-auto">
              Together, we can achieve more and create lasting change
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {partnershipBenefits.map((benefit, index) => {
              const Icon = benefit.icon
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="text-center p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-blue bg-opacity-10 rounded-full mb-4">
                    <Icon className="h-8 w-8 text-primary-blue" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{benefit.title}</h3>
                  <p className="text-secondary-gray">{benefit.description}</p>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Corporate Partners */}
      <section className="py-16 bg-gray-50">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-secondary-dark mb-4">
              Corporate Partners
            </h2>
            <p className="text-lg text-secondary-gray">
              Leading organizations supporting our mission
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {partners.corporate.map((partner, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300"
              >
                <div className="h-32 bg-gray-100 flex items-center justify-center p-6">
                  <img
                    src={partner.logo}
                    alt={partner.name}
                    className="max-h-full w-auto object-contain"
                  />
                </div>
                <div className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-xl font-semibold">{partner.name}</h3>
                    <Building className="h-5 w-5 text-secondary-gray" />
                  </div>
                  <p className="text-secondary-gray mb-4">{partner.description}</p>
                  <a
                    href={partner.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-primary-blue hover:text-primary-green transition"
                  >
                    Visit Website <ExternalLink className="h-4 w-4 ml-1" />
                  </a>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* International Partners */}
      <section className="py-16">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-secondary-dark mb-4">
              International Partners
            </h2>
            <p className="text-lg text-secondary-gray">
              Global collaboration for local impact
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {partners.international.map((partner, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300"
              >
                <div className="h-32 bg-gray-100 flex items-center justify-center p-6">
                  <img
                    src={partner.logo}
                    alt={partner.name}
                    className="max-h-full w-auto object-contain"
                  />
                </div>
                <div className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-xl font-semibold">{partner.name}</h3>
                    <Globe className="h-5 w-5 text-secondary-gray" />
                  </div>
                  <p className="text-secondary-gray mb-4">{partner.description}</p>
                  <a
                    href={partner.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-primary-blue hover:text-primary-green transition"
                  >
                    Visit Website <ExternalLink className="h-4 w-4 ml-1" />
                  </a>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Local Partners */}
      <section className="py-16 bg-gray-50">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-secondary-dark mb-4">
              Local Partners
            </h2>
            <p className="text-lg text-secondary-gray">
              Community organizations making a difference
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {partners.local.map((partner, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300"
              >
                <div className="h-32 bg-gray-100 flex items-center justify-center p-6">
                  <img
                    src={partner.logo}
                    alt={partner.name}
                    className="max-h-full w-auto object-contain"
                  />
                </div>
                <div className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-xl font-semibold">{partner.name}</h3>
                    <Handshake className="h-5 w-5 text-secondary-gray" />
                  </div>
                  <p className="text-secondary-gray mb-4">{partner.description}</p>
                  <a
                    href={partner.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-primary-blue hover:text-primary-green transition"
                  >
                    Learn More <ExternalLink className="h-4 w-4 ml-1" />
                  </a>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Become a Partner CTA */}
      <section className="py-16 bg-primary-orange text-white">
        <div className="container-custom text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Become a Partner
          </h2>
          <p className="text-lg mb-8 opacity-90 max-w-2xl mx-auto">
            Join us in our mission to restore hope and transform lives across Nigeria
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="/contact" className="bg-white text-primary-orange px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition">
              Partner With Us
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

export default Partners