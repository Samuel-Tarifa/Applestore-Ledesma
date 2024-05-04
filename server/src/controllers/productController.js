import db from "../db.js";

const productController = {
  getAll: async (req, res) => {
    try {
      const products = await db.product.findMany({
        include: { iphoneModel: true, attributes: true, category: true },
      });

      // Obtener los datos de las relaciones y agregar la ruta a la imagen
      for (const product of products) {
        const modelIds = product.iphoneModel.map(
          (model) => model.iphoneModelId
        );
        product.iphoneModel = await db.iphoneModel.findMany({
          where: { id: { in: modelIds } },
        });
        const attributesIds = product.attributes
          .map((attr) => attr.attributeId);
        product.attributes = await db.attribute.findMany({
          where: { id: { in: attributesIds } },
        });
        product.image=`http://localhost:3000/products/${product.image}.webp`
      }
      
      const productsToResponse=products.map(item=>{
        return item
      })

      res.json({data:productsToResponse});
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: error.message });
    }
  },
  create: async (req, res) => {
    try {
      const newProduct = await db.product.create({ data: req.body });
      res.json(newProduct);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: error.message });
    }
  },
};

export default productController;
