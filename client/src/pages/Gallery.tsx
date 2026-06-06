import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ChevronLeft, ChevronRight, Image as ImageIcon, Calendar, MapPin, Camera, Loader2, AlertCircle } from 'lucide-react'
import { useGallery } from '../hooks/useGallery'
import SEOHead from '../components/SEO/SEOHead'
import { SEO_CONFIG } from '../config/seo.config'
import MediaHero from '../components/pages/media/MediaHero'

const Gallery = () => {
  const [selectedImage, setSelectedImage] = useState<number | null>(null)
  const [activeCategory, setActiveCategory] = useState('all')

  const {
    images,
    loading,
    error,
    categories
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

  // Handle cross-category state sync defenses safely
  useEffect(() => {
    setSelectedImage(null)
  }, [activeCategory])

  // Fixed the React lifecycle state hook anti-pattern into a dedicated layout lifecycle event listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedImage === null) return
      if (e.key === 'ArrowRight') nextImage()
      if (e.key === 'ArrowLeft') prevImage()
      if (e.key === 'Escape') setSelectedImage(null)
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [selectedImage, filteredImages.length])

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center">
        <Loader2 className="h-12 w-12 text-slate-800 animate-spin mb-4" />
        <p className="text-slate-500 font-medium tracking-wide">Syncing visual media archives...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
        <div className="bg-white border border-slate-200 rounded-3xl p-8 max-w-md w-full text-center shadow-xl shadow-slate-100">
          <AlertCircle className="h-12 w-12 text-rose-500 mx-auto mb-4" />
          <h3 className="text-xl font-bold text-slate-900 mb-2">Failed to load gallery</h3>
          <p className="text-slate-600 mb-6">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="w-full bg-slate-950 text-white py-3 rounded-xl font-bold hover:bg-slate-900 transition"
          >
            Try Again
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-slate-50 min-h-screen">
      <SEOHead
        title={SEO_CONFIG.pages.gallery.title}
        description={SEO_CONFIG.pages.gallery.description}
        keywords={SEO_CONFIG.pages.gallery.keywords}
        image={SEO_CONFIG.pages.gallery.image}
        type="website"
      />

      {/* Hero Section */}
      <MediaHero
        // IconComponent={ImageIcon}
        header="Field Operations Gallery"
        title="Gallery"
        description="
        Visual field records documenting tactical resource distributions, community assemblies, and active program developments across regional deployments.
        "
      />

      {/* Category Filter Tab Bar */}
      <section className="py-4 sticky top-16 z-40 bg-slate-50/80 backdrop-blur-md border-b border-slate-200/60">
        <div className="container-custom">
          <div className="flex items-center overflow-x-auto no-scrollbar justify-start lg:justify-center gap-2 py-2">
            {categories.map((category) => {
              const isActive = activeCategory === category.id
              return (
                <button
                  key={category.id}
                  onClick={() => setActiveCategory(category.id)}
                  className={`relative flex items-center space-x-2 shrink-0 px-5 py-3 rounded-2xl font-bold text-sm transition-all tracking-tight ${isActive ? 'text-slate-950' : 'text-slate-500 hover:text-slate-900'
                    }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeGalleryFilter"
                      className="absolute inset-0 bg-white border border-slate-200 shadow-sm rounded-2xl"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10 flex items-center space-x-2">
                    <ImageIcon className="h-4 w-4 opacity-70" />
                    <span>{category.label}</span>
                    <span className={`text-[11px] font-medium opacity-60 ${isActive ? 'text-slate-900' : 'text-slate-400'}`}>
                      ({category.count})
                    </span>
                  </span>
                </button>
              )
            })}
          </div>
        </div>
      </section>

      {/* Gallery Grid Section */}
      <section className="py-20">
        <div className="container-custom">
          {filteredImages.length === 0 ? (
            <div className="text-center py-20 bg-white border border-slate-100 rounded-3xl max-w-md mx-auto">
              <ImageIcon className="h-10 w-10 text-slate-300 mx-auto mb-4" />
              <h4 className="text-lg font-bold text-slate-800">No media assets documented</h4>
              <p className="text-slate-500 text-sm mt-1">There are currently no assets filed under this categorical track parameter.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              <AnimatePresence mode="popLayout">
                {filteredImages.map((image, index) => (
                  <motion.div
                    layout
                    key={image.id}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.4, delay: index * 0.05 }}
                    onClick={() => setSelectedImage(index)}
                    className="group bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden cursor-pointer hover:shadow-xl hover:border-slate-200 transition-all duration-300 flex flex-col"
                  >
                    <div className="aspect-[4/3] w-full overflow-hidden relative bg-slate-100 border-b border-slate-50">
                      <img
                        src={image.thumbnail}
                        alt={image.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                        <span className="text-white text-xs font-bold bg-white/20 backdrop-blur-md px-3 py-1.5 rounded-xl border border-white/10 tracking-wide uppercase">
                          Maximize Context View
                        </span>
                      </div>
                    </div>

                    <div className="p-6 flex-1 flex flex-col justify-between">
                      <div>
                        <span className="text-[10px] font-black tracking-widest text-orange-500 uppercase">
                          {categories.find(c => c.id === image.category)?.label || 'Deployment'}
                        </span>
                        <h3 className="text-lg font-bold text-slate-900 mt-0.5 tracking-tight line-clamp-1">
                          {image.title}
                        </h3>
                      </div>

                      <div className="flex items-center justify-between text-slate-400 text-xs font-bold mt-4 pt-4 border-t border-slate-100">
                        <span className="flex items-center">
                          <MapPin className="h-3.5 w-3.5 mr-1 text-slate-300" />
                          {image.location}
                        </span>
                        <span className="font-semibold text-slate-400">
                          {new Date(image.date).toLocaleDateString('en-US', { year: 'numeric', month: 'short' })}
                        </span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          )}
        </div>
      </section>

      {/* Premium Lightbox Modal Component */}
      <AnimatePresence>
        {selectedImage !== null && currentImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-slate-950/95 backdrop-blur-xl flex flex-col items-center justify-center p-4 md:p-8"
            onClick={() => setSelectedImage(null)}
          >
            {/* Top Toolbar Action Elements */}
            <div className="absolute top-6 left-6 right-6 flex items-center justify-between z-50">
              <div className="text-white/60 text-xs font-bold tracking-widest uppercase bg-slate-900/80 px-4 py-2 rounded-xl border border-white/5">
                Record Entry {selectedImage + 1} <span className="text-white/30">/</span> {filteredImages.length}
              </div>
              <button
                onClick={() => setSelectedImage(null)}
                className="w-12 h-12 rounded-xl bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition border border-white/10"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            {/* Navigation Framework Elements */}
            <button
              onClick={(e) => {
                e.stopPropagation()
                prevImage()
              }}
              className="absolute left-6 w-14 h-14 rounded-xl bg-slate-900/60 text-white hover:bg-slate-900 flex items-center justify-center transition disabled:opacity-20 disabled:pointer-events-none border border-white/5 z-40"
              disabled={selectedImage === 0}
            >
              <ChevronLeft className="h-6 w-6" />
            </button>

            <button
              onClick={(e) => {
                e.stopPropagation()
                nextImage()
              }}
              className="absolute right-6 w-14 h-14 rounded-xl bg-slate-900/60 text-white hover:bg-slate-900 flex items-center justify-center transition disabled:opacity-20 disabled:pointer-events-none border border-white/5 z-40"
              disabled={selectedImage === filteredImages.length - 1}
            >
              <ChevronRight className="h-6 w-6" />
            </button>

            {/* Central Media Content Canvas */}
            <div className="max-w-4xl w-full flex flex-col items-center" onClick={(e) => e.stopPropagation()}>
              <motion.img
                key={currentImage.id}
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.3 }}
                src={currentImage.image}
                alt={currentImage.title}
                className="max-h-[70vh] md:max-h-[65vh] w-auto object-contain rounded-2xl shadow-2xl border border-white/5"
              />

              {/* Media Context Subtext Layout */}
              <motion.div
                key={`meta-${currentImage.id}`}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.1 }}
                className="mt-6 text-center max-w-2xl px-4"
              >
                <h3 className="text-xl md:text-2xl font-black text-white tracking-tight mb-2">
                  {currentImage.title}
                </h3>
                <p className="text-slate-400 text-sm md:text-base leading-relaxed mb-4">
                  {currentImage.description}
                </p>

                <div className="inline-flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-xs font-bold uppercase tracking-wider text-slate-500 bg-slate-900/40 p-3 rounded-xl border border-white/5">
                  <span className="flex items-center text-slate-400">
                    <MapPin className="h-3.5 w-3.5 mr-1 text-slate-500" />
                    {currentImage.location}
                  </span>
                  <span className="text-white/10 hidden sm:inline">•</span>
                  <span className="flex items-center text-slate-400">
                    <Calendar className="h-3.5 w-3.5 mr-1 text-slate-500" />
                    {new Date(currentImage.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                  </span>
                  {currentImage.photographer && (
                    <>
                      <span className="text-white/10 hidden sm:inline">•</span>
                      <span className="flex items-center text-orange-400">
                        <Camera className="h-3.5 w-3.5 mr-1" />
                        Logistics Group: {currentImage.photographer}
                      </span>
                    </>
                  )}
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default Gallery