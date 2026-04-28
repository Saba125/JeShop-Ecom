import { useState } from 'react';
import { Clock, FlameIcon, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useGetProducts } from '@/api/products/get';
import type { TGetProducts } from '@/types';
import { useNavigate } from 'react-router-dom';
import CCard from './cart';
import { redirectToPPage } from '@/lib/utils';
import CPagination from './custom-pagination';
import { useGetSalesPaginated } from '@/api/sales/get_paginated';
interface SaleProductsSection {
    isFullPage: boolean;
}
const SaleProductsSection = ({ isFullPage }: SaleProductsSection) => {
    const [page, setPage] = useState(1)
    const { data: products, isPending } = useGetProducts();
    const {data: productsPaginated, isPending: isProductsPaginatedPending} = useGetSalesPaginated(page, 10)
    const [hoveredId, setHoveredId] = useState<number | null>(null);
    const [favorites, setFavorites] = useState<number[]>([]);
    const navigate = useNavigate();
    const getActiveSale = (product: TGetProducts) => {
        return product.sales_items?.find((sale) => sale.is_active === 1);
    };

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

    if (!isFullPage && saleProducts.length === 0) {
        return null;
    }

    return (
        <section className="container mx-auto px-4 py-16 relative overflow-hidden">
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
                    <div className="h-0.5 w-[50%] bg-gradient-to-r from-red-500 to-transparent"></div>
                    <p className="text-muted-foreground mt-4">
                        {' '}
                        აღმოაჩინეთ ჩვენი საუკეთესო შეთავაზებები
                    </p>
                </div>
                {isFullPage ? null : (
                    <Button variant="ghost">
                        ყველას ნახვა <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {saleProducts.map((product) => {
                    return (
                        <CCard
                            onClick={() => {
                                redirectToPPage(product, navigate);
                            }}
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

            <div className="mt-12 text-center">
                <div className="inline-flex items-center gap-2 text-sm text-muted-foreground">
                    <Clock className="w-4 h-4" />
                    <span>ფასდაკლებები მოქმედებს შეზღუდული დროით</span>
                </div>
            </div>
            {isFullPage && (
                 <div className='mt-10'>
                <CPagination
                    align="center"
                    page={page}
                    setPage={setPage}
                    totalPages={productsPaginated?.pagination.totalPages!}
                />
            </div>
            )}
        </section>
    );
};

export default SaleProductsSection;
