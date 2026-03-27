import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from "motion/react";
import React, { useState } from "react";
import { X, ExternalLink, Github } from "lucide-react";
import TextReveal from "./TextReveal";

const projects = [
  {
    title: "NEURAL_GRID",
    category: "AI INFRASTRUCTURE",
    image: "https://picsum.photos/seed/tech1/1200/800",
    tech: ["Python", "TensorFlow", "Kubernetes", "React"],
    desc: "A distributed neural processing network for real-time data analysis.",
    longDesc: "Neural_Grid was engineered to solve the latency issues inherent in centralized AI processing. By distributing the neural network across edge nodes, we achieved a 400% reduction in processing time for real-time video analysis. The system utilizes a custom Kubernetes operator to dynamically scale nodes based on incoming data volume.",
    client: "CyberDyne Systems",
    year: "2025"
  },
  {
    title: "CYBER_CORE",
    category: "SECURITY PLATFORM",
    image: "https://picsum.photos/seed/tech2/1200/800",
    tech: ["Rust", "Go", "WebAssembly", "PostgreSQL"],
    desc: "Next-generation security orchestration and automated response system.",
    longDesc: "Cyber_Core provides military-grade security orchestration. Built entirely in Rust for memory safety and performance, the core engine processes millions of security events per second. The frontend utilizes WebAssembly to render complex threat maps at 60fps in the browser.",
    client: "Aegis Defense",
    year: "2026"
  },
  {
    title: "QUANTUM_UI",
    category: "DESIGN SYSTEM",
    image: "https://picsum.photos/seed/tech3/1200/800",
    tech: ["TypeScript", "Tailwind", "Framer Motion", "Vite"],
    desc: "High-fidelity design system for complex technical dashboards.",
    longDesc: "A comprehensive design system built for data-dense applications. Quantum_UI focuses on legibility, accessibility, and performance. It includes over 50 custom React components, a robust CSS variable theming engine, and physics-based animations that provide tactile feedback.",
    client: "FinTech Global",
    year: "2024"
  },
  {
    title: "ORBIT_SYNC",
    category: "CLOUD ECOSYSTEM",
    image: "https://picsum.photos/seed/tech4/1200/800",
    tech: ["Node.js", "AWS", "Terraform", "Redis"],
    desc: "Multi-region cloud synchronization engine for enterprise data.",
    longDesc: "Orbit_Sync resolves the complex challenge of multi-master database replication across global regions. Utilizing a custom CRDT (Conflict-free Replicated Data Type) implementation in Redis, it guarantees eventual consistency with sub-100ms latency between North America and Europe.",
    client: "Stellar Logistics",
    year: "2025"
  }
];

function TiltCard({ project, index, setSelectedProject }: any) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 30 });
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 30 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["5deg", "-5deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-5deg", "5deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      layoutId={`portfolio-${project.title}`}
      style={{ 
        rotateX, 
        rotateY, 
        transformStyle: "preserve-3d",
        perspective: 1000
      }}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative group cursor-pointer overflow-hidden rounded-2xl border border-white/10 transition-colors duration-500 hover:border-icy hover:shadow-[0_0_30px_rgba(0,229,255,0.15)] z-10"
      onClick={() => setSelectedProject(project)}
    >
      <motion.div
        style={{ transform: "translateZ(50px)" }}
        className="w-full h-full"
      >
        <img 
          src={project.image} 
          alt={project.title}
          className="w-full h-[380px] md:h-auto md:aspect-video object-cover transition-all duration-700 md:group-hover:scale-105 grayscale md:group-hover:grayscale-0"
          referrerPolicy="no-referrer"
        />
        
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/90 to-navy/40 transition-opacity duration-500 flex flex-col justify-end p-6 md:p-10 opacity-100 md:opacity-0 md:group-hover:opacity-100">
          <div className="transform transition-transform duration-500 ease-[0.16,1,0.3,1] translate-y-0 md:translate-y-8 md:group-hover:translate-y-0">
            <span className="font-mono text-icy text-[9px] tracking-[0.3em] mb-2 md:mb-3 block">
              {project.category}
            </span>
            <h3 className="text-2xl md:text-4xl font-light tracking-tight mb-4 md:mb-6">{project.title}</h3>
            
            <div className="flex flex-wrap gap-2 mb-4 md:mb-8">
              {project.tech.map((t: string) => (
                <span key={t} className="px-3 md:px-4 py-1.5 border border-white/10 rounded-full text-[8px] md:text-[9px] font-mono text-white/60 tracking-widest uppercase">
                  {t}
                </span>
              ))}
            </div>

            <p className="text-white/40 text-xs md:text-sm mb-6 md:mb-8 max-w-md font-light leading-relaxed">
              {project.desc}
            </p>

            <button className="flex items-center gap-3 text-white font-medium text-[9px] md:text-[10px] tracking-[0.2em] uppercase group/btn">
              EXPLORE_CASE_STUDY 
              <span className="md:group-hover/btn:translate-x-2 transition-transform duration-300 text-icy">→</span>
            </button>
          </div>
        </div>

        {/* Grid Lines Overlay */}
        <div className="absolute inset-0 grid-lines opacity-20 pointer-events-none" />
      </motion.div>
    </motion.div>
  );
}

