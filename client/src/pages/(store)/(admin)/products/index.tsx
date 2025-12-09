import { CButton } from '@/components/common/custom-button';
import { CTable, type Column, type ContextMenuAction } from '@/components/common/custom-table';
import { EditIcon, PlusCircle, Trash2 } from 'lucide-react';
import { useEffect, useState } from 'react';
import type { TGetProducts } from '@/types';
import AddProduct from './add_edit';
import Loading from '@/components/common/loading';
import dayjs from 'dayjs';
import { useDialog } from '@/hooks/use-dialog';
import { API_URL } from '@/constants';
import DefaultDeleteDesc from '@/lib/default-delete-text';
import { useDeleteProduct } from '@/api/products/delete';
import { useGetProductsPaginated } from '@/api/products/get_paginated';
import CPagination from '@/components/common/custom-pagination';
const AdminProducts = () => {
    const { openDialog, setOnFinish, closeDialog } = useDialog();
    const [page, setPage] = useState(1);
    const pageSize = 10;
    const { isPending, data: products } = useGetProductsPaginated(page, pageSize);
    const { mutate: deleteProduct, isSuccess } = useDeleteProduct();
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
            accessor: (item) => {
                let color;
                if (item.stock < 0 || item.stock === 0) {
                    color = 'red';
                }
                return <span style={{ color }}>{item.stock}</span>;
            },
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
            accessor: (item) => `${item.price}₾`,
        },
        {
            header: 'შექმნის თარიღი',
            accessor: (item) => dayjs(item.created_at).format('MM-DD-YYYY'),
        },
    ];
    const contextMenuActions: ContextMenuAction<TGetProducts>[] = [
        {
            label: 'რედაქტირება',
            icon: <EditIcon className="w-4 h-4" />,
            onClick: (product) => {
                setIsOpen(true);
                setSelectedData(product);
            },
        },
        {
            label: 'წაშლა',
            icon: <Trash2 className="w-4 h-4" />,
            onClick: (product) => {
                openDialog(null, DefaultDeleteDesc(product.name));
                setOnFinish(() => deleteProduct(product.uid));
            },
            variant: 'destructive',
            separator: true,
        },
    ];
    useEffect(() => {
        if (isSuccess) {
            closeDialog();
        }
    }, [isSuccess]);
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
                data={products?.data || []}
                contextMenuActions={contextMenuActions}
            />
            <CPagination
            page={page}
            setPage={setPage}
            totalPages={products?.pagination.totalPages!}
            />

            {isOpen && <AddProduct data={selectedData} isOpen={isOpen} setIsOpen={setIsOpen} />}
        </>
    );
};

export default AdminProducts;
