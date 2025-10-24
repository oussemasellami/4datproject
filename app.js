const http = require("http");
const express = require("express");
const mongo = require("mongoose");
const path = require("path");
const db = require("./config/dbconnection.json");
mongo
  .connect(db.url)
  .then(console.log("database connected"))
  .catch((err) => {
    console.log(err);
  });
const testRouter = require("./routes/test");
const voitureRouter = require("./routes/voiture");

const app = express();
app.use(express.json());
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "twig");

app.use("/test", testRouter);
app.use("/voiture", voitureRouter);

const server = http.createServer(app, console.log("server run"));
const io = require("socket.io")(server);
io.on("connection", (socket) => {
  socket.emit("msg", "user connected");

  socket.on("send", (data) => {
    io.emit("send", data);
  });

  socket.on("disconnect", () => {
    io.emit("msg", "user disconnect");
  });
});
server.listen(3000);
