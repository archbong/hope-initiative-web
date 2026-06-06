import { motion } from 'framer-motion'
import type { LucideIcon } from 'lucide-react'

interface StrategicPillarProps {
  icon: LucideIcon
  title: string
  description: string
  stat: string
  delay?: number
}

const StrategicPillar: React.FC<StrategicPillarProps> = ({
  icon: Icon,
  title,
  description,
  stat,
  delay = 0
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay }}
      className="bg-white border border-slate-100 rounded-2xl p-6 hover:shadow-xl transition-all duration-300 group"
    >
      <div className="flex items-start space-x-4">
        <div className="w-12 h-12 bg-sky-50 rounded-xl flex items-center justify-center shrink-0 group-hover:bg-sky-600 transition-colors duration-300">
          <Icon className="h-6 w-6 text-sky-600 group-hover:text-white transition-colors duration-300" />
        </div>
        <div className="flex-1">
          <h3 className="text-lg font-bold text-slate-900 mb-2">{title}</h3>
          <p className="text-slate-500 text-sm leading-relaxed mb-3">{description}</p>
          <div className="inline-block bg-slate-50 px-3 py-1 rounded-full text-xs font-semibold text-slate-600">
            {stat}
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default StrategicPillar