var express = require("express");
const Joi = require("joi");

const Movie = require("../models/movie")

var router = express.Router();

const schema = Joi.object({
  name: Joi.string().min(3).max(30).required(),
});

router.get("/movies", function (req, res, next) {
  Movie.findAll().then(movies=>{
    res.send(movies);
  })
});

router.get("/movies/:id", function (req, res, next) {

  Movie.findByPk(req.params.id).then(movie=>{
    console.log("Movie", movie)
    if (movie === null) {
      return res.status(404).send("The movie with the given id was not found");
    }
    res.send(movie);
  })
});

router.post("/movies", function (req, res, next) {
  
  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(404).send(error);
  }

  Movie.create(req.body).then(movie=>{
    res.send(movie);
  })

});

router.put("/movies/:id", function (req, res, next) {
  Movie.update(req.body, { where: {
    id: req.params.id
  }}).then(result=>{
    console.log("Update", result)
    if (result[0] === 0){
      return res.status(404).send("The movie with the given id was not found");
    }
    res.send("Movie updated")
  })

  /*const movie = movies.find((m) => m.id === parseInt(req.params.id));

  if (!movie) {
    return res.status(404).send("The movie with the given id was not found");
  }

  movie.name = req.body.name;
  res.send(movie);
*/
});


router.delete("/movies/:id", function (req, res, next) {
  
  Movie.destroy({where: {
    id: req.params.id
  }}).then(result=>{
    if(result === 0) {
      return res.status(404).send("The movie with the given id was not found");
    }
    res.sendStatus(204);
  })
});

module.exports = router;
