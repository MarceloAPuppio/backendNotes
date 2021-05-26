const { Note } = require("../../db/Schemas/Note");
const { conectar, desconectar } = require("../../db/mongo");

const getHome = (req, res) => {
  res.status(200).send("<h1>Bienvenido a la API de notas</h1>");
};
const getAll = (req, res) => {
  Note.find({})
    .then((notes) => {
      res.status(200).json(notes);
    })
    .catch((err) => console.log(err))
    .finally(desconectar);
};
const getById = (req, res, next) => {
  const id = req.params.id;

  Note.findById(id)
    .then((note) => {
      res.status(200).json(note);
    })
    .catch((err) => {
      next(err);
    })
    .finally(desconectar);
};
const post = (req, res) => {
  const { title, description } = req.body;
  console.log(req.body);
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
};
const update = (req, res, next) => {
  const id = req.params.id;
  const { title, description, pinned } = req.body;
  Note.findByIdAndUpdate(id, { title, description, pinned }, { new: true })
    .then((note) => res.status(200).json(note))
    .catch((err) => next(err))
    .finally(desconectar);
};

const remove = (req, res, next) => {
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
};

const notFound = (req, res) => {
  res.status(404).send({ message: "página no encontrada" });
};

const error = (err, req, res, next) => {
  switch (err.name) {
    case "CastError":
      res.status(400).send({ errorName: err.name, errorMessage: err.message });
      break;
    case "Error":
      res.status(400).send({ errorName: err.name, errorMessage: err.message });
    default:
      res.status(500).end();
  }
};
module.exports = {
  getHome,
  getAll,
  getById,
  post,
  update,
  remove,
  notFound,
  error,
};
