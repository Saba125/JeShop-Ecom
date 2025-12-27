import type { RootState } from '@/store/store';
import { useSelector, useDispatch } from 'react-redux';
import { Heart, ShoppingCart, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { removeItemFromWishlist } from '@/store/wishListSlice';
import { addItemToCart } from '@/store/cartSlice';
import { API_URL } from '@/constants';
import type { WishlistItems } from '@/types';
const Wishlist = () => {
    const wishlist = useSelector((state: RootState) => state.wishlist.products);
    const dispatch = useDispatch();

    const handleRemove = (product: WishlistItems) => {
        dispatch(removeItemFromWishlist(product));
    };

    const handleAddToCart = (item: any) => {
        dispatch(addItemToCart(item));
    };

    const handleAddAllToCart = () => {
        wishlist.forEach(item => {
            if (item.stock > 0) {
                dispatch(addItemToCart(item));
            }
        });
    };

    const totalValue = wishlist.reduce((sum, item) => sum + item.new_price, 0);

    return (
        <div className="container mx-auto px-4 py-8">
            {/* Header */}
            <h1 className="text-3xl font-bold mb-8">სურვილების სია</h1>

            {/* Empty State */}
            {wishlist.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-20 text-center">
                    <Heart className="w-20 h-20 text-gray-300 mb-4" />
                    <h3 className="text-xl font-semibold mb-2">თქვენი სურვილების სია ცარიელია</h3>
                    <p className="text-muted-foreground mb-6">
                        დაამატეთ პროდუქტები რომლებიც მოგწონთ
                    </p>
                    <Button>
                        <ShoppingCart className="w-4 h-4 mr-2" />
                        დაიწყეთ შოპინგი
                    </Button>
                </div>
            ) : (
                <>
                    {/* Table Header */}
                    <div className="bg-white rounded-lg shadow-sm mb-4">
                        <div className="grid grid-cols-12 gap-4 p-4 text-sm font-semibold text-gray-600 border-b">
                            <div className="col-span-6">დასახელება</div>
                            <div className="col-span-2 text-center">ღირებულება</div>
                            <div className="col-span-2 text-center">მარაგის საუკეთო</div>
                            <div className="col-span-2"></div>
                        </div>

                        {/* Product Rows */}
                        {wishlist.map((item) => (
                            <div
                                key={item.product_uid}
                                className="grid grid-cols-12 gap-4 p-4 items-center border-b last:border-b-0 hover:bg-gray-50 transition-colors"
                            >
                                {/* Remove Button & Image & Name */}
                                <div className="col-span-6 flex items-center gap-4">
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

                                    <div>
                                        <h3 className="font-semibold text-gray-900">
                                            {item.product_name}
                                        </h3>
                                    </div>
                                </div>

                                {/* Price */}
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

                                {/* Stock */}
                                <div className="col-span-2 text-center">
                                    <span className={`text-sm font-medium ${
                                        item.stock > 0 ? 'text-green-600' : 'text-red-600'
                                    }`}>
                                        {item.stock > 0 ? `${item.stock} ერთეული` : 'არ არის მარაგში'}
                                    </span>
                                </div>

                                {/* Add to Cart Button */}
                                <div className="col-span-2 flex justify-end">
                                    <Button
                                        onClick={() => handleAddToCart(item)}
                                        disabled={item.stock === 0}
                                    >
                                        კალათაში დამატება
                                    </Button>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Footer Summary */}
                    <div className="bg-white rounded-lg shadow-sm p-6 flex items-center justify-between">
                        <div className="flex items-center gap-8">
                            <div>
                                <p className="text-sm text-gray-600 mb-1">სულ პროდუქტები</p>
                                <p className="text-2xl font-bold">{wishlist.length}</p>
                            </div>
                            <div className="h-12 w-px bg-gray-200"></div>
                            <div>
                                <p className="text-sm text-gray-600 mb-1">საერთო ღირებულება</p>
                                <p className="text-2xl font-bold text-primary">
                                    {totalValue.toFixed(2)} ₾
                                </p>
                            </div>
                        </div>
                        <Button
                            onClick={handleAddAllToCart}
                            size="lg"
                        >
                            ყველას კალათაში დამატება
                        </Button>
                    </div>
                </>
            )}
        </div>
    );
};

export default Wishlist;