# Sugeng Trianto — Portfolio

> *"Crafting Digital Realities With Intelligence, Code, And Relentless Precision"*

Premium portfolio website built with cinematic quality, museum-grade aesthetics, and immersive scroll experience.

---

## ⚡ Tech Stack

| Technology | Purpose |
|---|---|
| **Next.js 14** | App Router, SSR, RSC |
| **TypeScript** | Type-safe architecture |
| **TailwindCSS** | Utility-first styling |
| **Framer Motion** | Cinematic animations |
| **Lenis** | Ultra-smooth scroll |
| **GSAP** | Advanced scroll animations |

---

## 🚀 Quick Start (Termux / Android)

```bash
# Clone or extract project
cd sugeng-portfolio

# Install dependencies
npm install

# Start development server
npm run dev

# Open in browser
# http://localhost:3000
```

---

## 📦 Production Build

```bash
# Build for production
npm run build

# Start production server
npm start
```

---

## 🌐 Deploy to Vercel

### Method 1 — GitHub + Vercel (Recommended)

```bash
# 1. Initialize git repo
git init
git add .
git commit -m "feat: initial portfolio deployment"

# 2. Create GitHub repo and push
git remote add origin https://github.com/Elfastsasa1/portfolio.git
git branch -M main
git push -u origin main

# 3. Go to vercel.com → Import from GitHub
# 4. Select repo → Deploy (zero config needed)
```

### Method 2 — Vercel CLI

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Follow prompts → Done!
```

---

## 📁 Project Structure

```
sugeng-portfolio/
├── app/
│   ├── components/
│   │   ├── CustomCursor.tsx      # Premium custom cursor
│   │   ├── GrainOverlay.tsx      # Film grain texture
│   │   ├── Loader.tsx            # Cinematic loading screen
│   │   ├── Navigation.tsx        # Fixed nav with mobile menu
│   │   └── ScrollProgress.tsx    # Gold scroll progress bar
│   ├── sections/
│   │   ├── HeroSection.tsx       # Cinematic hero with statue
│   │   ├── IdentitySection.tsx   # Biography & stats
│   │   ├── ArsenalSection.tsx    # Skills showcase
│   │   ├── PhilosophySection.tsx # Philosophy + pillars
│   │   ├── ProjectsSection.tsx   # Project empire cards
│   │   ├── AchievementsSection.tsx # Certifications
│   │   ├── FootprintSection.tsx  # Social / contact
│   │   └── FinalSection.tsx      # Cinematic closing
│   ├── globals.css               # Global styles + animations
│   ├── layout.tsx                # Root layout + metadata
│   └── page.tsx                  # Main page + Lenis init
├── public/                       # Static assets
├── next.config.js
├── tailwind.config.ts
├── tsconfig.json
├── vercel.json
└── package.json
```

---

## 🎨 Design System

### Color Palette

```css
--obsidian: #0B0B0B   /* Deep background */
--vault: #141414       /* Section alternates */
--ivory: #F4EFE6       /* Primary text */
--stone: #D4C4A8       /* Secondary text */
--gold: #C6A76A        /* Accent / highlight */
--bronze: #8A7B62      /* Tertiary accent */
```

### Typography

- **Display**: Cormorant Garamond (editorial luxury)
- **Body**: Outfit (clean readability)
- **Mono**: Space Mono (technical / labels)

---

## 📞 Contact Links

| Platform | Handle |
|---|---|
| GitHub | [@Elfastsasa1](https://github.com/Elfastsasa1) |
| Twitter | [@gulatebuuu](https://twitter.com/gulatebuuu) |
| LinkedIn | [elfast-sasa-128a80275](https://linkedin.com/in/elfast-sasa-128a80275) |
| Telegram | [@cavendisx](https://t.me/cavendisx) |
| Email | elfastsasa8@gmail.com |

---

*Built with ancient wisdom. Deployed with future code.*
