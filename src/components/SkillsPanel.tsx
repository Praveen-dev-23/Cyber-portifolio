import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { soundManager } from '../utils/sound';
import { Award, Code2, Orbit, Database, Cpu, Layout } from 'lucide-react';

interface CircularSkill {
  name: string;
  level: number;
  icon: React.ReactNode;
  color: string;
  glow: string;
  desc: string;
}

const MAIN_SKILLS: CircularSkill[] = [
  { 
    name: "REACT CORE", 
    level: 95, 
    icon: <Code2 className="w-6 h-6 text-cyber-cyan" />, 
    color: "#00f0ff", 
    glow: "rgba(0, 240, 255, 0.4)",
    desc: "Virtual DOM optimization, context flows, React 19 concurrent features."
  },
  { 
    name: "3D CANVAS (THREEJS)", 
    level: 86, 
    icon: <Orbit className="w-6 h-6 text-purple-500" />, 
    color: "#bd00ff", 
    glow: "rgba(189, 0, 255, 0.4)",
    desc: "R3F component mounting, physics grids, WebGL buffer geometries, and custom GLSL vertex shaders."
  },
  { 
    name: "BACKEND (NODEJS)", 
    level: 88, 
    icon: <Database className="w-6 h-6 text-cyber-pink" />, 
    color: "#ff0055", 
    glow: "rgba(255, 0, 85, 0.4)",
    desc: "Robust Express routing layers, real-time WebSockets networks, and server-side pipelines."
  },
  { 
    name: "DATA ENGINES", 
    level: 80, 
    icon: <Cpu className="w-6 h-6 text-cyber-green" />, 
    color: "#39ff14", 
    glow: "rgba(57, 255, 20, 0.4)",
    desc: "Relational modeling inside PostgreSQL, caching matrices using Redis, and real-time Firebase databases."
  }
];

