import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Star, MessageSquarePlus, Check, X, Award } from "lucide-react";
import { Review } from "../types";

interface ReviewsProps {
  reviews: Review[];
  onAddReview: (review: Omit<Review, "id" | "date" | "verified">) => void;
}

export default function Reviews({ reviews, onAddReview }: ReviewsProps) {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [name, setName] = useState("");
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(5);
  const [itemPurchased, setItemPurchased] = useState("Signature Heavyweight Tee");

  // Form Submission
  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !comment) {
      alert("Please declare your name and custom comment.");
      return;
    }
    onAddReview({ name, comment, rating, itemPurchased });
    
    // Clear form
    setName("");
    setComment("");
    setRating(5);
    setIsFormOpen(false);
  };

  return (
    <section className="py-24 bg-white border-t border-zinc-150 px-4 sm:px-6 lg:px-8 text-left" id="reviews">
      <div className="max-w-7xl mx-auto">
        
        {/* Header content and feedback triggers */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="text-left">
            <div className="flex items-center space-x-2 text-gold font-mono text-[10px] tracking-[0.3em] uppercase mb-3">
              <Star className="w-3.5 h-3.5 fill-gold stroke-gold" />
              <span>curator reviews</span>
            </div>
            <h2 className="font-display font-light text-3xl sm:text-5xl text-black uppercase tracking-tight">
              Archival <span className="font-serif italic font-normal text-zinc-500">Testimonials</span>
            </h2>
          </div>
          
          <button
            onClick={() => setIsFormOpen(true)}
            id="write-review-btn"
            className="px-6 py-3 border border-zinc-200 hover:border-black text-zinc-600 hover:text-black font-display text-[11px] uppercase tracking-[0.2em] flex items-center space-x-2 bg-zinc-50 rounded-sm transition-all focus:outline-none cursor-pointer"
          >
            <MessageSquarePlus className="w-4 h-4 text-gold" />
            <span>Join the Circle (Add Review)</span>
          </button>
        </div>

        {/* Testimonials Bento Grid layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {reviews.map((rev) => (
            <motion.div
              layout
              key={rev.id}
              initial={{ opacity: 0, scale: 0.98 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="bg-zinc-50/50 border border-zinc-200 p-8 rounded-xs relative flex flex-col justify-between"
              id={`review-card-${rev.id}`}
            >
              <div>
                {/* Header: Verified & Ratings */}
                <div className="flex items-center justify-between mb-4">
                  {/* Verified Buyer custom label */}
                  {rev.verified ? (
                    <span className="flex items-center space-x-1.5 font-mono text-[8px] text-[#937115] tracking-widest uppercase border border-gold/30 px-2.5 py-0.5 rounded-sm bg-gold/5">
                      <Award className="w-2.5 h-2.5 text-[#937115]" />
                      <span>VERIFIED COLLECTOR</span>
                    </span>
                  ) : (
                    <span className="font-mono text-[8px] text-zinc-500 tracking-widest uppercase">
                      RECENT ACCREDITATION
                    </span>
                  )}

                  {/* Stars list */}
                  <div className="flex items-center gap-0.5">
                    {[...Array(5)].map((_, idx) => (
                      <Star
                        key={idx}
                        className={`w-3.5 h-3.5 ${
                          idx < rev.rating
                            ? "fill-gold stroke-gold"
                            : "text-zinc-200 fill-zinc-100"
                        }`}
                      />
                    ))}
                  </div>
                </div>

                {/* Comment quote */}
                <p className="font-sans font-light text-zinc-700 text-xs sm:text-sm leading-relaxed italic mb-6">
                  "{rev.comment}"
                </p>
              </div>

              {/* Verified name and date card metrics */}
              <div className="flex justify-between items-center border-t border-zinc-150 pt-4 mt-2">
                <div className="space-y-0.5 text-left">
                  <p className="font-display font-bold text-zinc-850 text-xs uppercase tracking-wider">
                    {rev.name}
                  </p>
                  <p className="text-[9px] sm:text-[10px] font-mono text-zinc-400">
                    ACQUISITION: {rev.itemPurchased?.toUpperCase() || "CATALOG PIECE"}
                  </p>
                </div>
                <span className="font-mono text-[9px] text-zinc-500">
                  {rev.date}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Review Submission Dialog Modal */}
      <AnimatePresence>
        {isFormOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.6 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsFormOpen(false)}
              className="fixed inset-0 bg-black z-50 cursor-pointer backdrop-blur-sm"
            />

            {/* Form Modal */}
            <motion.div
              initial={{ scale: 0.94, opacity: 0, y: 35 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.94, opacity: 0, y: 35 }}
              className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white border border-zinc-200 max-w-md w-[90%] z-50 p-6 sm:p-8 rounded-sm shadow-xl"
              id="review-form-dialog"
            >
              <div className="flex justify-between items-center mb-6 border-b border-zinc-100 pb-4">
                <span className="font-display text-black text-sm sm:text-base font-black tracking-widest">
                  WRITE ARCHIVAL FEEDBACK
                </span>
                <button
                  id="close-review-form"
                  onClick={() => setIsFormOpen(false)}
                  className="text-zinc-400 hover:text-black transition-colors focus:outline-none"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleSubmitReview} className="space-y-4">
                {/* Stars select metric */}
                <div>
                  <label className="block text-[9px] font-mono text-zinc-550 uppercase tracking-widest mb-1.5">
                    Your Rating Signature
                  </label>
                  <div className="flex gap-2">
                    {[1, 2, 3, 4, 5].map((starIdx) => (
                      <button
                        key={starIdx}
                        type="button"
                        onClick={() => setRating(starIdx)}
                        className="focus:outline-none transition-transform hover:scale-125 cursor-pointer"
                      >
                        <Star
                          className={`w-6 h-6 ${
                            starIdx <= rating
                              ? "fill-gold stroke-gold"
                              : "text-zinc-200 fill-zinc-100"
                          }`}
                        />
                      </button>
                    ))}
                  </div>
                </div>

                {/* Name */}
                <div>
                  <label htmlFor="rev-inp-name" className="block text-[9px] font-mono text-zinc-550 uppercase tracking-widest mb-1.5">
                    Your Full Signature (Name)
                  </label>
                  <input
                    id="rev-inp-name"
                    type="text"
                    required
                    placeholder="E.G., ALEXANDER D."
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-zinc-50 border border-zinc-200 p-3 text-xs focus:ring-1 focus:ring-black focus:outline-none text-black uppercase font-mono"
                  />
                </div>

                {/* Item selection combo */}
                <div>
                  <label htmlFor="rev-inp-item" className="block text-[9px] font-mono text-zinc-550 uppercase tracking-widest mb-1.5">
                    Associated Archival Piece acquired
                  </label>
                  <select
                    id="rev-inp-item"
                    value={itemPurchased}
                    onChange={(e) => setItemPurchased(e.target.value)}
                    className="w-full bg-zinc-50 border border-zinc-200 text-black p-3 text-xs focus:ring-1 focus:ring-black focus:outline-none uppercase font-mono cursor-pointer"
                  >
                    {[
                      "Signature Heavyweight Tee",
                      "Archival Boxy Hoodie (01)",
                      "Modular Brutalist Work Pants",
                      "Luxe Modular Utility Vest",
                      "Ecru Drop Shoulder Knit",
                      "Bespoke Street Hooded Jacket"
                    ].map((item) => (
                      <option key={item} value={item} className="bg-white text-black">
                        {item.toUpperCase()}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Comment box */}
                <div>
                  <label htmlFor="rev-inp-comment" className="block text-[9px] font-mono text-zinc-550 uppercase tracking-widest mb-1.5">
                    Your Review Comment
                  </label>
                  <textarea
                    id="rev-inp-comment"
                    required
                    rows={4}
                    placeholder="WISH TO EXPLAIN THE HEAVY FABRIC DYNAMICS, HEM RIBS, OR PACKAGING SPECIFICATIONS..."
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    className="w-full bg-zinc-50 border border-zinc-200 p-3 text-xs focus:ring-1 focus:ring-black focus:outline-none text-black uppercase font-mono resize-none"
                  />
                </div>

                <div className="border-t border-zinc-100 pt-6 flex justify-end">
                  <button
                    type="submit"
                    className="px-6 py-3 bg-black text-white font-display font-black text-[10px] uppercase tracking-[0.2em] hover:bg-gold hover:text-black transition-colors flex items-center space-x-1.5 cursor-pointer"
                  >
                    <Check className="w-3.5 h-3.5" />
                    <span>Post Review</span>
                  </button>
                </div>
              </form>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </section>
  );
}
