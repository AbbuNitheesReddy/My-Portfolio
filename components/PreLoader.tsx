/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import GradientText from './GlitchText';

// How long the name holds before the overlay fades away.
const HOLD_MS = 2200;

const PreLoader: React.FC = () => {
  const [show, setShow] = useState(true);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const timer = window.setTimeout(() => setShow(false), HOLD_MS);
    return () => window.clearTimeout(timer);
  }, []);

  // Two-direction entrance (from the reference): top line rises, bottom drops.
  const lineUp = reduceMotion
    ? { initial: { opacity: 0 }, animate: { opacity: 1 } }
    : { initial: { y: 90, opacity: 0 }, animate: { y: 0, opacity: 1 } };
  const lineDown = reduceMotion
    ? { initial: { opacity: 0 }, animate: { opacity: 1 } }
    : { initial: { y: -90, opacity: 0 }, animate: { y: 0, opacity: 1 } };

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          role="status"
          aria-label="Loading portfolio"
          className="fixed inset-0 z-[200] flex items-center justify-center overflow-hidden bg-black"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Scoped copy of the site background (mirrors FluidBackground) */}
          <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
            <div
              className="absolute inset-0 opacity-[0.03]"
              style={{
                backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)',
                backgroundSize: '40px 40px',
              }}
            />
            <div
              className="absolute inset-0 opacity-5 mix-blend-overlay"
              style={{
                backgroundImage:
                  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
              }}
            />
            <div
              className="absolute inset-0"
              style={{
                background:
                  'radial-gradient(ellipse at center, transparent 0%, transparent 55%, rgba(0,0,0,0.85) 100%)',
              }}
            />
          </div>

          {/* Name — same format as the hero <h1> */}
          <div className="relative z-10 px-6 text-center">
            <h1 className="text-[13vw] md:text-[8.5vw] font-bold leading-[0.85] md:leading-[0.8] tracking-tighter">
              <motion.span
                className="block"
                initial={lineUp.initial}
                animate={lineUp.animate}
                transition={{ duration: 0.9, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
              >
                ABBU NITHEES
              </motion.span>
              <motion.span
                className="block"
                initial={lineDown.initial}
                animate={lineDown.animate}
                transition={{ duration: 0.9, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
              >
                <GradientText text="REDDY" className="italic" />
              </motion.span>
            </h1>

            {/* Loading progress accent */}
            <motion.div
              className="mx-auto mt-8 h-px bg-gradient-to-r from-transparent via-blue-500 to-transparent"
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: reduceMotion ? 200 : [0, 200], opacity: 1 }}
              transition={{ duration: reduceMotion ? 0.3 : HOLD_MS / 1000, ease: 'easeInOut' }}
            />
            <motion.div
              className="mt-5 text-[9px] md:text-[10px] font-mono uppercase tracking-[0.5em] text-slate-600"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              Initializing_System
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default PreLoader;
