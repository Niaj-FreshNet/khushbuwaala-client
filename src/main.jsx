import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { router } from './Routes/Routes'
import { RouterProvider } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import './index.css'
import 'antd/dist/reset.css';
import { CartProvider } from './Cart/CartContext'
import { WishlistProvider } from './Wishlist/WishlistContext'
import { HelmetProvider } from 'react-helmet-async'
import initializeMetaPixel from './Utils/metaPixel'

const queryClient = new QueryClient()

initializeMetaPixel();

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <HelmetProvider>
      <QueryClientProvider client={queryClient}>
        <CartProvider>
          <WishlistProvider>
            <RouterProvider router={router} />
          </WishlistProvider>
        </CartProvider>
      </QueryClientProvider>
    </HelmetProvider>
  </StrictMode>,
)
