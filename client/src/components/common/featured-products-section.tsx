import { useEffect, useRef, useState } from 'react';
import {
    ShoppingCart,
    Heart,
    Eye,
    Sparkles,
    ComputerIcon,
    ArrowRight,
    ChevronLeft,
    ChevronRight,
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { addItemToCart } from '@/store/cartSlice';
import { addItemToWishlist } from '@/store/wishListSlice';
import { useDispatch } from 'react-redux';
import { useGetProducts } from '@/api/products/get';
import { API_URL } from '@/constants';
import type { TGetProducts } from '@/types';
import { useNavigate } from 'react-router-dom';
import CCard from './cart';
import { redirectToPPage } from '@/lib/utils';

const FeaturedProductsSection = () => {
    const { data: products, isPending } = useGetProducts({});
    const favoritesss: [] = JSON.parse(localStorage.getItem('wishlist')!);
    const favoritesArray: number[] = favoritesss?.map((item: any) => item.product_uid);
    const [hoveredId, setHoveredId] = useState<number | null>(null);
    const [favorites, setFavorites] = useState<number[]>(favoritesArray || []);
    const [isHoveringCarousel, setIsHoveringCarousel] = useState(false);
    const trackRef = useRef<HTMLDivElement>(null);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const scroll = (dir: 'prev' | 'next') => {
        if (!trackRef.current) return;
        const card = trackRef.current.querySelector('[data-card]') as HTMLElement;
        const amount = card ? card.offsetWidth + 16 : 300;
        trackRef.current.scrollBy({
            left: dir === 'next' ? amount : -amount,
            behavior: 'smooth',
        });
    };

    useEffect(() => {
        if (isHoveringCarousel) return;
        const interval = setInterval(() => {
            if (!trackRef.current) return;
            const { scrollLeft, scrollWidth, clientWidth } = trackRef.current;
            const atEnd = scrollLeft + clientWidth >= scrollWidth - 1;
            if (atEnd) {
                trackRef.current.scrollTo({ left: 0, behavior: 'smooth' });
            } else {
                scroll('next');
            }
        }, 3000);
        return () => clearInterval(interval);
    }, [isHoveringCarousel]);

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
        if (activeSale.type === 1) return price - (price * activeSale.amount) / 100;
        if (activeSale.type === 2) return price - activeSale.amount;
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
            {/* Header */}
            <div className="flex items-center justify-between mb-8">
                <div className="flex-1">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="p-2 bg-cyan-50 rounded-lg">
                            <ComputerIcon className="h-6 w-6 text-[#0083EF]" />
                        </div>
                        <h2 className="text-3xl font-bold">რჩეული პროდუქტები</h2>
                    </div>
                    <div className="h-0.5 w-[50%] bg-gradient-to-r from-[#0083EF] to-transparent" />
                    <p className="text-muted-foreground mt-4">
                        აღმოაჩინეთ ჩვენი საუკეთესო შეთავაზებები
                    </p>
                </div>
                <Button variant="ghost">
                    ყველას ნახვა <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
            </div>

            {/* Carousel */}
            <div
                className="relative"
                onMouseEnter={() => setIsHoveringCarousel(true)}
                onMouseLeave={() => setIsHoveringCarousel(false)}
            >
                <button
                    onClick={() => scroll('prev')}
                    className="absolute left-0 top-1/2 -translate-y-1/2 z-20 w-8 h-8 rounded-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-lg flex items-center justify-center hover:bg-slate-50 dark:hover:bg-slate-700 transition-all"
                >
                    <ChevronLeft className="w-4 h-4" />
                </button>

                <div
                    ref={trackRef}
                    className="overflow-x-hidden"
                    style={{ scrollbarWidth: 'none' }}
                >
                    <div className="flex transition-all" style={{ gap: '16px' }}>
                        {products?.map((product) => {
                            return (
                                <CCard
                                    onClick={() =>  {
                                        redirectToPPage(product, navigate)
                                    }}
                                    favorites={favorites}
                                    product={product}
                                    toggleFavorite={toggleFavorite}
                                    hoveredId={hoveredId}
                                    setHoveredId={setHoveredId}
                                    key={product.uid}
                                />
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
        </section>
    );
};

export default FeaturedProductsSection;
