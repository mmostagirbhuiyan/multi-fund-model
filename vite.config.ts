import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
 
export default defineConfig({
  plugins: [react()],
  base: '/reit-fund-model/', // Updated with actual repository name
}); 