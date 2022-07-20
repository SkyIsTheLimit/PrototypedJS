// import typescript from '@rollup/plugin-typescript';
import ts from 'rollup-plugin-typescript2';

export default {
  input: 'src/index.ts',
  output: {
    format: 'cjs',
    file: 'dist/prototyped.js',
  },
  plugins: [ts()],
};
