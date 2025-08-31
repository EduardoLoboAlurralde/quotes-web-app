export type QuoteFilters = {
  limit?: number;
  from?: number;
  category?: string;
  type?: string;
  language?: string;
  dateFrom?: string; // ISO date string: "2024-01-01"
  dateTo?: string; // ISO date string
};
