import { useGetBrands } from '@/api/brands/get_';
import React from 'react';
import Loading from './loading';
import { ArrowRight, Shield } from 'lucide-react';
import { Button } from '../ui/button';
import { Card } from '../ui/card';
import Autoplay from 'embla-carousel-autoplay';
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from '@/components/ui/carousel';

const BrandsSection = () => {
    const plugin = React.useRef(Autoplay({ delay: 3000, stopOnInteraction: true }));
    const { data: brands, isLoading } = useGetBrands();
    
    if (isLoading) {
        return <Loading />;
    }
    
    return (
        <section className="container font-heading mx-auto px-4 py-16">
            <div className="flex items-center justify-between mb-8">
                <div className="flex-1">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="p-2 bg-cyan-50 rounded-lg">
                            <Shield className="h-6 w-6 text-[#0083EF]" />
                        </div>
                        <h2 className="text-3xl font-bold">ბრენდები</h2>
                    </div>
                    {/* Gradient underline */}
                    <div className="h-0.5 w-[50%] bg-gradient-to-r from-[#0083EF] to-transparent"></div>
                    <p className="text-muted-foreground mt-4">სანდო და ხარისხიანი ბრენდები</p>
                </div>
               
            </div>
            <div className="relative">
                <Carousel
                    plugins={[plugin.current]}
                    opts={{
                        align: 'start',
                        loop: true,
                    }}
                    className="w-full"
                >
                    <CarouselContent className="-ml-4">
                        {brands?.map((brand) => (
                            <CarouselItem
                                key={brand.name}
                                className="pl-4 basis-1/2 md:basis-1/3 lg:basis-1/5"
                            >
                                <Card className="group cursor-pointer border-2 hover:border-primary transition-all hover:shadow-xl">
                                    <div className="flex items-center justify-center h-24 p-4">
                                        <span className="text-xl font-bold text-muted-foreground group-hover:text-primary transition-colors">
                                            {brand.name}
                                        </span>
                                    </div>
                                </Card>
                            </CarouselItem>
                        ))}
                    </CarouselContent>
                    <CarouselPrevious className="left-0 size-11" />
                    <CarouselNext className="right-0 size-11" />
                </Carousel>
            </div>
        </section>
    );
};

export default BrandsSection;