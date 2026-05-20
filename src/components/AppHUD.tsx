import type React from 'react';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { soundManager } from '../utils/sound';
import { Volume2, VolumeX, Cpu, Activity, Clock, Wifi } from 'lucide-react';

interface AppHUDProps {
  children: React.ReactNode;
  activeSection: string;
}

export default function AppHUD({ children, activeSection }: AppHUDProps) {
  const [time, setTime] = useState(new Date());
  const [latency, setLatency] = useState(8);
  const [soundActive, setSoundActive] = useState(false);

  useEffect(() => {
    // 1. Telemetry local clock updater
    const timeTimer = setInterval(() => {
      setTime(new Date());
    }, 1000);

    // 2. Randomized cyber network ping fluctuation
    const pingTimer = setInterval(() => {
      setLatency(Math.floor(6 + Math.random() * 5));
    }, 4000);

    return () => {
      clearInterval(timeTimer);
      clearInterval(pingTimer);
    };
  }, []);

  const handleSoundToggle = () => {
    soundManager.playClick();
    const playing = soundManager.toggleAmbient();
    setSoundActive(playing);
  };

  const handleHover = () => {
    soundManager.playHover();
  };

  return (
    <div className="min-h-screen w-full relative flex flex-col font-sans select-none antialiased">
      {/* CRT hardware monitor overlay effects */}
      <div className="crt-overlay" />

      {/* Main High-Tech HUD Top Bar Header */}
      <header className="fixed top-0 left-0 w-full z-50 bg-black/40 border-b border-cyber-dim backdrop-blur-md px-4 py-2.5 flex justify-between items-center text-xs md:text-sm">
        {/* Core telemetry badge */}
        <div className="flex items-center gap-4">
          <motion.div
            className="flex items-center gap-1.5 font-orbitron font-bold tracking-wider text-cyber-cyan clickable"
            whileHover={{ scale: 1.02 }}
            onMouseEnter={handleHover}
          >
            <Cpu className="w-4 h-4 text-cyber-pink animate-pulse" />
            <span>CyberOS v9.4</span>
          </motion.div>
          
          <div className="hidden md:flex items-center gap-4 text-gray-500 font-mono text-[11px] border-l border-cyber-dim pl-4">
            <span className="flex items-center gap-1">
              <Wifi className="w-3.5 h-3.5 text-cyber-cyan" />
              <span>PING: <span className="text-white">{latency}ms</span></span>
            </span>
            <span className="flex items-center gap-1">
              <Activity className="w-3.5 h-3.5 text-cyber-pink" />
              <span>FRAME_RATE: <span className="text-white">60FPS</span></span>
            </span>
          </div>
        </div>

        {/* Action Widgets / Ambient sound controls */}
        <div className="flex items-center gap-3">
          {/* Animated Ambient audio loop trigger */}
          <button
            onClick={handleSoundToggle}
            onMouseEnter={handleHover}
            className={`flex items-center gap-2 px-3 py-1.5 rounded border text-[11px] font-mono tracking-wider transition-all clickable cursor-none select-none ${
              soundActive 
                ? 'bg-cyber-cyan/15 text-cyber-cyan border-cyber-cyan shadow-[0_0_8px_rgba(0,240,255,0.2)]'
                : 'bg-black/40 text-gray-500 border-cyber-dim hover:text-white hover:border-gray-400'
            }`}
          >
            {soundActive ? (
              <>
                <Volume2 className="w-3.5 h-3.5 text-cyber-cyan animate-pulse" />
                <span className="hidden sm:inline">AMBIENT HUM: ON</span>
                <div className="flex gap-0.5 items-end h-3">
                  {[...Array(4)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="w-0.5 bg-cyber-cyan"
                      animate={{ height: [4, 12, 4] }}
                      transition={{ duration: 0.6 + i * 0.1, repeat: Infinity }}
                    />
                  ))}
                </div>
              </>
            ) : (
              <>
                <VolumeX className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">AMBIENT HUM: OFF</span>
              </>
            )}
          </button>

          {/* Time widget readout */}
          <div className="flex items-center gap-1.5 bg-black/60 border border-cyber-dim rounded px-3 py-1.5 font-mono text-[11px] text-gray-300">
            <Clock className="w-3.5 h-3.5 text-cyber-pink" />
            <span>
              {time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
            </span>
          </div>
        </div>
      </header>

      {/* Screen Frame Indicators (HUD borders) */}
      <div className="fixed top-0 left-0 h-full w-4 z-40 hidden lg:flex flex-col items-center justify-between py-20 pointer-events-none border-r border-cyber-dim bg-black/10 text-gray-600 font-mono text-[8px]">
        <div>SEC_01</div>
        <div className="rotate-90 origin-center whitespace-nowrap text-cyber-dim">SYSTEM // SECURITY: ACTIVE</div>
        <div>SYS_LN</div>
      </div>
      
      <div className="fixed top-0 right-0 h-full w-4 z-40 hidden lg:flex flex-col items-center justify-between py-20 pointer-events-none border-l border-cyber-dim bg-black/10 text-gray-600 font-mono text-[8px]">
        <div>GRID_D9</div>
        <div className="rotate-90 origin-center whitespace-nowrap text-cyber-dim uppercase">Active Section // {activeSection}</div>
        <div>NODE_88</div>
      </div>

      {/* Main Viewport Content Portal */}
      <main className="flex-1 w-full pt-16 pb-12 lg:px-12 pointer-events-auto">
        <div className="max-w-7xl mx-auto px-4 md:px-6 w-full h-full flex flex-col justify-start">
          {children}
        </div>
      </main>

      {/* Futuristic footer strip */}
      <footer className="w-full bg-black/40 border-t border-cyber-dim py-3 text-center text-[10px] md:text-xs text-gray-500 font-mono tracking-widest mt-auto z-40 flex flex-col sm:flex-row justify-between items-center px-6 gap-2">
        <div>COGNITIVE MATRIX LINK STATUS: CONNECTED</div>
        <div>(c) 2026 PRAVEEN. ALL DATA STREAM ENCRYPTED.</div>
      </footer>
    </div>
  );
}
