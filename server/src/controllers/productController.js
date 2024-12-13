import db from "../db.js";

const urlImageCompressed = `${process.env.URL}/nuevasCompressed`;
const urlImageBig = `${process.env.URL}/products`;

const productController = {
  getOne: async (req, res) => {
    try {
      // Extraer categoryName e iphoneModel del ID
      const [categoryName, iphoneModelName] = req.params.id.split("$");

      // Verificar que ambos valores están presentes
      if (!categoryName || !iphoneModelName) {
        return res.status(400).json({
          ok: false,
          error: { message: "El ID proporcionado no es válido" },
        });
      }

      // Buscar los productos en la base de datos que coincidan con la categoría y el modelo de iPhone
      const products = await db.product.findMany({
        where: {
          category: {
            name: categoryName,
          },
          iphoneModel: {
            some: {
              iphoneModel: {
                name: iphoneModelName,
              },
            },
          },
        },
        include: {
          category: {
            select: { name: true },
          },
          iphoneModel: {
            select: {
              iphoneModel: {
                select: { name: true },
              },
            },
          },
        },
      });

      // Si no se encuentran productos
      if (!products || products.length === 0) {
        return res.status(404).json({
          ok: false,
          error: { message: "No se encontraron productos" },
        });
      }

      // Procesar datos para la respuesta
      const data = {
        name: products[0].name,
        price: products[0].price,
        category: products[0].category.name,
        iphoneModel: iphoneModelName,
        images: products.map((e) => {
          return { image: `${urlImageCompressed}/${e.image}.webp`, id: e.id };
        }),
      };

      res.json({
        ok: true,
        message: "Productos encontrados",
        data: data,
      });
    } catch (error) {
      // Manejo de errores
      console.error(error.message);
      res.status(500).json({
        ok: false,
        error: {
          message: "Error interno del servidor",
          details: error.message,
        },
      });
    }
  },

  getAll: async (req, res) => {
    try {
      // Obtener todos los productos con los datos necesarios
      const rawProducts = await db.product.findMany({
        include: {
          type: { select: { name: true } }, // Tipo de funda (no usado directamente)
          iphoneModel: { select: { iphoneModel: { select: { name: true } } } }, // Modelos compatibles
          category: { select: { name: true } }, // Categoría (puffer, silicone, etc.)
        },
      });

      if (rawProducts.length === 0) {
        return res.status(404).json({
          ok: false,
          error: { message: "No se encontraron productos" },
          data: [],
        });
      }

      // Agrupar productos
      const groupedProducts = {};

      const otherProducts = [];

      for (const product of rawProducts) {
        const models = product.iphoneModel.map((e) => e.iphoneModel.name); // Todos los modelos compatibles
        const category = product.category?.name; // Categoría de la funda
        const imageURL = `${urlImageCompressed}/${product.image}.webp`;
        const id = product.id;

        // Si no tiene modelos y no es funda, agregar a otros productos
        if (models.length === 0 && product.type.name !== "Fundas") {
          otherProducts.push({
            id: id,
            name: product.name,
            type: product.type.name,
            price: product.price,
            images: [{ image: imageURL, id }],
          });
          continue;
        }

        // Generar clave única basada en categoría
        const key = `${category}-${models.join(',')}`;

        // Crear la estructura si no existe
        if (!groupedProducts[key]) {
          groupedProducts[key] = {
            category,
            type: product.type.name,
            price: product.price,
            name: product.name,
            iphoneModel: new Set(), // Usar un Set para evitar duplicados
            images: [],
          };
        }

        // Agregar modelos al Set
        models.forEach((model) => groupedProducts[key].iphoneModel.add(model));

        // Agregar imágenes
        groupedProducts[key].images.push({
          image: imageURL,
          id,
        });
      }

      // Transformar la estructura en un array amigable
      const finalProducts = Object.values(groupedProducts).map((item) => ({
        ...item,
        iphoneModel: Array.from(item.iphoneModel), // Convertir el Set en un array
      }));

      const data = finalProducts.concat(otherProducts);

      res.json({
        ok: true,
        message: "Productos agrupados encontrados",
        data: data,
        totalProducts: data.length,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        ok: false,
        error: error,
      });
    }
  },
  getPaginatedProducts: async (req, res) => {
    const page = parseInt(req.params.page, 10) || 0;
    const itemsPerPage = 8;
    const { type, model } = req.query;

    const filters = {};
    if (type && type !== "All") filters.type = { name: type };
    if (model && model !== "All")
      filters.iphoneModel = { some: { iphoneModel: { name: model } } };

    try {
      const products = await db.product.findMany({
        skip: itemsPerPage * page,
        take: itemsPerPage,
        where: filters,
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
        where: filters,
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
