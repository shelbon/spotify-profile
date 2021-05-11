import svelte from 'rollup-plugin-svelte';
import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import livereload from 'rollup-plugin-livereload';
import esbuild from 'rollup-plugin-esbuild';
import css from 'rollup-plugin-css-only';
import replace from '@rollup/plugin-replace';
import dotenv from 'dotenv';

const production = !process.env.ROLLUP_WATCH;
dotenv.config();
function serve() {
  let server;

  function toExit() {
    if (server) server.kill();
  }

  return {
    writeBundle() {
      if (server) return;
      server = require('child_process').spawn(
        'npm',
        ['run', 'start', '--', '--dev'],
        //['run', 'dev', '--prefix ../server/'],
        {
          stdio: ['ignore', 'inherit', 'inherit'],
          shell: true,
        }
      );

      process.on('SIGTERM', toExit);
      process.on('exit', toExit);
    },
  };
}

export default {
  input: 'src/main.js',
  output: {
    sourcemap: true,
    format: 'iife',
    name: 'app',
    file: 'public/build/bundle.js',
  },
  plugins: [
    resolve({
      browser: true,
      dedupe: ['svelte'],
    }),
    replace({
      API_BASE_URL: JSON.stringify(process.env.API_BASE_URL),
    }),
    svelte({
      compilerOptions: {
        // enable run-time checks when not in production
        dev: !production,
      },
    }),
    // we'll extract any component CSS out into
    // a separate file - better for performance
    css({ output: 'bundle.css' }),

    // If you have external dependencies installed from
    // npm, you'll most likely need these plugins. In
    // some cases you'll need additional configuration -
    // consult the documentation for details:
    // https://github.com/rollup/plugins/tree/master/packages/commonjs

    commonjs(),

    esbuild({
      exclude: /node_modules/, // default
      sourceMap: process.env.NODE_ENV !== 'production', // default
      minify: process.env.NODE_ENV === 'production',
      minifySyntax: process.env.NODE_ENV === 'production',
      minifyWhitespace: process.env.NODE_ENV === 'production',
      minifyIdentifiers: process.env.NODE_ENV === 'production',
    }),
    // In dev mode, call `npm run start` once
    // the bundle has been generated
    !production && serve(),

    // Watch the `public` directory and refresh the
    // browser on changes when not in production
    !production &&
      livereload({
        watch: 'public',
        verbose: true,
        wait: 500,
      }),

    // If we're building for production (npm run build
    // instead of npm run dev), minify

    ,
  ],
  watch: {
    clearScreen: false,
  },
};
