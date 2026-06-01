import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ChevronLeft, ChevronRight, Grid, Image as ImageIcon, Heart, Users, Calendar } from 'lucide-react'

const Gallery = () => {
  const [selectedImage, setSelectedImage] = useState<number | null>(null)
  const [activeCategory, setActiveCategory] = useState('all')

  const categories = [
    { id: 'all', label: 'All', icon: Grid },
    { id: 'food', label: 'Food Distribution', icon: Heart },
    { id: 'youth', label: 'Youth Programs', icon: Users },
    { id: 'events', label: 'Community Events', icon: Calendar }
  ]

  const galleryImages = [
    {
      id: 1,
      title: 'Food Distribution Drive',
      category: 'food',
      description: 'Distributing nutritious meals to vulnerable families in Abuja',
      date: '2024-03-15',
      location: 'Abuja, Nigeria',
      image: 'https://images.unsplash.com/photo-1593113598332-cd288d649433?w=800',
      thumbnail: 'https://images.unsplash.com/photo-1593113598332-cd288d649433?w=400'
    },
    {
      id: 2,
      title: 'Youth Empowerment Workshop',
      category: 'youth',
      description: 'Teaching leadership and life skills to young people',
      date: '2024-03-10',
      location: 'Lagos, Nigeria',
      image: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=800',
      thumbnail: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=400'
    },
    {
      id: 3,
      title: 'Community Health Awareness',
      category: 'events',
      description: 'Free health screening and awareness campaign',
      date: '2024-03-05',
      location: 'Port Harcourt, Nigeria',
      image: 'https://images.unsplash.com/photo-1505751172876-fa1923c5c528?w=800',
      thumbnail: 'https://images.unsplash.com/photo-1505751172876-fa1923c5c528?w=400'
    },
    {
      id: 4,
      title: 'Orphan Support Program',
      category: 'food',
      description: 'Providing care and support to orphaned children',
      date: '2024-02-28',
      location: 'Kano, Nigeria',
      image: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=800',
      thumbnail: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=400'
    },
    {
      id: 5,
      title: 'Anti-Cultism Campaign',
      category: 'youth',
      description: 'School outreach program educating students',
      date: '2024-02-20',
      location: 'Ibadan, Nigeria',
      image: 'https://images.unsplash.com/photo-1577896851231-70ef18881754?w=800',
      thumbnail: 'https://images.unsplash.com/photo-1577896851231-70ef18881754?w=400'
    },
    {
      id: 6,
      title: 'Mothers Support Group',
      category: 'events',
      description: 'Counseling and support for new mothers',
      date: '2024-02-15',
      location: 'Benin City, Nigeria',
      image: 'https://images.unsplash.com/photo-1543269865-cbf427effbad?w=800',
      thumbnail: 'https://images.unsplash.com/photo-1543269865-cbf427effbad?w=400'
    },
    {
      id: 7,
      title: 'Food Packing Event',
      category: 'food',
      description: 'Volunteers preparing food packages for distribution',
      date: '2024-02-10',
      location: 'Abuja, Nigeria',
      image: 'https://images.unsplash.com/photo-1593113598332-cd288d649433?w=800',
      thumbnail: 'https://images.unsplash.com/photo-1593113598332-cd288d649433?w=400'
    },
    {
      id: 8,
      title: 'Leadership Training',
      category: 'youth',
      description: 'Developing future leaders',
      date: '2024-02-05',
      location: 'Lagos, Nigeria',
      image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=800',
      thumbnail: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=400'
    },
    {
      id: 9,
      title: 'Community Festival',
      category: 'events',
      description: 'Celebrating community spirit and togetherness',
      date: '2024-01-28',
      location: 'Abuja, Nigeria',
      image: 'https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?w=800',
      thumbnail: 'https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?w=400'
    }
  ]

  const filteredImages = activeCategory === 'all'
    ? galleryImages
    : galleryImages.filter(img => img.category === activeCategory)

  const currentImage = selectedImage !== null ? filteredImages[selectedImage] : null

  const nextImage = () => {
    if (selectedImage !== null && selectedImage < filteredImages.length - 1) {
      setSelectedImage(selectedImage + 1)
    }
  }

  const prevImage = () => {
    if (selectedImage !== null && selectedImage > 0) {
      setSelectedImage(selectedImage - 1)
    }
  }

  const handleKeyDown = (e: KeyboardEvent) => {
    if (selectedImage !== null) {
      if (e.key === 'ArrowRight') nextImage()
      if (e.key === 'ArrowLeft') prevImage()
      if (e.key === 'Escape') setSelectedImage(null)
    }
  }

  // Add event listener for keyboard navigation
  useState(() => {
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  })

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
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Our Gallery</h1>
            <p className="text-lg md:text-xl opacity-90">
              Capturing moments of hope, transformation, and community impact
            </p>
          </motion.div>
        </div>
      </section>

      {/* Category Filter */}
      <section className="py-8 bg-gray-50 border-b sticky top-16 z-40">
        <div className="container-custom">
          <div className="flex flex-wrap justify-center gap-3">
            {categories.map((category) => {
              const Icon = category.icon
              const isActive = activeCategory === category.id
              return (
                <button
                  key={category.id}
                  onClick={() => {
                    setActiveCategory(category.id)
                    setSelectedImage(null)
                  }}
                  className={`flex items-center space-x-2 px-6 py-2 rounded-full font-semibold transition-all duration-300 ${isActive
                      ? 'bg-primary-blue text-white shadow-lg transform scale-105'
                      : 'bg-white text-secondary-gray hover:bg-gray-100'
                    }`}
                >
                  <Icon className="h-4 w-4" />
                  <span>{category.label}</span>
                </button>
              )
            })}
          </div>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="py-16">
        <div className="container-custom">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredImages.map((image, index) => (
              <motion.div
                key={image.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.05 }}
                onClick={() => setSelectedImage(index)}
                className="group cursor-pointer relative overflow-hidden rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300"
              >
                <div className="aspect-w-4 aspect-h-3">
                  <img
                    src={image.thumbnail}
                    alt={image.title}
                    className="w-full h-64 object-cover transform group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                    <h3 className="font-semibold text-lg mb-1">{image.title}</h3>
                    <p className="text-sm opacity-90">{image.location}</p>
                  </div>
                </div>
                <div className="absolute top-4 right-4 bg-primary-orange text-white px-3 py-1 rounded-full text-xs font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  {categories.find(c => c.id === image.category)?.label}
                </div>
              </motion.div>
            ))}
          </div>

          {filteredImages.length === 0 && (
            <div className="text-center py-12">
              <p className="text-secondary-gray">No images found in this category.</p>
            </div>
          )}
        </div>
      </section>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedImage !== null && currentImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black bg-opacity-95 flex items-center justify-center"
            onClick={() => setSelectedImage(null)}
          >
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-4 right-4 text-white hover:text-primary-orange transition z-10"
            >
              <X className="h-8 w-8" />
            </button>

            <button
              onClick={(e) => {
                e.stopPropagation()
                prevImage()
              }}
              className="absolute left-4 text-white hover:text-primary-orange transition disabled:opacity-50"
              disabled={selectedImage === 0}
            >
              <ChevronLeft className="h-10 w-10" />
            </button>

            <button
              onClick={(e) => {
                e.stopPropagation()
                nextImage()
              }}
              className="absolute right-4 text-white hover:text-primary-orange transition disabled:opacity-50"
              disabled={selectedImage === filteredImages.length - 1}
            >
              <ChevronRight className="h-10 w-10" />
            </button>

            <div className="max-w-5xl mx-4" onClick={(e) => e.stopPropagation()}>
              <img
                src={currentImage.image}
                alt={currentImage.title}
                className="max-h-[80vh] w-auto rounded-lg shadow-2xl"
              />
              <div className="mt-4 text-white text-center">
                <h3 className="text-2xl font-semibold mb-2">{currentImage.title}</h3>
                <p className="text-gray-300 mb-2">{currentImage.description}</p>
                <div className="flex items-center justify-center space-x-4 text-sm text-gray-400">
                  <span>{currentImage.location}</span>
                  <span>•</span>
                  <span>{new Date(currentImage.date).toLocaleDateString()}</span>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default Gallery