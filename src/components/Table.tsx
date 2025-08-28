"use client";
import React from "react";
import Loading from "@/components/Loading";

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
  dataSource?: PageData<T>; // arranca como undefined
  columns: Column[];
  RowComponent: React.FC<{ row: T }>;
  page: number;
  rowsPerPage: number;
  rowsPerPageOptions?: number[];
  onPageChange?: (newPage: number) => void;
  onRowsPerPageChange?: (newRowsPerPage: number) => void;
  onRefresh?: (params: { page: number; rowsPerPage: number }) => void;
  loading?: boolean;
};

export default function Table<T>({
  dataSource,
  columns,
  RowComponent,
  page,
  rowsPerPage,
  rowsPerPageOptions = [5, 10, 25],
  onPageChange,
  onRowsPerPageChange,
  onRefresh,
  loading = false,
}: Props<T>) {
  const rows = dataSource?.rows ?? [];
  const total = dataSource?.total ?? 0;
  const totalPages = rowsPerPage > 0 ? Math.ceil(total / rowsPerPage) : 1;

  const handleChangePage = (newPage: number) => {
    if (newPage >= 0 && newPage < totalPages) {
      onPageChange?.(newPage);
      onRefresh?.({ page: newPage, rowsPerPage });
    }
  };

  const handleChangeRowsPerPage = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newRows = parseInt(e.target.value, 10);
    onRowsPerPageChange?.(newRows);
    onRefresh?.({ page: 0, rowsPerPage: newRows });
  };

  const handleRefresh = () => {
    onRefresh?.({ page, rowsPerPage });
  };

  if (!dataSource) {
    return (
      <div className={"w-full flex justify-center items-center h-96"}>
        <Loading />
      </div>
    );
  }

  return (
    <div className="w-full relative">
      {/* Refresh */}
      <div className="p-2 w-full flex justify-end">
        <button onClick={handleRefresh}>🔄</button>
      </div>

      <div
        style={{
          width: "100%",
          background: "white",
          color: "black",
          borderRadius: "8px",
          overflow: "hidden",
          position: "relative",
        }}
      >
        <table style={{ borderCollapse: "collapse", width: "100%" }}>
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

          <tbody>
            {rows.length > 0 ? (
              rows.map((row, idx) => <RowComponent key={idx} row={row} />)
            ) : (
              <tr>
                <td
                  colSpan={columns.length}
                  style={{
                    padding: "16px",
                    textAlign: "center",
                    color: "#666",
                  }}
                >
                  No data available
                </td>
              </tr>
            )}
          </tbody>
        </table>

        {/* Barra de carga en refrescos posteriores */}
        {loading && dataSource && (
          <div
            style={{
              position: "absolute",
              top: 40, // debajo del header
              left: 0,
              right: 0,
              height: "5px",
              background: "linear-gradient(90deg, #4caf50, #81c784, #4caf50)",
              backgroundSize: "200% 100%",
              animation: "loading-bar 1.5s infinite linear",
            }}
          />
        )}

        {/* Paginación */}
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
              {rowsPerPageOptions?.map((opt) => (
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
              className={"ml-4"}
              onClick={() => handleChangePage(page - 1)}
              disabled={page === 0}
            >
              {"<"}
            </button>
            <span style={{ margin: "0 8px" }}>
              Page {page + 1} of {totalPages}
            </span>
            <button
              className={"mr-4"}
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
        </div>
      </div>

      <style>
        {`
        @keyframes loading-bar {
          0% { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }
        `}
      </style>
    </div>
  );
}
