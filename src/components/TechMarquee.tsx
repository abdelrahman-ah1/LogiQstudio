import { motion } from "motion/react";

const technologies = [
  "REACT", "TYPESCRIPT", "NODE.JS", "PYTHON", "TENSORFLOW", "AWS", "KUBERNETES", 
  "RUST", "GO", "POSTGRESQL", "GRAPHQL", "TAILWIND", "FRAMER MOTION", "WEBGL"
];

export default function TechMarquee() {
  return (
    <div className="w-full overflow-hidden py-10 border-y border-white/5 bg-navy/50 backdrop-blur-sm relative z-10 flex items-center">
      <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-navy to-transparent z-10" />
      <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-navy to-transparent z-10" />
      
      <motion.div 
        className="flex whitespace-nowrap gap-16 items-center"
        animate={{ x: ["0%", "-50%"] }}
        transition={{ ease: "linear", duration: 25, repeat: Infinity }}
      >
        {/* Render twice for seamless loop */}
        {[...technologies, ...technologies].map((tech, index) => (
          <div key={index} className="flex items-center gap-16">
            <span className="font-mono text-white/20 text-sm md:text-base tracking-[0.3em] uppercase">
              {tech}
            </span>
            <span className="w-1.5 h-1.5 bg-icy/30 rounded-full" />
          </div>
        ))}
      </motion.div>
    </div>
  );
}
