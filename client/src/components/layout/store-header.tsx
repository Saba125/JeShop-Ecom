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

<<<<<<< HEAD
=======
    // Mock data
    const cartItems = 9;
    const cartTotal = 0.0;

>>>>>>> 28c16ba (საბა: მც)
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
<<<<<<< HEAD
                            href="tel:571134844"
                            className="text-sm font-semibold text-[#006FEAFF] hover:underline leading-tight"
                        >
                            571 13 48 44
=======
                            href="tel:599093209"
                            className="text-sm font-semibold text-pink-500 hover:underline leading-tight"
                        >
                            599 09 32 09
                        </a>
                        <a
                            href="tel:595094209"
                            className="text-sm font-semibold text-pink-500 hover:underline leading-tight"
                        >
                        <a
                            href="tel:595094209"
                            className="text-sm font-semibold text-pink-500 hover:underline leading-tight"
                        >
                            595 09 42 09
>>>>>>> 28c16ba (საბა: მც)
                        </a>
                    </div>
                </CFlex>

<<<<<<< HEAD
                {/* Profile Section */}
                <ProfileSection />

                {/* Cart Section */}
                <Cart />
=======
                {/* User Section */}
                <CFlex align="center" gap="10px">
                    {user.uid ? (
                        <CAvatar />
                    ) : (
                        <>
                            <User className="w-7 h-7" strokeWidth={1.5} />
                            <div className="flex flex-col">
                                <span className="text-xs text-gray-500">პროფილი</span>
                                <button
                                    onClick={() => navigate('/auth/login')}
                                    className="text-sm font-semibold hover:underline text-left"
                                >
                                    ავტორიზაცია
                                </button>
                            </div>
                        </>
                    )}
                    {user.uid ? (
                        <CAvatar />
                    ) : (
                        <>
                            <User className="w-7 h-7" strokeWidth={1.5} />
                            <div className="flex flex-col">
                                <span className="text-xs text-gray-500">პროფილი</span>
                                <button
                                    onClick={() => navigate('/auth/login')}
                                    className="text-sm font-semibold hover:underline text-left"
                                >
                                    ავტორიზაცია
                                </button>
                            </div>
                        </>
                    )}
                </CFlex>

                {/* Cart Section */}
                <CFlex align="center" gap="10px" className="relative">
                    <div className="relative">
                        <ShoppingCart className="w-7 h-7" strokeWidth={1.5} />
                        <span className="absolute -top-2 -right-2 bg-pink-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                            {cartItems}
                        </span>
                    </div>
                    <div className="flex flex-col">
                        <span className="text-xs text-gray-500">კალათა</span>
                        <span className="text-sm font-semibold">{cartTotal.toFixed(2)} ₾</span>
                        <span className="text-sm font-semibold">{cartTotal.toFixed(2)} ₾</span>
                    </div>
                </CFlex>
>>>>>>> 28c16ba (საბა: მც)
            </CFlex>
        </div>
    );
};

export default StoreHeader;

