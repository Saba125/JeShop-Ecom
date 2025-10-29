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
const AdminProducts = () => {
    const { openDialog } = useDialog();
    const { isPending, data: products } = useGetProducts();
    const [isOpen, setIsOpen] = useState(false);
    const [selectedData, setSelectedData] = useState<TGetProducts | null>(null);
    const columns: Column<TGetProducts>[] = [
        {
            header: 'სახელი',
            accessor: 'name',
        },
        {
            header: 'რაოდენოობა',
            accessor: 'stock',
        },
        {
            header: 'კატეგორია',
            accessor: (item) => item.category.name,
        },
        {
            header: 'წონა',
            accessor: 'weight',
        },
        {
            header: 'წონის ერთეული',
            accessor: (item) => item.unit.name
        },
        {
            header: 'ფასი',
            accessor: 'price',
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
                openDialog()
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
