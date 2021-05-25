const E_404 = (req, res) => {
  res.status(404).send({ message: "página no encontrada" });
};

const E_400_500 = (err, req, res, next) => {
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

module.exports = { E_404, E_400_500 };
