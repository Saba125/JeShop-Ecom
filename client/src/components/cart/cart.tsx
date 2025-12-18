import CFlex from '../ui/flex';
import { ShoppingCart } from 'lucide-react';
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetDescription,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from '@/components/ui/sheet';
import type { RootState } from '@/store/store';
import { useSelector } from 'react-redux';
const Cart = () => {
    const cart = useSelector((state: RootState) => state.cart);
    console.log(cart)
    const cartItems = cart.products.reduce((total, item) => total + item.quantity, 0);
    const cartTotal = cart.products.reduce((total, item) => total + (item.new_price * item.quantity), 0);
    return (
        <Sheet>
            <SheetTrigger>
                <CFlex align="center" gap="10px" className="relative group cursor-pointer">
                    <div className="relative transition-all duration-300">
                        <ShoppingCart
                            className="w-7 h-7 group-hover:text-[#006FEAFF] transition-colors duration-300"
                            strokeWidth={1.5}
                        />
                        <span className="absolute -top-2 -right-2 bg-[#006FEAFF] text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                            {cartItems}
                        </span>
                    </div>
                    <div className="flex flex-col transition-all duration-300">
                        <span className="text-xs text-gray-500 group-hover:text-[#006FEAFF] transition-colors duration-300">
                            კალათა
                        </span>
                        <span className="text-sm font-semibold group-hover:text-[#006FEAFF] transition-colors duration-300">
                            {cartTotal.toFixed(2)} ₾
                        </span>
                    </div>
                </CFlex>
            </SheetTrigger>
            <SheetContent side="right" className="w-full max-w-md">
                <SheetHeader>
                    <SheetTitle>კალათა</SheetTitle>
                    <SheetDescription>თქვენი არჩეული პროდუქტები</SheetDescription>
                </SheetHeader>
                {/* Cart items would be listed here */}
                <SheetFooter>
                    <SheetClose asChild>
                        <button className="w-full py-3 bg-[#006FEAFF] text-white font-semibold rounded-md hover:bg-[#0056cc] transition-colors">
                            გადახდა
                        </button>
                    </SheetClose>
                </SheetFooter>
            </SheetContent>
        </Sheet>
    );
};

export default Cart;
