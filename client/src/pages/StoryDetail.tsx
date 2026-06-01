import { useParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowLeft, Calendar, MapPin, Heart } from 'lucide-react'
import { FacebookIcon, LinkedinIcon, TwitterIcon } from '../components/ui/SocialIcons'
import SEOHead from '../components/SEO/SEOHead'
import { SEO_CONFIG } from '../config/seo.config'

const StoryDetail = () => {
  const { storyId } = useParams()

  // This would normally come from an API/database
  const storyData: Record<string, any> = {
    '1': {
      name: 'Blessing Okoro',
      age: 16,
      location: 'Abuja, Nigeria',
      story: `After losing both parents at age 12, I thought my dreams were over. I was alone, scared, and didn't know where to turn. The future that once seemed bright suddenly looked dark and uncertain.

      That's when Hope for the Hopeless Initiative found me. They didn't just provide food and shelter - they gave me back my hope. The counselors helped me process my grief, the teachers helped me catch up in school, and the community made me feel like I belonged.

      Today, I'm in my third year of secondary school with excellent grades. I want to become a doctor so I can help others who have lost hope like I did. This organization showed me that even in the darkest times, there is always hope.`,
      quote: "They gave me more than food and shelter - they gave me back my future.",
      image: 'https://images.unsplash.com/photo-1519699047748-de8e457a634e?w=800',
      date: '2024-03-15',
      category: 'Education',
      fullImage: 'https://images.unsplash.com/photo-1519699047748-de8e457a634e?w=1200'
    },
    '2': {
      name: 'Emmanuel Adebayo',
      age: 19,
      location: 'Lagos, Nigeria',
      story: `I was caught in the cycle of drug abuse with no way out. Every day was a struggle, and I had lost everything - my family's trust, my education, and my self-respect. I thought there was no hope for someone like me.

      The youth sensitization program changed everything. The counselors didn't judge me; they listened. They helped me understand the root causes of my addiction and gave me tools to overcome it. The mentorship program connected me with someone who had walked the same path and found freedom.

      Now, I've been clean for 18 months. I'm back in school, and I mentor other young people who are struggling with addiction. If my story can help even one person find hope, then everything I went through was worth it.`,
      quote: "From addiction to mentoring - transformation is possible with the right support.",
      image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=800',
      date: '2024-03-10',
      category: 'Youth Development',
      fullImage: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=1200'
    }
  }

  const story = storyData[storyId || '']

  if (!story) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Story Not Found</h1>
          <Link to="/success-stories" className="text-primary-blue hover:underline">
            Back to Success Stories
          </Link>
        </div>
      </div>
    )
  }

  const shareUrl = window.location.href

  return (
    <div>
      <SEOHead
        title={`${SEO_CONFIG.pages.storyDetail.title}${story?.name || 'Story'}`}
        description={story?.quote || story?.story.substring(0, 160) || SEO_CONFIG.pages.storyDetail.description}
        keywords={`${SEO_CONFIG.pages.storyDetail.keywords}, ${story?.category}, ${story?.location}`}
        image={story?.fullImage || story?.image || SEO_CONFIG.pages.storyDetail.image}
        url={`${SEO_CONFIG.siteUrl}/success-stories/${storyId}`}
        type="article"
        publishedTime={story?.date}
        author={story?.name}
        tags={[story?.category || '', 'success story', 'transformation']}
      />
      {/* Hero Section */}
      <section className="relative h-96 bg-cover bg-center" style={{ backgroundImage: `url(${story.fullImage})` }}>
        <div className="absolute inset-0 bg-gradient-to-r from-primary-blue to-primary-green opacity-85"></div>
        <div className="absolute inset-0 flex items-center">
          <div className="container-custom">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-white max-w-3xl"
            >
              <Link to="/success-stories" className="inline-flex items-center text-white mb-4 hover:text-primary-orange transition">
                <ArrowLeft className="h-4 w-4 mr-1" />
                Back to Stories
              </Link>
              <h1 className="text-4xl md:text-5xl font-bold mb-4">{story.name}'s Story</h1>
              <div className="flex items-center space-x-4 text-sm opacity-90">
                <span className="flex items-center">
                  <Calendar className="h-4 w-4 mr-1" />
                  {new Date(story.date).toLocaleDateString()}
                </span>
                <span className="flex items-center">
                  <MapPin className="h-4 w-4 mr-1" />
                  {story.location}
                </span>
                <span className="bg-primary-orange px-3 py-1 rounded-full text-xs">
                  {story.category}
                </span>
              </div>
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
                <div className="prose prose-lg max-w-none">
                  {story.story.split('\n\n').map((paragraph: string, idx: number) => (
                    <p key={idx} className="text-secondary-gray leading-relaxed mb-4">
                      {paragraph}
                    </p>
                  ))}
                </div>

                {/* Quote */}
                <div className="mt-8 p-6 bg-primary-blue bg-opacity-5 rounded-xl border-l-4 border-primary-orange">
                  <Heart className="h-8 w-8 text-primary-orange mb-3" />
                  <p className="text-xl font-medium italic text-secondary-dark">
                    "{story.quote}"
                  </p>
                  <p className="mt-2 font-semibold">— {story.name}</p>
                </div>

                {/* Call to Action */}
                <div className="mt-8 bg-gray-50 rounded-xl p-6 text-center">
                  <h3 className="text-xl font-bold mb-2">Inspired by this story?</h3>
                  <p className="text-secondary-gray mb-4">
                    Your support can help create more transformation stories like this one.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-3 justify-center">
                    <Link to="/donate" className="btn-primary inline-block">
                      Support Our Work
                    </Link>
                    <Link to="/volunteer" className="btn-outline inline-block">
                      Become a Volunteer
                    </Link>
                  </div>
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
                <h3 className="text-xl font-bold mb-4">Share This Story</h3>
                <p className="text-secondary-gray text-sm mb-4">
                  Help inspire others by sharing this transformation story.
                </p>

                <div className="flex space-x-3 mb-6">
                  <a
                    href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700 transition"
                  >
                    <FacebookIcon className="h-5 w-5" />
                  </a>
                  <a
                    href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(story.name + "'s transformation story")}&url=${encodeURIComponent(shareUrl)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-blue-400 text-white p-2 rounded-lg hover:bg-blue-500 transition"
                  >
                    <TwitterIcon className="h-5 w-5" />
                  </a>
                  <a
                    href={`https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(shareUrl)}&title=${encodeURIComponent(story.name + "'s Story")}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-blue-700 text-white p-2 rounded-lg hover:bg-blue-800 transition"
                  >
                    <LinkedinIcon className="h-5 w-5" />
                  </a>
                </div>

                <div className="border-t pt-4">
                  <h4 className="font-semibold mb-2">More Stories</h4>
                  <p className="text-sm text-secondary-gray">
                    Read more transformation stories from our beneficiaries.
                  </p>
                  <Link to="/success-stories" className="text-primary-blue text-sm font-semibold hover:underline mt-2 inline-block">
                    View All Stories →
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

export default StoryDetail