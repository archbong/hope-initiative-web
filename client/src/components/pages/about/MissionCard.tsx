import { motion } from "framer-motion";


interface MissionCardProps {
  title: string
  description: string
  IconComponent?: React.ComponentType<any>
}

const MissionCard = ({ title, description, IconComponent }: MissionCardProps) => {

  return (
    <motion.div
      whileHover={{ y: -5 }}
      className="bg-white rounded-3xl shadow-xl shadow-slate-200/50 p-10 border border-slate-100 relative overflow-hidden"
    >
      <div className="absolute top-0 right-0 p-8 opacity-5">
        {IconComponent && <IconComponent className="h-24 w-24" />}
      </div>
      <div className="w-14 h-14 bg-sky-100 rounded-2xl flex items-center justify-center mb-6">
        {IconComponent && <IconComponent className="h-7 w-7 text-sky-600" />}
      </div>
      <h2 className="text-2xl font-bold text-slate-900 mb-4">{title}</h2>
      <p className="text-slate-600 leading-relaxed text-lg">
        {description}
      </p>
    </motion.div>
  );
}

export default MissionCard;