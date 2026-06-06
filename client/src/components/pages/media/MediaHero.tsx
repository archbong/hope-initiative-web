import { motion } from "framer-motion";


interface MediaHeroProps {
  IconComponent?: React.ComponentType<any>
  iconText?: string
  header: string
  title: string
  description: string
}

const MediaHero = ({ IconComponent, iconText, header, title, description }: MediaHeroProps) => {
  return (
    <section className="relative bg-slate-950 py-24 overflow-hidden rounded-b-[2.5rem] lg:rounded-b-[4rem]">
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5"></div>
      <div className="container-custom relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-3xl"
        >
          <div className="inline-flex items-center space-x-2 bg-white/10 text-orange-400 px-4 py-1.5 rounded-full text-xs font-bold tracking-wide uppercase mb-6 backdrop-blur-sm">
            {IconComponent && <IconComponent className="h-3.5 w-3.5" />}
            <span>{iconText}</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-black text-white mb-6 leading-none tracking-tight">
            {header} <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-amber-300">{title}</span>
          </h1>
          <p className="text-lg md:text-xl text-slate-400 max-w-2xl leading-relaxed">
            {description}
          </p>
        </motion.div>
      </div>
    </section>
  );
}

export default MediaHero;