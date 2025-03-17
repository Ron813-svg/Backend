//Importo todo lo de la libreria express
import express from "express";

//Llamo desde routes, las rutas de products, no se te olvide el js
import productsRoutes from "./src/routes/products.js";
import clientsRoutes from "./src/routes/clients.js";
import employeeRoutes from "./src/routes/employees.js";
import branchesRoutes from "./src/routes/branches.js";
<<<<<<< HEAD
import reviewsController from "./src/routes/reviews.js";
=======
>>>>>>> 12b3f33c28314c4eac131a9154665a653950e7a7


//Creo una constante que es igual a la libreria que acabo de importar, y la ejecuto
const app = express();
app.use(express.json());

app.use("/api/products", productsRoutes);
app.use("/api/clients", clientsRoutes);
app.use("/api/employees", employeeRoutes);
app.use("/api/branches", branchesRoutes);
<<<<<<< HEAD
app.use("/api/reviews", reviewsController);
=======
>>>>>>> 12b3f33c28314c4eac131a9154665a653950e7a7



//Exporto esta constante para usar express en todos lados.
export default app;