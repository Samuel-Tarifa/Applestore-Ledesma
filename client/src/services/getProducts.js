const { VITE_API_URL } = import.meta.env;

export const getProducts = async ({ pageParam = 0 }) => {
  try {
    const res = await fetch(`${VITE_API_URL}/api/product/page/` + pageParam);
    const data = await res.json();
    return data
  } catch (error) {
    console.error("Error al obtener los productos:", error);
    throw error;
  }
};
