import { useState } from 'react';
import {
    TrendingUp,
    ShoppingCart,
    Heart,
    Eye,
    Sparkles,
    ComputerIcon,
    ArrowRight,
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { addItemToCart } from '@/store/cartSlice';
import { addItemToWishlist } from '@/store/wishListSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useGetProducts } from '@/api/products/get';
import { API_URL } from '@/constants';
import type { TGetProducts } from '@/types';
import { useNavigate } from 'react-router-dom';
import type { RootState } from '@/store/store';
const FeaturedProductsSection = () => {
    const { data: products, isPending } = useGetProducts();
    const [hoveredId, setHoveredId] = useState<number | null>(null);
    const [favorites, setFavorites] = useState<number[]>([]);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const toggleFavorite = (product: TGetProducts) => {
        const discountedPrice = calculateDiscountedPrice(product);
        const activeSale = getActiveSale(product);
        const originalPrice = parseFloat(product.price);
        setFavorites((prev) =>
            prev.includes(product.uid)
                ? prev.filter((fav) => fav !== product.uid)
                : [...prev, product.uid]
        );
        dispatch(
            addItemToWishlist({
                product_uid: product.uid,
                product_image: product.image || '',
                has_sale: !!activeSale,
                new_price: discountedPrice || originalPrice,
                old_price: discountedPrice ? originalPrice : null,
                product_name: product.name,
                quantity: 1,
                stock: product.stock,
            })
        );
    };

    const getActiveSale = (product: TGetProducts) => {
        return product.sales_items?.find((sale) => sale.is_active === 1);
    };

    const calculateDiscountedPrice = (product: TGetProducts) => {
        const activeSale = getActiveSale(product);
        if (!activeSale) return null;

        const price = parseFloat(product.price);
        if (activeSale.type === 1) {
            return price - (price * activeSale.amount) / 100;
        } else if (activeSale.type === 2) {
            return price - activeSale.amount;
        }
        return null;
    };

    const getDiscountDisplay = (product: TGetProducts) => {
        const activeSale = getActiveSale(product);
        if (!activeSale) return null;

        if (activeSale.type === 1) {
            return `${activeSale.amount}%`;
        } else if (activeSale.type === 2) {
            return `${activeSale.amount}₾`;
        }
        return null;
    };

    if (isPending) {
        return (
            <section className="container mx-auto px-4 py-16">
                <div className="flex items-center justify-center h-64">
                    <div className="text-muted-foreground">იტვირთება...</div>
                </div>
            </section>
        );
    }

    return (
        <section className="container mx-auto px-4 py-16">
            <div className="flex items-center justify-between mb-8">
                <div className="flex-1">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="p-2 bg-cyan-50 rounded-lg">
                            <ComputerIcon className="h-6 w-6 text-[#0083EF]" />
                        </div>
                        <h2 className="text-3xl font-bold">რჩეული პროდუქტები</h2>
                    </div>
                    {/* Gradient underline */}
                    <div className="h-0.5 w-[50%] bg-gradient-to-r from-[#0083EF] to-transparent"></div>
                    <p className="text-muted-foreground mt-4">
                        {' '}
                        აღმოაჩინეთ ჩვენი საუკეთესო შეთავაზებები
                    </p>
                </div>
                <Button variant="ghost">
                    ყველას ნახვა <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {products?.map((product) => {
                    const activeSale = getActiveSale(product);
                    const discountedPrice = calculateDiscountedPrice(product);
                    const discountDisplay = getDiscountDisplay(product);
                    const isHovered = hoveredId === product.uid;
                    const isFavorite = favorites.includes(product.uid);
                    const inStock = product.stock > 0;
                    const originalPrice = parseFloat(product.price);

                    return (
                        <Card
                            key={product.uid}
                            onClick={() => {
                                const pLink = product.name
                                    .toLowerCase()
                                    .trim()
                                    .replace(/\s+/g, '-');

                                navigate(`/product/${pLink}/${product.uid}`);
                            }}
                            className="group cursor-pointer relative overflow-hidden border-2 hover:border-primary/50 transition-all duration-300 hover:shadow-2xl"
                            onMouseEnter={() => setHoveredId(product.uid)}
                            onMouseLeave={() => setHoveredId(null)}
                        >
                            {/* Image Section */}
                            <div className="relative h-72 bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-900 overflow-hidden">
                                {/* Badges */}
                                <div className="absolute top-3 left-3 z-10 flex flex-col gap-2">
                                    {activeSale && discountDisplay && (
                                        <Badge className="bg-red-500 text-white shadow-lg">
                                            <Sparkles className="w-3 h-3 mr-1" />-{discountDisplay}
                                        </Badge>
                                    )}
                                    {!inStock && (
                                        <Badge className="bg-slate-500 text-white shadow-lg">
                                            ამოიწურა
                                        </Badge>
                                    )}
                                </div>
                                {/* Action Buttons */}
                                <div
                                    className={`absolute top-3 right-3 z-10 flex flex-col gap-2 transition-all duration-300 ${isHovered ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-4'}`}
                                >
                                    <Button
                                        size="icon"
                                        variant="secondary"
                                        className={`rounded-full shadow-lg ${isFavorite ? 'bg-red-500 text-white hover:bg-red-600' : ''}`}
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            toggleFavorite(product);
                                        }}
                                    >
                                        <Heart
                                            className={`w-4 h-4 ${isFavorite ? 'fill-current' : ''}`}
                                        />
                                    </Button>
                                    <Button
                                        size="icon"
                                        variant="secondary"
                                        className="rounded-full shadow-lg"
                                    >
                                        <Eye className="w-4 h-4" />
                                    </Button>
                                </div>
                                {/* Product Image */}
                                <div className="absolute inset-0 flex items-center justify-center">
                                    {product.image ? (
                                        <img
                                            src={`${API_URL}${product.image}`}
                                            alt={product.name}
                                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                                        />
                                    ) : (
                                        <ShoppingCart className="w-20 h-20 text-slate-300 dark:text-slate-700" />
                                    )}
                                </div>
                                {/* Gradient Overlay */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                                {!inStock && (
                                    <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                                        <Badge variant="secondary" className="text-lg px-4 py-2">
                                            არ არის მარაგში
                                        </Badge>
                                    </div>
                                )}
                            </div>

                            <CardContent className="p-5">
                                {/* Category and Brand */}
                                <div className="flex items-center gap-2 mb-2">
                                    <Badge variant="outline" className="text-xs">
                                        {product?.category.name}
                                    </Badge>
                                    {product.brand && (
                                        <Badge variant="outline" className="text-xs">
                                            {product.brand.name}
                                        </Badge>
                                    )}
                                </div>

                                {/* Product Name */}
                                <h3 className="font-semibold text-lg mb-3 line-clamp-2 group-hover:text-primary transition-colors">
                                    {product.name}
                                </h3>

                                {/* Weight/Unit */}
                                <p className="text-xs text-muted-foreground mb-3">
                                    {product.weight} {product.unit.name}
                                </p>

                                {/* Price Section */}
                                <div className="flex items-end gap-2 mb-4">
                                    {discountedPrice ? (
                                        <>
                                            <span className="text-3xl font-bold text-primary">
                                                {discountedPrice.toFixed(2)}₾
                                            </span>
                                            <span className="text-sm text-muted-foreground line-through mb-1">
                                                {originalPrice.toFixed(2)}₾
                                            </span>
                                        </>
                                    ) : (
                                        <span className="text-3xl font-bold text-primary">
                                            {originalPrice.toFixed(2)}₾
                                        </span>
                                    )}
                                </div>

                                {/* Add to Cart Button */}
                                <Button
                                    className="w-full group/btn relative overflow-hidden"
                                    size="lg"
                                    disabled={!inStock}
                                    onClick={() => {
                                        if (inStock) {
                                            dispatch(
                                                addItemToCart({
                                                    product_uid: product.uid,
                                                    product_image: product.image || '',
                                                    has_sale: !!activeSale,
                                                    new_price: discountedPrice || originalPrice,
                                                    old_price: discountedPrice
                                                        ? originalPrice
                                                        : null,
                                                    product_name: product.name,
                                                    quantity: 1,
                                                    stock: product.stock,
                                                })
                                            );
                                        }
                                    }}
                                >
                                    <span className="relative z-10 flex items-center justify-center gap-2">
                                        <ShoppingCart className="w-4 h-4" />
                                        {inStock ? (
                                            <span>კალათაში დამატება</span>
                                        ) : (
                                            <span>არ არის მარაგში</span>
                                        )}
                                    </span>
                                    <div className="absolute inset-0 bg-primary-foreground/20 translate-y-full group-hover/btn:translate-y-0 transition-transform duration-300" />
                                </Button>

                                {/* Quick Info on Hover */}
                                <div
                                    className={`mt-3 pt-3 border-t transition-all duration-300 overflow-hidden ${isHovered ? 'max-h-20 opacity-100' : 'max-h-0 opacity-0'}`}
                                >
                                    <p className="text-xs text-muted-foreground">
                                        ✓ უფასო მიწოდება 100₾-ზე მეტი შეძენისას
                                    </p>
                                    <p className="text-xs text-muted-foreground">
                                        ✓ 14 დღიანი დაბრუნების პოლიტიკა
                                    </p>
                                </div>
                            </CardContent>
                        </Card>
                    );
                })}
            </div>
        </section>
    );
};

export default FeaturedProductsSection;
