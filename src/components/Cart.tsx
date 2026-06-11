import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, ShoppingBag, Trash2, Plus, Minus, CreditCard, ShieldCheck, CheckCircle2, Ticket } from "lucide-react";
import { CartItem } from "../types";

interface CartProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onUpdateQuantity: (productId: string, size: string, change: number) => void;
  onRemoveItem: (productId: string, size: string) => void;
  onClearCart: () => void;
}

export default function Cart({
  isOpen,
  onClose,
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart
}: CartProps) {
  // Promo code states
  const [promoCode, setPromoCode] = useState("");
  const [appliedDiscount, setAppliedDiscount] = useState(0); // decimal
  const [promoMessage, setPromoMessage] = useState("");
  
  // Checkout flow states
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isOrderSuccess, setIsOrderSuccess] = useState(false);
  
  // Checkout form address fields
  const [fullName, setFullName] = useState("");
  const [addressLine, setAddressLine] = useState("");
  const [emailAddr, setEmailAddr] = useState("");
  const [cardNumber, setCardNumber] = useState("");

  // Free shipping threshold - $400 is very luxury, fitting premium brands!
  const shippingThreshold = 400;

  // Calculators
  const subtotal = useMemo(() => {
    return cartItems.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  }, [cartItems]);

  const discountAmount = useMemo(() => {
    return subtotal * appliedDiscount;
  }, [subtotal, appliedDiscount]);

  const shippingCost = useMemo(() => {
    if (subtotal === 0 || subtotal >= shippingThreshold) return 0;
    return 25; // Luxury flat express shipping
  }, [subtotal]);

  const total = useMemo(() => {
    return subtotal - discountAmount + shippingCost;
  }, [subtotal, discountAmount, shippingCost]);

  const amountNeededForFreeShipping = useMemo(() => {
    return Math.max(0, shippingThreshold - subtotal);
  }, [subtotal]);

  const shippingPercent = useMemo(() => {
    return Math.min(100, (subtotal / shippingThreshold) * 100);
  }, [subtotal]);

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    const code = promoCode.toUpperCase().trim();
    if (code === "ARCHIVE20") {
      setAppliedDiscount(0.2);
      setPromoMessage("PROMO CODE 'ARCHIVE20' APPLIED (20% OFF)");
    } else if (code === "GOLD10") {
      setAppliedDiscount(0.1);
      setPromoMessage("PROMO CODE 'GOLD10' APPLIED (10% OFF)");
    } else {
      setPromoMessage("INVALID PROMO CODE. TRY 'ARCHIVE20' OR 'GOLD10'");
    }
  };

  const handleCheckoutSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !addressLine || !emailAddr || !cardNumber) {
      alert("Please complete all premium security fields.");
      return;
    }
    // Simulate luxury order sequence
    setIsCheckoutOpen(false);
    setIsOrderSuccess(true);
  };

  const handleOrderClose = () => {
    onClearCart();
    setIsOrderSuccess(false);
    onClose();
  };

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Dark glassmorphic backdrop overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.8 }}
              exit={{ opacity: 0 }}
              onClick={onClose}
              className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 cursor-pointer"
            />

            {/* Shopping Cart Sliding Panel */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 180 }}
              className="fixed top-0 right-0 bottom-0 w-full sm:w-[480px] bg-zinc-950 text-white border-l border-zinc-900 z-50 flex flex-col justify-between shadow-2xl"
              id="shopping-cart-sidebar"
            >
              {/* Header */}
              <div className="p-6 border-b border-zinc-900 flex items-center justify-between">
                <div className="flex items-center space-x-2.5">
                  <ShoppingBag className="w-5 h-5 text-gold" />
                  <h3 className="font-display text-zinc-100 text-base font-bold uppercase tracking-widest">
                    Your Wardrobe Box
                  </h3>
                  <span className="text-[10px] font-mono text-zinc-500 bg-zinc-900 px-2 py-0.5 rounded-sm">
                    {cartItems.length} ITEMS
                  </span>
                </div>
                <button
                  id="close-cart-btn"
                  onClick={onClose}
                  className="text-zinc-500 hover:text-white transition-colors focus:outline-none"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Free Express Shipping dynamic gauge */}
              {cartItems.length > 0 && (
                <div className="bg-zinc-900/40 p-4 border-b border-zinc-900 flex flex-col space-y-2 text-left">
                  <div className="flex justify-between items-center text-[10px] font-mono">
                    <span className="text-zinc-400">
                      {amountNeededForFreeShipping > 0
                        ? `ADD $${amountNeededForFreeShipping.toFixed(2)} USD MORE FOR FREE EXPRESS SHIPPING`
                        : "CONGRATS! YOU HAVE SECURED COMPLIMENTARY EXPRESS WORLDWIDE COURIER DELIVERY"}
                    </span>
                    <span className="text-gold font-bold">{shippingPercent.toFixed(0)}%</span>
                  </div>
                  <div className="w-full bg-zinc-950 h-1 rounded-full overflow-hidden">
                    <div
                      className="bg-gradient-to-r from-gold to-white h-full transition-all duration-700"
                      style={{ width: `${shippingPercent}%` }}
                    />
                  </div>
                </div>
              )}

              {/* Items List Area */}
              <div className="flex-grow overflow-y-auto p-6 space-y-6 no-scrollbar">
                {cartItems.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-center space-y-4 py-20" id="empty-cart-state">
                    <div className="w-16 h-16 rounded-full border border-zinc-900 flex items-center justify-center bg-zinc-950">
                      <ShoppingBag className="w-6 h-6 text-zinc-600" />
                    </div>
                    <p className="font-display font-bold text-zinc-300 text-sm uppercase tracking-wider">
                      Your box is empty
                    </p>
                    <p className="text-zinc-500 text-xs font-sans max-w-xs mx-auto leading-relaxed">
                      Explore the XLoth showroom and add heavy cotton silhouettes, hoodies, and cargo pants to your look.
                    </p>
                    <button
                      onClick={onClose}
                      className="mt-4 px-6 py-2.5 bg-white text-black font-display font-bold text-[10px] uppercase tracking-[0.2em] hover:bg-gold hover:text-black transition-colors focus:outline-none"
                    >
                      BROWSE WORKSHOP
                    </button>
                  </div>
                ) : (
                  cartItems.map((item) => (
                    <div
                      key={`${item.product.id}-${item.selectedSize}`}
                      className="flex space-x-4 border-b border-zinc-900/40 pb-5 text-left"
                    >
                      {/* Thumbnail with gold border aspect ratio */}
                      <div className="w-20 aspect-[3/4] bg-zinc-900 border border-zinc-900 overflow-hidden flex-shrink-0">
                        <img
                          src={item.product.image}
                          alt={item.product.name}
                          className="w-full h-full object-cover object-center"
                          referrerPolicy="no-referrer"
                        />
                      </div>

                      {/* Item Details */}
                      <div className="flex-grow flex flex-col justify-between">
                        <div>
                          <div className="flex justify-between items-start">
                            <h4 className="font-display font-semibold text-zinc-100 text-sm tracking-wide">
                              {item.product.name}
                            </h4>
                            <button
                              onClick={() => onRemoveItem(item.product.id, item.selectedSize)}
                              className="text-zinc-500 hover:text-red-400 transition-colors"
                              title="Remove item"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                          
                          {/* Sizing Indicator */}
                          <div className="flex items-center space-x-2 mt-1">
                            <span className="font-mono text-[9px] text-zinc-500 uppercase">SIZE:</span>
                            <span className="font-mono text-[9px] text-white font-black bg-zinc-900 px-2 py-0.5 border border-zinc-800 rounded-sm">
                              {item.selectedSize}
                            </span>
                          </div>
                        </div>

                        {/* Interactive Quantity controllers & item rates */}
                        <div className="flex justify-between items-end mt-4">
                          <div className="flex items-center border border-zinc-900 bg-zinc-950 p-1">
                            <button
                              onClick={() => onUpdateQuantity(item.product.id, item.selectedSize, -1)}
                              className="w-6 h-6 flex items-center justify-center text-zinc-400 hover:text-white"
                              disabled={item.quantity <= 1}
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="w-8 text-center text-white font-mono text-xs font-bold">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => onUpdateQuantity(item.product.id, item.selectedSize, 1)}
                              className="w-6 h-6 flex items-center justify-center text-zinc-400 hover:text-white"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>
                          
                          <span className="font-serif italic text-sm text-gold font-medium">
                            ${item.product.price * item.quantity}.00 USD
                          </span>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>

              {/* Footer pricing totals & payment calls */}
              {cartItems.length > 0 && (
                <div className="p-6 border-t border-zinc-900 bg-zinc-950/90 text-left">
                  {/* Luxury Coupon apply slots */}
                  <form onSubmit={handleApplyPromo} className="mb-4 flex items-center space-x-2">
                    <Ticket className="w-4 h-4 text-zinc-500" />
                    <input
                      type="text"
                      placeholder="PROMO CODE (Ex: ARCHIVE20)"
                      value={promoCode}
                      onChange={(e) => setPromoCode(e.target.value)}
                      className="bg-transparent border-b border-zinc-800 text-xs font-mono py-1 focus:outline-none focus:border-gold text-white flex-grow placeholder-zinc-700 uppercase"
                    />
                    <button
                      type="submit"
                      className="px-4 py-1.5 border border-zinc-800 hover:border-gold text-zinc-400 hover:text-white font-display text-[9px] uppercase tracking-wider transition-colors cursor-pointer"
                    >
                      Apply
                    </button>
                  </form>
                  {promoMessage && (
                    <p className={`text-[9px] font-mono mb-4 uppercase ${appliedDiscount > 0 ? "text-gold font-bold" : "text-zinc-500"}`}>
                      {promoMessage}
                    </p>
                  )}

                  {/* Summary grid rates */}
                  <div className="space-y-2 mb-6 font-mono text-xs border-b border-zinc-900 pb-4">
                    <div className="flex justify-between text-zinc-500">
                      <span>BAG SUB-TOTAL:</span>
                      <span className="text-zinc-200">${subtotal.toFixed(2)} USD</span>
                    </div>
                    {appliedDiscount > 0 && (
                      <div className="flex justify-between text-gold">
                        <span>VIP DEDUCTIONS:</span>
                        <span>-${discountAmount.toFixed(2)} USD</span>
                      </div>
                    )}
                    <div className="flex justify-between text-zinc-500">
                      <span>COURIER SECURE SHIPPING:</span>
                      <span className="text-zinc-200">
                        {shippingCost === 0 ? "COMPLIMENTARY" : `$${shippingCost.toFixed(2)} USD`}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm pt-2 text-white font-bold border-t border-zinc-900/60 font-serif italic text-left">
                      <span>GRAND TOTAL:</span>
                      <span className="text-gold font-bold not-italic font-display">${total.toFixed(2)} USD</span>
                    </div>
                  </div>

                  {/* Primary checkout buttons */}
                  <div className="space-y-3">
                    <button
                      id="proceed-checkout-btn"
                      onClick={() => setIsCheckoutOpen(true)}
                      className="w-full py-4 bg-white text-black font-display font-black text-xs uppercase tracking-[0.2em] hover:bg-gold hover:text-black transition-all duration-300 flex items-center justify-center space-x-2 shadow-2xl focus:outline-none cursor-pointer"
                    >
                      <CreditCard className="w-4 h-4 text-black" />
                      <span>Proceed to Security Checkout</span>
                    </button>
                    
                    <div className="flex items-center justify-center space-x-1.5 text-[9px] text-zinc-500 font-mono tracking-wider">
                      <ShieldCheck className="w-4 h-4 text-zinc-600" />
                      <span>SECURED WITH ADVANCED 256-BIT ENCRYPTION</span>
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Luxury Checkout Security Slideover or Drawer */}
      <AnimatePresence>
        {isCheckoutOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4 backdrop-blur-md"
            id="checkout-payment-modal"
          >
            <motion.div
              initial={{ scale: 0.9, y: 50 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 50 }}
              className="bg-zinc-950 border border-zinc-900 p-8 max-w-lg w-full text-left"
            >
              <div className="flex justify-between items-center mb-6 border-b border-zinc-900 pb-4">
                <span className="font-display text-white text-lg font-black tracking-widest">
                  XLOTH CHANNELS CO.
                </span>
                <button
                  id="cancel-payment-btn"
                  onClick={() => setIsCheckoutOpen(false)}
                  className="text-zinc-500 hover:text-white transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="flex items-center space-x-2 text-gold font-mono text-[9px] tracking-widest uppercase mb-4">
                <ShieldCheck className="w-4 h-4" />
                <span>Secure Premium Merchant Channel</span>
              </div>

              <h4 className="font-serif italic text-2xl text-white mb-6">
                Delivery & Billing Details
              </h4>

              <form onSubmit={handleCheckoutSubmit} className="space-y-4">
                <div>
                  <label htmlFor="chk-fullname" className="block text-[9px] font-mono text-zinc-400 uppercase tracking-widest mb-1.5">
                    ARCHIVIST FULL NAME
                  </label>
                  <input
                    id="chk-fullname"
                    type="text"
                    required
                    placeholder="ALEXANDER VANDERBILT"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full bg-zinc-900/60 border border-zinc-800 text-white p-3 text-xs focus:ring-1 focus:ring-gold focus:outline-none focus:border-gold uppercase font-mono"
                  />
                </div>

                <div>
                  <label htmlFor="chk-email" className="block text-[9px] font-mono text-zinc-400 uppercase tracking-widest mb-1.5">
                    DELIVERY EMAIL ADRESS
                  </label>
                  <input
                    id="chk-email"
                    type="email"
                    required
                    placeholder="ALEXANDER@SHOWROOM.COM"
                    value={emailAddr}
                    onChange={(e) => setEmailAddr(e.target.value)}
                    className="w-full bg-zinc-900/60 border border-zinc-800 text-white p-3 text-xs focus:ring-1 focus:ring-gold focus:outline-none focus:border-gold font-mono"
                  />
                </div>

                <div>
                  <label htmlFor="chk-shipping" className="block text-[9px] font-mono text-zinc-400 uppercase tracking-widest mb-1.5">
                    DELIVERY SPECIFICATION ADRESS
                  </label>
                  <input
                    id="chk-shipping"
                    type="text"
                    required
                    placeholder="12 AV. MONTAIGNE, 75008 PARIS, FRANCE"
                    value={addressLine}
                    onChange={(e) => setAddressLine(e.target.value)}
                    className="w-full bg-zinc-900/60 border border-zinc-800 text-white p-3 text-xs focus:ring-1 focus:ring-gold focus:outline-none focus:border-gold uppercase font-mono"
                  />
                </div>

                <div>
                  <label htmlFor="chk-card" className="block text-[9px] font-mono text-zinc-400 uppercase tracking-widest mb-1.5">
                    SECURED CARD SIGNATURES (MOCK NUMBER)
                  </label>
                  <input
                    id="chk-card"
                    type="text"
                    required
                    placeholder="4000 1234 5678 9010"
                    value={cardNumber}
                    onChange={(e) => setCardNumber(e.target.value)}
                    className="w-full bg-zinc-900/60 border border-zinc-800 text-white p-3 text-xs focus:ring-1 focus:ring-gold focus:outline-none focus:border-gold font-mono"
                  />
                </div>

                <div className="border-t border-zinc-900 pt-6 mt-6 flex justify-between items-center bg-zinc-950">
                  <div className="text-left font-serif text-sm text-zinc-300">
                    Grand Total Balance: <strong className="text-gold font-sans not-italic text-lg">${total.toFixed(2)}</strong>
                  </div>
                  <button
                    type="submit"
                    className="px-8 py-3.5 bg-white text-black font-display font-black text-xs uppercase tracking-[0.2em] hover:bg-gold hover:text-black transition-all duration-300 flex items-center space-x-2 cursor-pointer"
                  >
                    <CheckCircle2 className="w-4 h-4 text-black" />
                    <span>Transact Now</span>
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Checkout Order Success Modal */}
      <AnimatePresence>
        {isOrderSuccess && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4 backdrop-blur-md"
            id="checkout-success-modal"
          >
            <motion.div
              initial={{ scale: 0.9, y: 50 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 50 }}
              className="bg-zinc-950 border border-zinc-800 p-10 max-w-lg w-full text-center space-y-6 shadow-2xl relative overflow-hidden"
            >
              {/* Gold light burst */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-1 bg-gradient-to-r from-transparent via-gold to-transparent" />

              <div className="w-16 h-16 rounded-full border-2 border-gold flex items-center justify-center mx-auto mb-2 bg-zinc-950">
                <CheckCircle2 className="w-8 h-8 text-gold animate-pulse" />
              </div>

              <h3 className="font-display text-2xl font-black tracking-widest text-white uppercase">
                ORDER TRANSMITTED SECURELY
              </h3>

              <div className="bg-zinc-900/60 p-4 border border-zinc-800 font-mono text-left text-[11px] text-zinc-400 space-y-2 rounded-sm uppercase">
                <div className="flex justify-between">
                  <span>RECEIPENT:</span>
                  <span className="text-white font-bold">{fullName}</span>
                </div>
                <div className="flex justify-between">
                  <span>SERIAL PACKAGING ID:</span>
                  <span className="text-gold font-bold">#X{Math.floor(100000 + Math.random() * 900000)}B</span>
                </div>
                <div className="flex justify-between">
                  <span>COURIER DISPATCH DATE:</span>
                  <span className="text-white">SHIPS WITHIN 24 HOURS</span>
                </div>
                <div className="flex justify-between border-t border-zinc-800 pt-2 text-gold">
                  <span>TRANS-ACTION TOTAL:</span>
                  <span className="font-bold">${total.toFixed(2)} USD</span>
                </div>
              </div>

              <p className="text-zinc-500 font-sans text-xs leading-relaxed max-w-sm mx-auto">
                Thank you for your archival commissioning. A security certificate receipt and real-time transit telemetry has been dispatched to <strong className="text-zinc-300 font-mono">{emailAddr}</strong>. Your packaging is crafted with organic pigments and gold sealing stitch lines.
              </p>

              <button
                id="close-success-btn"
                onClick={handleOrderClose}
                className="w-full py-4 bg-white text-black font-display font-black text-xs uppercase tracking-[0.2em] hover:bg-gold transition-all duration-300 cursor-pointer"
              >
                Return to Showroom
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
