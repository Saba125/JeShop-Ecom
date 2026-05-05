import React, { useState } from 'react';
import {
    User as UserIcon,
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
} from 'lucide-react';
import type { User } from '@/types';
import { cn } from '@/lib/utils';
import type { Tab } from '.';
interface OverviewTabProps {
    user: User;
}

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

const OverviewTab = ({ user }: OverviewTabProps) => {
    const statusConfig: Record<string, { label: string; icon: React.ElementType; color: string }> =
        {
            delivered: { label: 'მიღებულია', icon: CheckCircle, color: 'text-emerald-500' },
            shipped: { label: 'გზაშია', icon: Truck, color: 'text-[#0083EF]' },
            processing: { label: 'მუშავდება', icon: Clock, color: 'text-amber-500' },
        };
    const [activeTab, setActiveTab] = useState<Tab>('overview');

    return (
        <div className="grid sm:grid-cols-2 gap-4">
            <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-100 dark:border-slate-800 shadow-sm p-5">
                <h3 className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-4">
                    პირადი ინფორმაცია
                </h3>
                <div className="space-y-3">
                    {[
                        { icon: UserIcon, label: 'სახელი', value: user.username },
                        { icon: Mail, label: 'ელ-ფოსტა', value: user.email },
                        { icon: Phone, label: 'ტელეფონი', value: user.phone },
                        // { icon: MapPin, label: 'მისამართი', value: user },
                    ].map(({ icon: Icon, label, value }) => (
                        <div key={label} className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-lg bg-blue-50 dark:bg-blue-950 flex items-center justify-center shrink-0">
                                <Icon className="w-4 h-4 text-[#0083EF]" />
                            </div>
                            <div>
                                <p className="text-xs text-slate-400">{label}</p>
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
    );
};

export default OverviewTab;
