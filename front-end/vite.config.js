import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {},
    middlewareMode: false,
    setupMiddlewares(middlewares, devServer) {
      // Endpoint /api/data
      devServer.app.get('/api/data', (req, res) => {
        res.json({
          message: 'Hello depuis React !',
          status: 'success',
          items: [1, 2, 3, 4]
        })
      })
      return middlewares
    }
  }
})
