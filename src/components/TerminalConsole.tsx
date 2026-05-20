import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { soundManager } from '../utils/sound';
import { Terminal, RefreshCw, AlertTriangle, ShieldCheck, ChevronRight } from 'lucide-react';

interface TerminalLine {
  text: string;
  type: 'input' | 'output' | 'error' | 'success' | 'system';
}

const WELCOME_MESSAGES: TerminalLine[] = [
  { text: "CyberOS Terminal v1.0.0 (Secure Core Interface)", type: 'system' },
  { text: "Neural link terminal connection established ... SECURE", type: 'success' },
  { text: "Type 'help' to access standard operating commands, or select secrets.", type: 'output' },
  { text: "", type: 'output' }
];

const HELP_TEXT = `
Available shell commands inside CyberOS:
  about    - Print professional diagnostic bio details
  projects - Stream project index directories
  skills   - Telemetry matrix of technological proficiencies
  contact  - Display secure channels and socials
  system   - View simulated local framework metrics
  clear    - Flush terminal scroll output buffer
  hack     - Override local firewall (Easter Egg)
`;

const ABOUT_TEXT = `
SYSTEM BIOMETRIC RETRIEVAL: PRAVEEN (DEVELOPER / ARCHITECT)
======================================================
Role: Full-Stack Developer & Creative Engineer
Mainframe Focus: Front-end engineering, interactive 3D, and high-performance Web apps.
Philosophy: "Building high-performance futuristic interfaces that merge storytelling with logic."
Location Sector: Amsterdam Area (Latitude: 52.3676° N, Longitude: 4.9041° E)
Uptime Capacity: 100% focused on clean scalable code architectures.
`;

const PROJECTS_TEXT = `
MOUNTED PROJECT NODE DIRECTORIES:
=================================
[Sector-01]  PORTFOLIO_OS (React + ThreeJS + Tailwind CSS)
             Holographic cyberpunk operating system dashboard (This site).
             Status: Deployed (Optimal).
             
[Sector-02]  NEURAL_SPEECH_DETECTOR (React + Python + Web Audio)
             AI engine detecting ElevenLabs synthetic voices.
             Status: Operational.

[Sector-03]  SYNAPSE_GRID (Next.js + Tailwind + Three.js)
             3D real-time blockchain telemetry network.
             Status: Archiving complete.
`;

const SKILLS_TEXT = `
TECHNOLOGY MATRIX TELEMETRY:
============================
Languages  :: JavaScript (ES6+), TypeScript, HTML5, CSS3, SQL
Frameworks :: React, Next.js, React Three Fiber, Vite, Node.js, Express
Styles     :: Tailwind CSS, Vanilla CSS, CSS Modules
3D/Motion  :: Three.js, Framer Motion, GLSL Shaders, SVG Filters
Database   :: PostgreSQL, Firebase, MongoDB, Redis
`;

const CONTACT_TEXT = `
SECURE CHANNELS OPENED:
=======================
Email      :: praveen.dev.23@gmail.com
GitHub     :: github.com/Praveen-dev-23
LinkedIn   :: linkedin.com/in/praveen-dev
Discord    :: matrix_ghost#777
`;

