import React from 'react';
import { Outlet } from 'react-router-dom';
import { SidebarProvider } from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/layout/app-sidebar';
import StoreHeader from '@/components/layout/store-header';
import Footer from '@/components/common/footer-section';
import sidebarItems from '@/lib/sidebar-items';
const StoreLayout = () => {
    return (
       <SidebarProvider>
        <AppSidebar sidebarItems={sidebarItems.clientSidebarItems} />
        <main className='min-h-screen w-full'>
            <StoreHeader /> 
            <Outlet />
            <Footer />
        </main>
       </SidebarProvider>
    );
};

export default StoreLayout;
