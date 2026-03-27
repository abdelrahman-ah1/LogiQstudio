import { motion } from "motion/react";
import { Send, Terminal, AlertCircle, CheckCircle2 } from "lucide-react";
import React, { useState } from "react";
import TextReveal from "./TextReveal";

export default function Contact() {
  const [formData, setFormData] = useState({ name: "", email: "", brief: "" });
  const [errors, setErrors] = useState({ name: "", email: "", brief: "" });
  const [status, setStatus] = useState<"idle" | "submitting" | "success">("idle");
  const [submitError, setSubmitError] = useState<string | null>(null);

  const validate = () => {
    const newErrors = { name: "", email: "", brief: "" };
    let isValid = true;
    setSubmitError(null);

    if (!formData.name.trim()) {
      newErrors.name = "> ERR_NULL: CLIENT_NAME REQUIRED";
      isValid = false;
    }

    if (!formData.email.trim()) {
      newErrors.email = "> ERR_NULL: EMAIL_ADDRESS REQUIRED";
      isValid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "> ERR_SYNTAX: INVALID_FORMAT";
      isValid = false;
    }

    if (!formData.brief.trim()) {
      newErrors.brief = "> ERR_NULL: PROJECT_BRIEF REQUIRED";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      setStatus("submitting");
      setSubmitError(null);
      
      try {
        const accessKey = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY;
        
        if (!accessKey || accessKey === "YOUR_ACCESS_KEY_HERE") {
          console.warn("Web3Forms access key is missing. Simulating submission.");
          setTimeout(() => {
            setStatus("success");
            setFormData({ name: "", email: "", brief: "" });
          }, 1500);
          return;
        }

        const response = await fetch("https://api.web3forms.com/submit", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({
            access_key: accessKey,
            name: formData.name,
            email: formData.email,
            message: formData.brief,
          }),
        });

        const result = await response.json();
        if (result.success) {
          setStatus("success");
          setFormData({ name: "", email: "", brief: "" });
        } else {
          console.error("Form submission failed:", result);
          setSubmitError(`> ERR_NETWORK: ${result.message || "TRANSMISSION_FAILED"}`);
          setStatus("idle");
        }
      } catch (error) {
        console.error("Error submitting form:", error);
        setSubmitError("> ERR_NETWORK: CONNECTION_BLOCKED_OR_FAILED");
        setStatus("idle");
      }
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error when typing
    if (errors[name as keyof typeof errors]) {
      setErrors(prev => ({ ...prev, [name]: "" }));
    }
  };

  return (
    <section id="contact" className="py-16 md:py-24 px-6 md:px-20 bg-slate-custom/10 relative">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="font-mono text-icy text-xs tracking-[0.3em] uppercase mb-4 block">
              Communication_Channel
            </span>
            <h2 className="text-4xl md:text-7xl font-light tracking-tighter mb-6 md:mb-8 flex flex-col">
              <TextReveal text="INITIALIZE" className="text-white" />
              <TextReveal text="CONTACT" className="text-white/30" delay={0.1} />
            </h2>
            <p className="text-white/40 text-lg mb-16 max-w-md font-light leading-relaxed">
              Ready to engineer your next logical breakthrough? 
              Our team is standing by to process your requirements.
            </p>

            <div className="space-y-8">
              <div className="flex items-center gap-6">
                <div className="w-14 h-14 glass-premium rounded-2xl flex items-center justify-center text-white/60">
                  <Terminal className="w-6 h-6 stroke-[1.5]" />
                </div>
                <div>
                  <p className="font-mono text-[9px] text-white/30 uppercase tracking-[0.2em] mb-1">Direct_Line</p>
                  <p className="font-light tracking-wide">+1 (555) LOGIQ-01</p>
                </div>
              </div>
              <div className="flex items-center gap-6">
                <div className="w-14 h-14 glass-premium rounded-2xl flex items-center justify-center text-white/60">
                  <Send className="w-6 h-6 stroke-[1.5]" />
                </div>
                <div>
                  <p className="font-mono text-[9px] text-white/30 uppercase tracking-[0.2em] mb-1">Email_Protocol</p>
                  <p className="font-light tracking-wide">hello@logiq.studio</p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="glass-premium p-6 md:p-16 rounded-3xl md:rounded-[2.5rem] relative overflow-hidden min-h-[500px] flex flex-col justify-center"
          >
            {/* Background Accent */}
            <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-icy/5 rounded-full blur-3xl" />

            {status === "success" ? (
              <motion.div 
                initial="hidden"
                animate="visible"
                variants={{
                  hidden: { opacity: 0, scale: 0.95 },
                  visible: {
                    opacity: 1,
                    scale: 1,
                    transition: { staggerChildren: 0.15, delayChildren: 0.1 }
                  }
                }}
                className="relative z-10 flex flex-col items-center justify-center w-full space-y-8"
              >
                <motion.div 
                  variants={{ 
                    hidden: { opacity: 0, scale: 0.5 }, 
                    visible: { opacity: 1, scale: 1, transition: { type: "spring", stiffness: 200, damping: 15 } } 
                  }} 
                  className="w-20 h-20 rounded-full bg-green-500/10 border border-green-500/30 flex items-center justify-center mb-2 shadow-[0_0_30px_rgba(34,197,94,0.15)]"
                >
                  <CheckCircle2 className="w-10 h-10 text-green-400" />
                </motion.div>
                
                <motion.div 
                  variants={{ 
                    hidden: { opacity: 0, y: 20 }, 
                    visible: { 
                      opacity: 1, 
                      y: 0, 
                      transition: { 
                        type: "spring", stiffness: 100, damping: 12,
                        staggerChildren: 0.2, delayChildren: 0.3
                      } 
                    } 
                  }} 
                  className="space-y-3 w-full bg-black/40 border border-green-500/20 rounded-xl p-6 text-left font-mono"
                >
                  <motion.p variants={{ hidden: { opacity: 0, x: -10 }, visible: { opacity: 1, x: 0 } }} className="text-green-400 text-xs md:text-sm tracking-widest uppercase flex items-center gap-2">
                    <Terminal className="w-4 h-4" /> SYSTEM_MESSAGE:
                  </motion.p>
                  <motion.p variants={{ hidden: { opacity: 0, x: -10 }, visible: { opacity: 1, x: 0 } }} className="text-green-300/80 text-xs md:text-sm tracking-wider pl-6">
                    TRANSMISSION_SUCCESSFUL
                  </motion.p>
                  <motion.p variants={{ hidden: { opacity: 0, x: -10 }, visible: { opacity: 1, x: 0 } }} className="text-green-300/50 text-[10px] md:text-xs tracking-widest mt-4 pl-6">
                    &gt; DATA PACKET RECEIVED
                    <br />
                    &gt; AWAITING_FURTHER_INSTRUCTIONS...
                  </motion.p>
                </motion.div>

                <motion.button 
                  variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100, damping: 12 } } }}
                  onClick={() => setStatus("idle")}
                  className="w-full bg-transparent border border-green-500/30 text-green-400 font-mono font-medium py-4 rounded-xl flex items-center justify-center gap-3 hover:bg-green-500/10 transition-all duration-300 text-[10px] tracking-[0.2em] uppercase"
                >
                  INITIALIZE_NEW_MESSAGE
                </motion.button>
              </motion.div>
            ) : (
            <form onSubmit={handleSubmit} className="space-y-6 relative z-10 w-full">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                <div className="space-y-2 group">
                  <label className="font-mono text-[9px] text-white/30 uppercase tracking-[0.2em]">
                    CLIENT_NAME
                  </label>
                  <input 
                    type="text" 
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="e.g. John Doe"
                    className={`w-full bg-transparent border-b ${errors.name ? 'border-red-500/50' : 'border-white/10'} px-0 py-3 focus:outline-none focus:border-icy transition-colors text-lg font-light placeholder:text-white/20`}
                  />
                  {errors.name && (
                    <motion.p initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }} className="text-red-400 font-mono text-[9px] tracking-widest uppercase mt-2 flex items-center gap-1.5">
                      <AlertCircle className="w-3 h-3" /> {errors.name}
                    </motion.p>
                  )}
                </div>
                <div className="space-y-2 group">
                  <label className="font-mono text-[9px] text-white/30 uppercase tracking-[0.2em]">
                    EMAIL_ADDRESS
                  </label>
                  <input 
                    type="email" 
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="john@company.com"
                    className={`w-full bg-transparent border-b ${errors.email ? 'border-red-500/50' : 'border-white/10'} px-0 py-3 focus:outline-none focus:border-icy transition-colors text-lg font-light placeholder:text-white/20`}
                  />
                  {errors.email && (
                    <motion.p initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }} className="text-red-400 font-mono text-[9px] tracking-widest uppercase mt-2 flex items-center gap-1.5">
                      <AlertCircle className="w-3 h-3" /> {errors.email}
                    </motion.p>
                  )}
                </div>
              </div>

              <div className="space-y-2 group mt-10">
                <label className="font-mono text-[9px] text-white/30 uppercase tracking-[0.2em]">
                  PROJECT_BRIEF
                </label>
                <textarea 
                  name="brief"
                  value={formData.brief}
                  onChange={handleChange}
                  rows={3}
                  placeholder="Describe your logical requirements..."
                  className={`w-full bg-transparent border-b ${errors.brief ? 'border-red-500/50' : 'border-white/10'} px-0 py-3 focus:outline-none focus:border-icy transition-colors text-lg font-light placeholder:text-white/20 resize-none`}
                />
                {errors.brief && (
                  <motion.p initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }} className="text-red-400 font-mono text-[9px] tracking-widest uppercase mt-2 flex items-center gap-1.5">
                    <AlertCircle className="w-3 h-3" /> {errors.brief}
                  </motion.p>
                )}
              </div>

              {submitError && (
                <motion.div 
                  initial={{ opacity: 0, y: -10 }} 
                  animate={{ opacity: 1, y: 0 }} 
                  className="bg-red-500/10 border border-red-500/30 rounded-xl p-4 flex items-start gap-3 mt-8"
                >
                  <AlertCircle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
                  <div>
                    <p className="font-mono text-[10px] text-red-400 uppercase tracking-widest mb-1">Transmission Error</p>
                    <p className="text-red-300/80 text-sm font-light">{submitError}</p>
                  </div>
                </motion.div>
              )}

              <button 
                type="submit"
                disabled={status === "submitting"}
                className={`w-full bg-white text-navy font-medium py-6 rounded-2xl flex items-center justify-center gap-3 hover:bg-icy transition-all duration-500 group mt-8 text-[11px] tracking-[0.2em] uppercase ${status === 'submitting' ? 'opacity-70 cursor-wait' : ''}`}
              >
                {status === "submitting" ? "PROCESSING..." : "TRANSMIT_DATA"}
                <Send className={`w-4 h-4 ${status === 'submitting' ? 'animate-pulse' : 'group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform'}`} />
              </button>

              <p className="font-mono text-[9px] text-white/20 text-center uppercase tracking-widest">
                By transmitting, you agree to our data processing protocols.
              </p>
            </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
