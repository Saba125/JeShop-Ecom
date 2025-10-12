import { useMemo, lazy } from 'react';
import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom';
import { useSelector } from 'react-redux';
import type { RootState } from './store/store';
// Component
// Client import
const AuthLayout = lazy(() => import('./pages/(auth)/layout'));
const SignIn = lazy(() => import('./pages/(auth)/sign-in'));
const SignUp = lazy(() => import('./pages/(auth)/sign-up'));
const StoreLayout = lazy(() => import('./pages/(store)/(client)/layout'));
const MainPage = lazy(() => import('./pages/(store)/(client)'));
// Admin Imports
const AdminLayout = lazy(() => import('./pages/(store)/(admin)/layout'));
const AdminDashboard = lazy(() => import('./pages/(store)/(admin)/dashboard'));
const AdminCategories = lazy(() => import('./pages/(store)/(admin)/categories'));
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
                path: '/',
                element: <AdminLayout />,
                children: [
                    {
                        index: true,
                        element: <AdminDashboard />,
                    },
                    {
                        path: "admin/categories",
                        element: <AdminCategories />,
                    },
                ],
            },
        ];

        const routes = user?.user_type === 1 ? [...adminRoutes] : userRoutes;
        console.log(routes);
        return createBrowserRouter(routes);
    }, [user?.user_type]);

    return <RouterProvider router={router} />;
};

export default PageRouter;
