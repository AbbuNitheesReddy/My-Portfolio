
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React from 'react';
import { motion, useInView } from 'framer-motion';
import {
  Cpu, Code2, Zap, Rocket, Mail, CheckCircle2, GitBranch, Server,
  BrainCircuit, Workflow, Boxes, Languages,
  Database, Github, Briefcase,
} from 'lucide-react';
import GradientText from './GlitchText';
import {
  SiPython, SiPytorch, SiTensorflow, SiScikitlearn,
  SiHuggingface, SiLangchain, SiFastapi, SiDocker, SiOllama, SiGit, SiKeras,
} from 'react-icons/si';
import ArchitectureModal from './ArchitectureModal';
import { ARCHITECTURES, type ArchitectureSpec } from '../data/architectures';
import { useHasHover } from '../hooks/useHasHover';

const SKILL_CATEGORIES = [
  {
    title: 'AI / Machine Learning',
    icon: BrainCircuit,
    skills: [
      { name: 'Machine Learning', level: 90, color: '#2563eb', Logo: BrainCircuit },
      { name: 'Deep Learning', level: 85, color: '#d00000', Logo: SiKeras },
      { name: 'RAG Systems', level: 92, color: '#22c55e', Logo: Database },
      { name: 'Multi-Agent', level: 82, color: '#a855f7', Logo: Workflow },
    ],
  },
  {
    title: 'NLP & GenAI',
    icon: Languages,
    skills: [
      { name: 'Hugging Face', level: 88, color: '#ffd21e', Logo: SiHuggingface },
      { name: 'LangChain', level: 85, color: '#1c3c3c', Logo: SiLangchain },
      { name: 'BERT / RoBERTa', level: 84, color: '#3b82f6', Logo: Languages },
      { name: 'FAISS / Vector DB', level: 86, color: '#06b6d4', Logo: Boxes },
    ],
  },
  {
    title: 'Programming & Frameworks',
    icon: Code2,
    skills: [
      { name: 'Python', level: 95, color: '#3776ab', Logo: SiPython },
      { name: 'PyTorch', level: 82, color: '#ee4c2c', Logo: SiPytorch },
      { name: 'TensorFlow', level: 78, color: '#ff6f00', Logo: SiTensorflow },
      { name: 'Scikit-learn', level: 88, color: '#f7931e', Logo: SiScikitlearn },
    ],
  },
  {
    title: 'Serving & Deployment',
    icon: Server,
    skills: [
      { name: 'FastAPI', level: 90, color: '#009688', Logo: SiFastapi },
      { name: 'Docker', level: 80, color: '#2496ed', Logo: SiDocker },
      { name: 'Ollama', level: 85, color: '#ffffff', Logo: SiOllama },
      { name: 'Git / Linux', level: 88, color: '#f05032', Logo: SiGit },
    ],
  },
];

interface Project {
  title: string;
  desc: string;
  tags: string[];
  status: string;
  architectureId: keyof typeof ARCHITECTURES;
  githubUrl?: string;
}

const PROJECTS: Project[] = [
  {
    title: 'DocIntel Agent - Agentic RAG Research Assistant',
    desc: 'A research assistant which is bounded agentic loop that retrieves evidence from a vector store, pulls in live web sources when context is thin, and returns confidence-graded answers.',
    tags: ['FastAPI', 'LangChain', 'ChromaDB', 'Ollama · Qwen3', 'SentenceTransformers'],
    status: '01',
    architectureId: 'docintel',
  },
  {
    title: 'RAG-Based Learning Assistant [RIZEE Platform]',
    desc: 'A retrieval-augmented generation system for the RIZEE EdTech platform that grounds answers in 700+ subject materials, achieving 89% accuracy with sub-4-second streaming responses.',
    tags: ['FastAPI', 'FAISS', 'SentenceTransformers', 'Ollama · Qwen3'],
    status: '02',
    architectureId: 'rag-pipeline',
  },
  {
    title: 'Multi-Agent AI System for EdTech Platform',
    desc: 'Developed a multi-agent AI system that automates exam-calibrated questions and solves problems from images using LLMs and computer vision techniques, served behind a single routed API.',
    tags: ['Qwen3', 'Qwen3-VL', 'Ollama', 'FastAPI'],
    status: '03',
    architectureId: 'multi-agent',
  },
  {
    title: 'JobGenie - AI Hiring Intelligence Platform',
    desc: 'An AI hiring platform that screens resumes, candidate profiling and Job matching using OCR and transformer NLP models, cutting recruiter screening time by 70% at 85% match accuracy.',
    tags: ['Python', 'BERT', 'GNN', 'OCR', 'AWS'],
    status: '04',
    architectureId: 'jobgenie',
  },
  {
    title: 'Email Extraction & Classification',
    desc: 'A pipeline that auto-categorizes and prioritizes recruiter emails using fine-tuned RoBERTa classifiers, reducing manual effort by 60%.',
    tags: ['Python', 'RoBERTa', 'OCR', 'NLP'],
    status: '05',
    architectureId: 'email-extraction',
  },
];

