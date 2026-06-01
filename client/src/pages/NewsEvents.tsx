import { useState } from 'react'
import { motion } from 'framer-motion'
import { Calendar, MapPin, User, ChevronRight, Search, Tag, Heart } from 'lucide-react'

const NewsEvents = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')

  const newsAndEvents = [
    {
      id: 1,
      type: 'event',
      title: 'Annual Community Outreach 2024',
      description: 'Join us for our biggest community outreach event of the year. We will be distributing food, clothing, and providing free health screenings.',
      date: '2024-04-15',
      location: 'Abuja, Nigeria',
      category: 'outreach',
      image: 'https://images.unsplash.com/photo-1593113598332-cd288d649433?w=800',
      author: 'Sarah Johnson',
      readTime: '3 min read'
    },
    {
      id: 2,
      type: 'news',
      title: 'Hope Initiative Receives Grant from UN',
      description: 'We are thrilled to announce a significant grant from the United Nations to expand our youth development programs across Nigeria.',
      date: '2024-03-20',
      location: 'Global',
      category: 'announcement',
      image: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=800',
      author: 'Michael Okafor',
      readTime: '4 min read'
    },
    {
      id: 3,
      type: 'event',
      title: 'Youth Leadership Summit',
      description: 'A two-day summit empowering young leaders with skills in advocacy, project management, and community organizing.',
      date: '2024-05-10',
      location: 'Lagos, Nigeria',
      category: 'youth',
      image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=800',
      author: 'Dr. Amina Bello',
      readTime: '2 min read'
    },
    {
      id: 4,
      type: 'news',
      title: 'New Partnership with First Bank',
      description: 'First Bank commits to supporting our food distribution programs for the next three years.',
      date: '2024-03-15',
      location: 'Nigeria',
      category: 'partnership',
      image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800',
      author: 'Emmanuel Adebayo',
      readTime: '3 min read'
    },
    {
      id: 5,
      type: 'event',
      title: 'Mental Health Awareness Workshop',
      description: 'Free workshop on mental health awareness and support for families and individuals.',
      date: '2024-04-25',
      location: 'Port Harcourt, Nigeria',
      category: 'health',
      image: 'https://images.unsplash.com/photo-1505751172876-fa1923c5c528?w=800',
      author: 'Dr. Grace Ogunlesi',
      readTime: '2 min read'
    },
    {
      id: 6,
      type: 'news',
      title: '1,000 Children Sponsored for Education',
      description: 'Milestone achievement: We have now sponsored over 1,000 children to attend school across Nigeria.',
      date: '2024-03-10',
      location: 'Nigeria',
      category: 'milestone',
      image: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=800',
      author: 'Hope Initiative Team',
      readTime: '5 min read'
    }
  ]

  const categories = [
    { id: 'all', label: 'All' },
    { id: 'outreach', label: 'Outreach' },
    { id: 'announcement', label: 'Announcements' },
    { id: 'youth', label: 'Youth Programs' },
    { id: 'partnership', label: 'Partnerships' },
    { id: 'health', label: 'Health' },
    { id: 'milestone', label: 'Milestones' }
  ]

  const filteredItems = newsAndEvents.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const upcomingEvents = newsAndEvents
    .filter(item => item.type === 'event' && new Date(item.date) > new Date())
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())

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
            <h1 className="text-4xl md:text-5xl font-bold mb-4">News & Events</h1>
            <p className="text-lg md:text-xl opacity-90">
              Stay updated with our latest activities, announcements, and upcoming events
            </p>
          </motion.div>
        </div>
      </section>

      {/* Upcoming Events Banner */}
      {upcomingEvents.length > 0 && (
        <section className="py-8 bg-primary-orange text-white">
          <div className="container-custom">
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div className="flex items-center space-x-3">
                <Calendar className="h-6 w-6" />
                <span className="font-semibold">Upcoming Events:</span>
              </div>
              <div className="flex flex-wrap gap-4">
                {upcomingEvents.slice(0, 3).map(event => (
                  <div key={event.id} className="flex items-center space-x-2 text-sm">
                    <span>{event.title}</span>
                    <span>•</span>
                    <span>{new Date(event.date).toLocaleDateString()}</span>
                  </div>
                ))}
              </div>
              <a href="#events" className="bg-white text-primary-orange px-4 py-2 rounded-lg font-semibold text-sm hover:bg-gray-100 transition">
                View All
              </a>
            </div>
          </div>
        </section>
      )}

      {/* Search and Filter */}
      <section className="py-8 bg-gray-50">
        <div className="container-custom">
          <div className="flex flex-col md:flex-row gap-4 justify-between items-center">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-secondary-gray" />
              <input
                type="text"
                placeholder="Search news and events..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-primary-blue focus:border-primary-blue"
              />
            </div>
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`px-4 py-2 rounded-full text-sm font-semibold transition-all duration-300 ${selectedCategory === category.id
                      ? 'bg-primary-blue text-white'
                      : 'bg-white text-secondary-gray hover:bg-gray-200'
                    }`}
                >
                  {category.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* News & Events Grid */}
      <section className="py-16">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2">
              <div className="space-y-8">
                {filteredItems.map((item, index) => (
                  <motion.article
                    key={item.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300"
                  >
                    <div className="md:flex">
                      <div className="md:w-1/3">
                        <img
                          src={item.image}
                          alt={item.title}
                          className="h-48 md:h-full w-full object-cover"
                        />
                      </div>
                      <div className="p-6 md:w-2/3">
                        <div className="flex items-center space-x-2 mb-3">
                          <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${item.type === 'event'
                              ? 'bg-primary-orange text-white'
                              : 'bg-primary-blue text-white'
                            }`}>
                            {item.type === 'event' ? 'Event' : 'News'}
                          </span>
                          <span className="flex items-center text-sm text-secondary-gray">
                            <Calendar className="h-4 w-4 mr-1" />
                            {new Date(item.date).toLocaleDateString()}
                          </span>
                        </div>
                        <h3 className="text-xl font-bold mb-2 hover:text-primary-blue transition">
                          <a href={`/news/${item.id}`}>{item.title}</a>
                        </h3>
                        <p className="text-secondary-gray mb-4 line-clamp-2">
                          {item.description}
                        </p>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center text-sm text-secondary-gray">
                            <User className="h-4 w-4 mr-1" />
                            {item.author}
                            <span className="mx-2">•</span>
                            <span>{item.readTime}</span>
                          </div>
                          <a href={`/news/${item.id}`} className="text-primary-blue font-semibold hover:text-primary-green inline-flex items-center">
                            Read More <ChevronRight className="h-4 w-4 ml-1" />
                          </a>
                        </div>
                      </div>
                    </div>
                  </motion.article>
                ))}

                {filteredItems.length === 0 && (
                  <div className="text-center py-12 bg-white rounded-xl">
                    <p className="text-secondary-gray">No news or events found.</p>
                  </div>
                )}
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              {/* Upcoming Events Widget */}
              <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
                <h3 className="text-xl font-bold mb-4 flex items-center">
                  <Calendar className="h-5 w-5 mr-2 text-primary-orange" />
                  Upcoming Events
                </h3>
                <div className="space-y-4">
                  {upcomingEvents.map(event => (
                    <div key={event.id} className="border-b last:border-0 pb-4 last:pb-0">
                      <h4 className="font-semibold mb-1">{event.title}</h4>
                      <div className="flex items-center text-sm text-secondary-gray mb-1">
                        <Calendar className="h-3 w-3 mr-1" />
                        {new Date(event.date).toLocaleDateString()}
                      </div>
                      <div className="flex items-center text-sm text-secondary-gray">
                        <MapPin className="h-3 w-3 mr-1" />
                        {event.location}
                      </div>
                    </div>
                  ))}
                  {upcomingEvents.length === 0 && (
                    <p className="text-secondary-gray text-sm">No upcoming events at this time.</p>
                  )}
                </div>
              </div>

              {/* Categories Widget */}
              <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
                <h3 className="text-xl font-bold mb-4 flex items-center">
                  <Tag className="h-5 w-5 mr-2 text-primary-orange" />
                  Categories
                </h3>
                <div className="flex flex-wrap gap-2">
                  {categories.slice(1).map(category => (
                    <button
                      key={category.id}
                      onClick={() => setSelectedCategory(category.id)}
                      className="px-3 py-1 bg-gray-100 rounded-full text-sm hover:bg-primary-blue hover:text-white transition"
                    >
                      {category.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Newsletter Signup */}
              <div className="bg-gradient-to-r from-primary-blue to-primary-green rounded-xl shadow-lg p-6 text-white">
                <Heart className="h-10 w-10 mb-3 opacity-80" />
                <h3 className="text-xl font-bold mb-2">Subscribe to Our Newsletter</h3>
                <p className="text-sm opacity-90 mb-4">
                  Get the latest updates on our programs and events
                </p>
                <form className="space-y-3">
                  <input
                    type="email"
                    placeholder="Your email address"
                    className="w-full px-4 py-2 rounded-lg text-secondary-dark"
                  />
                  <button className="w-full bg-white text-primary-blue px-4 py-2 rounded-lg font-semibold hover:bg-gray-100 transition">
                    Subscribe
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default NewsEvents