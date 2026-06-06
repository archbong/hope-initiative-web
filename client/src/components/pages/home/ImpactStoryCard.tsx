import { motion } from "framer-motion";


const ImpactStoryCard = ({ story, index }: any) => {

  return (
    <>
      <motion.div
        key={story.id || index}
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4, delay: index * 0.05 }}
        className="bg-white p-6 sm:p-8 rounded-3xl shadow-sm border border-slate-200/60 relative flex flex-col justify-between"
      >
        <p className="text-slate-600 italic text-sm leading-relaxed mb-6">
          "{story.quote || story.excerpt || 'No excerpt available.'}"
        </p>
        <div className="flex items-center space-x-3 pt-4 border-t border-slate-100">
          {story.authorImage && (
            <img src={story.authorImage} alt={story.author} className="w-10 h-10 rounded-full object-cover" />
          )}
          <div>
            <h4 className="font-bold text-slate-900 text-sm">{story.author || 'Anonymous'}</h4>
            <p className="text-xs text-slate-400">{story.location || 'Beneficiary'}</p>
          </div>
        </div>
      </motion.div>
    </>
  );
}

export default ImpactStoryCard;