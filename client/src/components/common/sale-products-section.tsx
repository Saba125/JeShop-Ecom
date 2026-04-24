import { useState } from 'react';
import { Flame, ShoppingCart, Heart, Eye, Clock, Zap, Sparkles, Tag, FlameIcon, ArrowRight } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { addItemToCart } from '@/store/cartSlice';
import { useDispatch } from 'react-redux';
import { useGetProducts } from '@/api/products/get';
import { API_URL } from '@/constants';
import type { TGetProducts } from '@/types';
import { useNavigate } from 'react-router-dom';
import CCard from './cart';

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
            <div className="flex items-center justify-between mb-8">
                <div className="flex-1">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="p-2 border-red-500 rounded-lg border-2">
                            <FlameIcon className="h-6 w-6 text-red-500" />
                        </div>
                        <h2 className="text-3xl font-bold">გასნაკუთრებული ფასდაკლებები</h2>
                    </div>
                    {/* Gradient underline */}
                    <div className="h-0.5 w-[50%] bg-gradient-to-r from-red-500 to-transparent"></div>
                    <p className="text-muted-foreground mt-4">
                        {' '}
                        აღმოაჩინეთ ჩვენი საუკეთესო შეთავაზებები
                    </p>
                </div>
                <Button variant="ghost">
                    ყველას ნახვა <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
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
                        <CCard
                        favorites={favorites}
                        isSpecialSale
                        product={product}
                        toggleFavorite={() => {}}
                        hoveredId={hoveredId}
                        setHoveredId={setHoveredId}
                        />
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
