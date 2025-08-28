"use client";
import { useEffect, useState } from "react";
import Table from "@/components/Table";
import QuoteRow from "@/components/Quotes/QuoteRow";
import { getAllQuotes } from "@/lib/api/quotesServices";
import { Quote } from "@/types/Quote";

type QuoteResponse = {
  rows: Quote[];
  total: number;
};

type Props = {
  initialLimit?: number;
};

export default function QuotesTable({ initialLimit = 5 }: Props) {
  const [quotesData, setQuotesData] = useState<QuoteResponse>({
    rows: [],
    total: 0,
  });
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(initialLimit);

  const fetchQuotes = async (page: number, rowsPerPage: number) => {
    setLoading(true);
    try {
      const data = await getAllQuotes({
        limit: rowsPerPage,
        from: page * rowsPerPage,
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
      {loading && <p>Cargando...</p>}
      <Table
        columns={[
          { key: "category", label: "Category" },
          { key: "type", label: "Type" },
          { key: "author", label: "Author" },
          { key: "summary", label: "Summary" },
          { key: "context", label: "Context" },
        ]}
        dataSource={quotesData}
        RowComponent={QuoteRow}
        page={page}
        rowsPerPage={rowsPerPage}
        onPageChange={setPage}
        onRowsPerPageChange={setRowsPerPage}
        onRefresh={({ page, rowsPerPage }) => fetchQuotes(page, rowsPerPage)}
      />
    </div>
  );
}
