const { celebrate, Joi } = require('celebrate');

const limitedRef = /^(https?:\/\/)(www\.)?([\w-.~:/?#[\]@!$&')(*+,;=]*\.?)*\.{1}[\w]{2,8}(\/([\w-.~:/?#[\]@!$&')(*+,;=])*)?/;
//ok
const validatedUser = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).required(),
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  }),
});
//ok
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
    id: Joi.number().required(),
  }),
});
//ok
const validatedMovieId = celebrate({
  params: Joi.object().keys({
    id: Joi.string().length(24).hex().required(),
  }),
});
//ok
const validatedProfile = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).required(),
    email: Joi.string().email().required(),
  }),
});
//ok params -> body
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
