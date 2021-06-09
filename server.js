const express = require("express");
const app = express();
const morgan = require("morgan");
const path= require("path")

app.set("port", process.env.PORT || 3500);
app.use(express.urlencoded({ extended: false }));
var vonageRoutes = require("./routes/vonage.routes");

app.use(express.json());

//Middlewares
app.use(morgan("dev"));
app.use("/vonage", vonageRoutes);
module.exports = app;
