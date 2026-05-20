import * as React from 'react';
import { motion } from 'framer-motion';
import { soundManager } from '../utils/sound';
import { ChevronDown, Terminal, Eye, Radio } from 'lucide-react';

const SUBTITLES = [
  "FULL-STACK DEVELOPER",
  "NEURAL SYSTEM ARCHITECT",
  "UI/UX CREATIVE TECHNOLOGIST"
];

interface HeroPanelProps {
  onScrollTo: (sectionId: string) => void;
}

export default function HeroPanel({ onScrollTo }: HeroPanelProps) {
  const [subIdx, setSubIdx] = useState(0);
  const [typedText, setTypedText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    // Cyber typewriter simulation effect
    let speed = isDeleting ? 30 : 90;
    const fullText = SUBTITLES[subIdx];

    const timer = setTimeout(() => {
      if (!isDeleting) {
        setTypedText(fullText.substring(0, typedText.length + 1));
        if (typedText === fullText) {
          // Pause at full word before deleting
          setTimeout(() => setIsDeleting(true), 2000);
        }
      } else {
        setTypedText(fullText.substring(0, typedText.length - 1));
        if (typedText === "") {
          setIsDeleting(false);
          setSubIdx((prev) => (prev + 1) % SUBTITLES.length);
        }
      }
    }, speed);

    return () => clearTimeout(timer);
  }, [typedText, isDeleting, subIdx]);

  const handleHover = () => {
    soundManager.playHover();
  };

  const handleClick = (section: string) => {
    soundManager.playClick();
    onScrollTo(section);
  };

  return (
    <section className="min-h-[85vh] flex flex-col justify-center items-center relative text-center py-12 md:py-20 select-none">
      {/* Visual background glowing orb */}
      <div className="absolute w-[300px] h-[300px] rounded-full bg-cyber-cyan/5 blur-[120px] pointer-events-none -z-10" />

      {/* Cybernetic telemetry overlay container */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 0.8, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mb-4 text-xs font-mono text-purple-400 tracking-[0.3em] flex items-center gap-1.5"
      >
        <Radio className="w-3.5 h-3.5 text-cyber-cyan animate-pulse" />
        <span>CYBEROS SECURE PORTAL ACTIVE</span>
      </motion.div>

      {/* Main Glitching Neon Name Title */}
      <motion.h1
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="font-orbitron font-black text-5xl sm:text-7xl md:text-8xl tracking-tight text-white leading-none relative select-none glitch-hover mb-4"
        onMouseEnter={handleHover}
      >
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-cyber-cyan to-white select-none filter drop-shadow-[0_0_15px_rgba(0,240,255,0.4)]">
          PRAVEEN
        </span>
      </motion.h1>

      {/* Cybernetic Typewriter Subtitle */}
      <div className="min-h-[30px] font-mono text-sm sm:text-lg md:text-xl text-cyber-cyan tracking-[0.2em] mb-12 select-none">
        <span className="terminal-typing">{typedText}</span>
      </div>

      {/* Grid of OS Telemetry Status Widgets */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl w-full mb-14 text-left font-mono">
        {[
          { title: "COGNITIVE SPEED", val: "4.8 PFLOPS", color: "border-cyber-cyan text-cyber-cyan" },
          { title: "SECURITY LEVEL", val: "MAX_IMMUNE", color: "border-cyber-pink text-cyber-pink" },
          { title: "DATABASE PATH", val: "POSTGRES.SQL", color: "border-purple-500 text-purple-400" },
          { title: "HARDWARE SYNC", val: "STABLE", color: "border-cyber-green text-cyber-green" }
        ].map((item, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: idx * 0.1 }}
            className={`cyber-panel p-3 border rounded text-[10px] md:text-xs ${item.color} relative bg-black/40`}
          >
            <div className="text-gray-500 uppercase tracking-widest text-[9px] mb-1">{item.title}</div>
            <div className="font-bold font-orbitron tracking-wider">{item.val}</div>
            {/* Corner visual indicators */}
            <span className="absolute top-0 right-0 w-1 h-1 bg-white/20" />
            <span className="absolute bottom-0 left-0 w-1 h-1 bg-white/20" />
          </motion.div>
        ))}
      </div>

      {/* Primary Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-4 justify-center items-center w-full max-w-md">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.98 }}
          onMouseEnter={handleHover}
          onClick={() => handleClick('projects')}
          className="cyber-btn px-8 py-3.5 rounded w-full sm:w-auto font-bold flex items-center justify-center gap-2 clickable shadow-[0_0_15px_rgba(0,240,255,0.15)]"
        >
          <Eye className="w-4 h-4 text-cyber-cyan" />
          <span>INSPECT PROJECT FILES</span>
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.98 }}
          onMouseEnter={handleHover}
          onClick={() => handleClick('contact')}
          className="cyber-btn px-8 py-3.5 rounded w-full sm:w-auto font-bold flex items-center justify-center gap-2 border-cyber-pink text-cyber-pink bg-cyber-pink/5 hover:bg-cyber-pink hover:text-black hover:shadow-[0_0_20px_rgba(255,0,85,0.6)] shadow-[0_0_10px_rgba(255,0,85,0.05)] clickable"
        >
          <Terminal className="w-4 h-4 text-cyber-pink" />
          <span>INITIALIZE TERMINAL</span>
        </motion.button>
      </div>

      {/* Down arrow scroll helper */}
      <motion.button
        animate={{ y: [0, 8, 0] }}
        transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
        onClick={() => handleClick('about')}
        className="absolute bottom-4 font-mono text-[10px] text-gray-500 hover:text-cyber-cyan tracking-widest flex flex-col items-center gap-1 cursor-none pb-4"
        onMouseEnter={handleHover}
      >
        <span>SCROLL DOWNSTREAM</span>
        <ChevronDown className="w-4 h-4 text-cyber-cyan" />
      </motion.button>
    </section>
  );
}
