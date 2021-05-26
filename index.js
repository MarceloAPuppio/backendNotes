//usamos dotenv para utilizar variables de entonrno. En este caso tengo el PW y el puerto
require("dotenv").config();
const app = require("./app");

// declaramos el puerto, que viene de variable de entorno, o por defecto 3001
const PORT = process.env.PORT || 3001;
//primeros middelware

//inicializamos el servidor
app.listen(PORT, () => {
  console.log(`servidor corriendo en Puerto ${PORT}`);
});
