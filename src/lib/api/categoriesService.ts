const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export async function getAllCategories() {
  const res = await fetch(`${BASE_URL}/api/categories`);
  if (!res.ok) throw new Error("Error al obtener las categorías");
  return res.json();
}

export async function createCategory(data: { name: string }) {
  const res = await fetch(`${BASE_URL}/api/categories`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Error al crear la categoría");
  return res.json();
}

export async function updateCategory(id: string, data: { name: string }) {
  const res = await fetch(`${BASE_URL}/api/categories/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Error al actualizar la categoría");
  return res.json();
}

export async function deleteCategory(id: string) {
  const res = await fetch(`${BASE_URL}/api/categories/${id}`, {
    method: "DELETE",
  });
  if (!res.ok) throw new Error("Error al eliminar la categoría");
  return res.json();
}
