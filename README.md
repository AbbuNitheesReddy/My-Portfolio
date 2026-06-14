# 🌟 Abbu Nithees Reddy's Portfolio

<div align="center">

  <!-- Logo / Profile -->
  <img src="public/nithees.png" alt="Portfolio Logo" width="120" height="120">

### ✨ Artificial Intelligence & Machine Learning Engineer

<kbd>My space on the web</kbd> — a terminal-themed portfolio with stunning dark aesthetics

[![Portfolio Banner](https://img.shields.io/badge/Portfolio-Live%20Demo-2563eb?style=for-the-badge&logo=vercel&logoColor=white)](https://abbunitheesreddy.vercel.app)

</div>

---

## 📋 Table of Contents

- [🎯 Overview](#-overview)
- [✨ Features](#-features)
- [🛠️ Tech Stack](#️-tech-stack)
- [🎨 Design System](#-design-system)
- [🚀 Quick Start](#-quick-start)
- [⚙️ Customization](#️-customization)
- [📸 Screenshots](#-screenshots)
- [🔗 Connect](#-connect)

---

## 🎯 Overview

A modern, fully static single-page portfolio built with **React 19** and **Vite 6**, featuring a dark, terminal-inspired aesthetic with smooth animations and a 3D particle background. Two signature features set it apart from a static showcase: per-project **click-through architecture diagrams** and an interactive **fake CLI** that answers questions about Nithees.

No backend, no API keys, no telemetry — 100% static and deployable anywhere.

**🌐 Live Demo:** [abbunithees.reddy.vercel.app](https://abbunithees.reddy.vercel.app)
**📱 GitHub:** [github.com/AbbuNitheesReddy/My-Portfolio](https://github.com/AbbuNitheesReddy/My-Portfolio)

## ✨ Features

| Feature                       | Description                                                          |
| ----------------------------- | ------------------------------------------------------------------- |
| 🖤 **Dark Terminal Theme**    | Black canvas with blue accents, mono/uppercase wide-tracking labels |
| 🧩 **Architecture Diagrams**  | Click-through, hand-built tiered diagram modal for each project      |
| 🖥️ **Interactive Fake CLI**   | In-browser terminal answering questions about skills & experience   |
| 🌌 **3D Hero Background**      | react-three-fiber particle "constellation" with proximity lines     |
| 🎭 **Smooth Animations**      | framer-motion reveals + lenis buttery smooth scrolling              |
| 📱 **Fully Responsive**       | Seamless experience across all device sizes                         |
| ♿ **Accessible Modal**        | Focus trap, Esc/backdrop close, scroll-lock, reduced-motion aware   |
| 📄 **PDF Resume**             | One-click resume download from the floating button and CLI          |
| 🛡️ **Fully Static**           | No backend, no API keys, no telemetry — deploy anywhere             |

## 🛠️ Tech Stack

### **Core Framework**

| Technology     | Version    | Purpose                  |
| -------------- | ---------- | ------------------------ |
| **React**      | `^19.2.0`  | UI library               |
| **TypeScript** | `~5.8.2`   | Type-safe JavaScript     |
| **Vite**       | `^6.2.0`   | Build tool & dev server  |

### **Styling & UI**

| Technology       | Version     | Purpose                            |
| ---------------- | ----------- | ---------------------------------- |
| **Tailwind CSS** | `^3.4.19`   | Utility-first CSS (PostCSS build)  |
| **lucide-react** | `^0.553.0`  | UI glyph icons                     |
| **react-icons**  | `^5.5.0`    | Simple Icons (tech-brand logos)    |
| **PostCSS**      | `^8.5.15`   | CSS processing pipeline            |
| **Autoprefixer** | `^10.5.0`   | CSS vendor prefixes                |

### **Animation & 3D**

| Technology            | Version     | Purpose                       |
| --------------------- | ----------- | ----------------------------- |
| **framer-motion**     | `^12.23.24` | Animation library             |
| **lenis**             | `^1.3.17`   | Smooth scrolling              |
| **three**             | `^0.182.0`  | WebGL 3D engine               |
| **@react-three/fiber**| `^9.5.0`    | React renderer for three.js   |
| **@react-three/drei** | `^10.7.7`   | three.js helpers              |

## 🎨 Design System

### **Color Palette**

| Color Category | Value     | Usage                | Preview                                                            |
| -------------- | --------- | -------------------- | ------------------------------------------------------------------ |
| **Background** | `#000000` | Main background      | ![#000000](https://placehold.co/20x20/000000/000000.png)          |
| **Foreground** | `#ffffff` | Primary text         | ![#ffffff](https://placehold.co/20x20/ffffff/ffffff.png)          |
| **Accent**     | `#2563eb` | Interactive / links  | ![#2563eb](https://placehold.co/20x20/2563eb/2563eb.png)          |
| **Accent Hi**  | `#3b82f6` | Highlights / hover   | ![#3b82f6](https://placehold.co/20x20/3b82f6/3b82f6.png)          |

### **Typography**

| Font Family       | Usage                 | Characteristics            |
| ----------------- | --------------------- | -------------------------- |
| **Inter**         | Body text, paragraphs | Clean, readable, versatile |
| **Outfit**        | Headings & display    | Modern, geometric          |
| **JetBrains Mono**| CLI, labels, code     | Monospaced, technical feel |

### **Visual Effects**

| Effect               | Technique                              | Description                       |
| -------------------- | -------------------------------------- | --------------------------------- |
| **Custom Cursor**    | `data-hover` driven                    | Reactive cursor on interactables  |
| **Fluid Background** | Inline SVG grain + gradients           | Self-contained animated texture   |
| **whileInView**      | framer-motion `ease: [0.16,1,0.3,1]`   | Scroll-triggered reveals          |
| **Gradient Text**    | Animated CSS gradient                  | Accent gradient on key text       |

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Start the dev server (http://localhost:3000)
npm run dev

# Production build → dist/
npm run build

# Preview the built output
npm run preview

# Manual type-check (no npm script)
npx tsc --noEmit
```

> There are no test, lint, or CI scripts. Run `npx tsc --noEmit` and verify manually with `npm run dev` before deploying.

## ⚙️ Customization

| What to change          | Where                                                              |
| ----------------------- | ----------------------------------------------------------------- |
| About / Skills / Projects / Experience | `components/DeveloperProfile.tsx` (in-file `const` arrays) |
| Architecture diagrams   | `data/architectures.ts` (`ARCHITECTURES` spec map)                |
| CLI commands            | `components/CLITerminal.tsx` (command switch)                      |
| Social links            | `SOCIAL_LINKS` in `App.tsx`                                        |
| Profile photo           | `public/nithees.png` (monogram "N" fallback if missing)           |
| Resume PDF              | `public/AbbuNitheesReddy_Resume.pdf`                              |

## 📸 Screenshots

> _Add screenshots/GIFs of the hero, architecture modal, and CLI here once deployed._

## 🔗 Connect

<div align="center">

| Platform         | Handle                                                          | Link                                   |
| ---------------- | -------------------------------------------------------------- | -------------------------------------- |
| 🐙 **GitHub**    | [@AbbuNitheesReddy](https://github.com/AbbuNitheesReddy)       | `https://github.com/AbbuNitheesReddy`  |
| 💼 **LinkedIn**  | [Abbu Nithees Reddy](https://linkedin.com/in/abbunitheesreddy) | Professional Network                   |
| 📧 **Email**     | [nithish.7098@gmail.com](mailto:nithish.7098@gmail.com)        | Direct Contact                         |

</div>

---

<div align="center">

**Built with ❤️ by Abbu Nithees Reddy**

_AI & Machine Learning Engineer_

[![Portfolio](https://img.shields.io/badge/Portfolio-abbunithees.reddy.vercel.app-2563eb?style=for-the-badge&logo=vercel&logoColor=white)](https://abbunithees.reddy.vercel.app)
[![GitHub](https://img.shields.io/badge/GitHub-AbbuNitheesReddy-181717?style=for-the-badge&logo=github&logoColor=white)](https://github.com/AbbuNitheesReddy)

</div>
