const app = require("./app");

// Iniciando el servidor...
const server = app.listen(process.env.PORT || 3001, () => {
  console.log("Escuchando en el puerto " + server.address().port);
});
