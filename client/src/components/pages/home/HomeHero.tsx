import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import { LinkButton } from "./LinkButton";
import { useTranslation } from "react-i18next";

const HomeHero = () => {
  const { t } = useTranslation()

  return (
    <section className="relative bg-gradient-to-br from-slate-900 via-sky-950 to-slate-900 text-white py-24 lg:py-32 overflow-hidden">
      <div className="absolute inset-0 opacity-40 mix-blend-overlay bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] [background-size:16px_16px]" />
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-sky-500/10 rounded-full blur-3xl -mr-40 -mt-40" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-emerald-500/10 rounded-full blur-3xl -ml-40 -mb-40" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-3xl">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
            className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-md px-3 py-1.5 rounded-full text-xs font-semibold tracking-wide text-sky-300 uppercase mb-6 border border-white/10"
          >
            <Sparkles className="h-3.5 w-3.5 text-amber-400 fill-amber-400" />
            <span>Making a visible difference in Nigeria</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-extrabold mb-6 tracking-tight leading-[1.1]"
          >
            Restoring <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-emerald-400">Hope</span>,<br />
            Transforming Lives.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg sm:text-xl mb-10 text-slate-300 font-medium leading-relaxed max-w-2xl"
          >
            Empowering vulnerable individuals and communities through tactical humanitarian support, foundational youth development programs, and sustainable execution frameworks.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <LinkButton to="/donate" variant="primary">{t('donate.donateNow')}</LinkButton>
            <LinkButton to="/volunteer" variant="secondary">{t('home.volunteerNow')}</LinkButton>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default HomeHero;