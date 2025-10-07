import React from 'react';
import { Button } from '../ui/button';
import { ArrowRight } from 'lucide-react';
import { Card } from '../ui/card';
const categories = [
    {
        title: 'კლავიატურები',
        image: '/images/keyboards.jpg',
        count: 150,
        url: '/keyboards',
        color: 'from-blue-500 to-cyan-500',
    },
    {
        title: 'მაუსები',
        image: '/images/mice.jpg',
        count: 200,
        url: '/mice',
        color: 'from-purple-500 to-pink-500',
    },
    {
        title: 'ყურსასმენები',
        image: '/images/headsets.jpg',
        count: 120,
        url: '/headsets',
        color: 'from-orange-500 to-red-500',
    },
    {
        title: 'მაუსპადები',
        image: '/images/mousepads.jpg',
        count: 80,
        url: '/mousepads',
        color: 'from-green-500 to-emerald-500',
    },
];
const CategoriesSection = () => {
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
                {categories.map((category) => (
                    <Card
                        key={category.title}
                        className="group cursor-pointer overflow-hidden border-2 hover:border-primary transition-all hover:shadow-xl"
                    >
                        <div className={`h-48 bg-gradient-to-br ${category.color} relative`}>
                            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors" />
                            <div className="absolute bottom-4 left-4 text-white">
                                <h3 className="text-2xl font-bold">{category.title}</h3>
                                <p className="text-sm opacity-90">{category.count} პროდუქტი</p>
                            </div>
                        </div>
                    </Card>
                ))}
            </div>
        </section>
    );
};

export default CategoriesSection;