export default function Portfolio() {
  const [selectedProject, setSelectedProject] = useState<any | null>(null);

  return (
    <section id="portfolio" className="py-16 md:py-24 px-6 md:px-20 relative">
      <div className="max-w-7xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <span className="font-mono text-icy text-xs tracking-[0.3em] uppercase mb-4 block">
            Project_Archive
          </span>
          <h2 className="text-4xl md:text-7xl font-light tracking-tighter flex flex-wrap gap-4">
            <TextReveal text="SELECTED" className="text-white" />
            <TextReveal text="OUTPUTS" className="text-white/30 italic" delay={0.1} />
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 perspective-[2000px]">
          {projects.map((project, index) => (
            <TiltCard 
              key={project.title} 
              project={project} 
              index={index} 
              setSelectedProject={setSelectedProject} 
            />
          ))}
        </div>

        <AnimatePresence>
          {selectedProject && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setSelectedProject(null)}
                className="fixed inset-0 bg-navy/90 backdrop-blur-md z-50 cursor-pointer"
              />
              <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-10 pointer-events-none">
                <motion.div
                  layoutId={`portfolio-${selectedProject.title}`}
                  className="w-full max-w-5xl bg-navy rounded-3xl overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.5)] pointer-events-auto flex flex-col md:flex-row max-h-[90vh] border border-white/10"
                >
                  {/* Image Section */}
                  <div className="w-full md:w-1/2 relative h-64 md:h-auto">
                    <img 
                      src={selectedProject.image} 
                      alt={selectedProject.title}
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-navy to-transparent md:bg-gradient-to-r" />
                    <div className="absolute inset-0 grid-lines opacity-30 pointer-events-none" />
                  </div>

                  {/* Content Section */}
                  <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col overflow-y-auto">
                    <div className="flex justify-between items-start mb-8">
                      <div>
                        <span className="font-mono text-icy text-xs tracking-[0.3em] uppercase mb-2 block">
                          {selectedProject.category}
                        </span>
                        <h3 className="text-3xl md:text-5xl font-light tracking-tight text-white">
                          {selectedProject.title}
                        </h3>
                      </div>
                      <button 
                        onClick={() => setSelectedProject(null)}
                        className="p-2 bg-white/5 hover:bg-white/10 rounded-full text-white/50 hover:text-white transition-colors shrink-0"
                      >
                        <X className="w-6 h-6" />
                      </button>
                    </div>

                    <div className="flex flex-wrap gap-2 mb-8">
                      {selectedProject.tech.map((t: string) => (
                        <span key={t} className="px-3 py-1.5 border border-white/10 rounded-full text-[9px] font-mono text-white/60 tracking-widest uppercase">
                          {t}
                        </span>
                      ))}
                    </div>

                    <div className="space-y-6 mb-auto">
                      <p className="text-white/70 text-base md:text-lg leading-relaxed font-light">
                        {selectedProject.longDesc}
                      </p>
                      <div className="grid grid-cols-2 gap-4 pt-6 border-t border-white/10">
                        <div>
                          <p className="font-mono text-[9px] text-white/30 uppercase tracking-[0.2em] mb-1">Client</p>
                          <p className="text-white/80 font-light">{selectedProject.client}</p>
                        </div>
                        <div>
                          <p className="font-mono text-[9px] text-white/30 uppercase tracking-[0.2em] mb-1">Year</p>
                          <p className="text-white/80 font-light">{selectedProject.year}</p>
                        </div>
                      </div>
                    </div>

                    <div className="flex gap-4 mt-10 pt-6 border-t border-white/10">
                      <button className="flex-1 bg-white text-navy font-medium py-4 rounded-xl text-[10px] tracking-[0.2em] uppercase hover:bg-icy hover:text-navy transition-all flex items-center justify-center gap-2">
                        <ExternalLink className="w-4 h-4" /> LIVE_DEPLOYMENT
                      </button>
                      <button className="px-6 border border-white/10 text-white font-medium rounded-xl hover:bg-white/5 transition-all flex items-center justify-center">
                        <Github className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </motion.div>
              </div>
            </>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
