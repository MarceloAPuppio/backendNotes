//importamos express
const express = require("express");
//inicializamos express
const app = express();
//importamos Cors, ya que de lo contrario no podríamos usar dos puertos del mismo origen
const cors = require("cors");
//usamos dotenv para utilizar variables de entonrno. En este caso tengo el PW y el puerto
require("dotenv").config();
//importamos de db/mongo las funciones conectar y desconectar
const { conectar, desconectar } = require("./db/mongo");
//importamos el Schema Note
const { Note } = require("./db/Schemas/Note");
// declaramos el puerto, que viene de variable de entorno, o por defecto 3001
const PORT = process.env.PORT || 3001;
//primeros middelware
app.use(cors());
app.use(express.json());

//inicializamos el servidor
app.listen(PORT, () => {
  console.log(`servidor corriendo en Puerto ${PORT}`);
});

//Este middleware inicia la conexion con cada peticion, ya que cada consulta la cierra 🙋
app.use((req, res, next) => {
  conectar();
  next();
});

//endpoints
app.get("/", (req, res) => {
  res.status(200).send("<h1>Bienvenido a la API de notas</h1>");
});
app.get("/notes", (req, res) => {
  Note.find({})
    .then((notes) => {
      res.status(200).json(notes);
    })
    .catch((err) => console.log(err))
    .finally(desconectar);
});
app.get("/notes/:id", (req, res, next) => {
  const id = req.params.id;

  Note.findById(id)
    .then((note) => {
      res.status(200).json(note);
    })
    .catch((err) => {
      next(err);
    })
    .finally(desconectar);
});

app.post("/notes", (req, res) => {
  const { title, description } = req.body;
  if (title && description) {
    const note = new Note({
      title,
      description,
      fecha: new Date(),
      pinned: false,
    });

    note
      .save()
      .then((note) => res.status(200).json(note))
      .catch((err) => res.status(400).send({ error: err }))
      .finally(desconectar);
  } else {
    res
      .status(400)
      .send({ error: "debe proporcionar un título y descripcion" });
  }
});
app.put("/notes/:id", (req, res, next) => {
  const id = req.params.id;
  const { title, description, pinned } = req.body;
  Note.findByIdAndUpdate(id, { title, description, pinned }, { new: true })
    .then((note) => res.status(200).json(note))
    .catch((err) => next(err))
    .finally(desconectar);
});

app.delete("/notes/:id", (req, res, next) => {
  let id = req.params.id;
  Note.findOneAndRemove({ _id: id })
    .then((document) => {
      if (document === null) {
        throw new Error("documento no existe en bbdd");
      }
      res.status(200).send({ message: "documento eliminado" });
    })
    .catch((err) => next(err))
    .finally(desconectar);
});
//éste middleware es para catchear errores
app.use((err, req, res, next) => {
  switch (err.name) {
    case "CastError":
      res.status(400).send({ errorName: err.name, errorMessage: err.message });
      break;
    case "Error":
      res.status(400).send({ errorName: err.name, errorMessage: err.message });
    default:
      res.status(500).end();
  }
});
app.use((req, res) => {
  res.status(404).send({ message: "página no encontrada" });
});
