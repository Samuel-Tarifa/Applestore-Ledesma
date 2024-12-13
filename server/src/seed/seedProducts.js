import db from "../db.js";

const product = {
  name: "Silicone case iPhone 14 Pro Max",
  price: "7000",
  image: "Silicone_case_iPhone_14Pro_Max_5",
  categoryId: 1,
  typeId: 1,
};

const connectionData = {
  iphoneModel: [{ id: 20 },],
};

const createProduct = async () => {
  try {
    const productCreated = await db.product.create({ data: product });
    console.log("Product created successfully");
    console.log(productCreated);

    await Promise.all(
      connectionData?.iphoneModel.map(async (model) => {
        await db.iphoneModelOnProduct.create({
          data: { productId: productCreated.id, iphoneModelId: model.id },
        });
      })
    );

    console.log("Products connected successfully");
  } catch (error) {
    console.error(error);
  }
};

createProduct();
