import React from 'react';
import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom';
import AuthLayout from './pages/(auth)/layout';
import SignIn from './pages/(auth)/sign-in';
import SignUp from './pages/(auth)/sign-up';
const router = createBrowserRouter([
    {
        path: '/auth',
        element: <AuthLayout />,
        children: [
            {
                index: true, // when visiting just "/auth"
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
]);

const PageRouter = () => {
    return <RouterProvider router={router} />;
};

export default PageRouter;
