import { AnimatePresence } from 'framer-motion'
import Toast, { type ToastType } from './Toast'

export interface ToastItem {
  id: string
  message: string
  type: ToastType
  duration?: number
}

interface ToastContainerProps {
  toasts: ToastItem[]
  onRemove: (id: string) => void
}

const ToastContainer: React.FC<ToastContainerProps> = ({ toasts, onRemove }) => {
  return (
    <div className="fixed top-4 right-4 z-50 flex flex-col gap-2">
      <AnimatePresence mode="popLayout">
        {toasts.map((toast) => (
          <Toast
            key={toast.id}
            message={toast.message}
            type={toast.type}
            duration={toast.duration || 4000}
            onClose={() => onRemove(toast.id)}
          />
        ))}
      </AnimatePresence>
    </div>
  )
}

export default ToastContainer