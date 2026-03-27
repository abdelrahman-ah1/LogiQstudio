import { motion, AnimatePresence } from "motion/react";
import { Code2, Cpu, Globe, Layers, Smartphone, Zap, X, CheckCircle2 } from "lucide-react";
import { useState } from "react";
import TextReveal from "./TextReveal";

const services = [
  {
    title: "Custom Software",
    desc: "Bespoke solutions engineered for high-performance industrial applications.",
    longDesc: "We architect and build custom software systems from the ground up. Our approach focuses on creating resilient, scalable, and highly optimized applications that solve complex business challenges. We don't just write code; we engineer logical solutions.",
    features: ["Microservices Architecture", "High-Throughput Processing", "Legacy System Integration", "Real-time Data Pipelines"],
    icon: Code2,
    id: "01",
    className: "md:col-span-2 md:row-span-1"
  },
  {
    title: "Cloud Infrastructure",
    desc: "Scalable, secure, and resilient cloud architecture for global deployments.",
    longDesc: "Our cloud engineering team designs infrastructure that scales elastically. We utilize Infrastructure as Code (IaC) to ensure reproducible, secure, and highly available environments across AWS, Google Cloud, and Azure.",
    features: ["Infrastructure as Code (Terraform)", "Kubernetes Orchestration", "Multi-Region Deployments", "Zero-Trust Security"],
    icon: Cpu,
    id: "02",
    className: "md:col-span-1 md:row-span-1"
  },
  {
    title: "Mobile Ecosystems",
    desc: "Native and cross-platform mobile experiences with zero-latency logic.",
    longDesc: "We build mobile applications that feel native, fast, and intuitive. By leveraging modern frameworks and optimizing rendering pipelines, we deliver 60fps experiences that keep users engaged.",
    features: ["React Native & Swift", "Offline-First Architecture", "Hardware Acceleration", "Automated App Store Delivery"],
    icon: Smartphone,
    id: "03",
    className: "md:col-span-1 md:row-span-2 flex flex-col justify-between"
  },
  {
    title: "Web Platforms",
    desc: "High-fidelity web interfaces that balance technical depth with UX.",
    longDesc: "Our web platforms are built for speed and accessibility. We utilize edge computing, server-side rendering, and advanced caching strategies to deliver sub-second load times globally.",
    features: ["Next.js & React", "Edge Computing", "WebGL & Canvas", "WebAssembly Integration"],
    icon: Globe,
    id: "04",
    className: "md:col-span-1 md:row-span-1"
  },
  {
    title: "AI Integration",
    desc: "Leveraging neural networks to automate complex logical workflows.",
    longDesc: "We integrate state-of-the-art machine learning models into your existing workflows. From predictive analytics to natural language processing, we turn raw data into actionable intelligence.",
    features: ["LLM Orchestration", "Computer Vision", "Predictive Modeling", "Automated Data Pipelines"],
    icon: Zap,
    id: "05",
    className: "md:col-span-2 md:row-span-1"
  },
  {
    title: "System Architecture",
    desc: "Architectural blueprints for complex multi-tier software systems.",
    longDesc: "Before writing a single line of code, we design the blueprint. Our architectural planning ensures your system is built on a solid foundation, capable of handling future scale and complexity.",
    features: ["System Design", "Database Modeling", "API Gateway Design", "Security Auditing"],
    icon: Layers,
    id: "06",
    className: "md:col-span-1 md:row-span-1"
  }
];

