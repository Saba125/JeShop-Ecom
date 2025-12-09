import { CButton } from '@/components/common/custom-button';
import { useState } from 'react';
import { EditIcon, Loader2, PlusCircle, Trash2 } from 'lucide-react';
import AddCategory from './add_';
import { CTable, type Column, type ContextMenuAction } from '@/components/common/custom-table';
import type { Category } from '@/types';
import { useDeleteCategory } from '@/api/category/delete';
import dayjs from 'dayjs';
import { useGetCategoriesPaginated } from '@/api/category/get/get_paginated';
import CPagination from '@/components/common/custom-pagination';
const AdminCategories = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [page, setPage] = useState(1);
    const pageSize = 10;
    const [selectedData, setSelectedData] = useState<Category | null>(null);
    const { data, isPending } = useGetCategoriesPaginated(page, pageSize);
    const { mutate: deleteCategory } = useDeleteCategory();
    const columns: Column<Category>[] = [
        {
            header: 'სახელი',
            accessor: 'name',
        },
        {
            header: 'მისამართი',
            accessor: 'url',
        },
        {
            header: 'აღწერა',
            accessor: 'description',
        },
        {
            header: 'შექმნის თარიღი',
            accessor: (item) => dayjs(item.created_at).format('MM-DD-YYYY'),
        },
    ];

    if (isPending) {
        return <Loader2 className="animate-spin" />;
    }

    const contextMenuActions: ContextMenuAction<Category>[] = [
        {
            label: 'რედაქტირება',
            icon: <EditIcon className="w-4 h-4" />,
            onClick: (category) => {
                setIsOpen(true);
                setSelectedData(category);
            },
        },
        {
            label: 'წაშლა',
            icon: <Trash2 className="w-4 h-4" />,
            onClick: (category) => deleteCategory(category.uid),
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
                data={data?.data ?? []}
            />

            <CPagination page={page} setPage={setPage} totalPages={data?.pagination.totalPages!} />

            {isOpen && <AddCategory data={selectedData} isOpen={isOpen} setIsOpen={setIsOpen} />}
        </>
    );
};

export default AdminCategories;
