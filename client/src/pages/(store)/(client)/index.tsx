import { motion } from 'framer-motion';
import HeroSection from '@/components/common/hero-section';
import CategoriesSection from '@/components/common/categories-section';
import FeaturedProductsSection from '@/components/common/featured-products-section';
import FeaturesSection from '@/components/common/features-section';
import BrandsSection from '@/components/common/brands-section';
import NewsLetterSection from '@/components/common/newsletter-section';
import SaleProductsSection from '@/components/common/sale-products-section';
import KeyboardsSection from '@/components/common/keyboards-section';
import ProductsSection from '@/components/common/keyboards-section';

export default function MainPage() {
    return (
        <div className="min-h-screen bg-background">
            <HeroSection />

            <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.6 }}
            >
                <CategoriesSection />
            </motion.div>

            {/* <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.6, delay: 0.2 }}
            >
                <FeaturedProductsSection />
            </motion.div> */}

            <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.6, delay: 0.2 }}
            >
                <SaleProductsSection />
            </motion.div>
            <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.6, delay: 0.2 }}
            >
                <BrandsSection />
            </motion.div>
            <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.6, delay: 0.2 }}
            >
                <ProductsSection name='keyboards' />
            </motion.div>
            <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.6, delay: 0.2 }}
            >
                <FeaturesSection />
            </motion.div>

            <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.6, delay: 0.2 }}
            >
                <NewsLetterSection />
            </motion.div>
        </div>
    );
}
