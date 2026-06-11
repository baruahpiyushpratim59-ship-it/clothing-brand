import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, ShoppingCart, Check, Info, Sparkles, ShieldAlert, Heart } from "lucide-react";
import { Product } from "../types";

interface ProductModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
  onAddToCart: (product: Product, size: string) => void;
}

export default function ProductModal({ product, isOpen, onClose, onAddToCart }: ProductModalProps) {
  const [selectedSize, setSelectedSize] = useState("");
  const [isAdded, setIsAdded] = useState(false);
  const [activeTab, setActiveTab] = useState<"narrative" | "standards" | "care">("narrative");

  if (!product) return null;

  const handleAddToCart = () => {
    if (!product.inStock) return;
    const finalSize = selectedSize || product.sizes[0];
    onAddToCart(product, finalSize);
    setIsAdded(true);
    setTimeout(() => {
      setIsAdded(false);
      onClose(); // Optional: close modal on add to clear focus
    }, 1500);
  };

  const tabs = [
    { id: "narrative", label: "GARMENT ESSENCE" },
    { id: "standards", label: "SILHOUETTE METRICS" },
    { id: "care", label: "WASH PROTOCOL" }
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Glassmorphic Dark Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.85 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/85 backdrop-blur-md z-50 cursor-pointer"
          />

          {/* Centered Modal Wrapper */}
          <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4">
            <motion.div
              initial={{ scale: 0.93, opacity: 0, y: 30 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.93, opacity: 0, y: 30 }}
              transition={{ type: "spring", damping: 25, stiffness: 220 }}
              className="relative w-full max-w-4xl bg-zinc-950 border border-zinc-900 rounded-sm shadow-2xl overflow-hidden text-left flex flex-col md:flex-row"
              id="quickview-modal-container"
            >
              
              {/* Close pin */}
              <button
                id="close-quickview-modal"
                onClick={onClose}
                className="absolute top-4 right-4 z-20 text-zinc-500 hover:text-white transition-colors bg-black/80 p-2 border border-zinc-800 rounded-full focus:outline-none"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Product Visual Area (Left side) */}
              <div className="md:w-1/2 relative bg-zinc-900 aspect-[3/4] md:aspect-auto">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover object-center filter brightness-[0.95]"
                  referrerPolicy="no-referrer"
                />
                
                {/* Visual Accent Badge */}
                {product.isNew && (
                  <span className="absolute top-6 left-6 bg-white text-black font-mono text-[9px] font-black tracking-widest px-3.5 py-1 shadow-2xl flex items-center space-x-1.5">
                    <Sparkles className="w-3 h-3 animate-pulse" />
                    <span>ARCHIVE EXCLUSIVE</span>
                  </span>
                )}
              </div>

              {/* Content Panel (Right side) */}
              <div className="md:w-1/2 p-6 sm:p-8 flex flex-col justify-between overflow-y-auto no-scrollbar max-h-[90vh] md:max-h-[640px]">
                
                <div>
                  {/* Category breadcrumb */}
                  <div className="flex items-center space-x-2 text-zinc-500 font-mono text-[9px] tracking-widest uppercase mb-2">
                    <span>{product.category}</span>
                    <span>&bull;</span>
                    <span className="text-gold">{product.subCategory}</span>
                  </div>

                  {/* Title & Price */}
                  <h3 className="font-display text-white text-xl sm:text-2xl font-black uppercase tracking-wide mb-2">
                    {product.name}
                  </h3>
                  <p className="font-serif italic text-lg text-gold mb-6">
                    ${product.price}.00 USD
                  </p>

                  <div className="h-[1px] bg-zinc-900 mb-6" />

                  {/* Sub-tabs for content */}
                  <div className="flex space-x-6 border-b border-zinc-900/40 mb-4 pb-2">
                    {tabs.map((t) => (
                      <button
                        key={t.id}
                        onClick={() => setActiveTab(t.id as any)}
                        className={`text-[9px] font-mono uppercase tracking-[0.2em] pb-1 transition-all focus:outline-none relative cursor-pointer ${
                          activeTab === t.id
                            ? "text-white font-bold"
                            : "text-zinc-500 hover:text-zinc-300"
                        }`}
                      >
                        {t.label}
                        {activeTab === t.id && (
                          <span className="absolute bottom-0 left-0 w-full h-[1.5px] bg-gold" />
                        )}
                      </button>
                    ))}
                  </div>

                  {/* Tab Contents */}
                  <div className="min-h-[140px] text-xs sm:text-sm text-zinc-400 font-sans leading-relaxed text-left flex flex-col justify-center">
                    {activeTab === "narrative" && (
                      <div className="space-y-4">
                        <p>{product.description}</p>
                        <div className="flex items-start space-x-2 text-[10px] text-zinc-500 font-mono tracking-wide py-1.5 px-3 bg-zinc-900/60 border border-zinc-900 rounded-sm">
                          <Info className="w-4 h-4 text-gold flex-shrink-0" />
                          <span>EACH COMPOSITION SHIPS IN MONOCHROME PROTECTIVE WARDROBE PACKS.</span>
                        </div>
                      </div>
                    )}

                    {activeTab === "standards" && (
                      <ul className="space-y-2 font-mono text-[11px] text-zinc-300 uppercase list-none pl-0">
                        {product.details.map((detail, idx) => (
                          <li key={idx} className="flex items-center space-x-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-gold"></span>
                            <span>{detail}</span>
                          </li>
                        ))}
                      </ul>
                    )}

                    {activeTab === "care" && (
                      <div className="space-y-3 font-sans text-xs">
                        <p className="text-zinc-300 font-bold font-display text-[10px] tracking-widest uppercase">
                          PRESERVING STRUCTURE AND BLACK GRAVITY:
                        </p>
                        <ul className="list-disc pl-4 space-y-1 text-zinc-400">
                          <li>Machine wash cold inside-out using mild bio detergents.</li>
                          <li>Avoid mechanical laundry drying to contain premium drop shapes.</li>
                          <li>Hang dry in natural shade to shield delicate dark color accents.</li>
                          <li>Do not iron brand logos or metallic plate hem detail directly.</li>
                        </ul>
                      </div>
                    )}
                  </div>

                  <div className="h-[1px] bg-zinc-900 my-6" />

                  {/* Sizes Grid */}
                  <div className="mb-6">
                    <div className="flex justify-between items-center mb-3">
                      <span className="font-mono text-[10px] text-zinc-400 uppercase tracking-widest">
                        SELECT SIZE SPECIFICATION
                      </span>
                      <button
                        onClick={() => alert("XLoth sizes follow premium oversized silhouettes. We suggest ordering your normal size for the intended drop look, or one size down for a standard tailored fit.")}
                        className="text-[9px] font-mono text-zinc-500 hover:text-white underline uppercase cursor-pointer"
                      >
                        Size Companion
                      </button>
                    </div>

                    <div className="grid grid-cols-4 gap-2">
                      {product.sizes.map((size) => (
                        <button
                          key={size}
                          onClick={() => setSelectedSize(size)}
                          className={`py-2.5 border rounded-sm font-mono text-xs uppercase transition-all duration-300 focus:outline-none cursor-pointer ${
                            selectedSize === size
                              ? "bg-white text-black border-white font-bold"
                              : "bg-transparent text-zinc-400 border-zinc-950 hover:border-zinc-700"
                          }`}
                        >
                          {size}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Main Action buttons */}
                <div className="space-y-3 pt-4">
                  {product.inStock ? (
                    <button
                      onClick={handleAddToCart}
                      className={`w-full py-4 font-display text-xs font-bold tracking-[0.2em] uppercase transition-all duration-300 border flex items-center justify-center space-x-2 focus:outline-none cursor-pointer ${
                        isAdded
                          ? "bg-gold border-gold text-black font-extrabold"
                          : "bg-white border-white text-black hover:bg-gold hover:border-gold hover:scale-[1.01]"
                      }`}
                    >
                      {isAdded ? (
                        <>
                          <Check className="w-4 h-4 text-black animate-bounce" />
                          <span>Commision Added</span>
                        </>
                      ) : (
                        <>
                          <ShoppingCart className="w-4 h-4 text-black" />
                          <span>
                            {selectedSize ? `ADD SIZE ${selectedSize} TO BOX` : "ADD INSTANT TO BOX"}
                          </span>
                        </>
                      )}
                    </button>
                  ) : (
                    <button
                      disabled
                      className="w-full py-4 bg-zinc-900 border border-zinc-900 text-zinc-600 font-display text-xs font-bold tracking-[0.2em] uppercase cursor-not-allowed flex items-center justify-center space-x-2"
                    >
                      <ShieldAlert className="w-4 h-4 text-zinc-700" />
                      <span>ARCHIVE DECOMMISSIONED (SOLD OUT)</span>
                    </button>
                  )}

                  {/* Secondary info indicators */}
                  <div className="flex justify-between items-center text-[9px] text-zinc-500 font-mono uppercase tracking-widest pt-2">
                    <button 
                      onClick={() => alert("Added to your wishlist lookbook!")}
                      className="hover:text-white transition-colors flex items-center space-x-1"
                    >
                      <Heart className="w-3.5 h-3.5" />
                      <span>Add to lookbook</span>
                    </button>
                    <span>SECURE DIRECT PACKAGING &bull; AUTHENTICITY ASSURED</span>
                  </div>
                </div>

              </div>

            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
