import { motion } from "motion/react";
import { ArrowRight, Box } from "lucide-react";

interface CollectionsProps {
  onSelectCollection: (category: string) => void;
  selectedCategory: string;
}

export default function Collections({ onSelectCollection, selectedCategory }: CollectionsProps) {
  const collections = [
    {
      id: "oversized-t-shirts",
      title: "Oversized T-Shirts",
      sub: "Heavyweight 315GSM Essentials",
      image: "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?q=80&w=600&auto=format&fit=crop",
      count: "12 Pieces",
      categoryKey: "Oversized T-Shirts"
    },
    {
      id: "hoodies",
      title: "Archival Hoodies",
      sub: "French Terry Architectural Cut",
      image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?q=80&w=600&auto=format&fit=crop",
      count: "8 Pieces",
      categoryKey: "Hoodies"
    },
    {
      id: "streetwear",
      title: "Streetwear",
      sub: "Bespoke Outerwear & Cargos",
      image: "https://images.unsplash.com/photo-1509281373149-e957c6296406?q=80&w=600&auto=format&fit=crop",
      count: "16 Pieces",
      categoryKey: "Streetwear"
    },
    {
      id: "new-arrivals",
      title: "New Arrivals",
      sub: "S/W 2026 Core Commisions",
      image: "https://images.unsplash.com/photo-1574164904299-3a102b110380?q=80&w=600&auto=format&fit=crop",
      count: "5 Pieces",
      categoryKey: "New Arrivals"
    },
    {
      id: "best-sellers",
      title: "Best Sellers",
      sub: "Unrivaled Silhouette Staples",
      image: "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?q=80&w=600&auto=format&fit=crop",
      count: "10 Pieces",
      categoryKey: "Best Sellers"
    }
  ];

  return (
    <section className="py-24 bg-zinc-50 border-t border-b border-zinc-150 px-4 sm:px-6 lg:px-8" id="collections">
      <div className="max-w-7xl mx-auto">
        {/* Header Grid */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="text-left">
            <div className="flex items-center space-x-2 text-gold font-mono text-[10px] tracking-[0.3em] uppercase mb-3">
              <Box className="w-3.5 h-3.5" />
              <span>curated capsules</span>
            </div>
            <h2 className="font-display font-light text-3xl sm:text-5xl text-black uppercase tracking-tight">
              Featured <span className="font-serif italic font-normal text-zinc-500">Collections</span>
            </h2>
          </div>
          <p className="max-w-md text-zinc-500 font-sans font-light text-xs sm:text-sm text-left leading-relaxed">
            Five bespoke catalogs engineered with architectural structures, dense textiles, 
            and mineral-dyed finishes. Select any capsule to filter our ready-to-wear showroom.
          </p>
        </div>

        {/* Collections Bento Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
          {collections.map((col, index) => {
            const isActive = selectedCategory === col.categoryKey;
            return (
              <motion.div
                key={col.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                onClick={() => onSelectCollection(col.categoryKey)}
                className={`group relative h-[420px] bg-white border overflow-hidden cursor-pointer flex flex-col justify-end p-6 transition-all duration-500 ${
                  isActive 
                    ? "border-gold shadow-md shadow-gold/5" 
                    : "border-zinc-200 hover:border-black"
                }`}
                id={`col-card-${col.id}`}
              >
                {/* Background Image */}
                <div className="absolute inset-0 z-0">
                  <img
                    src={col.image}
                    alt={col.title}
                    className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-110 filter brightness-[0.7] group-hover:brightness-[0.4]"
                    referrerPolicy="no-referrer"
                  />
                  {/* Luxury shadow overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/35 to-transparent z-10" />
                </div>

                {/* Info Text */}
                <div className="relative z-20 text-left">
                  <span className="font-mono text-[9px] text-gold tracking-widest uppercase block mb-1">
                    {col.sub}
                  </span>
                  <h3 className="font-display text-white text-lg font-bold uppercase tracking-wide mb-3">
                    {col.title}
                  </h3>
                  
                  {/* Bottom metrics sliding up */}
                  <div className="flex items-center justify-between border-t border-white/20 pt-3 text-[10px] text-zinc-300 font-mono">
                    <span>{col.count}</span>
                    <span className="flex items-center text-zinc-200 group-hover:text-gold transition-colors">
                      <span className="opacity-0 group-hover:opacity-100 transform translate-x-2 group-hover:translate-x-0 transition-all duration-300 mr-1.5 font-sans font-bold">SHOWROOM</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </div>

                {/* Small indicator label */}
                {isActive && (
                  <span className="absolute top-4 right-4 bg-gold text-black font-mono text-[8px] font-black tracking-widest px-2.5 py-0.5 rounded shadow-sm">
                    SELECTED
                  </span>
                )}
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
