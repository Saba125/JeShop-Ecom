import { Badge, TrendingUp } from 'lucide-react';
import React from 'react';
import { Card, CardContent, CardHeader } from '../ui/card';
import { Button } from '../ui/button';
const featuredProducts = [
    {
        id: 1,
        name: 'Logitech G Pro X',
        price: 299,
        originalPrice: 349,
        image: '/images/product1.jpg',
        badge: 'ბესტსელერი',
        rating: 4.8,
    },
    {
        id: 2,
        name: 'Razer BlackWidow V4',
        price: 259,
        image: '/images/product2.jpg',
        badge: 'ახალი',
        rating: 4.9,
    },
    {
        id: 3,
        name: 'SteelSeries Arctis 7',
        price: 179,
        originalPrice: 229,
        image: '/images/product3.jpg',
        badge: 'ფასდაკლება',
        rating: 4.7,
    },
];
const FeaturedProductsSection = () => {
    return (
        <section className="container mx-auto px-4 py-16 bg-muted/30">
            <div className="flex items-center gap-2 mb-8">
                <TrendingUp className="h-6 w-6 text-primary" />
                <h2 className="text-3xl font-bold">რჩეული პროდუქტები</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {featuredProducts.map((product) => (
                    <Card
                        key={product.id}
                        className="group cursor-pointer hover:shadow-xl transition-all"
                    >
                        <CardHeader className="p-0">
                            <div className="relative h-64 bg-muted overflow-hidden">
                                {product.badge && (
                                    <Badge className="absolute top-4 left-4 z-10">
                                        {product.badge}
                                    </Badge>
                                )}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                            </div>
                        </CardHeader>
                        <CardContent className="p-6">
                            <h3 className="font-semibold text-lg mb-2 group-hover:text-primary transition-colors">
                                {product.name}
                            </h3>
                            <div className="flex items-center gap-2 mb-4">
                                <span className="text-2xl font-bold text-primary">
                                    {product.price}₾
                                </span>
                                {product.originalPrice && (
                                    <span className="text-sm text-muted-foreground line-through">
                                        {product.originalPrice}₾
                                    </span>
                                )}
                            </div>
                            <Button className="w-full">კალათაში დამატება</Button>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </section>
    );
};

export default FeaturedProductsSection;
