import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { soundManager } from '../utils/sound';
import { MessageSquareCode, X, Sparkles } from 'lucide-react';

const AI_TIPS = [
  "Welcome to CyberOS Terminal. Type 'help' inside the console to unlock secure files.",
  "Try entering 'hack' in the terminal command line for an immersive core override.",
  "Double click project cards to initiate standard neural detail overlays.",
  "Hovering over skill meters draws telemetry readouts to the diagnostics panel.",
  "You can toggle the deep spaceship ambient hum in the upper right sub-panel.",
  "Sector-7 AI matrix standing by. Select projects to inspect their stack configurations."
];

interface AIAssistantOrbProps {
  activeSection?: string;
}

export default function AIAssistantOrb({ activeSection }: AIAssistantOrbProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [pulseColor, setPulseColor] = useState("#00f0ff");
  const [bubbleKey, setBubbleKey] = useState(0);

  // Set contextual message if section changes
  useEffect(() => {
    if (activeSection) {
      let promptText = "";
      switch (activeSection) {
        case 'hero':
          promptText = "System operating in Hero Sector. You are looking at the neural center of my developer mainframe.";
          setPulseColor("#00f0ff");
          break;
        case 'about':
          promptText = "Decrypting structural bios... Check out the interactive skill bars designed as telemetry dashboards.";
          setPulseColor("#bd00ff");
          break;
        case 'projects':
          promptText = "Floating project nodes activated. Hover over nodes to see glassmorphic preview matrixes.";
          setPulseColor("#ff0055");
          break;
        case 'skills':
          promptText = "Neural tech stack display active. Hovering elements reveals structural mastery values.";
          setPulseColor("#00f0ff");
          break;
        case 'experience':
          promptText = "Accessing historical work logs. Scroll downstream to track chronological telemetry nodes.";
          setPulseColor("#39ff14");
          break;
        case 'contact':
          promptText = "Secure bridge ready. Enter system commands inside the terminal to send encrypted packets.";
          setPulseColor("#ff0055");
          break;
        default:
          promptText = "Sector-7 dynamic guidance system online.";
      }
      setMessage(promptText);
      setBubbleKey((prev) => prev + 1);
      
      // Auto open bubble when switching sections (only if not already manual toggled off)
      const openTimer = setTimeout(() => {
        setIsOpen(true);
      }, 500);
      return () => clearTimeout(openTimer);
    }
  }, [activeSection]);

  const handleOrbClick = () => {
    soundManager.playClick();
    if (isOpen) {
      setIsOpen(false);
    } else {
      // Pick a random tip
      const randomTip = AI_TIPS[Math.floor(Math.random() * AI_TIPS.length)];
      setMessage(randomTip);
      setBubbleKey((prev) => prev + 1);
      setIsOpen(true);
    }
  };

  const handleOrbHover = () => {
    soundManager.playHover();
  };

  return (
    <div className="fixed bottom-6 right-6 z-[999] flex flex-col items-end gap-3 pointer-events-none">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            key={bubbleKey}
            initial={{ opacity: 0, scale: 0.85, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.85, y: 15 }}
            className="cyber-panel px-4 py-3 rounded-lg text-xs md:text-sm font-mono text-left max-w-[280px] md:max-w-[320px] text-cyber-cyan border-cyber-cyan cyber-corners pointer-events-auto shadow-[0_0_15px_rgba(0,240,255,0.1)] relative"
          >
            <div className="flex justify-between items-center border-b border-cyber-dim pb-1.5 mb-1.5 text-[9px] text-purple-400 uppercase tracking-widest">
              <span className="flex items-center gap-1.5">
                <Sparkles className="w-3 h-3 text-cyber-pink animate-spin" style={{ animationDuration: '3s' }} />
                <span>SECTOR-7 AI LOG</span>
              </span>
              <button 
                onClick={() => { soundManager.playClick(); setIsOpen(false); }}
                className="hover:text-cyber-pink text-gray-500 transition-colors clickable"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
            
            {/* Holographic simulated dialogue typing speed */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4 }}
              className="leading-relaxed leading-5 text-gray-300 font-mono tracking-wide"
            >
              {message}
            </motion.p>
            
            {/* Telemetry bottom link */}
            <div className="mt-2 text-[9px] text-gray-500 uppercase tracking-widest text-right">
              STATUS: TRANSMITTING...
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Animated Sphere Orb */}
      <motion.button
        onClick={handleOrbClick}
        onMouseEnter={handleOrbHover}
        className="w-14 h-14 rounded-full pointer-events-auto cursor-none flex items-center justify-center relative focus:outline-none"
        animate={{
          y: [-6, 6, -6],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        {/* Deep orb radial glow core */}
        <motion.div
          className="absolute inset-0 rounded-full blur-[10px] opacity-60"
          animate={{
            backgroundColor: pulseColor,
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        {/* Dynamic Hologram Rings spinning in opposite directions */}
        <motion.div
          className="absolute inset-0 rounded-full border border-dashed opacity-50"
          style={{ borderColor: pulseColor }}
          animate={{ rotate: 360 }}
          transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
        />
        <motion.div
          className="absolute inset-1.5 rounded-full border border-dotted opacity-70"
          style={{ borderColor: pulseColor }}
          animate={{ rotate: -360 }}
          transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
        />

        {/* Central Core sphere with pulse details */}
        <div 
          className="w-8 h-8 rounded-full flex items-center justify-center relative z-10 transition-all duration-300 shadow-inner"
          style={{
            background: `radial-gradient(circle, rgba(255,255,255,0.2) 0%, rgba(6,3,14,0.9) 70%)`,
            border: `1px solid ${pulseColor}`
          }}
        >
          <MessageSquareCode className="w-4 h-4 text-cyber-cyan animate-pulse" style={{ color: pulseColor }} />
        </div>
      </motion.button>
    </div>
  );
}
