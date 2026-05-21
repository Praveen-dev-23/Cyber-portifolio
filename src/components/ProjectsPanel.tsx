import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { soundManager } from '../utils/sound';
import { Briefcase, GitFork, ExternalLink, X, Radio } from 'lucide-react';

interface Project {
  id: string;
  title: string;
  tagline: string;
  description: string;
  extendedDescription: string;
  tags: string[];
  role: string;
  uptime: string;
  github: string;
  live: string;
  bgGradient: string;
}

const PROJECTS: Project[] = [
  {
    id: "cyberos",
    title: "CyberOS Terminal Grid",
    tagline: "React + Vite + Three.js + Tailwind CSS",
    description: "An immersive, 3D interactive portfolio designed like a futuristic sci-fi OS mainframe.",
    extendedDescription: "This actual website is an exercise in high-fidelity design. It features reactive Three.js WebGL backgrounds, scroll-dampened cursor crosshairs, synthesized sound effects using the Web Audio API, and an interactive shell terminal.",
    tags: ["React 19", "Three.js", "Vite", "Framer Motion", "Tailwind CSS v4.0"],
    role: "System Designer & Lead Architect",
    uptime: "99.98% OPTIMAL",
    github: "https://github.com/Praveen-dev-23/cyberpunk-portfolio",
    live: "https://cyber-os-portfolio.vercel.app",
    bgGradient: "from-cyan-900/40 to-black"
  },
  {
    id: "speech-detector",
    title: "Neural Speech Detector",
    tagline: "React + Python FastAPI + TensorFlow",
    description: "AI-powered web engine to detect ElevenLabs synthesized voice cloning waves.",
    extendedDescription: "Designed an interactive diagnostic audio spectrum visualizer. Hooked up client-side audio recording APIs to stream audio buffers to a backend Python TensorFlow server, which analyzes spectral properties to predict voice synthesis with high precision.",
    tags: ["React", "Web Audio API", "FastAPI", "Python", "TensorFlow"],
    role: "Deep Learning Engineer & Frontend Lead",
    uptime: "98.7% ONLINE",
    github: "https://github.com/Praveen-dev-23/Eleven-Labs-Text-to-speech-detection-",
    live: "https://eleven-labs-speech-detector.vercel.app",
    bgGradient: "from-purple-900/40 to-black"
  },
  {
    id: "synapse-grid",
    title: "Synapse grid net",
    tagline: "Next.js + WebSockets + Redis + 3D rendering",
    description: "Real-time interactive dashboard mapping network packets through a WebGL particle grid.",
    extendedDescription: "Created a real-time tracking network for database requests. Implemented high-frequency data pipeline streaming via WebSockets and Redis channels, visualised inside Next.js using a responsive Three.js point system.",
    tags: ["Next.js", "WebSockets", "Redis", "Three.js", "CSS Modules"],
    role: "Full-Stack System Architect",
    uptime: "100% OPERATIONAL",
    github: "https://github.com/Praveen-dev-23",
    live: "https://synapse-grid.vercel.app",
    bgGradient: "from-pink-900/40 to-black"
  }
];

