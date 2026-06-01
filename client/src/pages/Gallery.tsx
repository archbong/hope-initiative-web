import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ChevronLeft, ChevronRight, Grid } from 'lucide-react'
import { useGallery } from '../hooks/useGallery'
import SEOHead from '../components/SEO/SEOHead'
import { SEO_CONFIG } from '../config/seo.config'

const Gallery = () => {
  const [selectedImage, setSelectedImage] = useState<number | null>(null)
  const [activeCategory, setActiveCategory] = useState('all')

  const {
    images,
    loading,
    error,
    categories,
    fetchImages
  } = useGallery({ category: activeCategory })

  const filteredImages = activeCategory === 'all'
    ? images
    : images.filter(img => img.category === activeCategory)

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

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-blue mx-auto mb-4"></div>
          <p className="text-secondary-gray">Loading gallery...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-500 mb-4">{error}</p>
          <button onClick={() => window.location.reload()} className="btn-primary">
            Try Again
          </button>
        </div>
      </div>
    )
  }

  return (
    <div>
      <SEOHead
        title={SEO_CONFIG.pages.gallery.title}
        description={SEO_CONFIG.pages.gallery.description}
        keywords={SEO_CONFIG.pages.gallery.keywords}
        image={SEO_CONFIG.pages.gallery.image}
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
              const isActive = activeCategory === category.id
              return (
                <button
                  key={category.id}
                  onClick={() => setActiveCategory(category.id)}
                  className={`flex items-center space-x-2 px-6 py-2 rounded-full font-semibold transition-all duration-300 ${isActive
                    ? 'bg-primary-blue text-white shadow-lg transform scale-105'
                    : 'bg-white text-secondary-gray hover:bg-gray-100'
                    }`}
                >
                  <Grid className="h-4 w-4" />
                  <span>{category.label}</span>
                  <span className="text-xs ml-1">({category.count})</span>
                </button>
              )
            })}
          </div>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="py-16">
        <div className="container-custom">
          {filteredImages.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-secondary-gray">No images found in this category.</p>
            </div>
          ) : (
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
                      loading="lazy"
                    />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                      <h3 className="font-semibold text-lg mb-1">{image.title}</h3>
                      <p className="text-sm opacity-90">{image.location}</p>
                      <p className="text-xs opacity-75 mt-1">{image.date}</p>
                    </div>
                  </div>
                  <div className="absolute top-4 right-4 bg-primary-orange text-white px-3 py-1 rounded-full text-xs font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    {categories.find(c => c.id === image.category)?.label}
                  </div>
                </motion.div>
              ))}
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
                  {currentImage.photographer && (
                    <>
                      <span>•</span>
                      <span>Photo: {currentImage.photographer}</span>
                    </>
                  )}
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