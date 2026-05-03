import React, { useState } from 'react';
import {
    User,
    Mail,
    Phone,
    MapPin,
    Package,
    Heart,
    Settings,
    LogOut,
    Edit3,
    ChevronRight,
    ShoppingBag,
    Clock,
    CheckCircle,
    Truck,
    X,
    ShoppingCart,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useDispatch, useSelector } from 'react-redux';
import type { RootState } from '@/store/store';
import getAvatarUrl from '@/lib/get_avatar_url';
import EditProfileModal from '@/components/common/edit-profile-modal';
import { useNavigate } from 'react-router-dom';
import { API_URL } from '@/constants';
import { addItemToCart } from '@/store/cartSlice';
import { removeItemFromWishlist } from '@/store/wishListSlice';
import type { WishlistItems } from '@/types';

type Tab = 'overview' | 'orders' | 'wishlist' | 'settings';

const mockOrders = [
    {
        id: '#GE-4821',
        name: 'Logitech G Pro X Keyboard',
        status: 'delivered',
        date: '28 აპრ, 2025',
        price: '₾ 289',
    },
    {
        id: '#GE-4756',
        name: 'Razer DeathAdder V3',
        status: 'shipped',
        date: '01 მაი, 2025',
        price: '₾ 149',
    },
    {
        id: '#GE-4700',
        name: 'HyperX Cloud II Headset',
        status: 'processing',
        date: '02 მაი, 2025',
        price: '₾ 199',
    },
];

const statusConfig: Record<string, { label: string; icon: React.ElementType; color: string }> = {
    delivered: { label: 'მიღებულია', icon: CheckCircle, color: 'text-emerald-500' },
    shipped: { label: 'გზაშია', icon: Truck, color: 'text-[#0083EF]' },
    processing: { label: 'მუშავდება', icon: Clock, color: 'text-amber-500' },
};

