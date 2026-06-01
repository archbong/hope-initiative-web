import { useState } from 'react'
import { motion } from 'framer-motion'
import { Quote, Calendar, MapPin, Heart, ChevronLeft, ChevronRight } from 'lucide-react'
import SEOHead from '../components/SEO/SEOHead'
import { SEO_CONFIG } from '../config/seo.config'

const SuccessStories = () => {
  const [currentIndex, setCurrentIndex] = useState(0)

  const stories = [
    {
      id: 1,
      name: 'Blessing Okoro',
      age: 16,
      location: 'Abuja, Nigeria',
      story: 'After losing both parents at age 12, I thought my dreams were over. Hope for the Hopeless took me in, provided food, shelter, and most importantly, hope. Today, I\'m in school studying to become a doctor to help others like me.',
      image: 'https://via.placeholder.com/400x400',
      date: '2024-03-15',
      category: 'Education',
      quote: 'They gave me more than food and shelter - they gave me back my future.'
    },
    {
      id: 2,
      name: 'Emmanuel Adebayo',
      age: 19,
      location: 'Lagos, Nigeria',
      story: 'I was caught in the cycle of drug abuse with no way out. The youth sensitization program showed me a different path. With counseling and support, I\'ve been clean for 18 months and now mentor other young people.',
      image: 'https://via.placeholder.com/400x400',
      date: '2024-03-10',
      category: 'Youth Development',
      quote: 'From addiction to mentoring - transformation is possible with the right support.'
    },
    {
      id: 3,
      name: 'Maryam Suleiman',
      age: 28,
      location: 'Kano, Nigeria',
      story: 'As a single mother of three, life was extremely hard. Through the food distribution program, my children never went to bed hungry. Now, I\'ve started a small business with support from their empowerment program.',
      image: 'https://via.placeholder.com/400x400',
      date: '2024-03-05',
      category: 'Family Welfare',
      quote: 'Hope for the Hopeless didn\'t just feed my children - they helped me build a future for them.'
    },
    {
      id: 4,
      name: 'David Okafor',
      age: 22,
      location: 'Port Harcourt, Nigeria',
      story: 'I was recruited into a cult group in my first year of university. The anti-cultism campaign opened my eyes to the dangers. I left the group and now speak to students about making better choices.',
      image: 'https://via.placeholder.com/400x400',
      date: '2024-02-28',
      category: 'Youth Development',
      quote: 'Speaking out saved my life and many others.'
    },
    {
      id: 5,
      name: 'Grace Olamide',
      age: 8,
      location: 'Ibadan, Nigeria',
      story: 'After my mother passed away during childbirth, I was alone. The motherless baby care program gave me a loving home, nutritious food, and the chance to go to school. I want to become a teacher someday.',
      image: 'https://via.placeholder.com/400x400',
      date: '2024-02-20',
      category: 'Humanitarian',
      quote: 'I have a family now, and I know I\'m loved.'
    },
    {
      id: 6,
      name: 'Pastor James & Mrs. Grace Ogunlesi',
      age: 45,
      location: 'Benin City, Nigeria',
      story: 'We struggled with infertility for 15 years. The counseling services and family planning program gave us guidance and emotional support. Today, we have adopted two beautiful children and run a support group for other couples.',
      image: 'https://via.placeholder.com/400x400',
      date: '2024-02-15',
      category: 'Family Welfare',
      quote: 'Our family is complete because someone cared enough to help.'
    }
  ]

  const categories = ['All', 'Youth Development', 'Humanitarian', 'Family Welfare', 'Education']
  const [selectedCategory, setSelectedCategory] = useState('All')

  const filteredStories = selectedCategory === 'All'
    ? stories
    : stories.filter(story => story.category === selectedCategory)

  const nextStory = () => {
    setCurrentIndex((prev) => (prev + 1) % filteredStories.length)
  }

  const prevStory = () => {
    setCurrentIndex((prev) => (prev - 1 + filteredStories.length) % filteredStories.length)
  }

  return (
    <div>
      <SEOHead
        title={SEO_CONFIG.pages.successStories.title}
        description={SEO_CONFIG.pages.successStories.description}
        keywords={SEO_CONFIG.pages.successStories.keywords}
        image={SEO_CONFIG.pages.successStories.image}
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
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Success Stories</h1>
            <p className="text-lg md:text-xl opacity-90">
              Real lives transformed through hope, support, and community
            </p>
          </motion.div>
        </div>
      </section>

      {/* Featured Story Carousel */}
      <section className="py-16 bg-gray-50">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-secondary-dark mb-4">
              Featured Story
            </h2>
            <div className="w-24 h-1 bg-primary-orange mx-auto"></div>
          </div>

          {filteredStories.length > 0 && (
            <div className="relative">
              <button
                onClick={prevStory}
                className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-2 shadow-lg hover:bg-gray-100 z-10"
              >
                <ChevronLeft className="h-6 w-6 text-primary-blue" />
              </button>

              <div className="mx-12">
                <motion.div
                  key={currentIndex}
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5 }}
                  className="bg-white rounded-xl shadow-xl overflow-hidden"
                >
                  <div className="grid grid-cols-1 lg:grid-cols-2">
                    <div className="h-64 lg:h-full bg-gradient-to-br from-primary-blue to-primary-green flex items-center justify-center">
                      <Quote className="h-32 w-32 text-white opacity-30" />
                    </div>
                    <div className="p-8">
                      <div className="flex items-center justify-between mb-4">
                        <span className="bg-primary-orange text-white px-3 py-1 rounded-full text-sm">
                          {filteredStories[currentIndex].category}
                        </span>
                        <div className="flex items-center text-secondary-gray text-sm">
                          <Calendar className="h-4 w-4 mr-1" />
                          {new Date(filteredStories[currentIndex].date).toLocaleDateString()}
                        </div>
                      </div>
                      <h3 className="text-2xl font-bold mb-2">{filteredStories[currentIndex].name}</h3>
                      <div className="flex items-center text-secondary-gray mb-4">
                        <MapPin className="h-4 w-4 mr-1" />
                        {filteredStories[currentIndex].location}
                      </div>
                      <p className="text-secondary-gray leading-relaxed mb-4">
                        {filteredStories[currentIndex].story}
                      </p>
                      <div className="bg-gray-50 rounded-lg p-4 italic">
                        <Quote className="h-8 w-8 text-primary-orange opacity-50 mb-2" />
                        <p className="text-secondary-dark font-medium">
                          "{filteredStories[currentIndex].quote}"
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>

              <button
                onClick={nextStory}
                className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-2 shadow-lg hover:bg-gray-100 z-10"
              >
                <ChevronRight className="h-6 w-6 text-primary-blue" />
              </button>
            </div>
          )}
        </div>
      </section>

      {/* All Stories Grid */}
      <section className="py-16">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-secondary-dark mb-4">
              More Transformation Stories
            </h2>
            <p className="text-lg text-secondary-gray">
              Every life changed is a testament to hope
            </p>
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-2 rounded-full font-semibold transition-all duration-300 ${selectedCategory === category
                  ? 'bg-primary-blue text-white shadow-lg'
                  : 'bg-gray-100 text-secondary-gray hover:bg-gray-200'
                  }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Stories Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredStories.map((story, index) => (
              <motion.div
                key={story.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
              >
                <div className="h-48 bg-gradient-to-br from-primary-blue to-primary-green relative overflow-hidden">
                  <Heart className="absolute inset-0 m-auto h-20 w-20 text-white opacity-20 group-hover:scale-110 transition-transform duration-500" />
                  <div className="absolute top-4 right-4 bg-primary-orange text-white px-3 py-1 rounded-full text-xs font-semibold">
                    {story.category}
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-1">{story.name}</h3>
                  <div className="flex items-center text-secondary-gray text-sm mb-3">
                    <MapPin className="h-3 w-3 mr-1" />
                    {story.location}
                  </div>
                  <p className="text-secondary-gray text-sm leading-relaxed mb-4 line-clamp-3">
                    {story.story}
                  </p>
                  <div className="border-t pt-4">
                    <div className="text-xs text-secondary-gray flex items-center">
                      <Calendar className="h-3 w-3 mr-1" />
                      {new Date(story.date).toLocaleDateString()}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {filteredStories.length === 0 && (
            <div className="text-center py-12">
              <p className="text-secondary-gray">No stories found in this category.</p>
            </div>
          )}
        </div>
      </section>

      {/* Share Your Story CTA */}
      <section className="py-16 bg-primary-orange text-white">
        <div className="container-custom text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Have a Story to Share?
          </h2>
          <p className="text-lg mb-8 opacity-90 max-w-2xl mx-auto">
            Your journey of transformation could inspire others. Share your story with us.
          </p>
          <a href="/contact" className="bg-white text-primary-orange px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition inline-block">
            Share Your Story
          </a>
        </div>
      </section>
    </div>
  )
}

export default SuccessStories