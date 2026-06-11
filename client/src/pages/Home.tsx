import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { MessageSquare, Image as ImageIcon, ArrowRight } from 'lucide-react'
import { usePrograms } from '../hooks/usePrograms'
import { useStories } from '../hooks/useStories'
import { useGallery } from '../hooks/useGallery'
import SEOHead from '../components/SEO/SEOHead'
import { SEO_CONFIG } from '../config/seo.config'
import HomeHero from '../components/pages/home/HomeHero'
import HomeStats from '../components/pages/home/HomeStats'
import HomeCTA from '../components/pages/home/HomeCTA'
import ImpactStoryCard from '../components/pages/home/ImpactStoryCard'
import GalleryCard from '../components/pages/home/GalleryCard'
import ProgramCard from '../components/pages/home/ProgramCard'
import { useTranslation } from 'react-i18next'

const Home = () => {
  const { t } = useTranslation('home')

  const { programs: featuredPrograms, loading: programsLoading, fetchPrograms } = usePrograms()
  const { stories: featuredStories, loading: storiesLoading, fetchStories } = useStories()
  const { images: galleryImages, loading: galleryLoading, fetchImages } = useGallery()

  useEffect(() => {
    fetchPrograms({ featured: true })
    fetchStories({ featured: true })
    fetchImages()
  }, [fetchPrograms, fetchStories, fetchImages])


  const displayPrograms = featuredPrograms?.slice(0, 3) || []
  const displayStories = featuredStories?.slice(0, 3) || []
  const displayGallery = galleryImages?.slice(0, 4) || []

  return (
    <div className="bg-slate-50 min-h-screen overflow-x-hidden">
      <SEOHead
        title={SEO_CONFIG.pages.home.title}
        description={SEO_CONFIG.pages.home.description}
        keywords={SEO_CONFIG.pages.home.keywords}
        image={SEO_CONFIG.pages.home.image}
        url={SEO_CONFIG.siteUrl}
        type="website"
      />

      {/* Hero Section */}
      <HomeHero />

      {/* Stats Section */}
      <HomeStats />

      {/* Featured Programs Section */}
      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <h2 className="text-xs uppercase tracking-widest text-orange-600 font-bold mb-3 flex items-center">
              <span className="w-8 h-px bg-orange-600 mr-2" /> {t('strategicInterventions')}
            </h2>
            <p className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              {t('ourPrograms')}
            </p>
          </div>
          <p className="text-slate-500 font-medium text-base max-w-md md:text-right">
            {t('provideStructure')}
          </p>
        </div>

        {programsLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[1, 2, 3].map((n) => (
              <div key={n} className="bg-white rounded-2xl h-[400px] animate-pulse border border-slate-100" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {displayPrograms.map((program, index) => (
              <ProgramCard program={program} index={index} variant="home" />
            ))}
          </div>
        )}

        <div className="text-center mt-14">
          <Link to="/programs" className="inline-flex items-center space-x-2 bg-white border border-slate-200 px-6 py-3 rounded-xl text-sm font-bold text-slate-700 hover:bg-slate-50 transition-colors shadow-sm">
            <span>{t('exploreAllInitiatives')}</span>
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      {/* Impact Stories / Testimonials Section */}
      <section className="py-20 bg-slate-100 border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-xs uppercase tracking-widest text-emerald-600 font-bold mb-3 flex items-center justify-center">
              <MessageSquare className="h-4 w-4 mr-2" /> {t('voiceOfChange')}
            </h2>
            <p className="text-3xl font-extrabold text-slate-900 tracking-tight">{t('impactStories')}</p>
          </div>

          {storiesLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 animate-pulse">
              {[1, 2, 3].map((n) => (
                <div key={n} className="bg-white rounded-2xl h-48" />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {displayStories.map((story, index) => (
                <ImpactStoryCard story={story} index={index} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Media Gallery Preview Section */}
      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-xs uppercase tracking-widest text-sky-600 font-bold mb-3 flex items-center justify-center">
            <ImageIcon className="h-4 w-4 mr-2" /> {t('transparency')}
          </h2>
          <p className="text-3xl font-extrabold text-slate-900 tracking-tight">{t('recentGallery')}</p>
        </div>

        {galleryLoading ? (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 animate-pulse">
            {[1, 2, 3, 4].map((n) => (
              <div key={n} className="bg-slate-200 rounded-2xl h-44" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {displayGallery.map((img, index) => (
              <GalleryCard img={img} index={index} />
            ))}
          </div>
        )}
      </section>

      {/* Action-Driving Call to Action Section */}
      <HomeCTA />
    </div>
  )
}

export default Home