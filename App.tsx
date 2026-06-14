
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React, { useState } from 'react';
import { motion, AnimatePresence, useScroll, useSpring } from 'framer-motion';
import { Terminal, Linkedin, Github, Mail, Download } from 'lucide-react';
import FluidBackground from './components/FluidBackground';
import Hero3D from './components/Hero3D';
import CustomCursor from './components/CustomCursor';
import DeveloperProfile from './components/DeveloperProfile';
import CLITerminal from './components/CLITerminal';
import PreLoader from './components/PreLoader';
import { ReactLenis } from 'lenis/react';

// TODO: confirm GitHub URL (placeholder below from git config + best guess).
const SOCIAL_LINKS = [
  { name: 'LinkedIn', icon: Linkedin, url: 'https://www.linkedin.com/in/abbunitheesreddy/', label: "NITHEES' LINKEDIN" },
  { name: 'GitHub', icon: Github, url: 'https://github.com/AbbuNitheesReddy', label: "NITHEES' GITHUB" },
  { name: 'Email', icon: Mail, url: 'mailto:nithish.7098@gmail.com', label: "NITHEES' EMAIL" },
];

const App: React.FC = () => {
  const [isCLIOpen, setIsCLIOpen] = useState(false);
  const [isExploreOpen, setIsExploreOpen] = useState(false);

  // Scroll Progress Logic
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <ReactLenis root>
      <div className="relative min-h-screen bg-black text-slate-200 selection:bg-white selection:text-black cursor-auto md:cursor-none overflow-x-hidden">
        <PreLoader />
        <CustomCursor />
        <FluidBackground />
        <Hero3D />

        {/* Fixed Scroll Progress Bar */}
        <motion.div
          className="fixed top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-blue-600 via-blue-400 to-white z-[110] origin-left"
          style={{ scaleX }}
        />

        {/* Dynamic Header */}
        <nav className="fixed top-0 left-0 right-0 z-[60] flex items-center justify-between px-6 md:px-12 py-5 md:py-8">

          {/* Left: Branding */}
          <div className="z-50 font-heading text-sm font-black tracking-[0.2em] uppercase text-white min-w-[80px] md:min-w-[100px]">
            NITHEES.
          </div>

          {/* Center: Explore Toggle & Navigation Links */}
          <div className="absolute left-1/2 -translate-x-1/2 z-50 flex items-center gap-4 md:gap-8">
            <AnimatePresence>
              {isExploreOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  className="absolute top-full left-1/2 -translate-x-1/2 mt-3 flex flex-col items-center gap-4 rounded-2xl border border-white/10 bg-black/95 backdrop-blur-xl px-6 py-5 shadow-2xl md:static md:translate-x-0 md:mt-0 md:flex-row md:gap-6 md:rounded-none md:border-0 md:bg-transparent md:backdrop-blur-none md:px-0 md:py-0 md:shadow-none text-[11px] md:text-[10px] font-bold tracking-[0.2em] uppercase text-slate-400 whitespace-nowrap"
                >
                  {['About', 'Skills', 'Projects', 'Experience', 'Contact'].map((item) => (
                    <button
                      key={item}
                      onClick={() => { scrollToSection(item.toLowerCase()); setIsExploreOpen(false); }}
                      className="hover:text-white transition-colors cursor-pointer bg-transparent border-none border-b border-transparent hover:border-white/20 pb-1"
                      data-hover="true"
                    >
                      {item}
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>

            <button
              onClick={() => setIsExploreOpen(!isExploreOpen)}
              className={`font-heading text-[10px] font-black tracking-[0.3em] md:tracking-[0.6em] uppercase transition-all duration-500 py-2.5 px-5 md:px-8 border border-transparent rounded-full whitespace-nowrap ${isExploreOpen ? 'bg-white text-black' : 'text-white/40 hover:text-white hover:bg-white/5'}`}
              data-hover="true"
            >
              {isExploreOpen ? 'CLOSE' : 'EXPLORE'}
            </button>
          </div>

          {/* Right: Terminal Icon */}
          <div className="z-50 flex items-center gap-4">
            <button
              onClick={() => setIsCLIOpen(!isCLIOpen)}
              className="group flex items-center justify-center bg-white/5 backdrop-blur-xl border border-white/10 w-10 h-10 md:w-12 md:h-12 rounded-full hover:bg-white hover:text-black transition-all duration-300"
              data-hover="true"
              aria-label="Terminal CLI"
            >
              <Terminal className="w-5 h-5" />
            </button>
          </div>
        </nav>

        <CLITerminal isOpen={isCLIOpen} setIsOpen={setIsCLIOpen} />

        {/* Floating Resume Download (bottom-left) */}
        <a
          href="/AbbuNitheesReddy_Resume.pdf"
          download="AbbuNitheesReddy_Resume.pdf"
          className="group fixed bottom-6 right-6 z-[60] flex items-center gap-3 bg-white/5 backdrop-blur-xl border border-white/10 rounded-full pl-4 pr-5 py-3 text-white hover:bg-white hover:text-black transition-all duration-300"
          data-hover="true"
          aria-label="Download resume PDF"
        >
          <Download className="w-5 h-5 shrink-0" />
          <span className="text-[10px] font-mono font-bold tracking-[0.3em] uppercase">Resume</span>
        </a>

        <main>
          <DeveloperProfile />
        </main>

        <footer id="contact" className="relative z-10 border-t border-white/5 pt-32 pb-16 bg-black">
          <div className="max-w-7xl mx-auto px-6 md:px-12">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-20 mb-20 md:mb-32">
              <div className="col-span-1 md:col-span-7 space-y-12">
                <h2 className="text-4xl md:text-8xl font-heading font-bold text-white tracking-tighter leading-tight uppercase">
                  THINK. TRY. FAIL. <br /> <span className="text-slate-800 italic">LEARN OUT LOUD.</span>
                </h2>
                <div className="flex flex-col gap-4">
                  <span className="text-[10px] font-mono text-slate-600 uppercase tracking-[0.4em]">Abbu Nithees Reddy // AI / ML Engineer // 2025</span>
                </div>
              </div>

              <div className="col-span-1 md:col-span-5">
                <h4 className="text-[10px] font-mono font-bold uppercase tracking-[0.5em] text-slate-500 mb-12 border-b border-white/5 pb-4">Connect_Systems</h4>
                <ul className="flex flex-col gap-8">
                  {SOCIAL_LINKS.map((link) => (
                    <li key={link.name}>
                      <motion.a
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group flex items-center gap-6 text-slate-400 hover:text-white transition-all duration-300 relative"
                        data-hover="true"
                      >
                        <div className="relative p-4 rounded-xl bg-white/5 group-hover:bg-blue-600/10 group-hover:text-blue-500 transition-all duration-500 border border-white/10 group-hover:border-blue-500/30 overflow-hidden">
                          <link.icon className="w-6 h-6 relative z-10" />
                          <motion.div
                            className="absolute inset-0 bg-blue-500 opacity-0 group-hover:opacity-10 blur-xl"
                            initial={false}
                            animate={{ scale: [1, 1.2, 1] }}
                            transition={{ duration: 2, repeat: Infinity }}
                          />
                        </div>
                        <div className="flex flex-col">
                          <span className="text-sm font-mono uppercase tracking-[0.2em] group-hover:translate-x-2 transition-transform duration-500">{link.name}</span>
                          <div className="overflow-hidden h-4">
                            <motion.span
                              initial={{ y: 20, opacity: 0 }}
                              whileHover={{ y: 0, opacity: 1 }}
                              className="text-[10px] font-mono text-blue-500 uppercase tracking-widest block"
                            >
                              {link.label}
                            </motion.span>
                          </div>
                        </div>

                        {/* Geometric accent on hover */}
                        <motion.div
                          className="absolute left-[-20px] top-1/2 -translate-y-1/2 w-1 h-8 bg-blue-500 opacity-0 group-hover:opacity-100 transition-all duration-500"
                          initial={{ height: 0 }}
                          whileHover={{ height: 32 }}
                        />
                      </motion.a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="flex flex-col md:flex-row justify-between items-center gap-8 border-t border-white/5 pt-16">
              <div className="flex gap-4 items-center">
                <div className="w-2 h-2 rounded-full bg-blue-600 animate-pulse shadow-[0_0_10px_#2563eb]" />
                <div className="text-[9px] font-mono uppercase tracking-[0.5em] text-slate-700">
                  SYSTEM_STATUS: STABLE_NITHEES_V1.0.0
                </div>
              </div>
              <div className="text-[9px] font-mono uppercase tracking-[0.5em] text-slate-800">
                © 2025 // ABBU NITHEES REDDY // BUILT_WITH_PRECISION
              </div>
            </div>
          </div>
        </footer>
      </div>
    </ReactLenis>
  );
};

export default App;
