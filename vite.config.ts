import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // Load all env vars (empty prefix) so we can read the server-only RAPIDAPI_KEY.
  const env = loadEnv(mode, process.cwd(), '')
  const rapidApiKey = env.RAPIDAPI_KEY || env.VITE_RAPIDAPI_KEY || ''

  return {
    plugins: [react()],
    server: {
      // Local mirror of the /api/rapidapi serverless proxy. In production Vercel
      // runs the function in api/rapidapi/[...path].ts; here Vite forwards the
      // request to the upstream named by the x-rapidapi-host header and injects
      // the key from .env — so the key still never ships to the browser.
      proxy: {
        '/api/rapidapi': {
          target: 'https://placeholder.invalid',
          changeOrigin: true,
          secure: true,
          router: (req: import('http').IncomingMessage) =>
            `https://${req.headers['x-rapidapi-host']}`,
          rewrite: (path) => path.replace(/^\/api\/rapidapi/, ''),
          configure: (proxy) => {
            proxy.on('proxyReq', (proxyReq) => {
              proxyReq.setHeader('x-rapidapi-key', rapidApiKey)
            })
          },
        },
      },
    },
  }
})
