import { motion } from 'framer-motion'
import { User } from 'lucide-react'

interface BoardMemberCardProps {
  name: string
  title: string
  bio: string
  image: string
  delay?: number
}

const BoardMemberCard: React.FC<BoardMemberCardProps> = ({
  name,
  title,
  bio,
  image,
  delay = 0
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay }}
      className="bg-white rounded-xl p-6 text-center shadow-md hover:shadow-lg transition-all duration-300"
    >
      <div className="w-24 h-24 rounded-full mx-auto overflow-hidden mb-4 bg-slate-100">
        {image && image !== '/images/placeholder.jpg' ? (
          <img
            src={image}
            alt={name}
            className="w-full h-full object-cover"
            onError={(e) => {
              (e.target as HTMLImageElement).src = 'https://placehold.co/200x200/e2e8f0/64748b?text=Photo'
            }}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <User className="h-10 w-10 text-slate-400" />
          </div>
        )}
      </div>
      <h3 className="font-bold text-slate-900">{name}</h3>
      <p className="text-sky-600 text-sm font-medium mb-2">{title}</p>
      <p className="text-slate-500 text-xs leading-relaxed">{bio}</p>
    </motion.div>
  )
}

export default BoardMemberCard