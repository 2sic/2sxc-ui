import { defineConfig, mergeConfig } from 'vitest/config'
// import viteConfig from './vite.config'

export default defineConfig(configEnv => mergeConfig(
  // viteConfig(configEnv),
  // define({
  //   test: {
  //     ROOTVERSION: "0.0.0",
  //   },
  // }),
  defineConfig({
    test: {
      environment: 'jsdom', // or 'happy-dom', 'jsdom', 'node'
      exclude: [
        'packages/template/*',
        'node_modules/**',

      ],
    },
    define: {
      ROOTVERSION: '"0.0.0"',
      IsDevBuild : 'true',
    },
  })
))