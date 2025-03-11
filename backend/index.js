//importo el archivo app.js
import app from "./app.js";

//importo el archivo de conexion de la base de datos
import "./database.js";

//importo el archivo config
import "./src/config.js";

//Creo una funcion que ejecuta el servidor
async function main() {
    const port = 4000;
    app.listen(port);
    console.log("Me prendio el servidor");
}

//Ejecuto la funcion
main();
