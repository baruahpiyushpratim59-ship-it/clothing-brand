import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Instagram, Send, Star, ShieldCheck, Mail, MapPin, Phone, X, Cpu } from "lucide-react";

interface FooterProps {
  onSectionNavigate: (sectionId: string) => void;
}

export default function Footer({ onSectionNavigate }: FooterProps) {
  const [legalModalContent, setLegalModalContent] = useState<null | "privacy" | "terms">(null);

  const socialLinks = [
    { label: "INSTAGRAM", url: "#social-community" },
    { label: "TIKTOK", url: "#" },
    { label: "PINTEREST", url: "#" },
    { label: "TWITTER", url: "#" }
  ];

  return (
    <footer className="bg-black text-left pt-20 pb-8 px-4 sm:px-6 lg:px-8 border-t border-zinc-900" id="footer">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 mb-16">
          
          {/* Brand Col */}
          <div className="lg:col-span-4 space-y-6">
            <div className="flex items-center space-x-1.5">
              <span className="font-display text-2xl font-black tracking-[0.25em] text-white">
                XLOTH
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-gold"></span>
            </div>
            
            <p className="text-zinc-500 font-sans text-xs leading-relaxed max-w-sm">
              Architectural garments crafted in heavy yarn and mineral pigments. Redefining modern streetwear aesthetics and bespoke durability standards worldwide.
            </p>

            <div className="flex items-center space-x-2.5 text-[10px] text-zinc-400 font-mono">
              <ShieldCheck className="w-4 h-4 text-gold" />
              <span>OFFICIAL SECURE ARCHIVAL MERCHANDIZE</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="font-display text-white text-[10px] font-black tracking-widest uppercase">
              SHOWROOM CHANNELS
            </h4>
            <ul className="space-y-2.5 font-mono text-[10px] tracking-widest list-none pl-0">
              <li>
                <button
                  onClick={() => onSectionNavigate("featured-products")}
                  className="text-zinc-500 hover:text-gold transition-colors block text-left"
                >
                  SHOP DROP
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSectionNavigate("collections")}
                  className="text-zinc-500 hover:text-gold transition-colors block text-left"
                >
                  CAPSULES
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSectionNavigate("about")}
                  className="text-zinc-500 hover:text-gold transition-colors block text-left"
                >
                  THE CRAFT
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSectionNavigate("reviews")}
                  className="text-zinc-500 hover:text-gold transition-colors block text-left"
                >
                  CURATOR FEEDBACK
                </button>
              </li>
            </ul>
          </div>

          {/* Customer Care */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="font-display text-white text-[10px] font-black tracking-widest uppercase">
              DELIVERY & SECURING
            </h4>
            <ul className="space-y-2.5 font-sans text-xs text-zinc-500 list-none pl-0">
              <li>
                <span className="hover:text-zinc-300 transition-colors block">
                  Secure Delivery Protocol (Worldwide)
                </span>
              </li>
              <li>
                <span className="hover:text-zinc-300 transition-colors block">
                  30 Days Satisfaction Exchanges
                </span>
              </li>
              <li>
                <span className="hover:text-zinc-300 transition-colors block">
                  Customs & Luxury Package Care
                </span>
              </li>
              <li>
                <span className="hover:text-zinc-300 transition-colors block">
                  Certified Organic Yarn Verification
                </span>
              </li>
            </ul>
          </div>

          {/* Contact Details */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="font-display text-white text-[10px] font-black tracking-widest uppercase">
              STUDIO ARCHIVE HQ
            </h4>
            <ul className="space-y-3 font-mono text-[10px] text-zinc-500 list-none pl-0 uppercase tracking-wider">
              <li className="flex items-start space-x-2.5">
                <MapPin className="w-4 h-4 text-gold flex-shrink-0" />
                <span>3-Chome Shibakoen, Minato-ku, Tokyo, Japan</span>
              </li>
              <li className="flex items-center space-x-2.5">
                <Mail className="w-4 h-4 text-gold flex-shrink-0" />
                <a href="mailto:help@xloth.com" className="hover:text-white transition-colors">
                  SECURE@XLOTH.COM
                </a>
              </li>
              <li className="flex items-center space-x-2.5">
                <Phone className="w-4 h-4 text-gold flex-shrink-0" />
                <span>+81 (3) 5456-9900</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Socials & Legals row */}
        <div className="border-t border-zinc-900 pt-8 flex flex-col sm:flex-row items-center justify-between gap-6">
          {/* copyright info */}
          <p className="font-mono text-[9px] text-zinc-600 tracking-widest uppercase order-2 sm:order-1">
            &copy; 2026 XLOTH STUDIO ARCHIVES LLC. ALL RIGHTS SECURED worldwide.
          </p>

          {/* Social connections */}
          <div className="flex flex-wrap items-center justify-center gap-6 text-[10px] font-mono tracking-widest order-1 sm:order-2">
            {socialLinks.map((link) => (
              <a
                key={link.label}
                href={link.url}
                className="text-zinc-500 hover:text-white transition-colors block"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Legal references */}
          <div className="flex items-center space-x-4 text-[9px] font-mono font-bold tracking-widest order-3">
            <button
              onClick={() => setLegalModalContent("privacy")}
              className="text-zinc-600 hover:text-gold transition-colors uppercase focus:outline-none cursor-pointer"
            >
              Privacy Policy
            </button>
            <span className="text-zinc-800">/</span>
            <button
              onClick={() => setLegalModalContent("terms")}
              className="text-zinc-600 hover:text-gold transition-colors uppercase focus:outline-none cursor-pointer"
            >
              Terms & Conditions
            </button>
          </div>
        </div>
      </div>

      {/* Legal terms static popups */}
      <AnimatePresence>
        {legalModalContent && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.8 }}
              exit={{ opacity: 0 }}
              onClick={() => setLegalModalContent(null)}
              className="fixed inset-0 bg-black z-50 cursor-pointer backdrop-blur-sm"
            />

            {/* Content box popup */}
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-zinc-950 border border-zinc-900 text-white max-w-lg w-[90%] p-8 z-50 overflow-y-auto max-h-[80vh] rounded shadow-2xl"
              id="legal-terms-modal"
            >
              <div className="flex items-center justify-between border-b border-zinc-900 pb-4 mb-6">
                <span className="font-display font-black tracking-widest uppercase text-white">
                  {legalModalContent === "privacy" ? "XLOTH PRIVACY CODE" : "XLOTH USAGE TERMS"}
                </span>
                <button
                  onClick={() => setLegalModalContent(null)}
                  className="text-zinc-500 hover:text-white transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="text-zinc-400 font-sans text-xs space-y-4 leading-relaxed text-left">
                {legalModalContent === "privacy" ? (
                  <>
                    <p className="text-zinc-300 font-semibold font-display tracking-wider">
                      RECOGNIZING YOUR PRIVACY INTEGRITY
                    </p>
                    <p>
                      At XLOTH, we recognize that your transaction privacy is critical. We do not store credit card signatures, transaction details, or unencrypted email databases.
                    </p>
                    <p>
                      All analytics collected is purely transient to ensure seamless sizing recommendations and e-commerce shopping bags retention on your device. We never trade or rent collector data of the elite circle.
                    </p>
                    <p className="text-zinc-500 text-[10px] font-mono">
                      LAST MODIFIED SIGNATURE: JUNE 11, 2026. SECURE COURIER ARCHIVE SYSTEMS.
                    </p>
                  </>
                ) : (
                  <>
                    <p className="text-zinc-300 font-semibold font-display tracking-wider">
                      ACCREDITATION AND COMMISSION DISCLOSURES
                    </p>
                    <p>
                      By exploring the XLOTH archival directories, you agree to respect our Tokyo studio copyright patents, typography marks, and custom streetwear outlines.
                    </p>
                    <p>
                      All ready-to-wear drops are subject to stock availability and seasonal replenishment schedules. XLOTH reserving total commissioning permissions to prevent mass resell markets from overshooting genuine collectors.
                    </p>
                    <p className="text-zinc-500 text-[10px] font-mono">
                      LAST COMPULSORY REGISTER: JUNE 11, 2026. REGULATED UNDER TOKYO DESIGN ACT.
                    </p>
                  </>
                )}
              </div>

              <button
                onClick={() => setLegalModalContent(null)}
                className="w-full mt-8 py-3 bg-white text-black font-display font-black text-[10px] uppercase tracking-widest hover:bg-gold transition-colors cursor-pointer"
              >
                Accept & Return
              </button>
            </motion.div>
          </>
        )}
      </AnimatePresence>

    </footer>
  );
}
