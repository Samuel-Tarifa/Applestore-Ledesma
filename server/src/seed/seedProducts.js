import db from "../db.js";

const product = {
  name: "Cable de carga USB-C to Lighting",
  price: "3.500",
  image: "Cable de carga USB-C to Lighting",
  categoryId: 2,
};
const connectionData = {
  iphoneModel: [ { id: 21 }],

  attributes: [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }],
};

const createProduct = async () => {
  try {
    const productCreated = await db.product.create({ data: product });
    console.log("Products created successfully");

    /* await Promise.all(
      connectionData.iphoneModel.map(async (model) => {
        await db.iphoneModelOnProduct.create({
          data: { productId: productCreated.id, iphoneModelId: model.id },
        });
      })
    );

    await Promise.all(
      connectionData.attributes.map(async (attribute) => {
        await db.attributeOnProduct.create({
          data: { productId: productCreated.id, attributeId: attribute.id },
        });
      })
    ); */

    console.log("Products connected successfully");
  } catch (error) {
    console.error(error);
  }
};

createProduct();
