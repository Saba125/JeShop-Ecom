import { Outlet, useLocation } from 'react-router-dom';
import { SidebarProvider } from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/layout/app-sidebar';
import StoreHeader from '@/components/layout/store-header';
import Footer from '@/components/common/footer-section';
import sidebarItems from '@/lib/sidebar-items';
import clsx from 'clsx';
const StoreLayout = () => {
    const location = useLocation();
    const currentPath = location.pathname;

    const normalized = currentPath.startsWith('/') ? currentPath : `/${currentPath}`;
    return (
        <>
            <SidebarProvider>
                <AppSidebar sidebarItems={sidebarItems.clientSidebarItems} />
                <main className="min-h-screen w-full">
                    <StoreHeader />
                    <div
                        className={clsx(
                            'pt-[75px]',
                            normalized.startsWith('/products') ? 'px-0' : 'px-[20px]'
                        )}
                    >
                        <Outlet />
                    </div>
                </main>
            </SidebarProvider>
            <div className="md:ml-[256px]">
                <Footer />
            </div>
        </>
    );
};

export default StoreLayout;
