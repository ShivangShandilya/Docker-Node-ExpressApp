const express = require("express");
const mongoose = require("mongoose");
const { MONGO_USER, MONGO_PASSWORD, MONGO_IP, MONGO_PORT } = require("./config/config");

const app = express();
const mongoURL = `mongodb://${MONGO_USER}:${MONGO_PASSWORD}@${MONGO_IP}:${MONGO_PORT}/?authSource=admin`;

const connectWithRetry = () => {
      mongoose
      .connect(mongoURL)
      .then(() => console.log("Successfully connected to the database"))
      .catch((e) => {
      console.log(e)
      setTimeout(connectWithRetry, 5000)
      });
}

connectWithRetry();

app.get("/", (req, res) => {
      res.send("<h2>Hi There</h2>");
});

const port = process.env.PORT || 3000;


 app.listen(port, () => console.log("listening on port ${port}"))