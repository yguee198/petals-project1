import { defineConfig } from 'vite'
import { resolve } from 'path'

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        manager: resolve(__dirname, 'pages/manager.html'),
        customers: resolve(__dirname, 'pages/customers.html'),
        analytics: resolve(__dirname, 'pages/analytics.html'),
        orders: resolve(__dirname, 'pages/orders.html'),
        checkout: resolve(__dirname, 'pages/checkout.html'),
        addNewPlant: resolve(__dirname, 'pages/addNewPlant.html'),
        userAuth: resolve(__dirname, 'pages/user-auth.html'),
        user: resolve(__dirname, 'pages/user.html'),
      },
    },
  },
})