const ProfilePage = () => {
    const [activeTab, setActiveTab] = useState<Tab>('overview');
    const [editMode, setEditMode] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();
        const wishlist = useSelector((state: RootState) => state.wishlist.products);
    const [openProfileModal, setOpenProfileModal] = useState(false);
    const user = useSelector((state: RootState) => state.user);
    const tabs: { id: Tab; label: string; icon: React.ElementType }[] = [
        { id: 'overview', label: 'მიმოხილვა', icon: User },
        { id: 'orders', label: 'შეკვეთები', icon: Package },
        { id: 'wishlist', label: 'სურვილები', icon: Heart },
        { id: 'settings', label: 'პარამეტრები', icon: Settings },
    ];
  const handleAddToCart = (item: any) => {
        dispatch(addItemToCart(item));
    };
      const handleRemove = (product: WishlistItems) => {
            dispatch(removeItemFromWishlist(product));
        };
    
    return (
        <>
            <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
                {/* Hero Banner */}
                <div className="relative h-40 bg-gradient-to-r from-[#0083EF] via-[#0060c0] to-slate-900 overflow-hidden">
                    <div
                        className="absolute inset-0 opacity-20"
                        style={{
                            backgroundImage: `radial-gradient(circle at 20% 50%, white 1px, transparent 1px),
                                         radial-gradient(circle at 80% 20%, white 1px, transparent 1px)`,
                            backgroundSize: '40px 40px',
                        }}
                    />
                    <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-slate-50 dark:from-slate-950 to-transparent" />
                </div>

                <div className="container mx-auto px-4 max-w-5xl">
                    {/* Avatar + Name row */}
                    <div className="relative flex items-end gap-5 -mt-12 mb-8">
                        <div className="relative shrink-0">
                            <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-[#0083EF] to-[#0060c0] flex items-center justify-center shadow-xl ring-4 ring-slate-50 dark:ring-slate-950">
                                <span className="text-white text-3xl font-bold">
                                    {/* {user.username.slice(0, 1)} */}
                                    <img
                                        className="aspect-square size-full"
                                        src={getAvatarUrl(user)}
                                    />
                                </span>
                            </div>
                            <span className="absolute -bottom-1 -right-1 w-4 h-4 bg-emerald-400 rounded-full ring-2 ring-slate-50 dark:ring-slate-950" />
                        </div>
                        <div className="pb-1 flex-1 flex items-end justify-between">
                            <div>
                                <h1 className="text-xl font-bold text-slate-900 dark:text-white leading-tight">
                                    {user.username}
                                </h1>
                                <p className="text-sm text-slate-500 dark:text-slate-400">
                                    {user.user_type === 1 ? 'ადმინი' : 'მომხარებელი'}
                                </p>
                            </div>
                            <Button
                                size="sm"
                                variant="outline"
                                onClick={() => setOpenProfileModal(true)}
                                className="hidden sm:flex items-center gap-1.5 text-xs"
                            >
                                <Edit3 className="w-3.5 h-3.5" />
                                პროფილის რედაქტირება
                            </Button>
                        </div>
                    </div>

                    {/* Stats strip */}
                    <div className="grid grid-cols-3 gap-3 mb-8">
                        {[
                            { label: 'შეკვეთები', value: '12' },
                            { label: 'სურვილები', value: wishlist?.length },
                            { label: 'დახარჯული', value: '₾ 1,240' },
                        ].map((stat) => (
                            <div
                                key={stat.label}
                                className="bg-white dark:bg-slate-900 rounded-xl p-4 text-center border border-slate-100 dark:border-slate-800 shadow-sm"
                            >
                                <p className="text-xl font-bold text-slate-900 dark:text-white">
                                    {stat.value}
                                </p>
                                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                                    {stat.label}
                                </p>
                            </div>
                        ))}
                    </div>

                    {/* Tabs */}
                    <div className="flex gap-1 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-xl p-1 mb-6 shadow-sm overflow-x-auto">
                        {tabs.map(({ id, label, icon: Icon }) => (
                            <button
                                key={id}
                                onClick={() => setActiveTab(id)}
                                className={cn(
                                    'flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-all flex-1 justify-center',
                                    activeTab === id
                                        ? 'bg-[#0083EF] text-white shadow-sm'
                                        : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200'
                                )}
                            >
                                <Icon className="w-4 h-4" />
                                <span className="hidden sm:inline">{label}</span>
                            </button>
                        ))}
                    </div>

                    <div className="pb-16">
                        {activeTab === 'overview' && (
                            <div className="grid sm:grid-cols-2 gap-4">
                                <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-100 dark:border-slate-800 shadow-sm p-5">
                                    <h3 className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-4">
                                        პირადი ინფორმაცია
                                    </h3>
                                    <div className="space-y-3">
                                        {[
                                            { icon: User, label: 'სახელი', value: user.username },
                                            { icon: Mail, label: 'ელ-ფოსტა', value: user.email },
                                            { icon: Phone, label: 'ტელეფონი', value: user.phone },
                                            // { icon: MapPin, label: 'მისამართი', value: user },
                                        ].map(({ icon: Icon, label, value }) => (
                                            <div key={label} className="flex items-center gap-3">
                                                <div className="w-8 h-8 rounded-lg bg-blue-50 dark:bg-blue-950 flex items-center justify-center shrink-0">
                                                    <Icon className="w-4 h-4 text-[#0083EF]" />
                                                </div>
                                                <div>
                                                    <p className="text-xs text-slate-400">
                                                        {label}
                                                    </p>
                                                    <p className="text-sm font-medium text-slate-800 dark:text-slate-200">
                                                        {value}
                                                    </p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-100 dark:border-slate-800 shadow-sm p-5">
                                    <h3 className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-4">
                                        ბოლო შეკვეთები
                                    </h3>
                                    <div className="space-y-3">
                                        {mockOrders.slice(0, 2).map((order) => {
                                            const s = statusConfig[order.status];
                                            const SIcon = s.icon;
                                            return (
                                                <div
                                                    key={order.id}
                                                    className="flex items-center justify-between py-2 border-b border-slate-50 dark:border-slate-800 last:border-0"
                                                >
                                                    <div>
                                                        <p className="text-sm font-medium text-slate-800 dark:text-slate-200 truncate max-w-[160px]">
                                                            {order.name}
                                                        </p>
                                                        <p className="text-xs text-slate-400">
                                                            {order.id} · {order.date}
                                                        </p>
                                                    </div>
                                                    <div
                                                        className={cn(
                                                            'flex items-center gap-1 text-xs font-medium',
                                                            s.color
                                                        )}
                                                    >
                                                        <SIcon className="w-3.5 h-3.5" />
                                                        {s.label}
                                                    </div>
                                                </div>
                                            );
                                        })}
                                    </div>
                                    <button
                                        onClick={() => setActiveTab('orders')}
                                        className="mt-3 text-xs text-[#0083EF] hover:underline flex items-center gap-1"
                                    >
                                        ყველა შეკვეთის ნახვა <ChevronRight className="w-3 h-3" />
                                    </button>
                                </div>
                            </div>
                        )}

                        {/* Orders */}
                        {activeTab === 'orders' && (
                            <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-100 dark:border-slate-800 shadow-sm divide-y divide-slate-50 dark:divide-slate-800">
                                {mockOrders.map((order) => {
                                    const s = statusConfig[order.status];
                                    const SIcon = s.icon;
                                    return (
                                        <div
                                            key={order.id}
                                            className="flex items-center gap-4 p-4 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors cursor-pointer"
                                        >
                                            <div className="w-10 h-10 rounded-lg bg-blue-50 dark:bg-blue-950 flex items-center justify-center shrink-0">
                                                <ShoppingBag className="w-5 h-5 text-[#0083EF]" />
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <p className="text-sm font-medium text-slate-800 dark:text-slate-200 truncate">
                                                    {order.name}
                                                </p>
                                                <p className="text-xs text-slate-400">
                                                    {order.id} · {order.date}
                                                </p>
                                            </div>
                                            <div className="text-right shrink-0">
                                                <p className="text-sm font-semibold text-slate-800 dark:text-white">
                                                    {order.price}
                                                </p>
                                                <div
                                                    className={cn(
                                                        'flex items-center gap-1 text-xs font-medium justify-end mt-0.5',
                                                        s.color
                                                    )}
                                                >
                                                    <SIcon className="w-3 h-3" />
                                                    {s.label}
                                                </div>
                                            </div>
                                            <ChevronRight className="w-4 h-4 text-slate-300 shrink-0" />
                                        </div>
                                    );
                                })}
                            </div>
                        )}

                        {/* Wishlist */}
                        {activeTab === 'wishlist' && (
                            <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-100 dark:border-slate-800 shadow-sm  text-center">
                                {wishlist.map((item) => (
                        <div
                            key={item.product_uid}
                            className="border-b last:border-b-0 hover:bg-gray-50 transition-colors"
                        >
                            <div className="hidden md:grid grid-cols-12 gap-4 p-4 items-center">
                                <div className="col-span-5 flex items-center gap-4">
                                    <button
                                        onClick={() => handleRemove(item)}
                                        className="text-gray-400 hover:text-red-500 transition-colors"
                                    >
                                        <X className="w-5 h-5" />
                                    </button>
                                    <div className="w-20 h-20 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                                        {item.product_image ? (
                                            <img
                                                src={`${API_URL}${item.product_image}`}
                                                alt={item.product_name}
                                                className="w-full h-full object-cover"
                                            />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center">
                                                <ShoppingCart className="w-8 h-8 text-gray-300" />
                                            </div>
                                        )}
                                    </div>
                                    <h3 className="font-semibold text-gray-900">
                                        {item.product_name}
                                    </h3>
                                </div>

                                <div className="col-span-2 text-center">
                                    <div className="flex flex-col items-center gap-1">
                                        <span className="text-lg font-bold text-primary">
                                            {item.new_price.toFixed(2)} ₾
                                        </span>
                                        {item.has_sale && item.old_price && (
                                            <span className="text-sm text-gray-400 line-through">
                                                {item.old_price.toFixed(2)} ₾
                                            </span>
                                        )}
                                    </div>
                                </div>

                                <div className="col-span-2 text-center">
                                    <span
                                        className={`text-sm font-medium ${
                                            item.stock > 0 ? 'text-green-600' : 'text-red-600'
                                        }`}
                                    >
                                        {item.stock > 0
                                            ? `${item.stock} ერთეული`
                                            : 'არ არის მარაგში'}
                                    </span>
                                </div>

                                <div className="col-span-2 flex justify-end">
                                    <Button
                                        // onClick={() => handleAddToCart(item)}
                                        disabled={item.stock === 0}
                                    >   
                                        კალათაში დამატება
                                    </Button>
                                </div>
                            </div>

                            {/* Mobile layout */}
                            <div className="flex md:hidden gap-3 p-4">
                                {/* Image */}
                                <div className="w-20 h-20 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                                    {item.product_image ? (
                                        <img
                                            src={`${API_URL}${item.product_image}`}
                                            alt={item.product_name}
                                            className="w-full h-full object-cover"
                                        />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center">
                                            <ShoppingCart className="w-8 h-8 text-gray-300" />
                                        </div>
                                    )}
                                </div>

                                {/* Info */}
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-start justify-between gap-2">
                                        <h3 className="font-semibold text-gray-900 text-sm leading-tight">
                                            {item.product_name}
                                        </h3>
                                        <button
                                            // onClick={() => handleRemove(item)}
                                            className="text-gray-400 hover:text-red-500 transition-colors flex-shrink-0"
                                        >
                                            <X className="w-4 h-4" />
                                        </button>
                                    </div>

                                    <div className="mt-1 flex items-center gap-2">
                                        <span className="text-base font-bold text-primary">
                                            {item.new_price.toFixed(2)} ₾
                                        </span>
                                        {item.has_sale && item.old_price && (
                                            <span className="text-xs text-gray-400 line-through">
                                                {item.old_price.toFixed(2)} ₾
                                            </span>
                                        )}
                                    </div>

                                    <span
                                        className={`text-xs font-medium mt-1 inline-block ${
                                            item.stock > 0 ? 'text-green-600' : 'text-red-600'
                                        }`}
                                    >
                                        {item.stock > 0
                                            ? `${item.stock} ერთეული`
                                            : 'არ არის მარაგში'}
                                    </span>

                                    <div className="mt-2">
                                        <Button
                                            size="sm"
                                            className="w-full"
                                            onClick={() => handleAddToCart(item)}
                                            disabled={item.stock === 0}
                                        >
                                            კალათაში დამატება
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                            </div>
                        )}

                        {/* Settings */}
                        {activeTab === 'settings' && (
                            <div className="space-y-3">
                                {[
                                    {
                                        label: 'პაროლის შეცვლა',
                                        desc: 'განაახლეთ თქვენი პაროლი',
                                        icon: Settings,
                                    },
                                    {
                                        label: 'შეტყობინებები',
                                        desc: 'მართეთ ელ-ფოსტის შეტყობინებები',
                                        icon: Mail,
                                    },
                                    {
                                        label: 'მისამართები',
                                        desc: 'მიტანის მისამართების მართვა',
                                        icon: MapPin,
                                    },
                                ].map(({ label, desc, icon: Icon }) => (
                                    <div
                                        key={label}
                                        className="flex items-center gap-4 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-xl p-4 cursor-pointer hover:border-[#0083EF]/40 transition-colors shadow-sm"
                                    >
                                        <div className="w-9 h-9 rounded-lg bg-blue-50 dark:bg-blue-950 flex items-center justify-center shrink-0">
                                            <Icon className="w-4 h-4 text-[#0083EF]" />
                                        </div>
                                        <div className="flex-1">
                                            <p className="text-sm font-medium text-slate-800 dark:text-slate-200">
                                                {label}
                                            </p>
                                            <p className="text-xs text-slate-400">{desc}</p>
                                        </div>
                                        <ChevronRight className="w-4 h-4 text-slate-300" />
                                    </div>
                                ))}

                                <button className="w-full flex items-center gap-4 bg-white dark:bg-slate-900 border border-red-100 dark:border-red-900/30 rounded-xl p-4 cursor-pointer hover:border-red-300 transition-colors shadow-sm group">
                                    <div className="w-9 h-9 rounded-lg bg-red-50 dark:bg-red-950 flex items-center justify-center shrink-0">
                                        <LogOut className="w-4 h-4 text-red-500" />
                                    </div>
                                    <span className="text-sm font-medium text-red-500">გასვლა</span>
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
            {openProfileModal && (
                <EditProfileModal
                    data={user}
                    isOpen={openProfileModal}
                    onClose={() => setOpenProfileModal(false)}
                />
            )}
        </>
    );
};

export default ProfilePage;
