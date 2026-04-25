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
