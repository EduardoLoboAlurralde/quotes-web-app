"use client";
import React, { useEffect, useState } from "react";
import Table from "@/components/Table";
import QuoteRow from "@/components/Quotes/QuoteRow";
import { getAllQuotes } from "@/lib/api/quotesServices";
import { Quote } from "@/types/Quote";
import Filters from "@/components/Quotes/Filters";

type QuoteResponse = {
  rows: Quote[];
  total: number;
};

export default function QuotesTable() {
  const [quotesData, setQuotesData] = useState<QuoteResponse | undefined>(
    undefined,
  );

  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState<number>(5);

  const fetchQuotes = async (page: number, rowsPerPage: number) => {
    setLoading(true);
    try {
      const data = await getAllQuotes({
        limit: rowsPerPage,
        from: page * rowsPerPage,
        // category: '68a39ca2fe1eca094157ad1b'
      });
      setQuotesData(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchQuotes(page, rowsPerPage);
  }, [page, rowsPerPage]);

  return (
    <div style={{ width: 1200 }}>
      <Table<Quote>
        columns={[
          { key: "category", label: "Category", width: "12%" },
          { key: "type", label: "Type", width: "12%" },
          { key: "author", label: "Author", width: "15%" },
          { key: "summary", label: "Summary" },
          { key: "context", label: "Context", width: "10%" },
        ]}
        loading={loading}
        dataSource={quotesData}
        RowComponent={QuoteRow}
        page={page}
        rowsPerPage={rowsPerPage}
        onPageChange={setPage}
        onRowsPerPageChange={setRowsPerPage}
        onRefresh={({ page, rowsPerPage }) => fetchQuotes(page, rowsPerPage)}
        onAdd={() => console.log("Nuevo elemento")}
        actions={(<Filters />) as React.ReactNode}
      />
    </div>
  );
}
