const { celebrate, Joi } = require('celebrate');

const limitedRef = /^(https?:\/\/)(www\.)?([\w-.~:/?#[\]@!$&')(*+,;=]*\.?)*\.{1}[\w]{2,8}(\/([\w-.~:/?#[\]@!$&')(*+,;=])*)?/;
const validatedUser = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).required(),
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  }),
});
const validatedMovie = celebrate({
  body: Joi.object().keys({
    country: Joi.string().required(),
    director: Joi.string().required(),
    duration: Joi.number().required(),
    year: Joi.string().required(),
    description: Joi.string().required(),
    image: Joi.string().required().pattern(limitedRef),
    trailerLink: Joi.string().required().pattern(limitedRef),
    thumbnail: Joi.string().required().pattern(limitedRef),
    nameRU: Joi.string().required(),
    nameEN: Joi.string().required(),
    movieId: Joi.number().required(),
  }),
});
const validatedMovieId = celebrate({
  params: Joi.object().keys({
    _id: Joi.string().length(24).hex().required(),
  }),
});
const validatedProfile = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).required(),
    email: Joi.string().email().required(),
  }),
});
const validatedUserId = celebrate({
  body: Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  }),
});

module.exports = {
  validatedUser,
  validatedMovie,
  validatedMovieId,
  validatedProfile,
  validatedUserId,
};
