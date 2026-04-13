import { useEffect, useRef, useState } from 'react';
import { useGetProductsByCategory } from '@/api/products/get_by_category';
import {
    LucideKeyboard,
    ShoppingCart,
    Heart,
    Eye,
    Sparkles,
    Keyboard,
    ArrowRight,
    Mouse,
    Headphones,
    SquareMousePointer,
    ChevronRight,
    ChevronLeft,
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { addItemToCart } from '@/store/cartSlice';
import { addItemToWishlist } from '@/store/wishListSlice';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { API_URL } from '@/constants';
import type { TGetProducts } from '@/types';

const titleMap: Record<string, string> = {
    keyboards: 'კლავიატურები',
    mouses: 'მაუსები',
    headsets: 'ყურსასმენები',
    mousepads: 'მაუსპადები',
};

const iconMap: Record<string, React.ElementType> = {
    keyboards: Keyboard,
    mouses: Mouse,
    headsets: Headphones,
    mousepads: SquareMousePointer,
};

const ProductsSection = ({ name }: { name: string }) => {
    const favoritesss: [] = JSON.parse(localStorage.getItem('wishlist')!)
    const favoritesArray: number[] = favoritesss?.map((item: any) => item.product_uid)
    const { data: products, isLoading } = useGetProductsByCategory(name);
    const [hoveredId, setHoveredId] = useState<number | null>(null);
    const [favorites, setFavorites] = useState<number[]>(favoritesArray || []);
    const trackRef = useRef<HTMLDivElement>(null);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const Icon = iconMap[name] ?? Keyboard;
    const title = titleMap[name] ?? name;

    const scroll = (dir: 'prev' | 'next') => {
        if (!trackRef.current) return;
        const amount = trackRef.current.offsetWidth;
        trackRef.current.scrollBy({
            left: dir === 'next' ? amount : -amount,
            behavior: 'smooth',
        });
    };
   
    const toggleFavorite = (product: TGetProducts) => {
        const discountedPrice = calculateDiscountedPrice(product);
        const activeSale = getActiveSale(product);
        const originalPrice = parseFloat(product.price);
        console.log(favorites)
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
        if (activeSale.type === 1) return price - (price * activeSale.amount) / 100;
        if (activeSale.type === 2) return price - activeSale.amount;
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
            <section className="w-full py-16">
                <div className="container mx-auto px-4">
                    <div className="flex items-center justify-center h-64">
                        <div className="text-muted-foreground">იტვირთება...</div>
                    </div>
                </div>
            </section>
        );
    }

    if (!products || products?.data?.length === 0) {
        return (
            <section className="w-full py-16">
                <div className="container mx-auto px-4">
                    <div className="flex items-center gap-3 mb-8">
                        <div className="p-2 bg-primary/10 rounded-lg">
                            <LucideKeyboard className="h-6 w-6 text-primary" />
                        </div>
                        <div>
                            <h2 className="text-3xl font-bold">{title}</h2>
                            <p className="text-sm text-muted-foreground">
                                აღმოაჩინეთ მაღალი ხარისხის {title}
                            </p>
                        </div>
                    </div>
                    <div className="text-center py-12">
                        <p className="text-muted-foreground">პროდუქტები ვერ მოიძებნა</p>
                    </div>
                </div>
            </section>
        );
    }

    return (
        <section className="w-full py-16">
            <div className="container mx-auto px-4">
                {/* Header */}
                <div className="flex items-center justify-between mb-8">
                    <div className="flex-1">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="p-2 bg-cyan-50 rounded-lg">
                                <Icon className="h-6 w-6 text-[#0083EF]" />
                            </div>
                            <h2 className="text-3xl font-bold">{title}</h2>
                        </div>
                        <div className="h-0.5 w-[50%] bg-gradient-to-r from-[#0083EF] to-transparent" />
                        <p className="text-muted-foreground mt-4">
                            აღმოაჩინეთ ჩვენი საუკეთესო შეთავაზებები
                        </p>
                    </div>
                    <Button onClick={() => navigate(`/products/category/${name}`)} variant="ghost">
                        ყველას ნახვა <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                </div>

                {/* 
                    THE CORRECT APPROACH:
                    The outer div is position:relative + overflow:hidden — this is the CLIP boundary.
                    The track (ref) is overflow-x-auto — this is where scrolling happens.
                    Cards use scroll-snap-align so scrolling snaps cleanly.
                    Card width is set via inline style as a % of the TRACK (not viewport).
                    No transforms on nav buttons — they sit inside the clip boundary.
                */}
                <div className="relative">
                    <button
                        onClick={() => scroll('prev')}
                        className="absolute left-0 top-1/2 -translate-y-1/2 z-20 w-8 h-8 rounded-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-lg flex items-center justify-center hover:bg-slate-50 dark:hover:bg-slate-700 transition-all"
                    >
                        <ChevronLeft className="w-4 h-4" />
                    </button>

                    {/* Track — clips overflow, scrolls internally */}
                    <div
                        ref={trackRef}
                        className="overflow-x-hidden"
                        style={{ scrollbarWidth: 'none' }}
                    >
                        {/* 
                            Inner flex row — this is what actually scrolls.
                            overflow-x-auto is on this element via JS scrollBy on the ref.
                            Cards are sized to exactly 1/4 of the TRACK width using js-calculated style.
                        */}
                        <div
                            className="flex transition-all"
                            style={{
                                gap: '16px',
                                // We scroll the parent (trackRef), not this div
                                // Cards shrink to fit: each is 25% of container minus gaps
                                // This formula is purely about the track div, not viewport
                            }}
                        >
                        {products?.data?.map((product) => {
    const activeSale = getActiveSale(product);
    const discountedPrice = calculateDiscountedPrice(product);
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
            style={{
                flex: '0 0 calc(25% - 12px)',
                minWidth: '0',
                scrollSnapAlign: 'start',
            }}
            className="cursor-pointer relative overflow-hidden border-2 hover:border-primary/60 transition-all duration-300 hover:shadow-2xl group rounded-2xl"
            onMouseEnter={() => setHoveredId(product.uid)}
            onMouseLeave={() => setHoveredId(null)}
        >
            {/* Image */}
            <div className="relative h-52 bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-900 overflow-hidden">

                {/* Discount ribbon */}
                {activeSale && discountPercent > 0 && (
                    <div className="absolute top-0 left-0 z-10">
                        <div className="bg-primary text-white px-3.5 py-2 rounded-br-2xl shadow-md flex flex-col items-center leading-none">
                            <span className="text-base font-black">-{discountPercent}%</span>
                            <span className="text-[10px] font-semibold uppercase tracking-widest mt-0.5 opacity-80">
                                sale
                            </span>
                        </div>
                    </div>
                )}

                {/* Sale sparkle badge */}
                {activeSale && (
                    <div className="absolute bottom-2.5 left-2.5 z-10">
                        <Badge className="bg-primary/90 text-white shadow text-[11px] px-2 py-0.5 gap-1">
                            <Sparkles className="w-3 h-3" />
                            ფასდაკლება
                        </Badge>
                    </div>
                )}

                {/* Action Buttons */}
                <div
                    className={`absolute top-2.5 right-2.5 z-10 flex flex-col gap-2 transition-all duration-300 ${
                        isHovered ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-4'
                    }`}
                >
                    <Button
                        size="icon"
                        variant="secondary"
                        className={`w-9 h-9 rounded-full shadow-md bg-white/90 dark:bg-slate-800/90 border-0 ${
                            isFavorite
                                ? 'text-red-500 hover:bg-red-50'
                                : 'text-slate-500 hover:text-red-500'
                        }`}
                        onClick={(e) => {
                            e.stopPropagation();
                            toggleFavorite(product);
                        }}
                    >
                        <Heart className={`w-4 h-4 ${isFavorite ? 'fill-current' : ''}`} />
                    </Button>
                    <Button
                        size="icon"
                        variant="secondary"
                        className="w-9 h-9 rounded-full shadow-md bg-white/90 dark:bg-slate-800/90 border-0 text-slate-500 hover:text-primary"
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
                            className="max-w-full max-h-full object-contain group-hover:scale-110 transition-transform duration-500"
                        />
                    ) : (
                        <ShoppingCart className="w-16 h-16 text-slate-300 dark:text-slate-700" />
                    )}
                </div>

                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                {/* Out of Stock Overlay */}
                {!inStock && (
                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center z-20">
                        <span className="bg-white/95 dark:bg-slate-900/95 text-slate-800 dark:text-slate-100 text-sm font-semibold px-5 py-2 rounded-full shadow-lg">
                            არ არის მარაგში
                        </span>
                    </div>
                )}
            </div>

            <CardContent className="p-4">
                {/* Category and Brand */}
                <div className="flex items-center gap-1.5 mb-2.5 flex-wrap">
                    <Badge
                        variant="outline"
                        className="text-xs px-2.5 py-0.5 rounded-full font-normal"
                    >
                        {product?.category.name}
                    </Badge>
                    {product.brand && (
                        <Badge
                            variant="outline"
                            className="text-xs px-2.5 py-0.5 rounded-full font-normal"
                        >
                            {product.brand.name}
                        </Badge>
                    )}
                </div>

                {/* Product Name */}
                <h3 className="font-semibold text-base mb-1.5 line-clamp-2 group-hover:text-primary transition-colors leading-snug">
                    {product.name}
                </h3>

                {/* Weight */}
                <p className="text-xs text-muted-foreground mb-3">
                    {product.weight} {product.unit.name}
                </p>

                {/* Price */}
                <div className="flex items-baseline gap-2 mb-3">
                    <span className="text-2xl font-black text-primary">
                        {(discountedPrice || originalPrice).toFixed(2)}₾
                    </span>
                    {discountedPrice && (
                        <span className="text-sm text-muted-foreground line-through">
                            {originalPrice.toFixed(2)}₾
                        </span>
                    )}
                </div>

                {/* Add to Cart */}
                <Button
                    className="w-full h-10 text-sm font-semibold group/btn relative overflow-hidden rounded-xl"
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
                            <span>კალათაში დამატება</span>
                        ) : (
                            <span>არ არის მარაგში</span>
                        )}
                    </span>
                    <div className="absolute inset-0 bg-white/15 translate-y-full group-hover/btn:translate-y-0 transition-transform duration-300" />
                </Button>

                {/* Hover Info */}
                <div
                    className={`mt-3 pt-3 border-t border-dashed transition-all duration-300 overflow-hidden ${
                        isHovered ? 'max-h-10 opacity-100' : 'max-h-0 opacity-0'
                    }`}
                >
                    <p className="text-xs text-muted-foreground">
                        ✓ უფასო მიწოდება &nbsp;•&nbsp; ✓ სწრაფი გაფორმება
                    </p>
                </div>
            </CardContent>
        </Card>
    );
})}
                        </div>
                    </div>

                    <button
                        onClick={() => scroll('next')}
                        className="absolute right-0 top-1/2 -translate-y-1/2 z-20 w-8 h-8 rounded-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-lg flex items-center justify-center hover:bg-slate-50 dark:hover:bg-slate-700 transition-all"
                    >
                        <ChevronRight className="w-4 h-4" />
                    </button>
                </div>
            </div>
        </section>
    );
};

export default ProductsSection;
