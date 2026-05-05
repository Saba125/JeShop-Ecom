import CPagination from '@/components/common/custom-pagination';
import { Button } from '@/components/ui/button';
import { FloatingButton } from '@/components/ui/floating-button';
import { API_URL } from '@/constants';
import { addItemToCart } from '@/store/cartSlice';
import { removeItemFromWishlist } from '@/store/wishListSlice';
import type { CartItems, WishlistItems } from '@/types';
import { ShoppingCart, X } from 'lucide-react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';

interface WishlistTabProps {
    wishlist: CartItems[];
}
const WishlistTab = ({ wishlist }: WishlistTabProps) => {
    const dispatch = useDispatch();
    const [paginatedWishlist, setPaginatedWishlist] = useState(wishlist)
    const handleAddToCart = (item: any) => {
        dispatch(addItemToCart(item));
    };
    const handleRemove = (product: WishlistItems) => {
        dispatch(removeItemFromWishlist(product));
    };
    const handleAddAll = () => {
        wishlist.forEach((item) => dispatch(addItemToCart(item)));
    };
    const [startingPoint, setStartingPoint] = useState(0);
    const [endingPoint, setEndingPoint] = useState(5);
    const [accumulatedArr, setAccumulatedArr] = useState(wishlist)
    const [page, setPage] = useState(1);
    const handleNext = () => {
        const total = paginatedWishlist.length;
        console.log(accumulatedArr)
        setStartingPoint((prev) => prev + 5);
        setEndingPoint((prev) => prev + 10)
        setAccumulatedArr(wishlist.slice(startingPoint, endingPoint))
    }
    return (
        <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-100 dark:border-slate-800 shadow-sm  text-center">
            {wishlist.slice(startingPoint,endingPoint).map((item) => (
                <div
                    key={item.product_uid}
                    className="border-b last:border-b-0 hover:bg-gray-50 transition-colors"
                >
                    <div className="hidden md:grid grid-cols-12 gap-4 p-4 items-center">
                        <div className="col-span-5 flex items-center gap-4">
                            <button
                                onClick={() => handleRemove(item)}
                                className="text-gray-400 hover:text-red-500 transition-colors"
                            >
                                <X className="w-5 h-5" />
                            </button>
                            <div className="w-20 h-20 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
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
                            <h3 className="font-semibold text-gray-900">{item.product_name}</h3>
                        </div>

                        <div className="col-span-2 text-center">
                            <div className="flex flex-col items-center gap-1">
                                <span className="text-lg font-bold text-primary">
                                    {item.new_price.toFixed(2)} ₾
                                </span>
                                {item.has_sale && item.old_price && (
                                    <span className="text-sm text-gray-400 line-through">
                                        {item.old_price.toFixed(2)} ₾
                                    </span>
                                )}
                            </div>
                        </div>

                        <div className="col-span-2 text-center">
                            <span
                                className={`text-sm font-medium ${
                                    item.stock > 0 ? 'text-green-600' : 'text-red-600'
                                }`}
                            >
                                {item.stock > 0 ? `${item.stock} ერთეული` : 'არ არის მარაგში'}
                            </span>
                        </div>

                        <div className="col-span-2 flex justify-end">
                            <Button
                                // onClick={() => handleAddToCart(item)}
                                disabled={item.stock === 0}
                            >
                                კალათაში დამატება
                            </Button>
                        </div>
                    </div>

                    {/* Mobile layout */}
                    <div className="flex md:hidden gap-3 p-4">
                        {/* Image */}
                        <div className="w-20 h-20 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
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

                        {/* Info */}
                        <div className="flex-1 min-w-0">
                            <div className="flex items-start justify-between gap-2">
                                <h3 className="font-semibold text-gray-900 text-sm leading-tight">
                                    {item.product_name}
                                </h3>
                                <button
                                    // onClick={() => handleRemove(item)}
                                    className="text-gray-400 hover:text-red-500 transition-colors flex-shrink-0"
                                >
                                    <X className="w-4 h-4" />
                                </button>
                            </div>

                            <div className="mt-1 flex items-center gap-2">
                                <span className="text-base font-bold text-primary">
                                    {item.new_price.toFixed(2)} ₾
                                </span>
                                {item.has_sale && item.old_price && (
                                    <span className="text-xs text-gray-400 line-through">
                                        {item.old_price.toFixed(2)} ₾
                                    </span>
                                )}
                            </div>

                            <span
                                className={`text-xs font-medium mt-1 inline-block ${
                                    item.stock > 0 ? 'text-green-600' : 'text-red-600'
                                }`}
                            >
                                {item.stock > 0 ? `${item.stock} ერთეული` : 'არ არის მარაგში'}
                            </span>

                            <div className="mt-2">
                                <Button
                                    size="sm"
                                    className="w-full"
                                    onClick={() => handleAddToCart(item)}
                                    disabled={item.stock === 0}
                                >
                                    კალათაში დამატება
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
            {wishlist.length > 1 && (
                <FloatingButton onClick={handleAddAll} label="კალათაში დამატება" />
            )}
            <Button onClick={handleNext}>Next</Button>
        </div>
    );
};

export default WishlistTab;