interface Experience {
  role: string;
  org: string;
  location: string;
  period: string;
  note?: string;
  bullets: string[];
  technologies: string[];
}

const EXPERIENCE: Experience[] = [
  {
    role: 'AI & Machine Learning Engineer',
    org: 'Senexxel Corporation India (Evonsys Group)',
    location: 'On-Site',
    period: 'Feb 2026 – Present',
    note: 'Joined the RIZEE RAG platform as a Stag Innovations contractor (Nov 2025 – Jan 2026); converted to direct hire in Feb 2026.',
    bullets: [
      'Built a production Retrieval-Augmented Generation pipeline for RIZEE (MyLearningPlus) reaching 89% answer accuracy and groundedness — validated by 10 IIT faculty reviewers — ingesting 700+ subject materials into metadata-tagged chunks, embedded with SentenceTransformers and indexed in per-group FAISS for top-4 semantic retrieval.',
      'Cut time-to-first-token to under 4 seconds by streaming Qwen3 (Ollama) responses token-by-token and suppressing chain-of-thought (<think>) leakage for clean output.',
      'Engineered query routing and query-type detection that switch between question-bank and study-material indexes and between short and detailed 8-section answer formats.',
      'Built multi-agent AI workflows: a concept-aware MCQ generation agent with JEE Mains/Advanced difficulty calibration and a Qwen3-VL image-to-solution agent chaining vision OCR to an LLM solver.',
      'Automated exam-paper ingestion with a Mathpix OCR → LaTeX→MathML → structured-JSON pipeline feeding a classifier stack (chapter, multi-label topic, concept, difficulty, time-to-solve) on LogisticRegression / LinearSVC and a BERT multitask head.',
      'Deployed inference services as FastAPI microservices with asyncio concurrency guards on GPU-bound LLM calls.',
    ],
    technologies: ['RAG', 'FAISS', 'SentenceTransformers', 'Qwen3 · Ollama', 'FastAPI', 'BERT', 'Mathpix OCR'],
  },
  {
    role: 'Junior AI & Machine Learning Engineer',
    org: 'Stag Innovations Pvt. Ltd.',
    location: 'On-Site',
    period: 'Jan 2025 – Jan 2026',
    bullets: [
      'Worked on client-based AI projects, contributing to the development of enterprise AI solutions.',
      'Reduced recruiter screening time by 70% and reached 85% job-match accuracy by building an AI hiring-intelligence platform with OCR and transformer-based NLP pipelines.',
      'Cut manual email-processing effort by 60% by fine-tuning RoBERTa classifiers to automate recruiter-email categorization and prioritization.',
      'Delivered production-ready ML by designing end-to-end pipelines spanning preprocessing, training, evaluation, and API deployment for BERT / RoBERTa classification and information-extraction tasks.',
    ],
    technologies: ['Python', 'BERT', 'RoBERTa', 'OCR', 'NLP', 'FastAPI'],
  },
  {
    role: 'AI & Machine Learning Intern',
    org: 'Stag Innovations Pvt. Ltd.',
    location: 'Hybrid',
    period: 'Jul 2024 – Dec 2024',
    bullets: [
      'Built an ML-based Network Intrusion Detection System (NIDS) using supervised and unsupervised learning to detect port scans, DDoS patterns, and anomalous network behavior in real time.',
      'Designed feature-extraction and anomaly-detection pipelines to identify malware activity and brute-force attempts, improving early threat detection.',
    ],
    technologies: ['Python', 'Scikit-learn', 'Anomaly Detection', 'NIDS'],
  },
];

const MARQUEE_ITEMS = [
  'RAG', 'FAISS', 'LangChain', 'Qwen3', 'FastAPI',
  'BERT', 'RoBERTa', 'ChromaDB', 'Ollama', 'PyTorch',
];

