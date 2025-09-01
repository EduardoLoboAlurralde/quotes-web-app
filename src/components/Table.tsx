"use client";
import React from "react";
import IconButton from "@/components/IconButton";

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
  dataSource?: PageData<T>;
  columns: Column[];
  RowComponent: React.FC<{ row: T }>;

  page: number;
  rowsPerPage: number;
  rowsPerPageOptions?: number[];

  // callbacks
  onPageChange?: (newPage: number) => void;
  onRowsPerPageChange?: (newRowsPerPage: number) => void;
  onRefresh?: (params: { page: number; rowsPerPage: number }) => void;
  onAdd?: () => void;

  // estados
  loading?: boolean;
  error?: Error | null;

  // componentes customizables
  renderLoading?: () => React.ReactNode;
  renderEmpty?: () => React.ReactNode;
  renderError?: (error: Error) => React.ReactNode;

  actions?: React.ReactNode;
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
  onAdd,
  loading = false,
  error = null,
  renderLoading,
  renderEmpty,
  renderError,
  actions,
}: Props<T>) {
  const rows = dataSource?.rows ?? [];
  const total = dataSource?.total ?? 0;
  const totalPages = rowsPerPage > 0 ? Math.ceil(total / rowsPerPage) : 1;

  // handlers
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

  // === Loading inicial ===
  if (!dataSource && loading) {
    return (
      <div className="w-full flex justify-center items-center h-96">
        {renderLoading ? renderLoading() : <span>Loading...</span>}
      </div>
    );
  }

  // === Error ===
  if (error) {
    return (
      <div className="w-full flex justify-center items-center h-96 text-red-600">
        {renderError ? renderError(error) : <span>{error.message}</span>}
      </div>
    );
  }

  return (
    <div className="w-full relative">
      <div className="p-2 w-full flex justify-end gap-2">
        {actions}
        {onAdd && (
          <IconButton
            lib="fa6"
            name="FaPlus"
            title="Add"
            variant="default"
            onClick={onAdd}
          />
        )}

        <IconButton
          lib="fa6"
          name="FaArrowRotateRight"
          title="Refresh"
          variant="default"
          onClick={handleRefresh}
        />
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
                    width: col.width,
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
              <>
                {rows.map((row, idx) => (
                  <RowComponent key={idx} row={row} />
                ))}

                {/* Relleno de filas vacías */}
                {Array.from({ length: rowsPerPage - rows.length }).map(
                  (_, i) => (
                    <RowComponent key={`empty-${i}`} row={{} as T} />
                  ),
                )}
              </>
            ) : (
              <tr>
                <td
                  colSpan={columns.length}
                  style={{
                    padding: "16px",
                    textAlign: "center",
                    height: "50px",
                  }}
                >
                  {renderEmpty ? renderEmpty() : "No data available"}
                </td>
              </tr>
            )}
          </tbody>
        </table>

        {loading && dataSource && (
          <div
            style={{
              position: "absolute",
              top: 40,
              left: 0,
              right: 0,
              height: "5px",
              background: "linear-gradient(90deg, #4caf50, #81c784, #4caf50)",
              backgroundSize: "200% 100%",
              animation: "loading-bar 1.5s infinite linear",
            }}
          />
        )}

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "8px 0px",
            borderTop: "1px solid #ddd",
            fontSize: 14,
          }}
        >
          <div className={"w-2/12 "} style={{ maxWidth: 150 }} />
          <div className="flex items-center justify-center gap-2 w-8/12">
            <IconButton
              lib="md"
              name="MdFirstPage"
              onClick={() => handleChangePage(0)}
              disabled={page === 0}
              variant="ghost"
            />
            <IconButton
              lib="md"
              name="MdNavigateBefore"
              onClick={() => handleChangePage(page - 1)}
              disabled={page === 0}
              variant="ghost"
            />

            <span className="mx-2">
              Page {page + 1} of {totalPages}
            </span>

            <IconButton
              lib="md"
              name="MdNavigateNext"
              onClick={() => handleChangePage(page + 1)}
              disabled={page >= totalPages - 1}
              variant="ghost"
            />
            <IconButton
              lib="md"
              name="MdLastPage"
              onClick={() => handleChangePage(totalPages - 1)}
              disabled={page >= totalPages - 1}
              variant="ghost"
            />
          </div>
          <div className={"w-2/12  "} style={{ maxWidth: 180 }}>
            Rows per page:{" "}
            <select value={rowsPerPage} onChange={handleChangeRowsPerPage}>
              {rowsPerPageOptions?.map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
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
