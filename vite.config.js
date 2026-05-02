import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        about: resolve(__dirname, 'about.html'),
        portfolio: resolve(__dirname, 'portfolio.html'),
        contact: resolve(__dirname, 'contact.html'),
        neighborhood: resolve(__dirname, 'neighborhood.html'),
        furnished: resolve(__dirname, 'furnished.html'),
        unfurnished: resolve(__dirname, 'unfurnished.html'),
        office: resolve(__dirname, 'office.html'),
        retail: resolve(__dirname, 'retail.html')
      }
    }
  }
});
