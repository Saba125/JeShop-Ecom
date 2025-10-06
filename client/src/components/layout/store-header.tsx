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
const StoreHeader = () => {
    const user = useSelector((state: RootState) => state.user);
    const navigate = useNavigate();
    const isMobile = useIsMobile();
    const { toggleSidebar } = useSidebar();
    return (
        <div className=" w-full px-5 h-[73.69px] border-b flex items-center justify-between">
            <div>
                {isMobile ? (
                    <CButton onClick={() => toggleSidebar()} variant="outline" icon={Menu} />
                ) : null}
            </div>
            <CFlex align="center" gap="15px">
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
