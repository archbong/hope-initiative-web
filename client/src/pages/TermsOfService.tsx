import { motion } from 'framer-motion'
import { FileText, CheckCircle, AlertCircle, Shield, Users, Handshake, Scale } from 'lucide-react'

const TermsOfService = () => {
  const sections = [
    {
      icon: FileText,
      title: 'Acceptance of Terms',
      content: `By accessing and using the Hope for the Hopeless Initiative website, you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our website or services.

      We reserve the right to modify these terms at any time. Your continued use of the website after changes constitutes acceptance of the modified terms.`
    },
    {
      icon: Users,
      title: 'Use of Website',
      content: `You agree to use our website for lawful purposes only. You may not:
      
      • Violate any applicable laws or regulations
      • Infringe on the rights of others
      • Interfere with website operations
      • Attempt to gain unauthorized access
      • Transmit malicious code or viruses
      • Collect user information without consent
      • Engage in fraudulent or deceptive activities
      
      We reserve the right to restrict or terminate access to users who violate these terms.`
    },
    {
      icon: Handshake,
      title: 'Donations and Payments',
      content: `All donations made to Hope for the Hopeless Initiative are voluntary and non-refundable. By making a donation, you confirm that:
      
      • You are authorized to use the payment method
      • Your donation is legal in your jurisdiction
      • You understand that donations are charitable contributions
      
      We provide tax receipts for all donations in compliance with applicable laws. Donations will be used in accordance with our mission and donor intent to the extent possible.`
    },
    {
      icon: Shield,
      title: 'Intellectual Property',
      content: `All content on this website, including text, graphics, logos, images, and software, is the property of Hope for the Hopeless Initiative or its content suppliers and is protected by copyright and intellectual property laws.

      You may:
      • View and download content for personal, non-commercial use
      • Share links to our content with attribution
      
      You may not:
      • Republish our content without permission
      • Use our logo or trademarks without authorization
      • Modify or create derivative works
      • Remove copyright notices`
    },
    {
      icon: AlertCircle,
      title: 'Third-Party Links',
      content: `Our website may contain links to third-party websites. We are not responsible for the content, privacy practices, or terms of service of these external sites. Links do not imply endorsement of the linked websites.

      You access third-party websites at your own risk. We encourage you to review the terms and privacy policies of any external sites you visit.`
    },
    {
      icon: Scale,
      title: 'Limitation of Liability',
      content: `To the fullest extent permitted by law, Hope for the Hopeless Initiative shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising from your use of our website or services.

      Our total liability for any claim arising from these terms or your use of our website shall not exceed the amount of any donation you have made in the past 12 months.`
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
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Terms of Service</h1>
            <p className="text-lg opacity-90">
              Last Updated: January 1, 2024
            </p>
            <p className="text-md opacity-80 mt-4">
              Please read these terms carefully before using our website and services.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Content */}
      <section className="py-16">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Sidebar */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-1"
            >
              <div className="sticky top-24 bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-lg font-semibold mb-4">Quick Navigation</h3>
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
                    Version 1.0 | January 2024
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
                <div className="flex items-center space-x-3 mb-4">
                  <CheckCircle className="h-8 w-8 text-primary-green" />
                  <h2 className="text-2xl font-bold">Agreement Overview</h2>
                </div>
                <p className="text-secondary-gray leading-relaxed">
                  These Terms of Service constitute a legally binding agreement between you and
                  Hope for the Hopeless Initiative. By accessing or using our website, you acknowledge
                  that you have read, understood, and agree to be bound by these terms.
                </p>
              </div>

              {/* Terms Sections */}
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

              {/* Governing Law */}
              <div className="bg-gray-50 rounded-xl p-8">
                <h2 className="text-2xl font-bold mb-4">Governing Law</h2>
                <p className="text-secondary-gray leading-relaxed mb-4">
                  These terms shall be governed by and construed in accordance with the laws of the
                  Federal Republic of Nigeria, without regard to its conflict of law provisions.
                </p>
                <p className="text-secondary-gray leading-relaxed">
                  Any legal disputes arising from these terms shall be resolved exclusively in the
                  courts of Abuja, Nigeria.
                </p>
              </div>

              {/* Contact */}
              <div className="bg-primary-blue bg-opacity-5 rounded-xl p-8">
                <h2 className="text-2xl font-bold mb-4">Questions?</h2>
                <p className="text-secondary-gray mb-4">
                  If you have any questions about these Terms of Service, please contact us:
                </p>
                <a
                  href="/contact"
                  className="inline-flex items-center space-x-2 text-primary-blue font-semibold hover:text-primary-green transition"
                >
                  <FileText className="h-5 w-5" />
                  <span>Contact Our Legal Team</span>
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default TermsOfService