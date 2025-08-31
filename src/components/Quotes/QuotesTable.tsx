"use client";
import React, { useEffect, useState } from "react";
import Table from "@/components/Table";
import QuoteRow from "@/components/Quotes/QuoteRow";
import { Quote } from "@/types/Quotes";
import Filters from "@/components/Quotes/Filters";
import { useQuotesAdmin } from "@/components/Quotes/QuotesAdminContext";

export default function QuotesTable() {
  const { quotes, total, loading, refresh } = useQuotesAdmin();

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  // cada vez que cambia la paginación, pedimos al backend
  useEffect(() => {
    refresh({ limit: rowsPerPage, from: page * rowsPerPage });
  }, [page, rowsPerPage, refresh]);

  const columns = [
    { key: "category", label: "Category", width: "12%" },
    { key: "type", label: "Type", width: "12%" },
    { key: "author", label: "Author", width: "15%" },
    { key: "summary", label: "Summary" },
    { key: "context", label: "Context", width: "10%" },
  ];
  return (
    <div style={{ width: 1200 }}>
      <Table<Quote>
        columns={columns}
        loading={loading}
        dataSource={{ rows: quotes, total }}
        RowComponent={QuoteRow}
        page={page}
        rowsPerPage={rowsPerPage}
        onPageChange={setPage}
        onRowsPerPageChange={setRowsPerPage}
        onRefresh={({ page, rowsPerPage }) =>
          refresh({ limit: rowsPerPage, from: page * rowsPerPage })
        }
        onAdd={() => console.log("Nuevo elemento")}
        actions={(<Filters />) as React.ReactNode}
      />
    </div>
  );
}
