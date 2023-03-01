import * as dotenv from "dotenv";

const admin = require("firebase-admin");

const serviceAccount = require("../dnsmokeapikey.json");
const sequelize = require("firestore-sequelize");

sequelize.initializeApp(admin);

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

dotenv.config({ path: __dirname + "/../.env" });

import express, { json } from "express";
import { routes } from "./routes";
import cors from "cors";

const corsOptions = {
  origin: "*",
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
};

const app = express();

app.use(cors(corsOptions));
app.use(json());
app.use(routes);

const port = 8080;

app.listen(port, async () => {
  console.log(`Servidor iniciado na porta ${port}`);
});
