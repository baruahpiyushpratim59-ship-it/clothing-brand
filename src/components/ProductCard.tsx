import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ShoppingCart, Eye, Sparkles, Check, Bookmark } from "lucide-react";
import { Product } from "../types";

interface ProductCardProps {
  key?: string;
  product: Product;
  onAddToCart: (product: Product, size: string) => void;
  onQuickView: (product: Product) => void;
}

export default function ProductCard({ product, onAddToCart, onQuickView }: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [selectedSize, setSelectedSize] = useState("");
  const [isAdded, setIsAdded] = useState(false);

  // Default to first size if none selected
  const handleQuickAdd = () => {
    if (!product.inStock) return;
    const finalSize = selectedSize || product.sizes[0];
    onAddToCart(product, finalSize);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10% 0px" }}
      transition={{ duration: 0.6 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        setSelectedSize(""); // Reset size helper
      }}
      className="group relative flex flex-col bg-white border border-zinc-200 overflow-hidden"
      id={`product-card-${product.id}`}
    >
      {/* Visual Container */}
      <div className="relative aspect-[3/4] w-full overflow-hidden bg-zinc-100">
        
        {/* Custom Status Badges (New, Best Seller, Out of Stock) */}
        <div className="absolute top-4 left-4 z-20 flex flex-col space-y-1.5 items-start">
          {product.isNew && (
            <span className="flex items-center space-x-1.5 bg-black text-white font-mono text-[8px] font-black tracking-widest px-2.5 py-0.5 shadow-md">
              <Sparkles className="w-2.5 h-2.5 text-gold" />
              <span>NEW RELEASE</span>
            </span>
          )}
          {product.isBestSeller && (
            <span className="bg-gold text-black font-mono text-[8px] font-black tracking-widest px-2.5 py-0.5 shadow-md">
              BESTSELLER
            </span>
          )}
          {!product.inStock && (
            <span className="bg-zinc-200 text-zinc-500 font-mono text-[8px] font-bold tracking-widest px-2.5 py-0.5 shadow-md border border-zinc-300">
              OUT OF STOCK
            </span>
          )}
        </div>

        {/* Favorite Lookbook quick trigger */}
        <button 
          onClick={() => alert(`Saved '${product.name}' to your visual lookbook`)}
          className="absolute top-4 right-4 z-20 w-8 h-8 rounded-full bg-white/80 border border-zinc-200 flex items-center justify-center text-zinc-600 hover:text-gold hover:border-gold transition-all duration-300 opacity-0 group-hover:opacity-100 focus:outline-none cursor-pointer"
          title="Add to lookbook"
        >
          <Bookmark className="w-3.5 h-3.5" />
        </button>

        {/* Interactive Image Crossfade */}
        <div className="w-full h-full cursor-pointer" onClick={() => onQuickView(product)}>
          <img
            src={isHovered && product.hoverImage ? product.hoverImage : product.image}
            alt={product.name}
            className="w-full h-full object-cover object-center transition-all duration-1000 ease-out group-hover:scale-105 filter brightness-[0.98]"
            referrerPolicy="no-referrer"
          />
        </div>

        {/* Hover Quick actions overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/5 w-full h-full pointer-events-none z-10" />

        {/* Quick View Trigger button (Middle hover) */}
        <button
          onClick={() => onQuickView(product)}
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20 bg-white text-black hover:bg-black hover:text-white border border-zinc-200 hover:border-black px-5 py-2.5 font-display text-[10px] font-bold tracking-[0.2em] uppercase opacity-0 group-hover:opacity-100 transition-all duration-300 scale-90 group-hover:scale-100 hover:scale-[1.03] shadow-md flex items-center space-x-1.5 focus:outline-none cursor-pointer"
        >
          <Eye className="w-3.5 h-3.5" />
          <span>Quick View</span>
        </button>

        {/* Inline Size Picker bar sliding up on desktop hover */}
        {product.inStock && (
          <div className="absolute bottom-0 left-0 right-0 z-20 bg-white/95 border-t border-zinc-150 p-3 transform translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out hidden sm:block">
            <p className="text-[9px] font-mono text-zinc-400 uppercase tracking-widest text-center mb-2">
              Select Size for Quick Add
            </p>
            <div className="flex justify-center items-center gap-1.5">
              {product.sizes.map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`w-8 h-8 rounded-full border text-[10px] uppercase font-mono transition-all duration-300 flex items-center justify-center focus:outline-none cursor-pointer ${
                    selectedSize === size
                      ? "bg-black text-white border-black font-bold"
                      : "bg-transparent text-zinc-600 border-zinc-200 hover:text-black hover:border-zinc-500"
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Info Panel */}
      <div className="p-4 flex flex-col flex-grow text-left bg-white">
        <span className="font-mono text-[9px] text-zinc-400 tracking-widest uppercase mb-1">
          {product.category} &bull; {product.subCategory}
        </span>
        
        <h4 className="font-display font-semibold text-zinc-800 text-sm group-hover:text-black group-hover:underline decoration-gold/40 underline-offset-4 transition-colors cursor-pointer" onClick={() => onQuickView(product)}>
          {product.name}
        </h4>

        {/* Pricing tag */}
        <p className="font-serif italic text-sm text-gold mt-1.5 font-bold">
          ${product.price}.00 USD
        </p>

        {/* Mobile Quick Add / Cart actions (Always visible on mobile, simple trigger on desktop) */}
        <div className="mt-4">
          {product.inStock ? (
            <button
              onClick={handleQuickAdd}
              disabled={isAdded}
              className={`w-full py-2.5 font-display text-[10px] font-bold tracking-[0.2em] uppercase transition-all duration-500 border flex items-center justify-center space-x-2 focus:outline-none cursor-pointer ${
                isAdded
                  ? "bg-gold border-gold text-black"
                  : "bg-transparent border-zinc-200 hover:border-black text-zinc-800 hover:bg-black hover:text-white"
              }`}
            >
              {isAdded ? (
                <>
                  <Check className="w-3.5 h-3.5 animate-bounce text-black" />
                  <span>ADDED</span>
                </>
              ) : (
                <>
                  <ShoppingCart className="w-3.5 h-3.5" />
                  <span>
                    {selectedSize ? `ADD SIZE ${selectedSize}` : "QUICK ADD"}
                  </span>
                </>
              )}
            </button>
          ) : (
            <button
              disabled
              className="w-full py-2.5 bg-zinc-50 border border-zinc-200 text-zinc-300 font-display text-[10px] font-bold tracking-[0.2em] uppercase cursor-not-allowed flex items-center justify-center space-x-2"
            >
              <span>SOLD OUT</span>
            </button>
          )}
        </div>
      </div>
    </motion.div>
  );
}
