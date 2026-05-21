import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SystemLoader from './components/SystemLoader';
import Background3D from './components/Background3D';
import AppHUD from './components/AppHUD';
import CustomCursor from './components/CustomCursor';
import AIAssistantOrb from './components/AIAssistantOrb';
import HeroPanel from './components/HeroPanel';
import AboutPanel from './components/AboutPanel';
import ProjectsPanel from './components/ProjectsPanel';
import SkillsPanel from './components/SkillsPanel';
import TimelinePanel from './components/TimelinePanel';
import TerminalConsole from './components/TerminalConsole';
import { Terminal } from 'lucide-react';

export default function App() {
  const [booted, setBooted] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  // Track page scrolling to update dynamic AI diagnostics
  useEffect(() => {
    if (!booted) return;

    const sections = ['hero', 'about', 'projects', 'skills', 'experience', 'contact'];
    const observers = sections.map((secId) => {
      const el = document.getElementById(secId);
      if (!el) return null;

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setActiveSection(secId);
            }
          });
        },
        { threshold: 0.35 } // trigger when 35% visible
      );

      observer.observe(el);
      return { observer, el };
    });

    return () => {
      observers.forEach((obs) => {
        if (obs) obs.observer.unobserve(obs.el);
      });
    };
  }, [booted]);

  const scrollToSection = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };



  return (
    <>
      {/* Custom glowing crosshair target (rendered unconditionally so it is active during boot/loader screen) */}
      <CustomCursor />

      <AnimatePresence mode="wait">
        {!booted ? (
          <SystemLoader key="loader" onComplete={() => setBooted(true)} />
        ) : (
          <motion.div
            key="cyberos-core"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            {/* Interactive WebGL backdrop */}
            <Background3D />

            {/* Operating System HUD Container */}
            <AppHUD activeSection={activeSection}>
              {/* HOMEPAGE / HERO SECTOR */}
              <div id="hero">
                <HeroPanel onScrollTo={scrollToSection} />
              </div>

              {/* ABOUT DOSSIER SECTOR */}
              <div id="about" className="scroll-mt-16">
                <AboutPanel />
              </div>

              {/* PROJECTS DIRECTORY SECTOR */}
              <div id="projects" className="scroll-mt-16">
                <ProjectsPanel />
              </div>

              {/* SKILLS MATRICES SECTOR */}
              <div id="skills" className="scroll-mt-16">
                <SkillsPanel />
              </div>

              {/* TIMELINE / HISTORY SECTOR */}
              <div id="experience" className="scroll-mt-16">
                <TimelinePanel />
              </div>

              {/* TERMINAL / CONTACT SECTOR */}
              <div id="contact" className="scroll-mt-16 py-12 md:py-20 select-none text-left">
                <div className="flex items-center gap-3 mb-10 border-b border-cyber-dim pb-4">
                  <Terminal className="w-6 h-6 text-cyber-cyan animate-pulse" />
                  <h2 className="font-orbitron font-black text-2xl md:text-3xl tracking-widest text-white uppercase">
                    SEC_06 // INTRUSION_PORTAL
                  </h2>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                  {/* Info tag column */}
                  <div className="lg:col-span-5 space-y-6">
                    <div className="cyber-panel p-5 rounded-lg border-cyber-cyan bg-black/60 relative cyber-corners">
                      <h3 className="font-orbitron font-bold text-sm text-cyber-cyan tracking-wider uppercase mb-3">SECURE BRIDGE SYSTEM</h3>
                      <p className="font-mono text-xs text-gray-400 leading-relaxed mb-4">
                        Transmit packets directly to my developer database core. Run commands inside the terminal to retrieve encrypted emails, contact cards, or bypass security blockades.
                      </p>
                      
                      <div className="font-mono text-[10px] space-y-2 border-t border-cyber-dim/40 pt-4 text-gray-500">
                        <p className="text-purple-400 font-bold uppercase">SUGGESTED BRIDGE ACTIONS:</p>
                        <p><span className="text-cyber-pink">about</span>    - Stream profile dossiers</p>
                        <p><span className="text-cyber-cyan">projects</span> - Inspect loaded repositories</p>
                        <p><span className="text-cyber-green">contact</span>  - Decrypt secure emails / socials</p>
                        <p><span className="text-white">hack</span>     - Override system firewalls</p>
                      </div>
                    </div>
                  </div>

                  {/* Terminal CLI column */}
                  <div className="lg:col-span-7">
                    <TerminalConsole />
                  </div>
                </div>
              </div>
            </AppHUD>

            {/* Sector-7 Floating Guide Orb */}
            <AIAssistantOrb activeSection={activeSection} />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
