import { CButton } from '@/components/common/custom-button';
import { EditIcon, PlusCircle, Trash2 } from 'lucide-react';
import React, { useState } from 'react';
import AddEditUnit from './add_edit';
import { useGetUnits } from '@/api/units/get_';
import Loading from '@/components/common/loading';
import { CTable, type Column, type ContextMenuAction } from '@/components/common/custom-table';
import type { TGetUnit } from '@/types';
import dayjs from 'dayjs';
import { useDialog } from '@/hooks/use-dialog';
import DefaultDeleteDesc from '@/lib/default-delete-text';
import { useDeleteUnit } from '@/api/units/delete_';

const UnitSettings = () => {
    const [isOpen, setIsOpen] = useState(false);
    const { isPending, data: units } = useGetUnits();
    const {mutate: deleteUnit} = useDeleteUnit()
    const { openDialog, setDescription,setOnFinish } = useDialog();
    const [selectedData, setSelectedData] = useState<TGetUnit | null>(null);
    if (isPending) {
        return <Loading />;
    }
    const columns: Column<TGetUnit>[] = [
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
    const contextMenuActions: ContextMenuAction<TGetUnit>[] = [
        {
            label: 'Edit',
            icon: <EditIcon className="w-4 h-4" />,
            onClick: (unit) => {
                setIsOpen(true);
                setSelectedData(unit);
            },
        },
        {
            label: 'Delete',
            icon: <Trash2 className="w-4 h-4" />,
            onClick: (unit) => {
                openDialog();
                setDescription(
                  DefaultDeleteDesc(unit.name)
                );
                setOnFinish(() => deleteUnit(unit.uid))
            },
            variant: 'destructive',
            separator: true,
        },
    ];

    return (
        <>
            <div className="flex justify-end">
                <CButton
                    icon={PlusCircle}
                    text="ერთეულის დამატება"
                    onClick={() => setIsOpen(true)}
                />
            </div>
            <CTable
                title="ერთეულები"
                description="შექმნილი ერთეულები"
                columns={columns}
                data={units || []}
                contextMenuActions={contextMenuActions}
            />
            {isOpen && (
                <AddEditUnit data={selectedData} isOpen={isOpen} setIsOpen={() => setIsOpen(false)} />
            )}
        </>
    );
};

export default UnitSettings;
