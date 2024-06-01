const { VITE_API_URL } = import.meta.env;

export const getProducts = async ({ pageParam = 0, type, model }) => {
  try {
    const params = new URLSearchParams();
    if (type) params.append("type", type);
    if (model) params.append("model", model);

    const res = await fetch(
      `${VITE_API_URL}/api/product/page/${pageParam}?${params.toString()}`
    );
    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error al obtener los productos:", error);
    throw error;
  }
};
