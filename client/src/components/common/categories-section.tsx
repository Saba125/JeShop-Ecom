import { Button } from '../ui/button';
import { ArrowRight } from 'lucide-react';
import { Card } from '../ui/card';
import { useGetCategories } from '@/api/category/get';
import type { Category } from '@/types';
import Loading from './loading';
import { API_URL } from '@/constants';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import { Pagination, Navigation } from 'swiper/modules';

const CategoriesSection = () => {
    const { data: categories, isLoading } = useGetCategories();

    if (isLoading) return <Loading />;

    return (
        <section className="container mx-auto px-4 py-16">
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h2 className="text-3xl font-bold mb-2">კატეგორიები</h2>
                    <p className="text-muted-foreground">აირჩიე შენთვის სასურველი კატეგორია</p>
                </div>

                <Button variant="ghost">
                    ყველას ნახვა <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
            </div>

            {/* Slider */}
            <div className="relative overflow-hidden">
                <Swiper
                    modules={[Pagination, Navigation]}
                    spaceBetween={24}
                    navigation
                    pagination={{ clickable: true }}
                    breakpoints={{
                        0: { slidesPerView: 1 },
                        768: { slidesPerView: 2 },
                        1280: { slidesPerView: 3 },
                    }}
                    className="pb-10 !overflow-hidden"
                >
                    {categories?.map((category: Category) => (
                        <SwiperSlide key={category.uid || category.name}>
                            <Card className="w-full group cursor-pointer overflow-hidden border-2 hover:border-primary transition-all hover:shadow-xl">
                                <div
                                    style={{ backgroundImage: `url(${API_URL}${category.image})` }}
                                    className="h-48 relative bg-cover bg-center"
                                >
                                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors" />
                                    <div className="absolute bottom-4 left-4 text-white">
                                        <h3 className="text-2xl font-bold">{category.name}</h3>
                                    </div>
                                </div>
                            </Card>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </section>
    );
};

export default CategoriesSection;
