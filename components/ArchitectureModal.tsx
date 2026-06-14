/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React, { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { useLenis } from 'lenis/react';
import {
  X, ArrowRightToLine, Cog, GitBranch, Database, Cpu, CheckCircle2, ChevronDown,
} from 'lucide-react';
import type { ArchitectureSpec, NodeKind } from '../data/architectures';

interface ArchitectureModalProps {
  /** The spec to display, or null when the modal is closed. */
  spec: ArchitectureSpec | null;
  onClose: () => void;
}

interface KindMeta {
  Icon: React.ComponentType<{ className?: string }>;
  label: string;
  /** Tailwind text color for icon/accent. */
  text: string;
  /** Left-border accent color. */
  border: string;
  /** Legend dot color. */
  dot: string;
}

const KIND_META: Record<NodeKind, KindMeta> = {
  input: { Icon: ArrowRightToLine, label: 'Input', text: 'text-slate-300', border: 'border-l-slate-400/70', dot: 'bg-slate-400' },
  process: { Icon: Cog, label: 'Process', text: 'text-blue-400', border: 'border-l-blue-500/70', dot: 'bg-blue-500' },
  model: { Icon: Cpu, label: 'Model / LLM', text: 'text-cyan-300', border: 'border-l-cyan-400/70', dot: 'bg-cyan-400' },
  decision: { Icon: GitBranch, label: 'Decision', text: 'text-amber-400', border: 'border-l-amber-400/70', dot: 'bg-amber-400' },
  store: { Icon: Database, label: 'Store', text: 'text-emerald-400', border: 'border-l-emerald-400/70', dot: 'bg-emerald-400' },
  output: { Icon: CheckCircle2, label: 'Output', text: 'text-blue-300', border: 'border-l-blue-400/70', dot: 'bg-blue-400' },
};

const FOCUSABLE =
  'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])';

const ArchitectureModal: React.FC<ArchitectureModalProps> = ({ spec, onClose }) => {
  const reduceMotion = useReducedMotion();
  const lenis = useLenis();
  const panelRef = useRef<HTMLDivElement>(null);
  const closeBtnRef = useRef<HTMLButtonElement>(null);
  // Element to restore focus to when the modal closes.
  const triggerRef = useRef<Element | null>(null);

  const isOpen = spec !== null;

  // Scroll-lock the page + pause Lenis, focus the modal, restore on close.
  useEffect(() => {
    if (!isOpen) return;

    triggerRef.current = document.activeElement;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    lenis?.stop();

    const id = window.setTimeout(() => closeBtnRef.current?.focus(), 0);

    return () => {
      document.body.style.overflow = prevOverflow;
      lenis?.start();
      window.clearTimeout(id);
      if (triggerRef.current instanceof HTMLElement) triggerRef.current.focus();
    };
  }, [isOpen, lenis]);

  // Esc to close + Tab focus trap.
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      e.stopPropagation();
      onClose();
      return;
    }
    if (e.key !== 'Tab' || !panelRef.current) return;

    const focusable = Array.from(
      panelRef.current.querySelectorAll<HTMLElement>(FOCUSABLE),
    ).filter((el) => el.offsetParent !== null);
    if (focusable.length === 0) return;

    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    const active = document.activeElement;

    if (e.shiftKey && active === first) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && active === last) {
      e.preventDefault();
      first.focus();
    }
  };

  const motionProps = reduceMotion
    ? {}
    : {
        initial: { opacity: 0, y: 16 },
        animate: { opacity: 1, y: 0 },
        exit: { opacity: 0, y: 16 },
        transition: { duration: 0.25, ease: [0.16, 1, 0.3, 1] as const },
      };

  const titleId = spec ? `arch-title-${spec.id}` : undefined;

  // Distinct node kinds present, for the legend.
  const legendKinds = spec
    ? (Array.from(new Set(spec.layers.flatMap((l) => l.nodes.map((n) => n.kind)))) as NodeKind[])
    : [];

  // Portal to <body> so the modal escapes DeveloperProfile's `relative z-10`
  // stacking context (and any framer-motion transform on ancestor sections),
  // which otherwise traps z-[120] beneath the root-level fixed nav / scroll bar
  // and lets those layers swallow the close/backdrop clicks.
  return createPortal(
    <AnimatePresence>
      {spec && (
        <motion.div
          data-lenis-prevent
          className="fixed inset-0 z-[120] flex items-center justify-center p-3 md:p-8 bg-black/90 backdrop-blur-xl"
          initial={reduceMotion ? undefined : { opacity: 0 }}
          animate={reduceMotion ? undefined : { opacity: 1 }}
          exit={reduceMotion ? undefined : { opacity: 0 }}
          transition={{ duration: 0.2 }}
          onMouseDown={(e) => {
            if (e.target === e.currentTarget) onClose();
          }}
          onKeyDown={handleKeyDown}
        >
          <motion.div
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
            {...motionProps}
            className="w-full max-w-4xl max-h-[92vh] flex flex-col bg-[#050505] border border-white/10 rounded-3xl overflow-hidden shadow-[0_40px_120px_rgba(0,0,0,0.85)]"
          >
            {/* Header */}
            <div className="flex items-start justify-between gap-6 px-5 md:px-10 py-6 border-b border-white/10 bg-white/[0.02]">
              <div className="min-w-0">
                <div className="text-[9px] font-mono text-blue-500 uppercase tracking-[0.4em] mb-2">
                  System_Architecture
                </div>
                <h2 id={titleId} className="text-xl md:text-3xl font-bold tracking-tight text-white truncate">
                  {spec.title}
                </h2>
                <p className="text-xs md:text-sm text-slate-400 font-light mt-1">{spec.tagline}</p>
              </div>
              <button
                ref={closeBtnRef}
                onClick={onClose}
                aria-label="Close architecture diagram"
                data-hover="true"
                className="shrink-0 w-11 h-11 flex items-center justify-center rounded-full border border-white/10 text-slate-400 hover:text-white hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Body */}
            <div className="flex-1 overflow-y-auto overflow-x-hidden px-5 md:px-10 py-7 scrollbar-hide">
              {/* Metrics */}
              {spec.metrics && spec.metrics.length > 0 && (
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
                  {spec.metrics.map((m) => (
                    <div key={m.label} className="rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3">
                      <div className="text-xl md:text-2xl font-bold text-white tracking-tight">{m.value}</div>
                      <div className="text-[9px] font-mono text-slate-500 uppercase tracking-[0.2em] mt-1 leading-tight">
                        {m.label}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Stack chips */}
              <div className="flex flex-wrap gap-2 mb-10">
                {spec.stack.map((s) => (
                  <span
                    key={s}
                    className="text-[9px] font-mono text-slate-400 uppercase tracking-[0.2em] px-3 py-1.5 border border-white/10 rounded-lg bg-white/[0.02]"
                  >
                    {s}
                  </span>
                ))}
              </div>

              {/* Tiered architecture diagram — stacked "planes" with flow connectors */}
              <div
                className="relative rounded-2xl border border-white/[0.07] bg-black/40 p-4 md:p-6"
                style={{
                  backgroundImage:
                    'linear-gradient(rgba(37,99,235,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(37,99,235,0.06) 1px, transparent 1px)',
                  backgroundSize: '22px 22px',
                }}
              >
                <div className="flex items-center justify-between mb-5">
                  <span className="text-[9px] font-mono text-slate-500 uppercase tracking-[0.4em]">
                    Data Flow
                  </span>
                  <span className="text-[9px] font-mono text-slate-600 uppercase tracking-[0.3em]">
                    {spec.layers.length} tiers
                  </span>
                </div>

                {spec.layers.map((layer, li) => {
                  const isLast = li === spec.layers.length - 1;
                  return (
                    <React.Fragment key={layer.label}>
                      {/* Tier plane */}
                      <div className="rounded-xl border border-white/10 bg-white/[0.025] p-3.5 md:p-4">
                        <div className="flex items-center gap-2.5 mb-3">
                          <span className="flex items-center justify-center w-6 h-6 rounded-md bg-blue-600/15 border border-blue-500/30 text-[9px] font-mono font-bold text-blue-400 shrink-0">
                            {String(li + 1).padStart(2, '0')}
                          </span>
                          <span className="text-[10px] font-mono text-slate-400 uppercase tracking-[0.35em]">
                            {layer.label}
                          </span>
                          <span className="flex-1 h-px bg-gradient-to-r from-white/10 to-transparent" aria-hidden="true" />
                        </div>
                        <div className="flex flex-wrap gap-3">
                          {layer.nodes.map((node) => {
                            const meta = KIND_META[node.kind];
                            const { Icon } = meta;
                            return (
                              <div
                                key={node.id}
                                className={`group/node relative flex-1 min-w-[160px] max-w-full sm:max-w-[300px] rounded-lg border border-white/10 border-t-2 ${meta.border.replace('border-l-', 'border-t-')} bg-[#0a0a0a] p-3.5 transition-colors duration-200 hover:border-white/20 hover:bg-white/[0.04] ${
                                  node.kind === 'decision' ? 'border-dashed' : ''
                                }`}
                              >
                                <div className="flex items-start gap-2.5">
                                  <span className={`flex items-center justify-center w-8 h-8 rounded-md bg-white/[0.04] border border-white/10 shrink-0 ${meta.text}`}>
                                    <Icon className="w-4 h-4" />
                                  </span>
                                  <div className="min-w-0">
                                    <div className="text-sm font-semibold text-white leading-snug">{node.label}</div>
                                    {node.detail && (
                                      <p className="text-[11px] font-mono text-slate-500 leading-relaxed break-words mt-1">
                                        {node.detail}
                                      </p>
                                    )}
                                  </div>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>

                      {/* Flow connector between tiers */}
                      {!isLast && (
                        <div className="flex justify-center py-1.5" aria-hidden="true">
                          <span className="relative flex flex-col items-center">
                            <span className="w-px h-4 bg-gradient-to-b from-blue-500/50 to-blue-500/20" />
                            <ChevronDown className="w-4 h-4 -mt-1 text-blue-500/70" />
                          </span>
                        </div>
                      )}
                    </React.Fragment>
                  );
                })}
              </div>

              {/* Stores & sources rail */}
              {spec.stores && spec.stores.length > 0 && (
                <div className="mt-10 pt-7 border-t border-white/5">
                  <div className="text-[9px] font-mono text-emerald-400/80 uppercase tracking-[0.4em] mb-4 flex items-center gap-2">
                    <Database className="w-3.5 h-3.5" /> Stores & Sources
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {spec.stores.map((store) => (
                      <div key={store.label} className="rounded-xl border border-emerald-400/15 bg-emerald-400/[0.03] p-4">
                        <div className="text-sm font-semibold text-white">{store.label}</div>
                        {store.detail && (
                          <div className="text-[11px] font-mono text-slate-500 mt-1">{store.detail}</div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Legend */}
              <div className="mt-10 pt-7 border-t border-white/5 flex flex-wrap items-center gap-x-5 gap-y-3">
                <span className="text-[9px] font-mono text-slate-600 uppercase tracking-[0.4em]">Legend</span>
                {legendKinds.map((k) => (
                  <span key={k} className="flex items-center gap-2 text-[10px] font-mono text-slate-400 uppercase tracking-[0.15em]">
                    <span className={`w-2.5 h-2.5 rounded-sm ${KIND_META[k].dot}`} aria-hidden="true" />
                    {KIND_META[k].label}
                  </span>
                ))}
              </div>

              {/* Note */}
              {spec.note && (
                <p className="mt-8 text-[10px] font-mono text-slate-600 uppercase tracking-[0.2em] leading-relaxed border-l-2 border-blue-600/40 pl-4">
                  {spec.note}
                </p>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  );
};

export default ArchitectureModal;
