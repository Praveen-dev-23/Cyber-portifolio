import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { soundManager } from '../utils/sound';
import { Shield, ShieldAlert, Cpu, Radio } from 'lucide-react';

const BOOT_LOGS = [
  "CYBEROS [Version 9.4.2026] Neural Uplink Core",
  "(c) 2026 DeepMind Cybernetics. All rights reserved.",
  "",
  "SYSBOOT: Initializing master core sequence...",
  "SYSBOOT: Mount memory partition sectors [1048576 KB] ... OK",
  "SYSBOOT: Loading cybernetic dynamic kernel modules...",
  "KERNEL: [core.modules.physics] loaded. Active springs: 220hz",
  "KERNEL: [core.modules.graphics.webgl] binding threejs buffer indices...",
  "KERNEL: GL Context: ANGLE (Apple, Apple M3 Max, OpenGL 4.1) ... OK",
  "SYSBOOT: Connecting to decentralized neural matrix net...",
  "NETWORK: Gateway: 10.42.0.1 | Uptime: 99.987%",
  "NETWORK: Latency check: 8ms | Node sync status ... STABLE",
  "SECURITY: Injecting biometric firewall algorithms...",
  "SECURITY: Decrypting portfolio coordinates [52.36° N, 4.90° E]...",
  "DIAGNOSTIC: Orbitron typography elements loaded ... OK",
  "DIAGNOSTIC: Synthesized Web Audio sub-nodes ready ... OK",
  "DIAGNOSTIC: Laser grids, custom cursor trailing, particles ... OK",
  "",
  "SYSTEM WARNING: Portfolio firewall requires biometric authorization.",
  "SYSBOOT: Awaiting manual neural link verification trigger..."
];

