const {VITE_API_URL}=import.meta.env

export const getIPhoneModels = async () => {
  try {
    const res = await fetch(`${VITE_API_URL}/api/iPhoneModel`);
    return await res.json();
  } catch (error) {
    console.error("Error al obtener los modelos de iPhone:", error);
    throw error;
  }
};