const ExperienceCard: React.FC<{ exp: Experience; index: number }> = ({ exp, index }) => {
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: false, margin: '-50px', amount: 0.2 });
  const hasHover = useHasHover();

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={
        isInView
          ? {
              opacity: 1,
              y: 0,
              // Touch has no hover — briefly raise the card's tint/border as it
              // settles into view so the "active" look still reads on mobile.
              ...(hasHover
                ? {}
                : {
                    backgroundColor: ['rgba(255,255,255,0.02)', 'rgba(255,255,255,0.05)', 'rgba(255,255,255,0.02)'],
                    borderColor: ['rgba(255,255,255,0.10)', 'rgba(255,255,255,0.22)', 'rgba(255,255,255,0.10)'],
                  }),
            }
          : { opacity: 0, y: 40 }
      }
      transition={{ duration: 0.6, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
      whileTap={hasHover ? undefined : { scale: 0.99 }}
      className="group relative overflow-hidden border border-white/10 rounded-3xl md:rounded-[2.5rem] bg-white/[0.02] backdrop-blur-3xl p-7 sm:p-9 md:p-12 transition-colors duration-500 hover:bg-white/[0.04] hover:border-white/20"
    >
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-5">
        <div className="min-w-0">
          <h4 className="text-xl md:text-2xl font-bold text-white tracking-tight mb-2">{exp.role}</h4>
          <div className="flex flex-wrap items-center gap-3">
            <span className="text-[10px] font-mono text-blue-500 uppercase tracking-[0.3em]">{exp.org}</span>
            <span className="text-[9px] font-mono text-slate-500 uppercase tracking-[0.2em] px-2.5 py-0.5 rounded-full border border-white/10 bg-white/[0.03]">
              {exp.location}
            </span>
          </div>
        </div>
        <span className="text-[10px] font-mono text-slate-500 uppercase tracking-[0.3em] shrink-0 sm:mt-1">{exp.period}</span>
      </div>

      {exp.note && (
        <p className="text-xs text-slate-500 font-light italic leading-relaxed mb-5 border-l-2 border-blue-600/40 pl-4">
          {exp.note}
        </p>
      )}

      {/* Achievements */}
      <ul className="space-y-2.5">
        {exp.bullets.map((point, pi) => (
          <li
            key={pi}
            className="flex items-start gap-3 text-sm md:text-base text-slate-400 font-light leading-relaxed"
          >
            <span className="mt-2 w-1.5 h-1.5 rounded-full bg-blue-500/70 shrink-0" aria-hidden="true" />
            <span>{point}</span>
          </li>
        ))}
      </ul>

      {/* Tech badges */}
      <div className="flex flex-wrap gap-2.5 mt-6">
        {exp.technologies.map((tech, ti) => (
          <span
            key={ti}
            data-hover="true"
            className="text-[9px] font-mono uppercase tracking-[0.2em] px-3 py-1.5 rounded-lg border border-blue-500/20 bg-blue-600/10 text-slate-300 hover:border-blue-500/40 hover:text-white transition-colors"
          >
            {tech}
          </span>
        ))}
      </div>
    </motion.div>
  );
};

