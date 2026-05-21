import { motion } from 'framer-motion';
import { soundManager } from '../utils/sound';
import { Clock, Network, Calendar, ChevronRight } from 'lucide-react';

interface TimelineItem {
  id: number;
  date: string;
  role: string;
  company: string;
  desc: string[];
  type: 'work' | 'education';
}

const HISTORY_LOGS: TimelineItem[] = [
  {
    id: 1,
    date: "2024 - PRESENT",
    role: "CREATIVE ENGINEERING LEAD (FREELANCE)",
    company: "SYNAPSE DIGITAL LABS",
    desc: [
      "Orchestrated responsive, stateful frontend layouts utilizing React 19, Next.js, and TypeScript.",
      "Engineered optimized 3D digital backdrops and interactive visual components using Three.js and GLSL shaders.",
      "Optimized client bundling routines, leading to major load performance improvements (+35% Core Web Vitals score)."
    ],
    type: 'work'
  },
  {
    id: 2,
    date: "2023 (JUNE - DEC)",
    role: "FRONTEND RESEARCH DEVELOPER (INTERN)",
    company: "NEXUS SYSTEMS CORE",
    desc: [
      "Constructed modular UI cards and interactive dashboard layout blocks for real-time diagnostics.",
      "Assembled highly robust API hooks interfacing with server databases (Firebase / MongoDB).",
      "Conducted detailed browser testing loops, resolving minor rendering bugs on Safari/iOS devices."
    ],
    type: 'work'
  },
  {
    id: 3,
    date: "2020 - 2024",
    role: "B.SC. IN COMPUTER SCIENCE",
    company: "SECTOR-09 UNIVERSITY MATRIX",
    desc: [
      "Acquired deep foundations in computer systems, database design, and algorithmic scaling analysis.",
      "Specialized research modules: Human-Computer Interaction (HCI) and Interactive Web Graphics.",
      "Constructed graduation thesis modeling data flows inside three-dimensional matrix topologies."
    ],
    type: 'education'
  }
];

export default function TimelinePanel() {
  const handleHover = () => {
    soundManager.playHover();
  };

  return (
    <section className="py-12 md:py-20 select-none text-left">
      {/* Sector Header */}
      <div className="flex items-center gap-3 mb-12 border-b border-cyber-dim pb-4">
        <Clock className="w-6 h-6 text-purple-500 animate-pulse" />
        <h2 className="font-orbitron font-black text-2xl md:text-3xl tracking-widest text-white uppercase">
          SEC_05 // WORKSTREAM_CHRONO
        </h2>
      </div>

      <div className="relative max-w-4xl mx-auto pl-6 sm:pl-10">
        {/* Main glowing structural vertical timeline wire line */}
        <div className="absolute top-0 left-1.5 sm:left-5 h-full w-[2px] bg-gradient-to-b from-cyber-cyan via-purple-500 to-cyber-pink shadow-[0_0_8px_rgba(0,240,255,0.2)]" />

        {/* Timeline Log Nodes */}
        <div className="space-y-12">
          {HISTORY_LOGS.map((item, index) => (
            <div key={item.id} className="relative">
              {/* Spinning active indicator core on the line */}
              <motion.div
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ type: "spring", stiffness: 300, damping: 15, delay: index * 0.15 }}
                className={`absolute left-[-22px] sm:left-[-17px] top-1.5 w-4 h-4 rounded-full border-2 bg-[#020006] z-10 flex items-center justify-center cursor-none shadow-[0_0_8px_rgba(0,0,0,0.8)] ${
                  item.type === 'work' ? 'border-cyber-cyan' : 'border-cyber-pink'
                }`}
                onMouseEnter={handleHover}
              >
                {/* Micro center dot */}
                <span className={`w-1.5 h-1.5 rounded-full animate-ping ${item.type === 'work' ? 'bg-cyber-cyan' : 'bg-cyber-pink'}`} />
              </motion.div>

              {/* Server Access Log Card */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, ease: "easeOut", delay: index * 0.1 }}
                className={`cyber-panel p-5 rounded-lg bg-black/60 border-cyber-dim hover:border-purple-500 transition-colors relative`}
              >
                {/* Date Stamper */}
                <div className="absolute top-4 right-4 bg-black/60 border border-cyber-dim rounded px-2.5 py-1 text-[9px] font-mono text-gray-500 flex items-center gap-1.5">
                  <Calendar className="w-3 h-3 text-purple-400" />
                  <span className="text-white tracking-widest">{item.date}</span>
                </div>

                {/* Subsystem Details */}
                <div className="space-y-4 pr-16 sm:pr-0">
                  <div>
                    <h3 className="font-orbitron font-bold text-sm sm:text-base text-white tracking-wide">{item.role}</h3>
                    <span className="text-[10px] font-mono text-cyber-cyan tracking-[0.15em] uppercase flex items-center gap-1 mt-1">
                      <Network className="w-3 h-3 text-cyber-cyan animate-pulse" />
                      {item.company}
                    </span>
                  </div>

                  {/* Bullet accomplishments */}
                  <ul className="space-y-2 font-mono text-xs text-gray-300">
                    {item.desc.map((bullet, bIdx) => (
                      <li key={bIdx} className="flex items-start gap-2">
                        <ChevronRight className="w-4 h-4 text-purple-400 shrink-0 mt-0.5" />
                        <span className="leading-relaxed">{bullet}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Cyber corners decorations */}
                <span className="absolute top-0 left-0 w-1.5 h-1.5 bg-purple-500/30" />
                <span className="absolute bottom-0 right-0 w-1.5 h-1.5 bg-purple-500/30" />
              </motion.div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
