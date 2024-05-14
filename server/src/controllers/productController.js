import db from "../db.js";

const productController = {
  getOne: async (req, res) => {
    try {
      const product = await db.product.findUnique({
        where: { id: req.params.id },
        include: {
          attributes: {
            select: { attribute: true },
          },
          iphoneModel: {
            select: { iphoneModel: true },
          },
        },
      });

      product.iphoneModel=product.iphoneModel.map(model=>model.iphoneModel)
      product.attributes=product.attributes.map(attribute=>attribute.attribute)
      product.image = `${process.env.URL}/products/${product.image}.webp`;

      if (!product) res.status(404).json("No se encontró ningún producto");

      res.json({ data: product });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
  getAll: async (req, res) => {
    try {
      const products = await db.product.findMany({
        include: {
          category: true,
          attributes: {
            select: {
              attribute: true,
            },
          },
          iphoneModel: {
            select: {
              iphoneModel: true,
            },
          },
        },
      });

      // Formatear/simplificar los objetos de attributes y iphoneModel y agregar la ruta a la imagen
      for (const product of products) {
        product.iphoneModel = product.iphoneModel.map(
          (model) => model.iphoneModel
        );
        product.attributes = product.attributes.map(
          (attribute) => attribute.attribute
        );
        product.image = `${process.env.URL}/products/${product.image}.webp`;
      }

      const productsToResponse = products;

      res.json({ data: productsToResponse });
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
