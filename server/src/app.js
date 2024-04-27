import express from "express";
const app = express();

app.listen(process.env.LOCAL_PORT, () => {
  console.log(`Servidor corriendo en el puerto ${process.env.LOCAL_PORT}`);
});

export default app;
