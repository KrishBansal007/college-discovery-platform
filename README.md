# EduFind — College Discovery Platform

EduFind is a modern, high-performance, and feature-rich web platform designed to help students discover, compare, and predict college admissions across India. It provides a seamless user experience with instant page transitions, real-time reactive search filters, side-by-side comparisons, and an interactive rank predictor.

---

## 🌟 Key Features

| Feature | Description |
|---------|-------------|
| **Smart Search & Filters** | Search colleges by name, city, or course. Filter results dynamically by state, college type (Government/Private/Deemed), annual fees, and ratings with an infinite scroll layout. |
| **Detailed College Profiles** | View comprehensive profiles for each college, including detailed overviews, placement statistics, course listings, user reviews, and entrance exam cutoffs. |
| **Side-by-Side Comparison** | Select and compare up to 3 colleges side-by-side on key metrics (annual fees, placement packages, ratings, locations, and course durations). |
| **Interactive Rank Predictor** | Predict college admission chances in real-time by entering your rank, category, and entrance exam. Results calculate instantly as you type or change options. |

---

## ⚡ Performance & UX Optimizations

This platform is built with a focus on speed, responsiveness, and clean UX:
* **Instant Client-Side Navigation:** Utilizes Next.js 16's `unstable_instant` prefetching alongside React 19 `<Suspense>` boundaries to enable instant page transitions that never block or freeze the UI.
* **Real-time Predictor Reactivity:** Calculates admission likelihood instantly using a reactive `useEffect` model—no manual form submission required.
* **URL State Synchronization:** Keeps search and comparison parameters synchronized with the URL search parameters so you can bookmark or share filtered views easily.
* **Persistent Basket:** The college comparison list is persisted in the browser's `localStorage`, keeping your selections saved even if you refresh or close the tab.
* **Fully Responsive Design:** Premium, modern glassmorphic UI styled with Tailwind CSS, fully optimized for mobile, tablet, and desktop viewports.

---

## 🛠️ Tech Stack

* **Framework:** [Next.js 16](https://nextjs.org/) (App Router)
* **Library:** [React 19](https://react.dev/)
* **Styling:** [Tailwind CSS v4](https://tailwindcss.com/)
* **Language:** [TypeScript](https://www.typescriptlang.org/)

---

## 🚀 Getting Started

### Prerequisites

Ensure you have [Node.js](https://nodejs.org/) installed (version 18+ recommended).

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd college-discovery-platform
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

### Development Server

To run the development server locally:
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

*To allow access over your local network (e.g. from your mobile phone or tablet), run `npm run dev` and open `http://<your-local-ip>:3000`.*

### Production Build

To build and run the application in production mode:
```bash
npm run build
npm start
```

---

## 📂 Project Structure

```text
src/
├── app/                  # App Router Pages
│   ├── colleges/         # Explore listing & detail pages
│   ├── compare/          # Compare list view
│   ├── predictor/        # College predictor tool
│   ├── layout.tsx        # Global layout & CompareProvider wrapper
│   └── page.tsx          # Homepage
├── components/           # React Components
│   ├── ui/               # Reusable UI primitives (Button, Badge, Spinner, etc.)
│   ├── colleges/         # College Cards, Filters, and Lists
│   ├── compare/          # Compare Bar & Comparison Table
│   ├── predictor/        # Predictor Forms & Results UI
│   └── layout/           # Shared Header & Footer
├── data/                 # Static datasets (colleges, cutoffs, placements)
├── hooks/                # Custom hooks (useColleges, useInfiniteScroll)
├── lib/                  # Utility functions & business logic (formatting, prediction logic)
└── types/                # TypeScript type declarations
```

---

## ⚖️ Technical Tradeoffs

| Decision | Tradeoff / Rationale |
|----------|----------------------|
| **Static dataset vs. full database** | Faster prototype execution. We modeled mock API endpoints (`/api/colleges` and `/api/predictor`) to simulate query latency, making it straightforward to swap out the data provider for a live database client (e.g., Prisma + PostgreSQL) in the future. |
| **Client-side state & URL synchronization** | Syncing state to URL search parameters makes search queries and filter configurations shareable, but requires careful routing context wrapping (like `<Suspense>`) during static building. |
| **LocalStorage for Compare basket** | Avoids server-side authentication overhead and keeps session state persistent and instantaneous, though basket choices will not sync across different devices. |


