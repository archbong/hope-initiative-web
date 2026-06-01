import { motion } from 'framer-motion'
import { Cookie, Settings, Shield, Eye, Info, CheckCircle } from 'lucide-react'

const CookiePolicy = () => {
  const cookieTypes = [
    {
      type: 'Essential Cookies',
      icon: Shield,
      description: 'These cookies are necessary for the website to function properly. They enable core functionality such as security, network management, and accessibility.',
      examples: ['Session management', 'Authentication', 'Load balancing'],
      required: true
    },
    {
      type: 'Preference Cookies',
      icon: Settings,
      description: 'These cookies allow the website to remember choices you make and provide enhanced, personalized features.',
      examples: ['Language preferences', 'Display settings', 'Saved preferences'],
      required: false
    },
    {
      type: 'Analytics Cookies',
      icon: Eye,
      description: 'These cookies help us understand how visitors interact with our website by collecting and reporting information anonymously.',
      examples: ['Page visits', 'Click tracking', 'Time spent on site'],
      required: false
    },
    {
      type: 'Marketing Cookies',
      icon: Info,
      description: 'These cookies track your online activity to help us deliver more relevant content and measure the effectiveness of our campaigns.',
      examples: ['Social media sharing', 'Content recommendations', 'Campaign tracking'],
      required: false
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
            <div className="flex items-center space-x-3 mb-4">
              <Cookie className="h-10 w-10" />
              <h1 className="text-4xl md:text-5xl font-bold">Cookie Policy</h1>
            </div>
            <p className="text-lg opacity-90">
              Last Updated: January 1, 2024
            </p>
            <p className="text-md opacity-80 mt-4">
              Learn about how we use cookies to improve your browsing experience.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Content */}
      <section className="py-16">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto space-y-8">
            {/* Introduction */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="bg-white rounded-xl shadow-lg p-8"
            >
              <h2 className="text-2xl font-bold mb-4">What Are Cookies?</h2>
              <p className="text-secondary-gray leading-relaxed mb-4">
                Cookies are small text files that websites place on your computer, smartphone, or other device
                when you visit. They are widely used to make websites work more efficiently and provide
                information to website owners.
              </p>
              <p className="text-secondary-gray leading-relaxed">
                Cookies help us remember your preferences, understand how you use our website, and improve
                your experience. They do not typically contain any information that personally identifies you.
              </p>
            </motion.div>

            {/* Cookie Types */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="space-y-6"
            >
              <h2 className="text-2xl font-bold">Types of Cookies We Use</h2>
              {cookieTypes.map((cookie, index) => {
                const Icon = cookie.icon
                return (
                  <div key={index} className="bg-white rounded-xl shadow-lg p-8">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <div className="p-2 bg-primary-blue bg-opacity-10 rounded-lg">
                          <Icon className="h-6 w-6 text-primary-blue" />
                        </div>
                        <h3 className="text-xl font-bold">{cookie.type}</h3>
                      </div>
                      {cookie.required ? (
                        <span className="bg-primary-green text-white px-3 py-1 rounded-full text-xs font-semibold">
                          Always Active
                        </span>
                      ) : (
                        <span className="bg-gray-200 text-secondary-gray px-3 py-1 rounded-full text-xs font-semibold">
                          Optional
                        </span>
                      )}
                    </div>
                    <p className="text-secondary-gray leading-relaxed mb-4">
                      {cookie.description}
                    </p>
                    <div className="bg-gray-50 rounded-lg p-4">
                      <p className="text-sm font-semibold mb-2">Examples:</p>
                      <ul className="list-disc list-inside text-sm text-secondary-gray space-y-1">
                        {cookie.examples.map((example, i) => (
                          <li key={i}>{example}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )
              })}
            </motion.div>

            {/* Cookie Management */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="bg-white rounded-xl shadow-lg p-8"
            >
              <h2 className="text-2xl font-bold mb-4">Managing Cookies</h2>
              <p className="text-secondary-gray leading-relaxed mb-4">
                Most web browsers allow you to control cookies through their settings. You can:
              </p>
              <ul className="list-disc list-inside text-secondary-gray space-y-2 mb-6">
                <li>Accept all cookies</li>
                <li>Reject all cookies</li>
                <li>Be notified when a cookie is set</li>
                <li>Delete existing cookies</li>
              </ul>
              <p className="text-secondary-gray leading-relaxed">
                Please note that disabling cookies may affect the functionality of our website and
                your ability to use certain features.
              </p>
            </motion.div>

            {/* Third-Party Cookies */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="bg-white rounded-xl shadow-lg p-8"
            >
              <h2 className="text-2xl font-bold mb-4">Third-Party Cookies</h2>
              <p className="text-secondary-gray leading-relaxed">
                We may also use third-party services that place cookies on our website. These include:
              </p>
              <ul className="list-disc list-inside text-secondary-gray space-y-2 mt-4">
                <li>Google Analytics for website analytics</li>
                <li>Social media platforms for sharing features</li>
                <li>Payment processors for donation handling</li>
              </ul>
              <p className="text-secondary-gray leading-relaxed mt-4">
                These third parties have their own privacy policies and cookie policies. We do not control
                their use of cookies.
              </p>
            </motion.div>

            {/* Consent */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="bg-primary-green bg-opacity-10 rounded-xl p-8 border border-primary-green"
            >
              <div className="flex items-start space-x-4">
                <CheckCircle className="h-6 w-6 text-primary-green flex-shrink-0 mt-1" />
                <div>
                  <h2 className="text-2xl font-bold mb-2">Your Consent</h2>
                  <p className="text-secondary-gray leading-relaxed">
                    By using our website, you consent to our use of cookies as described in this policy.
                    You can withdraw your consent at any time by adjusting your browser settings or
                    clearing cookies.
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Updates */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.0 }}
              className="bg-white rounded-xl shadow-lg p-8"
            >
              <h2 className="text-2xl font-bold mb-4">Policy Updates</h2>
              <p className="text-secondary-gray leading-relaxed">
                We may update this Cookie Policy from time to time. Any changes will be posted on this
                page with an updated revision date. We encourage you to review this policy periodically
                to stay informed about our use of cookies.
              </p>
            </motion.div>

            {/* Contact */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.2 }}
              className="bg-gray-50 rounded-xl p-8 text-center"
            >
              <h2 className="text-2xl font-bold mb-4">Questions About Cookies?</h2>
              <p className="text-secondary-gray mb-4">
                If you have any questions about our use of cookies, please contact us.
              </p>
              <a
                href="/contact"
                className="inline-flex items-center space-x-2 bg-primary-blue text-white px-6 py-3 rounded-lg font-semibold hover:bg-opacity-90 transition"
              >
                <Info className="h-5 w-5" />
                <span>Contact Us</span>
              </a>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default CookiePolicy