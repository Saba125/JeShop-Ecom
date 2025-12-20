import ErrorElement from '@/error-element';
import ProductsLayout from '@/pages/(store)/(client)/(products)/layout';
import KeyboardsPage from '@/pages/(store)/(client)/(products)/keyboards';
import { lazy } from 'react';
import { createBrowserRouter, Navigate } from 'react-router-dom';
import ProductDetails from '@/pages/(store)/(client)/(products)/product_details';
const AuthLayout = lazy(() => import('../pages/(auth)/layout'));
const SignIn = lazy(() => import('../pages/(auth)/sign-in'));
const SignUp = lazy(() => import('../pages/(auth)/sign-up'));
const StoreLayout = lazy(() => import('../pages/(store)/(client)/layout'));
const MainPage = lazy(() => import('../pages/(store)/(client)'));
const UserRoutes = () => {
    const userRoutes = [
        {
            path: '/',
            element: <StoreLayout />,
            errorElement: <ErrorElement />,
            children: [
                {
                    path: '/',
                    element: <MainPage />,
                },
                {
                    path: 'products',
                    element: <ProductsLayout />,
                    children: [
                        {
                            path: 'keyboards',
                            element: <KeyboardsPage />,
                        }, 
                    ],
                },
                {
                    path: 'product/:name/:uid',
                    element: <ProductDetails />,
                },
                // For single product page
            ],
        },
        {
            path: '/auth',
            element: <AuthLayout />,
            errorElement: <ErrorElement />,
            children: [
                {
                    index: true,
                    element: <Navigate to="/auth/login" replace />,
                },
                {
                    path: 'login',
                    element: <SignIn />,
                },
                {
                    path: 'register',
                    element: <SignUp />,
                },
            ],
        },
    ];
    return createBrowserRouter(userRoutes);
};

export default UserRoutes;
