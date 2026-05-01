import { useState } from 'react';
import {
    ComputerIcon,
    ArrowRight,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from '@/components/ui/carousel';
import { addItemToWishlist } from '@/store/wishListSlice';
import { useDispatch } from 'react-redux';
import { useGetProducts } from '@/api/products/get';
import type { TGetProducts } from '@/types';
import { useNavigate } from 'react-router-dom';
import CCard from './cart';
import { redirectToPPage } from '@/lib/utils';
import Autoplay from 'embla-carousel-autoplay';

const FeaturedProductsSection = () => {
    const { data: products, isPending } = useGetProducts({});
    const favoritesss: [] = JSON.parse(localStorage.getItem('wishlist')!);
    const favoritesArray: number[] = favoritesss?.map((item: any) => item.product_uid);
    const [hoveredId, setHoveredId] = useState<number | null>(null);
    const [favorites, setFavorites] = useState<number[]>(favoritesArray || []);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const autoplayPlugin = Autoplay({ delay: 3000, stopOnInteraction: false, stopOnMouseEnter: true });

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

    if (isPending) {
        return (
             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {[...Array(6)].map((_, i) => (
                        <div key={i} className="border-2 rounded-lg p-4 animate-pulse">
                            <div className="w-full h-72 bg-gray-200 rounded-lg mb-4" />
                            <div className="h-4 bg-gray-200 rounded mb-2" />
                            <div className="h-4 bg-gray-200 rounded w-2/3" />
                        </div>
                    ))}
                </div>  
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
                    <div className="h-0.5 w-[50%] bg-gradient-to-r from-[#0083EF] to-transparent" />
                    <p className="text-muted-foreground mt-4">
                        აღმოაჩინეთ ჩვენი საუკეთესო შეთავაზებები
                    </p>
                </div>
                <Button variant="ghost">
                    ყველას ნახვა <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
            </div>

            <Carousel
                opts={{
                    align: 'start',
                    loop: true,
                }}
                plugins={[autoplayPlugin]}
                className="w-full"
            >
                <CarouselContent className="-ml-4">
                    {products?.map((product) => (
                        <CarouselItem
                            key={product.uid}
                            className="pl-4 basis-full sm:basis-1/2 md:basis-1/3 lg:basis-1/4"
                        >
                            <CCard
                                onClick={() => redirectToPPage(product, navigate)}
                                favorites={favorites}
                                product={product}
                                toggleFavorite={() => toggleFavorite(product)}
                                hoveredId={hoveredId}
                                setHoveredId={setHoveredId}
                            />
                        </CarouselItem>
                    ))}
                </CarouselContent>
                <CarouselPrevious className="left-0 size-11 bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 shadow-lg hover:bg-slate-50 dark:hover:bg-slate-700" />
                <CarouselNext className="right-0 size-11 bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 shadow-lg hover:bg-slate-50 dark:hover:bg-slate-700" />
            </Carousel>
        </section>
    );
};

export default FeaturedProductsSection;