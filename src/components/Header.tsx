import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ShoppingBag, Search, Menu, X, Heart, ShieldCheck, ArrowRight } from "lucide-react";

interface HeaderProps {
  cartCount: number;
  onCartToggle: () => void;
  onSectionNavigate: (sectionId: string) => void;
  productsCount: number;
  onSearch: (query: string) => void;
}

export default function Header({
  cartCount,
  onCartToggle,
  onSectionNavigate,
  onSearch
}: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchQuery);
    setIsSearchOpen(false);
    onSectionNavigate("featured-products");
  };

  const navMenuItems = [
    { label: "Shop", sectionId: "featured-products" },
    { label: "Collections", sectionId: "collections" },
    { label: "About Bespoke", sectionId: "about" },
    { label: "Commitment", sectionId: "why-choose-us" },
    { label: "Reviews", sectionId: "reviews" }
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
          isScrolled
            ? "bg-white/95 backdrop-blur-md border-b border-zinc-100 py-3 text-black shadow-xs"
            : "bg-white border-b border-zinc-100/80 py-4 text-black"
        }`}
        id="xloth-header"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          
          {/* Burger Menu for Mobile */}
          <button
            id="mobile-menu-trigger"
            onClick={() => setIsMobileMenuOpen(true)}
            className="md:hidden text-zinc-800 hover:text-gold transition-colors focus:outline-none"
            aria-label="Open navigation menu"
          >
            <Menu className="w-6 h-6" />
          </button>

          {/* Logo Brand Brand */}
          <div className="flex items-center">
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="group flex items-center space-x-1.5 focus:outline-none cursor-pointer"
            >
              <span className="font-display text-2xl sm:text-3xl font-extrabold tracking-[0.3em] text-black transition-colors duration-300">
                XLOTH
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-gold animate-pulse mt-2"></span>
            </button>
          </div>

          {/* Navigational center (Desktop Only) */}
          <nav className="hidden md:flex items-center space-x-8 text-[11px] font-semibold uppercase tracking-[0.22em]">
            {navMenuItems.map((item) => (
              <button
                key={item.label}
                onClick={() => onSectionNavigate(item.sectionId)}
                className="text-zinc-500 hover:text-black transition-colors duration-300 relative py-1 group cursor-pointer"
              >
                {item.label}
                <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-gold transition-all duration-300 group-hover:w-full"></span>
              </button>
            ))}
          </nav>

          {/* Right Action Bar */}
          <div className="flex items-center space-x-4 sm:space-x-6">
            
            {/* Search Trigger */}
            <button
              id="search-trigger-btn"
              onClick={() => setIsSearchOpen(true)}
              className="text-zinc-400 hover:text-black transition-colors duration-300 focus:outline-none cursor-pointer"
              aria-label="Search items"
            >
              <Search className="w-5 h-5" />
            </button>

            {/* Heart / Favorites Mock */}
            <div className="relative group hidden sm:block">
              <button 
                className="text-zinc-400 hover:text-black transition-colors duration-300 focus:outline-none cursor-pointer"
                onClick={() => alert("Added to archival lookbook! Explore our catalog to customize your signature style.")}
              >
                <Heart className="w-5 h-5" />
              </button>
            </div>

            {/* Premium Shopping Cart badged icon */}
            <button
              id="shopping-bag-trigger"
              onClick={onCartToggle}
              className="relative text-zinc-800 hover:text-gold transition-all duration-300 p-2 bg-zinc-50 rounded-full border border-zinc-200 hover:border-gold/60 focus:outline-none cursor-pointer flex items-center justify-center"
              aria-label="Shopping cart"
            >
              <ShoppingBag className="w-4.5 h-4.5" />
              <AnimatePresence>
                {cartCount > 0 && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                    className="absolute -top-1 -right-1 w-4.5 h-4.5 flex items-center justify-center bg-gold text-black text-[9px] font-black rounded-full shadow-md"
                  >
                    {cartCount}
                  </motion.span>
                )}
              </AnimatePresence>
            </button>
          </div>
        </div>
      </header>

      {/* Modern Search Overlay Panel */}
      <AnimatePresence>
        {isSearchOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4 backdrop-blur-md"
            id="search-overlay"
          >
            <button
              id="close-search-btn"
              onClick={() => setIsSearchOpen(false)}
              className="absolute top-6 right-6 text-zinc-500 hover:text-white transition-colors focus:outline-none"
            >
              <X className="w-8 h-8" />
            </button>

            <div className="w-full max-w-2xl text-center">
              <p className="font-display text-zinc-500 text-xs uppercase tracking-[0.2em] mb-4">
                SEARCH THE XLOTH COLLECTION
              </p>
              <form onSubmit={handleSearchSubmit} className="relative">
                <input
                  type="text"
                  placeholder="EX: HOODIE, STREETWEAR, TEE..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-transparent border-b-2 border-zinc-800 text-white font-serif text-3xl sm:text-4xl text-center focus:outline-none focus:border-gold pb-4 tracking-wide uppercase"
                  autoFocus
                />
                <button
                  type="submit"
                  className="absolute right-2 bottom-5 text-zinc-500 hover:text-gold transition-colors"
                >
                  <ArrowRight className="w-6 h-6" />
                </button>
              </form>
              <div className="mt-6 flex flex-wrap items-center justify-center gap-3 text-xs text-zinc-400">
                <span>SUGGESTED:</span>
                {["Tee", "Hoodie", "Knit", "Work Pants"].map((keyword) => (
                  <button
                    key={keyword}
                    type="button"
                    onClick={() => {
                      setSearchQuery(keyword);
                      onSearch(keyword);
                      setIsSearchOpen(false);
                      onSectionNavigate("featured-products");
                    }}
                    className="px-3 py-1 rounded-full bg-zinc-900 border border-zinc-800 hover:border-gold hover:text-white transition-colors cursor-pointer"
                  >
                    {keyword}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Navigation Drawer for Mobile Devices */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.7 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="fixed inset-0 bg-black z-50 cursor-pointer"
            ></motion.div>

            {/* Drawer */}
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", bounce: 0.1, duration: 0.6 }}
              className="fixed top-0 left-0 bottom-0 w-4/5 max-w-sm bg-zinc-950 text-white z-50 p-6 flex flex-col justify-between border-r border-zinc-900 shadow-2xl"
              id="mobile-sidebar"
            >
              <div>
                <div className="flex items-center justify-between mb-10 pb-4 border-b border-zinc-900">
                  <span className="font-display text-xl font-black tracking-widest text-white">
                    XLOTH
                  </span>
                  <button
                    id="close-mobile-menu"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="text-zinc-500 hover:text-white transition-colors duration-300 focus:outline-none"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>

                <div className="flex flex-col space-y-6">
                  {navMenuItems.map((item) => (
                    <button
                      key={item.label}
                      onClick={() => {
                        setIsMobileMenuOpen(false);
                        onSectionNavigate(item.sectionId);
                      }}
                      className="text-left font-display text-lg tracking-wider font-semibold text-zinc-300 hover:text-gold transition-colors py-1 cursor-pointer"
                    >
                      {item.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Bottom sidebar info card */}
              <div className="border-t border-zinc-900 pt-6 space-y-4">
                <div className="flex items-center space-x-2 text-zinc-400 text-xs">
                  <ShieldCheck className="w-5 h-5 text-gold" />
                  <span>100% Verified Craftsmanship</span>
                </div>
                <p className="text-[10px] text-zinc-600 tracking-wide font-mono leading-relaxed">
                  XLOTH ARCHIVE SEED PLATFORM. CONSTANTLY EXPLORING THE BOUNDS OF SILHOUETTE, DENSITY AND CRAFT.
                </p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
