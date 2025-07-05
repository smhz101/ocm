// rollup.config.js
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';

export default [
  // ESM build
  {
    input: 'offcanvas-multilevel.js',
    output: {
      file: 'dist/offcanvas-multilevel.esm.js',
      format: 'es',
      sourcemap: true,
    },
    plugins: [resolve(), commonjs()],
  },
  // UMD build
  {
    input: 'offcanvas-multilevel.js',
    output: {
      file: 'dist/offcanvas-multilevel.umd.js',
      format: 'umd',
      name: 'OffCanvasMenu',
      globals: { jquery: 'jQuery' },
      sourcemap: true,
    },
    external: ['jquery'],
    plugins: [resolve(), commonjs()],
  },
];
