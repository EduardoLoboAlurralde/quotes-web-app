"use client";
import React, { createContext, useContext, useState, useCallback } from "react";
import { getAllCategories } from "@/lib/api/categoriesService";
import { getAllTypes } from "@/lib/api/typesService";
import { Category } from "@/types/Categories";
import { Type } from "@/types/Types";

type CatalogsContextType = {
  categories: Category[];
  types: Type[];
  loading: boolean;
  error: string | null;
  refresh: () => Promise<void>;
};

const CatalogsContext = createContext<CatalogsContextType | undefined>(
  undefined,
);

export const CatalogsProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [types, setTypes] = useState<Type[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const refresh = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const [cats, tps] = await Promise.all([
        getAllCategories(),
        getAllTypes(),
      ]);
      setCategories(cats?.rows);
      console.log("types", tps);
      setTypes(tps?.rows);
    } catch (err) {
      console.error("Error cargando catálogos", err);
      setError("Error cargando catálogos");
    } finally {
      setLoading(false);
    }
  }, []);

  return (
    <CatalogsContext.Provider
      value={{ categories, types, loading, error, refresh }}
    >
      {children}
    </CatalogsContext.Provider>
  );
};

export const useCatalogs = () => {
  const ctx = useContext(CatalogsContext);
  if (!ctx)
    throw new Error("useCatalogs debe usarse dentro de CatalogsProvider");
  return ctx;
};
