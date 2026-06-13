import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import { useTranslation } from "react-i18next";

const AboutHero = () => {
  const { t } = useTranslation('about');

  return (
    <section className="relative bg-slate-900 py-24 overflow-hidden">
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
      <div className="absolute top-0 right-0 w-96 h-96 bg-sky-500/10 rounded-full blur-3xl -mr-20 -mt-20"></div>

      <div className="container-custom relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-3xl"
        >
          <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-md px-4 py-2 rounded-full text-sky-400 text-sm font-bold uppercase tracking-wider mb-6 border border-white/10">
            <Sparkles className="h-4 w-4" />
            <span>{t('restoringDiginity')}</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-black text-white mb-6 leading-tight">
            {t('drivenBy')} <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-emerald-400">{t('hope')}</span>, {t('guidedByService')}
          </h1>
          <p className="text-lg md:text-xl text-slate-300 leading-relaxed max-w-2xl">
            {t('dedicated')}
          </p>
        </motion.div>
      </div>
    </section>
  );
}

export default AboutHero;