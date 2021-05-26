const mongoose = require("mongoose");

//Primer paso: crear un esquema 🥇
const noteSchema = mongoose.Schema({
  title: String,
  description: String,
  fecha: Date,
  pinned: Boolean,
});

//segundo paso: crear un modelo. Pasamos el nombre de la coleccion 🐱 y el Schema
const Note = mongoose.model("Notes", noteSchema);

module.exports = { Note };
