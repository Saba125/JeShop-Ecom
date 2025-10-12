import { useSelector } from 'react-redux';
import { CAvatar } from '../common/custom-avatar';
import CFlex from '../ui/flex';
import type { RootState } from '@/store/store';
import Cart from '../cart/cart';
import { useNavigate } from 'react-router-dom';
import { CButton } from '../common/custom-button';
import { useIsMobile } from '@/hooks/use-mobile';
import { SidebarTrigger, useSidebar } from '../ui/sidebar';
import { Menu } from 'lucide-react';
import { ModeToggle } from '../common/mode-toggle';
import { useTheme } from '@/providers/theme-provider';

const StoreHeader = () => {
    const user = useSelector((state: RootState) => state.user);
    const navigate = useNavigate();
    const isMobile = useIsMobile();
    const { toggleSidebar } = useSidebar();
    const { theme } = useTheme();

    return (
        <div 
            className="fixed right-0 top-0 w-full z-10 px-5 h-[76px] border-b flex items-center justify-between"
            style={{ backgroundColor: theme === 'dark' ? '#121212' : '#ffffff' }}
        >
            <div>
                {isMobile ? (
                    <CButton onClick={() => toggleSidebar()} variant="outline" icon={Menu} />
                ) : null}
            </div>
            <CFlex align="center" gap="15px">
                <ModeToggle />
                <Cart />
                {user.uid ? (
                    <CAvatar />
                ) : (
                    <CButton text="ავტორიზაცია" onClick={() => navigate('/auth/login')} />
                )}
            </CFlex>
        </div>
    );
};

export default StoreHeader;