// Matrix rain easter egg helper canvas
function MatrixRain({ onClose }: { onClose: () => void }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const alphabet = "アカサタナハマヤラワガザダバパイウエオ1234567890ABCDEF";
    const fontSize = 16;
    const columns = canvas.width / fontSize;

    const rainDrops: number[] = [];
    for (let x = 0; x < columns; x++) {
      rainDrops[x] = 1;
    }

    const draw = () => {
      ctx.fillStyle = 'rgba(2, 0, 6, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = '#00f0ff'; // Neon matrix rain color
      ctx.font = fontSize + 'px monospace';

      for (let i = 0; i < rainDrops.length; i++) {
        const text = alphabet.charAt(Math.floor(Math.random() * alphabet.length));
        ctx.fillText(text, i * fontSize, rainDrops[i] * fontSize);

        if (rainDrops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          rainDrops[i] = 0;
        }
        rainDrops[i]++;
      }
    };

    const interval = setInterval(draw, 30);

    // Auto terminate hack screen after 4.5 seconds
    const timer = setTimeout(() => {
      onClose();
    }, 4500);

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    return () => {
      clearInterval(interval);
      clearTimeout(timer);
      window.removeEventListener('resize', handleResize);
    };
  }, [onClose]);

  return (
    <div className="fixed inset-0 w-screen h-screen bg-[#020006] z-[9999] pointer-events-none flex items-center justify-center">
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
      <div className="relative z-10 px-8 py-6 bg-black/90 border border-cyber-pink cyber-corners text-center max-w-md animate-pulse">
        <AlertTriangle className="w-12 h-12 text-cyber-pink mx-auto mb-4 animate-bounce" />
        <h2 className="text-xl font-orbitron font-bold text-cyber-pink tracking-widest mb-2">FIREWALL COMPROMISED</h2>
        <p className="font-mono text-xs text-gray-400 mb-2">SECURE KERNEL ENCRYPT MATRIX INTRUSION TRIGGERED.</p>
        <p className="font-mono text-xs text-cyber-cyan animate-pulse">REBOOTING FIREWALL PROTOCOLS IN 4s...</p>
      </div>
    </div>
  );
}

