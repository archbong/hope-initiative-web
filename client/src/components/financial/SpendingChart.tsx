import { motion } from 'framer-motion'

interface SpendingChartProps {
  data: {
    category: string
    amount: number
    percentage: number
  }[]
}

const SpendingChart: React.FC<SpendingChartProps> = ({ data }) => {
  const colors = ['#0B5ED7', '#198754', '#FD7E14', '#6C757D', '#0D9488']

  return (
    <div className="space-y-4">
      {data.map((item, index) => (
        <motion.div
          key={item.category}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: index * 0.1 }}
        >
          <div className="flex justify-between text-sm mb-1">
            <span className="text-slate-600">{item.category}</span>
            <span className="font-semibold text-slate-900">₦{item.amount.toLocaleString()} ({item.percentage}%)</span>
          </div>
          <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${item.percentage}%` }}
              transition={{ duration: 1, delay: index * 0.1 }}
              className={`h-full rounded-full`}
              style={{ backgroundColor: colors[index % colors.length] }}
            />
          </div>
        </motion.div>
      ))}
    </div>
  )
}

export default SpendingChart