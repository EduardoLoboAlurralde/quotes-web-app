const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export async function getAllQuotes(params?: { limit?: number; from?: number }) {
  const query = new URLSearchParams();

  if (params?.limit !== undefined)
    query.append("limit", params.limit.toString());
  if (params?.from !== undefined) query.append("from", params.from.toString());

  const res = await fetch(`${BASE_URL}/api/quotes?${query.toString()}`);
  if (!res.ok) throw new Error("Error al obtener las quotes");
  return res.json();
}

export async function getQuoteById(id: string) {
  const res = await fetch(`${BASE_URL}/api/quotes/${id}`);
  if (!res.ok) throw new Error("Error al obtener la quote");
  return res.json();
}

export async function createQuote(data: { text: string; author: string }) {
  const res = await fetch(`${BASE_URL}/api/quotes`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Error al crear la quote");
  return res.json();
}

export async function updateQuote(
  id: string,
  data: { text?: string; author?: string },
) {
  const res = await fetch(`${BASE_URL}/api/quotes/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Error al actualizar la quote");
  return res.json();
}

export async function deleteQuote(id: string) {
  const res = await fetch(`${BASE_URL}/api/quotes/${id}`, {
    method: "DELETE",
  });
  if (!res.ok) throw new Error("Error al eliminar la quote");
  return res.json();
}
