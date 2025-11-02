import CDialog from '@/components/common/custom-dialog';
import formSchema from '@/schemas/sales';
import type { TGetSales } from '@/types';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import type z from 'zod';

interface AddEditSaleProps {
    isOpen: boolean;
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
    data: TGetSales | null;
}
const AddEditSale = ({ data, isOpen, setIsOpen }: AddEditSaleProps) => {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            description: data?.description || '',
             code: data?.code || '',
             is_active: data?.is_active || 1,
             product_uid: String(data?.product_uid) || "0",
             user_uid: String(data?.user_uid) || "0",
             type: data?.type || 1,
        },
    });
    return (
        <CDialog
            open={isOpen}
            onOpenChange={setIsOpen}
            title={data ? `რედაქტირება '${data.code}'` : 'დაამატეთ ახალი ფასდაკლება'}
            children={
                <div>
                    Hello world
                </div>
            }
        />
    );
};

export default AddEditSale;