export default function ProjectsPanel() {
  const [selectedProj, setSelectedProj] = useState<Project | null>(null);

  const handleHover = () => {
    soundManager.playHover();
  };

  const handleCardClick = (project: Project) => {
    soundManager.playClick();
    setSelectedProj(project);
  };

  const handleCloseModal = () => {
    soundManager.playClick();
    setSelectedProj(null);
  };

  return (
    <section className="py-12 md:py-20 select-none text-left">
      {/* Sector Header */}
      <div className="flex items-center gap-3 mb-10 border-b border-cyber-dim pb-4">
        <Briefcase className="w-6 h-6 text-cyber-pink animate-pulse" />
        <h2 className="font-orbitron font-black text-2xl md:text-3xl tracking-widest text-white uppercase">
          SEC_03 // REPOSITORY_ARCHIVE
        </h2>
      </div>

      {/* Responsive Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {PROJECTS.map((proj, idx) => (
          <motion.div
            key={proj.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: idx * 0.15 }}
            whileHover={{ y: -6 }}
            onClick={() => handleCardClick(proj)}
            onMouseEnter={handleHover}
            className="cyber-panel rounded-lg border-cyber-dim overflow-hidden hover:border-cyber-pink transition-all bg-black/60 cursor-none flex flex-col h-full group"
          >
            {/* Visual simulation banner */}
            <div className={`h-32 bg-gradient-to-br ${proj.bgGradient} relative overflow-hidden flex items-center justify-center border-b border-cyber-dim/40`}>
              <div className="absolute inset-0 bg-cyber-grid opacity-10" />
              <div className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-transparent via-cyber-pink to-transparent opacity-40 animate-pulse" />
              <div className="absolute top-2 right-2 bg-black/60 border border-cyber-dim rounded px-2 py-0.5 text-[9px] font-mono text-gray-500 uppercase tracking-widest">
                SYS: {proj.uptime}
              </div>
              <Briefcase className="w-8 h-8 text-gray-600 group-hover:text-cyber-pink transition-colors duration-300 filter drop-shadow-[0_0_8px_rgba(255,0,85,0.2)]" />
            </div>

            {/* Content body */}
            <div className="p-5 flex-1 flex flex-col justify-between">
              <div>
                <h3 className="font-orbitron font-bold text-base text-white tracking-wide mb-1 flex items-center justify-between">
                  <span>{proj.title}</span>
                </h3>
                <span className="text-[10px] font-mono text-cyber-cyan tracking-wider uppercase mb-3 block">{proj.tagline}</span>
                <p className="text-xs text-gray-400 font-sans leading-relaxed mb-4">{proj.description}</p>
              </div>

              {/* Technologies Tag Array */}
              <div className="flex flex-wrap gap-1.5 pt-3 border-t border-cyber-dim/30">
                {proj.tags.slice(0, 3).map((tag, tIdx) => (
                  <span key={tIdx} className="px-2 py-0.5 text-[9px] font-mono rounded bg-black/40 text-gray-500 uppercase border border-cyber-dim/30">
                    {tag}
                  </span>
                ))}
                {proj.tags.length > 3 && (
                  <span className="px-2 py-0.5 text-[9px] font-mono rounded bg-cyber-cyan/5 text-cyber-cyan border border-cyber-cyan/20">
                    +{proj.tags.length - 3} MORE
                  </span>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Holographic Interactive Modal Overlay */}
      <AnimatePresence>
        {selectedProj && (
          <div className="fixed inset-0 w-screen h-screen z-[9999] bg-black/85 backdrop-blur-sm flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="cyber-panel p-6 max-w-2xl w-full rounded-lg border-cyber-cyan cyber-corners bg-black/95 shadow-2xl relative select-text"
            >
              {/* Scanlines in popup */}
              <div className="absolute inset-0 bg-[#000] opacity-5 bg-cyber-grid pointer-events-none" />

              {/* Header */}
              <div className="flex justify-between items-center border-b border-cyber-dim pb-4 mb-5">
                <div className="flex items-center gap-2">
                  <Radio className="w-5 h-5 text-cyber-cyan animate-pulse" />
                  <h3 className="font-orbitron font-black text-lg md:text-xl text-white tracking-widest uppercase">
                    FILE://{selectedProj.id}.dax
                  </h3>
                </div>
                <button
                  onClick={handleCloseModal}
                  className="p-1 rounded border border-cyber-dim text-gray-400 hover:text-cyber-cyan hover:border-cyber-cyan transition-all clickable cursor-none"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Body */}
              <div className="space-y-4">
                <div>
                  <h4 className="font-orbitron font-bold text-lg text-cyber-cyan tracking-wider">{selectedProj.title}</h4>
                  <span className="text-[10px] font-mono text-purple-400 tracking-[0.2em] uppercase">{selectedProj.tagline}</span>
                </div>

                {/* Subsystem fields */}
                <div className="grid grid-cols-2 gap-4 bg-black/40 border border-cyber-dim/50 rounded p-3 font-mono text-[10px] md:text-xs">
                  <div>
                    <span className="text-gray-500 uppercase block">SUBJECT ROLE:</span>
                    <span className="text-white font-bold tracking-wide">{selectedProj.role}</span>
                  </div>
                  <div>
                    <span className="text-gray-500 uppercase block">UPTIME METRIC:</span>
                    <span className="text-cyber-green font-bold tracking-wide">{selectedProj.uptime}</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <h5 className="font-orbitron font-bold text-xs text-gray-400 uppercase tracking-widest">SUB-PARTITION OVERVIEW</h5>
                  <p className="text-xs md:text-sm text-gray-300 font-sans leading-relaxed">
                    {selectedProj.extendedDescription}
                  </p>
                </div>

                {/* Technologies List */}
                <div className="space-y-2">
                  <h5 className="font-orbitron font-bold text-xs text-gray-400 uppercase tracking-widest">COGNITIVE COMPONENT LINKAGE</h5>
                  <div className="flex flex-wrap gap-1.5">
                    {selectedProj.tags.map((tag, tIdx) => (
                      <span key={tIdx} className="px-2.5 py-1 text-[10px] font-mono rounded border border-cyber-cyan/30 text-cyber-cyan bg-cyber-cyan/5">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Action buttons */}
              <div className="mt-8 pt-5 border-t border-cyber-dim flex flex-col sm:flex-row gap-3 sm:justify-end">
                <a
                  href={selectedProj.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="cyber-btn px-6 py-2.5 rounded font-bold flex items-center justify-center gap-2 border-cyber-pink text-cyber-pink bg-cyber-pink/5 hover:bg-cyber-pink hover:text-black clickable cursor-none select-none text-xs"
                  onClick={() => soundManager.playClick()}
                >
                  <GitFork className="w-3.5 h-3.5" />
                  <span>DECRYPT REPO SOURCE</span>
                </a>
                <a
                  href={selectedProj.live}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="cyber-btn px-6 py-2.5 rounded font-bold flex items-center justify-center gap-2 clickable cursor-none select-none text-xs"
                  onClick={() => soundManager.playClick()}
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span>INITIALIZE SYSTEM DEMO</span>
                </a>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
