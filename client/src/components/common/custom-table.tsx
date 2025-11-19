import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import {
    ContextMenu,
    ContextMenuContent,
    ContextMenuItem,
    ContextMenuSeparator,
    ContextMenuTrigger,
} from '@/components/ui/context-menu';
import type { ReactNode } from 'react';

export interface Column<T> {
    header: string;
    accessor: keyof T | ((item: T) => ReactNode);
    className?: string;
    headerClassName?: string;
}

export interface ContextMenuAction<T> {
    label: string;
    icon?: ReactNode;
    onClick: (item: T) => void;
    variant?: 'default' | 'destructive';
    separator?: boolean;
}

interface ModernTableProps<T> {
    title?: string;
    description?: string;
    columns: Column<T>[];
    data: T[] | [];
    footer?: ReactNode;
    onRowClick?: (item: T) => void;
    contextMenuActions?: ContextMenuAction<T>[];
}

export function CTable<T extends { uid?: string | number }>({
    title,
    description,
    columns,
    data,
    footer,
    onRowClick,
    contextMenuActions,
}: ModernTableProps<T>) {
    const getCellValue = (item: T, column: Column<T>) => {
        if (typeof column.accessor === 'function') {
            return column.accessor(item);
        }
        return item[column.accessor] as ReactNode;
    };

    const renderRow = (item: T, index: number) => {
        const rowContent = (
            <TableRow
                key={item.uid || index}
                className={`transition-colors hover:bg-muted/50 ${
                    onRowClick ? 'cursor-pointer' : ''
                }`}
                onClick={() => onRowClick?.(item)}
            >
                {columns.map((column, colIndex) => (
                    <TableCell
                        key={colIndex}
                        className={column.className || ''}
                    >
                        {getCellValue(item, column)}
                    </TableCell>
                ))}
            </TableRow>
        );

        if (contextMenuActions && contextMenuActions.length > 0) {
            return (
                <ContextMenu modal={false} key={item.uid || index}>
                    <ContextMenuTrigger asChild>
                        {rowContent}
                    </ContextMenuTrigger>
                    <ContextMenuContent className="w-48">
                        {contextMenuActions.map((action, actionIndex) => (
                            <div key={actionIndex}>
                                {action.separator && actionIndex > 0 && <ContextMenuSeparator />}
                                <ContextMenuItem
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        action.onClick(item);
                                    }}
                                    className={
                                        action.variant === 'destructive'
                                            ? 'text-destructive focus:text-destructive'
                                            : ''
                                    }
                                >
                                    {action.icon && (
                                        <span className="mr-2">{action.icon}</span>
                                    )}
                                    {action.label}
                                </ContextMenuItem>
                            </div>
                        ))}
                    </ContextMenuContent>
                </ContextMenu>
            );
        }

        return rowContent;
    };

    return (
        <div className="w-full space-y-4">
            <div className="rounded-lg border bg-card">
                {(title || description) && (
                    <div className="p-6 border-b">
                        {title && (
                            <h2 className="text-2xl font-semibold tracking-tight">{title}</h2>
                        )}
                        {description && (
                            <p className="text-sm text-muted-foreground mt-1">{description}</p>
                        )}
                    </div>
                )}

                <Table>
                    <TableHeader>
                        <TableRow className="hover:bg-transparent">
                            {columns.map((column, index) => (
                                <TableHead
                                    key={index}
                                    className={`font-semibold ${column.headerClassName || ''}`}
                                >
                                    {column.header}
                                </TableHead>
                            ))}
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {data.length === 0 ? (
                            <TableRow>
                                <TableCell
                                    colSpan={columns.length}
                                    className="text-center py-8 text-muted-foreground"
                                >
                                    No data available
                                </TableCell>
                            </TableRow>
                        ) : (
                            data.map((item, index) => renderRow(item, index))
                        )}
                    </TableBody>
                </Table>

                {footer && (
                    <div className="border-t bg-muted/30 px-6 py-4">{footer}</div>
                )}
            </div>
        </div>
    );
}