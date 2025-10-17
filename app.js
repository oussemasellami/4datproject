const http = require("http");
const express = require("express");
const mongo = require("mongoose");
const db = require("./config/dbconnection.json");

mongo
  .connect(db.url)
  .then(console.log("database connected"))
  .catch((err) => {
    console.log(err);
  });

const app = express();
app.use(express.json());

const server = http.createServer(app, console.log("server run"));
server.listen(3000);
