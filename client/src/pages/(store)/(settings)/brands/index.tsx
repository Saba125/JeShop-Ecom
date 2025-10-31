import { EditIcon, PlusCircle, Trash2 } from 'lucide-react';
import { useState } from 'react';
import AddEditBrand from './add_edit';
import { CButton } from '@/components/common/custom-button';
import { useGetBrands } from '@/api/brands/get_';
import Loading from '@/components/common/loading';
import { CTable, type Column, type ContextMenuAction } from '@/components/common/custom-table';
import type { TGetBrand } from '@/types';
import dayjs from 'dayjs';
import { useDialog } from '@/hooks/use-dialog';
import { useDeleteBrand } from '@/api/brands/delete_';
import DefaultDeleteDesc from '@/lib/default-delete-text';
const BrandSettings = () => {
    const { openDialog, setOnFinish, setDescription } = useDialog();
    const { data: brands, isLoading } = useGetBrands();
    const { mutate: deleteBrand } = useDeleteBrand();
    const [selectedData, setSelectedData] = useState<TGetBrand | null>(null);
    const [isOpen, setIsOpen] = useState(false);
    const columns: Column<TGetBrand>[] = [
        {
            header: 'სახელი',
            accessor: 'name',
        },
        {
            header: 'აღწერა',
            accessor: (item) => item.description || '-',
        },

        {
            header: 'შექმნის თარიღი',
            accessor: (item) => dayjs(item.created_at).format('MM-DD-YYYY'),
        },
    ];
    const contextMenuActions: ContextMenuAction<TGetBrand>[] = [
        {
            label: 'Edit',
            icon: <EditIcon className="w-4 h-4" />,
            onClick: (brand) => {
                setIsOpen(true);
                setSelectedData(brand);
            },
        },
        {
            label: 'Delete',
            icon: <Trash2 className="w-4 h-4" />,
            onClick: (brand) => {
                openDialog();
                setDescription(DefaultDeleteDesc(brand.name));
                setOnFinish(() => deleteBrand(brand.uid));
            },
            variant: 'destructive',
            separator: true,
        },
    ];

    if (isLoading) {
        return <Loading />;
    }
    return (
        <>
            <div className="flex justify-end">
                <CButton
                    icon={PlusCircle}
                    text="ბრენდის დამატება"
                    onClick={() => setIsOpen(true)}
                />
            </div>
            <CTable
                title="ბრენდები"
                description="შექმნილი ბრენდები"
                columns={columns}
                data={brands || []}
                contextMenuActions={contextMenuActions}
            />
            {isOpen && <AddEditBrand data={selectedData} isOpen={isOpen} setIsOpen={setIsOpen} />}
        </>
    );
};

export default BrandSettings;
