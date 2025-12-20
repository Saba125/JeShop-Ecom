import CFlex from '../ui/flex';
import { ShoppingCart, Plus, Minus, Trash2, X } from 'lucide-react';
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
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import type { RootState } from '@/store/store';
import { useSelector, useDispatch } from 'react-redux';
import { API_URL } from '@/constants';
import { ScrollArea } from '@/components/ui/scroll-area';

const Cart = () => {
    const cart = useSelector((state: RootState) => state.cart);
    const dispatch = useDispatch();
    
    const cartItems = cart.products.reduce((total, item) => total + item.quantity, 0);
    const cartTotal = cart.products.reduce((total, item) => total + (item.new_price * item.quantity), 0);
    const cartSavings = cart.products.reduce((total, item) => {
        if (item.has_sale && item.old_price) {
            return total + ((item.old_price - item.new_price) * item.quantity);
        }
        return total;
    }, 0);

    const handleQuantityChange = (productUid: number, newQuantity: number) => {
        if (newQuantity > 0) {
            // dispatch(updateItemQuantity({ product_uid: productUid, quantity: newQuantity }));
        }
    };

    const handleRemoveItem = (productUid: number) => {
        // dispatch(removeItemFromCart(productUid));
    };

    return (
        <Sheet>
            <SheetTrigger>
                <CFlex align="center" gap="10px" className="relative group cursor-pointer">
                    <div className="relative transition-all duration-300">
                        <ShoppingCart
                            className="w-7 h-7 group-hover:text-[#006FEAFF] transition-colors duration-300"
                            strokeWidth={1.5}
                        />
                        {cartItems > 0 && (
                            <span className="absolute -top-2 -right-2 bg-[#006FEAFF] text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center animate-pulse">
                                {cartItems}
                            </span>
                        )}
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
            
            <SheetContent side="right" className="w-full max-w-md flex flex-col p-0">
                <SheetHeader className="px-6 pt-6 pb-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <SheetTitle className="text-2xl">კალათა</SheetTitle>
                            <SheetDescription>
                                {cartItems > 0 ? `${cartItems} პროდუქტი` : 'თქვენი კალათა ცარიელია'}
                            </SheetDescription>
                        </div>
                        {cartSavings > 0 && (
                            <Badge className="bg-green-500 text-white">
                                დაზოგე: {cartSavings.toFixed(2)}₾
                            </Badge>
                        )}
                    </div>
                </SheetHeader>

                <Separator />

                {/* Cart Items List */}
                <ScrollArea className="flex-1 px-6">
                    {cart.products.length === 0 ? (
                        <div className="flex flex-col items-center justify-center h-64 text-center">
                            <ShoppingCart className="w-20 h-20 text-gray-300 mb-4" />
                            <p className="text-gray-500 text-lg">თქვენი კალათა ცარიელია</p>
                            <p className="text-gray-400 text-sm mt-2">დაამატეთ პროდუქტები კალათაში</p>
                        </div>
                    ) : (
                        <div className="space-y-4 py-4">
                            {cart.products.map((item) => (
                                <div
                                    key={item.product_uid}
                                    className="flex gap-4 p-3 rounded-lg border hover:border-[#006FEAFF] transition-all duration-200 relative group"
                                >
                                    {/* Remove Button */}
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        className="absolute -top-2 -right-2 h-6 w-6 rounded-full bg-red-500 text-white hover:bg-red-600 opacity-0 group-hover:opacity-100 transition-opacity"
                                        onClick={() => handleRemoveItem(item.product_uid)}
                                    >
                                        <X className="h-3 w-3" />
                                    </Button>

                                    {/* Product Image */}
                                    <div className="flex-shrink-0 w-20 h-20 bg-gray-100 rounded-md overflow-hidden">
                                        {item.product_image ? (
                                            <img
                                                src={`${API_URL}${item.product_image}`}
                                                alt={item.product_name}
                                                className="w-full h-full object-cover"
                                            />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center">
                                                <ShoppingCart className="w-8 h-8 text-gray-300" />
                                            </div>
                                        )}
                                    </div>

                                    {/* Product Details */}
                                    <div className="flex-1 min-w-0">
                                        <h4 className="font-semibold text-sm line-clamp-2 mb-1">
                                            {item.product_name}
                                        </h4>
                                        
                                        {/* Price */}
                                        <div className="flex items-center gap-2 mb-2">
                                            <span className="text-lg font-bold text-[#006FEAFF]">
                                                {item.new_price.toFixed(2)}₾
                                            </span>
                                            {item.has_sale && item.old_price && (
                                                <>
                                                    <span className="text-xs text-gray-400 line-through">
                                                        {item.old_price.toFixed(2)}₾
                                                    </span>
                                                    <Badge variant="destructive" className="text-xs px-1 py-0">
                                                        -{((item.old_price - item.new_price) / item.old_price * 100).toFixed(0)}%
                                                    </Badge>
                                                </>
                                            )}
                                        </div>

                                        {/* Quantity Controls */}
                                        <div className="flex items-center gap-2">
                                            <Button
                                                variant="outline"
                                                size="icon"
                                                className="h-7 w-7"
                                                onClick={() => handleQuantityChange(item.product_uid, item.quantity - 1)}
                                                disabled={item.quantity <= 1}
                                            >
                                                <Minus className="h-3 w-3" />
                                            </Button>
                                            <span className="w-8 text-center font-semibold">
                                                {item.quantity}
                                            </span>
                                            <Button
                                                variant="outline"
                                                size="icon"
                                                className="h-7 w-7"
                                                onClick={() => handleQuantityChange(item.product_uid, item.quantity + 1)}
                                                disabled={item.quantity >= item.stock}
                                            >
                                                <Plus className="h-3 w-3" />
                                            </Button>
                                            <span className="text-xs text-gray-500 ml-2">
                                                მარაგში: {item.stock}
                                            </span>
                                        </div>

                                        {/* Subtotal */}
                                        <div className="mt-2 text-right">
                                            <span className="text-sm text-gray-600">
                                                ჯამი: <span className="font-semibold">{(item.new_price * item.quantity).toFixed(2)}₾</span>
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </ScrollArea>

                {/* Footer with Total and Checkout */}
                {cart.products.length > 0 && (
                    <>
                        <Separator />
                        <div className="px-6 py-4 space-y-4">
                            {/* Subtotal Breakdown */}
                            <div className="space-y-2">
                                <div className="flex justify-between text-sm">
                                    <span className="text-gray-600">შუალედური ჯამი:</span>
                                    <span className="font-semibold">{cartTotal.toFixed(2)}₾</span>
                                </div>
                                {cartSavings > 0 && (
                                    <div className="flex justify-between text-sm text-green-600">
                                        <span>თქვენ დაზოგეთ:</span>
                                        <span className="font-semibold">-{cartSavings.toFixed(2)}₾</span>
                                    </div>
                                )}
                                <Separator />
                                <div className="flex justify-between text-lg font-bold">
                                    <span>სულ:</span>
                                    <span className="text-[#006FEAFF]">{cartTotal.toFixed(2)}₾</span>
                                </div>
                            </div>

                            {/* Checkout Button */}
                            <SheetClose asChild>
                                <Button
                                    className="w-full py-6 bg-[#006FEAFF] text-white font-semibold rounded-md hover:bg-[#0056cc] transition-colors text-lg"
                                >
                                    <ShoppingCart className="w-5 h-5 mr-2" />
                                    გადახდა
                                </Button>
                            </SheetClose>

                            {/* Free Shipping Notice */}
                            <p className="text-xs text-center text-gray-500">
                                ✓ უფასო მიწოდება 100₾-ზე მეტი შეძენისას
                            </p>
                        </div>
                    </>
                )}
            </SheetContent>
        </Sheet>
    );
};

export default Cart;