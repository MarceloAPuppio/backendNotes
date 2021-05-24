const express = require("express");
const cors = require("cors");
require("dotenv").config();
const app = express();
//primer middelware
app.use(cors());

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`servidor corriendo en Puerto ${PORT}`);
});

//endpoints

app.get("/", (req, res) => {
  res.status(200).json({ message: "welcome" });
});
