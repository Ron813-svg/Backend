//Importo todo lo de la libreria express
import express from "express";

//Llamo desde routes, las rutas de products, no se te olvide el js
import productsRoutes from "./src/routes/products.js";


//Creo una constante que es igual a la libreria que acabo de importar, y la ejecuto
const app = express();
app.use(express.json());

app.use("/api/products", productsRoutes);


//Exporto esta constante para usar express en todos lados.
export default app;