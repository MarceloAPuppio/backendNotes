//importamos express
const express = require("express");
//importamos Cors, ya que de lo contrario no podríamos usar dos puertos del mismo origen
const cors = require("cors");
//importamos de db/mongo las funciones conectar y desconectar
const { conectar, desconectar } = require("./db/mongo");
//importamos los controladores
const noteCtrl = require("./controller/notes");

//inicializamos express
const app = express();
app.use(cors());
app.use(express.json());
//Este middleware inicia la conexion con cada peticion, ya que cada consulta la cierra 🙋
app.use((req, res, next) => {
  conectar();
  next();
});

//endpoints
app.get("/", noteCtrl.getHome);
app.get("/notes", noteCtrl.getAll);
app.get("/notes/:id", noteCtrl.getById);

app.post("/notes", noteCtrl.post);
app.put("/notes/:id", noteCtrl.update);

app.delete("/notes/:id", noteCtrl.remove);
//éste middleware es para catchear errores
app.use(noteCtrl.error);
app.use(noteCtrl.notFound);

module.exports = app;
