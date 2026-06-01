import { useState, useEffect, useRef } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Menu, X, Heart, ChevronDown, Home, Info, Grid, BookOpen, Image, Users, DollarSign, Handshake, Newspaper, Mail, Target, HeartHandshake, GraduationCap, Utensils, Baby, Globe } from 'lucide-react'

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [openDropdown, setOpenDropdown] = useState<string | null>(null)
  const location = useLocation()
  const dropdownRef = useRef<HTMLDivElement>(null)

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setOpenDropdown(null)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  // Close dropdown on route change
  useEffect(() => {
    setOpenDropdown(null)
    setIsOpen(false)
  }, [location])

  const navItems = {
    main: [
      { name: 'Home', path: '/', icon: Home }
    ],
    about: {
      label: 'About',
      icon: Info,
      items: [
        { name: 'Our Story', path: '/about', icon: HeartHandshake },
        { name: 'Mission & Vision', path: '/about#mission', icon: Target },
        { name: 'Leadership Team', path: '/about#team', icon: Users }
      ]
    },
    programs: {
      label: 'Programs',
      icon: Grid,
      items: [
        { name: 'Youth Development', path: '/programs#youth', icon: GraduationCap },
        { name: 'Humanitarian Services', path: '/programs#humanitarian', icon: Utensils },
        { name: 'Family Welfare', path: '/programs#family', icon: Baby },
        { name: 'Sustainable Development', path: '/programs#sustainable', icon: Globe },
        { name: 'All Programs', path: '/programs', icon: Grid }
      ]
    },
    media: {
      label: 'Media',
      icon: Image,
      items: [
        { name: 'Success Stories', path: '/success-stories', icon: BookOpen },
        { name: 'Gallery', path: '/gallery', icon: Image },
        { name: 'News & Events', path: '/news-events', icon: Newspaper }
      ]
    },
    getInvolved: {
      label: 'Get Involved',
      icon: Heart,
      items: [
        { name: 'Volunteer', path: '/volunteer', icon: Users },
        { name: 'Donate', path: '/donate', icon: DollarSign },
        { name: 'Partners', path: '/partners', icon: Handshake }
      ]
    },
    contact: { name: 'Contact', path: '/contact', icon: Mail }
  }

  const isActive = (path: string) => {
    if (path.includes('#')) {
      const basePath = path.split('#')[0]
      return location.pathname === basePath
    }
    return location.pathname === path
  }

  const handleDropdownToggle = (dropdownName: string) => {
    setOpenDropdown(openDropdown === dropdownName ? null : dropdownName)
  }

  return (
    <nav className="bg-white shadow-lg sticky top-0 z-50">
      <div className="container-custom">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 group">
            <Heart className="h-8 w-8 text-primary-orange group-hover:scale-110 transition-transform duration-300" />
            <span className="font-poppins font-bold text-xl text-secondary-dark hidden sm:inline-block">
              Hope for the Hopeless
            </span>
            <span className="font-poppins font-bold text-lg text-secondary-dark sm:hidden">
              Hope Initiative
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-1" ref={dropdownRef}>
            {/* Home */}
            <Link
              to="/"
              className={`px-3 py-2 rounded-lg transition-all duration-200 flex items-center space-x-1 ${isActive('/')
                  ? 'text-primary-blue font-semibold bg-blue-50'
                  : 'text-secondary-gray hover:text-primary-blue hover:bg-gray-50'
                }`}
            >
              <Home className="h-4 w-4" />
              <span>Home</span>
            </Link>

            {/* About Dropdown */}
            <div className="relative">
              <button
                onClick={() => handleDropdownToggle('about')}
                className={`px-3 py-2 rounded-lg transition-all duration-200 flex items-center space-x-1 ${openDropdown === 'about' || location.pathname === '/about'
                    ? 'text-primary-blue font-semibold bg-blue-50'
                    : 'text-secondary-gray hover:text-primary-blue hover:bg-gray-50'
                  }`}
              >
                <Info className="h-4 w-4" />
                <span>About</span>
                <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${openDropdown === 'about' ? 'rotate-180' : ''}`} />
              </button>

              {openDropdown === 'about' && (
                <div className="absolute top-full left-0 mt-2 w-64 bg-white rounded-lg shadow-xl border border-gray-100 overflow-hidden z-50 animate-fade-in">
                  {navItems.about.items.map((item) => (
                    <Link
                      key={item.path}
                      to={item.path}
                      className="flex items-center space-x-3 px-4 py-3 hover:bg-gray-50 transition-colors"
                      onClick={() => setOpenDropdown(null)}
                    >
                      <item.icon className="h-5 w-5 text-primary-blue" />
                      <div>
                        <div className="font-medium text-secondary-dark">{item.name}</div>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* Programs Dropdown */}
            <div className="relative">
              <button
                onClick={() => handleDropdownToggle('programs')}
                className={`px-3 py-2 rounded-lg transition-all duration-200 flex items-center space-x-1 ${openDropdown === 'programs' || location.pathname === '/programs'
                    ? 'text-primary-blue font-semibold bg-blue-50'
                    : 'text-secondary-gray hover:text-primary-blue hover:bg-gray-50'
                  }`}
              >
                <Grid className="h-4 w-4" />
                <span>Programs</span>
                <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${openDropdown === 'programs' ? 'rotate-180' : ''}`} />
              </button>

              {openDropdown === 'programs' && (
                <div className="absolute top-full left-0 mt-2 w-72 bg-white rounded-lg shadow-xl border border-gray-100 overflow-hidden z-50 animate-fade-in">
                  {navItems.programs.items.map((item) => (
                    <Link
                      key={item.path}
                      to={item.path}
                      className="flex items-center space-x-3 px-4 py-3 hover:bg-gray-50 transition-colors"
                      onClick={() => setOpenDropdown(null)}
                    >
                      <item.icon className="h-5 w-5 text-primary-blue" />
                      <div>
                        <div className="font-medium text-secondary-dark">{item.name}</div>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* Media Dropdown */}
            <div className="relative">
              <button
                onClick={() => handleDropdownToggle('media')}
                className={`px-3 py-2 rounded-lg transition-all duration-200 flex items-center space-x-1 ${openDropdown === 'media'
                    ? 'text-primary-blue font-semibold bg-blue-50'
                    : 'text-secondary-gray hover:text-primary-blue hover:bg-gray-50'
                  }`}
              >
                <Image className="h-4 w-4" />
                <span>Media</span>
                <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${openDropdown === 'media' ? 'rotate-180' : ''}`} />
              </button>

              {openDropdown === 'media' && (
                <div className="absolute top-full left-0 mt-2 w-64 bg-white rounded-lg shadow-xl border border-gray-100 overflow-hidden z-50 animate-fade-in">
                  {navItems.media.items.map((item) => (
                    <Link
                      key={item.path}
                      to={item.path}
                      className="flex items-center space-x-3 px-4 py-3 hover:bg-gray-50 transition-colors"
                      onClick={() => setOpenDropdown(null)}
                    >
                      <item.icon className="h-5 w-5 text-primary-blue" />
                      <div>
                        <div className="font-medium text-secondary-dark">{item.name}</div>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* Get Involved Dropdown */}
            <div className="relative">
              <button
                onClick={() => handleDropdownToggle('getInvolved')}
                className={`px-3 py-2 rounded-lg transition-all duration-200 flex items-center space-x-1 ${openDropdown === 'getInvolved'
                    ? 'text-primary-blue font-semibold bg-blue-50'
                    : 'text-secondary-gray hover:text-primary-blue hover:bg-gray-50'
                  }`}
              >
                <Heart className="h-4 w-4" />
                <span>Get Involved</span>
                <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${openDropdown === 'getInvolved' ? 'rotate-180' : ''}`} />
              </button>

              {openDropdown === 'getInvolved' && (
                <div className="absolute top-full left-0 mt-2 w-64 bg-white rounded-lg shadow-xl border border-gray-100 overflow-hidden z-50 animate-fade-in">
                  {navItems.getInvolved.items.map((item) => (
                    <Link
                      key={item.path}
                      to={item.path}
                      className="flex items-center space-x-3 px-4 py-3 hover:bg-gray-50 transition-colors"
                      onClick={() => setOpenDropdown(null)}
                    >
                      <item.icon className="h-5 w-5 text-primary-blue" />
                      <div>
                        <div className="font-medium text-secondary-dark">{item.name}</div>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* Contact */}
            <Link
              to="/contact"
              className={`px-3 py-2 rounded-lg transition-all duration-200 flex items-center space-x-1 ${isActive('/contact')
                  ? 'text-primary-blue font-semibold bg-blue-50'
                  : 'text-secondary-gray hover:text-primary-blue hover:bg-gray-50'
                }`}
            >
              <Mail className="h-4 w-4" />
              <span>Contact</span>
            </Link>

            {/* Donate CTA Button */}
            <Link
              to="/donate"
              className="ml-4 bg-primary-orange text-white px-5 py-2 rounded-lg font-semibold hover:bg-opacity-90 transition-all duration-300 transform hover:scale-105 shadow-md"
            >
              Donate Now
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition"
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="lg:hidden py-4 border-t max-h-[calc(100vh-4rem)] overflow-y-auto">
            {/* Home */}
            <Link
              to="/"
              onClick={() => setIsOpen(false)}
              className={`flex items-center space-x-3 py-3 px-4 rounded-lg transition ${isActive('/') ? 'bg-blue-50 text-primary-blue font-semibold' : 'hover:bg-gray-50'
                }`}
            >
              <Home className="h-5 w-5" />
              <span>Home</span>
            </Link>

            {/* About Section */}
            <div className="mt-2">
              <div className="flex items-center space-x-3 px-4 py-3 text-secondary-dark font-semibold">
                <Info className="h-5 w-5" />
                <span>About</span>
              </div>
              <div className="ml-8 space-y-1">
                {navItems.about.items.map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={() => setIsOpen(false)}
                    className="flex items-center space-x-3 py-2 px-4 rounded-lg hover:bg-gray-50 transition"
                  >
                    <item.icon className="h-4 w-4 text-primary-blue" />
                    <span className="text-sm">{item.name}</span>
                  </Link>
                ))}
              </div>
            </div>

            {/* Programs Section */}
            <div className="mt-2">
              <div className="flex items-center space-x-3 px-4 py-3 text-secondary-dark font-semibold">
                <Grid className="h-5 w-5" />
                <span>Programs</span>
              </div>
              <div className="ml-8 space-y-1">
                {navItems.programs.items.map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={() => setIsOpen(false)}
                    className="flex items-center space-x-3 py-2 px-4 rounded-lg hover:bg-gray-50 transition"
                  >
                    <item.icon className="h-4 w-4 text-primary-blue" />
                    <span className="text-sm">{item.name}</span>
                  </Link>
                ))}
              </div>
            </div>

            {/* Media Section */}
            <div className="mt-2">
              <div className="flex items-center space-x-3 px-4 py-3 text-secondary-dark font-semibold">
                <Image className="h-5 w-5" />
                <span>Media</span>
              </div>
              <div className="ml-8 space-y-1">
                {navItems.media.items.map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={() => setIsOpen(false)}
                    className="flex items-center space-x-3 py-2 px-4 rounded-lg hover:bg-gray-50 transition"
                  >
                    <item.icon className="h-4 w-4 text-primary-blue" />
                    <span className="text-sm">{item.name}</span>
                  </Link>
                ))}
              </div>
            </div>

            {/* Get Involved Section */}
            <div className="mt-2">
              <div className="flex items-center space-x-3 px-4 py-3 text-secondary-dark font-semibold">
                <Heart className="h-5 w-5" />
                <span>Get Involved</span>
              </div>
              <div className="ml-8 space-y-1">
                {navItems.getInvolved.items.map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={() => setIsOpen(false)}
                    className="flex items-center space-x-3 py-2 px-4 rounded-lg hover:bg-gray-50 transition"
                  >
                    <item.icon className="h-4 w-4 text-primary-blue" />
                    <span className="text-sm">{item.name}</span>
                  </Link>
                ))}
              </div>
            </div>

            {/* Contact */}
            <Link
              to="/contact"
              onClick={() => setIsOpen(false)}
              className={`flex items-center space-x-3 py-3 px-4 rounded-lg transition mt-2 ${isActive('/contact') ? 'bg-blue-50 text-primary-blue font-semibold' : 'hover:bg-gray-50'
                }`}
            >
              <Mail className="h-5 w-5" />
              <span>Contact</span>
            </Link>

            {/* Mobile Donate Button */}
            <Link
              to="/donate"
              onClick={() => setIsOpen(false)}
              className="block mt-4 bg-primary-orange text-white text-center px-5 py-3 rounded-lg font-semibold hover:bg-opacity-90 transition"
            >
              Donate Now
            </Link>
          </div>
        )}
      </div>
    </nav>
  )
}

export default Navbar