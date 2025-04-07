//Importo todo lo de la libreria express
import express from "express";

//Llamo desde routes, las rutas de products, no se te olvide el js
import productsRoutes from "./src/routes/products.js";
import clientsRoutes from "./src/routes/clients.js";
import employeeRoutes from "./src/routes/employees.js";
import branchesRoutes from "./src/routes/branches.js";
import reviewsController from "./src/routes/reviews.js";
import assessmentRoutes from "./src/routes/assessment.js";
import registerRoutes from "./src/routes/register.js";
import cookieParser from "cookie-parser";
import loginRoutes from "./src/routes/login.js";
import logoutRoutes from "./src/routes/logout.js";
import registe rClients from "./src/routes/registerClient.js";



//Creo una constante que es igual a la libreria que acabo de importar, y la ejecuto
const app = express();
app.use(express.json());
app.use(cookieParser());
app.use("/api/products", productsRoutes);
app.use("/api/clients", clientsRoutes);
app.use("/api/employees", employeeRoutes);
app.use("/api/branches", branchesRoutes);
app.use("/api/reviews", reviewsController);
app.use("/api/assessments", assessmentRoutes);


app.use("/api/register",registerRoutes); 
app.use("/api/login", loginRoutes);
app.use("/api/logout", logoutRoutes);
app.use("/api/registerClients/verifyCode", registerClients)

//Exporto esta constante para usar express en todos lados.
export default app;