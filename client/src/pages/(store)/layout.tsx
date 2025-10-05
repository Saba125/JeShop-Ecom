import React from 'react';
import { Outlet } from 'react-router-dom';
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/layout/app-sidebar';
const StoreLayout = () => {
    return (
       <SidebarProvider>
        <AppSidebar />
        <main>
            <Outlet />
        </main>
       </SidebarProvider>
    );
};

export default StoreLayout;
