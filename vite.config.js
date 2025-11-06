import { svelte } from '@sveltejs/vite-plugin-svelte';
import routify from '@roxi/routify/vite-plugin'
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [
    svelte({ extensions: ['.svelte', '.svg'] }),
    routify({/* config */ })],

  optimizeDeps: {
    exclude: [
      '@tanstack/svelte-query',
      'svelte-loading-spinners',
      '@roxi/routify',
      '@iconify-icons/bx',
      'svelte-inline-svg',
      'svelte-chartjs',
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
