import { useEffect, useRef, useState } from 'react';
import { useGetProductsByCategory } from '@/api/products/get_by_category';
import {
    LucideKeyboard,
    Keyboard,
    ArrowRight,
    Mouse,
    Headphones,
    SquareMousePointer,
    ChevronRight,
    ChevronLeft,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { addItemToWishlist } from '@/store/wishListSlice';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import type { TGetProducts } from '@/types';
import CCard from './cart';
import { calculateDiscountedPrice, getActiveSale } from '@/lib/utils';

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
    const favoritesss: [] = JSON.parse(localStorage.getItem('wishlist')!);
    const favoritesArray: number[] = favoritesss?.map((item: any) => item.product_uid);
    const { data: products, isLoading } = useGetProductsByCategory(name);
    const [hoveredId, setHoveredId] = useState<number | null>(null);
    const [favorites, setFavorites] = useState<number[]>(favoritesArray || []);
    const trackRef = useRef<HTMLDivElement>(null);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [isHoveringCarousel, setIsHoveringCarousel] = useState(false);

    const Icon = iconMap[name] ?? Keyboard;
    const title = titleMap[name] ?? name;

    const scroll = (dir: 'prev' | 'next') => {
        if (!trackRef.current) return;
        const card = trackRef.current.querySelector('[data-card]') as HTMLElement;
        const amount = card ? card.offsetWidth + 16 : 300; // 16 = gap
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
        console.log(favorites);
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
                            <h2 className="text-2xl md:text-3xl font-bold">{title}</h2>
                        </div>
                        <div className="h-0.5 w-[50%] bg-gradient-to-r from-[#0083EF] to-transparent" />
                        <p className="text-muted-foreground  mt-4">
                            აღმოაჩინეთ ჩვენი საუკეთესო შეთავაზებები
                        </p>
                    </div>
                    <Button className=''  onClick={() => navigate(`/products/category/${name}`)} variant="ghost">
                        <span>ყველას ნახვა</span> <ArrowRight className="ml-0 h-4 w-4" />
                    </Button>
                </div>

               
                <div className="relative">
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

                        <div
                            className="flex flex-col md:flex-row transition-all"
                            style={{
                                gap: '16px',
                            }}
                        >
                            {products?.data?.map((product) => {
                                return (
                                  <CCard
                                  favorites={favorites}
                                  product={product}
                                  toggleFavorite={() => toggleFavorite(product)}
                                  hoveredId={hoveredId}
                                  setHoveredId={setHoveredId}
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
            </div>
        </section>
    );
};

export default ProductsSection;
