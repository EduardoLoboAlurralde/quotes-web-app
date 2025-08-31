import Select from "@/components/Select";
import { useEffect, useState } from "react";
import { getAllCategories } from "@/lib/api/categoriesService";

const categories = [
  { _id: "1", name: "Historia" },
  { _id: "2", name: "Música" },
];

// idiomas
const languages = [
  { code: "es", label: "Español" },
  { code: "en", label: "English" },
];

export default function Filters() {
  const [category, setCategory] = useState("");
  const [language, setLanguage] = useState("");
  const [categories, setCategories] = useState<{ _id: string; name: string }[]>(
    [],
  );

  useEffect(() => {
    async function fetchCategories() {
      try {
        const data = await getAllCategories();
        console.log("data", data);
        setCategories(data?.rows);
      } catch (err) {
        console.error("Error cargando categorías", err);
      }
    }
    fetchCategories();
  }, []);
  console.log({ categories });
  return (
    <div className="flex items-center justify-center flex-1">
      <Select
        items={categories}
        valueKey="_id"
        labelKey="name"
        value={category}
        onChange={setCategory}
        placeholder="Filtrar por categoría"
      />

      {/*<Select*/}
      {/*  items={languages}*/}
      {/*  valueKey="code"*/}
      {/*  labelKey="label"*/}
      {/*  value={language}*/}
      {/*  onChange={setLanguage}*/}
      {/*  placeholder="Filtrar por idioma"*/}
      {/*/>*/}
    </div>
  );
}
