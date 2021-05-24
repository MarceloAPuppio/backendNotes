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

// const findAll = (schema) => {
//   schema
//     .find({})
//     .then((notes) => {
//       console.log(notes, "desde notejs");
//       return notes;
//     })
//     .catch((err) => {
//       return err;
//     })
//     .finally(() => mongoose.connection.close());
// };
module.exports = { Note };
