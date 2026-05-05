import { cn } from "@/lib/utils";
import { CheckCircle, ChevronRight, Clock, ShoppingBag, Truck } from "lucide-react";

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

const OrdersTab = () => {
  return (
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
  )
}

export default OrdersTab