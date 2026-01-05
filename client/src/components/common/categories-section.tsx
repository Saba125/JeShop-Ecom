import React from 'react';
import { Button } from '../ui/button';
import { ArrowRight, BoxIcon } from 'lucide-react';
import { Card } from '../ui/card';
import { useGetCategories } from '@/api/category/get';
import type { Category } from '@/types';
import Loading from './loading';
import { API_URL } from '@/constants';
import Autoplay from 'embla-carousel-autoplay';
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from '@/components/ui/carousel';
import { useNavigate } from 'react-router-dom';

const CategoriesSection = () => {
    const plugin = React.useRef(Autoplay({ delay: 3000, stopOnInteraction: true }));
    const navigate = useNavigate();
    const { data: categories, isLoading } = useGetCategories();

    if (isLoading) {
        return <Loading />;
    }

    return (
        <section className="container font-heading mx-auto px-4 py-16">
            <div className="flex items-center justify-between mb-8">
                <div className="flex-1">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="p-2 bg-cyan-50 rounded-lg">
                            <BoxIcon className="h-6 w-6 text-[#0083EF]" />
                        </div>
                        <h2 className="text-3xl font-bold">კატეგორიები</h2>
                    </div>
                    {/* Gradient underline */}
                    <div className="h-0.5 w-[50%] bg-gradient-to-r from-[#0083EF] to-transparent"></div>
                    <p className="text-muted-foreground mt-4">აირჩიე შენთვის სასურველი კატეგორია</p>
                </div>
            
            </div>
            <div className="relative ">
                <Carousel
                    plugins={[plugin.current]}
                    opts={{
                        align: 'start',
                        loop: true,
                    }}
                    className="w-full"
                >
                    <CarouselContent className="-ml-4">
                        {categories?.map((category: Category) => (
                            <CarouselItem
                                key={category.uid || category.name}
                                className="pl-4 md:basis-1/2 lg:basis-1/3"
                            >
                                <Card
                                onClick={() => {
                                    navigate(category.url)
                                }}
                                className="group cursor-pointer overflow-hidden border-2 hover:border-primary transition-all hover:shadow-xl">
                                    <div
                                        style={{
                                            backgroundImage: `url(${API_URL}${category.image})`,
                                        }}
                                        className="h-48 relative bg-cover bg-center"
                                    >
                                        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors" />
                                        <div className="absolute bottom-4 left-4 text-white">
                                            <h3 className="text-2xl font-bold">{category.name}</h3>
                                        </div>
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

export default CategoriesSection;
