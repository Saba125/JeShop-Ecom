import { useState } from 'react';
import { useGetProductsByCategory } from "@/api/products/get_by_category";
import { LucideKeyboard, ShoppingCart, Heart, Eye, Sparkles, Keyboard, ArrowRight } from "lucide-react";
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { addItemToCart } from '@/store/cartSlice';
import { addItemToWishlist } from '@/store/wishListSlice';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { API_URL } from '@/constants';
import type { TGetProducts } from '@/types';

const ProductsSection = ({name} : {name: string}) => {
    const { data: products, isLoading } = useGetProductsByCategory("keyboards");
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

    const getDiscountPercentage = (product: TGetProducts) => {
        const activeSale = getActiveSale(product);
        const discountedPrice = calculateDiscountedPrice(product);
        if (!discountedPrice || !activeSale) return 0;

        const originalPrice = parseFloat(product.price);
        return Math.round(((originalPrice - discountedPrice) / originalPrice) * 100);
    };

    if (isLoading) {
        return (
            <section className="container mx-auto px-4 py-16">
                <div className="flex items-center justify-center h-64">
                    <div className="text-muted-foreground">იტვირთება...</div>
                </div>
            </section>
        );
    }

    if (!products || products.length === 0) {
        return (
            <section className="container mx-auto px-4 py-16">
                <div className="flex items-center gap-3 mb-8">
                    <div className="p-2 bg-primary/10 rounded-lg">
                        <LucideKeyboard className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                        <h2 className="text-3xl font-bold">კლავიატურები</h2>
                        <p className="text-sm text-muted-foreground">
                            აღმოაჩინეთ მაღალი ხარისხის კლავიატურები
                        </p>
                    </div>
                </div>
                <div className="text-center py-12">
                    <p className="text-muted-foreground">პროდუქტები ვერ მოიძებნა</p>
                </div>
            </section>
        );
    }

    return (
        <section className="container mx-auto px-4 py-16 overflow-hidden">
            <div className="flex items-center justify-between mb-8">
                <div className="flex-1">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="p-2 bg-cyan-50 rounded-lg">
                            <Keyboard className="h-6 w-6 text-[#0083EF]" />
                        </div>
                        <h2 className="text-3xl font-bold">{name}</h2>
                    </div>
                    <div className="h-0.5 w-[50%] bg-gradient-to-r from-[#0083EF] to-transparent"></div>
                    <p className="text-muted-foreground mt-4">
                        აღმოაჩინეთ ჩვენი საუკეთესო შეთავაზებები 
                    </p>
                </div>
                <Button onClick={() => navigate("/products/category/keyboards")} variant="ghost">
                    ყველას ნახვა <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
            </div>

            <Carousel
                opts={{
                    align: "start",
                    loop: true,
                }}
                className="w-full -mx-4 px-4"
            >
                <CarouselContent className="">
                    {products.map((product) => {
                        const activeSale = getActiveSale(product);
                        const discountedPrice = calculateDiscountedPrice(product);
                        const discountDisplay = getDiscountDisplay(product);
                        const discountPercent = getDiscountPercentage(product);
                        const isHovered = hoveredId === product.uid;
                        const isFavorite = favorites.includes(product.uid);
                        const inStock = product.stock > 0;
                        const originalPrice = parseFloat(product.price);

                        return (
                            <CarouselItem key={product.uid} className="pl-4 basis-[90%] xs:basis-[80%] sm:basis-1/2 md:basis-1/2 lg:basis-1/3 xl:basis-1/4">
                                <Card
                                    onClick={() => {
                                        const pLink = product.name
                                            .toLowerCase()
                                            .trim()
                                            .replace(/\s+/g, '-');
                                        navigate(`/product/${pLink}/${product.uid}`);
                                    }}
                                    className="group cursor-pointer relative overflow-hidden border-2 hover:border-primary/50 transition-all duration-300 hover:shadow-2xl h-full"
                                    onMouseEnter={() => setHoveredId(product.uid)}
                                    onMouseLeave={() => setHoveredId(null)}
                                >
                                    {/* Image Section */}
                                    <div className="relative h-48 bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-900 overflow-hidden">
                                        {/* Discount Badge */}
                                        {activeSale && discountPercent > 0 && (
                                            <div className="absolute top-0 left-0 z-10">
                                                <div className="relative">
                                                    <div className="absolute inset-0 bg-primary blur-xl opacity-50" />
                                                    <div className="relative bg-gradient-to-br from-primary to-primary/80 text-white px-6 py-3 rounded-br-3xl shadow-2xl">
                                                        <div className="text-3xl font-black leading-none">
                                                            -{discountPercent}%
                                                        </div>
                                                        <div className="text-xs font-semibold uppercase tracking-wide">
                                                            ფასდაკლება
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        )}

                                        {/* Sale Badge */}
                                        {activeSale && (
                                            <div className="absolute top-3 right-3 z-10">
                                                <Badge className="bg-primary text-white shadow-lg">
                                                    <Sparkles className="w-3 h-3 mr-1" />
                                                    ფასდაკლება
                                                </Badge>
                                            </div>
                                        )}

                                        {/* Action Buttons */}
                                        <div
                                            className={`absolute ${activeSale && discountPercent > 0 ? 'top-16' : 'top-3'} right-3 z-10 flex flex-col gap-2 transition-all duration-300 ${isHovered ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-4'}`}
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
                                        <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                                        {/* Out of Stock Overlay */}
                                        {!inStock && (
                                            <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                                                <Badge variant="secondary" className="text-lg px-4 py-2">
                                                    არ არის მარაგში
                                                </Badge>
                                            </div>
                                        )}
                                    </div>

                                    <CardContent className="p-4">
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
                                        <h3 className="font-semibold text-base mb-2 line-clamp-2 group-hover:text-primary transition-colors">
                                            {product.name}
                                        </h3>

                                        {/* Weight/Unit */}
                                        <p className="text-xs text-muted-foreground mb-2">
                                            {product.weight} {product.unit.name}
                                        </p>

                                        {/* Price Section */}
                                        <div className="mb-3">
                                            <div className="flex items-center gap-2 mb-1">
                                                <span className="text-2xl font-black text-primary">
                                                    {(discountedPrice || originalPrice).toFixed(2)}₾
                                                </span>
                                                {discountedPrice && (
                                                    <span className="text-sm text-muted-foreground line-through">
                                                        {originalPrice.toFixed(2)}₾
                                                    </span>
                                                )}
                                            </div>
                                        </div>

                                        {/* Add to Cart Button */}
                                        <Button
                                            className="w-full group/btn relative overflow-hidden"
                                            size="default"
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

                                        {/* Quick Info on Hover */}
                                        <div
                                            className={`mt-3 pt-3 border-t transition-all duration-300 overflow-hidden ${isHovered ? 'max-h-20 opacity-100' : 'max-h-0 opacity-0'}`}
                                        >
                                            <p className="text-xs text-muted-foreground">
                                                ✓ უფასო მიწოდება • ✓ სწრაფი გაფორმება
                                            </p>
                                        </div>
                                    </CardContent>
                                </Card>
                            </CarouselItem>
                        );
                    })}
                </CarouselContent>
                <CarouselPrevious className="hidden md:flex" />
                <CarouselNext className="hidden md:flex" />
            </Carousel>
        </section>
    );
};

export default ProductsSection;