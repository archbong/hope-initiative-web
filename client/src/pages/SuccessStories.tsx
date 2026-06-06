import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Quote, Calendar, MapPin, Heart, ChevronLeft, ChevronRight, MessageSquare, Sparkles } from 'lucide-react'
import { Link } from 'react-router-dom'
import SEOHead from '../components/SEO/SEOHead'
import { SEO_CONFIG } from '../config/seo.config'
import MediaHero from '../components/pages/media/MediaHero'

interface Story {
  id: number
  name: string
  age: number
  location: string
  story: string
  image: string
  date: string
  category: string
  quote: string
}

const SuccessStories = () => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [selectedCategory, setSelectedCategory] = useState('All')

  const stories: Story[] = [
    {
      id: 1,
      name: 'Blessing Okoro',
      age: 16,
      location: 'Abuja, Nigeria',
      story: "After losing both parents at age 12, I thought my dreams were over. Hope for the Hopeless took me in, provided food, shelter, and most importantly, hope. Today, I'm in school studying to become a doctor to help others like me.",
      image: 'https://images.unsplash.com/photo-1544717305-2782549b5136?w=800',
      date: '2024-03-15',
      category: 'Education',
      quote: 'They gave me more than food and shelter - they gave me back my future.'
    },
    {
      id: 2,
      name: 'Emmanuel Adebayo',
      age: 19,
      location: 'Lagos, Nigeria',
      story: "I was caught in the cycle of drug abuse with no way out. The youth sensitization program showed me a different path. With counseling and support, I've been clean for 18 months and now mentor other young people.",
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800',
      date: '2024-03-10',
      category: 'Youth Development',
      quote: 'From addiction to mentoring - transformation is possible with the right support.'
    },
    {
      id: 3,
      name: 'Maryam Suleiman',
      age: 28,
      location: 'Kano, Nigeria',
      story: "As a single mother of three, life was extremely hard. Through the food distribution program, my children never went to bed hungry. Now, I've started a small business with support from their empowerment program.",
      image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=800',
      date: '2024-03-05',
      category: 'Family Welfare',
      quote: "Hope for the Hopeless didn't just feed my children - they helped me build a future for them."
    },
    {
      id: 4,
      name: 'David Okafor',
      age: 22,
      location: 'Port Harcourt, Nigeria',
      story: 'I was recruited into a cult group in my first year of university. The anti-cultism campaign opened my eyes to the dangers. I left the group and now speak to students about making better choices.',
      image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=800',
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
      image: 'https://images.unsplash.com/photo-1607990283143-e81e7a2c93ab?w=800',
      date: '2024-02-20',
      category: 'Humanitarian',
      quote: "I have a family now, and I know I'm loved."
    },
    {
      id: 6,
      name: 'Pastor James & Mrs. Grace Ogunlesi',
      age: 45,
      location: 'Benin City, Nigeria',
      story: 'We struggled with infertility for 15 years. The counseling services and family planning program gave us guidance and emotional support. Today, we have adopted two beautiful children and run a support group for other couples.',
      image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=800',
      date: '2024-02-15',
      category: 'Family Welfare',
      quote: 'Our family is complete because someone cared enough to help.'
    }
  ]

  const categories = ['All', 'Youth Development', 'Humanitarian', 'Family Welfare', 'Education']

  const filteredStories = selectedCategory === 'All'
    ? stories
    : stories.filter(story => story.category === selectedCategory)

  // Avoid array out of bounds when shifting categories
  useEffect(() => {
    setCurrentIndex(0)
  }, [selectedCategory])

  const nextStory = () => {
    setCurrentIndex((prev) => (prev + 1) % filteredStories.length)
  }

  const prevStory = () => {
    setCurrentIndex((prev) => (prev - 1 + filteredStories.length) % filteredStories.length)
  }

  const getCategoryColor = (category: string) => {
    const tokens: Record<string, string> = {
      'Education': 'bg-sky-50 text-sky-700 border-sky-100',
      'Youth Development': 'bg-purple-50 text-purple-700 border-purple-100',
      'Family Welfare': 'bg-amber-50 text-amber-700 border-amber-100',
      'Humanitarian': 'bg-rose-50 text-rose-700 border-rose-100'
    }
    return tokens[category] || 'bg-slate-50 text-slate-700 border-slate-100'
  }

  return (
    <div className="bg-slate-50 min-h-screen">
      <SEOHead
        title={SEO_CONFIG.pages.successStories.title}
        description={SEO_CONFIG.pages.successStories.description}
        keywords={SEO_CONFIG.pages.successStories.keywords}
        image={SEO_CONFIG.pages.successStories.image}
        type="website"
      />

      {/* Hero Section */}
      <MediaHero
        IconComponent={Sparkles}
        iconText='Verifiable Impact Records'
        header="Stories of"
        title="Transformation"
        description="Real human outcomes driven by consistent fieldwork, institutional dedication, and targeted structural aid."
      />

      {/* Featured Story Carousel */}
      <section className="py-20">
        <div className="container-custom">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
            <div>
              <span className="text-xs font-black tracking-widest text-orange-500 uppercase">Case Spotlights</span>
              <h2 className="text-3xl md:text-4xl font-black text-slate-900 mt-1 tracking-tight">Featured Account</h2>
            </div>
            <div className="flex space-x-2 mt-4 md:mt-0">
              <button
                onClick={prevStory}
                disabled={filteredStories.length <= 1}
                className="w-12 h-12 rounded-xl bg-white border border-slate-200 shadow-sm flex items-center justify-center hover:bg-slate-50 transition active:scale-95 disabled:opacity-40 disabled:pointer-events-none text-slate-700"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <button
                onClick={nextStory}
                disabled={filteredStories.length <= 1}
                className="w-12 h-12 rounded-xl bg-white border border-slate-200 shadow-sm flex items-center justify-center hover:bg-slate-50 transition active:scale-95 disabled:opacity-40 disabled:pointer-events-none text-slate-700"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>
          </div>

          {filteredStories.length > 0 ? (
            <div className="relative">
              <div className="min-h-[500px] flex">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={filteredStories[currentIndex]?.id}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -15 }}
                    transition={{ duration: 0.4 }}
                    className="w-full bg-white rounded-3xl border border-slate-100 shadow-xl shadow-slate-200/40 overflow-hidden grid grid-cols-1 lg:grid-cols-12"
                  >
                    {/* Visual/Quote Block */}
                    <div className="lg:col-span-5 relative bg-slate-900 min-h-[320px] lg:min-h-full">
                      <img
                        src={filteredStories[currentIndex].image}
                        alt={filteredStories[currentIndex].name}
                        className="absolute inset-0 w-full h-full object-cover opacity-60 mix-blend-luminosity"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent"></div>
                      <div className="absolute bottom-8 left-8 right-8 z-10">
                        <Quote className="h-10 w-10 text-orange-400 opacity-80 mb-4" />
                        <p className="text-xl font-bold text-white leading-relaxed italic tracking-tight">
                          "{filteredStories[currentIndex].quote}"
                        </p>
                      </div>
                    </div>

                    {/* Meta Data Block */}
                    <div className="lg:col-span-7 p-8 md:p-12 flex flex-col justify-between">
                      <div>
                        <div className="flex flex-wrap items-center gap-3 mb-6">
                          <span className={`px-3 py-1 rounded-lg text-xs font-bold uppercase tracking-wider border ${getCategoryColor(filteredStories[currentIndex].category)}`}>
                            {filteredStories[currentIndex].category}
                          </span>
                          <div className="flex items-center text-slate-400 text-xs font-semibold">
                            <Calendar className="h-3.5 w-3.5 mr-1" />
                            {new Date(filteredStories[currentIndex].date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                          </div>
                        </div>

                        <h3 className="text-3xl font-black text-slate-900 mb-2 tracking-tight">
                          {filteredStories[currentIndex].name}
                          <span className="text-lg font-medium text-slate-400 ml-3">Age {filteredStories[currentIndex].age}</span>
                        </h3>

                        <div className="flex items-center text-slate-500 text-sm font-medium mb-6">
                          <MapPin className="h-4 w-4 mr-1 text-slate-400" />
                          {filteredStories[currentIndex].location}
                        </div>

                        <p className="text-slate-600 text-base md:text-lg leading-relaxed font-normal whitespace-pre-line">
                          {filteredStories[currentIndex].story}
                        </p>
                      </div>

                      <div className="mt-8 pt-6 border-t border-slate-100 flex items-center justify-between">
                        <div className="text-xs text-slate-400 font-bold uppercase tracking-wider">Verified Beneficiary Record</div>
                        <div className="flex space-x-1.5">
                          {filteredStories.map((_, idx) => (
                            <button
                              key={idx}
                              onClick={() => setCurrentIndex(idx)}
                              className={`h-1.5 rounded-full transition-all duration-300 ${idx === currentIndex ? 'w-6 bg-slate-950' : 'w-1.5 bg-slate-200'}`}
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          ) : (
            <div className="text-center py-16 bg-white border border-slate-100 rounded-3xl max-w-md mx-auto">
              <p className="text-slate-500 font-medium">No highlights listed under this domain segment.</p>
            </div>
          )}
        </div>
      </section>

      {/* All Stories Grid */}
      <section className="py-20 border-t border-slate-200/60 bg-white">
        <div className="container-custom">
          <div className="max-w-2xl mb-12">
            <span className="text-xs font-black tracking-widest text-orange-500 uppercase">Archive Registries</span>
            <h2 className="text-3xl md:text-4xl font-black text-slate-900 mt-1 tracking-tight">More Transformation Records</h2>
          </div>

          {/* Category Filter Tab Bar */}
          <div className="flex items-center overflow-x-auto no-scrollbar justify-start gap-2 pb-6 mb-10 border-b border-slate-100">
            {categories.map((category) => {
              const isActive = selectedCategory === category
              return (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`relative px-5 py-2.5 rounded-xl font-bold text-sm tracking-tight transition-all shrink-0 ${isActive ? 'text-slate-950' : 'text-slate-500 hover:text-slate-900'
                    }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeFilterGlow"
                      className="absolute inset-0 bg-slate-100 rounded-xl"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10">{category}</span>
                </button>
              )
            })}
          </div>

          {/* Stories Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <AnimatePresence mode="popLayout">
              {filteredStories.map((story, index) => (
                <motion.div
                  layout
                  key={story.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                  className="group bg-slate-50 rounded-2xl border border-slate-100 hover:border-slate-200 p-6 flex flex-col justify-between shadow-sm hover:shadow-md transition-all duration-300"
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <span className={`px-2.5 py-0.5 rounded-md text-[11px] font-black uppercase tracking-wider border ${getCategoryColor(story.category)}`}>
                        {story.category}
                      </span>
                      <div className="text-[11px] text-slate-400 font-bold flex items-center">
                        <Calendar className="h-3 w-3 mr-1" />
                        {new Date(story.date).toLocaleDateString()}
                      </div>
                    </div>

                    <h3 className="text-xl font-bold text-slate-900 mb-1 tracking-tight group-hover:text-slate-800 transition-colors">
                      {story.name}
                    </h3>

                    <div className="flex items-center text-slate-400 text-xs font-semibold mb-4">
                      <MapPin className="h-3.5 w-3.5 mr-0.5 text-slate-300" />
                      {story.location}
                    </div>

                    <p className="text-slate-600 text-sm leading-relaxed line-clamp-4">
                      {story.story}
                    </p>
                  </div>

                  <div className="border-t border-slate-200/60 pt-4 mt-6 flex items-center justify-between">
                    <span className="text-[11px] font-black tracking-wider text-slate-400 uppercase">Case Verified</span>
                    <Heart className="h-4 w-4 text-slate-300 group-hover:text-rose-500 group-hover:scale-110 transition-all" />
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {filteredStories.length === 0 && (
            <div className="text-center py-20 bg-slate-50 border border-dashed border-slate-200 rounded-2xl max-w-md mx-auto">
              <MessageSquare className="h-8 w-8 text-slate-300 mx-auto mb-3" />
              <p className="text-slate-500 font-medium text-sm">No documented cases align with this parameter filter.</p>
            </div>
          )}
        </div>
      </section>

      {/* Share Your Story CTA */}
      <section className="py-24 bg-slate-950 text-white rounded-[2.5rem] lg:rounded-[4rem] mx-4 sm:mx-8 mb-8 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5"></div>
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl"></div>

        <div className="container-custom relative z-10 text-center max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-black mb-4 tracking-tight">
            Have an Account to Register?
          </h2>
          <p className="text-slate-400 text-base md:text-lg mb-10 leading-relaxed max-w-xl mx-auto">
            If you or your household has successfully migrated via our program pipelines, let our field caseworkers document your journey.
          </p>
          <Link
            to="/contact"
            className="inline-flex bg-white text-slate-950 px-8 py-4 rounded-2xl font-bold hover:bg-slate-100 transition text-sm tracking-tight shadow-xl shadow-white/5"
          >
            Submit Documentation Request
          </Link>
        </div>
      </section>
    </div>
  )
}

export default SuccessStories