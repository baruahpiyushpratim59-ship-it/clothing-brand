import { motion } from "motion/react";
import { ArrowDown, Flame, Sparkles, Anchor } from "lucide-react";

const HeroImage = "/src/assets/images/xloth_hero_1781186979587.jpg";

interface HeroProps {
  onShopClick: () => void;
  onExploreClick: () => void;
}

export default function Hero({ onShopClick, onExploreClick }: HeroProps) {
  return (
    <section className="relative min-h-[calc(100vh-4rem)] lg:h-[calc(100vh-4rem)] mt-16 w-full overflow-hidden flex flex-col lg:flex-row bg-white" id="hero-section">
      
      {/* 60% Column: Deep black visual canvas */}
      <div className="w-full lg:w-[60%] relative bg-black flex flex-col justify-end p-8 sm:p-12 text-white min-h-[480px] lg:min-h-0">
        {/* Background Image with Ken Burns style zoom animation */}
        <div className="absolute inset-0 z-0">
          <motion.img
            initial={{ scale: 1.15, opacity: 0 }}
            animate={{ scale: 1, opacity: 0.65 }}
            transition={{ duration: 2.2, ease: "easeOut" }}
            src={HeroImage}
            alt="XLoth Editorial Luxury Fashion"
            className="w-full h-full object-cover object-center"
            referrerPolicy="no-referrer"
            id="hero-bg-img"
          />
          {/* Luxury Vignette gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-black/60 z-10" />
        </div>

        {/* Hero Left Content Area */}
        <div className="relative z-10 max-w-xl text-left">
          {/* Editorial Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-gold text-xs font-mono uppercase tracking-[0.4em] mb-4 flex items-center gap-1.5"
          >
            <Sparkles className="w-4 h-4 animate-spin text-gold" style={{ animationDuration: '8s' }} />
            <span>Winter SS/26 Collection</span>
          </motion.p>

          {/* Master Logo Text */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="text-white text-5xl sm:text-6xl lg:text-7xl font-light tracking-tighter leading-[0.95] mb-8 uppercase"
          >
            REDEFINING<br/>MODERN<br/>
            <span className="font-serif italic font-normal tracking-wide text-zinc-300">FASHION</span>
          </motion.h1>

          {/* Premium Brand Narrative Pitch */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="text-zinc-300 font-sans font-light text-xs sm:text-sm max-w-md mb-8 leading-relaxed tracking-wide"
          >
            A curated universe of heavyweight silhouettes, architectural tailored streetwear, and organic textiles. Built for the modern archivist.
          </motion.p>

          {/* CTA Actions Bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.9 }}
            className="flex flex-col sm:flex-row items-center gap-4 w-full"
          >
            {/* Main Action Shop Now with Gold glow */}
            <button
              onClick={onShopClick}
              id="hero-shop-btn"
              className="w-full sm:w-auto px-10 py-4 bg-white text-black font-display font-bold text-[11px] uppercase tracking-[0.2em] hover:bg-gold hover:text-white transition-all duration-300 flex items-center justify-center space-x-2 focus:outline-none cursor-pointer"
            >
              <Flame className="w-4 h-4 text-black group-hover:text-white" />
              <span>Shop Now</span>
            </button>

            {/* Secondary Action Explore Collection with minimalist boundary line */}
            <button
              onClick={onExploreClick}
              id="hero-explore-btn"
              className="w-full sm:w-auto px-10 py-4 bg-transparent text-white font-display font-bold text-[11px] uppercase tracking-[0.2em] border border-white hover:bg-white hover:text-black transition-all duration-300 flex items-center justify-center space-x-2 focus:outline-none cursor-pointer"
            >
              <Anchor className="w-4 h-4 text-zinc-300" />
              <span>Explore</span>
            </button>
          </motion.div>
        </div>
      </div>

      {/* 40% Column: Bento grid layouts with white/gray contrast */}
      <div className="w-full lg:w-[40%] flex flex-col">
        
        {/* Top half: Featured collection showcase card */}
        <div 
          onClick={onExploreClick}
          className="h-1/2 border-b border-l border-zinc-150 p-8 sm:p-10 flex flex-col justify-between group cursor-pointer bg-white text-black text-left hover:bg-zinc-50/50 transition-colors duration-300"
        >
          <div className="flex justify-between items-start">
            <span className="text-[10px] uppercase tracking-[0.3em] text-zinc-400 font-mono">01 / Essentials</span>
            <svg className="w-5 h-5 text-zinc-400 transform group-hover:translate-x-1.5 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
            </svg>
          </div>
          <div className="my-4">
            <h2 className="text-3xl sm:text-4xl font-light tracking-tight mb-2 font-display">OVERSIZED<br/>SERIES</h2>
            <p className="text-xs sm:text-sm text-zinc-500 max-w-[280px] leading-relaxed">
              Engineered from 450GSM premium heavy-weight cotton. Minimalist silhouette meets architectural structure.
            </p>
          </div>
          <div className="h-28 sm:h-32 w-full bg-zinc-50 overflow-hidden relative">
            <div 
              className="w-full h-full bg-cover bg-center opacity-90 transition-transform duration-700 ease-out group-hover:scale-105" 
              style={{ backgroundImage: "url('https://images.unsplash.com/photo-1556906781-9a412961c28c?auto=format&fit=crop&q=80&w=600')" }}
            />
          </div>
        </div>

        {/* Bottom half: High-contrast brand pillars */}
        <div className="h-1/2 border-l border-zinc-150 p-8 sm:p-10 flex flex-col justify-center bg-zinc-50/70 text-black text-left">
          <div className="space-y-6 sm:space-y-8">
            <div className="flex items-start gap-4">
              <div className="w-px h-10 bg-gold self-stretch" />
              <div>
                <h3 className="text-[11px] uppercase tracking-[0.2em] font-bold mb-1 text-zinc-900">Premium Craftsmanship</h3>
                <p className="text-[10px] text-zinc-500 uppercase tracking-widest leading-relaxed">Hand-sourced Italian textiles.</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="w-px h-10 bg-black self-stretch" />
              <div>
                <h3 className="text-[11px] uppercase tracking-[0.2em] font-bold mb-1 text-zinc-900">Modern Philosophy</h3>
                <p className="text-[10px] text-zinc-500 uppercase tracking-widest leading-relaxed">Ethical production, timeless design.</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="w-px h-10 bg-black self-stretch" />
              <div>
                <h3 className="text-[11px] uppercase tracking-[0.2em] font-bold mb-1 text-zinc-900">Global Shipping</h3>
                <p className="text-[10px] text-zinc-500 uppercase tracking-widest leading-relaxed">Luxury experience delivered worldwide.</p>
              </div>
            </div>
          </div>
        </div>

      </div>

    </section>
  );
}
