import { motion } from 'framer-motion'
import { TrendingUp, TrendingDown, DollarSign } from 'lucide-react'

interface StatCardProps {
  title: string
  value: number
  icon: 'trending-up' | 'trending-down' | 'dollar'
  color?: string
  prefix?: string
  suffix?: string
  delay?: number
}

const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  icon,
  color = 'text-sky-600',
  prefix = '₦',
  suffix = '',
  delay = 0
}) => {
  const IconComponent = icon === 'trending-up' ? TrendingUp : icon === 'trending-down' ? TrendingDown : DollarSign

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay }}
      className="bg-white rounded-2xl p-6 shadow-lg border border-slate-100 hover:shadow-xl transition-all duration-300"
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-slate-500 font-medium text-sm uppercase tracking-wider">{title}</h3>
        <div className={`p-2 bg-slate-50 rounded-xl ${color}`}>
          <IconComponent className="h-5 w-5" />
        </div>
      </div>
      <div className="text-3xl font-black text-slate-900">
        {prefix}{value.toLocaleString()}{suffix}
      </div>
    </motion.div>
  )
}

export default StatCard