export default function Services() {
  const [selectedId, setSelectedId] = useState<string | null>(null);

  return (
    <section id="services" className="py-16 md:py-24 px-6 md:px-20 bg-slate-custom/30 relative">
      <div className="max-w-7xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="max-w-xl">
            <span className="font-mono text-icy text-xs tracking-[0.3em] uppercase mb-4 block">
              Capabilities_Matrix
            </span>
            <h2 className="text-4xl md:text-7xl font-light tracking-tighter leading-tight flex flex-col">
              <TextReveal text="PRECISION" className="text-white" />
              <TextReveal text="ENGINEERING" className="text-white/30" delay={0.1} />
            </h2>
          </div>
          <p className="text-white/40 max-w-sm font-mono text-xs leading-relaxed tracking-wide">
            [LOG] Our service modules are designed to integrate seamlessly into existing 
            enterprise frameworks while providing cutting-edge performance.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 auto-rows-[minmax(250px,auto)]">
          {services.map((service, index) => (
            <motion.div
              layoutId={`service-${service.id}`}
              key={service.id}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              viewport={{ once: true }}
              whileHover="hover"
              onClick={() => setSelectedId(service.id)}
              className={`group glass-premium p-8 md:p-10 rounded-3xl hover:border-white/10 transition-all duration-500 relative overflow-hidden flex flex-col cursor-pointer ${service.className || ''}`}
            >
              {/* Glow Effect */}
              <div className="absolute -right-10 -top-10 w-40 h-40 bg-icy/5 rounded-full blur-3xl group-hover:bg-icy/10 transition-all duration-700" />
              
              <div className="flex justify-between items-start mb-auto pb-8">
                <motion.div 
                  animate={{ y: [0, -4, 0] }}
                  transition={{ repeat: Infinity, duration: 4, ease: "easeInOut", delay: index * 0.2 }}
                  variants={{
                    hover: { 
                      rotate: [0, -10, 10, -5, 5, 0], 
                      scale: 1.05, 
                      transition: { duration: 0.7, ease: "easeOut" } 
                    }
                  }}
                  className="p-4 bg-white/[0.03] rounded-2xl text-white/60 group-hover:bg-white group-hover:text-navy transition-colors duration-500"
                >
                  <service.icon className="w-6 h-6 stroke-[1.5]" />
                </motion.div>
                <span className="font-mono text-white/10 text-3xl font-light">
                  {service.id}
                </span>
              </div>

              <div>
                <h3 className="text-2xl font-medium mb-4 group-hover:text-white transition-colors duration-500 tracking-tight">
                  {service.title}
                </h3>
                <p className="text-white/40 text-sm leading-relaxed font-light">
                  {service.desc}
                </p>
                
                <div className="mt-8 pt-6 border-t border-white/5 flex items-center justify-between">
                  <span className="font-mono text-[9px] text-white/30 uppercase tracking-[0.2em]">
                    Status: Optimized
                  </span>
                  <span className="text-white/50 text-[10px] tracking-[0.2em] uppercase group-hover:text-white transition-colors">
                    DETAILS_
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <AnimatePresence>
          {selectedId && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setSelectedId(null)}
                className="fixed inset-0 bg-navy/80 backdrop-blur-sm z-50 cursor-pointer"
              />
              <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-10 pointer-events-none">
                {services.filter(s => s.id === selectedId).map(service => (
                  <motion.div
                    layoutId={`service-${service.id}`}
                    key={`modal-${service.id}`}
                    className="glass-premium w-full max-w-3xl bg-navy/90 rounded-3xl overflow-hidden shadow-2xl pointer-events-auto flex flex-col max-h-[90vh]"
                  >
                    <div className="p-8 md:p-12 overflow-y-auto">
                      <div className="flex justify-between items-start mb-8">
                        <div className="flex items-center gap-6">
                          <div className="p-4 bg-white/5 rounded-2xl text-white">
                            <service.icon className="w-8 h-8 stroke-[1.5]" />
                          </div>
                          <div>
                            <span className="font-mono text-icy text-xs tracking-[0.3em] uppercase mb-2 block">
                              Module_{service.id}
                            </span>
                            <h3 className="text-3xl md:text-4xl font-light tracking-tight text-white">
                              {service.title}
                            </h3>
                          </div>
                        </div>
                        <button 
                          onClick={() => setSelectedId(null)}
                          className="p-2 bg-white/5 hover:bg-white/10 rounded-full text-white/50 hover:text-white transition-colors"
                        >
                          <X className="w-6 h-6" />
                        </button>
                      </div>

                      <div className="space-y-8">
                        <p className="text-white/60 text-lg leading-relaxed font-light">
                          {service.longDesc}
                        </p>

                        <div>
                          <h4 className="font-mono text-xs text-white/40 tracking-[0.2em] uppercase mb-6 border-b border-white/10 pb-4">
                            Core_Features
                          </h4>
                          <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {service.features.map((feature, i) => (
                              <motion.li 
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: i * 0.1 + 0.2 }}
                                key={feature} 
                                className="flex items-start gap-3 text-white/70 font-light"
                              >
                                <CheckCircle2 className="w-5 h-5 text-icy shrink-0 mt-0.5" />
                                <span>{feature}</span>
                              </motion.li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                    
                    <div className="p-6 md:p-8 border-t border-white/10 bg-black/20 flex justify-between items-center">
                      <span className="font-mono text-[10px] text-white/30 tracking-[0.2em] uppercase">
                        System_Ready
                      </span>
                      <button className="bg-white text-navy font-medium px-8 py-3 rounded-full text-[10px] tracking-[0.2em] uppercase hover:bg-icy hover:text-navy transition-all">
                        INITIATE_PROTOCOL
                      </button>
                    </div>
                  </motion.div>
                ))}
              </div>
            </>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
