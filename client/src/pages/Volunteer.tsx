import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Heart, CheckCircle } from 'lucide-react'

const volunteerSchema = z.object({
  fullName: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  phone: z.string().min(10, 'Valid phone number required'),
  interests: z.array(z.string()).min(1, 'Select at least one interest'),
  availability: z.string().min(1, 'Please select availability'),
  message: z.string().optional(),
})

type VolunteerForm = z.infer<typeof volunteerSchema>

const Volunteer = () => {
  const [isSubmitted, setIsSubmitted] = useState(false)
  const { register, handleSubmit, formState: { errors }, reset } = useForm<VolunteerForm>({
    resolver: zodResolver(volunteerSchema),
  })

  const onSubmit = async (data: VolunteerForm) => {
    // In MVP, this will send to Netlify Forms or email
    console.log('Volunteer application:', data)
    setIsSubmitted(true)
    reset()
    setTimeout(() => setIsSubmitted(false), 5000)
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
              { title: 'Make a Difference', desc: 'Directly impact lives in your community' },
              { title: 'Grow Skills', desc: 'Develop leadership and teamwork abilities' },
              { title: 'Build Network', desc: 'Connect with like-minded changemakers' },
            ].map((benefit, index) => (
              <div key={index} className="text-center p-6 bg-gray-50 rounded-lg">
                <CheckCircle className="h-12 w-12 text-primary-green mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">{benefit.title}</h3>
                <p className="text-secondary-gray">{benefit.desc}</p>
              </div>
            ))}
          </div>

          {/* Volunteer Form */}
          <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-bold mb-6 text-center">Volunteer Application</h2>

            {isSubmitted && (
              <div className="mb-6 p-4 bg-primary-green text-white rounded-lg">
                Thank you for your interest! We'll contact you soon.
              </div>
            )}

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Full Name *</label>
                <input
                  {...register('fullName')}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-primary-blue focus:border-primary-blue"
                />
                {errors.fullName && <p className="text-red-500 text-sm mt-1">{errors.fullName.message}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Email *</label>
                <input
                  type="email"
                  {...register('email')}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-primary-blue focus:border-primary-blue"
                />
                {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Phone *</label>
                <input
                  {...register('phone')}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-primary-blue focus:border-primary-blue"
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
                >
                  <option value="">Select availability</option>
                  <option value="weekdays">Weekdays</option>
                  <option value="weekends">Weekends</option>
                  <option value="evenings">Evenings</option>
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
                  placeholder="Tell us why you'd like to volunteer..."
                ></textarea>
              </div>

              <button type="submit" className="btn-primary w-full">
                Submit Application
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Volunteer