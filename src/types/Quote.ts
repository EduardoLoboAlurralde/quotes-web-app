import { Category } from "./Category";
import { Type } from "./Type";

export interface Quote {
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
}
