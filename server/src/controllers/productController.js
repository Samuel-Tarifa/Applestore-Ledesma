import db from "../db.js";

const urlImageCompressed=`${process.env.URL}/products_compressed`
const urlImageBig=`${process.env.URL}/products`

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

      if (!product) return res.status(404).json("No se encontró ningún producto");

      product.iphoneModel=product.iphoneModel.map(model=>model.iphoneModel)
      product.attributes=product.attributes.map(attribute=>attribute.attribute)
      product.image = `${urlImageBig}/${product.image}.webp`;


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

      if (products.length === 0 ) return res.status(404).json("No se encontraron productos")

      // Formatear/simplificar los objetos de attributes y iphoneModel y agregar la ruta a la imagen
      for (const product of products) {
        product.iphoneModel = product.iphoneModel.map(
          (model) => model.iphoneModel
        );
        product.attributes = product.attributes.map(
          (attribute) => attribute.attribute
        );
        product.image = `${urlImageCompressed}/${product.image}.webp`;
      }

      const productsToResponse = products;

      res.json({ data: productsToResponse });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: error.message });
    }
  },
  getWithPage: async (req, res) => {
    const page= req.params.page
    try {
      const products = await db.product.findMany({
        skip:10*page,
        take:10,
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
      if (products.length === 0 ) return res.status(404).json("No se encontraron mas productos")

      // Formatear/simplificar los objetos de attributes y iphoneModel y agregar la ruta a la imagen
      for (const product of products) {
        product.iphoneModel = product.iphoneModel.map(
          (model) => model.iphoneModel
        );
        product.attributes = product.attributes.map(
          (attribute) => attribute.attribute
        );
        product.image = `${urlImageCompressed}/${product.image}.webp`;
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
