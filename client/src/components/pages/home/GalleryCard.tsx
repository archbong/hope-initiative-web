import { motion } from "framer-motion";

const GalleryCard = ({ img, index }: { img: any; index: number }) => {

  return (
    <motion.div
      key={img.id || index}
      whileHover={{ scale: 1.02 }}
      className="h-44 sm:h-56 rounded-2xl overflow-hidden shadow-sm border border-slate-200 relative group"
    >
      <img
        src={img.url || img.image}
        alt={img.title || "Gallery Item"}
        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-slate-950/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
        <p className="text-white text-xs font-semibold truncate w-full">{img.title || 'View Event'}</p>
      </div>
    </motion.div>
  );
}

export default GalleryCard;