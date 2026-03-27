import { motion, useScroll, useMotionValueEvent } from "motion/react";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import Magnetic from "./Magnetic";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    setScrolled(latest > 50);
  });

  const navLinks = [
    { name: "SERVICES", href: "#services" },
    { name: "PORTFOLIO", href: "#portfolio" },
    { name: "CONTACT", href: "#contact" },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 px-4 py-4 md:px-12 md:py-6 pointer-events-none flex justify-center">
      <motion.div 
        animate={{
          width: scrolled ? "100%" : "100%",
          maxWidth: scrolled ? "800px" : "1280px",
          backgroundColor: scrolled ? "rgba(15, 23, 42, 0.7)" : "rgba(255, 255, 255, 0.03)",
          backdropFilter: scrolled ? "blur(24px)" : "blur(12px)",
          y: scrolled ? 10 : 0,
          border: scrolled ? "1px solid rgba(255,255,255,0.1)" : "1px solid rgba(255,255,255,0.05)"
        }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        className="flex items-center justify-between px-6 py-3 md:px-8 md:py-4 rounded-full pointer-events-auto w-full shadow-[0_8px_32px_rgba(0,0,0,0.12)]"
      >
        <a href="#" className="flex items-center gap-3">
          <div className="w-7 h-7 md:w-8 md:h-8 bg-white rounded-full flex items-center justify-center font-mono font-bold text-navy text-xs md:text-sm">
            L
          </div>
          <span className="font-medium tracking-widest text-xs md:text-sm uppercase">LOGIQ STUDIO</span>
        </a>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-10">
          {navLinks.map((link) => (
            <Magnetic key={link.name}>
              <a
                href={link.href}
                className="font-mono text-[10px] tracking-[0.2em] text-white/50 hover:text-white transition-colors block p-2"
              >
                {link.name}
              </a>
            </Magnetic>
          ))}
          <Magnetic>
            <button className="bg-white text-navy font-medium px-8 py-2.5 rounded-full text-[10px] tracking-[0.2em] uppercase hover:bg-icy hover:text-navy transition-all">
              START_PROJECT
            </button>
          </Magnetic>
        </div>

        {/* Mobile Toggle */}
        <button 
          className="md:hidden text-white"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </motion.div>

      {/* Mobile Menu */}
      {isOpen && (
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="md:hidden absolute top-20 left-4 right-4 glass-premium rounded-2xl p-6 flex flex-col gap-4 shadow-2xl pointer-events-auto"
        >
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={() => setIsOpen(false)}
              className="font-mono text-xs tracking-widest text-white/80 hover:text-icy uppercase py-2"
            >
              {link.name}
            </a>
          ))}
          <button className="bg-icy text-navy font-bold px-6 py-3 rounded-xl text-xs tracking-widest uppercase mt-2">
            START_PROJECT
          </button>
        </motion.div>
      )}
    </nav>
  );
}