export default function SkillsPanel() {
  const [activeSkill, setActiveSkill] = useState<CircularSkill | null>(null);

  const handleHoverSkill = (skill: CircularSkill | null) => {
    if (skill) {
      soundManager.playHover();
      setActiveSkill(skill);
    } else {
      setActiveSkill(null);
    }
  };

  return (
    <section className="py-12 md:py-20 select-none text-left">
      {/* Sector Header */}
      <div className="flex items-center gap-3 mb-10 border-b border-cyber-dim pb-4">
        <Award className="w-6 h-6 text-cyber-cyan animate-pulse" />
        <h2 className="font-orbitron font-black text-2xl md:text-3xl tracking-widest text-white uppercase">
          SEC_04 // SYNAPSE_MATRICES
        </h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        {/* Telemetry Dials Column */}
        <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-6">
          {MAIN_SKILLS.map((skill, index) => {
            // Circle parameters for SVG dial telemetry
            const radius = 50;
            const stroke = 6;
            const normalizedRadius = radius - stroke * 2;
            const circumference = normalizedRadius * 2 * Math.PI;
            const strokeDashoffset = circumference - (skill.level / 100) * circumference;

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                onMouseEnter={() => handleHoverSkill(skill)}
                onMouseLeave={() => handleHoverSkill(null)}
                className="cyber-panel p-5 rounded-lg border-cyber-dim hover:border-cyber-cyan transition-all bg-black/60 cursor-none flex items-center gap-5 relative group"
              >
                {/* SVG Telemetry circular gauge */}
                <div className="w-24 h-24 shrink-0 relative flex items-center justify-center">
                  <svg className="w-full h-full transform -rotate-90 select-none">
                    {/* Background Circle */}
                    <circle
                      stroke="rgba(255, 255, 255, 0.05)"
                      fill="transparent"
                      strokeWidth={stroke}
                      r={normalizedRadius}
                      cx={radius}
                      cy={radius}
                    />
                    {/* Pulsing Dynamic Circle representing technology capacity */}
                    <motion.circle
                      stroke={skill.color}
                      fill="transparent"
                      strokeWidth={stroke}
                      strokeDasharray={circumference + ' ' + circumference}
                      initial={{ strokeDashoffset: circumference }}
                      whileInView={{ strokeDashoffset }}
                      viewport={{ once: true }}
                      transition={{ duration: 1.5, ease: "easeOut", delay: index * 0.2 }}
                      strokeLinecap="round"
                      r={normalizedRadius}
                      cx={radius}
                      cy={radius}
                      style={{
                        filter: `drop-shadow(0 0 5px ${skill.color})`
                      }}
                    />
                  </svg>
                  {/* Central Icon */}
                  <div className="absolute inset-0 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    {skill.icon}
                  </div>
                </div>

                {/* Text specs */}
                <div className="flex-1 min-w-0">
                  <h3 className="font-orbitron font-bold text-sm text-white tracking-wider truncate mb-1">{skill.name}</h3>
                  <div className="font-mono text-xs text-cyber-cyan font-bold tracking-widest">{skill.level}% EFFICIENCY</div>
                  <p className="text-[10px] text-gray-500 uppercase tracking-widest mt-1 font-mono">NODE_INDEX: SEC_0{index + 1}</p>
                </div>
                
                {/* Visual corners */}
                <span className="absolute top-0 right-0 w-1.5 h-1.5 bg-cyber-cyan/30" />
                <span className="absolute bottom-0 left-0 w-1.5 h-1.5 bg-cyber-cyan/30" />
              </motion.div>
            );
          })}
        </div>

        {/* Live HUD Diagnostics Screen (Right Panel) */}
        <div className="lg:col-span-4 flex flex-col justify-stretch">
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="cyber-panel p-6 rounded-lg border-cyber-pink bg-black/60 cyber-corners flex-1 flex flex-col justify-between"
          >
            <div>
              <h3 className="font-orbitron font-bold text-xs tracking-widest text-cyber-pink uppercase mb-6 flex items-center gap-1.5">
                <Layout className="w-4 h-4 text-cyber-pink animate-pulse" />
                <span>INTELLIGENCE DIAGNOSTIC SCREEN</span>
              </h3>

              <AnimatePresence mode="wait">
                {activeSkill ? (
                  <motion.div
                    key={activeSkill.name}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="space-y-4 font-mono text-xs text-gray-300"
                  >
                    <div className="border-b border-cyber-dim pb-2 text-cyber-cyan font-bold font-orbitron tracking-wider">
                      {activeSkill.name}
                    </div>
                    
                    <div className="grid grid-cols-2 gap-2 text-[10px]">
                      <div>
                        <span className="text-gray-500 block uppercase">SYNC VECTOR</span>
                        <span className="text-white">NODE_S7_ACTIVE</span>
                      </div>
                      <div>
                        <span className="text-gray-500 block uppercase">SIGNAL THRESHOLD</span>
                        <span className="text-cyber-green">OPTIMAL ({activeSkill.level}%)</span>
                      </div>
                    </div>

                    <p className="font-sans leading-relaxed text-gray-400">
                      {activeSkill.desc}
                    </p>
                  </motion.div>
                ) : (
                  <motion.div
                    key="empty"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.6 }}
                    className="flex flex-col items-center justify-center py-10 text-center gap-3 text-gray-500 font-mono text-xs"
                  >
                    <Cpu className="w-8 h-8 text-gray-600 animate-pulse" />
                    <span>AWAITING CORRELATION INPUT. HOVER A MAIN SKILL NODE DIAL TO DECRYPT REAL-TIME TELEMETRY STREAM DATA.</span>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Static diagnostic ticker */}
            <div className="mt-8 pt-4 border-t border-cyber-dim/40 font-mono text-[9px] text-gray-500 leading-normal">
              SECURE SECTOR // DECRYPTOR MATRIX ONLINE // ALL PORTS LISTENING ON SECTOR GRID [52.36 N, 4.90 E].
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
