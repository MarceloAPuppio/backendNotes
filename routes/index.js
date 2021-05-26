const notes = require("express").Router();
const noteCtrl = require("../controller/notes");
notes.get("/", noteCtrl.getAll);
notes.get("/:id", noteCtrl.getById);

notes.post("/", noteCtrl.post);
notes.put("/:id", noteCtrl.update);

notes.delete("/:id", noteCtrl.remove);
module.exports = notes;
