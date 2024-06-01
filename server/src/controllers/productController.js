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
          error: { message: "No se encontró ningún producto" },
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
        error: error,
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
          error: { message: "No se encontraron productos" },
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
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        ok: false,
        error: error,
      });
    }
  },

  getWithPage: async (req, res) => {
    const page = parseInt(req.params.page, 10) || 0;
    const itemsPerPage = 5;
    try {
      const products = await db.product.findMany({
        skip: itemsPerPage * page,
        take: itemsPerPage,
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

      const nextPageProducts = await db.product.findMany({
        skip: itemsPerPage * (page + 1),
        take: 1, // Solo necesitamos comprobar si existe al menos un producto más
      });

      const hasMoreProducts = nextPageProducts.length > 0;

      if (products.length === 0) {
        return res.status(404).json({
          ok: false,
          error: { message: "No se encontraron más productos" },
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
          nextPage: hasMoreProducts ? page + 1 : null,
          results: products.length,
        },
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        ok: false,
        error: error,
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
        error: error,
      });
    }
  },
};

export default productController;
