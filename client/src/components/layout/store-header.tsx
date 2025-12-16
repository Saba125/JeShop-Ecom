import { useSelector } from 'react-redux';
import { CAvatar } from '../common/custom-avatar';
import CFlex from '../ui/flex';
import type { RootState } from '@/store/store';
import { useNavigate } from 'react-router-dom';
import { CButton } from '../common/custom-button';
import { useIsMobile } from '@/hooks/use-mobile';
import { useSidebar } from '../ui/sidebar';
import { Menu, Headphones, User, ShoppingCart } from 'lucide-react';
import { ModeToggle } from '../common/mode-toggle';
import { useTheme } from '@/providers/theme-provider';
import CBreadCrumb from '../common/custom-breadcrumb';
import Cart from '../cart/cart';
import ProfileSection from '../common/profile-section';

const StoreHeader = () => {
    const isMobile = useIsMobile();
    const { toggleSidebar } = useSidebar();
    const { theme } = useTheme();
    const location = window.location.pathname;

    return (
        <div
            className="fixed right-0 top-0 w-full z-10 pl-[275px] px-5 h-[73.5px] border-b flex items-center justify-between"
            style={{ backgroundColor: theme === 'dark' ? '#121212' : '#ffffff' }}
        >
            {location === '/' ? null : <CBreadCrumb />}
            <div>
                {isMobile ? (
                    <CButton onClick={() => toggleSidebar()} variant="outline" icon={Menu} />
                ) : null}
            </div>

            <CFlex align="center" gap="15px">
                <CFlex align="center" gap="10px">
                    <Headphones className="w-7 h-7" strokeWidth={1.5} />
                    <div className="flex flex-col gap-y-1">
                        <span className="text-xs text-gray-500">მხარდაჭერა</span>
                        <a
                            href="tel:599093209"
                            className="text-sm font-semibold text-[#006FEAFF] hover:underline leading-tight"
                        >
                            571 13 48 44
                        </a>
                    </div>
                </CFlex>

                {/* Profile Section */}
                <ProfileSection />

                {/* Cart Section */}
                <Cart />
            </CFlex>
        </div>
    );
};

export default StoreHeader;