export default function SystemLoader({ onComplete }: { onComplete: () => void }) {
  const [logs, setLogs] = useState<string[]>([]);
  const [logIndex, setLogIndex] = useState(0);
  const [booting, setBooting] = useState(true);
  const [authReady, setAuthReady] = useState(false);
  const [authorized, setAuthorized] = useState(false);

  useEffect(() => {
    if (logIndex < BOOT_LOGS.length) {
      const timer = setTimeout(() => {
        setLogs((prev) => [...prev, BOOT_LOGS[logIndex]]);
        soundManager.playKeystroke();
        setLogIndex(logIndex + 1);

        // Auto-scroll the log container if needed
        const element = document.getElementById('boot-log-container');
        if (element) {
          element.scrollTop = element.scrollHeight;
        }
      }, 70 + Math.random() * 80); // varying typing speeds
      return () => clearTimeout(timer);
    } else {
      setAuthReady(true);
      setBooting(false);
    }
  }, [logIndex]);

  const handleAuthorize = () => {
    soundManager.playBoot();
    setAuthorized(true);
    
    // Allow the sound chime to finish and fade out with grace
    setTimeout(() => {
      onComplete();
    }, 1800);
  };

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 w-screen h-screen z-[9999] bg-[#020006] text-cyber-cyan font-mono p-4 md:p-8 flex flex-col justify-between overflow-hidden crt-scanlines"
        exit={{ opacity: 0, y: '-100vh' }}
        transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
      >
        <div className="absolute inset-0 bg-[#000] opacity-10 bg-cyber-grid pointer-events-none" />
        
        {/* Dynamic Matrix-style top header strip */}
        <div className="w-full flex justify-between items-center text-[10px] md:text-xs border-b border-cyber-dim pb-3 tracking-widest text-cyber-cyan opacity-80">
          <div className="flex items-center gap-2">
            <Cpu className="w-4 h-4 animate-pulse text-cyber-pink" />
            <span>PORTFOLIO OS: BOOT_STAGE_A</span>
          </div>
          <div>COGNITIVE UPLINK STATUS: AWAITING_LINK</div>
          <div className="hidden sm:block">LOCAL_TIME: {new Date().toISOString()}</div>
        </div>

        {/* Boot Terminal Logs Container */}
        <div 
          id="boot-log-container"
          className="flex-1 my-6 overflow-y-auto font-mono text-[11px] md:text-sm leading-relaxed text-left max-w-4xl mx-auto w-full scrollbar-none"
          style={{ scrollbarWidth: 'none' }}
        >
          {logs.map((log, index) => {
            const isWarning = log.includes("WARNING");
            const isSuccess = log.includes("OK") || log.includes("STABLE");
            
            let colorClass = "text-cyber-cyan";
            if (isWarning) colorClass = "text-cyber-pink animate-pulse font-bold";
            else if (isSuccess) colorClass = "text-cyber-green";
            else if (log.startsWith("SYSBOOT:") || log.startsWith("KERNEL:")) colorClass = "text-purple-400";
            
            return (
              <div key={index} className={`${colorClass} tracking-wide min-h-[20px] font-mono`}>
                {log}
              </div>
            );
          })}
          {booting && <span className="terminal-typing text-cyber-cyan">_</span>}
        </div>

        {/* Biometric Trigger Module */}
        <div className="w-full max-w-xl mx-auto flex flex-col items-center justify-center p-6 border border-cyber-dim bg-cyber-card relative cyber-corners mb-4">
          <div className="absolute top-0 left-4 -translate-y-1/2 bg-[#020006] px-2 text-[10px] tracking-wider text-cyber-pink font-bold flex items-center gap-1.5">
            {authorized ? <Shield className="w-3.5 h-3.5 text-cyber-green" /> : <ShieldAlert className="w-3.5 h-3.5 text-cyber-pink animate-bounce" />}
            <span>GATEWAY SECURITY PROTOCOL</span>
          </div>

          <AnimatePresence mode="wait">
            {!authReady && (
              <motion.div
                key="scanning"
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.7 }}
                exit={{ opacity: 0 }}
                className="flex flex-col items-center gap-3 py-4"
              >
                <div className="flex gap-1.5 items-end justify-center">
                  {[...Array(5)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="w-1.5 bg-cyber-cyan"
                      animate={{ height: [12, 32, 12] }}
                      transition={{ duration: 1, repeat: Infinity, delay: i * 0.15 }}
                    />
                  ))}
                </div>
                <div className="text-xs tracking-widest uppercase">Scanning Local Biosphere...</div>
              </motion.div>
            )}

            {authReady && !authorized && (
              <motion.div
                key="btn-ready"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                className="w-full flex flex-col items-center gap-4 py-2"
              >
                <p className="text-[11px] uppercase tracking-widest text-center text-gray-400 max-w-sm">
                  Connecting requires initializing local browser synthesizers and background coordinate grids.
                </p>
                <button
                  onClick={handleAuthorize}
                  className="cyber-btn w-full md:w-auto px-10 py-3.5 rounded font-bold clickable relative flex items-center justify-center gap-3 text-sm"
                >
                  <Radio className="w-4 h-4 text-cyber-cyan animate-pulse" />
                  <span>ESTABLISH NEURAL LINK</span>
                </button>
              </motion.div>
            )}

            {authorized && (
              <motion.div
                key="authorized"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex flex-col items-center gap-3 py-4 text-cyber-green"
              >
                <motion.div
                  animate={{ scale: [1, 1.15, 1], rotate: [0, 360, 360] }}
                  transition={{ duration: 1.5 }}
                >
                  <Cpu className="w-10 h-10 text-cyber-green" />
                </motion.div>
                <div className="text-sm font-bold tracking-widest uppercase animate-pulse">UPLINK ESTABLISHED. SYNAPSE SYNCED.</div>
                <div className="text-[10px] text-gray-500 uppercase tracking-widest">Redirecting to cyber shell dashboard...</div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Dynamic telemetry footer panel */}
        <div className="w-full flex justify-between items-center text-[9px] md:text-[10px] text-gray-500 border-t border-cyber-dim pt-3">
          <div className="flex gap-4">
            <span className="flex items-center gap-1"><Radio className="w-3 h-3 text-cyber-green" /> BEACON_01</span>
            <span className="hidden sm:inline">OS: KERNEL_9.4</span>
          </div>
          <div>POWER_LEVEL: 100% | TEMP: 37°C</div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
