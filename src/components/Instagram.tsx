import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Instagram, Send, CheckCircle, Heart, MessageCircle, Star } from "lucide-react";
import { INSTAGRAM_PHOTOS } from "../data";

export default function InstagramAndNewsletter() {
  const [email, setEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setIsSubscribed(true);
  };

  return (
    <section className="bg-white text-left border-t border-zinc-150" id="social-community">
      
      {/* Instagram lifestyle showcase */}
      <div className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 bg-white">
        <div className="text-center max-w-lg mx-auto mb-16">
          <div className="inline-flex items-center space-x-2 text-gold font-mono text-[10px] tracking-[0.3em] uppercase mb-4 bg-zinc-50 px-4 py-1.5 border border-zinc-200 rounded-full">
            <Instagram className="w-3.5 h-3.5" />
            <span>@XLOTH.STUDIOS</span>
          </div>
          <h2 className="font-display font-light text-3xl sm:text-5xl text-black uppercase tracking-tight">
            Lifestyle <span className="font-serif italic font-normal text-zinc-500">Aesthetics</span>
          </h2>
          <p className="text-zinc-500 font-sans text-xs sm:text-sm mt-3 leading-relaxed">
            Our global collective shares their custom silhouette setups on social boards. Use #XLothArchive to register in our weekly showcase.
          </p>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {INSTAGRAM_PHOTOS.map((post, idx) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.05 }}
              className="group relative aspect-square bg-zinc-50 border border-zinc-200 overflow-hidden rounded-xs cursor-pointer"
              id={`ig-photo-box-${post.id}`}
            >
              {/* Actual photo */}
              <img
                src={post.url}
                alt={`XLoth fashion highlight ${idx + 1}`}
                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110 filter brightness-[0.9] group-hover:brightness-[0.4]"
                referrerPolicy="no-referrer"
              />

              {/* Hover metric overlay panel */}
              <div className="absolute inset-0 z-10 flex items-center justify-center space-x-4 opacity-0 group-hover:opacity-100 transition-all duration-300">
                <div className="flex items-center space-x-1.5 text-white font-mono text-xs font-black">
                  <Heart className="w-4 h-4 fill-white stroke-white" />
                  <span>{post.likes}</span>
                </div>
                <div className="flex items-center space-x-1.5 text-white font-mono text-xs font-black">
                  <MessageCircle className="w-4 h-4 fill-white stroke-white" />
                  <span>{post.comments}</span>
                </div>
              </div>

              {/* Gold border focus overlay */}
              <div className="absolute inset-x-2 inset-y-2 border border-gold/0 group-hover:border-gold/30 transition-all duration-500 z-0 pointer-events-none" />
            </motion.div>
          ))}
        </div>
      </div>

      {/* Elegant black and gold newsletter segment */}
      <div className="py-24 px-4 sm:px-6 lg:px-8 bg-zinc-50 border-t border-b border-zinc-150 text-center relative overflow-hidden" id="newsletter">
        {/* Ambient backing stars */}
        <div className="absolute inset-0 opacity-5 pointer-events-none bg-[radial-gradient(#D4AF37_1px,transparent_1px)] [background-size:16px_16px]" />

        <div className="max-w-2xl mx-auto space-y-6 relative z-10">
          <div className="inline-flex items-center space-x-2 text-gold font-mono text-[9px] tracking-[0.4em] uppercase">
            <Star className="w-3.5 h-3.5 fill-gold" />
            <span>VIP REGISTER LISTING</span>
          </div>

          <h3 className="font-display font-light text-3xl sm:text-5xl text-black uppercase tracking-tight">
            Secure Early <span className="font-serif italic font-normal text-zinc-500">Access</span>
          </h3>

          <p className="text-zinc-500 font-sans text-xs sm:text-sm max-w-md mx-auto leading-relaxed">
            Subscribe to secure invitations to upcoming seasonal releases, bespoke catalog drops, and 20% off your initial garment order.
          </p>

          <div className="max-w-md mx-auto pt-4">
            <AnimatePresence mode="wait">
              {!isSubscribed ? (
                <motion.form
                  key="subscribe-form"
                  onSubmit={handleSubscribe}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex flex-col sm:flex-row items-stretch border border-zinc-200 bg-white p-1.5 shadow-sm"
                >
                  <label htmlFor="newsletter-email" className="sr-only">Email Address</label>
                  <input
                    id="newsletter-email"
                    type="email"
                    required
                    placeholder="ENTER COURIER EMAIL ADDRESS"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="bg-transparent text-black font-mono text-center sm:text-left text-xs px-4 py-3 border-none flex-grow focus:outline-none placeholder-zinc-400 uppercase tracking-widest"
                  />
                  <button
                    type="submit"
                    className="px-6 py-3 bg-black text-white font-display font-bold text-xs uppercase tracking-[0.25em] hover:bg-gold hover:text-black transition-colors focus:outline-none flex items-center justify-center space-x-2 cursor-pointer mt-2 sm:mt-0"
                  >
                    <span>Register</span>
                    <Send className="w-3.5 h-3.5" />
                  </button>
                </motion.form>
              ) : (
                <motion.div
                  key="subscribed-success"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-white border border-gold/30 p-6 rounded shadow-sm text-center space-y-3"
                >
                  <CheckCircle className="w-8 h-8 text-gold mx-auto animate-pulse" />
                  <p className="font-display text-zinc-900 text-xs font-bold uppercase tracking-widest">
                    VIP COMPOSITION REGISTRATION CONFIRMED
                  </p>
                  <p className="text-zinc-500 font-sans text-[11px]">
                    Delivering security token <strong className="text-gold font-mono">"ARCHIVE20"</strong> directly to your inbox. Shop our custom drops and unlock 20% savings.
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
