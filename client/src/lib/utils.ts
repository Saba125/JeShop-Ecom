import type { TGetProducts } from '@/types';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}
// აბრუნებს არის თუ არა ფასდაკლება პროდუქტზე
export const getActiveSale = (product: TGetProducts) => {
    return product.sales_items?.find((sale) => sale.is_active === 1);
};
// ითვლის ფასდაკლებულ ფასს
export const calculateDiscountedPrice = (product: TGetProducts) => {
    const activeSale = getActiveSale(product);
    if (!activeSale) return null;
    const price = parseFloat(product.price);
    if (activeSale.type === 1) return price - (price * activeSale.amount) / 100;
    if (activeSale.type === 2) return price - activeSale.amount;
    return null;
};
// ფასდაკლების პროცენტი
export const getDiscountPercentage = (product: TGetProducts) => {
    const activeSale = getActiveSale(product);
    const discountedPrice = calculateDiscountedPrice(product);
    if (!discountedPrice || !activeSale) return 0;
    const originalPrice = parseFloat(product.price);
    return Math.round(((originalPrice - discountedPrice) / originalPrice) * 100);
};
