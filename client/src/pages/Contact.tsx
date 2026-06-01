import { useState } from 'react'
import { motion } from 'framer-motion'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Mail, Phone, MapPin, Clock, Send } from 'lucide-react'
import { FacebookIcon, InstagramIcon, LinkedinIcon, TwitterIcon } from '../components/ui/SocialIcons'
import SEOHead from '../components/SEO/SEOHead'
import { SEO_CONFIG } from '../config/seo.config'

const contactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.email('Invalid email address'),
  phone: z.string().optional(),
  subject: z.string().min(5, 'Subject must be at least 5 characters'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
})

type ContactForm = z.infer<typeof contactSchema>

const Contact = () => {
  const [isSubmitted, setIsSubmitted] = useState(false)
  const { register, handleSubmit, formState: { errors }, reset } = useForm<ContactForm>({
    resolver: zodResolver(contactSchema),
  })

  const onSubmit = async (data: ContactForm) => {
    // In MVP, this will send to Netlify Forms or email
    console.log('Contact form:', data)
    setIsSubmitted(true)
    reset()
    setTimeout(() => setIsSubmitted(false), 5000)
  }

  const contactInfo = [
    {
      icon: Mail,
      title: 'Email Us',
      details: ['info@hopeforthehopeless.org', 'support@hopeforthehopeless.org'],
      link: 'mailto:info@hopeforthehopeless.org'
    },
    {
      icon: Phone,
      title: 'Call Us',
      details: ['+234 123 456 7890', '+234 123 456 7891'],
      link: 'tel:+2341234567890'
    },
    {
      icon: MapPin,
      title: 'Visit Us',
      details: ['123 Humanitarian Way', 'Abuja, Nigeria'],
      link: 'https://maps.google.com'
    },
    {
      icon: Clock,
      title: 'Office Hours',
      details: ['Monday - Friday: 9AM - 6PM', 'Saturday: 10AM - 2PM'],
      link: null
    }
  ]

  return (
    <div>
      <SEOHead
        title={SEO_CONFIG.pages.contact.title}
        description={SEO_CONFIG.pages.contact.description}
        keywords={SEO_CONFIG.pages.contact.keywords}
        image={SEO_CONFIG.pages.contact.image}
        type="website"
      />
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-primary-blue to-primary-green text-white py-20">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Contact Us</h1>
            <p className="text-lg md:text-xl opacity-90">
              Get in touch with us. We'd love to hear from you.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="py-16">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {contactInfo.map((item, index) => {
              const Icon = item.icon
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="bg-white rounded-xl shadow-lg p-6 text-center hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
                >
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-blue bg-opacity-10 rounded-full mb-4">
                    <Icon className="h-8 w-8 text-primary-blue" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                  {item.details.map((detail, i) => (
                    <p key={i} className="text-secondary-gray text-sm">
                      {detail}
                    </p>
                  ))}
                  {item.link && (
                    <a
                      href={item.link}
                      className="inline-block mt-3 text-primary-blue text-sm font-semibold hover:text-primary-green transition"
                    >
                      Contact →
                    </a>
                  )}
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Contact Form and Map */}
      <section className="py-16 bg-gray-50">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="bg-white rounded-xl shadow-lg p-8"
            >
              <h2 className="text-2xl font-bold mb-6">Send Us a Message</h2>

              {isSubmitted && (
                <div className="mb-6 p-4 bg-primary-green text-white rounded-lg">
                  Thank you for your message! We'll get back to you soon.
                </div>
              )}

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Your Name *</label>
                  <input
                    {...register('name')}
                    className="w-full px-4 py-2 border rounded-lg focus:ring-primary-blue focus:border-primary-blue"
                    placeholder="John Doe"
                  />
                  {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Email Address *</label>
                  <input
                    type="email"
                    {...register('email')}
                    className="w-full px-4 py-2 border rounded-lg focus:ring-primary-blue focus:border-primary-blue"
                    placeholder="john@example.com"
                  />
                  {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Phone Number</label>
                  <input
                    {...register('phone')}
                    className="w-full px-4 py-2 border rounded-lg focus:ring-primary-blue focus:border-primary-blue"
                    placeholder="+234 123 456 7890"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Subject *</label>
                  <input
                    {...register('subject')}
                    className="w-full px-4 py-2 border rounded-lg focus:ring-primary-blue focus:border-primary-blue"
                    placeholder="How can we help you?"
                  />
                  {errors.subject && <p className="text-red-500 text-sm mt-1">{errors.subject.message}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Message *</label>
                  <textarea
                    {...register('message')}
                    rows={5}
                    className="w-full px-4 py-2 border rounded-lg focus:ring-primary-blue focus:border-primary-blue"
                    placeholder="Tell us how we can assist you..."
                  ></textarea>
                  {errors.message && <p className="text-red-500 text-sm mt-1">{errors.message.message}</p>}
                </div>

                <button type="submit" className="w-full btn-primary flex items-center justify-center space-x-2">
                  <Send className="h-5 w-5" />
                  <span>Send Message</span>
                </button>
              </form>
            </motion.div>

            {/* Google Maps and Social Media */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="space-y-8"
            >
              {/* Map */}
              <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                <div className="h-64 bg-gray-200 relative">
                  {/* Replace with actual Google Maps embed */}
                  <iframe
                    title="Office Location"
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3939.98!2d7.3986!3d9.0722!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x104e0baf7dbe5b3d%3A0x3b8b1c8e5f5b5b5b!2sAbuja%2C%20Nigeria!5e0!3m2!1sen!2s!4v1234567890!5m2!1sen!2s"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                  ></iframe>
                </div>
                <div className="p-4 text-center">
                  <p className="text-secondary-gray text-sm">
                    123 Humanitarian Way, Abuja, Nigeria
                  </p>
                </div>
              </div>

              {/* Social Media Links */}
              <div className="bg-white rounded-xl shadow-lg p-8 text-center">
                <h3 className="text-2xl font-bold mb-4">Connect With Us</h3>
                <p className="text-secondary-gray mb-6">
                  Follow us on social media for updates and impact stories
                </p>
                <div className="flex justify-center space-x-6">
                  <a
                    href="https://facebook.com/hopeforthehopeless"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-blue-600 text-white p-3 rounded-full hover:bg-blue-700 transition transform hover:scale-110"
                    aria-label="Facebook"
                  >
                    <FacebookIcon className="h-6 w-6" />
                  </a>
                  <a
                    href="https://twitter.com/hopeforthehopeless"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-blue-400 text-white p-3 rounded-full hover:bg-blue-500 transition transform hover:scale-110"
                    aria-label="Twitter"
                  >
                    <TwitterIcon className="h-6 w-6" />
                  </a>
                  <a
                    href="https://instagram.com/hopeforthehopeless"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-pink-600 text-white p-3 rounded-full hover:bg-pink-700 transition transform hover:scale-110"
                    aria-label="Instagram"
                  >
                    <InstagramIcon className="h-6 w-6" />
                  </a>
                  <a
                    href="https://linkedin.com/company/hopeforthehopeless"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-blue-700 text-white p-3 rounded-full hover:bg-blue-800 transition transform hover:scale-110"
                    aria-label="LinkedIn"
                  >
                    <LinkedinIcon className="h-6 w-6" />
                  </a>
                </div>
              </div>

              {/* Emergency Contact */}
              <div className="bg-primary-orange text-white rounded-xl shadow-lg p-8 text-center">
                <h3 className="text-2xl font-bold mb-2">Emergency Assistance</h3>
                <p className="mb-4 opacity-90">
                  For urgent humanitarian needs, please call our emergency hotline
                </p>
                <a
                  href="tel:+2341234567890"
                  className="inline-block bg-white text-primary-orange px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition"
                >
                  Call Emergency Line: +234 123 456 7890
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-secondary-dark mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-lg text-secondary-gray">
              Find quick answers to common questions
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {[
              {
                q: 'How can I volunteer?',
                a: 'Visit our Volunteer page to fill out an application form. We\'ll review and contact you within 3-5 business days.'
              },
              {
                q: 'How do I make a donation?',
                a: 'You can donate via bank transfer using the account details on our Donate page. Online payment options coming soon.'
              },
              {
                q: 'How are donations used?',
                a: 'We publish annual reports showing exactly how funds are used. Over 85% goes directly to program services.'
              },
              {
                q: 'Can I partner with your organization?',
                a: 'Yes! Visit our Partners page or contact us directly to discuss partnership opportunities.'
              }
            ].map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white rounded-xl shadow-lg p-6"
              >
                <h3 className="text-lg font-semibold mb-2 text-primary-blue">{faq.q}</h3>
                <p className="text-secondary-gray">{faq.a}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

export default Contact