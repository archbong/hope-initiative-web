import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Home, Heart, ArrowLeft, Search } from 'lucide-react'

const NotFound = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-blue to-primary-green flex items-center justify-center px-4">
      <div className="container-custom py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-2xl mx-auto text-center"
        >
          {/* 404 Animation */}
          <div className="relative mb-8">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-8xl md:text-9xl font-bold text-white opacity-20"
            >
              404
            </motion.div>
            <motion.div
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="absolute inset-0 flex items-center justify-center"
            >
              <Heart className="h-24 w-24 md:h-32 md:w-32 text-primary-orange animate-pulse" />
            </motion.div>
          </div>

          {/* Error Message */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="text-3xl md:text-4xl font-bold text-white mb-4"
          >
            Page Not Found
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="text-lg text-white opacity-90 mb-8"
          >
            Oops! The page you're looking for seems to have wandered off.
            But don't worry, hope is never lost.
          </motion.p>

          {/* Search Suggestions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.0 }}
            className="bg-white bg-opacity-10 rounded-xl p-6 mb-8"
          >
            <h3 className="text-white font-semibold mb-3 flex items-center justify-center">
              <Search className="h-5 w-5 mr-2" />
              You might be looking for:
            </h3>
            <div className="flex flex-wrap justify-center gap-3">
              {['Home', 'About', 'Programs', 'Volunteer', 'Donate', 'Contact'].map((page) => (
                <Link
                  key={page}
                  to={`/${page.toLowerCase() === 'home' ? '' : page.toLowerCase()}`}
                  className="px-4 py-2 bg-white text-primary-blue rounded-lg hover:bg-gray-100 transition transform hover:scale-105"
                >
                  {page}
                </Link>
              ))}
            </div>
          </motion.div>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.2 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link
              to="/"
              className="inline-flex items-center justify-center space-x-2 bg-white text-primary-blue px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition transform hover:scale-105"
            >
              <Home className="h-5 w-5" />
              <span>Back to Home</span>
            </Link>
            <button
              onClick={() => window.history.back()}
              className="inline-flex items-center justify-center space-x-2 border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-primary-blue transition transform hover:scale-105"
            >
              <ArrowLeft className="h-5 w-5" />
              <span>Go Back</span>
            </button>
          </motion.div>

          {/* Help Section */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 1.4 }}
            className="mt-12 pt-8 border-t border-white border-opacity-20"
          >
            <p className="text-white opacity-80 text-sm">
              Still need help?{" "}
              <Link to="/contact" className="font-semibold hover:text-primary-orange transition underline">
                Contact our support team
              </Link>
            </p>
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}

export default NotFound