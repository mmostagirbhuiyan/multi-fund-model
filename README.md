# Investment Analyzer: Multi-Calculator Toolkit (React + TypeScript)

A professional, interactive platform for modeling a variety of long-term investment strategies. It includes calculators for REIT portfolios, Roth IRA accounts, and detailed 401k growth projections, all wrapped in a clean and modern interface.

[![Build and Deploy](https://github.com/mmostagirbhuiyan/multi-fund-model/actions/workflows/deploy.yml/badge.svg)](https://github.com/mmostagirbhuiyan/multi-fund-model/actions/workflows/deploy.yml)
[![Tests](https://github.com/mmostagirbhuiyan/multi-fund-model/actions/workflows/test.yml/badge.svg)](https://github.com/mmostagirbhuiyan/multi-fund-model/actions/workflows/test.yml)

## Features
- Adjustable multi-year projections with monthly granularity.
- Real estate modeling with cash-out refinancing and 1031 exchanges.
- Roth IRA, 401k, HSA, and brokerage account growth calculators with employer matching options.
- Year-by-year breakdown of portfolio performance and cash flows.
- Interactive charts for asset allocation, contributions, and equity growth.
- Modern and responsive user interface built with React and Tailwind CSS.
- Installable Progressive Web App (PWA) for offline use.
- Tax-free Roth IRA growth projections with simplified inputs.

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

## Running Tests

Vitest is used for unit testing. Run all tests locally with:
```bash
npm test
```
Tests also run automatically for each pull request via GitHub Actions.

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
