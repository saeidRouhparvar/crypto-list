'use client';

import Pagination from "../../Pagination";
import { Column } from "./type";
import { ReactNode } from "react";

interface TableProps<T> {
  data: T[];
  columns: Column<T>[];

  totalCount: number;
  page: number;
  itemPerPage: number;

  onPageChange: (page: number) => void;
  onItemPerPageChange: (limit: number) => void;

  renderRow?: (row: T) => ReactNode;
}

function Table<T>({
  data,
  columns,
  totalCount,
  page,
  itemPerPage,
  onPageChange,
  onItemPerPageChange,
  renderRow,
}: TableProps<T>) {
  const totalPages = Math.ceil(totalCount / itemPerPage);

  return (
    <div className="grid grid-cols-1 place-items-center w-full gap-3">
      <table className="w-full table-auto border-collapse text-sm">
        <thead className="bg-gray-100 text-gray-700">
          <tr>
            {columns.map(col => (
              <th
                key={String(col.key)}
                className={`p-2 text-${col.align ?? "left"}`}
              >
                {col.title}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {data.map((row, i) =>
            renderRow ? renderRow(row) : (
              <tr key={i}>
                {columns.map(col => (
                  <td
                    key={String(col.key)}
                    className={`p-2 text-${col.align ?? "left"}`}
                  >
                    {col.render
                      ? col.render(row)
                      : String(row[col.key as keyof T])}
                  </td>
                ))}
              </tr>
            )
          )}
        </tbody>
      </table>
      <Pagination
        totalPages={totalPages}
        currentPage={page}
        itemPerPage={itemPerPage}
        onPageChange={onPageChange}
        onItemPerPageChange={onItemPerPageChange}
      />
    </div>
  );
}

export default Table;
