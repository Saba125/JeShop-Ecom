import ErrorElement from '@/error-element';
import SettingsLayout from '@/pages/(store)/(settings)/layout';
import { lazy } from 'react';
import { createBrowserRouter, Navigate } from 'react-router-dom';
const AdminLayout = lazy(() => import('../pages/(store)/(admin)/layout'));
const AdminDashboard = lazy(() => import('../pages/(store)/(admin)/dashboard'));
const AdminCategories = lazy(() => import('../pages/(store)/(admin)/categories'));
const AdminProducts = lazy(() => import('../pages/(store)/(admin)/products'))
const AdminRoutes = () => {
    const adminRoutes = [
        {
            path: "/",
            element: <Navigate  to="/admin/dashboard" replace/>
        },
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
    return createBrowserRouter(adminRoutes);
};

export default AdminRoutes;
