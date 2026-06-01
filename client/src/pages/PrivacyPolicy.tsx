import { motion } from 'framer-motion'
import { Shield, Lock, Eye, Database, Mail, Users, FileText } from 'lucide-react'

const PrivacyPolicy = () => {
  const sections = [
    {
      icon: Shield,
      title: 'Information We Collect',
      content: `We collect information you provide directly to us, such as when you create an account, make a donation, sign up for our newsletter, volunteer, or contact us. This may include:
      
      • Name and contact information (email, phone number, address)
      • Payment information (processed securely through third-party processors)
      • Donation history and volunteer preferences
      • Communications and feedback you send to us
      • Information you provide when you participate in our programs`
    },
    {
      icon: Database,
      title: 'How We Use Your Information',
      content: `We use the information we collect to:
      
      • Process donations and provide tax receipts
      • Communicate with you about our programs, events, and impact
      • Coordinate volunteer activities
      • Respond to your inquiries and provide support
      • Improve our website and services
      • Comply with legal obligations
      • Send you newsletters and updates (with your consent)`
    },
    {
      icon: Lock,
      title: 'Information Sharing',
      content: `We do not sell, trade, or rent your personal information to third parties. We may share information:
      
      • With your consent
      • With service providers who assist our operations (payment processing, email delivery)
      • To comply with legal requirements
      • To protect our rights and safety
      • In connection with a merger or acquisition
      
      All third-party service providers are contractually obligated to protect your information.`
    },
    {
      icon: Eye,
      title: 'Data Security',
      content: `We implement appropriate technical and organizational measures to protect your personal information, including:
      
      • SSL/TLS encryption for data transmission
      • Secure data storage systems
      • Regular security assessments
      • Access controls and authentication
      • Employee training on data protection
      
      While we strive to protect your information, no transmission method is 100% secure.`
    },
    {
      icon: Mail,
      title: 'Your Rights',
      content: `You have the right to:
      
      • Access your personal information
      • Correct inaccurate information
      • Request deletion of your information
      • Opt-out of marketing communications
      • Withdraw consent at any time
      • Lodge a complaint with supervisory authorities
      
      To exercise these rights, please contact us at privacy@hopeforthehopeless.org`
    },
    {
      icon: Users,
      title: 'Children\'s Privacy',
      content: `We do not knowingly collect personal information from children under 13 without parental consent. If we learn we have collected information from a child under 13 without verification of parental consent, we will delete that information. Parents or guardians who believe their child has provided us with personal information should contact us.`
    }
  ]

  return (
    <div>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-primary-blue to-primary-green text-white py-16">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Privacy Policy</h1>
            <p className="text-lg opacity-90">
              Last Updated: January 1, 2024
            </p>
            <p className="text-md opacity-80 mt-4">
              Your privacy is important to us. This policy explains how we collect, use, and protect your information.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Content */}
      <section className="py-16">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Sidebar Navigation */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-1"
            >
              <div className="sticky top-24 bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
                <ul className="space-y-2">
                  {sections.map((section, index) => (
                    <li key={index}>
                      <a
                        href={`#section-${index}`}
                        className="flex items-center space-x-2 text-secondary-gray hover:text-primary-blue transition text-sm"
                      >
                        <section.icon className="h-4 w-4" />
                        <span>{section.title}</span>
                      </a>
                    </li>
                  ))}
                </ul>
                <div className="mt-6 pt-6 border-t">
                  <p className="text-xs text-secondary-gray">
                    Effective Date: January 1, 2024
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Main Content */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-3 space-y-8"
            >
              {/* Introduction */}
              <div className="bg-white rounded-xl shadow-lg p-8">
                <h2 className="text-2xl font-bold mb-4">Introduction</h2>
                <p className="text-secondary-gray leading-relaxed mb-4">
                  Hope for the Hopeless Initiative ("we," "our," or "us") is committed to protecting your privacy.
                  This Privacy Policy explains how we collect, use, disclose, and safeguard your information when
                  you visit our website, use our services, or interact with us.
                </p>
                <p className="text-secondary-gray leading-relaxed">
                  By using our website, you consent to the data practices described in this policy. If you do not
                  agree with any part of this policy, please do not use our website or services.
                </p>
              </div>

              {/* Policy Sections */}
              {sections.map((section, index) => {
                const Icon = section.icon
                return (
                  <div
                    key={index}
                    id={`section-${index}`}
                    className="bg-white rounded-xl shadow-lg p-8 scroll-mt-24"
                  >
                    <div className="flex items-center space-x-3 mb-4">
                      <div className="p-2 bg-primary-blue bg-opacity-10 rounded-lg">
                        <Icon className="h-6 w-6 text-primary-blue" />
                      </div>
                      <h2 className="text-2xl font-bold">{section.title}</h2>
                    </div>
                    <div className="text-secondary-gray leading-relaxed whitespace-pre-line">
                      {section.content}
                    </div>
                  </div>
                )
              })}

              {/* Contact Information */}
              <div className="bg-gray-50 rounded-xl p-8">
                <h2 className="text-2xl font-bold mb-4">Contact Us</h2>
                <p className="text-secondary-gray mb-4">
                  If you have questions about this Privacy Policy or our data practices, please contact us:
                </p>
                <div className="space-y-2">
                  <p className="flex items-center space-x-2">
                    <Mail className="h-5 w-5 text-primary-blue" />
                    <span>Email: privacy@hopeforthehopeless.org</span>
                  </p>
                  <p className="flex items-center space-x-2">
                    <FileText className="h-5 w-5 text-primary-blue" />
                    <span>Mail: Hope for the Hopeless Initiative, 123 Humanitarian Way, Abuja, Nigeria</span>
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default PrivacyPolicy