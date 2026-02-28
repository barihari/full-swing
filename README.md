# Full Swing

A 30-day driver improvement program built as a mobile-first PWA. Track structured practice sessions, log metrics, and build toward tournament readiness.

## Features

- **Structured 30-day plan** — Four rotating session types (A/B/C/D) with warm-up, drills, and cool-down blocks, plus a taper week before tournament day
- **Guided sessions** — Step-through timer with drill instructions, ball counters, and haptic feedback
- **Session logging** — Record solid contact rate, airborne %, miss types, confidence, and notes
- **Dashboard** — Progress tracking, tournament readiness score, and trend charts via Recharts
- **Calendar** — Month view with session markers, rest days, and quick navigation
- **Reference library** — Drill descriptions and technique cues available during practice
- **Real-time sync** — Data persisted and synced across devices with InstantDB
- **Installable PWA** — Works offline, add-to-home-screen ready

## Tech Stack

- React 19 + TypeScript
- Vite 7 + Tailwind CSS 4
- React Router 7
- InstantDB (real-time database)
- Recharts (charts)
- dnd-kit (drag & drop)
- vite-plugin-pwa

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173).

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start dev server |
| `npm run build` | Type-check and build for production |
| `npm run preview` | Preview production build |
| `npm run lint` | Run ESLint |

## Project Structure

```
src/
├── components/   # Reusable UI (DrillBlock, CalendarGrid, SessionCard, …)
├── data/         # Plan generation, session templates, reference content
├── db/           # InstantDB schema and client
├── hooks/        # Custom hooks (useMetrics, usePlan, useSessionLog, useSettings)
├── lib/          # Utilities (dates, metrics, scheduling, timer alerts)
├── pages/        # Route pages (Home, Calendar, Session, Log, Dashboard, …)
├── App.tsx       # Route definitions
└── main.tsx      # Entry point
```
