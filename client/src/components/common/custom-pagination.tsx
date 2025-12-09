import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from '../ui/pagination';

interface CPaginationProps {
    totalPages: number;
    page: number;
    setPage: React.Dispatch<React.SetStateAction<number>>;
}
const CPagination = ({  page, setPage, totalPages }: CPaginationProps) => {
    return (
        <Pagination className="flex justify-end mt-2">
            <PaginationContent>
                <PaginationItem>
                    <PaginationPrevious
                        onClick={() => {
                            if (page === 1) {
                                return;
                            }
                            setPage((prev) => prev - 1);
                        }}
                    />
                </PaginationItem>
                {Array.from({ length: totalPages }).map((item, idx) => {
                    return (
                        <PaginationItem onClick={() => setPage(idx + 1)}>
                            <PaginationLink isActive={page === idx + 1}>{idx + 1}</PaginationLink>
                        </PaginationItem>
                    );
                })}
                <PaginationItem>
                    <PaginationEllipsis />
                </PaginationItem>
                <PaginationItem>
                    <PaginationNext
                        onClick={() => {
                            if (page >= totalPages!) {
                                setPage(0);
                            }
                            setPage((prev) => prev + 1);
                        }}
                    />
                </PaginationItem>
            </PaginationContent>
        </Pagination>
    );
};

export default CPagination;
