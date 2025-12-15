import React from 'react';
import { Button } from '../ui/button';
import { ArrowRight } from 'lucide-react';
import { Card } from '../ui/card';
import { useGetCategories } from '@/api/category/get';
import type { Category } from '@/types';
import Loading from './loading';
import { API_URL } from '@/constants';
const CategoriesSection = () => {
    const {data: categories, isLoading} = useGetCategories()
    if (isLoading) {
        return <Loading />
    }
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
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {categories?.map((category:Category) => (
                    <Card
                        key={category.name}
                        className="group cursor-pointer overflow-hidden border-2 hover:border-primary transition-all hover:shadow-xl"
                    >
                        <div
                        style={{backgroundImage: `url(${API_URL}${category.image})`}}
                        className={`h-48 relative bg-cover bg-center`}>
                            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors" />
                            <div className="absolute bottom-4 left-4 text-white">
                                <h3 className="text-2xl font-bold">{category.name}</h3>
                            </div>
                        </div>
                    </Card>
                ))}
            </div>
        </section>
    );
};

export default CategoriesSection;
