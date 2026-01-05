import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarFooter,
} from '@/components/ui/sidebar';
import Logo from '../common/logo';
import { type SidebarItems } from '@/lib/sidebar-items';
import { useLocation } from 'react-router-dom';
interface AppSidebarProps {
    sidebarItems: SidebarItems;
}
export function AppSidebar({ sidebarItems }: AppSidebarProps) {
    const location = useLocation();
    const currentPath = location.pathname;

    const mainItems = sidebarItems.slice(0, 1);
    const productCategories = sidebarItems.slice(1, 5);
    const brandAndDeals = sidebarItems.slice(5, 7);
    const userItems = sidebarItems.slice(7, 8);
    const bottomItems = sidebarItems.slice(8);

    const renderMenuItems = (items: typeof sidebarItems, colorClass?: string) => (
        <SidebarMenu>
            {items.map((item) => {
                const isActive = currentPath === item.url;
                console.log(item)
                return (
                    <SidebarMenuItem key={item.title}>
                        <SidebarMenuButton asChild isActive={isActive} className="group">
                            <a
                                href={item.url}
                                className="flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 hover:translate-x-1"
                            >
                                <div
                                    className={`${colorClass || 'text-muted-foreground group-hover:text-primary'} ${isActive ? 'text-primary' : ''} transition-colors`}
                                >
                                    <item.icon className="h-5 w-5" />
                                </div>
                                <span
                                    className={`text-base font-medium ${isActive ? 'text-primary font-semibold' : 'text-foreground'}`}
                                >
                                    {item.title}
                                </span>
                            </a>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                );
            })}
        </SidebarMenu>
    );

    return (
        <Sidebar className="border-r z-60">
            <SidebarHeader className="border-b px-6 py-4">
                <Logo />
            </SidebarHeader>

            <SidebarContent className="px-3 py-4">
                {/* Main */}
                <SidebarGroup>
                    <SidebarGroupContent>{renderMenuItems(mainItems)}</SidebarGroupContent>
                </SidebarGroup>

                {/* Product Categories */}
                <SidebarGroup className="mt-2">
                    <SidebarGroupLabel className="px-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
                        პროდუქტები
                    </SidebarGroupLabel>
                    <SidebarGroupContent>
                        {renderMenuItems(
                            productCategories,
                            'text-blue-600 group-hover:text-blue-700'
                        )}
                    </SidebarGroupContent>
                </SidebarGroup>

                {/* Brands & Deals */}
                <SidebarGroup className="mt-6">
                    <SidebarGroupLabel className="px-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
                        შეთავაზებები
                    </SidebarGroupLabel>
                    <SidebarGroupContent>
                        {renderMenuItems(
                            brandAndDeals,
                            'text-purple-600 group-hover:text-purple-700'
                        )}
                    </SidebarGroupContent>
                    <SidebarGroupContent>
                        {renderMenuItems(userItems, 'text-rose-600 group-hover:text-rose-700')}
                    </SidebarGroupContent>
                </SidebarGroup>

                {/* User Items */}
                <SidebarGroup></SidebarGroup>
            </SidebarContent>

            {/* Footer Items */}
            <SidebarFooter className="border-t px-3 py-4 mt-auto">
                <SidebarGroup>
                    <SidebarGroupContent>
                        {renderMenuItems(bottomItems, 'text-muted-foreground')}
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarFooter>
        </Sidebar>
    );
}
