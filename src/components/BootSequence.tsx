import { motion } from "motion/react";
import React, { useEffect, useState } from "react";

interface BootSequenceProps {
  onComplete: () => void;
}

const BootSequence: React.FC<BootSequenceProps> = ({ onComplete }) => {
  const [lines, setLines] = useState<string[]>([]);
  const bootLines = [
    "INITIALIZING LOGIQ_OS v2.4.1...",
    "LOADING NEURAL ASSETS... [OK]",
    "ESTABLISHING SECURE CONNECTION... [OK]",
    "CALIBRATING UI PHYSICS... [OK]",
    "SYSTEM READY."
  ];

  useEffect(() => {
    let currentLine = 0;
    const interval = setInterval(() => {
      if (currentLine < bootLines.length) {
        setLines(prev => [...prev, bootLines[currentLine]]);
        currentLine++;
      } else {
        clearInterval(interval);
      }
    }, 250);

    const timeout = setTimeout(() => {
      onComplete();
    }, 2200);

    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, [onComplete]);

  return (
    <motion.div 
      className="fixed inset-0 z-[100] bg-navy flex flex-col justify-center px-6 md:px-20 font-mono text-xs md:text-sm text-icy"
      exit={{ opacity: 0, scale: 1.05, filter: "blur(10px)" }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="max-w-3xl">
        {lines.map((line, i) => (
          <motion.div key={i} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }}>
            {`> ${line}`}
          </motion.div>
        ))}
        <motion.div 
          animate={{ opacity: [1, 0] }} 
          transition={{ repeat: Infinity, duration: 0.8 }}
          className="inline-block w-2 h-4 bg-icy mt-2"
        />
      </div>
    </motion.div>
  );
};

export default BootSequence;
