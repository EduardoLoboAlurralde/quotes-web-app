const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export type QuoteType = {
  _id: string;
  name: string;
};

export async function getAllTypes(): Promise<QuoteType[]> {
  const res = await fetch(`${BASE_URL}/api/types`);
  if (!res.ok) throw new Error("Error al obtener los tipos");
  return res.json();
}
