import HeroSection from '@/components/common/hero-section';
import CategoriesSection from '@/components/common/categories-section';
import FeaturedProductsSection from '@/components/common/featured-products-section';
import FeaturesSection from '@/components/common/features-section';
import BrandsSection from '@/components/common/brands-section';
import NewsLetterSection from '@/components/common/newsletter-section';

export default function MainPage() {
    return (
        <div className="min-h-screen bg-background">
            <HeroSection />
            <CategoriesSection />
            <FeaturedProductsSection />
            <FeaturesSection />
            <BrandsSection />
            <NewsLetterSection />
        </div>
    );
}
