import { Link } from 'react-router-dom'
import { Heart, Mail, Phone, MapPin } from 'lucide-react'
import { FacebookIcon, LinkedinIcon, InstagramIcon, TwitterIcon } from '../ui/SocialIcons'

const Footer = () => {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-secondary-dark text-white pt-12 pb-6">
      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* About Section */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <Heart className="h-6 w-6 text-primary-orange" />
              <h3 className="font-poppins font-semibold text-lg">
                Hope for the Hopeless
              </h3>
            </div>
            <p className="text-gray-300 text-sm">
              Restoring Hope, Transforming Lives through humanitarian support, youth empowerment, and community development.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-poppins font-semibold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/about" className="text-gray-300 hover:text-primary-orange transition">About Us</Link></li>
              <li><Link to="/programs" className="text-gray-300 hover:text-primary-orange transition">Our Programs</Link></li>
              <li><Link to="/volunteer" className="text-gray-300 hover:text-primary-orange transition">Volunteer</Link></li>
              <li><Link to="/donate" className="text-gray-300 hover:text-primary-orange transition">Donate</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-poppins font-semibold text-lg mb-4">Contact Us</h3>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center space-x-2">
                <Mail className="h-4 w-4 text-primary-orange" />
                <span className="text-gray-300">info@hopeforthehopeless.org</span>
              </li>
              <li className="flex items-center space-x-2">
                <Phone className="h-4 w-4 text-primary-orange" />
                <span className="text-gray-300">+234 123 456 7890</span>
              </li>
              <li className="flex items-center space-x-2">
                <MapPin className="h-4 w-4 text-primary-orange" />
                <span className="text-gray-300">Abuja, Nigeria</span>
              </li>
            </ul>
          </div>

          {/* Social Links */}
          <div>
            <h3 className="font-poppins font-semibold text-lg mb-4">Follow Us</h3>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-300 hover:text-primary-orange transition">
                <FacebookIcon className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-300 hover:text-primary-orange transition">
                <TwitterIcon className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-300 hover:text-primary-orange transition">
                <InstagramIcon className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-300 hover:text-primary-orange transition">
                <LinkedinIcon className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-700 pt-6 text-center text-gray-400 text-sm">
          <p>&copy; {currentYear} Hope for the Hopeless Initiative. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer