const { VITE_API_URL } = import.meta.env;

export const getProductDetail = async (id) => {
  try {
    const search = id ? `/${id}` : "";
    const res = await fetch(`${VITE_API_URL}/api/product` + search);
    return await res.json();
  } catch (error) {
    console.error("Error al obtener los productos:", error);
    throw error;
  }
};
