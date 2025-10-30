import Footer from '@/components/common/footer-section';
import { AppSidebar } from '@/components/layout/app-sidebar';
import StoreHeader from '@/components/layout/store-header';
import { SidebarProvider } from '@/components/ui/sidebar';
import { Outlet } from 'react-router-dom';
import sidebarItems from '@/lib/sidebar-items';
('@/lib/sidebar-items');
const AdminLayout = () => {
    return (
        <div>
            <SidebarProvider>
                <AppSidebar sidebarItems={sidebarItems.adminSidebarItems} />
                <main className="min-h-screen w-full">
                    <StoreHeader />
                    <div className='pt-[120px] px-[20px]'>
                        <Outlet />
                    </div>
                </main>
            </SidebarProvider>
            <div className="md:ml-[256px]">
                <Footer />
            </div>
        </div>
    );
};

export default AdminLayout;
