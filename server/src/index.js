import express from "express";
import productsRouter from "./routes/products.routes.js";
import categoriesRouter from "./routes/categories.routes.js";
import iPhoneModelRouter from "./routes/iPhoneModel.routes.js";
import attributesRouter from "./routes/attributes.routes.js";

import cors from "cors";
//configuración de dotenv
import { config } from "dotenv";
config();

const app = express();

app.use(cors({ origin: "*" }));
app.use(express.static("upload"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/product", productsRouter);
app.use("/api/iPhoneModel", iPhoneModelRouter);
app.use("/test", (req, res) => {
  res.send("testing route");
});
/* 
app.use("/api/category", categoriesRouter);
app.use("/api/attributes", attributesRouter);
 */
app.listen(process.env.LOCAL_PORT, () => {
  console.log(`Servidor corriendo en el puerto ${process.env.LOCAL_PORT}`);
});
