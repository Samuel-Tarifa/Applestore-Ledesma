import db from "../db.js";

const updateProductImages = async () => {
  try {
    // Obtener todos los productos
    const products = await db.product.findMany();

    if (products.length === 0) {
      console.log("No se encontraron productos");
      return;
    }

    // Actualizar las rutas de las imágenes
    for (const product of products) {
      const newImagePath = product.image.trim().replace(/\s+/g, "_");
      // Actualizar la base de datos solo si la ruta de la imagen ha cambiado
      if (newImagePath !== product.image) {
        await db.product.update({
          where: { id: product.id },
          data: { image: newImagePath },
        });
      }
    }

    console.log("Imágenes de productos actualizadas correctamente.");
  } catch (error) {
    console.error("Error al actualizar las imágenes de los productos:", error);
  }
};

// Llamar a la función para actualizar las imágenes de los productos
updateProductImages();