const DeveloperProfile: React.FC = () => {
  const [email, setEmail] = React.useState('');
  const [subscribed, setSubscribed] = React.useState(false);
  const [photoError, setPhotoError] = React.useState(false);
  const [activeArch, setActiveArch] = React.useState<ArchitectureSpec | null>(null);
  const hasHover = useHasHover();

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      const subject = encodeURIComponent('Portfolio contact');
      const body = encodeURIComponent(`Hi Nithees,\n\n(from ${email})\n\n`);
      window.location.href = `mailto:nithish.7098@gmail.com?subject=${subject}&body=${body}`;
      setSubscribed(true);
      setTimeout(() => {
        setSubscribed(false);
        setEmail('');
      }, 3000);
    }
  };

  const openArch = (id: keyof typeof ARCHITECTURES) => setActiveArch(ARCHITECTURES[id]);

  return (
    <div className="relative z-10 pt-32 md:pt-48 pb-24 px-6 md:px-12 max-w-7xl mx-auto">

      {/* About / Hero Section */}
      <div id="about" className="mb-24 md:mb-32">
        <div className="flex flex-col md:flex-row gap-10 md:gap-20 mb-12 md:mb-16 items-center md:items-center">
          {/* Profile Photo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-56 h-56 md:w-[400px] md:h-[400px] group shrink-0"
          >
            <div className="absolute inset-[-30%] bg-blue-600/5 rounded-full blur-[120px] group-hover:bg-blue-500/20 transition-all duration-1000 animate-pulse" />

            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="absolute inset-[-10%] border-2 border-dashed border-white/5 rounded-full group-hover:border-blue-500/20 transition-all duration-700"
            />

            <div className="relative w-full h-full rounded-full border-4 border-white/10 overflow-hidden bg-black transition-all duration-1000 group-hover:border-white/40 group-hover:scale-[1.02] group-hover:shadow-[0_0_80px_rgba(37,99,235,0.2)]">
              {!photoError ? (
                <motion.img
                  src="/nithees.png"
                  alt="Abbu Nithees Reddy"
                  onError={() => setPhotoError(true)}
                  className="w-full h-full object-cover grayscale contrast-125 brightness-90 group-hover:grayscale-0 group-hover:brightness-110 group-hover:scale-105 transition-all duration-1000"
                />
              ) : (
                // Monogram fallback until /public/nithees.png is added.
                <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-blue-600/10 to-black">
                  <span className="font-heading text-[8rem] md:text-[12rem] font-black text-blue-500/80 select-none">N</span>
                </div>
              )}
            </div>
          </motion.div>

          <div className="flex-1 w-full">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1 }}
              className="text-[10px] md:text-xs font-mono text-blue-500 uppercase tracking-[0.3em] md:tracking-[0.5em] mb-6 flex items-center justify-center md:justify-start gap-4"
            >
              <div className="h-px w-10 md:w-16 bg-blue-600 shadow-[0_0_10px_#2563eb]" />
              AI / ML Engineer // LLM Systems // RAG
            </motion.div>

            <h1 className="text-[13vw] md:text-[8.5vw] font-bold leading-[0.85] md:leading-[0.8] tracking-tighter text-center md:text-left">
              ABBU NITHEES <br />
              <GradientText text="REDDY" className="italic" />
            </h1>
          </div>
        </div>

        {/* Enhanced Marquee Section */}
        <div className="w-full overflow-hidden border-y border-white/5 py-8 md:py-12 mb-16 md:mb-24 relative bg-white/[0.01]">
          <motion.div
            className="flex whitespace-nowrap text-[10px] font-mono font-bold tracking-[0.4em] uppercase text-slate-600"
            animate={{ x: [0, -2000] }}
            transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          >
            {[...Array(5)].map((_, i) => (
              <React.Fragment key={i}>
                {MARQUEE_ITEMS.map((item, idx) => (
                  <span key={idx} className="flex items-center gap-10 mr-10 group">
                    <span className="text-white/10 group-hover:text-blue-500 transition-colors duration-300">CORE_MODULE:</span> {item}
                    {idx % 2 === 0 ? <Zap className="w-4 h-4 text-blue-600" /> : <Rocket className="w-4 h-4 text-slate-700" />}
                  </span>
                ))}
              </React.Fragment>
            ))}
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-20 items-start">
          <div className="space-y-8">
            <p className="text-2xl md:text-4xl text-slate-400 font-light leading-snug max-w-2xl">
              Exploring how <span className="text-white font-normal underline decoration-blue-500/30">technology</span>, <span className="text-white font-normal underline decoration-blue-500/30">products</span>, and <span className="text-white font-normal underline decoration-blue-500/30">money</span> shape the modern world.
            </p>
          </div>
          <div className="flex flex-col gap-6 md:gap-8 text-[10px] font-mono uppercase tracking-[0.25em] md:tracking-[0.3em] text-slate-600">
            <div className="flex flex-col sm:flex-row sm:justify-between gap-1.5 sm:gap-4 border-b border-white/5 pb-4">
              <span className="shrink-0">Headline</span>
              <span className="text-white sm:text-right">RAG @ 89% accuracy · 10 IIT reviewers</span>
            </div>
            <div className="flex flex-col sm:flex-row sm:justify-between gap-1.5 sm:gap-4 border-b border-white/5 pb-4">
              <span className="shrink-0">Focus</span>
              <span className="text-white sm:text-right">LLMs // RAG // FastAPI</span>
            </div>
          </div>
        </div>
      </div>

      {/* SKILLS SECTION */}
      <section id="skills" className="mb-32 md:mb-48">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 md:mb-20 gap-6 md:gap-8">
          <div>
            <h3 className="text-xs font-bold uppercase tracking-[0.4em] text-slate-500 mb-6 flex items-center gap-3">
              <Cpu className="w-4 h-4 text-blue-600" /> Technical Arsenal
            </h3>
            <h2 className="text-4xl md:text-6xl font-bold tracking-tighter text-white uppercase">SKILL_MODULES</h2>
          </div>
          <div className="text-[10px] font-mono text-slate-600 uppercase tracking-widest bg-white/[0.03] border border-white/5 px-4 py-2 rounded-full">
            Total_Knowledge_Mapped: {SKILL_CATEGORIES.reduce((acc, cat) => acc + cat.skills.length, 0)}_Modules
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {SKILL_CATEGORIES.map((category, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{
                duration: 1.2,
                delay: idx * 0.1,
                ease: [0.16, 1, 0.3, 1]
              }}
              className="bg-white/[0.02] border border-white/5 rounded-3xl p-8 hover:bg-white/[0.04] hover:border-white/10 transition-all duration-500 group relative overflow-hidden"
            >
              {/* Circuit Grid Decorative Overlay */}
              <div className="absolute inset-0 opacity-[0.03] pointer-events-none group-hover:opacity-[0.05] transition-opacity duration-500"
                style={{
                  backgroundImage: 'linear-gradient(rgba(37,99,235,0.2) 1px, transparent 1px), linear-gradient(90deg, rgba(37,99,235,0.2) 1px, transparent 1px)',
                  backgroundSize: '20px 20px'
                }}
              />

              <div className="flex items-center gap-4 mb-10 relative z-10">
                <div className="p-3 bg-blue-600/10 rounded-2xl group-hover:bg-blue-600/20 transition-colors">
                  <category.icon className="w-5 h-5 text-blue-500" />
                </div>
                <h4 className="text-[11px] font-mono font-bold uppercase tracking-widest text-slate-400 group-hover:text-white transition-colors">
                  {category.title}
                </h4>
              </div>

              <div className="grid grid-cols-2 gap-4 relative z-10">
                {category.skills.map((skill, si) => (
                  <motion.div
                    key={si}
                    whileHover={{ scale: 1.05 }}
                    whileTap={hasHover ? undefined : { scale: 0.94 }}
                    className="flex flex-col items-center gap-3 p-4 rounded-2xl bg-white/[0.03] border border-white/5 hover:border-white/10 transition-colors group/skill"
                  >
                    <div
                      className="w-10 h-10 flex items-center justify-center rounded-xl bg-black/40 mb-1 group-hover/skill:shadow-[0_0_15px_rgba(255,255,255,0.1)] transition-all"
                      style={{ color: skill.color }}
                    >
                      <skill.Logo size={24} />
                    </div>
                    <div className="text-center">
                      <div className="text-[9px] font-mono uppercase tracking-tighter text-slate-500 mb-1">{skill.name}</div>
                      <div className="text-[10px] font-bold text-white/40 group-hover/skill:text-white transition-colors">
                        {skill.level}%
                      </div>
                    </div>

                    {/* Tiny progress bar */}
                    <div className="w-full h-[1px] bg-white/5 mt-auto">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.level}%` }}
                        transition={{ duration: 1, delay: 0.5 + (si * 0.1) }}
                        className="h-full bg-blue-500/50"
                        style={{ backgroundColor: skill.color + '80' }}
                      />
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Projects Section */}
      <div id="projects" className="mb-32 md:mb-48">
        <h3 className="text-xs font-bold uppercase tracking-[0.4em] text-slate-500 mb-12 md:mb-20 flex items-center gap-3">
          <Code2 className="w-4 h-4 text-blue-600" /> Built & Deployed
        </h3>

        <div className="space-y-24 md:space-y-32">
          {PROJECTS.map((project, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              className="group relative border-b border-white/5 pb-20 last:border-0"
            >
              <div className="flex flex-col md:flex-row gap-8 md:gap-16 items-start">
                <div className="flex flex-col gap-4 shrink-0">
                  <span className="text-[10px] font-mono text-slate-800 tracking-[0.5em]">{project.status}</span>
                  <div className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-slate-500 group-hover:border-blue-500/50 group-hover:text-blue-500 transition-all duration-500">
                    <Code2 className="w-4 h-4" />
                  </div>
                </div>

                <div className="flex-1 space-y-6">
                  <motion.h4
                    whileInView={hasHover ? undefined : { color: ['#ffffff', '#60a5fa', '#ffffff'] }}
                    viewport={{ once: true, amount: 0.6 }}
                    transition={{ duration: 1.4, ease: 'easeInOut' }}
                    className="text-3xl md:text-6xl font-bold tracking-tight text-white group-hover:text-blue-400 transition-colors duration-500 break-words"
                  >
                    {project.title}
                  </motion.h4>
                  <p className="text-base md:text-xl text-slate-400 font-light leading-relaxed max-w-2xl group-hover:text-slate-200 transition-colors duration-500">
                    {project.desc}
                  </p>
                  <div className="flex flex-wrap gap-3">
                    {project.tags.map((tag, ti) => (
                      <span key={ti} className="text-[9px] font-mono text-slate-600 uppercase tracking-[0.2em] px-4 py-1.5 border border-white/10 rounded-lg bg-white/[0.02]">
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Actions: architecture diagram + optional GitHub */}
                  <div className="flex flex-wrap items-center gap-4 pt-2">
                    <button
                      onClick={() => openArch(project.architectureId)}
                      data-hover="true"
                      aria-label={`View ${project.title} architecture`}
                      className="inline-flex items-center gap-2 text-[10px] font-mono font-bold uppercase tracking-[0.2em] px-5 py-3 rounded-xl border border-white/10 bg-white/[0.03] text-slate-300 hover:text-white hover:border-blue-500/50 hover:bg-blue-600/10 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300 cursor-pointer"
                    >
                      <GitBranch className="w-4 h-4 text-blue-500" /> Architecture
                    </button>
                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        data-hover="true"
                        className="inline-flex items-center gap-2 text-[10px] font-mono font-bold uppercase tracking-[0.2em] px-5 py-3 rounded-xl border border-white/10 bg-white/[0.03] text-slate-300 hover:text-white hover:border-white/30 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
                      >
                        <Github className="w-4 h-4" /> GitHub
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Work Experience Section */}
      <div id="experience" className="mb-32 md:mb-48">
        <h3 className="text-xs font-bold uppercase tracking-[0.4em] text-slate-500 mb-12 md:mb-20 flex items-center gap-3">
          <Briefcase className="w-4 h-4 text-blue-600" /> Work Experience
        </h3>

        <div className="space-y-6 md:space-y-8">
          {EXPERIENCE.map((exp, i) => (
            <ExperienceCard key={i} exp={exp} index={i} />
          ))}
        </div>
      </div>

      {/* Contact CTA Section */}
      <motion.section
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="border border-white/10 rounded-3xl md:rounded-[2.5rem] overflow-hidden bg-white/[0.02] backdrop-blur-3xl p-8 sm:p-12 md:p-24 text-center group"
      >
        <div className="max-w-3xl mx-auto">
          <div className="w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center mx-auto mb-10 border border-white/10">
            <Mail className="w-7 h-7 text-blue-500" />
          </div>
          <h2 className="text-4xl md:text-7xl font-bold tracking-tighter mb-6 uppercase">LET'S BUILD</h2>
          <p className="text-slate-400 text-xl md:text-2xl mb-12 font-light leading-relaxed">
            Open to AI / ML roles and collaborations. Drop your email and I'll reach out.
          </p>
          <form onSubmit={handleSubscribe} className="relative max-w-lg mx-auto mb-12 flex flex-col md:flex-row gap-6">
            {!subscribed ? (
              <>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@domain.com"
                  className="flex-1 min-w-0 bg-black/60 border border-white/10 rounded-2xl px-6 md:px-8 py-5 text-base md:text-sm font-mono focus:outline-none focus:border-blue-500/50"
                />
                <button type="submit" data-hover="true" className="bg-blue-600 text-white px-10 py-5 rounded-2xl font-bold text-xs uppercase tracking-[0.3em] transition-all duration-500 shadow-[0_10px_30px_rgba(37,99,235,0.2)] hover:bg-blue-500">
                  GET_IN_TOUCH
                </button>
              </>
            ) : (
              <div className="flex-1 flex items-center justify-center gap-4 text-blue-500 font-mono text-base border border-blue-500/30 bg-blue-500/10 py-6 rounded-2xl">
                <CheckCircle2 className="w-6 h-6" /> OPENING MAIL CLIENT...
              </div>
            )}
          </form>
        </div>
      </motion.section>

      <ArchitectureModal spec={activeArch} onClose={() => setActiveArch(null)} />
    </div>
  );
};

export default DeveloperProfile;
