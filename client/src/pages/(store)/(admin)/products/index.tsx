import { CButton } from '@/components/common/custom-button';
import { CTable, type Column, type ContextMenuAction } from '@/components/common/custom-table';
import { EditIcon, PlusCircle, Trash2 } from 'lucide-react';
import { useState } from 'react';
import type { TGetProducts } from '@/types';
import AddProduct from './add_edit';
import { useGetProducts } from '@/api/products/get';
import Loading from '@/components/common/loading';
import dayjs from 'dayjs';
import { useDialog } from '@/hooks/use-dialog';
import { API_URL } from '@/constants';
const AdminProducts = () => {
    const { openDialog } = useDialog();
    const { isPending, data: products } = useGetProducts();
    const [isOpen, setIsOpen] = useState(false);
    const [selectedData, setSelectedData] = useState<TGetProducts | null>(null);
    const columns: Column<TGetProducts>[] = [
        {
            header: 'სახელი',
            accessor: (item) => (
                <div className="flex items-center gap-x-3">
                    {item.image && <img width={40} height={40} src={`${API_URL}${item.image}`} />}
                    {item.name}
                </div>
            ),
        },
        {
            header: 'რაოდენობა',
            accessor: 'stock',
        },
        {
            header: 'ბრენდი',
            accessor: (item) => item?.brand?.name,
        },
        {
            header: 'კატეგორია',
            accessor: (item) => item.category.name,
        },
        {
            header: 'წონა',
            accessor: (item) => `${item.weight} ${item.unit.name}`,
        },

        {
            header: 'ფასი',
            accessor: (item) => `${parseFloat(item.price).toFixed(2)}₾`,
        },
        {
            header: 'შექმნის თარიღი',
            accessor: (item) => dayjs(item.created_at).format('MM-DD-YYYY'),
        },
    ];
    const contextMenuActions: ContextMenuAction<TGetProducts>[] = [
        {
            label: 'Edit',
            icon: <EditIcon className="w-4 h-4" />,
            onClick: (product) => {
                setIsOpen(true);
                setSelectedData(product);
            },
        },
        {
            label: 'Delete',
            icon: <Trash2 className="w-4 h-4" />,
            onClick: () => {
                openDialog();
            },
            variant: 'destructive',
            separator: true,
        },
    ];
    if (isPending) {
        return <Loading />;
    }
    return (
        <>
            <div className="flex mb-3 justify-end">
                <CButton
                    onClick={() => setIsOpen(true)}
                    icon={PlusCircle}
                    text="პროდუქტის დამატება"
                />
            </div>
            <CTable
                title="პროდუქტები"
                description="შექმნილი პროდუქტები"
                columns={columns}
                data={products || []}
                contextMenuActions={contextMenuActions}
            />
            {isOpen && <AddProduct data={selectedData} isOpen={isOpen} setIsOpen={setIsOpen} />}
        </>
    );
};

export default AdminProducts;
