import { useTheme } from '@/providers/theme-provider';
import CFlex from '../ui/flex';
import { ShoppingCart } from 'lucide-react';

const Cart = () => {
    const { theme } = useTheme();
    const cartItems = 9;
    const cartTotal = 0.0;
    return (
        <CFlex align="center" gap="10px" className="relative">
            <div className="relative">
                <ShoppingCart className="w-7 h-7" strokeWidth={1.5} />
                <span className="absolute -top-2 -right-2 bg-[#006FEAFF] text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                    {cartItems}
                </span>
            </div>
            <div className="flex flex-col">
                <span className="text-xs text-gray-500">კალათა</span>
                <span className="text-sm font-semibold">{cartTotal.toFixed(2)} ₾</span>
            </div>
        </CFlex>
    );
};

export default Cart;
