import {
    ArrowRight,
    TrendingUp,
    Zap,
    Package,
    Shield,
    Headphones as HeadphonesIcon,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import HeroSection from '@/components/common/hero-section';
import CategoriesSection from '@/components/common/categories-section';

export default function MainPage() {
   

    const features = [
        {
            icon: Package,
            title: 'უფასო მიწოდება',
            description: '100₾-ზე მეტი შეკვეთისას',
        },
        {
            icon: Shield,
            title: '12 თვე გარანტია',
            description: 'ყველა პროდუქტზე',
        },
        {
            icon: Zap,
            title: 'სწრაფი მიწოდება',
            description: '1-2 სამუშაო დღეში',
        },
        {
            icon: HeadphonesIcon,
            title: '24/7 მხარდაჭერა',
            description: 'ყოველთვის თქვენს გვერდით',
        },
    ];

    const brands = [
        { name: 'Logitech', logo: '/images/logitech.png' },
        { name: 'Razer', logo: '/images/razer.png' },
        { name: 'SteelSeries', logo: '/images/steelseries.png' },
        { name: 'Corsair', logo: '/images/corsair.png' },
        { name: 'HyperX', logo: '/images/hyperx.png' },
    ];

    return (
        <div className="min-h-screen bg-background">
            {/* Hero Section */}
            <HeroSection />
            {/* Categories Section */}
            <CategoriesSection />

            {/* Featured Products */}
      

            {/* Features Section */}
            <section className="container mx-auto px-4 py-16">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {features.map((feature) => (
                        <div key={feature.title} className="flex flex-col items-center text-center">
                            <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                                <feature.icon className="h-8 w-8 text-primary" />
                            </div>
                            <h3 className="font-semibold text-lg mb-2">{feature.title}</h3>
                            <p className="text-sm text-muted-foreground">{feature.description}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* Brands Section */}
            <section className="container mx-auto px-4 py-16 bg-muted/30">
                <h2 className="text-3xl font-bold text-center mb-12">პოპულარული ბრენდები</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
                    {brands.map((brand) => (
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

            {/* Newsletter Section */}
          
        </div>
    );
}
