import { motion } from 'framer-motion';
import { soundManager } from '../utils/sound';
import { ShieldAlert, User, Cpu } from 'lucide-react';

interface Skill {
  name: string;
  level: number;
  color: string;
  glow: string;
}

const SKILLS: Skill[] = [
  { name: "FRONTEND / INTERACTIVE (React, Next.js, TS)", level: 92, color: "bg-cyber-cyan", glow: "shadow-[0_0_10px_rgba(0,240,255,0.4)]" },
  { name: "THREE.JS / WEBGL (R3F, GLSL, Shaders)", level: 85, color: "bg-purple-500", glow: "shadow-[0_0_10px_rgba(189,0,255,0.4)]" },
  { name: "BACKEND ARCHITECTURES (Node.js, Express)", level: 88, color: "bg-cyber-pink", glow: "shadow-[0_0_10px_rgba(255,0,85,0.4)]" },
  { name: "DATABASE RELATIONAL MATRIX (PostgreSQL, Firebase)", level: 80, color: "bg-cyber-green", glow: "shadow-[0_0_10px_rgba(57,255,20,0.4)]" }
];

export default function AboutPanel() {
  const handleHover = () => {
    soundManager.playHover();
  };

  return (
    <section className="py-12 md:py-20 select-none text-left">
      {/* Sector Title */}
      <div className="flex items-center gap-3 mb-10 border-b border-cyber-dim pb-4">
        <User className="w-6 h-6 text-cyber-cyan animate-pulse" />
        <h2 className="font-orbitron font-black text-2xl md:text-3xl tracking-widest text-white uppercase">
          SEC_02 // SYSTEM_DOSSIER
        </h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Holographic Profile Card (Left Panel) */}
        <div className="lg:col-span-5 flex flex-col gap-6">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="cyber-panel p-6 rounded-lg border-cyber-cyan cyber-corners bg-black/60 relative"
          >
            {/* Holographic scanner effect line */}
            <div className="absolute inset-x-0 top-0 h-0.5 bg-gradient-to-r from-transparent via-cyber-cyan to-transparent animate-scanline-scroll opacity-60" />

            <div className="flex flex-col items-center text-center gap-4 border-b border-cyber-dim pb-6 mb-6">
              {/* Futuristic holographic avatar matrix container */}
              <div 
                className="w-24 h-24 rounded-full border border-cyber-cyan p-1.5 relative group overflow-hidden bg-black/80 flex items-center justify-center cursor-none"
                onMouseEnter={handleHover}
              >
                <div className="absolute inset-0 rounded-full border border-dashed border-cyber-cyan/30 animate-spin" style={{ animationDuration: '12s' }} />
                {/* Glowing cyan silhouette icon representing secure database image */}
                <div className="w-full h-full rounded-full bg-cyber-cyan/5 border border-cyber-cyan/40 flex items-center justify-center relative">
                  <User className="w-12 h-12 text-cyber-cyan filter drop-shadow-[0_0_8px_rgba(0,240,255,0.8)]" />
                </div>
              </div>

              <div>
                <h3 className="font-orbitron font-bold text-lg text-white tracking-widest uppercase">Praveen</h3>
                <span className="text-[10px] font-mono text-purple-400 tracking-[0.2em] uppercase">SYSTEM_INTEGRITY: OPTIMAL</span>
              </div>
            </div>

            {/* Dossier telemetry fields */}
            <div className="space-y-3 font-mono text-xs text-gray-300">
              <div className="flex justify-between border-b border-cyber-dim/30 pb-2">
                <span className="text-gray-500 uppercase">SUBJECT ID</span>
                <span className="text-cyber-cyan">PRVN-9426</span>
              </div>
              <div className="flex justify-between border-b border-cyber-dim/30 pb-2">
                <span className="text-gray-500 uppercase">CORE STATUS</span>
                <span className="text-cyber-green flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyber-green animate-pulse" />
                  AVAILABLE FOR HIRE
                </span>
              </div>
              <div className="flex justify-between border-b border-cyber-dim/30 pb-2">
                <span className="text-gray-500 uppercase">COGNITIVE NODES</span>
                <span className="text-cyber-cyan">AMSTERDAM, NL</span>
              </div>
              <div className="flex justify-between border-b border-cyber-dim/30 pb-2">
                <span className="text-gray-500 uppercase">SYNAPSE FOCUS</span>
                <span className="text-purple-400">CREATIVE ENG & FRONTEND</span>
              </div>
            </div>

            {/* Simulated dossier scan logs */}
            <div className="mt-6 p-3 bg-black/40 border border-cyber-dim/50 rounded font-mono text-[10px] text-gray-400 leading-relaxed">
              <p className="text-cyber-pink font-bold flex items-center gap-1.5 mb-1">
                <ShieldAlert className="w-3.5 h-3.5" />
                DECRYPTING DOSSIER LOG...
              </p>
              I build immersive frontend layouts, focusing heavily on reactive layouts, rich motion sequences, and 3D web frameworks. Dedicated to writing fast, clean, and highly secure codebase layers.
            </div>
          </motion.div>
        </div>

        {/* Telemetry Skill Meters (Right Panel) */}
        <div className="lg:col-span-7 flex flex-col gap-6">
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="cyber-panel p-6 rounded-lg border-cyber-pink cyber-corners bg-black/60"
          >
            <h3 className="font-orbitron font-bold text-sm tracking-widest text-cyber-pink uppercase mb-8 flex items-center gap-2">
              <Cpu className="w-4 h-4 text-cyber-pink animate-spin" style={{ animationDuration: '4s' }} />
              <span>COGNITIVE MATRIX TELEMETRY</span>
            </h3>

            {/* Dynamic animated skill progress telemetry */}
            <div className="space-y-6">
              {SKILLS.map((skill, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex justify-between font-mono text-[11px] md:text-xs">
                    <span className="text-gray-300 font-bold tracking-wider">{skill.name}</span>
                    <span className="text-cyber-cyan font-bold tracking-widest">{skill.level}% CAPACITY</span>
                  </div>
                  {/* Glowing progress slider track */}
                  <div className="w-full h-2.5 bg-black/80 rounded border border-cyber-dim overflow-hidden p-0.5">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${skill.level}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1.2, ease: "easeOut", delay: index * 0.15 }}
                      className={`h-full ${skill.color} ${skill.glow} rounded-sm`}
                    />
                  </div>
                </div>
              ))}
            </div>

            {/* Core technologies grid tags */}
            <div className="mt-10 border-t border-cyber-dim pt-6">
              <div className="font-mono text-[10px] text-gray-500 uppercase tracking-widest mb-3">COGNITIVE COMPONENT MODULES</div>
              <div className="flex flex-wrap gap-2">
                {[
                  "React 19", "Vite", "TypeScript", "Three.js", "WebGL", "GLSL Shaders", 
                  "Framer Motion", "TailwindCSS", "Node.js", "PostgreSQL", "Firebase SQL"
                ].map((tag, idx) => (
                  <span
                    key={idx}
                    onMouseEnter={handleHover}
                    className="px-2.5 py-1 text-[10px] font-mono tracking-widest uppercase rounded border border-cyber-cyan/20 text-cyber-cyan bg-cyber-cyan/5 hover:border-cyber-cyan hover:text-black hover:bg-cyber-cyan transition-all clickable"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
