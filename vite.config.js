import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import * as path from 'path'
import fs from 'fs'
import NodeGlobalsPolyfillPlugin from '@esbuild-plugins/node-globals-polyfill'
import rollupNodePolyFill from 'rollup-plugin-node-polyfills'

export default () => {
  return defineConfig({
    plugins: [react()],
    define: {
      global: 'globalThis'
    },
    server: {
      port: 5001
    },
    css: {
      preprocessorOptions: {
        scss: {
          includePaths: ['node_modules', './src/assets']
        }
      },
      postcss: {
        plugins: [require('postcss-rtl')()]
      }
    },
    resolve: {
      alias: [
        {
          find: /^~.+/,
          replacement: (val) => {
            return val.replace(/^~/, '')
          }
        },
        { find: 'stream', replacement: 'stream-browserify' },
        { find: 'crypto', replacement: 'crypto-browserify' },
        { find: 'url', replacement: 'rollup-plugin-node-polyfills/polyfills/url' },
        { find: 'util', replacement: 'rollup-plugin-node-polyfills/polyfills/util' },
        { find: 'zlib', replacement: 'rollup-plugin-node-polyfills/polyfills/zlib' },
        { find: 'assert', replacement: 'rollup-plugin-node-polyfills/polyfills/assert' },
        { find: 'buffer', replacement: 'rollup-plugin-node-polyfills/polyfills/buffer-es6' },
        { find: 'process', replacement: 'rollup-plugin-node-polyfills/polyfills/process-es6' },
        { find: 'devextreme/ui', replacement: 'devextreme/esm/ui' },
        { find: '@src', replacement: path.resolve(__dirname, 'src') },
        { find: '@core', replacement: path.resolve(__dirname, 'src/@core') },
        { find: '@api', replacement: path.resolve(__dirname, 'src/api') },
        { find: '@assets', replacement: path.resolve(__dirname, 'src/assets') },
        { find: '@components', replacement: path.resolve(__dirname, 'src/components') },
        { find: '@configs', replacement: path.resolve(__dirname, 'src/configs') },
        { find: '@contexts', replacement: path.resolve(__dirname, 'src/contexts') },
        { find: '@hooks', replacement: path.resolve(__dirname, 'src/hooks') },
        { find: '@store', replacement: path.resolve(__dirname, 'src/store') },
        { find: '@utility', replacement: path.resolve(__dirname, 'src/utility') },
        { find: '@views', replacement: path.resolve(__dirname, 'src/views') }
      ]
    },
    esbuild: {
      loader: 'jsx',
      include: /.\/src\/.*\.js?$/,
      exclude: [],
      jsx: 'automatic'
    },
    optimizeDeps: {
      esbuildOptions: {
        loader: {
          '.js': 'jsx'
        },
        plugins: [
          NodeGlobalsPolyfillPlugin({
            buffer: true,
            process: true
          }),
          {
            name: 'load-js-files-as-jsx',
            setup(build) {
              build.onLoad({ filter: /src\\.*\.js$/ }, async (args) => ({
                loader: 'jsx',
                contents: await fs.readFileSync(args.path, 'utf8')
              }))
            }
          }
        ]
      }
    },
    build: {
      rollupOptions: {
        plugins: [rollupNodePolyFill()],
        external: ['jspdf']
      }
    },
   
  })
}
