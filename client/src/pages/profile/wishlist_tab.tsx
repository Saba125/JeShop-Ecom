import CPagination from '@/components/common/custom-pagination';
import { Button } from '@/components/ui/button';
import { FloatingButton } from '@/components/ui/floating-button';
import { API_URL } from '@/constants';
import { addItemToCart } from '@/store/cartSlice';
import { removeItemFromWishlist } from '@/store/wishListSlice';
import type { CartItems, WishlistItems } from '@/types';
import { ShoppingCart, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

interface WishlistTabProps {
    wishlist: CartItems[];
}

const ITEMS_PER_PAGE = 5;

const WishlistTab = ({ wishlist }: WishlistTabProps) => {
    const dispatch = useDispatch();
    const [page, setPage] = useState(1);

    const totalPages = Math.ceil(wishlist.length / ITEMS_PER_PAGE);

    const paginatedWishlist = wishlist.slice(
        (page - 1) * ITEMS_PER_PAGE,
        page * ITEMS_PER_PAGE
    );

    useEffect(() => {
        if (page > totalPages) {
            setPage(totalPages || 1);
        }
    }, [wishlist]);

    const handleAddToCart = (item: CartItems) => {
        dispatch(addItemToCart(item));
    };

    const handleRemove = (product: WishlistItems) => {
        dispatch(removeItemFromWishlist(product));
    };

    const handleAddAll = () => {
        wishlist.forEach((item) => dispatch(addItemToCart(item)));
    };

    return (
        <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-100 dark:border-slate-800 shadow-sm text-center">
            
            {paginatedWishlist.map((item) => (
                <div
                    key={item.product_uid}
                    className="border-b last:border-b-0 hover:bg-gray-50 transition-colors"
                >
                    {/* Desktop */}
                    <div className="hidden md:grid grid-cols-12 gap-4 p-4 items-center">
                        <div className="col-span-5 flex items-center gap-4">
                            <button
                                onClick={() => handleRemove(item)}
                                className="text-gray-400 hover:text-red-500 transition-colors"
                            >
                                <X className="w-5 h-5" />
                            </button>

                            <div className="w-20 h-20 bg-gray-100 rounded-lg overflow-hidden">
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

                            <h3 className="font-semibold text-gray-900">
                                {item.product_name}
                            </h3>
                        </div>

                        <div className="col-span-2 text-center">
                            <span className="text-lg font-bold text-primary">
                                {item.new_price.toFixed(2)} ₾
                            </span>
                        </div>

                        <div className="col-span-2 text-center">
                            <span
                                className={`text-sm font-medium ${
                                    item.stock > 0 ? 'text-green-600' : 'text-red-600'
                                }`}
                            >
                                {item.stock > 0
                                    ? `${item.stock} ერთეული`
                                    : 'არ არის მარაგში'}
                            </span>
                        </div>

                        <div className="col-span-2 flex justify-end">
                            <Button
                                onClick={() => handleAddToCart(item)}
                                disabled={item.stock === 0}
                            >
                                კალათაში დამატება
                            </Button>
                        </div>
                    </div>

                    {/* Mobile */}
                    <div className="flex md:hidden gap-3 p-4">
                        <div className="w-20 h-20 bg-gray-100 rounded-lg overflow-hidden">
                            {item.product_image ? (
                                <img
                                    src={`${API_URL}${item.product_image}`}
                                    alt={item.product_name}
                                    className="w-full h-full object-cover"
                                />
                            ) : (
                                <ShoppingCart className="w-8 h-8 text-gray-300 m-auto" />
                            )}
                        </div>

                        <div className="flex-1">
                            <div className="flex justify-between">
                                <h3 className="text-sm font-semibold">
                                    {item.product_name}
                                </h3>
                                <button onClick={() => handleRemove(item)}>
                                    <X className="w-4 h-4" />
                                </button>
                            </div>

                            <span className="text-primary font-bold">
                                {item.new_price.toFixed(2)} ₾
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

            {/* Add all */}
            {wishlist.length > 1 && (
                <FloatingButton
                    onClick={handleAddAll}
                    label="კალათაში დამატება"
                />
            )}

            {/* Pagination */}
            {totalPages > 1 && (
                <div className="p-4 flex justify-center">
                    <CPagination
                        page={page}
                        setPage={setPage}
                        totalPages={totalPages}
                        // onPageChange={setPage}
                    />
                </div>
            )}
        </div>
    );
};

export default WishlistTab;