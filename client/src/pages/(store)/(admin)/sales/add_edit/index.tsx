import { useGetUsers } from '@/api/users/get_all';
import CDialog from '@/components/common/custom-dialog';
import formSchema from '@/schemas/sales';
import type { AddSales, SaleItems, TGetSales } from '@/types';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import type z from 'zod';
import { type SelectOptions } from '@/types';
import { useEffect, useState } from 'react';
import getAvatarUrl from '@/lib/get_avatar_url';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';
import CSelect from '@/components/common/custom-select';
import { useGetProducts } from '@/api/products/get';
import { API_URL } from '@/constants';
import { RadioGroup } from '@/components/ui/radio-group';
import { RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { InputGroup, InputGroupAddon, InputGroupInput } from '@/components/ui/input-group';
import { GeorgianLariIcon, Percent, PlusCircle, X, Tag } from 'lucide-react';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { FULL_SCREEN_MODAL } from '@/constants/sizes';
import { CButton } from '@/components/common/custom-button';
import { useAddSale } from '@/api/sales/post_';

interface AddEditSaleProps {
    isOpen: boolean;
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
    data: TGetSales | null;
}

const AddEditSale = ({ data, isOpen, setIsOpen }: AddEditSaleProps) => {
    const { data: users } = useGetUsers();
    const { data: products } = useGetProducts();
    const { mutate: addSale, isPending: isAddPending, isSuccess: isAddSuccess } = useAddSale();
    const [userOptions, setUserOptions] = useState<SelectOptions[]>([]);
    const [productOptions, setProductOptions] = useState<SelectOptions[]>([]);
    const [addedItems, setAddedItems] = useState<SaleItems[]>([]);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            description:'',
            code: data?.code || '',
            is_active:  1,
            product_uid:  '0',
            user_uid: '0',
            type:  '1',
            amount: '',
        },
    });

    useEffect(() => {
        const selectOptions: SelectOptions[] =
            users?.map((item) => ({
                label: (
                    <div className="flex items-center gap-x-2">
                        <img src={getAvatarUrl(item)} width={30} height={30} />
                        <span>{item.email}</span>
                    </div>
                ),
                value: item.uid,
            })) || [];
        setUserOptions(selectOptions);
    }, [users]);

    useEffect(() => {
        const selectOptions: SelectOptions[] =
            products?.map((item) => ({
                label: (
                    <div className="flex items-center gap-x-2">
                        {item.image && (
                            <img src={`${API_URL}${item.image}`} width={30} height={30} />
                        )}
                        <span>
                            {item.name} -{' '}
                            <span className="text-green-500">
                                {parseFloat(item.price)?.toFixed(2)}₾
                            </span>
                        </span>
                    </div>
                ),
                value: item.uid,
            })) || [];
        setProductOptions(selectOptions);
    }, [products]);

    const handleSubmit = async () => {
        const values: z.infer<typeof formSchema> = form.getValues();
        if (addedItems.length === 0) {
            toast.error('დაამატეთ ფასდაკლება!');
            return;
        }
        const data: AddSales = {
            code: values!.code,
            description: values?.description || null,
            items: addedItems,
        };
        addSale(data);
    };

    const selectedType = form.watch('type');

    const handleAddItem = async () => {
        const isValid = await form.trigger();
        if (!isValid) return;

        const values: z.infer<typeof formSchema> = form.getValues();

        const checkExistingItem = addedItems.some(
            (item) =>
                item.user_uid === parseInt(values.user_uid) &&
                item.product_uid === parseInt(values.product_uid)
        );

        if (checkExistingItem) {
            toast.error('მსგავსი ფასდაკლება უკვე დამატებულია!');
            return;
        }

        const addedProduct = products?.find((item) => item.uid === parseInt(values.product_uid));
        if (!addedProduct) {
            toast.error('არჩეული პროდუქტი ვერ მოიძებნა!');
            return;
        }

        const addedUser = users?.find((item) => item.uid === parseInt(values.user_uid));
        if (!addedUser) {
            toast.error('არჩეული მომხარებელი ვერ მოიძებნა');
            return;
        }

        let new_price = 0;
        if (selectedType === '1') {
            new_price = parseInt(addedProduct!.price)! * (1 - parseInt(values.amount) / 100);
        } else if (selectedType === '2') {
            new_price = parseInt(addedProduct!.price)! - parseInt(values.amount);
        }

        const newItem: SaleItems = {
            amount: values.amount,
            product_name: addedProduct?.name!,
            new_price,
            old_price: parseInt(addedProduct?.price || ''),
            product_image: addedProduct?.image || null,
            product_uid: addedProduct!.uid,
            type: parseInt(selectedType),
            user_uid: addedUser.uid || null,
            description: values.description || '',
            code: values.code,
            is_active: values.is_active,
        };

        setAddedItems((prev) => [...prev, newItem]);
        form.reset();
        form.setValue('code', values.code);
    };
    if (isAddSuccess) {
        setIsOpen(false);
    }
    return (
        <CDialog
            width={FULL_SCREEN_MODAL}
            open={isOpen}
            onOpenChange={setIsOpen}
            title={data ? `რედაქტირება '${data.code}'` : 'დაამატეთ ახალი ფასდაკლება'}
            extraButton={{
                render: true,
                text: 'დამატება',
                variant: 'outline',
                icon: PlusCircle,
                onClick: handleAddItem,
            }}
            onSubmit={handleSubmit}
            children={
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(handleSubmit)}>
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                            <div className="space-y-6">
                                <FormField
                                    control={form.control}
                                    name="code"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>კოდი</FormLabel>
                                            <FormControl>
                                                <Input placeholder="შეიყვანეთ კოდი..." {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="user_uid"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>მომხმარებელი</FormLabel>
                                            <FormControl>
                                                <CSelect
                                                    value={String(field.value)}
                                                    onChange={field.onChange}
                                                    data={userOptions}
                                                    label="მომხარებელი..."
                                                    placeholder="აირჩიეთ მომხარებელი"
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="product_uid"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>პროდუქტი</FormLabel>
                                            <FormControl>
                                                <CSelect
                                                    value={String(field.value)}
                                                    onChange={field.onChange}
                                                    data={productOptions}
                                                    label="პროდუქტი..."
                                                    placeholder="აირჩიეთ პროდუქტი"
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="type"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>ფასდაკლების ტიპი</FormLabel>
                                            <FormControl>
                                                <RadioGroup
                                                    value={String(field.value)}
                                                    onValueChange={field.onChange}
                                                    className="flex space-x-2 mt-2"
                                                >
                                                    <div className="flex items-center space-x-2">
                                                        <RadioGroupItem value="1" id="option-one" />
                                                        <Label htmlFor="option-one">
                                                            პროცენტული (%)
                                                        </Label>
                                                    </div>
                                                    <div className="flex items-center space-x-2">
                                                        <RadioGroupItem value="2" id="option-two" />
                                                        <Label htmlFor="option-two">
                                                            ფიქსირებული თანხა
                                                        </Label>
                                                    </div>
                                                </RadioGroup>
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="amount"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>ფასდაკლება</FormLabel>
                                            <FormControl>
                                                <InputGroup>
                                                    <InputGroupInput
                                                        {...field}
                                                        placeholder="0.00..."
                                                    />
                                                    <InputGroupAddon>
                                                        {selectedType === '1' ? (
                                                            <Percent />
                                                        ) : (
                                                            <GeorgianLariIcon />
                                                        )}
                                                    </InputGroupAddon>
                                                </InputGroup>
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="description"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>აღწერა</FormLabel>
                                            <FormControl>
                                                <Textarea
                                                    {...field}
                                                    placeholder="შეიყვანეთ აღწერა..."
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>

                            <div className="space-y-4">
                                <div className="flex items-center justify-between">
                                    <h3 className="text-lg font-semibold">
                                        დამატებული ფასდაკლებები
                                    </h3>
                                    <Badge variant="secondary" className="text-xs">
                                        {addedItems.length} ერთეული
                                    </Badge>
                                </div>

                                <Card className="h-[600px] flex flex-col">
                                    <CardContent className="p-4 flex-1 overflow-y-auto">
                                        {addedItems.length === 0 ? (
                                            <div className="flex flex-col items-center justify-center h-full text-center">
                                                <Tag className="w-16 h-16 text-slate-300 dark:text-slate-700 mb-4" />
                                                <p className="text-slate-500 dark:text-slate-400 text-sm">
                                                    ჯერ არ დამატებულა ფასდაკლება
                                                </p>
                                                <p className="text-slate-400 dark:text-slate-500 text-xs mt-1">
                                                    შეავსეთ ფორმა და დააჭირეთ "დამატება" ღილაკს
                                                </p>
                                            </div>
                                        ) : (
                                            <div className="space-y-3">
                                                {addedItems.map((item) => (
                                                    <div
                                                        key={`${item.product_uid}-${item.user_uid}`}
                                                        className="group relative p-3 bg-white dark:bg-slate-950 rounded-lg border border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 hover:shadow-sm transition-all"
                                                    >
                                                        <CButton
                                                            type="button"
                                                            variant="ghost"
                                                            onClick={() => {
                                                                setAddedItems((prev) =>
                                                                    prev.filter(
                                                                        (i) =>
                                                                            !(
                                                                                i.product_uid ===
                                                                                    item.product_uid &&
                                                                                i.user_uid ===
                                                                                    item.user_uid
                                                                            )
                                                                    )
                                                                );
                                                            }}
                                                            className="absolute top-2 right-2 h-6 w-6 opacity-0 group-hover:opacity-100 text-slate-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-950 transition-opacity"
                                                            icon={X}
                                                        />

                                                        <div className="flex items-start gap-3">
                                                            <div className="w-12 h-12 bg-slate-100 dark:bg-slate-800 rounded-md flex items-center justify-center overflow-hidden flex-shrink-0">
                                                                {item.product_image ? (
                                                                    <img
                                                                        src={`${API_URL}${item.product_image}`}
                                                                        alt={item.product_name}
                                                                        className="w-full h-full object-cover"
                                                                    />
                                                                ) : (
                                                                    <Tag className="w-6 h-6 text-slate-400" />
                                                                )}
                                                            </div>

                                                            <div className="flex-1 min-w-0 pr-6">
                                                                <h3 className="font-medium text-sm text-slate-900 dark:text-slate-100 truncate mb-1">
                                                                    {item.product_name}
                                                                </h3>

                                                                <div className="flex items-center gap-2 mb-2">
                                                                    <span className="text-xs text-slate-500 line-through">
                                                                        {item.old_price.toFixed(2)}₾
                                                                    </span>
                                                                    <span className="text-sm font-bold text-green-600 dark:text-green-500">
                                                                        {item.new_price.toFixed(2)}₾
                                                                    </span>
                                                                </div>

                                                                <div className="flex items-center gap-1.5 flex-wrap">
                                                                    <Badge
                                                                        variant="secondary"
                                                                        className="text-xs px-1.5 py-0 h-5 bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300"
                                                                    >
                                                                        -
                                                                        {(
                                                                            ((item.old_price -
                                                                                item.new_price) /
                                                                                item.old_price) *
                                                                            100
                                                                        ).toFixed(0)}
                                                                        %
                                                                    </Badge>
                                                                    <Badge
                                                                        variant="outline"
                                                                        className="text-xs px-1.5 py-0 h-5"
                                                                    >
                                                                        {item.type === 1
                                                                            ? 'პროცენტული'
                                                                            : 'ფიქსირებული'}
                                                                    </Badge>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                    </CardContent>

                                    {/* Summary Footer */}
                                    {addedItems.length > 0 && (
                                        <div className="p-4 border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50">
                                            <div className="flex items-center justify-between text-sm">
                                                <span className="text-slate-600 dark:text-slate-400 font-medium">
                                                    სულ დამატებულია
                                                </span>
                                                <span className="font-bold text-slate-900 dark:text-slate-100">
                                                    {addedItems.length} ფასდაკლება
                                                </span>
                                            </div>
                                        </div>
                                    )}
                                </Card>
                            </div>
                        </div>
                    </form>
                </Form>
            }
        />
    );
};

export default AddEditSale;
