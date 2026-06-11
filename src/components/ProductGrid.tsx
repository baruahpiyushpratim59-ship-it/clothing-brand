import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "motion/react";
import { SlidersHorizontal, ArrowDownAZ, RefreshCw, Layers } from "lucide-react";
import { Product } from "../types";
import { PRODUCTS_DATA } from "../data";
import ProductCard from "./ProductCard";

interface ProductGridProps {
  onAddToCart: (product: Product, size: string) => void;
  onQuickView: (product: Product) => void;
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
  searchQuery: string;
  onClearSearch: () => void;
}

type SortOption = "featured" | "price-asc" | "price-desc";

export default function ProductGrid({
  onAddToCart,
  onQuickView,
  selectedCategory,
  onSelectCategory,
  searchQuery,
  onClearSearch
}: ProductGridProps) {
  const [currentSort, setCurrentSort] = useState<SortOption>("featured");

  // Category tags inside the Grid filter
  const categories = ["ALL SHOWROOM", "Oversized T-Shirts", "Hoodies", "Streetwear", "New Arrivals", "Best Sellers"];

  // Filter & Search Logic
  const filteredProducts = useMemo(() => {
    let result = [...PRODUCTS_DATA];

    // Filter by selected category (Unless tab is "ALL SHOWROOM")
    if (selectedCategory && selectedCategory !== "ALL SHOWROOM") {
      result = result.filter((product) => {
        if (selectedCategory === "New Arrivals") return product.isNew;
        if (selectedCategory === "Best Sellers") return product.isBestSeller;
        return product.category === selectedCategory;
      });
    }

    // Filter by text search query if provided
    if (searchQuery) {
      const q = searchQuery.toLowerCase().trim();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q)
      );
    }

    // Sorting Logic
    if (currentSort === "price-asc") {
      result.sort((a, b) => a.price - b.price);
    } else if (currentSort === "price-desc") {
      result.sort((a, b) => b.price - a.price);
    }

    return result;
  }, [selectedCategory, searchQuery, currentSort]);

  const handleCategoryClick = (category: string) => {
    onSelectCategory(category);
  };

  return (
    <section className="py-24 bg-white px-4 sm:px-6 lg:px-8 border-t border-zinc-150" id="featured-products">
      <div className="max-w-7xl mx-auto">
        
        {/* Sorting, Filtering, and Header Grid */}
        <div className="flex flex-col space-y-8 mb-12">
          
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
            <div className="text-left">
              <div className="flex items-center space-x-2 text-gold font-mono text-[10px] tracking-[0.3em] uppercase mb-3">
                <Layers className="w-3.5 h-3.5" />
                <span>Tokyo Streetwear Core</span>
              </div>
              <h2 className="font-display font-light text-3xl sm:text-5xl text-black uppercase tracking-tight">
                Architectural <span className="font-serif italic font-normal text-zinc-500">Showroom</span>
              </h2>
            </div>
 
            {/* active search status or clear tag status */}
            {searchQuery && (
              <div className="flex items-center space-x-4 bg-zinc-50 px-4 py-2 border border-zinc-200 rounded-xs">
                <span className="text-xs text-zinc-600 font-mono">
                  SEARCH MATCHES FOR: &bull; <strong className="text-black">"{searchQuery.toUpperCase()}"</strong>
                </span>
                <button
                  onClick={onClearSearch}
                  className="text-gold hover:text-black font-mono text-xs underline cursor-pointer"
                >
                  CLEAR
                </button>
              </div>
            )}
 
            {/* Sort Controller bar */}
            <div className="flex items-center space-x-3 bg-zinc-50 border border-zinc-200 px-4 py-2.5 rounded-xs">
              <SlidersHorizontal className="w-4 h-4 text-zinc-500" />
              <label htmlFor="sort-dropdown" className="font-mono text-[10px] text-zinc-400 uppercase tracking-widest">Sort By:</label>
              <select
                id="sort-dropdown"
                value={currentSort}
                onChange={(e) => setCurrentSort(e.target.value as SortOption)}
                className="bg-transparent text-black font-display text-xs font-semibold focus:outline-none pr-1 uppercase tracking-wider cursor-pointer"
                aria-label="Sort products"
              >
                <option value="featured" className="bg-white text-black">Recommended</option>
                <option value="price-asc" className="bg-white text-black">Price: Low to High</option>
                <option value="price-desc" className="bg-white text-black font-light">Price: High to Low</option>
              </select>
            </div>
          </div>
 
          {/* Luxury Categories Tabs list */}
          <div className="flex items-center overflow-x-auto pb-4 no-scrollbar border-b border-zinc-150 gap-3">
            {categories.map((cat) => {
              const isActive = selectedCategory === cat || (cat === "ALL SHOWROOM" && !selectedCategory);
              return (
                <button
                  key={cat}
                  onClick={() => handleCategoryClick(cat)}
                  className={`px-5 py-2.5 rounded-xs font-display text-[10px] sm:text-xs font-medium uppercase tracking-[0.15em] transition-all duration-400 border whitespace-nowrap focus:outline-none cursor-pointer ${
                    isActive
                      ? "bg-black border-black text-white font-extrabold"
                      : "bg-transparent border-zinc-200 text-zinc-500 hover:text-black hover:border-zinc-400"
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        </div>
 
        {/* Dynamic products stats bar */}
        <div className="mb-8 flex items-center justify-between font-mono text-[10px] text-zinc-400 uppercase tracking-widest border-b border-zinc-150 pb-4">
          <span>SHOWING {filteredProducts.length} OF {PRODUCTS_DATA.length} ARCHIVAL PIECES</span>
          <span className="hidden sm:inline">PROMPT INTEGRITY CERTIFIED &bull; TOKYO, JP</span>
        </div>
 
        {/* Product Cards Grid rendering */}
        <AnimatePresence mode="popLayout">
          {filteredProducts.length > 0 ? (
            <motion.div
              layout
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
              id="showroom-grid"
            >
              {filteredProducts.map((prod) => (
                <ProductCard
                  key={prod.id}
                  product={prod}
                  onAddToCart={onAddToCart}
                  onQuickView={onQuickView}
                />
              ))}
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="text-center py-20 bg-zinc-50 border border-zinc-200 p-8 max-w-xl mx-auto"
              id="empty-showroom-state"
            >
              <div className="w-12 h-12 rounded-full border border-zinc-200 flex items-center justify-center mx-auto mb-6 bg-zinc-100">
                <RefreshCw className="w-5 h-5 text-zinc-400 animate-spin" style={{ animationDuration: "12s" }} />
              </div>
              <h3 className="font-display font-bold text-black text-lg uppercase tracking-wider mb-2">
                No items match your criteria
              </h3>
              <p className="text-zinc-500 font-sans text-xs sm:text-sm max-w-sm mx-auto mb-8">
                We couldn't locate any bespoke garments matching your current search or filters. Reset showroom states to explore our archival line.
              </p>
              <button
                onClick={() => {
                  onClearSearch();
                  onSelectCategory("ALL SHOWROOM");
                  setCurrentSort("featured");
                }}
                className="px-6 py-3 bg-black text-white hover:bg-gold hover:text-black font-display font-bold text-xs uppercase tracking-[0.18em] transition-colors focus:outline-none cursor-pointer"
              >
                Reset Showroom Filters
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
