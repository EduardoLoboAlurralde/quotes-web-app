"use client";
import React, { useState } from "react";

type Column = {
  key: string;
  label: string;
  align?: "left" | "center" | "right";
  width?: string | number;
};

type PageData<T> = {
  rows: T[];
  total: number;
};

type Props<T> = {
  dataSource: PageData<T>;
  columns: Column[];
  RowComponent: React.FC<{ row: T }>;
  rowsPerPageOptions?: number[];
  defaultRowsPerPage?: number;
  onRefresh?: (params: { page: number; rowsPerPage: number }) => void;
};

export default function Table<T>({
  dataSource,
  columns,
  RowComponent,
  rowsPerPageOptions = [5, 10, 25],
  defaultRowsPerPage = 5,
  onRefresh,
}: Props<T>) {
  const { rows, total } = dataSource;
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(defaultRowsPerPage);

  const totalPages = rowsPerPage > 0 ? Math.ceil(total / rowsPerPage) : 1;

  const handleChangePage = (newPage: number) => {
    if (newPage >= 0 && newPage < totalPages) {
      setPage(newPage);
      onRefresh?.({ page: newPage, rowsPerPage });
    }
  };

  const handleChangeRowsPerPage = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newRows = parseInt(e.target.value, 10);
    setRowsPerPage(newRows);
    setPage(0);
    onRefresh?.({ page: 0, rowsPerPage: newRows });
  };

  const handleRefresh = () => {
    onRefresh?.({ page, rowsPerPage });
  };

  return (
    <div
      style={{
        width: "100%",
        background: "white",
        borderRadius: 8,
        color: "black",
      }}
    >
      <table style={{ borderCollapse: "collapse", width: "100%" }}>
        {/* Header */}
        <thead style={{ background: "#f5f5f5" }}>
          <tr>
            {columns.map((col) => (
              <th
                key={col.key}
                style={{
                  textAlign: col.align || "left",
                  padding: "10px",
                  borderBottom: "2px solid #ccc",
                  fontWeight: "bold",
                }}
              >
                {col.label}
              </th>
            ))}
          </tr>
        </thead>

        {/* Body */}
        <tbody>
          {rows.length > 0 ? (
            rows.map((row, idx) => <RowComponent key={idx} row={row} />)
          ) : (
            <tr>
              <td
                colSpan={columns.length}
                style={{ padding: "16px", textAlign: "center", color: "#666" }}
              >
                No data available
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Pagination */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "8px 12px",
          borderTop: "1px solid #ddd",
          fontSize: 14,
        }}
      >
        <div>
          Rows per page:{" "}
          <select value={rowsPerPage} onChange={handleChangeRowsPerPage}>
            {rowsPerPageOptions.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
        </div>

        <div>
          <button onClick={() => handleChangePage(0)} disabled={page === 0}>
            {"<<"}
          </button>
          <button
            onClick={() => handleChangePage(page - 1)}
            disabled={page === 0}
          >
            {"<"}
          </button>
          <span style={{ margin: "0 8px" }}>
            Page {page + 1} of {totalPages}
          </span>
          <button
            onClick={() => handleChangePage(page + 1)}
            disabled={page >= totalPages - 1}
          >
            {">"}
          </button>
          <button
            onClick={() => handleChangePage(totalPages - 1)}
            disabled={page >= totalPages - 1}
          >
            {">>"}
          </button>
        </div>

        {/* Refresh button */}
        <div>
          <button onClick={handleRefresh}>🔄 Refresh</button>
        </div>
      </div>
    </div>
  );
}
