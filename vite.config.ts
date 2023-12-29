import { URL, fileURLToPath } from 'node:url';
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '~': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  plugins: [vue()],
  build: {
    lib: {
      entry: 'src/index.ts',
      name: 'vue-calendar',
      formats: ['es', 'cjs'],
      fileName: (format) => (format === 'es' ? 'index.mjs' : 'index.cjs'),
    },
    outDir: 'dist',
    rollupOptions: {
      external: ['vue', '@internationalized/date'],
      output: {
        globals: {
          '@internationalized/date': 'IntlDate',
          vue: 'Vue',
        },
      },
    },
  },
});
