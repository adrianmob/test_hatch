const express = require("express");
const app = express();
var routes = require("./routes");

// configuración de middlewares.
app.use(express.urlencoded({ extended: false }));

// Agregamos el código de nuestro router (routes/index.js)
app.use("/", routes);

// Manejando los errores 404
app.use(function (req, res, next) {
  var err = new Error("Not Found");
  err.status = 404;
  res.send(err);
});

module.exports = app;
