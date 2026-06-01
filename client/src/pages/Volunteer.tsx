import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Heart, Clock, Users, Award } from 'lucide-react'
import { useVolunteer } from '../hooks/useVolunteer'
import SEOHead from '../components/SEO/SEOHead'
import { SEO_CONFIG } from '../config/seo.config'

const volunteerSchema = z.object({
  fullName: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.email('Invalid email address'),
  phone: z.string().min(10, 'Valid phone number required'),
  interests: z.array(z.string()).min(1, 'Select at least one interest'),
  availability: z.string().min(1, 'Please select availability'),
  message: z.string().optional(),
})

type VolunteerForm = z.infer<typeof volunteerSchema>

const Volunteer = () => {
  const { submitting, submitSuccess, error, submitApplication, getOpportunities, resetStatus } = useVolunteer()
  const [opportunities, setOpportunities] = useState<any[]>([])
  const { register, handleSubmit, formState: { errors }, reset } = useForm<VolunteerForm>({
    resolver: zodResolver(volunteerSchema),
  })

  useEffect(() => {
    const loadOpportunities = async () => {
      const opps = await getOpportunities()
      setOpportunities(opps)
    }
    loadOpportunities()
  }, [getOpportunities])

  const onSubmit = async (data: VolunteerForm) => {
    const success = await submitApplication(data)
    if (success) {
      reset()
      setTimeout(() => {
        resetStatus()
      }, 5000)
    }
  }

  const interestOptions = [
    'Youth Mentoring',
    'Food Distribution',
    'Counseling Support',
    'Event Organization',
    'Fundraising',
    'Administrative Support',
  ]

  return (
    <div>
      <SEOHead
        title={SEO_CONFIG.pages.volunteer.title}
        description={SEO_CONFIG.pages.volunteer.description}
        keywords={SEO_CONFIG.pages.volunteer.keywords}
        image={SEO_CONFIG.pages.volunteer.image}
        type="website"
      />
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary-blue to-primary-green text-white py-16">
        <div className="container-custom text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Become a Volunteer</h1>
          <p className="text-lg max-w-2xl mx-auto">
            Your time and skills can make a lasting impact on vulnerable lives. Join our community of changemakers.
          </p>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {[
              { icon: Heart, title: 'Make a Difference', desc: 'Directly impact lives in your community' },
              { icon: Users, title: 'Grow Skills', desc: 'Develop leadership and teamwork abilities' },
              { icon: Award, title: 'Build Network', desc: 'Connect with like-minded changemakers' },
            ].map((benefit, index) => {
              const Icon = benefit.icon
              return (
                <div key={index} className="text-center p-6 bg-gray-50 rounded-lg">
                  <Icon className="h-12 w-12 text-primary-green mx-auto mb-4" />
                  <h3 className="text-xl font-semibold mb-2">{benefit.title}</h3>
                  <p className="text-secondary-gray">{benefit.desc}</p>
                </div>
              )
            })}
          </div>

          {/* Current Opportunities */}
          {opportunities.length > 0 && (
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-center mb-6">Current Opportunities</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {opportunities.map((opp) => (
                  <div key={opp.id} className="bg-white rounded-lg shadow-md p-6 border-l-4 border-primary-orange">
                    <h3 className="font-semibold text-lg mb-2">{opp.title}</h3>
                    <p className="text-secondary-gray text-sm mb-3">{opp.description}</p>
                    <div className="flex items-center text-sm text-primary-blue mb-2">
                      <Clock className="h-4 w-4 mr-1" />
                      <span>{opp.commitment}</span>
                    </div>
                    <div className="flex items-center text-sm text-primary-green">
                      <Users className="h-4 w-4 mr-1" />
                      <span>{opp.slots} slots available</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Volunteer Form */}
          <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-bold mb-6 text-center">Volunteer Application</h2>

            {submitSuccess && (
              <div className="mb-6 p-4 bg-primary-green text-white rounded-lg">
                Thank you for your interest! We'll contact you within 3-5 business days.
              </div>
            )}

            {error && (
              <div className="mb-6 p-4 bg-red-500 text-white rounded-lg">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Full Name *</label>
                <input
                  {...register('fullName')}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-primary-blue focus:border-primary-blue"
                  placeholder="John Doe"
                  disabled={submitting}
                />
                {errors.fullName && <p className="text-red-500 text-sm mt-1">{errors.fullName.message}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Email *</label>
                <input
                  type="email"
                  {...register('email')}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-primary-blue focus:border-primary-blue"
                  placeholder="john@example.com"
                  disabled={submitting}
                />
                {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Phone *</label>
                <input
                  {...register('phone')}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-primary-blue focus:border-primary-blue"
                  placeholder="+234 123 456 7890"
                  disabled={submitting}
                />
                {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Areas of Interest *</label>
                <div className="grid grid-cols-2 gap-2">
                  {interestOptions.map((interest) => (
                    <label key={interest} className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        value={interest}
                        {...register('interests')}
                        className="rounded"
                        disabled={submitting}
                      />
                      <span className="text-sm">{interest}</span>
                    </label>
                  ))}
                </div>
                {errors.interests && <p className="text-red-500 text-sm mt-1">{errors.interests.message}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Availability *</label>
                <select
                  {...register('availability')}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-primary-blue focus:border-primary-blue"
                  disabled={submitting}
                >
                  <option value="">Select availability</option>
                  <option value="weekdays">Weekdays (Mon-Fri)</option>
                  <option value="weekends">Weekends (Sat-Sun)</option>
                  <option value="evenings">Evenings (After 5PM)</option>
                  <option value="flexible">Flexible</option>
                </select>
                {errors.availability && <p className="text-red-500 text-sm mt-1">{errors.availability.message}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Additional Message</label>
                <textarea
                  {...register('message')}
                  rows={4}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-primary-blue focus:border-primary-blue"
                  placeholder="Tell us why you'd like to volunteer and any relevant experience..."
                  disabled={submitting}
                ></textarea>
              </div>

              <button
                type="submit"
                className="btn-primary w-full flex items-center justify-center space-x-2"
                disabled={submitting}
              >
                {submitting ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    <span>Submitting...</span>
                  </>
                ) : (
                  <span>Submit Application</span>
                )}
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Volunteer