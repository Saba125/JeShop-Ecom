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
} from 'lucide-react';

const sidebarItems = [
    {
        title: 'მთავარი',
        url: '/',
        icon: Home,
    },
    {
        title: 'კლავიატურები',
        url: '/keyboards',
        icon: Keyboard,
    },
    {
        title: 'მაუსები',
        url: '/mice',
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
    {
        title: 'პარამეტრები',
        url: '/settings',
        icon: Settings,
    },
];

export default sidebarItems;
