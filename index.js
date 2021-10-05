const express = require("express");
const app = express();
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const AuthRoute = require("./Routes/Auth");

dotenv.config({ path: "./.env" });
app.use(express.json());

mongoose
  .connect(process.env.MONGO_URL)
  .then(console.log("mongoose conectado"))
  .catch((erro) => console.log(erro));

app.use("/api/auth", AuthRoute);

app.listen("5000", () => {
  console.log("SERVIDOR RODANDO PORTA 5000");
});
