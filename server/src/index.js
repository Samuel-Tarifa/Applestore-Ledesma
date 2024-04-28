import express from "express";
import productsRouter from './routes/products.routes.js'
import categoriesRouter from './routes/categories.routes.js';
//configuración de dotenv
import { config } from "dotenv";
config();

const app = express();

app.use(express.json())

app.use('/api/product',productsRouter)
app.use('/api/category',categoriesRouter)

app.listen(process.env.LOCAL_PORT, () => {
  console.log(`Servidor corriendo en el puerto ${process.env.LOCAL_PORT}`);
});
