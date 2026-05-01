import { useGetProductsByCategory } from '@/api/products/get_by_category';
import { useState, useMemo, useEffect } from 'react';
import { useParams, useNavigate, useOutletContext } from 'react-router-dom';
import { ShoppingCart, Heart, Eye, Sparkles, LayoutGrid, Loader2 } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { addItemToCart } from '@/store/cartSlice';
import { addItemToWishlist } from '@/store/wishListSlice';
import { useDispatch } from 'react-redux';
import { API_URL } from '@/constants';
import type { TGetProducts } from '@/types';
import CPagination from '@/components/common/custom-pagination';
import Empty from '@/components/common/empty';
import CCard from '@/components/common/cart';

export type FiltersContext = {
    priceRange: number[];
    selectedBrands: string[];
    selectedPlugTypes: string[];
    inStock: boolean;
    onSale: boolean;
    sortBy: string;
};

const Category = () => {
    const params = useParams();
    const { priceRange, selectedBrands, selectedPlugTypes, inStock, onSale, sortBy } =
        useOutletContext<FiltersContext>();
    const [page, setPage] = useState(1);
    const filters = useMemo(
        () => ({
            priceRange,
            selectedBrands,
            selectedPlugTypes,
            inStock,
            onSale,
            sortBy,
            pagination: true,
            page,
        }),
        [priceRange, selectedBrands, selectedPlugTypes, inStock, onSale, sortBy, page]
    );

    const {
        data: products,
        isLoading,
        isFetching,
    } = useGetProductsByCategory(params.name!, filters, 500);

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

    useEffect(() => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    }, [page]);

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

    if (isLoading) {
        return (
            <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {[...Array(6)].map((_, i) => (
                        <div key={i} className="border-2 rounded-lg p-4 animate-pulse">
                            <div className="w-full h-72 bg-gray-200 rounded-lg mb-4" />
                            <div className="h-4 bg-gray-200 rounded mb-2" />
                            <div className="h-4 bg-gray-200 rounded w-2/3" />
                        </div>
                    ))}
                </div>
            </div>
        );
    }
    if (!products || products.data.length === 0) {
        return (
            <div className="p-6">
                <Empty
                    title="პროდუქტები ვერ მოიძებნა"
                    subTitle="ამ კატეგორიაში პროდუქტები არ არის ხელმისაწვდომი"
                    extraBtn="უკან დაბრუნება"
                    extraBtnCn="mt-5"
                    onClick={() => navigate('/')}
                />
            </div>
        );
    }

    return (
        <div className="p-6">
            {isFetching && (
                <div className="flex items-center gap-2 mb-4 text-sm text-muted-foreground">
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>პროდუქტების ჩატვირთვა...</span>
                </div>
            )}

            {/* Products Grid */}
            <div
                className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 ${isFetching ? 'opacity-60' : ''}`}
            >
                {products.data.map((product) => (
                    <CCard
                        favorites={favorites}
                        product={product}
                        hoveredId={hoveredId}
                        isSpecialSale={false}
                        onClick={() => {}}
                        setHoveredId={setHoveredId}
                        toggleFavorite={toggleFavorite}
                    />
                ))}
            </div>
            <div className="mt-10">
                <CPagination
                    align="center"
                    page={page}
                    setPage={setPage}
                    totalPages={products.pagination.totalPages}
                />
            </div>
        </div>
    );
};

export default Category;
