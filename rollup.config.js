import commonjs from '@rollup/plugin-commonjs';
import buble from '@rollup/plugin-buble';

export default {
  input: 'main.js',
  output: {
    file: 'bundle.js',
    format: 'iife'    
  },
  plugins: [
    commonjs(),
    buble()
  ]
};
