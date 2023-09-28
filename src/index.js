import app from "./app";
import "./database";
import { PORT, KEY, CERT } from "./config";

import https from "https";
import fs from "fs";
import { getPJWithForms, getUsersWithForms } from "./helpers/buscador";

// Configuración del servidor HTTPS con los certificados
const options = {
  key: fs.readFileSync(KEY),
  cert: fs.readFileSync(CERT),
};

https.createServer(options, app).listen(PORT, () => {
  console.log("Servidor HTTPS en ejecución en el puerto", PORT);
});

