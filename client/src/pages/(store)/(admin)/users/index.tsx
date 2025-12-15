import { useGetUsers } from '@/api/users/get_all';
import { useGetUsersPaginated } from '@/api/users/get_paginated';
import CPagination from '@/components/common/custom-pagination';
import { CTable, type Column, type ContextMenuAction } from '@/components/common/custom-table';
import Loading from '@/components/common/loading';
import type { User } from '@/types';
import dayjs from 'dayjs';
import { EditIcon, Trash2 } from 'lucide-react';
import { useEffect, useState } from 'react';
import EditUser from './edit_';
import { useDialog } from '@/hooks/use-dialog';
import { useDeleteUser } from '@/api/users/delete_';
import DefaultDeleteDesc from '@/lib/default-delete-text';

const UsersPage = () => {
    const { openDialog, setOnFinish, closeDialog } = useDialog();
    const pageSize = 10;
    const [page, setPage] = useState(1);
    const { data: users, isPending } = useGetUsersPaginated(page, pageSize);
    const { mutate: deleteUser, isSuccess } = useDeleteUser();
    const [isOpen, setIsOpen] = useState(false);
    const [selectedData, setSelectedData] = useState<User | null>(null);
    const tableColumns: Column<User>[] = [
        {
            header: 'სახელი',
            accessor: 'username',
        },
        {
            header: 'მაილი',
            accessor: 'email',
        },
        {
            header: 'ტელ.ნომერი',
            accessor: (item) => <span>{item.phone || '-'}</span>,
        },
        {
            header: 'როლი',
            accessor: (item) => <span>{item.user_type === 1 ? 'ადმინი' : 'მომხარებელი'}</span>,
        },
        {
            header: 'სტატუსი',
            accessor: (item) => <span>{item.is_active === 1 ? 'აქტიური' : 'დაბლოკილი'}</span>,
        },
        {
            header: 'მაილის სტატუსი',
            accessor: (item) => (
                <span>{item.email_verified_date ? 'ვერიფიცირებული' : 'დაუდასტურებელი'}</span>
            ),
        },
        {
            header: 'რეგისტრაციის თარიღი',
            accessor: (item) => <span>{dayjs(item.create_date).format('MM-DD-YYYY')}</span>,
        },
    ];
    const contextMenuActions: ContextMenuAction<User>[] = [
        {
            label: 'რედაქტირება',
            icon: <EditIcon className="w-4 h-4" />,
            onClick: (user) => {
                setIsOpen(true);
                setSelectedData(user);
            },
        },
        {
            label: 'წაშლა',
            icon: <Trash2 className="w-4 h-4" />,
            onClick: (user) => {
                openDialog(null, DefaultDeleteDesc(user.username));
                setOnFinish(() => deleteUser(user.uid));
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
            <CTable
                columns={tableColumns}
                data={users?.data || []}
                contextMenuActions={contextMenuActions}
                title="მომხარებლები"
                description="არსებული მომხარებლები"
            />
            <CPagination page={page} setPage={setPage} totalPages={users?.pagination.totalPages!} />
            {isOpen && <EditUser isOpen={isOpen} data={selectedData} setIsOpen={setIsOpen} />}
        </>
    );
};

export default UsersPage;
