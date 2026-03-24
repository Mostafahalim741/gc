import { useState } from "react";
import { Link, useLocation } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Gem } from "lucide-react";

const links = [
  { href: "/", label: "الرئيسية" },
  { href: "/ai-advice", label: "🤖 نصائح ذكية" },
  { href: "/how-to-use", label: "كيفية الاستخدام" },
  { href: "/about", label: "عنّا" },
  { href: "/contact", label: "تواصل معنا" },
];

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [location] = useLocation();

  return (
    <nav className="fixed top-0 inset-x-0 z-50 bg-black/60 backdrop-blur-md border-b border-gold-500/20">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between gap-4">

        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <Gem className="w-5 h-5 text-gold-400 group-hover:text-gold-300 transition-colors" />
          <span className="font-display text-gold-400 font-bold text-lg group-hover:text-gold-300 transition-colors">
            حاسبة الذهب
          </span>
        </Link>

        {/* Desktop links */}
        <ul className="hidden md:flex items-center gap-1">
          {links.map((link) => {
            const active = location === link.href;
            return (
              <li key={link.href}>
                <Link href={link.href}>
                  <span
                    className={`relative px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 cursor-pointer block
                      ${active
                        ? "text-gold-300 bg-gold-500/15"
                        : "text-gold-200/70 hover:text-gold-300 hover:bg-gold-500/10"
                      }`}
                  >
                    {active && (
                      <motion.span
                        layoutId="nav-pill"
                        className="absolute inset-0 rounded-lg bg-gold-500/15 border border-gold-500/30"
                        transition={{ type: "spring", duration: 0.4 }}
                      />
                    )}
                    <span className="relative z-10">{link.label}</span>
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>

        {/* Mobile toggle */}
        <button
          className="md:hidden p-2 text-gold-400 hover:text-gold-300 transition-colors"
          onClick={() => setOpen(!open)}
          aria-label="القائمة"
        >
          {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="md:hidden overflow-hidden border-t border-gold-500/20 bg-black/80 backdrop-blur-md"
          >
            <ul className="flex flex-col p-4 gap-1">
              {links.map((link) => {
                const active = location === link.href;
                return (
                  <li key={link.href}>
                    <Link href={link.href}>
                      <span
                        onClick={() => setOpen(false)}
                        className={`block px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 cursor-pointer
                          ${active
                            ? "text-gold-300 bg-gold-500/15 border border-gold-500/30"
                            : "text-gold-200/70 hover:text-gold-300 hover:bg-gold-500/10"
                          }`}
                      >
                        {link.label}
                      </span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
