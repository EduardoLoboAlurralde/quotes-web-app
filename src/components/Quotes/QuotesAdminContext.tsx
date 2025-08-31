import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";
import { Quote, QuoteFilters } from "@/types/quotes";
import { getAllQuotes } from "@/lib/api/quotesServices";

type QuotesAdminContextType = {
  quotes: Quote[];
  total: number;
  loading: boolean;
  error: string | null;
  refresh: (params?: QuoteFilters) => Promise<void>;
};

const QuotesAdminContext = createContext<QuotesAdminContextType | undefined>(
  undefined,
);

export const QuotesAdminProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [quotes, setQuotes] = useState<Quote[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const refresh = useCallback(async (params?: QuoteFilters) => {
    try {
      setLoading(true);
      setError(null);
      const data = await getAllQuotes(params);
      setQuotes(data.rows);
      setTotal(data.total);
    } catch (err) {
      console.error("Error al obtener quotes", err);
      setError("Error al obtener quotes");
    } finally {
      setLoading(false);
    }
  }, []);

  // carga inicial (solo 1 vez)
  useEffect(() => {
    refresh({ limit: 5, from: 0 });
  }, [refresh]);

  return (
    <QuotesAdminContext.Provider
      value={{ quotes, total, loading, error, refresh }}
    >
      {children}
    </QuotesAdminContext.Provider>
  );
};

export const useQuotesAdmin = () => {
  const ctx = useContext(QuotesAdminContext);
  if (!ctx)
    throw new Error("useQuotesAdmin debe usarse dentro de QuotesAdminProvider");
  return ctx;
};
