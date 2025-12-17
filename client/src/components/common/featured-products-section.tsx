import React, { useState } from 'react';
import { TrendingUp, ShoppingCart, Heart, Eye, Star, Zap, Sparkles } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const featuredProducts = [
    {
        id: 1,
        name: 'Logitech G Pro X Wireless',
        price: 299,
        originalPrice: 349,
        image: null,
        badge: 'ბესტსელერი',
        badgeType: 'bestseller',
        rating: 4.8,
        reviews: 234,
        inStock: true,
    },
    {
        id: 2,
        name: 'Razer BlackWidow V4 Pro',
        price: 259,
        originalPrice: null,
        image: null,
        badge: 'ახალი',
        badgeType: 'new',
        rating: 4.9,
        reviews: 89,
        inStock: true,
    },
    {
        id: 3,
        name: 'SteelSeries Arctis Nova 7',
        price: 179,
        originalPrice: 229,
        image: null,
        badge: 'ფასდაკლება',
        badgeType: 'sale',
        rating: 4.7,
        reviews: 156,
        inStock: false,
    },
];

const FeaturedProductsSection = () => {
    const [hoveredId, setHoveredId] = useState<number | null>(null);
    const [favorites, setFavorites] = useState<number[]>([]);

    const toggleFavorite = (id: number) => {
        setFavorites(prev => 
            prev.includes(id) ? prev.filter(fav => fav !== id) : [...prev, id]
        );
    };

    const calculateDiscount = (price: number, originalPrice: number | null) => {
        if (!originalPrice) return null;
        return Math.round(((originalPrice - price) / originalPrice) * 100);
    };

    const getBadgeStyle = (type: string) => {
        switch (type) {
            case 'bestseller':
                return 'bg-amber-500 text-white hover:bg-amber-600';
            case 'new':
                return 'bg-blue-500 text-white hover:bg-blue-600';
            case 'sale':
                return 'bg-red-500 text-white hover:bg-red-600';
            default:
                return 'bg-slate-500 text-white';
        }
    };

    return (
        <section className="container mx-auto px-4 py-16">
            <div className="flex items-center gap-3 mb-8">
                <div className="p-2 bg-primary/10 rounded-lg">
                    <TrendingUp className="h-6 w-6 text-primary" />
                </div>
                <div>
                    <h2 className="text-3xl font-bold">რჩეული პროდუქტები</h2>
                    <p className="text-sm text-muted-foreground">აღმოაჩინეთ ჩვენი საუკეთესო შეთავაზებები</p>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {featuredProducts.map((product) => {
                    const discount = calculateDiscount(product.price, product.originalPrice);
                    const isHovered = hoveredId === product.id;
                    const isFavorite = favorites.includes(product.id);

                    return (
                        <Card
                            key={product.id}
                            className="group relative overflow-hidden border-2 hover:border-primary/50 transition-all duration-300 hover:shadow-2xl"
                            onMouseEnter={() => setHoveredId(product.id)}
                            onMouseLeave={() => setHoveredId(null)}
                        >
                            {/* Image Section */}
                            <div className="relative h-72 bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-900 overflow-hidden">
                                {/* Badges */}
                                <div className="absolute top-3 left-3 z-10 flex flex-col gap-2">
                                    {product.badge && (
                                        <Badge className={`${getBadgeStyle(product.badgeType)} shadow-lg`}>
                                            {product.badgeType === 'new' && <Sparkles className="w-3 h-3 mr-1" />}
                                            {product.badgeType === 'bestseller' && <Zap className="w-3 h-3 mr-1" />}
                                            {product.badge}
                                        </Badge>
                                    )}
                                    {discount && (
                                        <Badge className="bg-green-500 text-white shadow-lg">
                                            -{discount}%
                                        </Badge>
                                    )}
                                </div>

                                {/* Action Buttons */}
                                <div className={`absolute top-3 right-3 z-10 flex flex-col gap-2 transition-all duration-300 ${isHovered ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-4'}`}>
                                    <Button
                                        size="icon"
                                        variant="secondary"
                                        className={`rounded-full shadow-lg ${isFavorite ? 'bg-red-500 text-white hover:bg-red-600' : ''}`}
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            toggleFavorite(product.id);
                                        }}
                                    >
                                        <Heart className={`w-4 h-4 ${isFavorite ? 'fill-current' : ''}`} />
                                    </Button>
                                    <Button
                                        size="icon"
                                        variant="secondary"
                                        className="rounded-full shadow-lg"
                                    >
                                        <Eye className="w-4 h-4" />
                                    </Button>
                                </div>

                                {/* Product Image Placeholder */}
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <ShoppingCart className="w-20 h-20 text-slate-300 dark:text-slate-700" />
                                </div>

                                {/* Gradient Overlay */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                                {/* Stock Status */}
                                {!product.inStock && (
                                    <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                                        <Badge variant="secondary" className="text-lg px-4 py-2">
                                            არ არის მარაგში
                                        </Badge>
                                    </div>
                                )}
                            </div>

                            {/* Content Section */}
                            <CardContent className="p-5">
                                {/* Rating */}
                                <div className="flex items-center gap-2 mb-2">
                                    <div className="flex items-center gap-1">
                                        <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                                        <span className="text-sm font-semibold">{product.rating}</span>
                                    </div>
                                    <span className="text-xs text-muted-foreground">
                                        ({product.reviews} მიმოხილვა)
                                    </span>
                                </div>

                                {/* Product Name */}
                                <h3 className="font-semibold text-lg mb-3 line-clamp-2 group-hover:text-primary transition-colors">
                                    {product.name}
                                </h3>

                                {/* Price Section */}
                                <div className="flex items-end gap-2 mb-4">
                                    <span className="text-3xl font-bold text-primary">
                                        {product.price}₾
                                    </span>
                                    {product.originalPrice && (
                                        <span className="text-sm text-muted-foreground line-through mb-1">
                                            {product.originalPrice}₾
                                        </span>
                                    )}
                                </div>

                                {/* Add to Cart Button */}
                                <Button 
                                    className="w-full group/btn relative overflow-hidden"
                                    size="lg"
                                    disabled={!product.inStock}
                                >
                                    <span className="relative z-10 flex items-center justify-center gap-2">
                                        <ShoppingCart className="w-4 h-4" />
                                        {product.inStock ? 'კალათაში დამატება' : 'არ არის მარაგში'}
                                    </span>
                                    <div className="absolute inset-0 bg-primary-foreground/20 translate-y-full group-hover/btn:translate-y-0 transition-transform duration-300" />
                                </Button>

                                {/* Quick Info on Hover */}
                                <div className={`mt-3 pt-3 border-t transition-all duration-300 overflow-hidden ${isHovered ? 'max-h-20 opacity-100' : 'max-h-0 opacity-0'}`}>
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