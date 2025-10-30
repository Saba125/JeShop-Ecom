import { useMemo, lazy, Suspense } from 'react';
import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom';
import { useSelector } from 'react-redux';
import type { RootState } from './store/store';
import AdminProducts from './pages/(store)/(admin)/products';
import Loading from './components/common/loading';
import ErrorElement from './error-element';
import SettingsLayout from './pages/(store)/(settings)/layout';

// Lazy imports
const AuthLayout = lazy(() => import('./pages/(auth)/layout'));
const SignIn = lazy(() => import('./pages/(auth)/sign-in'));
const SignUp = lazy(() => import('./pages/(auth)/sign-up'));
const StoreLayout = lazy(() => import('./pages/(store)/(client)/layout'));
const MainPage = lazy(() => import('./pages/(store)/(client)'));
const AdminLayout = lazy(() => import('./pages/(store)/(admin)/layout'));
const AdminDashboard = lazy(() => import('./pages/(store)/(admin)/dashboard'));
const AdminCategories = lazy(() => import('./pages/(store)/(admin)/categories'));

const PageRouter = () => {
    const user = useSelector((state: RootState) => state.user);

    const router = useMemo(() => {
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

        const adminRoutes = [
            {
                path: '/admin',
                element: <AdminLayout />,
                errorElement: <ErrorElement />,
                children: [
                    {
                        index: true,
                        element: <Navigate to="/admin/dashboard" replace />,
                    },
                    {
                        path: 'dashboard',
                        element: <AdminDashboard />,
                    },
                    {
                        path: 'categories',
                        element: <AdminCategories />,
                    },
                    {
                        path: 'products',
                        element: <AdminProducts />,
                    },
                    {
                        path: 'settings',
                        element: <SettingsLayout />,
                    },
                ],
            },
        ];

        const routes = user?.user_type === 1 ? [...adminRoutes] : userRoutes;
        return createBrowserRouter(routes);
    }, [user?.user_type]);

    return (
        <Suspense>
            <RouterProvider key={user?.user_type ?? 0} router={router} />
        </Suspense>
    );
};

export default PageRouter;
