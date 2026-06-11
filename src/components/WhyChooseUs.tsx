import { motion } from "motion/react";
import { ShieldAlert, CreditCard, Truck, RefreshCw, Anchor } from "lucide-react";

export default function WhyChooseUs() {
  const commitments = [
    {
      icon: <Anchor className="w-6 h-6 text-gold" />,
      title: "PREMIUM QUALITY",
      desc: "Every item is woven with 315GSM to 460GSM heavyweight organic cotton, reinforced seams, and custom matte-gold plated details."
    },
    {
      icon: <CreditCard className="w-6 h-6 text-gold" />,
      title: "SECURE PAYMENTS",
      desc: "Our platform processes checkouts using advanced 256-bit SSL tokens, safeguarding transaction data with world-class security."
    },
    {
      icon: <Truck className="w-6 h-6 text-gold" />,
      title: "EXPRESS SHIPPING",
      desc: "Complimentary priority dispatch on orders over $400. Direct secure shipment with real-time package transit tracking."
    },
    {
      icon: <RefreshCw className="w-6 h-6 text-gold" />,
      title: "CONVENIENT RETURNS",
      desc: "We stand behind our silhouettes. Return or exchange any unworn, unwashed custom piece within 30 days, no questions asked."
    }
  ];

  return (
    <section className="py-24 bg-zinc-50 border-t border-b border-zinc-150 px-4 sm:px-6 lg:px-8 text-left" id="why-choose-us">
      <div className="max-w-7xl mx-auto">
        {/* Header Title */}
        <div className="text-center max-w-xl mx-auto mb-16">
          <div className="inline-flex items-center space-x-2 text-gold font-mono text-[10px] tracking-[0.3em] uppercase mb-3 bg-white px-4 py-1.5 border border-zinc-200 rounded-full shadow-xs">
            <ShieldAlert className="w-3.5 h-3.5" />
            <span>GUARANTEED ACCREDITATION</span>
          </div>
          <h2 className="font-display font-light text-3xl sm:text-5xl text-black uppercase tracking-tight">
            The XLoth <br />
            <span className="font-serif italic font-normal text-zinc-500">Commitment</span>
          </h2>
          <p className="text-zinc-500 font-sans text-xs sm:text-sm mt-4 leading-relaxed font-light">
            Bringing international high-fashion standards to your private wardrobe box. We combine bespoke workshop standards with elite customer convenience.
          </p>
        </div>

        {/* Commitments Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {commitments.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white border border-zinc-200 hover:border-black p-8 space-y-4 rounded-xs hover:-translate-y-1 transition-all duration-300 text-left flex flex-col justify-between h-56"
              id={`commitment-card-${index}`}
            >
              <div className="w-12 h-12 rounded-full border border-zinc-200 flex items-center justify-center bg-zinc-50 shadow-xs">
                {item.icon}
              </div>
              <div className="space-y-1.5">
                <h3 className="font-display text-zinc-900 text-xs font-black uppercase tracking-wider">
                  {item.title}
                </h3>
                <p className="text-zinc-500 text-xs font-sans font-light leading-relaxed">
                  {item.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
