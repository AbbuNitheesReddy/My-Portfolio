
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Terminal } from 'lucide-react';

interface CLITerminalProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

const CLITerminal: React.FC<CLITerminalProps> = ({ isOpen, setIsOpen }) => {
  const [history, setHistory] = useState<string[]>(['System authenticated. Type "help" to begin exploration.']);
  const [input, setInput] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [history]);

  const handleCommand = (e: React.FormEvent) => {
    e.preventDefault();
    const cmd = input.trim().toLowerCase();
    if (!cmd) return;

    let response = '';
    switch (cmd) {
      case 'help':
        response = [
          'Available commands:',
          '  about       — who I am',
          '  skills      — technical arsenal',
          '  projects    — what I have built',
          '  experience  — work history',
          '  contact     — how to reach me',
          '  resume      — download my resume (PDF)',
          '  philosophy  — how I build',
          '  clear       — wipe the screen',
          '  exit        — close the terminal',
        ].join('\n');
        break;
      case 'about':
        response = [
          'Abbu Nithees Reddy — AI / Machine Learning Engineer',
          '',
          'I build production LLM & RAG systems: semantic retrieval (FAISS),',
          'multi-agent workflows, and fine-tuned transformers served on FastAPI.',
          'Shipped a RAG platform validated at 89% accuracy by 10 IIT faculty reviewers.',
        ].join('\n');
        break;
      case 'skills':
        response = [
          'AI / ML          : Machine Learning, Deep Learning, RAG Systems, Multi-Agent',
          'NLP & GenAI      : Hugging Face, LangChain, BERT / RoBERTa, FAISS / Vector DBs',
          'Languages / FW   : Python, PyTorch, TensorFlow, Scikit-learn',
          'Serving / Deploy : FastAPI, Docker, Ollama, Git / Linux',
        ].join('\n');
        break;
      case 'projects':
        response = [
          '01  DocIntel Agent             — agentic RAG research assistant (LangChain · ChromaDB)',
          '02  Production RAG Pipeline     — grounded RAG @ 89% accuracy, <4s streaming (FAISS · Qwen3)',
          '03  Multi-Agent AI Workflows   — exam-MCQ + image-to-solution agents (Qwen3-VL · FastAPI)',
          '04  JobGenie                   — AI hiring platform, -70% screening time (BERT · GNN · OCR)',
          '05  Email Extraction & Class.  — RoBERTa categorization, -60% manual effort (OCR · NLP)',
        ].join('\n');
        break;
      case 'experience':
        response = [
          'Feb 2026 – Present  AI & ML Engineer            Senexxel Corporation (Evonsys Group)',
          '                   Production RAG for RIZEE · multi-agent workflows · FastAPI microservices',
          '',
          'Jan 2025 – Jan 2026 Junior AI & ML Engineer     Stag Innovations Pvt. Ltd.',
          '                   JobGenie hiring platform · RoBERTa email automation · ML pipelines',
          '',
          'Jul 2024 – Dec 2024 AI & ML Intern              Stag Innovations Pvt. Ltd.',
          '                   ML-based Network Intrusion Detection System (NIDS) + anomaly detection',
        ].join('\n');
        break;
      case 'contact':
        response = [
          'Email    : nithish.7098@gmail.com',
          'GitHub   : github.com/AbbuNitheesReddy',
          'LinkedIn : linkedin.com/in/abbunitheesreddy',
          '',
          'Open to AI / ML roles and collaborations.',
        ].join('\n');
        break;
      case 'resume': {
        const a = document.createElement('a');
        a.href = '/AbbuNitheesReddy_Resume.pdf';
        a.download = 'AbbuNitheesReddy_Resume.pdf';
        document.body.appendChild(a);
        a.click();
        a.remove();
        response = 'Initiating download: AbbuNitheesReddy_Resume.pdf';
        break;
      }
      case 'philosophy':
        response = 'Ship production-grade AI. Retrieve before you generate, ground every answer, and measure accuracy — a RAG tutor validated at 89% by 10 IIT faculty beats a clever demo.';
        break;
      case 'clear':
        setHistory([]);
        setInput('');
        return;
      case 'exit':
        setIsOpen(false);
        setInput('');
        return;
      default:
        response = `Command not recognized: "${cmd}". Type "help" for a list of system operations.`;
    }

    setHistory(prev => [...prev, `> ${input}`, response]);
    setInput('');
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.98 }}
          className="fixed inset-0 z-[110] bg-black/95 backdrop-blur-2xl flex items-center justify-center p-4 md:p-12"
          onClick={() => setIsOpen(false)}
        >
          <motion.div
            className="w-full max-w-4xl h-full max-h-[600px] bg-black border border-white/10 rounded-xl overflow-hidden shadow-[0_0_100px_rgba(255,255,255,0.05)] flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="bg-white/5 px-6 py-3 border-b border-white/10 flex justify-between items-center">
              <div className="flex items-center gap-3">
                <Terminal className="w-4 h-4 text-blue-500" />
                <span className="text-[10px] font-mono font-bold tracking-[0.3em] uppercase text-white">NITHEES_SYSTEM_v1.0</span>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="text-slate-500 hover:text-white p-1 transition-colors"
                data-hover="true"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* CLI Area */}
            <div
              ref={containerRef}
              className="flex-1 p-5 md:p-8 font-mono text-xs md:text-sm text-slate-300 overflow-y-auto overflow-x-hidden space-y-4 scrollbar-hide"
              onClick={() => inputRef.current?.focus()}
            >
              <div className="text-blue-500 mb-8">
                <pre className="leading-tight text-[8px] sm:text-[10px] md:text-xs">
{`
 _   _ ___ _____ _   _ _____ _____ ____
| \\ | |_ _|_   _| | | | ____| ____/ ___|
|  \\| || |  | | | |_| |  _| |  _| \\___ \\
| |\\  || |  | | |  _  | |___| |___ ___) |
|_| \\_|___| |_| |_| |_|_____|_____|____/
                                  `}
                </pre>
                <div className="mt-4 uppercase tracking-[0.5em] text-[10px]">AI / ML Engineer Interface Enabled</div>
              </div>

              {history.map((line, i) => (
                <div
                  key={i}
                  className={`whitespace-pre-wrap break-words ${line.startsWith('>') ? 'text-white' : 'text-slate-400'}`}
                >
                  {line}
                </div>
              ))}

              <form onSubmit={handleCommand} className="flex gap-3">
                <span className="text-blue-500">guest@nithees:~$</span>
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  className="bg-transparent border-none outline-none flex-1 text-white lowercase"
                  autoFocus
                />
              </form>
            </div>

            {/* Status Bar */}
            <div className="bg-white/5 px-6 py-2 border-t border-white/10 flex justify-between items-center text-[9px] font-mono text-slate-600 uppercase tracking-widest">
               <span>Status: Active_Session</span>
               <span>Encoding: UTF-8</span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CLITerminal;
