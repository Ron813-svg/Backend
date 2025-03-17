//importo el archivo app.js
import app from "./app.js";

<<<<<<< HEAD
import { config } from "./src/config.js";

=======
>>>>>>> 12b3f33c28314c4eac131a9154665a653950e7a7
//importo el archivo de conexion de la base de datos
import "./database.js";

//importo el archivo config
import "./src/config.js";

//Creo una funcion que ejecuta el servidor
async function main() {
<<<<<<< HEAD

    app.listen(config.server.port);
=======
    const port = 4000;
    app.listen(port);
>>>>>>> 12b3f33c28314c4eac131a9154665a653950e7a7
    console.log("Me prendio el servidor");
}

//Ejecuto la funcion
main();
