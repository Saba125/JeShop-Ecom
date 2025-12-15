import CDialog from '@/components/common/custom-dialog';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import type { TGetSales } from '@/types';
import { API_URL } from '@/constants';
import { Calendar, Tag, User, Package, Percent, BadgeDollarSign, GeorgianLariIcon } from 'lucide-react';
import React from 'react';
import getAvatarUrl from '@/lib/get_avatar_url';

interface SaleDetailsProps {
    isOpen: boolean;
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
    data: TGetSales | null;
}

const SaleDetails = ({ data, isOpen, setIsOpen }: SaleDetailsProps) => {
    if (!data) return null;

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('ka-GE', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
        });
    };

    const calculateDiscountDisplay = (product: any) => {
        const oldPrice = parseFloat(product.price);
        const newPrice = parseFloat(product.sale);

        // If sale_type is 1, it's percentage
        if (product.sale_type === 1) {
            const percentage = (((oldPrice - newPrice) / oldPrice) * 100).toFixed(0);
            return {
                icon: Percent,
                text: `${percentage}%`,
                label: 'პროცენტული',
            };
        }
        // If sale_type is 2, it's fixed amount
        else if (product.sale_type === 2) {
            const fixedAmount = (oldPrice - newPrice).toFixed(2);
            return {
                icon: BadgeDollarSign,
                text: `${fixedAmount}₾`,
                label: 'ფიქსირებული',
            };
        }

        // Fallback
        const percentage = (((oldPrice - newPrice) / oldPrice) * 100).toFixed(0);
        return {
            icon: Percent,
            text: `${percentage}%`,
            label: 'პროცენტული',
        };
    };

    const calculatePrice = (saleType: number, oldPrice: number, sale: number) => {
        let price = 0;
        if (saleType === 1) {
            price = oldPrice * (1 - sale / 100);
        } else {
            price = oldPrice - sale;
        }
        return price;
    };
    return (
        <CDialog
            width="700px"
            open={isOpen}
            onOpenChange={setIsOpen}
            title={`${data?.code} - დეტალები`}
            children={
                <div className="space-y-4">
                    {/* Sale Info Card */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-base flex items-center gap-2">
                                <Tag className="w-4 h-4" />
                                ფასდაკლების ინფორმაცია
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-3">
                            <div className="flex items-center justify-between">
                                <span className="text-sm text-slate-600 dark:text-slate-400 flex items-center gap-2">
                                    <Tag className="w-4 h-4" />
                                    კოდი:
                                </span>
                                <Badge variant="outline" className="font-mono">
                                    {data.code}
                                </Badge>
                            </div>

                            <Separator />

                            <div className="flex items-center justify-between">
                                <span className="text-sm text-slate-600 dark:text-slate-400 flex items-center gap-2">
                                    <Calendar className="w-4 h-4" />
                                    შექმნის თარიღი:
                                </span>
                                <span className="text-sm font-medium">
                                    {formatDate(data.created_at)}
                                </span>
                            </div>

                            {data.description && (
                                <>
                                    <Separator />
                                    <div>
                                        <span className="text-sm text-slate-600 dark:text-slate-400 block mb-1">
                                            აღწერა:
                                        </span>
                                        <p className="text-sm bg-slate-50 dark:bg-slate-900 p-3 rounded-md">
                                            {data.description}
                                        </p>
                                    </div>
                                </>
                            )}
                        </CardContent>
                    </Card>

                    {/* Users Card */}
                    {data.users && data.users.length > 0 && (
                        <Card>
                            <CardHeader>
                                <CardTitle className="text-base flex items-center gap-2">
                                    <User className="w-4 h-4" />
                                    მომხმარებლები ({data.users.length})
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-2">
                                    {data.users.map((user) => (
                                        <div
                                            key={user.uid}
                                            className="flex items-center gap-3 p-3 bg-slate-50 dark:bg-slate-900 rounded-lg"
                                        >
                                            <img
                                                src={getAvatarUrl(user)}
                                                alt={user.email}
                                                className="w-10 h-10 rounded-full"
                                            />
                                            <div className="flex-1 min-w-0">
                                                <p className="text-sm font-medium truncate">
                                                    {user.username || user.email}
                                                </p>
                                                <p className="text-xs text-slate-500 truncate">
                                                    {user.email}
                                                </p>
                                            </div>
                                            <Badge
                                                variant={user.is_active ? 'default' : 'secondary'}
                                                className="text-xs"
                                            >
                                                {user.is_active ? 'აქტიური' : 'არააქტიური'}
                                            </Badge>
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    )}

                    {/* Products Card */}
                    {data.products && data.products.length > 0 && (
                        <Card>
                            <CardHeader>
                                <CardTitle className="text-base flex items-center gap-2">
                                    <Package className="w-4 h-4" />
                                    პროდუქტები ({data.products.length})
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-3">
                                    {data.products.map((product) => {
                                        const discountInfo = calculateDiscountDisplay(product);
                                        const DiscountIcon = discountInfo.icon;

                                        return (
                                            <div
                                                key={product.uid}
                                                className="flex items-center gap-3 p-3 bg-slate-50 dark:bg-slate-900 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                                            >
                                                {/* Product Image */}
                                                <div className="w-16 h-16 bg-slate-200 dark:bg-slate-700 rounded-md flex items-center justify-center overflow-hidden flex-shrink-0">
                                                    {product.image ? (
                                                        <img
                                                            src={`${API_URL}${product.image}`}
                                                            alt={product.name}
                                                            className="w-full h-full object-cover"
                                                        />
                                                    ) : (
                                                        <Package className="w-8 h-8 text-slate-400" />
                                                    )}
                                                </div>

                                                {/* Product Info */}
                                                <div className="flex-1 min-w-0">
                                                    <h4 className="font-medium text-sm truncate mb-1">
                                                        {product.name}
                                                    </h4>

                                                    {/* Pricing */}
                                                    <div className="flex items-center gap-2 mb-1">
                                                        <span className="text-xs text-slate-500 line-through">
                                                            {parseFloat(product.price).toFixed(2)}₾
                                                        </span>
                                                        <span className="text-sm font-bold text-green-600 dark:text-green-500">
                                                            {calculatePrice(
                                                                product.sale_type!,
                                                                parseInt(product?.price),
                                                                product.sale!
                                                            )}
                                                            ₾
                                                        </span>
                                                    </div>

                                                    {/* Badges */}
                                                    <div className="flex items-center gap-1.5 flex-wrap">
                                                        <Badge
                                                            variant="secondary"
                                                            className="text-xs px-1.5 py-0 h-5 bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300"
                                                        >
                                                            {product.sale_type === 1 ? (

                                                                <DiscountIcon className="w-3 h-3 mr-0.5" />
                                                            ) : (
                                                                <GeorgianLariIcon />
                                                            )}
                                                        </Badge>
                                                        <Badge
                                                            variant="outline"
                                                            className="text-xs px-1.5 py-0 h-5"
                                                        >
                                                            {discountInfo.label}
                                                        </Badge>
                                                        <Badge
                                                            variant="outline"
                                                            className="text-xs px-1.5 py-0 h-5"
                                                        >
                                                            მარაგი: {product.stock}
                                                        </Badge>
                                                        {product.weight && (
                                                            <Badge
                                                                variant="outline"
                                                                className="text-xs px-1.5 py-0 h-5"
                                                            >
                                                                {product.weight} კგ
                                                            </Badge>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </CardContent>
                        </Card>
                    )}
                </div>
            }
        />
    );
};

export default SaleDetails;
