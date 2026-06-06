import React from 'react';
import { motion } from 'framer-motion';
import { Target, Eye } from 'lucide-react';

interface MissionVisionHeroProps {
  title: string;
  subtitle: string;
}

const MissionVisionHero: React.FC<MissionVisionHeroProps> = ({ title, subtitle }) => {
  return (
    <section className="relative bg-slate-950 text-white py-28 lg:py-36 overflow-hidden">
      {/* Background Layering */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[radial-gradient(#334155_1px,transparent_1px)] [background-size:32px_32px] opacity-20" />
        <div className="absolute -top-24 -left-24 w-[500px] h-[500px] bg-sky-600/20 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute top-1/2 -right-24 w-[400px] h-[400px] bg-emerald-600/10 rounded-full blur-[100px]" />
      </div>

      <div className="container-custom relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-4xl"
        >
          {/* Modern Badge UI */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center space-x-3 bg-white/5 backdrop-blur-xl border border-white/10 px-4 py-2 rounded-2xl mb-8 shadow-2xl"
          >
            <div className="flex -space-x-2">
              <div className="p-2 bg-sky-500/20 rounded-lg backdrop-blur-md">
                <Target className="h-5 w-5 text-sky-400" />
              </div>
              <div className="p-2 bg-emerald-500/20 rounded-lg backdrop-blur-md border-l border-white/10">
                <Eye className="h-5 w-5 text-emerald-400" />
              </div>
            </div>
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-slate-300">
              Purpose & Direction
            </span>
          </motion.div>

          {/* Dynamic Title Implementation */}
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-black mb-8 leading-[1.1] tracking-tight text-white">
            {title}
          </h1>

          {/* Elegant Subtitle */}
          <p className="text-lg md:text-xl text-slate-400 leading-relaxed max-w-2xl font-medium border-l-2 border-sky-500/30 pl-6">
            {subtitle}
          </p>
        </motion.div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-slate-800 to-transparent" />
    </section>
  );
};

export default MissionVisionHero;