import { useState } from 'react'
import { motion } from 'framer-motion'
import { ChevronDown, ChevronUp, Mail } from 'lucide-react'
import { LinkedinIcon, TwitterIcon } from '../../ui/SocialIcons'


interface LeadershipCardProps {
  name: string
  title: string
  bio: string
  image: string
  social?: {
    linkedin?: string
    twitter?: string
    email?: string
  }
  delay?: number
  featured?: boolean
}

const LeadershipCard: React.FC<LeadershipCardProps> = ({
  name,
  title,
  bio,
  image,
  social,
  delay = 0,
  featured = false
}) => {
  const [isExpanded, setIsExpanded] = useState<Boolean>(false);
  const isLongBio = bio.length > 250;
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay }}
      className={`group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 ${featured ? 'lg:col-span-2 lg:flex' : ''}`}
    >
      <div className={`relative overflow-hidden ${featured ? 'lg:w-2/5' : 'w-full'}`}>
        <div className="aspect-square overflow-hidden">
          <img
            src={image}
            alt={name}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            onError={(e) => {
              (e.target as HTMLImageElement).src = 'https://placehold.co/400x400/e2e8f0/64748b?text=Photo'
            }}
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      </div>

      <div className={`p-6 ${featured ? 'lg:w-3/5 lg:p-8' : ''}`}>
        <h3 className="text-xl font-bold text-slate-900 mb-1">{name}</h3>
        <p className="text-sky-600 font-semibold text-sm mb-3">{title}</p>
        <motion.p
          layout="position"
          className={`text-slate-500 text-sm leading-relaxed transition-all duration-300 ${isExpanded ? '' : 'line-clamp-3'
            }`}
        >
          {bio}
        </motion.p>
        {isLongBio && (
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="mt-2 text-xs font-bold text-sky-600 hover:text-sky-700 flex items-center gap-1 focus:outline-none focus:underline"
          >
            {isExpanded ? (
              <>Read Less <ChevronUp className="h-3 w-3" /></>
            ) : (
              <>Read More <ChevronDown className="h-3 w-3" /></>
            )}
          </button>
        )}
        {/* <p className="text-slate-500 text-sm leading-relaxed line-clamp-3">{bio}</p> */}

        {social && (
          <div className="flex items-center space-x-3 mt-4 pt-4 border-t border-slate-100">
            {social.linkedin && (
              <a
                href={social.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-400 hover:text-blue-600 transition"
              >
                <LinkedinIcon className="h-4 w-4" />
              </a>
            )}
            {social.twitter && (
              <a
                href={social.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-400 hover:text-sky-500 transition"
              >
                <TwitterIcon className="h-4 w-4" />
              </a>
            )}
            {social.email && (
              <a
                href={`mailto:${social.email}`}
                className="text-slate-400 hover:text-emerald-600 transition"
              >
                <Mail className="h-4 w-4" />
              </a>
            )}
          </div>
        )}
      </div>
    </motion.div>
  )
}

export default LeadershipCard