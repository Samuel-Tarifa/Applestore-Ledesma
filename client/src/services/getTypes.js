const {VITE_API_URL}=import.meta.env

export const getTypes = async () => {
  try {
    const res = await fetch(`${VITE_API_URL}/api/types`);
    return await res.json();
  } catch (error) {
    console.error("Error al obtener los tipos de productos:", error);
    throw error;
  }
};
