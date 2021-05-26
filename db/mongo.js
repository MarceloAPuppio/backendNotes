require("dotenv").config();
const Note = require("./Schemas/Note");
const mongoose = require("mongoose");
const PW = process.env.PW;
const URI = `mongodb+srv://mpuppio:${PW}@cluster0.stjcj.mongodb.net/DBNotas?retryWrites=true&w=majority`;

const conectar = () => {
  mongoose
    .connect(URI, {
      useCreateIndex: true,
      useFindAndModify: false,
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log("Conectado a bbdd");
    })
    .catch((err) => {
      console.log(err);
    });
};
const desconectar = () => {
  mongoose.connection.close();
  console.log("BBDD desconectada");
};

module.exports = { conectar, desconectar };
