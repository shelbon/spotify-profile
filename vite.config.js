import { svelte } from '@sveltejs/vite-plugin-svelte';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [svelte({ extensions: ['.svelte', '.svg'] })],

  optimizeDeps: {
    exclude: [
      '@sveltestack/svelte-query',
      'svelte-loading-spinners',
      '@roxi/routify',
      '@iconify-icons/bx',
      'svelte-inline-svg',
      '@smui/card',
      '@smui/common',
    ],
  },
  resolve: {
    dedupe: ["'@roxi/routify'"],
  },
  server: {
    port: 5000,
  },
});
