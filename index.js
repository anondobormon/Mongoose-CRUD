const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const todoHandler = require("./routeHandler/todoHandler");
const userHandler = require("./routeHandler/userHandler");

const pas = "L7WjwKRuFQOkvnaU";

const app = express();
dotenv.config();
app.use(express.json());

// Database connection with mongoose

mongoose
  .connect(
    "mongodb+srv://learningMongodb:L7WjwKRuFQOkvnaU@cluster0.3hvbw.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => console.log("Connection success"))
  .catch((err) => console.log(err));

// Application Routes

app.use("/todo", todoHandler);
app.use("/user", userHandler);

// Default error handler

function errorHandler(err, req, res, next) {
  if (res.errorHandler) {
    return next(err);
  }
  res.status(500).json({ error: err });
}

app.listen(3000, () => {
  console.log("Server running in 3000 port");
});
