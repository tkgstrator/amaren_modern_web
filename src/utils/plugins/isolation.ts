import { writeFileSync } from 'node:fs'
import { resolve } from 'node:path'
import type { Plugin } from 'vite'

export const ViteSharedBuffer = (): Plugin => ({
  name: 'configure-server',

  configureServer(server) {
    server.middlewares.use((_req, res, next) => {
      res.setHeader('Cross-Origin-Opener-Policy', 'same-origin')
      res.setHeader('Cross-Origin-Embedder-Policy', 'require-corp')
      next()
    })
  },

  closeBundle() {
    const headers: string[] = [
      '/*',
      '  Cross-Origin-Opener-Policy: same-origin',
      '  Cross-Origin-Embedder-Policy: require-corp'
    ]
    writeFileSync(resolve(process.cwd(), 'dist/_headers'), headers.join('\n').trim(), 'utf8')
  }
})
