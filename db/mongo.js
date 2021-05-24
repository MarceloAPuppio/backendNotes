require("dotenv").config();
const mongoose = require("mongoose");
const PW = process.env.PW;
const URI = `mongodb+srv://mpuppio:${PW}@cluster0.stjcj.mongodb.net/DBNotas?retryWrites=true&w=majority`;

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
mongoose.connection.close();
