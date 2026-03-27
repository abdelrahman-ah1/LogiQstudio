import { motion, useMotionValue, useSpring, useScroll, useTransform } from "motion/react";
import { ShieldCheck, Activity } from "lucide-react";
import { useEffect } from "react";
import Magnetic from "./Magnetic";
import TextReveal from "./TextReveal";
import Particles from "./Particles";

export default function Hero() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 30, stiffness: 100, mass: 1 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  const { scrollY } = useScroll();
  const yBg = useTransform(scrollY, [0, 1000], [0, 300]);
  const yText = useTransform(scrollY, [0, 1000], [0, 150]);
  const opacityText = useTransform(scrollY, [0, 500], [1, 0]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;
      // Calculate percentage from center (-50% to 50%)
      const x = (clientX / innerWidth - 0.5) * 100;
      const y = (clientY / innerHeight - 0.5) * 100;
      mouseX.set(x);
      mouseY.set(y);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <section className="relative min-h-[calc(100svh-80px)] md:min-h-[100svh] flex flex-col items-center justify-center pt-12 md:pt-32 pb-16 px-6 grid-lines overflow-hidden">
      <motion.div style={{ y: yBg }} className="absolute inset-0 w-full h-full">
        <Particles />
      </motion.div>
      
      {/* Interactive Background Glow */}
      <motion.div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] md:w-[800px] md:h-[800px] bg-icy/10 rounded-full blur-[100px] md:blur-[150px] pointer-events-none"
        style={{
          x: smoothX,
          y: smoothY,
        }}
      />

      <motion.div style={{ y: yText, opacity: opacityText }} className="max-w-6xl mx-auto text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="inline-flex items-center gap-3 px-4 py-2 md:px-5 rounded-full border border-white/5 bg-white/[0.02] mb-8 md:mb-12 backdrop-blur-md"
        >
          <span className="w-1.5 h-1.5 bg-icy rounded-full animate-pulse shadow-[0_0_10px_rgba(0,229,255,0.8)]" />
          <span className="font-mono text-[8px] md:text-[9px] tracking-[0.2em] md:tracking-[0.3em] text-white/50 uppercase">
            System_Status: Operational
          </span>
        </motion.div>

        <h1 className="text-4xl sm:text-6xl md:text-[8rem] font-light tracking-tighter mb-6 md:mb-8 leading-[1] md:leading-[0.85] flex flex-col items-center">
          <TextReveal text="ENGINEERING" className="text-white block" />
          <span className="text-icy inline-block animate-typing font-normal">FUNCTIONAL LOGIC</span>
        </h1>

        <TextReveal 
          text="We bridge the gap between industrial precision and ethereal technology to build software that scales with your ambition."
          className="text-base sm:text-lg md:text-2xl text-white/40 font-light tracking-wide max-w-3xl mx-auto mb-12 md:mb-16 leading-relaxed justify-center"
          delay={0.2}
        />

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 md:gap-6 mb-16 md:mb-24 w-full sm:w-auto">
          <Magnetic>
            <button className="w-full sm:w-auto bg-white text-navy font-medium px-8 md:px-12 py-4 md:py-5 rounded-full text-[10px] md:text-[11px] tracking-[0.2em] uppercase hover:scale-105 transition-transform duration-500 ease-out shadow-[0_0_40px_rgba(255,255,255,0.1)]">
              VIEW_CAPABILITIES
            </button>
          </Magnetic>
          <Magnetic>
            <button className="w-full sm:w-auto border border-white/10 hover:bg-white/5 px-8 md:px-12 py-4 md:py-5 rounded-full text-[10px] md:text-[11px] tracking-[0.2em] uppercase transition-all duration-500 ease-out">
              OUR_PROCESS
            </button>
          </Magnetic>
        </div>

        {/* System Check Status Bar */}
        <div className="glass-premium rounded-2xl p-4 md:p-6 flex flex-col sm:flex-row flex-wrap items-center justify-center gap-4 md:gap-12 max-w-4xl mx-auto w-full">
          <div className="flex items-center gap-3">
            <ShieldCheck className="w-4 h-4 md:w-5 md:h-5 text-icy" />
            <span className="font-mono text-[10px] md:text-xs tracking-wider text-white/80">
              SECURITY: <span className="text-icy">VERIFIED</span>
            </span>
          </div>
          <div className="w-full h-px sm:w-px sm:h-4 bg-white/10 block" />
          <div className="flex items-center gap-3">
            <Activity className="w-4 h-4 md:w-5 md:h-5 text-icy" />
            <span className="font-mono text-[10px] md:text-xs tracking-wider text-white/80">
              UPTIME: <span className="text-icy">99.9%</span>
            </span>
          </div>
          <div className="w-full h-px sm:w-px sm:h-4 bg-white/10 block" />
          <div className="flex items-center gap-3">
            <span className="font-mono text-[10px] md:text-xs tracking-wider text-white/40">
              V_4.1.0_STABLE
            </span>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
