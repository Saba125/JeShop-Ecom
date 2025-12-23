import { useState } from 'react';
import { Flame, ShoppingCart, Heart, Eye, Clock, Zap, Sparkles, Tag } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { addItemToCart } from '@/store/cartSlice';
import { useDispatch } from 'react-redux';
import { useGetProducts } from '@/api/products/get';
import { API_URL } from '@/constants';
import type { TGetProducts } from '@/types';
import { useNavigate } from 'react-router-dom';

const SaleProductsSection = () => {
    const { data: products, isPending } = useGetProducts();
    const [hoveredId, setHoveredId] = useState<number | null>(null);
    const [favorites, setFavorites] = useState<number[]>([]);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const toggleFavorite = (id: number) => {
        setFavorites((prev) =>
            prev.includes(id) ? prev.filter((fav) => fav !== id) : [...prev, id]
        );
    };

    // Get active sale for a product
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

    const getDiscountPercentage = (product: TGetProducts) => {
        const activeSale = getActiveSale(product);
        const discountedPrice = calculateDiscountedPrice(product);
        if (!discountedPrice || !activeSale) return 0;

        const originalPrice = parseFloat(product.price);
        return Math.round(((originalPrice - discountedPrice) / originalPrice) * 100);
    };

    // Filter products that have active sales
    const saleProducts = products?.filter((product) => getActiveSale(product)) || [];

    if (isPending) {
        return (
            <section className="container mx-auto px-4 py-16">
                <div className="flex items-center justify-center h-64">
                    <div className="text-muted-foreground">იტვირთება...</div>
                </div>
            </section>
        );
    }

    if (saleProducts.length === 0) {
        return null; // Don't show section if no sales
    }

    return (
        <section className="container mx-auto px-4 py-16 relative overflow-hidden">
            {/* Background decoration */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-red-500/5 rounded-full blur-3xl -z-10" />
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-orange-500/5 rounded-full blur-3xl -z-10" />

            {/* Header */}
            <div className="text-center mb-12">
                <div className="inline-flex items-center gap-3 bg-gradient-to-r from-red-500/10 to-orange-500/10 px-6 py-3 rounded-full mb-4">
                    <Flame className="h-6 w-6 text-red-500 animate-pulse" />
                    <span className="text-sm font-semibold text-red-500 uppercase tracking-wider">
                        ცხელი შეთავაზებები
                    </span>
                    <Flame className="h-6 w-6 text-red-500 animate-pulse" />
                </div>
                <h2 className="text-4xl md:text-5xl font-bold mb-3 bg-gradient-to-r from-red-600 to-orange-600 bg-clip-text text-transparent">
                    განსაკუთრებული ფასდაკლებები
                </h2>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                    არ გამოტოვოთ საუკეთესო შეთავაზებები! შეზღუდული დროით მოქმედი ფასდაკლებები
                </p>
            </div>

            {/* Products Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {saleProducts.map((product) => {
                    const activeSale = getActiveSale(product);
                    const discountedPrice = calculateDiscountedPrice(product);
                    const discountDisplay = getDiscountDisplay(product);
                    const discountPercent = getDiscountPercentage(product);
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
                            className="group cursor-pointer relative overflow-hidden border-2 border-red-200 hover:border-red-500 dark:border-red-900 dark:hover:border-red-600 transition-all duration-300 hover:shadow-2xl hover:shadow-red-500/20"
                            onMouseEnter={() => setHoveredId(product.uid)}
                            onMouseLeave={() => setHoveredId(null)}
                        >
                            {/* Image Section */}
                            <div className="relative h-64 bg-gradient-to-br from-red-50 to-orange-50 dark:from-red-950/20 dark:to-orange-950/20 overflow-hidden">
                                {/* Large Discount Badge */}
                                <div className="absolute top-0 left-0 z-10">
                                    <div className="relative">
                                        <div className="absolute inset-0 bg-red-500 blur-xl opacity-50" />
                                        <div className="relative bg-gradient-to-br from-red-500 to-red-600 text-white px-6 py-3 rounded-br-3xl shadow-2xl">
                                            <div className="text-3xl font-black leading-none">
                                                -{discountPercent}%
                                            </div>
                                            <div className="text-xs font-semibold uppercase tracking-wide">
                                                ფასდაკლება
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Sale Type Badge */}
                                {activeSale && (
                                    <div className="absolute top-3 right-3 z-10">
                                        <Badge className="bg-orange-500 text-white shadow-lg animate-pulse">
                                            <Zap className="w-3 h-3 mr-1" />
                                            ახალი ფასდაკლება
                                        </Badge>
                                    </div>
                                )}

                                {/* Action Buttons */}
                                <div
                                    className={`absolute top-16 right-3 z-10 flex flex-col gap-2 transition-all duration-300 ${isHovered ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-4'}`}
                                >
                                    <Button
                                        size="icon"
                                        variant="secondary"
                                        className={`rounded-full shadow-lg ${isFavorite ? 'bg-red-500 text-white hover:bg-red-600' : ''}`}
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            toggleFavorite(product.uid);
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
                                <div className="absolute inset-0 flex items-center justify-center p-4">
                                    {product.image ? (
                                        <img
                                            src={`${API_URL}${product.image}`}
                                            alt={product.name}
                                            className="max-w-full max-h-full object-contain group-hover:scale-110 transition-transform duration-300"
                                        />
                                    ) : (
                                        <ShoppingCart className="w-20 h-20 text-slate-300 dark:text-slate-700" />
                                    )}
                                </div>

                                {/* Gradient Overlay */}
                                <div className="absolute inset-0 bg-gradient-to-t from-red-600/80 via-red-600/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                                {/* Out of Stock Overlay */}
                                {!inStock && (
                                    <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                                        <Badge variant="secondary" className="text-lg px-4 py-2">
                                            არ არის მარაგში
                                        </Badge>
                                    </div>
                                )}
                            </div>

                            <CardContent className="p-5 bg-gradient-to-b from-transparent to-red-50/30 dark:to-red-950/10">
                                {/* Category and Brand */}
                                <div className="flex items-center gap-2 mb-2">
                                    <Badge variant="outline" className="text-xs border-red-200 dark:border-red-800">
                                        {product?.category.name}
                                    </Badge>
                                    {product.brand && (
                                        <Badge variant="outline" className="text-xs border-red-200 dark:border-red-800">
                                            {product.brand.name}
                                        </Badge>
                                    )}
                                </div>

                                {/* Product Name */}
                                <h3 className="font-semibold text-lg mb-3 line-clamp-2 group-hover:text-red-600 dark:group-hover:text-red-400 transition-colors">
                                    {product.name}
                                </h3>

                                {/* Weight/Unit */}
                                <p className="text-xs text-muted-foreground mb-3">
                                    {product.weight} {product.unit.name}
                                </p>

                                {/* Price Section */}
                                <div className="mb-4">
                                    <div className="flex items-center gap-3 mb-1">
                                        <span className="text-3xl font-black text-red-600 dark:text-red-500">
                                            {discountedPrice?.toFixed(2)}₾
                                        </span>
                                        <span className="text-lg text-muted-foreground line-through">
                                            {originalPrice.toFixed(2)}₾
                                        </span>
                                    </div>
                                    <div className="flex items-center gap-2 text-xs">
                                        <Tag className="w-3 h-3 text-green-600" />
                                        <span className="text-green-600 dark:text-green-500 font-semibold">
                                            დაზოგე {(originalPrice - (discountedPrice || 0)).toFixed(2)}₾
                                        </span>
                                    </div>
                                </div>

                                {/* Add to Cart Button */}
                                <Button
                                    className="w-full bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white shadow-lg shadow-red-500/30 group/btn relative overflow-hidden"
                                    size="lg"
                                    disabled={!inStock}
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        if (inStock) {
                                            dispatch(
                                                addItemToCart({
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
                                        }
                                    }}
                                >
                                    <span className="relative z-10 flex items-center justify-center gap-2">
                                        <ShoppingCart className="w-4 h-4" />
                                        {inStock ? (
                                            <span className="font-semibold">კალათაში დამატება</span>
                                        ) : (
                                            <span>არ არის მარაგში</span>
                                        )}
                                    </span>
                                    <div className="absolute inset-0 bg-white/20 translate-y-full group-hover/btn:translate-y-0 transition-transform duration-300" />
                                </Button>

                                {/* Limited Time Notice */}
                                <div
                                    className={`mt-3 pt-3 border-t border-red-200 dark:border-red-800 transition-all duration-300 overflow-hidden ${isHovered ? 'max-h-20 opacity-100' : 'max-h-0 opacity-0'}`}
                                >
                                    <div className="flex items-center gap-2 text-xs text-red-600 dark:text-red-400 font-medium">
                                        <Clock className="w-3 h-3 animate-pulse" />
                                        <span>შეზღუდული დროით!</span>
                                    </div>
                                    <p className="text-xs text-muted-foreground mt-1">
                                        ✓ უფასო მიწოდება • ✓ სწრაფი გაფორმება
                                    </p>
                                </div>
                            </CardContent>

                            {/* Sparkle effect on hover */}
                            <div className="absolute top-4 right-4 pointer-events-none">
                                <Sparkles
                                    className={`w-6 h-6 text-yellow-500 transition-all duration-300 ${isHovered ? 'opacity-100 scale-100' : 'opacity-0 scale-0'}`}
                                />
                            </div>
                        </Card>
                    );
                })}
            </div>

            {/* Bottom CTA */}
            <div className="mt-12 text-center">
                <div className="inline-flex items-center gap-2 text-sm text-muted-foreground">
                    <Clock className="w-4 h-4" />
                    <span>ფასდაკლებები მოქმედებს შეზღუდული დროით</span>
                </div>
            </div>
        </section>
    );
};

export default SaleProductsSection;