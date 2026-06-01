import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Menu, X, Heart } from 'lucide-react'

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const location = useLocation()

  const navigation = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/about' },
    { name: 'Programs', href: '/programs' },
    { name: 'Success Stories', href: '/success-stories' },
    { name: 'Gallery', href: '/gallery' },
    { name: 'Volunteer', href: '/volunteer' },
    { name: 'Donate', href: '/donate' },
    { name: 'Partners', href: '/partners' },
    { name: 'News & Events', href: '/news-events' },
    { name: 'Contact', href: '/contact' },
  ]

  const isActive = (path: string) => location.pathname === path

  return (
    <nav className="bg-white shadow-lg sticky top-0 z-50">
      <div className="container-custom">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <Heart className="h-8 w-8 text-primary-orange" />
            <span className="font-poppins font-bold text-xl text-secondary-dark">
              Hope for the Hopeless
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-6">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`transition-colors duration-200 ${isActive(item.href)
                    ? 'text-primary-blue font-semibold'
                    : 'text-secondary-gray hover:text-primary-blue'
                  }`}
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden"
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden py-4 border-t">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                onClick={() => setIsOpen(false)}
                className={`block py-2 transition-colors duration-200 ${isActive(item.href)
                    ? 'text-primary-blue font-semibold'
                    : 'text-secondary-gray hover:text-primary-blue'
                  }`}
              >
                {item.name}
              </Link>
            ))}
          </div>
        )}
      </div>
    </nav>
  )
}

export default Navbar