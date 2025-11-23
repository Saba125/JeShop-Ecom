import { CButton } from '@/components/common/custom-button';
import { EditIcon, EyeIcon, PlusCircle, Trash2 } from 'lucide-react';
import { useEffect, useState } from 'react';
import AddEditSale from './add_edit';
import { useGetSales } from '@/api/sales/get_';
import { CTable, type Column, type ContextMenuAction } from '@/components/common/custom-table';
import type { TGetSales } from '@/types';
import { useDialog } from '@/hooks/use-dialog';
import dayjs from 'dayjs';
import SaleDetails from './details';
import DefaultDeleteDesc from '@/lib/default-delete-text';
import { useDeleteSale } from '@/api/sales/delete_';
const Sales = () => {
    const { openDialog, setOnFinish, setDescription, closeDialog } = useDialog();
    const { data } = useGetSales();
    const { mutate: deleteSale, isSuccess: isDeleteSaleSuccess } = useDeleteSale();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
    const [selectedData, setSelectedData] = useState<TGetSales | null>(null);
    const columns: Column<TGetSales>[] = [
        {
            header: 'კოდი',
            accessor: (item) => <span>{item.code}</span>,
        },
        {
            header: 'შექმნის თარიღი',
            accessor: (item) => <span>{dayjs(item.created_at).format('MM-DD-YYYY')}</span>,
        },
    ];
    const contextMenuActions: ContextMenuAction<TGetSales>[] = [
        {
            label: 'რედაქტირება',
            icon: <EditIcon className="w-4 h-4" />,
            onClick: (sale) => {
                setIsModalOpen(true);
                setSelectedData(sale);
            },
        },
        {
            label: 'დეტალები',
            icon: <EyeIcon className="w-4 h-4" />,
            onClick: (sale) => {
                setIsDetailsModalOpen(true);
                setSelectedData(sale);
            },
        },
        {
            label: 'წაშლა',
            icon: <Trash2 className="w-4 h-4" />,
            onClick: (sale) => {
                openDialog();
                setDescription(DefaultDeleteDesc(sale.code));
                setOnFinish(() => {
                    deleteSale(sale.uid);
                });
            },
            variant: 'destructive',
            separator: true,
        },
    ];
    useEffect(() => {
        if (isDeleteSaleSuccess) {
            closeDialog();
        }
    }, [isDeleteSaleSuccess]);

    return (
        <>
            <div className="flex justify-end mb-3">
                <CButton
                    onClick={() => setIsModalOpen(true)}
                    icon={PlusCircle}
                    text="ფასდაკლების დამატება"
                />
            </div>
            <CTable
                title="ფასდაკლებები"
                description="დამატებული ფასდაკლებები"
                columns={columns}
                data={data || []}
                contextMenuActions={contextMenuActions}
            />
            {isModalOpen && (
                <AddEditSale data={null} isOpen={isModalOpen} setIsOpen={setIsModalOpen} />
            )}
            {isDetailsModalOpen && (
                <SaleDetails
                    data={selectedData}
                    isOpen={isDetailsModalOpen}
                    setIsOpen={setIsDetailsModalOpen}
                />
            )}
        </>
    );
};

export default Sales;
