import db from "../db.js";

const product = {
  name: "Silicone case iPhone 15Pro Max",
  price: "5500",
  image: "Silicone case iPhone 15Pro Max_4",
  categoryId: 9,
};
const connectionData = {
  iphoneModel: [{ id: 23 }],

  attributes: [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }],
};

const createProduct = async () => {
  try {
    const productCreated = await db.product.create({ data: product });
    console.log("Products created successfully");

    await Promise.all(
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
    );

    console.log("Products connected successfully");
  } catch (error) {
    console.error(error);
  }
};

createProduct();

/* const deleteProduct=async () => {
  try {
    const productDeleted= await db.product.delete({
      where:{
        id:'d0e3f973-4713-4d10-a37b-aca5ea5dfdeb'
      }
    })
  } catch (error) {
    console.error(error)
  }
}

deleteProduct() */
