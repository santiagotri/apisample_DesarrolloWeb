var express = require("express");
const Joi = require("joi");

var router = express.Router();

let movies = [
  {
    id: 1,
    name: "Casablanca",
  },
  {
    id: 2,
    name: "El padrino",
  },
  {
    id: 3,
    name: "E.T.",
  },
];

const schema = Joi.object({
  name: Joi.string().alphanum().min(3).max(30).required(),
});

router.get("/movies", function (req, res, next) {
  res.send(movies);
});

router.get("/movies/:id", function (req, res, next) {
  console.log("Parametro", req.params.id);
  const movie = movies.find((m) => m.id === parseInt(req.params.id));

  if (!movie) {
    return res.status(404).send("The movie with the given id was not found");
  }

  res.send(movie);
});

router.post("/movies", function (req, res, next) {
  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(404).send(error);
  }
  const movie = { id: movies.length + 1, name: req.body.name };
  movies.push(movie);
  res.send(movie);
});

/*
GET /api/movies
// Listado de películas
Body 
Respuesta [{},{}]

GET /api/movies/1
// Película con el id 1
Body 
Respuesta {}

POST /api/movies
//Crear una película
Body {} 
Respuesta {}

PUT /api/movies/1
//Actualizo película id 1
Body {} 
Respuesta {}

DELETE /api/movies/1
//Borrar película id 1

Body 
Respuesta // 204
*/

module.exports = router;
