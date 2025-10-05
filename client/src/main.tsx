import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import { ThemeProvider } from './providers/theme-provider.tsx';
import { Provider } from 'react-redux';
import store from '@/store/store.ts';
import { QueryProvider } from './providers/query-provider.tsx';
import { Toaster } from 'sonner';
createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
            <Provider store={store}>
                <QueryProvider>
                    <Toaster  />
                    <App />
                </QueryProvider>
            </Provider>
        </ThemeProvider>
    </StrictMode>
);
