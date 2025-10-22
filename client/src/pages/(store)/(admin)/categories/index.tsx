import { CButton } from '@/components/common/custom-button';
import { useState } from 'react';
import { EditIcon, Loader2, PlusCircle, Trash2 } from 'lucide-react';
import AddCategory from './add_';
import { CTable, type Column, type ContextMenuAction } from '@/components/common/custom-table';
import { useGetCategories } from '@/api/category/get';
import type { Category } from '@/types';
import { useDeleteCategory } from '@/api/category/delete';
import dayjs from 'dayjs';
const AdminCategories = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedData, setSelectedData] = useState<Category | null>(null);
    const { data, isPending } = useGetCategories();
    const {mutate: deleteCategory} = useDeleteCategory();
    const columns: Column<Category>[] = [
        {
            header: 'სახელი',
            accessor: 'name',
        },
        {
            header: 'აღწერა',
            accessor: 'description',
        },
        {
            header: 'შექმნის თარიღი',
            accessor: ((item) => dayjs(item.created_at).format("MM-DD-YYYY"))
        },
    ];

    if (isPending) {
        return <Loader2 className="animate-spin" />;
    }

    const contextMenuActions: ContextMenuAction<Category>[] = [
        {
            label: 'Edit',
            icon: <EditIcon className="w-4 h-4" />,
            onClick: (category) => {
                setIsOpen(true);
                setSelectedData(category);
            },
        },
        {
            label: 'Delete',
            icon: <Trash2 className="w-4 h-4" />,
            onClick: (category) => deleteCategory(category.uid) ,
            variant: 'destructive',
            separator: true,
        },
    ];
    return (
        <>
            <div className="flex mb-3 justify-end">
                <CButton
                    onClick={() => setIsOpen(true)}
                    icon={PlusCircle}
                    text="კატეგორიის დამატება"
                />
            </div>

            <CTable
                contextMenuActions={contextMenuActions}
                title="კატეგორიები"
                description="შექმინილი კატეგორიები"
                columns={columns}
                data={data ?? []}
            />

            {isOpen && <AddCategory data={selectedData} isOpen={isOpen} setIsOpen={setIsOpen} />}
        </>
    );
};

export default AdminCategories;
