import ErrorElement from '@/error-element';
import React, { lazy } from 'react'
import { createBrowserRouter, Navigate } from 'react-router-dom';
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
}

export default UserRoutes