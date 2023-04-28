const router = require('express').Router();
const {
  getMovies, createMovies, deleteMovieById,
} = require('../controllers/movies');
const { validatedMovie, validatedMovieId } = require('../utils/validation');

router.get('/movies', getMovies);

router.post('/movies', validatedMovie, createMovies);

router.delete('/movies/:_id', validatedMovieId, deleteMovieById);

module.exports = router;
