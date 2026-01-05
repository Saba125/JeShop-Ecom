// Menu items for Jeshop (in Georgian)
import {
    Home,
    ShoppingBag,
    Keyboard,
    Mouse,
    Headphones,
    Square,
    Box,
    Tags,
    Percent,
    Info,
    Mail,
    Heart,
    Settings,
    type LucideIcon,
    User2Icon,
} from 'lucide-react';
export type SidebarItems = {
    title: string;
    url: string;
    icon: LucideIcon;
}[];
const clientSidebarItems: SidebarItems = [
    {
        title: 'მთავარი',
        url: '/',
        icon: Home,
    },
    {
        title: 'კლავიატურები',
        url: '/products/category/keyboards',
        icon: Keyboard,
    },
    {
        title: 'მაუსები',
        url: '/products/category/mouses',
        icon: Mouse,
    },
    {
        title: 'ყურსასმენები',
        url: '/headsets',
        icon: Headphones,
    },
    {
        title: 'მაუსპადები',
        url: '/mousepads',
        icon: Square,
    },
    {
        title: 'ბრენდები',
        url: '/brands',
        icon: Tags,
    },
    {
        title: 'ფასდაკლებები',
        url: '/deals',
        icon: Percent,
    },
    {
        title: 'სურვილების სია',
        url: '/wishlist',
        icon: Heart,
    },
    {
        title: 'ჩვენს შესახებ',
        url: '/about',
        icon: Info,
    },
    {
        title: 'კონტაქტი',
        url: '/contact',
        icon: Mail,
    },
];
const adminSidebarItems: SidebarItems = [
    {
        title: 'მთავარი',
        url: '/admin/dashboard',
        icon: Home,
    },
    {
        title: 'კლიენტები',
        url: '/admin/clients',
        icon: User2Icon,
    },
    // {
    //     title: 'კლავიატურები',
    //     url: '/admin/keyboards',
    //     icon: Keyboard,
    // },
    // {
    //     title: 'მაუსები',
    //     url: '/admin/mouse',
    //     icon: Mouse,
    // },
    // {
    //     title: 'ყურსასმენები',
    //     url: '/admin/headsets',
    //     icon: Headphones,
    // },
    // {
    //     title: 'მაუსპადები',
    //     url: '/admin/mousepads',
    //     icon: Square,
    // },
    {
        title: 'პროდუქტები',
        url: '/admin/products',
        icon: ShoppingBag,
    },
    {
        title: 'კატეგორიები',
        url: '/admin/categories',
        icon: Box,
    },
    {
        title: 'ბრენდები',
        url: '/admin/brands',
        icon: Tags,
    },
    {
        title: 'ფასდაკლებები',
        url: '/admin/deals',
        icon: Percent,
    },
    {
        title: 'სურვილების სია',
        url: '/admin/wishlist',
        icon: Heart,
    },
    {
        title: 'ჩვენს შესახებ',
        url: '/admin/about',
        icon: Info,
    },
    {
        title: 'კონტაქტი',
        url: '/admin/contact',
        icon: Mail,
    },
    {
        title: 'პარამეტრები',
        url: '/admin/settings',
        icon: Settings,
    },
];

export default {
    clientSidebarItems,
    adminSidebarItems,
};
