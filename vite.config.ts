import { execSync } from 'node:child_process'
import ViteYaml from '@modyfi/vite-plugin-yaml'
import react from '@vitejs/plugin-react-swc'
import { defineConfig } from 'vite'
import { VitePWA } from 'vite-plugin-pwa'

// https://vite.dev/config/
export default defineConfig({
  server: {
    host: true
  },
  define: {
    'process.env.GIT_COMMIT_DATE': JSON.stringify(execSync('git log -1 --format="%cd"').toString().trim()),
    'process.env.GIT_COMMIT_HASH': JSON.stringify(execSync('git log -1 --format="%H"').toString().trim())
    //   'process.env.GIT_TAG': JSON.stringify(execSync('git describe --tags').toString().trim())
  },
  build: {
    target: 'esnext',
    cssMinify: true,
    minify: 'terser',
    rollupOptions: {
      external: ['module']
    }
  },
  worker: {
    format: 'es'
  },
  plugins: [
    react(),
    ViteYaml(),
    VitePWA({
      // strategies: 'injectManifest',
      // injectManifest: {
      //   swSrc: 'src/sw.ts'
      // },
      registerType: 'autoUpdate',
      includeAssets: ['favicon.ico', 'apple-touch-icon.png'],
      injectRegister: 'auto',
      devOptions: {
        enabled: true
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg}'],
        clientsClaim: true,
        skipWaiting: true,
        cleanupOutdatedCaches: true,
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/fonts\.googleapis\.com\/.*/i,
            handler: 'CacheFirst',
            options: {
              cacheName: 'google-fonts-cache',
              expiration: {
                maxEntries: 10,
                maxAgeSeconds: 60 * 60 * 24 * 365 // <== 365 days
              },
              cacheableResponse: {
                statuses: [0, 200]
              }
            }
          },
          {
            urlPattern: /^https:\/\/fonts\.gstatic\.com\/.*/i,
            handler: 'CacheFirst',
            options: {
              cacheName: 'gstatic-fonts-cache',
              expiration: {
                maxEntries: 10,
                maxAgeSeconds: 60 * 60 * 24 * 365 // <== 365 days
              },
              cacheableResponse: {
                statuses: [0, 200]
              }
            }
          }
        ]
      },
      manifest: {
        name: 'アマレン',
        short_name: 'アマレン',
        description: 'アマチュア将棋連盟の非公式ウェブサイトです',
        theme_color: '#E43F3B',
        background_color: '#E43F3B',
        display: 'fullscreen',
        orientation: 'portrait',
        icons: [
          {
            src: 'icon-192x192.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: 'icon-512x512.png',
            sizes: '512x512',
            type: 'image/png'
          }
        ]
      }
    })
  ]
})
