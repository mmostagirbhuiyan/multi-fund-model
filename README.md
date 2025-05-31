# Professional 30-Year REIT Analysis (React + TypeScript)

A professional, interactive tool for analyzing real estate investment trusts (REITs) over a 30-year period. This application is a modern, maintainable replacement for a previous HTML version, built with a focus on a clean UI and robust calculation logic.

## Features
- Comprehensive 30-year financial analysis with monthly granularity.
- Accurate cash-out refinancing model including closing costs and seasoning periods.
- Supports 1031 exchanges for tax-deferred property acquisition.
- Detailed rental yield calculation with both itemized expense breakdown and net yield options.
- Year-by-year breakdown of portfolio performance, cash flows, and debt.
- Interactive charts for portfolio composition, annual cash flow, and overall portfolio value, net equity, and debt over time.
- Modern and responsive user interface built with React and Material-UI.

## Technology Stack
- **Frontend:** React, TypeScript, Material-UI (MUI)
- **Charting:** Chart.js, react-chartjs-2
- **Build Tool:** Vite

## Getting Started

1. **Clone the repository:**
   ```bash
   git clone <repository_url>
   cd reit-fund-model
   ```
2. **Install dependencies:**
   ```bash
   npm install
   ```
3. **Run the app locally in development mode:**
   ```bash
   npm run dev
   ```
4. Open your browser and navigate to [http://localhost:5173](http://localhost:5173).

## Deployment to GitHub Pages

This application can be easily deployed to GitHub Pages as a static site.

1. **Install `gh-pages`:**
   ```bash
   npm install --save-dev gh-pages
   ```
2. **Configure Vite base path:**
   Update `vite.config.ts` with your repository name:
   ```typescript
   import { defineConfig } from 'vite';
   import react from '@vitejs/plugin-react';
    
   export default defineConfig({
     plugins: [react()],
     base: '/YOUR_REPOSITORY_NAME/', // Replace with your actual GitHub repository name
   });
   ```
3. **Add deploy scripts to `package.json`:**
   Ensure your `package.json` includes these scripts:
   ```json
   "scripts": {
     "dev": "vite",
     "build": "vite build",
     "preview": "vite preview",
     "predeploy": "npm run build",
     "deploy": "gh-pages -d dist"
   },
   ```
4. **Run the deploy command:**
   ```bash
   npm run deploy
   ```
5. **Configure GitHub Pages:**
   Go to your GitHub repository settings -> Pages and set the source to the `gh-pages` branch.

---

MIT License 