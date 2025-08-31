import { Category } from "@/types/Category";
import { Type } from "@/types/Type";

export type Quote = {
  _id: string;
  author: string;
  summary: string;
  category: Category;
  type: Type;
  tags: string[];
  language: string;
  status: boolean;
  createdAt: string;
  updatedAt: string;
  context: {
    notes: string;
    title: string;
    subtitle: string;
    source: string;
    event: string;
    place: string;
    date: string;
    year: string;
    character: string;
    album: string;
  };
  __v: number;
};

export type QuoteResponse = {
  total: number;
  rows: Quote[];
};

export type QuoteFilters = {
  limit?: number;
  from?: number;
  category?: string;
  type?: string;
  language?: string;
  dateFrom?: string;
  dateTo?: string;
};
