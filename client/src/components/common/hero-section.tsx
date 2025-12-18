import { Badge } from '../ui/badge';
import CFlex from '../ui/flex';
import { Button } from '../ui/button';
import { ArrowRight } from 'lucide-react';

const HeroSection = () => {
    return (
        <section className="relative h-[600px] bg-[url('/images/hero.jpg')] bg-cover bg-center bg-no-repeat overflow-hidden">
            <div className="container mx-auto px-4 h-full flex items-center">
                <div className="max-w-2xl">
                    <Badge className="mb-4 bg-primary/20 text-white border-primary/30">
                        ახალი კოლექცია 2025
                    </Badge>
                    <h1 className="text-5xl text-white md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/60">
                        გეიმინგ აქსესუარები
                    </h1>
                    <p className="text-xl text-white text-muted-foreground mb-8">
                        იპოვე საუკეთესო კლავიატურები, მაუსები და ყურსასმენები შენი გამარჯვებისთვის
                    </p>
                    <CFlex gap="10px">
                        <Button size="lg" className="group">
                            დაიწყე ყიდვა
                            <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                        </Button>
                        <Button size="lg" variant="outline">
                            ფასდაკლებები
                        </Button>
                    </CFlex>
                </div>
            </div>
            {/* Decorative elements */}
            <div className="absolute top-20 right-20 w-72 h-72 bg-primary/20 rounded-full blur-3xl" />
            <div className="absolute bottom-20 right-40 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />
        </section>
    );
};

export default HeroSection;
