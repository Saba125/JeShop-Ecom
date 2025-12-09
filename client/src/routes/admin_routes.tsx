import ErrorElement from '@/error-element';
import Sales from '@/pages/(store)/(admin)/sales';
import BrandSettings from '@/pages/(store)/(settings)/brands';
import SettingsLayout from '@/pages/(store)/(settings)/layout';
import { lazy } from 'react';
import { createBrowserRouter, Navigate } from 'react-router-dom';
const AdminLayout = lazy(() => import('../pages/(store)/(admin)/layout'));
const AdminDashboard = lazy(() => import('../pages/(store)/(admin)/dashboard'));
const AdminCategories = lazy(() => import('../pages/(store)/(admin)/categories'));
const AdminProducts = lazy(() => import('../pages/(store)/(admin)/products'))
const ClientsPage = lazy(() => import("../pages/(store)/(admin)/users"))
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
                    path: 'clients',
                    element: <ClientsPage />,
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
                    path: 'brands',
                    element: <BrandSettings />,
                },
                {
                    path: 'deals',
                    element: <Sales />,
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
