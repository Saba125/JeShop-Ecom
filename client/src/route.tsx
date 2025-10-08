import React, { useMemo } from 'react';
import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom';
import AuthLayout from './pages/(auth)/layout';
import SignIn from './pages/(auth)/sign-in';
import SignUp from './pages/(auth)/sign-up';
import StoreLayout from './pages/(store)/layout';
import MainPage from './pages/(store)';
import { useCurrentUser } from './api/users/info';
import AdminLayout from './pages/(store)/(admin)';
import { useSelector } from 'react-redux';
import type { RootState } from './store/store';

// Admin Imports

const PageRouter = () => {
    const user = useSelector((state: RootState) => state.user);
    const router = useMemo(() => {
        const userRoutes = [
            {
                path: '/auth',
                element: <AuthLayout />,
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
            {
                path: '/',
                element: <StoreLayout />,
                children: [
                    {
                        path: '/',
                        element: <MainPage />,
                    },
                ],
            },
        ];

        const adminRoutes = [
            {
                path: '/admin',
                element: <AdminLayout />,
                children: [
                    {
                        index: true,
                        element: <Navigate to="/admin/dashboard" replace />,
                    },
                ],
            },
        ];
        console.log(user)
        // Only include admin routes if user is admin
        const routes = user?.user_type === 1 ? [...userRoutes, ...adminRoutes] : userRoutes;
        console.log(routes)
        return createBrowserRouter(routes);
    }, [user?.user_type]);

    return <RouterProvider router={router} />;
};

export default PageRouter;
