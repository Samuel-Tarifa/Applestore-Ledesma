import db from "../db.js";

const urlImageCompressed = `${process.env.URL}/products_compressed`;
const urlImageBig = `${process.env.URL}/products`;

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

      if (!product) {
        return res.status(404).json({
          ok: false,
          message: "No se encontró ningún producto",
        });
      }

      product.iphoneModel = product.iphoneModel.map(
        (model) => model.iphoneModel
      );
      product.attributes = product.attributes.map(
        (attribute) => attribute.attribute
      );
      product.image = `${urlImageBig}/${product.image}.webp`;

      res.json({
        ok: true,
        message: "Producto encontrado",
        data: product,
      });
    } catch (error) {
      res.status(500).json({
        ok: false,
        message: "Error al obtener el producto",
        error: error.message,
      });
    }
  },

  getAll: async (req, res) => {
    try {
      const products = await db.product.findMany({
        include: {
          category: true,
          type: true,
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

      if (products.length === 0) {
        return res.status(404).json({
          ok: false,
          message: "No se encontraron productos",
        });
      }

      for (const product of products) {
        product.iphoneModel = product.iphoneModel.map(
          (model) => model.iphoneModel
        );
        product.attributes = product.attributes.map(
          (attribute) => attribute.attribute
        );
        product.image = `${urlImageCompressed}/${product.image}.webp`;
      }

      res.json({
        ok: true,
        message: "Productos encontrados",
        data: products,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        ok: false,
        message: "Error al obtener los productos",
        error: error.message,
      });
    }
  },

  getWithPage: async (req, res) => {
    const page = parseInt(req.params.page, 10) || 0;
    try {
      const products = await db.product.findMany({
        skip: 10 * page,
        take: 10,
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

      if (products.length === 0) {
        return res.status(404).json({
          ok: false,
          message: "No se encontraron más productos",
          data: [],
        });
      }

      for (const product of products) {
        product.iphoneModel = product.iphoneModel.map(
          (model) => model.iphoneModel
        );
        product.attributes = product.attributes.map(
          (attribute) => attribute.attribute
        );
        product.image = `${urlImageCompressed}/${product.image}.webp`;
      }

      res.json({
        ok: true,
        message: "Productos encontrados",
        data: products,
        info: {
          page: page,
          nextPage: page + 1,
          results: products.length,
        },
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        ok: false,
        message: "Error al obtener los productos paginados",
        error: error.message,
      });
    }
  },

  create: async (req, res) => {
    try {
      const newProduct = await db.product.create({ data: req.body });
      res.status(201).json({
        ok: true,
        message: "Producto creado exitosamente",
        data: newProduct,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        ok: false,
        message: "Error al crear el producto",
        error: error.message,
      });
    }
  },
};

export default productController;
