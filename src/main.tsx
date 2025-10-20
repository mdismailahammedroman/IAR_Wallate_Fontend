import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import 'shepherd.js/dist/css/shepherd.css';
import { RouterProvider } from 'react-router'
import router from './router/index.tsx'
import { ThemeProvider } from './Providers/theme.provider.tsx'
import { Provider as ReduxProvider } from 'react-redux'
import { store } from './redux/store.ts'
import { Toaster } from './components/ui/sonner.tsx'
import { TourProvider } from './components/Tour/TourProvider.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ReduxProvider store={store} >
      <TourProvider>
        <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
          <RouterProvider router={router} />
          <Toaster/>
        </ThemeProvider>
      </TourProvider>
    </ReduxProvider>
  </StrictMode>,
)
