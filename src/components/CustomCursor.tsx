import { useState, useEffect } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export default function CustomCursor() {
  const [hovered, setHovered] = useState(false);
  const [hidden, setHidden] = useState(true);

  // Raw cursor positions
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  // Spring animations for outer ring damping delay (gives an organic high-end floating lag)
  const springConfig = { damping: 30, stiffness: 220, mass: 0.6 };
  const ringX = useSpring(cursorX, springConfig);
  const ringY = useSpring(cursorY, springConfig);

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      setHidden(false);
    };

    const handleMouseLeave = () => setHidden(true);
    const handleMouseEnter = () => setHidden(false);

    // Track when hovering over clickable components
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName === 'BUTTON' ||
        target.tagName === 'A' ||
        target.closest('.cyber-btn') ||
        target.closest('.clickable') ||
        target.closest('input') ||
        target.closest('textarea')
      ) {
        setHovered(true);
      } else {
        setHovered(false);
      }
    };

    window.addEventListener('mousemove', moveCursor);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);
    window.addEventListener('mouseover', handleMouseOver);

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, [cursorX, cursorY]);

  if (hidden) return null;

  return (
    <>
      {/* Outer Spring-Dampened Glow Ring */}
      <motion.div
        className="custom-cursor-elem fixed top-0 left-0 w-8 h-8 rounded-full border border-cyber-cyan pointer-events-none z-[999999] flex items-center justify-center"
        style={{
          x: ringX,
          y: ringY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
          width: hovered ? 46 : 28,
          height: hovered ? 46 : 28,
          borderColor: hovered ? '#ff0055' : '#00f0ff',
          boxShadow: hovered 
            ? '0 0 15px rgba(255, 0, 85, 0.6), inset 0 0 10px rgba(255, 0, 85, 0.4)' 
            : '0 0 10px rgba(0, 240, 255, 0.3), inset 0 0 6px rgba(0, 240, 255, 0.2)',
          rotate: hovered ? 90 : 0
        }}
        transition={{ type: 'spring', stiffness: 300, damping: 25 }}
      >
        {/* Futuristic reticle ticks inside the outer ring */}
        <span className={`absolute w-1.5 h-0.5 ${hovered ? 'bg-cyber-pink' : 'bg-cyber-cyan'} top-0`} />
        <span className={`absolute w-1.5 h-0.5 ${hovered ? 'bg-cyber-pink' : 'bg-cyber-cyan'} bottom-0`} />
        <span className={`absolute w-0.5 h-1.5 ${hovered ? 'bg-cyber-pink' : 'bg-cyber-cyan'} left-0`} />
        <span className={`absolute w-0.5 h-1.5 ${hovered ? 'bg-cyber-pink' : 'bg-cyber-cyan'} right-0`} />
      </motion.div>

      {/* Inner Immediate Core Dot */}
      <motion.div
        className="custom-cursor-elem fixed top-0 left-0 w-1.5 h-1.5 rounded-full pointer-events-none z-[999999]"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: '-50%',
          translateY: '-50%',
          backgroundColor: hovered ? '#ff0055' : '#00f0ff',
          boxShadow: hovered 
            ? '0 0 8px rgba(255, 0, 85, 1)' 
            : '0 0 8px rgba(0, 240, 255, 1)',
        }}
      />
    </>
  );
}
