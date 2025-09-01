"use client";
import { useEffect, useState } from "react";
import Select from "@/components/Select";
import { CatalogsProvider, useCatalogs } from "@/components/CatalogsContext";
import { useQuotesAdmin } from "@/components/Quotes/QuotesAdminContext";
import {Category} from "@/types/Categories";
import {Type} from "@/types/Types";

function FiltersInner() {
  const {
    categories,
    types,
    refresh: refreshCatalogs,
    loading,
  } = useCatalogs();
  const { refresh: refreshQuotes } = useQuotesAdmin();

  const [category, setCategory] = useState("");
  const [type, setType] = useState("");

  useEffect(() => {
    refreshCatalogs(); // carga categorías y tipos solo si no están cargados
  }, [refreshCatalogs]);

  useEffect(() => {
    refreshQuotes({ category, type });
  }, [category, type, refreshQuotes]);

  return (
    <div className="flex items-center justify-center flex-1">
      <Select<Category>
        items={categories}
        valueKey="_id"
        labelKey="name"
        value={category}
        onChange={setCategory}
        placeholder="Categoría"
        disabled={loading}
      />
      <Select<Type>
        items={types}
        valueKey="_id"
        labelKey="name"
        value={type}
        onChange={setType}
        placeholder="Tipo"
        disabled={loading}
      />
    </div>
  );
}

export default function QuotesFilter() {
  return (
    <CatalogsProvider>
      <FiltersInner />
    </CatalogsProvider>
  );
}
