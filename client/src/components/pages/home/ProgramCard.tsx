import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { cn } from '../../ui/cn';


interface Program {
  id: string;
  title: string;
  description: string;
  image: string;
  slug: string;
  icon?: string;
  impact?: string;
}

interface ProgramCardProps {
  program: Program;
  index: number;
  variant?: 'home' | 'program-page';
  accentColor?: string; // e.g., 'sky-600' or 'emerald-600'
  IconComponent?: LucideIcon;
}

export const ProgramCard = ({
  program,
  index,
  variant = 'home',
  accentColor = 'sky-600',
  IconComponent
}: ProgramCardProps) => {
  const navigate = useNavigate();
  const isHome = variant === 'home';

  // shared animation settings
  const animationProps = {
    initial: { opacity: 0, y: 20 },
    whileInView: isHome ? { opacity: 1, y: 0 } : undefined,
    animate: !isHome ? { opacity: 1, y: 0 } : undefined,
    viewport: { once: true },
    transition: { duration: 0.5, delay: index * 0.05 },
    whileHover: isHome ? undefined : { y: -6 }
  };

  return (
    <motion.div
      {...animationProps}
      onClick={!isHome ? () => navigate(`/programs/${program.slug}`) : undefined}
      className={cn(
        "group bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden transition-all duration-300 flex flex-col h-full",
        isHome ? "hover:shadow-xl" : "hover:border-slate-200 hover:shadow-xl shadow-slate-200/50 cursor-pointer"
      )}
    >
      {/* Image Section */}
      <div className={cn("overflow-hidden relative bg-slate-100", isHome ? "h-52" : "aspect-video")}>
        <img
          src={program.image}
          alt={program.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
          loading="lazy"
        />

        {/* Conditional Overlay for Home vs Icon for Program Page */}
        {isHome ? (
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/20 to-transparent" />
        ) : (
          IconComponent && (
            <div className="absolute top-4 left-4">
              <div className="w-10 h-10 rounded-xl bg-white/90 backdrop-blur-md flex items-center justify-center shadow-md">
                <IconComponent className={cn("h-5 w-5", `text-${accentColor}`)} />
              </div>
            </div>
          )
        )}
      </div>

      {/* Content Section */}
      <div className="p-6 sm:p-8 flex flex-col flex-grow">
        <h3 className="text-xl font-bold text-slate-950 mb-3 tracking-tight group-hover:text-sky-600 transition-colors">
          {program.title}
        </h3>
        <p className={cn("text-slate-600 text-sm leading-relaxed mb-6", isHome ? "line-clamp-3" : "line-clamp-2")}>
          {program.description}
        </p>

        {/* Footer Section: Home Button vs Program Metrics */}
        {isHome ? (
          <Link
            to={`/programs/${program.slug}`}
            className="text-sm text-sky-600 font-bold inline-flex items-center group/btn mt-auto"
          >
            <span>Analyze Scope</span>
            <ArrowRight className="h-4 w-4 ml-1.5 transform group-hover/btn:translate-x-1 transition-transform" />
          </Link>
        ) : (
          <div className="flex items-center justify-between pt-4 border-t border-slate-100 mt-auto">
            <div className="flex flex-col">
              <span className="text-[11px] font-black uppercase text-slate-400 tracking-wider">Metrics Achieved</span>
              <span className={cn("text-sm font-bold tracking-tight", `text-${accentColor}`)}>
                {program.impact?.split(',')[0] || 'Pending'}
              </span>
            </div>
            <div className={cn("w-8 h-8 rounded-xl flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 transform group-hover:translate-x-0 -translate-x-2", `bg-${accentColor}/10`)}>
              <ArrowUpRight className={cn("h-4 w-4", `text-${accentColor}`)} />
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default ProgramCard;