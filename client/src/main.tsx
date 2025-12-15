import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import { ThemeProvider } from './providers/theme-provider.tsx';
import { Provider } from 'react-redux';
import store from '@/store/store.ts';
import { QueryProvider } from './providers/query-provider.tsx';
import { Toaster } from 'sonner';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { CLIENT_ID } from './constants/index.ts';
import Snowfall from 'react-snowfall';
import { Swiper, SwiperSlide } from 'swiper/react';
import "swiper/css"
createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
            <Provider store={store}>
                <QueryProvider>
                    <Toaster />
                    <GoogleOAuthProvider clientId={CLIENT_ID}>
                        <App />
                        <Snowfall
                            color="#838996FF"
                            style={{
                                position: 'fixed',
                                width: '100vw',
                                height: '100vh',
                            }}
                            snowflakeCount={120}
                        />
                    </GoogleOAuthProvider>
                </QueryProvider>
            </Provider>
        </ThemeProvider>
    </StrictMode>
);
