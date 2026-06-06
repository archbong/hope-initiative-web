import { useEffect } from 'react'
import { motion } from 'framer-motion'
import { CheckCircle, XCircle, Info, AlertCircle, X } from 'lucide-react'

export type ToastType = 'success' | 'error' | 'info' | 'warning'

interface ToastProps {
  message: string
  type?: ToastType
  duration?: number
  onClose: () => void
}

const Toast: React.FC<ToastProps> = ({
  message,
  type = 'info',
  duration = 4000,
  onClose
}) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose()
    }, duration)
    return () => clearTimeout(timer)
  }, [duration, onClose])

  const config = {
    success: {
      icon: CheckCircle,
      bgColor: 'bg-emerald-500',
      borderColor: 'border-emerald-600',
      textColor: 'text-white',
      iconColor: 'text-emerald-100',
      title: 'Success!',
    },
    error: {
      icon: XCircle,
      bgColor: 'bg-rose-500',
      borderColor: 'border-rose-600',
      textColor: 'text-white',
      iconColor: 'text-rose-100',
      title: 'Error!',
    },
    warning: {
      icon: AlertCircle,
      bgColor: 'bg-amber-500',
      borderColor: 'border-amber-600',
      textColor: 'text-white',
      iconColor: 'text-amber-100',
      title: 'Warning!',
    },
    info: {
      icon: Info,
      bgColor: 'bg-sky-500',
      borderColor: 'border-sky-600',
      textColor: 'text-white',
      iconColor: 'text-sky-100',
      title: 'Info',
    },
  }

  const { icon: Icon, bgColor, borderColor, textColor, iconColor, title } = config[type]

  return (
    <motion.div
      initial={{ opacity: 0, x: 50, scale: 0.9 }}
      animate={{ opacity: 1, x: 0, scale: 1 }}
      exit={{ opacity: 0, x: 50, scale: 0.9 }}
      transition={{ duration: 0.3, type: 'spring', stiffness: 500, damping: 30 }}
      className={`fixed top-20 right-4 z-50 w-80 md:w-96 ${bgColor} rounded-xl shadow-2xl border-l-4 ${borderColor} overflow-hidden`}
    >
      <div className="relative p-4">
        {/* Progress bar */}
        <motion.div
          initial={{ width: '100%' }}
          animate={{ width: '0%' }}
          transition={{ duration: duration / 1000, ease: 'linear' }}
          className={`absolute bottom-0 left-0 h-1 ${bgColor === 'bg-emerald-500' ? 'bg-emerald-300' : bgColor === 'bg-rose-500' ? 'bg-rose-300' : bgColor === 'bg-amber-500' ? 'bg-amber-300' : 'bg-sky-300'}`}
        />

        <div className="flex items-start space-x-3">
          {/* Icon */}
          <div className={`p-1.5 rounded-lg bg-white/10 ${iconColor}`}>
            <Icon className="h-5 w-5" />
          </div>

          {/* Content */}
          <div className="flex-1">
            <h4 className={`font-bold text-sm ${textColor}`}>{title}</h4>
            <p className={`text-xs ${textColor} opacity-90 mt-0.5`}>{message}</p>
          </div>

          {/* Close button */}
          <button
            onClick={onClose}
            className={`p-1 rounded-lg hover:bg-white/10 transition-colors ${textColor}`}
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      </div>
    </motion.div>
  )
}

export default Toast