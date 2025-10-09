import React from 'react';
import { Package, Shield,Zap,HeadphonesIcon } from 'lucide-react';
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

const FeaturesSection = () => {
    return (
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
    );
};

export default FeaturesSection;
