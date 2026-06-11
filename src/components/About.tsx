import { motion } from "motion/react";
import { Award, Compass, ShieldCheck, Cpu } from "lucide-react";
import { CRAFTSMANSHIP_DETAILS } from "../data";

export default function About() {
  return (
    <section className="py-24 bg-white border-t border-b border-zinc-150 px-4 sm:px-6 lg:px-8 text-left" id="about">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          
          {/* Narrative Pillar (Left side block) */}
          <div className="lg:col-span-5 space-y-8">
            <div className="flex items-center space-x-2 text-gold font-mono text-[10px] tracking-[0.3em] uppercase">
              <Award className="w-4 h-4" />
              <span>the brand philosophy</span>
            </div>

            <h2 className="font-display font-light text-4xl sm:text-6xl text-black uppercase tracking-tight leading-none">
              Bespoke <br />
              <span className="font-serif italic font-normal text-zinc-500">Craftsmanship</span>
            </h2>

            <p className="text-zinc-600 font-sans font-light text-xs sm:text-sm leading-relaxed tracking-wide">
              Founded in Tokyo's industrial design blocks, XLoth began as an experimental laboratory. 
              Our founders rejected cheap transient fashion in favor of heavy, structural, timeless garments. 
              We operate at the nexus of monumental concrete architecture and wearable streetwear.
            </p>

            <blockquote className="border-l-2 border-gold pl-4 py-1 italic font-serif text-black text-sm sm:text-base">
              "We do not design garments for a single week or seasonal cycle. We engineer wearable shields of heavy organic yarn that hold their majestic structures for a lifetime."
              <cite className="block text-[9px] font-mono text-gold tracking-widest mt-2 uppercase not-italic">
                &mdash; YUKIHIRO S., CREATIVE HEAD
              </cite>
            </blockquote>

            {/* Metrics list */}
            <div className="grid grid-cols-2 gap-6 border-t border-zinc-200 pt-8 mt-4">
              <div>
                <span className="block font-display text-2xl font-black text-black">460GSM</span>
                <span className="block font-mono text-[9px] text-zinc-400 uppercase tracking-widest">
                  Maximum Fabric Density
                </span>
              </div>
              <div>
                <span className="block font-display text-2xl font-black text-black">100%</span>
                <span className="block font-sans text-xs text-zinc-700 font-medium">
                  Verified Org. Cotton
                </span>
                <span className="block font-mono text-[9px] text-zinc-400 uppercase tracking-widest">
                  Certified Organic
                </span>
              </div>
            </div>
          </div>

          {/* Graphic / Milestone bento blocks (Right side) */}
          <div className="lg:col-span-7 space-y-6">
            <div className="bg-zinc-50/80 p-8 border border-zinc-200 rounded-xs">
              <h3 className="font-display text-black text-[10px] sm:text-xs font-bold uppercase tracking-[0.2em] mb-8 border-b border-zinc-150 pb-3 flex items-center space-x-2">
                <Compass className="w-4 h-4 text-gold animate-pulse" />
                <span>XLOTH MANUFACTURING PRINCIPLES</span>
              </h3>

              <div className="space-y-8">
                {CRAFTSMANSHIP_DETAILS.map((milestone, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: idx * 0.1 }}
                    className="flex flex-col sm:flex-row gap-4 items-start"
                  >
                    <div className="bg-white border border-zinc-200 p-2 text-gold rounded font-mono text-xs w-10 h-10 flex items-center justify-center flex-shrink-0 font-bold">
                      {idx + 1}
                    </div>
                    <div className="space-y-1 text-left">
                      <h4 className="font-display text-zinc-800 text-sm font-bold uppercase tracking-wider">
                        {milestone.title}
                      </h4>
                      <p className="text-zinc-500 text-xs sm:text-sm font-sans font-light leading-relaxed">
                        {milestone.desc}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Material Spotlight card */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="p-6 bg-white border border-zinc-200 rounded flex items-center space-x-4">
                <ShieldCheck className="w-8 h-8 text-gold flex-shrink-0" />
                <div className="space-y-0.5 text-left">
                  <p className="font-display font-bold text-zinc-800 text-xs uppercase tracking-wider">Zero Chemical Fibers</p>
                  <p className="text-zinc-500 text-[10px] sm:text-[11px] font-sans">No nylon fillers or weak polyesters. Only raw pure cotton yarns.</p>
                </div>
              </div>

              <div className="p-6 bg-white border border-zinc-200 rounded flex items-center space-x-4">
                <Cpu className="w-8 h-8 text-gold flex-shrink-0" style={{ animationDuration: '4s' }} />
                <div className="space-y-0.5 text-left">
                  <p className="font-display font-bold text-zinc-800 text-xs uppercase tracking-wider">Ergonomic Motion</p>
                  <p className="text-zinc-500 text-[10px] sm:text-[11px] font-sans">Garment weights respond immediately to physical ergonomics.</p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
