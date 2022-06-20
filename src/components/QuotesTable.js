import CustomTable from "./CustomTable";
import { useEffect, useState } from "react";

export default function QuotesTable() {
  const [quotesData, setQuotesData] = useState();
  const { total, quotes = [] } = quotesData || {};
  const [refetch, setRefetch] = useState(false);

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  // eslint-disable-next-line no-unused-vars
  const fetchQuotes = async (data = {}) => {
    setRefetch(false);
    try {
      const url = "http://localhost:3006/api/quotes";
      const res = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      // console.log(data);
      // setQuotesList(data.quotes);
      setQuotesData(data);
    } catch (e) {
      console.log(e.message);
    }
  };

  useEffect(() => {
    if (quotes.length === 0 || refetch === true) {
      (async () => {
        await fetchQuotes();
      })();
    }
  }, [quotes, refetch]);


  return (
    <CustomTable
      list={quotes}
      total={total}
      setPage={(v) => setPage(v)}
      setRowsPerPage={(v) => setRowsPerPage(v)}
      page={page}
      rowsPerPage={rowsPerPage}
    />
  );
}
