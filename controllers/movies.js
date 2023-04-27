const Movie = require('../models/movie');
const constants = require('../utils/constants');
const NotFoundError = require('../utils/errors/NotFoundError');
const ValidationError = require('../utils/errors/ValidationError');
const ForbiddenError = require('../utils/errors/ForbiddenError');

module.exports.createMovies = (req, res, next) => {
  Movie.create({ owner: req.user._id, ...req.body })
    .then((movie) => res.send({ data: movie }))
    .catch((err) => {
      if (err.name === constants.names.validationError) {
        next(new ValidationError(constants.messages.validationError));
      } else {
        next(err);
      }
    });
};

module.exports.deleteMovieById = (req, res, next) => {
  Movie.findById(req.params.movieId)
    .orFail(new NotFoundError(constants.messages.movieError))
    .then((movie) => {
      if (req.user._id.toString() === movie.owner.toString()) {
        return movie.remove()
          .then((removedMovie) => {
            res.send({ message: `${constants.messages.deletedMovie} ${removedMovie.nameRU}` });
          });
      }
      return next(new ForbiddenError(constants.messages.movieRightError));
    })
    .catch((err) => {
      if (err.name === constants.names.castError) {
        next(new ValidationError(constants.messages.movieDataError));
      } else {
        next(err);
      }
    });
};

module.exports.getMovies = (req, res, next) => {
  Movie.find({ owner: req.user._id })
    .then((movie) => res.send({ data: movie }))
    .catch((err) => next(err));
};