export default function TerminalConsole() {
  const [history, setHistory] = useState<TerminalLine[]>(WELCOME_MESSAGES);
  const [inputValue, setInputValue] = useState("");
  const [cmdHistory, setCmdHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [showMatrix, setShowMatrix] = useState(false);
  const bufferEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Auto scroll to bottom of logs on new input
    bufferEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    soundManager.playKeystroke();
    
    // Command history navigation (Up/Down arrow keys)
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (cmdHistory.length === 0) return;
      
      const nextIdx = historyIndex < cmdHistory.length - 1 ? historyIndex + 1 : historyIndex;
      setHistoryIndex(nextIdx);
      setInputValue(cmdHistory[cmdHistory.length - 1 - nextIdx]);
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex <= 0) {
        setHistoryIndex(-1);
        setInputValue("");
      } else {
        const nextIdx = historyIndex - 1;
        setHistoryIndex(nextIdx);
        setInputValue(cmdHistory[cmdHistory.length - 1 - nextIdx]);
      }
    }
  };

  const handleCommandSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanCmd = inputValue.trim().toLowerCase();

    if (!cleanCmd) return;

    soundManager.playClick();
    
    // 1. Append user typed input command line to history
    const userLine: TerminalLine = { text: `guest@cyberos:~$ ${inputValue}`, type: 'input' };
    const newHistory = [...history, userLine];

    // Store in history array
    setCmdHistory((prev) => [...prev, inputValue]);
    setHistoryIndex(-1);
    setInputValue("");

    // 2. Parse command
    let replyLines: TerminalLine[] = [];
    let isError = false;

    switch (cleanCmd) {
      case 'help':
        replyLines = HELP_TEXT.split('\n').map(line => ({ text: line, type: 'output' }));
        break;
      case 'about':
        replyLines = ABOUT_TEXT.split('\n').map(line => ({ text: line, type: 'output' }));
        break;
      case 'projects':
        replyLines = PROJECTS_TEXT.split('\n').map(line => ({ text: line, type: 'output' }));
        break;
      case 'skills':
        replyLines = SKILLS_TEXT.split('\n').map(line => ({ text: line, type: 'output' }));
        break;
      case 'contact':
        replyLines = CONTACT_TEXT.split('\n').map(line => ({ text: line, type: 'output' }));
        break;
      case 'system':
        const sysInfo = [
          "CYBEROS STABLE DIAGNOSTIC COMPILATION",
          "=====================================",
          `System Time  :: ${new Date().toISOString()}`,
          "Active CPU   :: 8 Cores (Quantum Matrix Emulator v0.9)",
          `Latency      :: ${Math.floor(5 + Math.random() * 8)}ms`,
          "OS Kernel    :: v9.4.2-Darwin-ARM64",
          "Terminal Shell:: secure-zsh",
          "Visual Sync  :: ThreeJS WebGL Core active",
          "Memory Usage :: 42.17MB (React Virtual DOM Allocation)"
        ];
        replyLines = sysInfo.map(line => ({ text: line, type: 'system' }));
        break;
      case 'clear':
        setHistory([]);
        return;
      case 'hack':
        setShowMatrix(true);
        soundManager.playBoot();
        replyLines = [
          { text: "INTRUSION STATUS: CRITICAL ERROR IN FIREWALL KERNEL!", type: 'error' },
          { text: "Root access node established. Initiating cyber matrix override...", type: 'success' }
        ];
        break;
      default:
        isError = true;
        soundManager.playError();
        replyLines = [
          { text: `cyberos: command not found: '${cleanCmd}'. Type 'help' to see standard operations.`, type: 'error' }
        ];
    }

    setHistory([...newHistory, ...replyLines, { text: "", type: 'output' }]);
  };

  return (
    <>
      <AnimatePresence>
        {showMatrix && <MatrixRain onClose={() => setShowMatrix(false)} />}
      </AnimatePresence>

      <div className="cyber-panel rounded-lg w-full flex flex-col font-mono text-left text-xs md:text-sm shadow-xl min-h-[300px] border-cyber-cyan select-text">
        {/* Terminal Header Bar */}
        <div className="flex justify-between items-center bg-black/60 border-b border-cyber-dim px-4 py-2 text-[10px] md:text-xs text-cyber-cyan tracking-wider">
          <div className="flex items-center gap-2 font-mono uppercase">
            <Terminal className="w-3.5 h-3.5 text-cyber-cyan animate-pulse" />
            <span>SHELL_CONSOLE://cyberos_guest</span>
          </div>
          {/* Windows-style console triggers */}
          <div className="flex items-center gap-1.5 pointer-events-auto">
            <span className="w-2.5 h-2.5 rounded-full bg-cyber-pink/40 border border-cyber-pink block" />
            <span className="w-2.5 h-2.5 rounded-full bg-purple-500/40 border border-purple-400 block" />
            <span className="w-2.5 h-2.5 rounded-full bg-cyber-cyan/40 border border-cyber-cyan block" />
          </div>
        </div>

        {/* Terminal Printout Area */}
        <div className="flex-1 p-4 overflow-y-auto max-h-[350px] font-mono leading-relaxed space-y-1.5 scrollbar-none scroll-smooth">
          {history.map((line, idx) => {
            let color = "text-gray-300";
            if (line.type === 'input') color = "text-white font-semibold";
            else if (line.type === 'error') color = "text-cyber-pink font-bold flex items-center gap-1.5";
            else if (line.type === 'success') color = "text-cyber-green font-bold flex items-center gap-1.5";
            else if (line.type === 'system') color = "text-purple-400";
            
            return (
              <div key={idx} className={`${color} font-mono tracking-wide break-words`}>
                {line.type === 'error' && <AlertTriangle className="w-3.5 h-3.5 shrink-0" />}
                {line.type === 'success' && <ShieldCheck className="w-3.5 h-3.5 shrink-0" />}
                {line.text}
              </div>
            );
          })}
          <div ref={bufferEndRef} />
        </div>

        {/* Terminal Input Form */}
        <form onSubmit={handleCommandSubmit} className="border-t border-cyber-dim bg-black/40 px-4 py-2.5 flex items-center gap-1 pointer-events-auto">
          <span className="text-cyber-cyan font-bold font-mono select-none shrink-0 flex items-center">
            guest@cyberos:~$ <ChevronRight className="w-3.5 h-3.5 text-cyber-cyan inline animate-pulse" />
          </span>
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            className="flex-1 bg-transparent text-white focus:outline-none border-none outline-none font-mono tracking-wide py-0"
            placeholder="enter command (e.g. help, about, hack)..."
            autoComplete="off"
            autoCorrect="off"
            autoCapitalize="off"
            spellCheck={false}
          />
        </form>
      </div>
    </>
  );
}
