/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from "react";
import { AnimatePresence } from "motion/react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import TechMarquee from "./components/TechMarquee";
import Services from "./components/Services";
import Portfolio from "./components/Portfolio";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import BootSequence from "./components/BootSequence";
import CustomCursor from "./components/CustomCursor";

export default function App() {
  const [booted, setBooted] = useState(false);

  return (
    <div className="min-h-screen relative overflow-x-hidden">
      <div className="fixed inset-0 bg-noise z-50 mix-blend-overlay pointer-events-none"></div>
      <CustomCursor />
      
      <AnimatePresence mode="wait">
        {!booted ? (
          <BootSequence key="boot" onComplete={() => setBooted(true)} />
        ) : (
          <main key="main" className="relative z-10">
            <Navbar />
            <Hero />
            <TechMarquee />
            <Services />
            <Portfolio />
            <Contact />
            <Footer />
          </main>
        )}
      </AnimatePresence>
    </div>
  );
}

