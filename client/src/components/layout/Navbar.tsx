import { useState, useEffect, useRef } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Menu, X, Heart, ChevronDown, Home, Info, Grid, Image,
  Mail, Users, DollarSign, Handshake, Newspaper, BookOpen,
  Target, HeartHandshake, GraduationCap, Utensils, Baby, Globe
} from 'lucide-react'
import LanguageSwitcher from '../LanguageSwitcher'
import { useTranslation } from 'react-i18next'

const Navbar = () => {
  const { t } = useTranslation('nav')
  const [isOpen, setIsOpen] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)
  const location = useLocation()
  const dropdownRef = useRef<HTMLDivElement>(null)

  // Logic to determine if a group (About, Programs, etc) is active
  const isGroupActive = (items: { path: string }[]) =>
    items.some(item => location.pathname === item.path.split('#')[0])

  const home = `${t('home')}`;
  const about = `${t('about')}`
  const programs = `${t('programs')}`
  const media = `${t('media')}`
  const gallery = `${t('gallery')}`
  const successStories = `${t('successStories')}`
  const getInvolved = `${t('getInvolved')}`
  const volunteer = `${t('volunteer')}`
  const donate = `${t('donate')}`
  const partners = `${t('partners')}`
  const contact = `${t('contact')}`

  const navConfig = [
    { name: home, path: '/', icon: Home, type: 'link' },
    {
      name: about,
      icon: Info,
      type: 'dropdown',
      items: [
        { name: 'Our Story', path: '/about', icon: HeartHandshake },
        { name: 'Mission & Vision', path: '/about/mission-vision', icon: Target },
        { name: 'Leadership Team', path: '/about/leadership', icon: Users }
      ]
    },
    {
      name: programs,
      icon: Grid,
      type: 'dropdown',
      items: [
        { name: 'Youth Development', path: '/programs#youth', icon: GraduationCap },
        { name: 'Humanitarian Services', path: '/programs#humanitarian', icon: Utensils },
        { name: 'Family Welfare', path: '/programs#family', icon: Baby },
        { name: 'Sustainable Development', path: '/programs#sustainable', icon: Globe },
        { name: 'All Programs', path: '/programs', icon: Grid }
      ]
    },
    {
      name: media,
      icon: Image,
      type: 'dropdown',
      items: [
        { name: successStories, path: '/success-stories', icon: BookOpen },
        { name: gallery, path: '/gallery', icon: Image },
        { name: 'News & Events', path: '/news-events', icon: Newspaper }
      ]
    },
    {
      name: getInvolved,
      icon: Heart,
      type: 'dropdown',
      items: [
        { name: volunteer, path: '/volunteer', icon: Users },
        { name: donate, path: '/donate', icon: DollarSign },
        { name: partners, path: '/partners', icon: Handshake }
      ]
    },
    { name: contact, path: '/contact', icon: Mail, type: 'link' }
  ]

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setActiveDropdown(null)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  useEffect(() => {
    setIsOpen(false)
    setActiveDropdown(null)
  }, [location])

  return (
    <nav className="bg-white/95 backdrop-blur-md shadow-sm border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">

          {/* Logo Section */}
          <Link to="/" className="flex items-center space-x-3 group">
            {/* Image Logo */}
            <img
              src="/logo.png"
              alt="Hope for the Hopeless Initiative"
              className="h-12 w-auto hidden sm:block"
              onError={(e) => {
                // If image fails to load, show text logo
                (e.target as HTMLImageElement).style.display = 'none'
              }}
            />

            {/* Text Fallback (shows if image fails) */}
            <div className="sm:hidden flex items-center space-x-3">
              <div className="bg-orange-100 p-2 rounded-xl group-hover:bg-orange-200 transition-colors">
                <Heart className="h-7 w-7 text-orange-600 fill-orange-600" />
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-xl tracking-tight text-gray-900 leading-none">
                  Hope Initiative
                </span>
                <span className="text-[10px] uppercase tracking-widest text-orange-600 font-semibold">
                  For the Hopeless
                </span>
              </div>
            </div>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center space-x-1" ref={dropdownRef}>
            {navConfig.map((nav) => (
              <div
                key={nav.name}
                className="relative"
                onMouseEnter={() => nav.type === 'dropdown' && setActiveDropdown(nav.name)}
                onMouseLeave={() => nav.type === 'dropdown' && setActiveDropdown(null)}
              >
                {nav.type === 'link' ? (
                  <Link
                    to={nav.path!}
                    className={`flex items-center space-x-1.5 px-4 py-2 rounded-full text-sm font-medium transition-all ${location.pathname === nav.path
                      ? 'bg-blue-50 text-blue-600'
                      : 'text-gray-600 hover:text-blue-600 hover:bg-gray-50'
                      }`}
                  >
                    <nav.icon className="h-4 w-4" />
                    <span>{nav.name}</span>
                  </Link>
                ) : (
                  <>
                    <button
                      className={`flex items-center space-x-1.5 px-4 py-2 rounded-full text-sm font-medium transition-all ${activeDropdown === nav.name || isGroupActive(nav.items!)
                        ? 'bg-blue-50 text-blue-600'
                        : 'text-gray-600 hover:text-blue-600 hover:bg-gray-50'
                        }`}
                    >
                      <nav.icon className="h-4 w-4" />
                      <span>{nav.name}</span>
                      <ChevronDown className={`h-3 w-3 transition-transform ${activeDropdown === nav.name ? 'rotate-180' : ''}`} />
                    </button>

                    <AnimatePresence>
                      {activeDropdown === nav.name && (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 10 }}
                          className="absolute top-full left-0 mt-1 w-64 bg-white rounded-2xl shadow-xl border border-gray-100 py-2 z-50"
                        >
                          {nav.items?.map((item) => (
                            <Link
                              key={item.path}
                              to={item.path}
                              className="flex items-center space-x-3 px-4 py-3 hover:bg-blue-50/50 group transition-colors"
                            >
                              <div className="p-2 rounded-lg bg-gray-50 group-hover:bg-white text-gray-500 group-hover:text-blue-600 transition-colors">
                                <item.icon className="h-4 w-4" />
                              </div>
                              <span className="text-sm font-medium text-gray-700 group-hover:text-blue-600">
                                {item.name}
                              </span>
                            </Link>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </>
                )}
              </div>
            ))}
            <LanguageSwitcher />
            <Link
              to="/donate"
              className="ml-6 bg-orange-600 text-white px-6 py-2.5 rounded-full text-sm font-bold hover:bg-orange-700 transition-all shadow-md hover:shadow-orange-200 active:scale-95"
            >
              {t('donate')}
            </Link>
          </div>

          {/* Mobile Toggle */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden p-2 rounded-xl bg-gray-50 text-gray-600"
          >
            {isOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="lg:hidden border-t border-gray-100 bg-gray-50 overflow-hidden"
          >
            <div className="p-4 space-y-2">
              {navConfig.map((nav) => (
                <div key={nav.name} className="space-y-1">
                  {nav.type === 'link' ? (
                    <Link
                      to={nav.path!}
                      className="flex items-center space-x-3 p-3 rounded-xl hover:bg-white text-gray-700 font-medium"
                    >
                      <nav.icon className="h-5 w-5 text-blue-500" />
                      <span>{nav.name}</span>
                    </Link>
                  ) : (
                    <div className="bg-white/50 rounded-2xl p-2">
                      <div className="flex items-center space-x-3 p-2 text-gray-400 text-xs font-bold uppercase tracking-wider">
                        <nav.icon className="h-4 w-4" />
                        <span>{nav.name}</span>
                      </div>
                      <div className="grid grid-cols-1 gap-1">
                        {nav.items?.map((item) => (
                          <Link
                            key={item.path}
                            to={item.path}
                            className="flex items-center space-x-3 p-3 rounded-xl hover:bg-white text-gray-700"
                          >
                            <item.icon className="h-4 w-4 text-blue-400" />
                            <span className="text-sm">{item.name}</span>
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
              <Link
                to="/donate"
                className="block w-full bg-orange-600 text-white text-center p-4 rounded-2xl font-bold mt-4"
              >
                {t('donate')}
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}

export default Navbar