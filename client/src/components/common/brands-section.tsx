import { useGetBrands } from '@/api/brands/get_';
import React from 'react';
import Loading from './loading';

const BrandsSection = () => {
    const {data: brands, isLoading} = useGetBrands();
    if (isLoading) {
        return <Loading />
    }
    return (
        <section className="container mx-auto px-4 py-16 bg-muted/30">
            <h2 className="text-3xl font-bold text-center mb-12">პოპულარული ბრენდები</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
                {brands?.map((brand) => (
                    <div
                        key={brand.name}
                        className="flex items-center justify-center h-24 bg-background rounded-lg border-2 hover:border-primary transition-all cursor-pointer hover:shadow-lg"
                    >
                        <span className="text-xl font-bold text-muted-foreground hover:text-primary transition-colors">
                            {brand.name}
                        </span>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default BrandsSection;
