/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from "react";
import { Product, CartItem, Review } from "./types";
import { REVIEWS_DATA } from "./data";

// Submodule layout imports
import Header from "./components/Header";
import Hero from "./components/Hero";
import Collections from "./components/Collections";
import ProductGrid from "./components/ProductGrid";
import ProductModal from "./components/ProductModal";
import Cart from "./components/Cart";
import About from "./components/About";
import WhyChooseUs from "./components/WhyChooseUs";
import Reviews from "./components/Reviews";
import InstagramAndNewsletter from "./components/Instagram";
import Footer from "./components/Footer";

export default function App() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [selectedCategory, setSelectedCategory] = useState("ALL SHOWROOM");
  const [searchQuery, setSearchQuery] = useState("");
  const [reviews, setReviews] = useState<Review[]>(REVIEWS_DATA);

  // Add Item to E-commerce Cart
  const handleAddToCart = (product: Product, size: string) => {
    setCartItems((prevItems) => {
      // Look for match of both id and selected size
      const existingIdx = prevItems.findIndex(
        (item) => item.product.id === product.id && item.selectedSize === size
      );

      if (existingIdx > -1) {
        const cloned = [...prevItems];
        cloned[existingIdx].quantity += 1;
        return cloned;
      }

      // Add fresh CartItem instance
      return [...prevItems, { product, quantity: 1, selectedSize: size }];
    });

    // Auto trigger cart sliding sidebar to showcase additions
    setIsCartOpen(true);
  };

  // Update line counts inside shopping cart
  const handleUpdateQuantity = (productId: string, size: string, change: number) => {
    setCartItems((prevItems) => {
      return prevItems
        .map((item) => {
          if (item.product.id === productId && item.selectedSize === size) {
            const nextQty = item.quantity + change;
            return { ...item, quantity: Math.max(1, nextQty) };
          }
          return item;
        })
        .filter((item) => item.quantity > 0);
    });
  };

  // Pull individual item out of cart
  const handleRemoveItem = (productId: string, size: string) => {
    setCartItems((prevItems) => {
      return prevItems.filter(
        (item) => !(item.product.id === productId && item.selectedSize === size)
      );
    });
  };

  // Empty cart entirely
  const handleClearCart = () => {
    setCartItems([]);
  };

  // Quick navigation to section anchoring points
  const handleSectionNavigate = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const headerOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

  // Add new Customer Review dynamically
  const handleAddReview = (newRev: Omit<Review, "id" | "date" | "verified">) => {
    const formattedReview: Review = {
      ...newRev,
      id: `rev-${Date.now()}`,
      date: new Date().toISOString().split("T")[0],
      verified: true // Mark as true since they are posting in session
    };
    setReviews((prev) => [formattedReview, ...prev]);
  };

  const cartTotalItemsCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <div className="min-h-screen bg-zinc-50 text-black selection:bg-gold selection:text-black antialiased relative">
      {/* Luxury Brand Header bar */}
      <Header
        cartCount={cartTotalItemsCount}
        onCartToggle={() => setIsCartOpen(!isCartOpen)}
        onSectionNavigate={handleSectionNavigate}
        productsCount={cartItems.length}
        onSearch={setSearchQuery}
      />

      {/* Hero Welcome banner */}
      <Hero
        onShopClick={() => handleSectionNavigate("featured-products")}
        onExploreClick={() => handleSectionNavigate("collections")}
      />

      {/* Categories / Capsules selectors */}
      <Collections
        onSelectCollection={(category) => {
          setSelectedCategory(category);
          handleSectionNavigate("featured-products");
        }}
        selectedCategory={selectedCategory}
      />

      {/* Showroom Catalog grid */}
      <ProductGrid
        onAddToCart={handleAddToCart}
        onQuickView={(p) => setQuickViewProduct(p)}
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
        searchQuery={searchQuery}
        onClearSearch={() => setSearchQuery("")}
      />

      {/* Craftsmanship Narrative segment */}
      <About />

      {/* E-commerce security guarantees */}
      <WhyChooseUs />

      {/* Curator critiques */}
      <Reviews
        reviews={reviews}
        onAddReview={handleAddReview}
      />

      {/* Lifestyle grid & VIP registrations */}
      <InstagramAndNewsletter />

      {/* Premium Footer bar */}
      <Footer onSectionNavigate={handleSectionNavigate} />

      {/* Slide-over cart module */}
      <Cart
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onClearCart={handleClearCart}
      />

      {/* Quick View garment specs Modal overlay */}
      <ProductModal
        product={quickViewProduct}
        isOpen={quickViewProduct !== null}
        onClose={() => setQuickViewProduct(null)}
        onAddToCart={handleAddToCart}
      />
    </div>
  );
}
