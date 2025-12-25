'use client';

import Button from "./ui-kit/Button";

type PageItem = number | '...';

interface PaginationProps {
    totalPages: number;
    currentPage: number;
    itemPerPage: number;
    onPageChange: (page: number) => void;
    onItemPerPageChange: (limit: number) => void;
}

const getPaginationRange = (
    current: number,
    total: number,
    delta = 2
): PageItem[] => {
    if (total <= 1) return [1];

    const range: PageItem[] = [];
    const left = Math.max(2, current - delta);
    const right = Math.min(total - 1, current + delta);

    range.push(1);
    if (left > 2) range.push('...');
    for (let i = left; i <= right; i++) range.push(i);
    if (right < total - 1) range.push('...');
    range.push(total);

    return range;
};

const Pagination = ({
    totalPages,
    currentPage,
    itemPerPage,
    onPageChange,
    onItemPerPageChange,
}: PaginationProps) => {
    const pages = getPaginationRange(currentPage, totalPages);

    return (
        <div className="w-full flex justify-between bg-white/90 backdrop-blur border-t shadow-2xl px-4 py-2  mt-4">

            {/* Left */}
            <div className="flex items-center gap-2 text-sm">
                <span className="text-gray-500">Rows:</span>
                <select
                    value={itemPerPage}
                    onChange={(e) => onItemPerPageChange(Number(e.target.value))}
                    className="border rounded-md px-2 py-1 border-slate-400"
                >
                    <option value={10}>10</option>
                    <option value={50}>50</option>
                    <option value={100}>100</option>
                    <option value={200}>200</option>
                </select>
            </div>

            {/* Center */}
            <div className="flex items-center gap-2">
                <Button
                    variant="pagination"
                    disabled={currentPage === 1}
                    onClick={() => onPageChange(currentPage - 1)}
                >
                    ‹
                </Button>

                {pages.map((page, index) => {
                    if (page === '...') {
                        return (
                            <span key={`dots-${index}`} className="px-1 text-gray-400">
                                …
                            </span>
                        );
                    }

                    return (
                        <Button
                            key={page}
                            variant="pagination"
                            isActive={currentPage === page}
                            onClick={() => onPageChange(page)}
                        >
                            {page}
                        </Button>
                    );
                })}

                <Button
                    variant="pagination"
                    disabled={currentPage === totalPages}
                    onClick={() => onPageChange(currentPage + 1)}
                >
                    ›
                </Button>
            </div>

            <div className="w-[80px]" />
        </div>
    );
};

export default Pagination;
