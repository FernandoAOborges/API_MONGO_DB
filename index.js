const express = require("express");
const app = express();
const dotenv = require("dotenv");
const mongoose = require("mongoose");

dotenv.config({ path: "./.env" });

mongoose
  .connect(process.env.MONGO_URL)
  .then(console.log("mongoose conectado"))
  .catch((erro) => console.log(erro));

app.use("/", (request, response) => {
  response.json("dsadsad");
});

app.listen("5000", () => {
  console.log("SERVIDOR RODANDO PORTA 5000");
});
