
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React, { useEffect, useState } from 'react';
import { motion, useSpring, useMotionValue } from 'framer-motion';

const CustomCursor: React.FC = () => {
  const [isHovering, setIsHovering] = useState(false);
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);
  
  const springConfig = { damping: 30, stiffness: 500, mass: 0.1 }; 
  const x = useSpring(mouseX, springConfig);
  const y = useSpring(mouseY, springConfig);

  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      const target = e.target as HTMLElement;
      setIsHovering(!!(target.closest('button') || target.closest('a') || target.closest('[data-hover="true"]')));
    };
    window.addEventListener('mousemove', updateMousePosition, { passive: true });
    return () => window.removeEventListener('mousemove', updateMousePosition);
  }, [mouseX, mouseY]);

  return (
    <motion.div
      className="fixed top-0 left-0 z-[9999] pointer-events-none mix-blend-difference flex items-center justify-center hidden md:flex"
      style={{ x, y, translateX: '-50%', translateY: '-50%' }}
    >
      {/* Outer Circle (Scanner Mode) */}
      <motion.div
        className="relative border border-white flex items-center justify-center overflow-hidden"
        animate={{
          width: isHovering ? 90 : 36,
          height: isHovering ? 90 : 36,
          borderRadius: "50%",
          rotate: isHovering ? 90 : 0,
          borderWidth: isHovering ? 1 : 1.5
        }}
        transition={{ type: "spring", stiffness: 400, damping: 32 }}
      >
        <motion.span 
          className="text-[10px] font-mono text-white tracking-[0.3em] font-black"
          animate={{ opacity: isHovering ? 1 : 0 }}
        >
          VIEW
        </motion.span>
      </motion.div>
      
      {/* Center Reticle Dot */}
      <motion.div 
        className="absolute w-1.5 h-1.5 bg-white rounded-full"
        animate={{ 
          opacity: isHovering ? 0 : 1,
          scale: isHovering ? 0 : 1
        }}
      />
    </motion.div>
  );
};

export default CustomCursor;
