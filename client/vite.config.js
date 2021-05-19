import { defineConfig } from 'vite';
import svelte from '@sveltejs/vite-plugin-svelte';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [svelte()],
  optimizeDeps: {
    exclude: [
      '@sveltestack/svelte-query',
      'svelte-loading-spinners',
      '@roxi/routify',
      '@iconify-icons/bx',
      'svelte-inline-svg',
    ],
  },
  resolve: {
    dedupe: ["'@roxi/routify'"],
  },
});
