import { motion } from "framer-motion";
import { Award, Heart, TrendingUp, Users } from "lucide-react";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";



const HomeStats = () => {
  const { t } = useTranslation('about')

  const childrenSupport = `${t('childrenSupported')}`
  const mealsDistributed = `${t('mealsDistributed')}`
  const communitiesImpacted = `${t('communitiesImpacted')}`

  const [stats, setStats] = useState({
    childrenSupported: 0,
    mealsDistributed: 0,
    youthReached: 0,
    communitiesImpacted: 0
  })

  useEffect(() => {
    const targetStats = {
      childrenSupported: 1250,
      mealsDistributed: 8750,
      youthReached: 3200,
      communitiesImpacted: 15
    }

    const duration = 2000
    const interval = 30
    const steps = duration / interval
    let currentStep = 0

    const timer = setInterval(() => {
      currentStep++
      const progress = currentStep / steps

      setStats({
        childrenSupported: Math.min(Math.floor(targetStats.childrenSupported * progress), targetStats.childrenSupported),
        mealsDistributed: Math.min(Math.floor(targetStats.mealsDistributed * progress), targetStats.mealsDistributed),
        youthReached: Math.min(Math.floor(targetStats.youthReached * progress), targetStats.youthReached),
        communitiesImpacted: Math.min(Math.floor(targetStats.communitiesImpacted * progress), targetStats.communitiesImpacted)
      })

      if (currentStep >= steps) clearInterval(timer)
    }, interval)

    return () => clearInterval(timer)
  }, [])

  const statItems = [
    { icon: Users, label: childrenSupport, value: stats.childrenSupported, color: 'bg-blue-500/10 text-blue-600' },
    { icon: Heart, label: mealsDistributed, value: stats.mealsDistributed, color: 'bg-red-500/10 text-red-600' },
    { icon: TrendingUp, label: 'Youth Reached', value: stats.youthReached, color: 'bg-emerald-500/10 text-emerald-600' },
    { icon: Award, label: communitiesImpacted, value: stats.communitiesImpacted, color: 'bg-amber-500/10 text-amber-600' },
  ]

  return (
    <section className="relative -mt-10 z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="bg-white rounded-3xl shadow-xl border border-slate-100 p-8 sm:p-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {statItems.map((stat: any, index: number) => {
          const Icon = stat.icon
          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              className="flex items-center space-x-4 p-4 rounded-2xl hover:bg-slate-50 transition-colors"
            >
              <div className={`p-4 rounded-2xl ${stat.color} shrink-0`}>
                <Icon className="h-6 w-6" />
              </div>
              <div>
                <h3 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
                  {stat.value.toLocaleString()}+
                </h3>
                <p className="text-slate-500 font-medium text-sm">{stat.label}</p>
              </div>
            </motion.div>
          )
        })}
      </div>
    </section>
  );
}

export default HomeStats;