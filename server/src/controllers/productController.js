import db from "../db.js";

const productController = {
  getAll: async (req, res) => {
    try {
      const products = await db.product.findMany({
        include: { iphoneModel: true, attributes: true, category: true },
      });

      for (const product of products) {
        const modelIds = product.iphoneModel.map(
          (model) => model.iphoneModelId
        );
        product.iphoneModelDetails = await db.iphoneModel.findMany({
          where: { id: { in: modelIds } },
        });
      }

      // Obtener los detalles de los atributos para cada producto
      for (const product of products) {
        const attributesIds = product.attributes
          .map((attr) => attr.attributeId);
        product.attributeDetails = await db.attribute.findMany({
          where: { id: { in: attributesIds } },
        });
      }
      
      const productsToResponse=products.map(item=>{
        delete item.iphoneModel
        delete item.attributes
        delete item.description
        delete item.discount
        delete item.stock
        delete item.categoryId
        delete item.createdAt
        delete item.updatedAt

        return item
      })

      res.json(productsToResponse[productsToResponse.length-1]);
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
