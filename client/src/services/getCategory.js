const {VITE_API_URL}=import.meta.env

export const getCategory = async () => {
  try {
    const res = await fetch(`${VITE_API_URL}/api/category`);
    return await res.json();
  } catch (error) {
    console.error("Error al obtener las categorías de los productos:", error);
    throw error;
  }
};
