/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './index.tsx',
    './App.tsx',
    './components/**/*.{ts,tsx}',
    './data/**/*.{ts,tsx}',
  ],
  // ArchitectureModal builds these at runtime via
  // `meta.border.replace('border-l-', 'border-t-')`, so the JIT scanner
  // can't see them in source — list them explicitly.
  safelist: [
    'border-t-slate-400/70',
    'border-t-blue-500/70',
    'border-t-cyan-400/70',
    'border-t-amber-400/70',
    'border-t-emerald-400/70',
    'border-t-blue-400/70',
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
